// Mock Bus Operators, Routes, Trips and Seat Layouts for GoMo Deals Bus Ticket Booking
export const MOCK_BUS_CITIES = [
  { id: 'cbe', name: 'Coimbatore', state: 'Tamil Nadu', popular: true },
  { id: 'maa', name: 'Chennai', state: 'Tamil Nadu', popular: true },
  { id: 'blr', name: 'Bengaluru', state: 'Karnataka', popular: true },
  { id: 'mdu', name: 'Madurai', state: 'Tamil Nadu', popular: true },
  { id: 'slm', name: 'Salem', state: 'Tamil Nadu', popular: true },
  { id: 'tpr', name: 'Tiruppur', state: 'Tamil Nadu', popular: true },
  { id: 'cok', name: 'Kochi', state: 'Kerala', popular: true },
  { id: 'hyd', name: 'Hyderabad', state: 'Telangana', popular: true },
  { id: 'trcy', name: 'Tiruchirappalli', state: 'Tamil Nadu', popular: false },
  { id: 'mys', name: 'Mysuru', state: 'Karnataka', popular: false },
  { id: 'pdy', name: 'Puducherry', state: 'Puducherry', popular: false }
];

export const MOCK_BUS_OPERATORS = [
  {
    id: 'op_kpn',
    name: 'KPN Travels',
    rating: 4.6,
    reviews_count: 1420,
    logo: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=200',
    headquarters: 'Salem, Tamil Nadu',
    verified: true
  },
  {
    id: 'op_parveen',
    name: 'Parveen Travels',
    rating: 4.7,
    reviews_count: 2150,
    logo: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=200',
    headquarters: 'Chennai, Tamil Nadu',
    verified: true
  },
  {
    id: 'op_srs',
    name: 'SRS Travels',
    rating: 4.4,
    reviews_count: 3200,
    logo: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=200',
    headquarters: 'Bengaluru, Karnataka',
    verified: true
  },
  {
    id: 'op_orange',
    name: 'Orange Tours & Travels',
    rating: 4.8,
    reviews_count: 1890,
    logo: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=200',
    headquarters: 'Hyderabad, Telangana',
    verified: true
  },
  {
    id: 'op_intrcity',
    name: 'IntrCity SmartBus',
    rating: 4.9,
    reviews_count: 4120,
    logo: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=200',
    headquarters: 'New Delhi / Bengaluru',
    verified: true
  }
];

