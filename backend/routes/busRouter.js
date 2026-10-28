import crypto from 'node:crypto';
import { getDB, saveCollection } from '../database/db.js';
import { pool, isPostgresConnected } from '../database/pg.js';
import { broadcast } from '../realtime.js';
import { 
  MOCK_BUS_CITIES, 
  MOCK_BUS_OPERATORS, 
  MOCK_BUS_TRIPS, 
  generateBusSeatLayout 
} from '../data/mockBusData.js';

export async function handleBusRoutes(req, res, pathname, method, query, body, sendJSON) {
  const db = getDB();

  // Initialize bus state in db if not present
  if (!Array.isArray(db.bus_trips)) db.bus_trips = MOCK_BUS_TRIPS;
  if (!Array.isArray(db.bus_operators)) db.bus_operators = MOCK_BUS_OPERATORS;
  if (!Array.isArray(db.bus_cities)) db.bus_cities = MOCK_BUS_CITIES;
  if (!Array.isArray(db.bus_bookings)) db.bus_bookings = [];
  if (!Array.isArray(db.bus_seat_holds)) db.bus_seat_holds = [];
  if (!Array.isArray(db.refund_transactions)) db.refund_transactions = [];

  // =========================================================================
  // 1. GET /api/v1/buses/cities or /api/buses/cities
  // =========================================================================
  if ((pathname === '/api/v1/buses/cities' || pathname === '/api/buses/cities') && method === 'GET') {
    return sendJSON(res, {
      success: true,
      cities: db.bus_cities
    });
  }

  // =========================================================================
  // 2. GET /api/v1/buses/search or /api/buses/search
  // =========================================================================
  if ((pathname === '/api/v1/buses/search' || pathname === '/api/buses/search') && method === 'GET') {
    const { 
      from = 'Coimbatore', 
      to = 'Chennai', 
      date = new Date().toISOString().split('T')[0],
      bus_type,
      ac_only,
      operator,
      sort_by = 'price_asc'
    } = query;

    let trips = [...db.bus_trips];

    // Filter by route
    if (from) {
      trips = trips.filter(t => t.from_city.toLowerCase() === from.toLowerCase());
    }
    if (to) {
      trips = trips.filter(t => t.to_city.toLowerCase() === to.toLowerCase());
    }

    // If no direct trips exist for rare mock pairs, provide synthetic demo route matching the request
    if (trips.length === 0 && from && to) {
      trips = [
        {
          id: `trip_${from.toLowerCase().slice(0, 3)}_${to.toLowerCase().slice(0, 3)}_01`,
          operator_id: 'op_kpn',
          operator_name: 'KPN Travels',
          bus_service_number: 'KPN-EXP-88',
          bus_type: 'AC Sleeper 2+1',
          category: 'sleeper',
          is_ac: true,
          from_city: from,
          to_city: to,
          departure_time: '21:30',
          arrival_time: '05:30',
          duration: '8h 00m',
          base_fare: 890,
          available_seats: 16,
          rating: 4.6,
          total_reviews: 340,
          has_live_tracking: true,
          amenities: ['Charging Point', 'Blankets', 'Water Bottle', 'Reading Light'],
          cancellation_policy: [
            { time_limit: 'Before 24h of departure', refund_percentage: 90, deduction_percentage: 10 },
            { time_limit: '12h to 24h before departure', refund_percentage: 50, deduction_percentage: 50 },
            { time_limit: '0h to 12h before departure', refund_percentage: 0, deduction_percentage: 100 }
          ],
          boarding_points: [
            { id: 'bp_1', name: `${from} Central Boarding Lounge`, time: '21:30', landmark: 'Main Omni Bus Stand' }
          ],
          dropping_points: [
            { id: 'dp_1', name: `${to} Central Terminus`, time: '05:30', landmark: 'Main Bus Station Gate 1' }
          ]
        },
        {
          id: `trip_${from.toLowerCase().slice(0, 3)}_${to.toLowerCase().slice(0, 3)}_02`,
          operator_id: 'op_intrcity',
          operator_name: 'IntrCity SmartBus',
          bus_service_number: 'INTR-PRM-101',
          bus_type: 'SmartBus Club Class AC Sleeper (2+1)',
          category: 'sleeper',
          is_ac: true,
          from_city: from,
          to_city: to,
          departure_time: '22:45',
          arrival_time: '06:15',
          duration: '7h 30m',
          base_fare: 980,
          available_seats: 21,
          rating: 4.9,
          total_reviews: 890,
          has_live_tracking: true,
          amenities: ['Lounge Access', 'Live Tracking', 'Snack Pack', 'Charging Point', 'Blankets', 'Mineral Water'],
          cancellation_policy: [
            { time_limit: 'Before 24h of departure', refund_percentage: 95, deduction_percentage: 5 },
            { time_limit: '12h to 24h before departure', refund_percentage: 60, deduction_percentage: 40 },
            { time_limit: '0h to 12h before departure', refund_percentage: 0, deduction_percentage: 100 }
          ],
          boarding_points: [
            { id: 'bp_2', name: `${from} IntrCity SmartLounge`, time: '22:45', landmark: 'Opposite Omni Bus Stand' }
          ],
          dropping_points: [
            { id: 'dp_2', name: `${to} Drop Point Hub`, time: '06:15', landmark: 'Highway Interchange' }
          ]
        }
      ];
    }

    // Filter by bus type (sleeper vs seater)
    if (bus_type && bus_type !== 'all') {
      trips = trips.filter(t => t.category === bus_type);
    }

    // Filter AC
    if (ac_only === 'true') {
      trips = trips.filter(t => t.is_ac === true);
    }

    // Filter by operator
    if (operator && operator !== 'all') {
      trips = trips.filter(t => t.operator_name.toLowerCase().includes(operator.toLowerCase()));
    }

    // Sorting
    if (sort_by === 'price_asc') {
      trips.sort((a, b) => a.base_fare - b.base_fare);
    } else if (sort_by === 'price_desc') {
      trips.sort((a, b) => b.base_fare - a.base_fare);
    } else if (sort_by === 'duration') {
      trips.sort((a, b) => a.duration.localeCompare(b.duration));
    } else if (sort_by === 'rating') {
      trips.sort((a, b) => b.rating - a.rating);
    }

    return sendJSON(res, {
      success: true,
      count: trips.length,
      from,
      to,
      travel_date: date,
      trips,
      operators: db.bus_operators,
      is_mock_provider: true,
      notice: 'DEMO BUS INVENTORY — NOT COMMERCIAL SUPPLIER API'
    });
  }

  // =========================================================================
  // 3. GET /api/v1/buses/:tripId/seats or /api/buses/:tripId/seats
  // =========================================================================
  if ((pathname.includes('/buses/') && pathname.endsWith('/seats')) || (pathname.includes('/api/v1/buses/') && pathname.endsWith('/seats'))) {
    const parts = pathname.split('/');
    const tripId = parts[parts.indexOf('buses') + 1];
    let trip = db.bus_trips.find(t => t.id === tripId);
    if (!trip) {
      trip = MOCK_BUS_TRIPS[0];
    }

    const layout = generateBusSeatLayout(trip);

    // Merge active seat holds
    const now = new Date();
    const activeHolds = db.bus_seat_holds.filter(h => 
      h.trip_id === tripId && new Date(h.expires_at) > now
    );
    const heldSeatIds = activeHolds.flatMap(h => h.seats);

    if (layout.lower_deck) {
      layout.lower_deck.forEach(s => {
        if (heldSeatIds.includes(s.seat_number)) s.is_held = true;
      });
    }
    if (layout.upper_deck) {
      layout.upper_deck.forEach(s => {
        if (heldSeatIds.includes(s.seat_number)) s.is_held = true;
      });
    }
    if (layout.main_deck) {
      layout.main_deck.forEach(s => {
        if (heldSeatIds.includes(s.seat_number)) s.is_held = true;
      });
    }

    return sendJSON(res, {
      success: true,
      trip_id: tripId,
      trip,
      layout,
      boarding_points: trip.boarding_points,
      dropping_points: trip.dropping_points
    });
  }

  // =========================================================================
  // 4. GET /api/v1/buses/:tripId/boarding-points & dropping-points
  // =========================================================================
  if (pathname.includes('/buses/') && pathname.endsWith('/boarding-points')) {
    const parts = pathname.split('/');
    const tripId = parts[parts.indexOf('buses') + 1];
    const trip = db.bus_trips.find(t => t.id === tripId) || MOCK_BUS_TRIPS[0];
    return sendJSON(res, { success: true, boarding_points: trip.boarding_points });
  }

  if (pathname.includes('/buses/') && pathname.endsWith('/dropping-points')) {
    const parts = pathname.split('/');
    const tripId = parts[parts.indexOf('buses') + 1];
    const trip = db.bus_trips.find(t => t.id === tripId) || MOCK_BUS_TRIPS[0];
    return sendJSON(res, { success: true, dropping_points: trip.dropping_points });
  }

  // =========================================================================
  // 5. GET /api/v1/buses/:tripId or /api/buses/:tripId
  // =========================================================================
  if ((pathname.startsWith('/api/v1/buses/') || pathname.startsWith('/api/buses/')) && !pathname.endsWith('/seats') && !pathname.endsWith('/cities') && !pathname.endsWith('/search')) {
    const tripId = pathname.split('/').pop();
    if (method === 'GET' && tripId && tripId !== 'buses') {
      const trip = db.bus_trips.find(t => t.id === tripId) || MOCK_BUS_TRIPS[0];
      return sendJSON(res, {
        success: true,
        trip
      });
    }
  }

  // =========================================================================
  // 6. POST /api/v1/bus-seat-holds (10-minute temporary seat lock)
  // =========================================================================
  if ((pathname === '/api/v1/bus-seat-holds' || pathname === '/api/bus-seat-holds') && method === 'POST') {
    const { trip_id, seats, user_email } = body;
    if (!trip_id || !seats || !Array.isArray(seats) || seats.length === 0) {
      return sendJSON(res, { success: false, message: 'Invalid seat hold parameters' }, 400);
    }

    const holdId = `bhold_${crypto.randomUUID().slice(0, 8)}`;
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    const newHold = {
      id: holdId,
      trip_id,
      seats,
      user_email: user_email || 'guest@gomodeals.com',
      expires_at: expiresAt,
      created_at: new Date().toISOString()
    };

    db.bus_seat_holds.push(newHold);

    return sendJSON(res, {
      success: true,
      message: 'Seats held for 10 minutes',
      hold_id: holdId,
      expires_at: expiresAt
    });
  }

  // =========================================================================
  // 7. DELETE /api/v1/bus-seat-holds/:holdId
  // =========================================================================
  if ((pathname.startsWith('/api/v1/bus-seat-holds/') || pathname.startsWith('/api/bus-seat-holds/')) && method === 'DELETE') {
    const holdId = pathname.split('/').pop();
    db.bus_seat_holds = db.bus_seat_holds.filter(h => h.id !== holdId);
    return sendJSON(res, { success: true, message: 'Hold released' });
  }

  // =========================================================================
  // 8. POST /api/v1/bus-bookings (Confirm Bus Reservation with Commission Snapshot)
  // =========================================================================
  if ((pathname === '/api/v1/bus-bookings' || pathname === '/api/bus-bookings') && method === 'POST') {
    const {
      trip_id,
      user_id = 'usr_guest',
      lead_passenger,
      passengers = [],
      seats = [],
      boarding_point,
      dropping_point,
      journey_date,
      total_amount,
      payment_method = 'upi',
      coupon_code,
      discount_amount = 0
    } = body;

    if (!trip_id || !lead_passenger || !lead_passenger.name || !lead_passenger.phone || seats.length === 0) {
      return sendJSON(res, { success: false, message: 'Missing mandatory bus booking fields' }, 400);
    }

    const trip = db.bus_trips.find(t => t.id === trip_id) || MOCK_BUS_TRIPS[0];
    const bookingId = `GMD-BUS-${Math.floor(100000 + Math.random() * 900000)}`;
    const pnrNumber = `PNR-${trip.operator_id.slice(3).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;

    // Commission Engine Calculation Snapshot per Specification Part 8:
    // Distinguish:
    // 1. Customer payment (Gross total)
    // 2. Base ticket fare
    // 3. Permitted Platform fee: ₹30
    // 4. Gross Commission: 10% of base fare
    // 5. Payment gateway handling fee (simulated 1.8%)
    // 6. Net supplier payable = Base ticket fare - Gross Commission
    const seatsTotal = parseFloat(total_amount) - 30 + parseFloat(discount_amount);
    const platformFee = 30.00;
    const grossCommission = (seatsTotal * 0.10);
    const paymentGatewayCost = (parseFloat(total_amount) * 0.018);
    const supplierPayable = seatsTotal - grossCommission;
    const netGomoRevenue = grossCommission + platformFee - paymentGatewayCost;

    const commissionSnapshot = {
      supplier_id: trip.operator_id,
      supplier_name: trip.operator_name,
      contract_rule: 'COMM_RULE_BUS_2026_STD_V1',
      commission_percentage: 10,
      base_seats_total: Math.round(seatsTotal),
      gross_commission: Math.round(grossCommission),
      platform_fee: platformFee,
      gateway_cost: Math.round(paymentGatewayCost),
      supplier_payable: Math.round(supplierPayable),
      net_gomo_revenue: Math.round(netGomoRevenue),
      currency: 'INR'
    };

    const newBooking = {
      id: bookingId,
      booking_id: bookingId,
      booking_type: 'bus',
      pnr: pnrNumber,
      trip_id,
      operator_name: trip.operator_name,
      bus_service_number: trip.bus_service_number,
      bus_type: trip.bus_type,
      from_city: trip.from_city,
      to_city: trip.to_city,
      departure_time: trip.departure_time,
      arrival_time: trip.arrival_time,
      duration: trip.duration,
      journey_date: journey_date || new Date().toISOString().split('T')[0],
      boarding_point: boarding_point || trip.boarding_points[0],
      dropping_point: dropping_point || trip.dropping_points[0],
      seats,
      lead_passenger,
      passengers,
      total_amount: parseFloat(total_amount),
      discount_amount: parseFloat(discount_amount) || 0,
      coupon_code: coupon_code || null,
      status: 'confirmed',
      payment_id: `PAY_BUS_${crypto.randomUUID().slice(0, 10).toUpperCase()}`,
      payment_method,
      commission_snapshot: commissionSnapshot,
      cancellation_policy: trip.cancellation_policy,
      is_demo_booking: true,
      demo_watermark: 'DEMO BOOKING — NOT VALID FOR TRAVEL',
      checked_in: false,
      created_at: new Date().toISOString()
    };

    db.bus_bookings.unshift(newBooking);
    saveCollection('bus_bookings');

    // Also push to unified tb_bookings for shared booking history
    if (!Array.isArray(db.tb_bookings)) db.tb_bookings = [];
    db.tb_bookings.unshift({
      id: bookingId,
      booking_id: bookingId,
      booking_type: 'bus',
      movie_title: `${trip.from_city} to ${trip.to_city} (${trip.operator_name})`,
      theatre_name: `${trip.bus_type} • ${trip.bus_service_number}`,
      location: `Boarding: ${newBooking.boarding_point?.name || 'Main Stand'}`,
      user_id,
      name: lead_passenger.name,
      email: lead_passenger.email,
      phone: lead_passenger.phone,
      seats,
      booking_date: newBooking.journey_date,
      booking_time: trip.departure_time,
      total_amount: newBooking.total_amount,
      status: 'confirmed',
      pnr: pnrNumber,
      details: newBooking,
      created_at: newBooking.created_at
    });
    saveCollection('tb_bookings');

    // Remove temporary seat holds
    db.bus_seat_holds = db.bus_seat_holds.filter(h => h.trip_id !== trip_id);

    broadcast('NEW_BUS_TICKET_BOOKING', {
      booking_id: newBooking.id,
      operator: trip.operator_name,
      route: `${trip.from_city} -> ${trip.to_city}`,
      seats: newBooking.seats,
      amount: newBooking.total_amount
    });

    return sendJSON(res, {
      success: true,
      message: 'Bus ticket confirmed successfully!',
      booking: newBooking
    }, 201);
  }

  // =========================================================================
  // 9. GET /api/v1/bus-bookings/:bookingId
  // =========================================================================
  if (pathname.startsWith('/api/v1/bus-bookings/') || pathname.startsWith('/api/bus-bookings/')) {
    const bookingId = pathname.split('/').pop();
    if (method === 'GET' && bookingId && bookingId !== 'bus-bookings') {
      const booking = db.bus_bookings.find(b => b.id === bookingId || b.booking_id === bookingId);
      if (!booking) {
        return sendJSON(res, { success: false, message: 'Bus booking not found' }, 404);
      }
      return sendJSON(res, { success: true, booking });
    }
  }

  // =========================================================================
  // 10. POST /api/v1/ticket-bookings/:bookingId/cancel (Universal Cancel & Refund Calculation)
  // =========================================================================
  if ((pathname.includes('/ticket-bookings/') || pathname.includes('/api/v1/ticket-bookings/')) && pathname.endsWith('/cancel') && method === 'POST') {
    const parts = pathname.split('/');
    const bookingId = parts[parts.indexOf('ticket-bookings') + 1];

    let booking = db.bus_bookings.find(b => b.id === bookingId || b.booking_id === bookingId);
    let isBus = true;
    if (!booking) {
      booking = db.tb_bookings.find(b => b.id === bookingId || b.booking_id === bookingId);
      isBus = false;
    }

    if (!booking) {
      return sendJSON(res, { success: false, message: 'Booking not found' }, 404);
    }

    if (booking.status === 'cancelled') {
      return sendJSON(res, { success: false, message: 'Booking is already cancelled' }, 400);
    }

    // Cancellation policy calculation per Specification Part 4.10 & Part 8:
    // Determine hours remaining until departure
    const departureDateStr = booking.journey_date || booking.booking_date;
    const departureTimeStr = booking.departure_time || booking.booking_time || '18:00';
    let deductionPercentage = 10; // Default 10% cancellation fee (>24 hours)

    try {
      const depDate = new Date(`${departureDateStr} ${departureTimeStr}`);
      const hoursRemaining = (depDate - new Date()) / (1000 * 60 * 60);
      if (hoursRemaining < 12) {
        deductionPercentage = 100; // No refund within 12h
      } else if (hoursRemaining < 24) {
        deductionPercentage = 50; // 50% refund between 12-24h
      } else {
        deductionPercentage = 10; // 90% refund > 24h
      }
    } catch {
      deductionPercentage = 10;
    }

    const totalAmount = parseFloat(booking.total_amount) || 0;
    const cancellationFee = (totalAmount * (deductionPercentage / 100));
    const refundAmount = Math.max(0, totalAmount - cancellationFee);

    // Update status
    booking.status = 'cancelled';
    booking.cancellation = {
      cancelled_at: new Date().toISOString(),
      deduction_percentage: deductionPercentage,
      cancellation_fee: Math.round(cancellationFee),
      refund_amount: Math.round(refundAmount),
      refund_status: refundAmount > 0 ? 'processed' : 'none',
      refund_reference: refundAmount > 0 ? `REF-${crypto.randomUUID().slice(0, 8).toUpperCase()}` : null
    };

    // Keep tb_bookings copy synchronized
    const tbMatch = db.tb_bookings.find(b => b.id === bookingId || b.booking_id === bookingId);
    if (tbMatch) {
      tbMatch.status = 'cancelled';
      tbMatch.cancellation = booking.cancellation;
    }

    saveCollection('bus_bookings');
    saveCollection('tb_bookings');

    const refundTx = {
      refund_id: booking.cancellation.refund_reference || `REF_NA_${Date.now()}`,
      booking_id: bookingId,
      booking_type: isBus ? 'bus' : 'movie',
      original_amount: totalAmount,
      cancellation_fee: Math.round(cancellationFee),
      refund_amount: Math.round(refundAmount),
      status: 'completed',
      gateway_status: 'credited_to_source',
      processed_at: new Date().toISOString()
    };
    db.refund_transactions.push(refundTx);

    return sendJSON(res, {
      success: true,
      message: refundAmount > 0 
        ? `Booking cancelled. Refund of ₹${refundAmount} has been initiated to your source payment method.`
        : 'Booking cancelled. As per operator policy, no refund applies within 12 hours of departure.',
      cancellation: booking.cancellation,
      booking
    });
  }

  // =========================================================================
  // 11. GET /api/v1/ticket-bookings/:bookingId/refund
  // =========================================================================
  if ((pathname.includes('/ticket-bookings/') || pathname.includes('/api/v1/ticket-bookings/')) && pathname.endsWith('/refund') && method === 'GET') {
    const parts = pathname.split('/');
    const bookingId = parts[parts.indexOf('ticket-bookings') + 1];
    const refund = db.refund_transactions.find(r => r.booking_id === bookingId);

    if (!refund) {
      return sendJSON(res, { success: false, message: 'No refund transaction for this booking' }, 404);
    }
    return sendJSON(res, { success: true, refund });
  }

  // =========================================================================
  // 12. GET /api/v1/ticket-bookings (Unified Booking History for Customer & Admin)
  // =========================================================================
  if ((pathname === '/api/v1/ticket-bookings' || pathname === '/api/ticket-bookings') && method === 'GET') {
    const userEmail = query.email || req.headers['x-user-email'];
    const category = query.category; // 'movie' | 'bus'

    let list = [...(db.tb_bookings || [])];

    if (userEmail) {
      list = list.filter(b => (b.email || '').toLowerCase() === userEmail.toLowerCase());
    }
    if (category) {
      list = list.filter(b => b.booking_type === category);
    }

    return sendJSON(res, {
      success: true,
      count: list.length,
      bookings: list
    });
  }

  return false;
}
