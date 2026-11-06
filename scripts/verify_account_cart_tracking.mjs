async function verify() {
  console.log('--- Verifying Account-Based Cart & Activity Tracking ---');

  // 1. Fetch Customers from Admin API
  const resCustomers = await fetch('http://127.0.0.1:5000/api/v1/admin/customers');
  const customersData = await resCustomers.json();
  console.log(`[Admin Customers] HTTP ${resCustomers.status}, success: ${customersData.success}, count: ${customersData.count}`);
  
  if (customersData.data && customersData.data.length > 0) {
    customersData.data.forEach(c => {
      console.log(`- Customer: ${c.name} (${c.email}, ID: ${c.customer_id})`);
      console.log(`  Cart: ${c.active_cart?.items_count || 0} units, Total: ₹${c.active_cart?.total_value || 0}, Status: ${c.active_cart?.status}, Idle: ${c.active_cart?.days_idle}d`);
      console.log(`  Tracks Count: ${c.tracks_count || 0}`);
      if (c.active_cart?.items?.length > 0) {
        c.active_cart.items.forEach(it => {
          console.log(`    * Item: "${it.name}" (Qty: ${it.quantity}, Price: ₹${it.price}, Variant: ${it.variant_value || 'None'}, Account: ${it.account_id || 'N/A'})`);
        });
      }
    });
  }

  // 2. Test Cart Tracks Endpoint for Saranyan (usr-1793872697845)
  const saranyan = customersData.data.find(c => c.email === 'saranyangmd@gmail.com' || c.customer_id === 'usr-1793872697845');
  const targetId = saranyan ? saranyan.customer_id : 'usr-1793872697845';

  const resTracks = await fetch(`http://127.0.0.1:5000/api/v1/cart/${targetId}/tracks`);
  const tracksData = await resTracks.json();
  console.log(`\n[Cart Tracks for ${targetId}] HTTP ${resTracks.status}, count: ${tracksData.count}`);
  if (tracksData.data?.length > 0) {
    tracksData.data.forEach((t, i) => {
      console.log(`  [Track #${i+1}] [${t.action}] ${t.title}`);
      console.log(`    Desc: ${t.description}`);
      console.log(`    Time: ${t.timestamp}`);
    });
  }

  // 3. Test Add to Cart with account metadata
  console.log(`\n[Simulating Add to Cart for ${targetId}]`);
  const resAdd = await fetch('http://127.0.0.1:5000/api/v1/cart/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: targetId,
      customer_email: 'saranyangmd@gmail.com',
      customer_name: 'saranyangmd',
      product_id: 'gmd-pooja-001',
      name: 'Pure Brass Pooja Thali & Diya Set',
      price: 1499,
      quantity: 1,
      variant_value: 'Standard Brass'
    })
  });
  const addData = await resAdd.json();
  console.log(`Add to Cart Response: HTTP ${resAdd.status}, success: ${addData.success}, total items: ${addData.total_items}`);

  // 4. Re-fetch tracks to verify automatic track recording
  const resTracksAfter = await fetch(`http://127.0.0.1:5000/api/v1/cart/${targetId}/tracks`);
  const tracksAfterData = await resTracksAfter.json();
  console.log(`Updated Tracks Count for ${targetId}: ${tracksAfterData.count}`);
  console.log(`Latest Track: [${tracksAfterData.data[0]?.action}] ${tracksAfterData.data[0]?.title} - ${tracksAfterData.data[0]?.description}`);

  console.log('\n--- Account-Based Cart & Activity Tracking Verification Complete ---');
}

verify().catch(e => console.error('Verification failed:', e));