export const MOCK_BUS_TRIPS = [
  {
    id: 'trip_cbe_maa_01',
    operator_id: 'op_kpn',
    operator_name: 'KPN Travels',
    bus_service_number: 'KPN-702-EXP',
    bus_type: 'AC Sleeper 2+1',
    category: 'sleeper',
    is_ac: true,
    from_city: 'Coimbatore',
    to_city: 'Chennai',
    departure_time: '21:30',
    arrival_time: '05:30',
    duration: '8h 00m',
    base_fare: 890,
    available_seats: 14,
    rating: 4.6,
    total_reviews: 420,
    has_live_tracking: true,
    amenities: ['Charging Point', 'Blankets', 'Water Bottle', 'Reading Light', 'Pillow', 'Emergency Exit'],
    cancellation_policy: [
      { time_limit: 'Before 24h of departure', refund_percentage: 90, deduction_percentage: 10 },
      { time_limit: '12h to 24h before departure', refund_percentage: 50, deduction_percentage: 50 },
      { time_limit: '0h to 12h before departure', refund_percentage: 0, deduction_percentage: 100 }
    ],
    boarding_points: [
      { id: 'bp_cbe_1', name: 'Gandhipuram Omni Bus Stand', time: '21:30', landmark: 'Platform 4, Opp Corporation Bank' },
      { id: 'bp_cbe_2', name: 'Hopes College', time: '21:45', landmark: 'Bus Stop Near Flyover' },
      { id: 'bp_cbe_3', name: 'KMCH / Sitra', time: '22:00', landmark: 'Opposite KMCH Main Gate' },
      { id: 'bp_cbe_4', name: 'Neelambur Toll', time: '22:15', landmark: 'Before Toll Plaza' }
    ],
    dropping_points: [
      { id: 'dp_maa_1', name: 'Perungalathur', time: '04:30', landmark: 'Near Bus Stop Bridge' },
      { id: 'dp_maa_2', name: 'Tambaram', time: '04:45', landmark: 'Tambaram West Hindu Mission' },
      { id: 'dp_maa_3', name: 'Guindy', time: '05:05', landmark: 'Near Kathipara Bridge' },
      { id: 'dp_maa_4', name: 'Koyambedu (CMBT)', time: '05:30', landmark: 'Omni Bus Stand Entry' }
    ]
  },
  {
    id: 'trip_cbe_maa_02',
    operator_id: 'op_parveen',
    operator_name: 'Parveen Travels',
    bus_service_number: 'PVN-GLX-99',
    bus_type: 'Scania Multi-Axle AC Sleeper',
    category: 'sleeper',
    is_ac: true,
    from_city: 'Coimbatore',
    to_city: 'Chennai',
    departure_time: '22:15',
    arrival_time: '06:00',
    duration: '7h 45m',
    base_fare: 1050,
    available_seats: 18,
    rating: 4.8,
    total_reviews: 780,
    has_live_tracking: true,
    amenities: ['Charging Point', 'Blankets', 'Water Bottle', 'Reading Light', 'Snacks', 'WiFi', 'CCTV'],
    cancellation_policy: [
      { time_limit: 'Before 24h of departure', refund_percentage: 90, deduction_percentage: 10 },
      { time_limit: '12h to 24h before departure', refund_percentage: 50, deduction_percentage: 50 },
      { time_limit: '0h to 12h before departure', refund_percentage: 0, deduction_percentage: 100 }
    ],
    boarding_points: [
      { id: 'bp_cbe_1', name: 'Gandhipuram Omni Bus Stand', time: '22:15', landmark: 'Parveen Office Counter' },
      { id: 'bp_cbe_2', name: 'Hopes College', time: '22:30', landmark: 'Near Indian Oil Pump' },
      { id: 'bp_cbe_3', name: 'KMCH / Sitra', time: '22:45', landmark: 'KMCH Out Gate' }
    ],
    dropping_points: [
      { id: 'dp_maa_1', name: 'Perungalathur', time: '05:15', landmark: 'Near Bus Stop Bridge' },
      { id: 'dp_maa_2', name: 'Tambaram', time: '05:30', landmark: 'Tambaram Railway Station' },
      { id: 'dp_maa_4', name: 'Koyambedu (CMBT)', time: '06:00', landmark: 'Parveen Travels Hub, Omni Stand' }
    ]
  },
  {
    id: 'trip_cbe_maa_03',
    operator_id: 'op_srs',
    operator_name: 'SRS Travels',
    bus_service_number: 'SRS-221-SEAT',
    bus_type: 'BharatBenz AC Executive Seater (2+2)',
    category: 'seater',
    is_ac: true,
    from_city: 'Coimbatore',
    to_city: 'Chennai',
    departure_time: '14:00',
    arrival_time: '22:30',
    duration: '8h 30m',
    base_fare: 650,
    available_seats: 26,
    rating: 4.3,
    total_reviews: 520,
    has_live_tracking: true,
    amenities: ['Charging Point', 'Water Bottle', 'Reading Light', 'Emergency Exit'],
    cancellation_policy: [
      { time_limit: 'Before 24h of departure', refund_percentage: 90, deduction_percentage: 10 },
      { time_limit: '12h to 24h before departure', refund_percentage: 50, deduction_percentage: 50 },
      { time_limit: '0h to 12h before departure', refund_percentage: 0, deduction_percentage: 100 }
    ],
    boarding_points: [
      { id: 'bp_cbe_1', name: 'Gandhipuram Omni Bus Stand', time: '14:00', landmark: 'SRS Counter 8' },
      { id: 'bp_cbe_3', name: 'KMCH / Sitra', time: '14:25', landmark: 'Near Airport Junction' }
    ],
    dropping_points: [
      { id: 'dp_maa_2', name: 'Tambaram', time: '21:50', landmark: 'Tambaram West' },
      { id: 'dp_maa_4', name: 'Koyambedu (CMBT)', time: '22:30', landmark: 'CMBT Omni Bus Stand' }
    ]
  },
  {
    id: 'trip_cbe_blr_01',
    operator_id: 'op_intrcity',
    operator_name: 'IntrCity SmartBus',
    bus_service_number: 'INTR-BLR-401',
    bus_type: 'SmartBus Club Class AC Sleeper (2+1)',
    category: 'sleeper',
    is_ac: true,
    from_city: 'Coimbatore',
    to_city: 'Bengaluru',
    departure_time: '23:00',
    arrival_time: '05:30',
    duration: '6h 30m',
    base_fare: 820,
    available_seats: 12,
    rating: 4.9,
    total_reviews: 1340,
    has_live_tracking: true,
    amenities: ['Lounge Access', 'Live Tracking', 'Snack Pack', 'Charging Point', 'Blankets', 'Mineral Water', 'SOS Button'],
    cancellation_policy: [
      { time_limit: 'Before 24h of departure', refund_percentage: 95, deduction_percentage: 5 },
      { time_limit: '12h to 24h before departure', refund_percentage: 60, deduction_percentage: 40 },
      { time_limit: '0h to 12h before departure', refund_percentage: 0, deduction_percentage: 100 }
    ],
    boarding_points: [
      { id: 'bp_cbe_1', name: 'Gandhipuram IntrCity Lounge', time: '23:00', landmark: 'Opposite Omni Bus Stand Main Gate' },
      { id: 'bp_cbe_2', name: 'Hopes College', time: '23:15', landmark: 'Near Bus Shelter' }
    ],
    dropping_points: [
      { id: 'dp_blr_1', name: 'Electronic City Toll', time: '04:45', landmark: 'Elevated Toll Exit' },
      { id: 'dp_blr_2', name: 'Silk Board', time: '05:00', landmark: 'Near Petrol Bunk' },
      { id: 'dp_blr_3', name: 'Madiwala', time: '05:15', landmark: 'Maruthi Nagar Main Rd' },
      { id: 'dp_blr_4', name: 'Majestic / Anand Rao Circle', time: '05:30', landmark: 'Near SRS Office' }
    ]
  },
  {
    id: 'trip_blr_cbe_01',
    operator_id: 'op_intrcity',
    operator_name: 'IntrCity SmartBus',
    bus_service_number: 'INTR-CBE-402',
    bus_type: 'SmartBus Club Class AC Sleeper (2+1)',
    category: 'sleeper',
    is_ac: true,
    from_city: 'Bengaluru',
    to_city: 'Coimbatore',
    departure_time: '22:45',
    arrival_time: '05:15',
    duration: '6h 30m',
    base_fare: 850,
    available_seats: 16,
    rating: 4.9,
    total_reviews: 980,
    has_live_tracking: true,
    amenities: ['Lounge Access', 'Live Tracking', 'Snack Pack', 'Charging Point', 'Blankets', 'Mineral Water', 'SOS Button'],
    cancellation_policy: [
      { time_limit: 'Before 24h of departure', refund_percentage: 95, deduction_percentage: 5 },
      { time_limit: '12h to 24h before departure', refund_percentage: 60, deduction_percentage: 40 },
      { time_limit: '0h to 12h before departure', refund_percentage: 0, deduction_percentage: 100 }
    ],
    boarding_points: [
      { id: 'bp_blr_1', name: 'Majestic / Anand Rao Circle', time: '22:45', landmark: 'IntrCity Boarding Lounge' },
      { id: 'bp_blr_2', name: 'Madiwala', time: '23:15', landmark: 'Near Total Mall' },
      { id: 'bp_blr_3', name: 'Electronic City Toll', time: '23:35', landmark: 'Toll Plaza 1' }
    ],
    dropping_points: [
      { id: 'dp_cbe_1', name: 'KMCH / Sitra', time: '04:45', landmark: 'KMCH Out Gate' },
      { id: 'dp_cbe_2', name: 'Hopes College', time: '05:00', landmark: 'Flyover Entry' },
      { id: 'dp_cbe_3', name: 'Gandhipuram Omni Stand', time: '05:15', landmark: 'IntrCity Lounge' }
    ]
  },
  {
    id: 'trip_maa_cbe_01',
    operator_id: 'op_kpn',
    operator_name: 'KPN Travels',
    bus_service_number: 'KPN-703-EXP',
    bus_type: 'Volvo Multi-Axle AC Sleeper 2+1',
    category: 'sleeper',
    is_ac: true,
    from_city: 'Chennai',
    to_city: 'Coimbatore',
    departure_time: '21:00',
    arrival_time: '05:00',
    duration: '8h 00m',
    base_fare: 920,
    available_seats: 15,
    rating: 4.6,
    total_reviews: 580,
    has_live_tracking: true,
    amenities: ['Charging Point', 'Blankets', 'Water Bottle', 'Reading Light'],
    cancellation_policy: [
      { time_limit: 'Before 24h of departure', refund_percentage: 90, deduction_percentage: 10 },
      { time_limit: '12h to 24h before departure', refund_percentage: 50, deduction_percentage: 50 },
      { time_limit: '0h to 12h before departure', refund_percentage: 0, deduction_percentage: 100 }
    ],
    boarding_points: [
      { id: 'bp_maa_1', name: 'Koyambedu (CMBT)', time: '21:00', landmark: 'KPN Counter No. 3, Omni Stand' },
      { id: 'bp_maa_2', name: 'Guindy', time: '21:20', landmark: 'Under Flyover' },
      { id: 'bp_maa_3', name: 'Tambaram', time: '21:45', landmark: 'Hindu Mission Hospital' }
    ],
    dropping_points: [
      { id: 'dp_cbe_1', name: 'Neelambur', time: '04:15', landmark: 'Toll Gate' },
      { id: 'dp_cbe_2', name: 'KMCH', time: '04:30', landmark: 'Airport Junction' },
      { id: 'dp_cbe_3', name: 'Gandhipuram Omni Bus Stand', time: '05:00', landmark: 'KPN Arrival Shed' }
    ]
  },
  {
    id: 'trip_maa_mdu_01',
    operator_id: 'op_orange',
    operator_name: 'Orange Tours & Travels',
    bus_service_number: 'ORG-MDU-801',
    bus_type: 'BharatBenz AC Sleeper (2+1)',
    category: 'sleeper',
    is_ac: true,
    from_city: 'Chennai',
    to_city: 'Madurai',
    departure_time: '22:00',
    arrival_time: '06:00',
    duration: '8h 00m',
    base_fare: 780,
    available_seats: 20,
    rating: 4.7,
    total_reviews: 640,
    has_live_tracking: true,
    amenities: ['Charging Point', 'Blankets', 'Water Bottle', 'Reading Light', 'Emergency Hammer'],
    cancellation_policy: [
      { time_limit: 'Before 24h of departure', refund_percentage: 90, deduction_percentage: 10 },
      { time_limit: '12h to 24h before departure', refund_percentage: 50, deduction_percentage: 50 },
      { time_limit: '0h to 12h before departure', refund_percentage: 0, deduction_percentage: 100 }
    ],
    boarding_points: [
      { id: 'bp_maa_1', name: 'Koyambedu', time: '22:00', landmark: 'Orange Counter 12' },
      { id: 'bp_maa_3', name: 'Perungalathur', time: '22:45', landmark: 'Near Bus Stop' }
    ],
    dropping_points: [
      { id: 'dp_mdu_1', name: 'Mattuthavani Bus Stand', time: '05:30', landmark: 'Integrated Bus Terminus' },
      { id: 'dp_mdu_2', name: 'Periyar Bus Stand', time: '06:00', landmark: 'Near Railway Station' }
    ]
  },
  {
    id: 'trip_cbe_cok_01',
    operator_id: 'op_kpn',
    operator_name: 'KPN Travels',
    bus_service_number: 'KPN-COK-112',
    bus_type: 'Volvo AC Semi-Sleeper (2+2)',
    category: 'seater',
    is_ac: true,
    from_city: 'Coimbatore',
    to_city: 'Kochi',
    departure_time: '06:30',
    arrival_time: '11:00',
    duration: '4h 30m',
    base_fare: 480,
    available_seats: 22,
    rating: 4.5,
    total_reviews: 310,
    has_live_tracking: true,
    amenities: ['Water Bottle', 'Charging Point', 'Air Suspension'],
    cancellation_policy: [
      { time_limit: 'Before 24h of departure', refund_percentage: 90, deduction_percentage: 10 },
      { time_limit: '12h to 24h before departure', refund_percentage: 50, deduction_percentage: 50 },
      { time_limit: '0h to 12h before departure', refund_percentage: 0, deduction_percentage: 100 }
    ],
    boarding_points: [
      { id: 'bp_cbe_1', name: 'Gandhipuram Omni Stand', time: '06:30', landmark: 'Counter 2' },
      { id: 'bp_cbe_uk', name: 'Ukkadam Bus Stand', time: '06:50', landmark: 'Near Clock Tower' }
    ],
    dropping_points: [
      { id: 'dp_cok_1', name: 'Aluva Flyover', time: '10:15', landmark: 'Under Metro Station' },
      { id: 'dp_cok_2', name: 'Vytilla Mobility Hub', time: '11:00', landmark: 'Hub Entry Gate' }
    ]
  }
];

