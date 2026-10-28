// Automated API Verification for GoMoDeals Movie and Bus Ticket Booking System
async function runTests() {
  const baseUrl = 'http://127.0.0.1:5000';
  let passed = 0;
  let failed = 0;

  async function test(name, fn) {
    try {
      await fn();
      console.log(`PASS: ${name}`);
      passed++;
    } catch (err) {
      console.error(`FAIL: ${name}: ${err.message}`);
      failed++;
    }
  }

  console.log('\n--- STARTING TICKET SYSTEM API VALIDATION ---\n');

  // 1. Health check
  await test('1. GET /api/v1/health', async () => {
    const res = await fetch(`${baseUrl}/api/v1/health`);
    const data = await res.json();
    if (data.status !== 'online') throw new Error('Health check returned non-online status');
  });

  // 2. Movies list
  await test('2. GET /api/v1/movies', async () => {
    const res = await fetch(`${baseUrl}/api/v1/movies`);
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) throw new Error('Movies list empty');
  });

  // 3. Bus cities
  await test('3. GET /api/v1/buses/cities', async () => {
    const res = await fetch(`${baseUrl}/api/v1/buses/cities`);
    const data = await res.json();
    if (!data.success || !Array.isArray(data.cities) || data.cities.length === 0) {
      throw new Error('Bus cities failed');
    }
  });

  // 4. Bus search
  let foundTripId = null;
  await test('4. GET /api/v1/buses/search?from=Coimbatore&to=Chennai', async () => {
    const res = await fetch(`${baseUrl}/api/v1/buses/search?from=Coimbatore&to=Chennai`);
    const data = await res.json();
    if (!data.success || !Array.isArray(data.trips) || data.trips.length === 0) {
      throw new Error('Bus search returned no trips');
    }
    foundTripId = data.trips[0].id;
  });

  // 5. Bus seats
  await test(`5. GET /api/v1/buses/${foundTripId}/seats`, async () => {
    const res = await fetch(`${baseUrl}/api/v1/buses/${foundTripId}/seats`);
    const data = await res.json();
    if (!data.success || !data.layout) throw new Error('Bus seat layout failed');
  });

  // 6. Bus seat hold
  let holdId = null;
  await test('6. POST /api/v1/bus-seat-holds', async () => {
    const res = await fetch(`${baseUrl}/api/v1/bus-seat-holds`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        trip_id: foundTripId,
        seats: ['L2'],
        user_email: 'test@gomodeals.com'
      })
    });
    const data = await res.json();
    if (!data.success || !data.hold_id) throw new Error('Seat hold failed');
    holdId = data.hold_id;
  });

  // 7. Bus booking creation with commission snapshot
  let bookingId = null;
  await test('7. POST /api/v1/bus-bookings (With Commission Snapshot)', async () => {
    const res = await fetch(`${baseUrl}/api/v1/bus-bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        trip_id: foundTripId,
        lead_passenger: { name: 'Arun Kumar', phone: '9876543210', email: 'arun@gomodeals.com' },
        passengers: [{ seat_number: 'L2', name: 'Arun Kumar', age: '28', gender: 'Male' }],
        seats: ['L2'],
        journey_date: '2026-10-20',
        total_amount: 920,
        payment_method: 'upi'
      })
    });
    const data = await res.json();
    if (!data.success || !data.booking || !data.booking.commission_snapshot) {
      throw new Error('Bus booking failed or missing commission snapshot');
    }
    bookingId = data.booking.id;
  });

  // 8. Shared ticket bookings retrieval
  await test('8. GET /api/v1/ticket-bookings', async () => {
    const res = await fetch(`${baseUrl}/api/v1/ticket-bookings`);
    const data = await res.json();
    if (!data.success || !Array.isArray(data.bookings) || data.bookings.length === 0) {
      throw new Error('Ticket bookings history failed');
    }
  });

  // 9. Cancel booking with refund estimation
  await test(`9. POST /api/v1/ticket-bookings/${bookingId}/cancel`, async () => {
    const res = await fetch(`${baseUrl}/api/v1/ticket-bookings/${bookingId}/cancel`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    if (!data.success || !data.cancellation || data.booking.status !== 'cancelled') {
      throw new Error('Booking cancellation failed');
    }
  });

  // 10. Check refund status
  await test(`10. GET /api/v1/ticket-bookings/${bookingId}/refund`, async () => {
    const res = await fetch(`${baseUrl}/api/v1/ticket-bookings/${bookingId}/refund`);
    const data = await res.json();
    if (!data.success || !data.refund) throw new Error('Refund status retrieval failed');
  });

  console.log(`\n--- TEST RESULTS: ${passed} PASSED, ${failed} FAILED ---\n`);
  if (failed > 0) process.exit(1);
}

runTests();
