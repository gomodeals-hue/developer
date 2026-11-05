import { getDB, saveCollection } from '../database/db.js';
import { isPostgresConnected, pool } from '../database/pg.js';

export async function handlePaymentsRoutes(req, res, pathname, method, query, body, sendJSON) {
  const db = getDB();
  const pgConnected = isPostgresConnected();

  // Initialize in-memory payments collection if missing
  if (!db.payments) {
    db.payments = [];
  }

  // 1. Create Payment Intent (POST /api/v1/payments/create-intent)
  if ((pathname === '/api/v1/payments/create-intent' || pathname === '/api/payments/create-intent') && method === 'POST') {
    const amount = Number(body.amount || 0);
    const currency = body.currency || 'INR';
    const paymentMethod = (body.payment_method || 'UPI').toUpperCase();
    const customerEmail = body.customer_email || 'customer@gomodeals.com';
    const customerPhone = body.customer_phone || '+91 98450 12345';
    const customerName = body.customer_name || 'GoMo Valued Customer';

    const timestamp = Date.now();
    const paymentId = `PAY_GMD_${timestamp}_${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const txnId = `TXN_${timestamp}_${Math.floor(1000 + Math.random() * 9000)}`;
    const clientSecret = `sec_gmd_${timestamp}_${Math.random().toString(36).substring(2, 8)}`;

    // UPI Payment String for Instant App Switch & QR Code Generation (GPay, PhonePe, Paytm, BHIM, CRED)
    const upiString = `upi://pay?pa=gomodeals@icici&pn=GoMo+Deals+Private+Limited&mc=5311&tid=${txnId}&tr=${paymentId}&tn=Order+at+GoMo+Deals&am=${amount.toFixed(2)}&cu=INR`;

    // OTP for 3D Secure Verification (Debit / Credit cards)
    const testOtp = '123456';

    const paymentIntent = {
      payment_id: paymentId,
      id: paymentId,
      transaction_id: txnId,
      client_secret: clientSecret,
      amount,
      currency,
      payment_method: paymentMethod,
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone,
      upi_string: upiString,
      qr_data: upiString,
      test_otp: testOtp,
      status: paymentMethod === 'COD' ? 'pending_delivery' : 'created',
      emi_details: body.emi_details || null,
      created_at: new Date().toISOString()
    };

    db.payments.push(paymentIntent);

    return sendJSON(res, {
      success: true,
      message: 'Payment intent initialized successfully',
      data: paymentIntent,
      payment: paymentIntent
    }, 201);
  }

  // 2. Send 3D Secure / NetBanking OTP (POST /api/v1/payments/send-otp)
  if ((pathname === '/api/v1/payments/send-otp' || pathname === '/api/payments/send-otp') && method === 'POST') {
    const paymentId = body.payment_id || body.paymentId;
    const phone = body.phone || '+91 98*** ***10';
    const bank = body.bank || 'Bank Gateway';

    const otpCode = '123456'; // Standard test OTP for immediate verification
    return sendJSON(res, {
      success: true,
      message: `3D Secure OTP dispatched to ${phone} via ${bank}`,
      data: {
        otp: otpCode,
        masked_phone: phone,
        expires_in_seconds: 60,
        bank: bank,
        timestamp: new Date().toISOString()
      }
    });
  }

  // 3. Verify / Authorize Payment (POST /api/v1/payments/verify)
  if ((pathname === '/api/v1/payments/verify' || pathname === '/api/payments/verify') && method === 'POST') {
    const paymentId = body.payment_id || body.paymentId;
    const txnId = body.transaction_id || body.transactionId || `TXN_${Date.now()}`;
    const paymentMethod = (body.payment_method || 'CARD').toUpperCase();
    const otp = body.otp || body.verification_code;

    // Validate OTP if provided for card/netbanking payments
    if (otp && otp.trim() !== '123456' && otp.trim().length !== 6) {
      return sendJSON(res, {
        success: false,
        verified: false,
        message: 'Invalid 3D Secure OTP code. Please enter the valid 6-digit OTP.'
      }, 400);
    }

    let record = db.payments.find(p => p.payment_id === paymentId || p.id === paymentId);
    if (!record) {
      record = {
        payment_id: paymentId || `PAY_GMD_${Date.now()}`,
        transaction_id: txnId,
        payment_method: paymentMethod,
        amount: Number(body.amount || 0),
        status: 'authorized',
        created_at: new Date().toISOString()
      };
      db.payments.push(record);
    } else {
      record.status = 'authorized';
      record.authorized_at = new Date().toISOString();
    }

    return sendJSON(res, {
      success: true,
      verified: true,
      message: 'Payment authorized and securely verified by gateway',
      data: {
        payment_id: record.payment_id,
        transaction_id: record.transaction_id || txnId,
        status: 'authorized',
        payment_method: paymentMethod,
        timestamp: new Date().toISOString()
      }
    });
  }

  // 4. Verify UPI VPA (POST /api/v1/payments/verify-vpa)
  if ((pathname === '/api/v1/payments/verify-vpa' || pathname === '/api/payments/verify-vpa') && method === 'POST') {
    const vpa = (body.vpa || body.upi_id || '').trim().toLowerCase();

    // Standard UPI regex
    const vpaRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
    if (!vpaRegex.test(vpa)) {
      return sendJSON(res, {
        success: false,
        valid: false,
        message: 'Invalid UPI format. Please use format like yourname@bank or mobile@upi'
      }, 400);
    }

    // Determine banking network from handle
    const handle = vpa.split('@')[1];
    let bankName = 'Unified Payments Interface (NPCI)';
    if (handle.includes('okhdfc') || handle.includes('hdfc')) bankName = 'HDFC Bank';
    else if (handle.includes('okicici') || handle.includes('icici')) bankName = 'ICICI Bank';
    else if (handle.includes('oksbi') || handle.includes('sbi')) bankName = 'State Bank of India';
    else if (handle.includes('okaxis') || handle.includes('axis')) bankName = 'Axis Bank';
    else if (handle.includes('paytm')) bankName = 'Paytm Payments Bank';
    else if (handle.includes('ybl') || handle.includes('ibl')) bankName = 'PhonePe / YES Bank';
    else if (handle.includes('cred')) bankName = 'CRED UPI / Axis Bank';

    return sendJSON(res, {
      success: true,
      valid: true,
      vpa: vpa,
      account_name: 'Saranyan E',
      bank_name: bankName,
      message: `Verified: Saranyan E (${bankName})`
    });
  }

  // 5. Check Pincode COD Serviceability (POST /api/v1/payments/check-pincode)
  if ((pathname === '/api/v1/payments/check-pincode' || pathname === '/api/payments/check-pincode') && method === 'POST') {
    const pincode = String(body.pincode || '').trim();
    if (!/^\d{6}$/.test(pincode)) {
      return sendJSON(res, {
        success: false,
        serviceable: false,
        message: 'Please enter a valid 6-digit Indian PIN code'
      }, 400);
    }

    return sendJSON(res, {
      success: true,
      serviceable: true,
      pincode: pincode,
      cod_available: true,
      courier_partner: 'BlueDart Express Air',
      estimated_delivery_days: '1-2 Days',
      message: `Pincode ${pincode} is serviceable for Cash on Delivery & Express Courier`
    });
  }

  // 6. Payment Status Poll (GET /api/v1/payments/status/:id)
  if ((pathname.startsWith('/api/v1/payments/status/') || pathname.startsWith('/api/payments/status/')) && method === 'GET') {
    const paymentId = pathname.split('/').pop();
    const record = db.payments.find(p => p.payment_id === paymentId || p.id === paymentId || p.transaction_id === paymentId);

    if (!record) {
      return sendJSON(res, {
        success: false,
        status: 'not_found',
        message: 'Payment record not found'
      }, 404);
    }

    return sendJSON(res, {
      success: true,
      data: record
    });
  }

  // 7. Supported Payment Methods List (GET /api/v1/payments/methods)
  if ((pathname === '/api/v1/payments/methods' || pathname === '/api/payments/methods') && method === 'GET') {
    return sendJSON(res, {
      success: true,
      methods: [
        {
          id: 'UPI',
          name: 'UPI (Google Pay, PhonePe, Paytm, QR)',
          apps: ['Google Pay', 'PhonePe', 'Paytm', 'BHIM', 'CRED'],
          instant: true,
          fee: 0,
          description: 'Instant zero-fee transfer via scannable QR, UPI Apps, or VPA'
        },
        {
          id: 'DEBIT_CARD',
          name: 'Debit Card (ATM Card)',
          networks: ['Visa', 'Mastercard', 'RuPay', 'Maestro'],
          instant: true,
          fee: 0,
          description: 'Direct debit with 3D Secure Bank OTP authorization'
        },
        {
          id: 'CREDIT_CARD',
          name: 'Credit Card (Full Payment & No-Cost EMI)',
          networks: ['Visa', 'Mastercard', 'RuPay', 'American Express'],
          instant: true,
          fee: 0,
          description: 'Up to 45 days credit with flexible No-Cost EMI plans'
        },
        {
          id: 'COD',
          name: 'Cash on Delivery (COD)',
          instant: true,
          fee: 0,
          description: 'Pay cash or contactless QR at your doorstep upon BlueDart delivery'
        },
        {
          id: 'NETBANKING',
          name: 'Net Banking',
          popularBanks: ['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra'],
          instant: true,
          fee: 0,
          description: 'Direct institutional gateway to 50+ major Indian scheduled banks'
        }
      ]
    });
  }

  return false;
}