// Generate interactive lower and upper deck seat layouts for a bus trip
export function generateBusSeatLayout(trip) {
  const isSleeper = (trip?.category || 'sleeper') === 'sleeper';
  const basePrice = trip?.base_fare || 850;

  if (isSleeper) {
    // 2+1 Sleeper Layout: Lower deck (L1..L15) and Upper deck (U1..U15)
    // Left side: Single berths (Window). Right side: Double berths (Aisle + Window).
    const lowerDeck = [];
    const upperDeck = [];

    // Pre-booked seeds for realism
    const bookedSeats = ['L1', 'L5', 'L9', 'U2', 'U6', 'U11'];
    const heldSeats = ['L4'];

    // 5 Rows of berths
    for (let row = 1; row <= 5; row++) {
      // Single Berth (Left window)
      const singleNum = row;
      lowerDeck.push({
        id: `L${singleNum}`,
        seat_number: `L${singleNum}`,
        deck: 'lower',
        type: 'sleeper_single',
        position: 'window_single',
        row,
        price: basePrice + 120, // Single window berth premium
        is_booked: bookedSeats.includes(`L${singleNum}`),
        is_held: heldSeats.includes(`L${singleNum}`),
        ladies_seat: row === 1
      });
      upperDeck.push({
        id: `U${singleNum}`,
        seat_number: `U${singleNum}`,
        deck: 'upper',
        type: 'sleeper_single',
        position: 'window_single',
        row,
        price: basePrice + 150, // Upper single window berth
        is_booked: bookedSeats.includes(`U${singleNum}`),
        is_held: heldSeats.includes(`U${singleNum}`),
        ladies_seat: false
      });

      // Double Berths (Right side: Aisle and Window)
      const doubleAisleNum = 5 + (row * 2 - 1);
      const doubleWindowNum = 5 + (row * 2);

      // Lower Double Aisle
      lowerDeck.push({
        id: `L${doubleAisleNum}`,
        seat_number: `L${doubleAisleNum}`,
        deck: 'lower',
        type: 'sleeper_double',
        position: 'aisle_double',
        row,
        price: basePrice,
        is_booked: bookedSeats.includes(`L${doubleAisleNum}`),
        is_held: heldSeats.includes(`L${doubleAisleNum}`),
        ladies_seat: false
      });
      // Lower Double Window
      lowerDeck.push({
        id: `L${doubleWindowNum}`,
        seat_number: `L${doubleWindowNum}`,
        deck: 'lower',
        type: 'sleeper_double',
        position: 'window_double',
        row,
        price: basePrice + 50,
        is_booked: bookedSeats.includes(`L${doubleWindowNum}`),
        is_held: heldSeats.includes(`L${doubleWindowNum}`),
        ladies_seat: row === 1
      });

      // Upper Double Aisle
      upperDeck.push({
        id: `U${doubleAisleNum}`,
        seat_number: `U${doubleAisleNum}`,
        deck: 'upper',
        type: 'sleeper_double',
        position: 'aisle_double',
        row,
        price: basePrice + 30,
        is_booked: bookedSeats.includes(`U${doubleAisleNum}`),
        is_held: heldSeats.includes(`U${doubleAisleNum}`),
        ladies_seat: false
      });
      // Upper Double Window
      upperDeck.push({
        id: `U${doubleWindowNum}`,
        seat_number: `U${doubleWindowNum}`,
        deck: 'upper',
        type: 'sleeper_double',
        position: 'window_double',
        row,
        price: basePrice + 80,
        is_booked: bookedSeats.includes(`U${doubleWindowNum}`),
        is_held: heldSeats.includes(`U${doubleWindowNum}`),
        ladies_seat: false
      });
    }

    return {
      type: 'sleeper',
      decks: ['lower', 'upper'],
      lower_deck: lowerDeck,
      upper_deck: upperDeck,
      total_seats: lowerDeck.length + upperDeck.length
    };
  } else {
    // 2+2 Executive Seater Layout (Single deck, 9 rows, 36 seats)
    const seats = [];
    const bookedSeats = ['1W', '2A', '5W', '6A', '13W', '14A'];
    const heldSeats = ['9W'];

    for (let r = 1; r <= 8; r++) {
      const w1 = `${r * 4 - 3}W`;
      const a1 = `${r * 4 - 2}A`;
      const a2 = `${r * 4 - 1}A`;
      const w2 = `${r * 4}W`;

      seats.push(
        { id: w1, seat_number: w1, deck: 'main', type: 'seater', position: 'window_left', row: r, price: basePrice + 30, is_booked: bookedSeats.includes(w1), is_held: heldSeats.includes(w1), ladies_seat: r === 1 },
        { id: a1, seat_number: a1, deck: 'main', type: 'seater', position: 'aisle_left', row: r, price: basePrice, is_booked: bookedSeats.includes(a1), is_held: heldSeats.includes(a1), ladies_seat: false },
        { id: a2, seat_number: a2, deck: 'main', type: 'seater', position: 'aisle_right', row: r, price: basePrice, is_booked: bookedSeats.includes(a2), is_held: heldSeats.includes(a2), ladies_seat: false },
        { id: w2, seat_number: w2, deck: 'main', type: 'seater', position: 'window_right', row: r, price: basePrice + 30, is_booked: bookedSeats.includes(w2), is_held: heldSeats.includes(w2), ladies_seat: false }
      );
    }

    return {
      type: 'seater',
      decks: ['main'],
      main_deck: seats,
      total_seats: seats.length
    };
  }
}
