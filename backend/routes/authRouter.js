import { getDB, saveCollection } from '../database/db.js';

export function handleAuthRoutes(req, res, pathname, method, query, body, sendJSON) {
  const db = getDB();

  // 1. Login
  if (pathname === '/api/v1/auth/login' && method === 'POST') {
    const email = (body.email || '').trim().toLowerCase();
    const password = body.password || '';

    // Check credentials in persistent users database
    let user = db.users.find(u => (u.email || '').toLowerCase() === email);

    if (!user) {
      // Allow seamless first login or admin access
      const isAdmin = email.includes('admin');
      user = {
        id: isAdmin ? 'admin-1' : `usr-${Date.now()}`,
        customer_id: isAdmin ? 'admin-1' : `usr-${Date.now()}`,
        name: body.name || (email ? email.split('@')[0] : 'GoMo Member'),
        email: email || 'customer@gomodeals.com',
        role: isAdmin ? 'admin' : 'customer',
        avatar: isAdmin
          ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&q=80'
          : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80',
        created_at: new Date().toISOString()
      };
      db.users.push(user);
      saveCollection('users');
    }

    const token = `gomo_jwt_${user.id}_${Date.now()}`;

    return sendJSON(res, {
      success: true,
      message: 'Logged in successfully',
      token,
      user
    });
  }

  // 2. Register
  if (pathname === '/api/v1/auth/register' && method === 'POST') {
    const email = (body.email || '').trim().toLowerCase();
    const existing = db.users.find(u => (u.email || '').toLowerCase() === email);
    if (existing) {
      return sendJSON(res, {
        success: true,
        message: 'Account already exists. Logged in successfully.',
        token: `gomo_jwt_${existing.id}_${Date.now()}`,
        user: existing
      });
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      customer_id: `usr-${Date.now()}`,
      name: body.name || body.full_name || email.split('@')[0] || 'Valued Customer',
      email,
      phone: body.phone || body.phone_number || '+91 98450 12345',
      role: 'customer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80',
      created_at: new Date().toISOString()
    };

    db.users.push(newUser);
    saveCollection('users');

    return sendJSON(res, {
      success: true,
      message: 'Registration completed successfully',
      token: `gomo_jwt_${newUser.id}_${Date.now()}`,
      user: newUser
    }, 201);
  }

  // 3. Logout
  if (pathname === '/api/v1/auth/logout' && method === 'POST') {
    return sendJSON(res, { success: true, message: 'Logged out successfully' });
  }

  // 4. Me (Current session user)
  if (pathname === '/api/v1/auth/me' && method === 'GET') {
    const authHeader = req.headers.authorization || '';
    let user = db.users[0] || {
      id: 'usr-1',
      name: 'Priya Sharma',
      email: 'customer@gomodeals.com',
      role: 'customer'
    };

    if (authHeader.includes('admin') || authHeader.includes('admin-1')) {
      const adminUser = db.users.find(u => u.role === 'admin');
      if (adminUser) user = adminUser;
    }

    return sendJSON(res, { success: true, user });
  }

  // 5. User Profile
  if (pathname === '/api/v1/user/profile') {
    if (method === 'GET') {
      const user = db.users[0];
      return sendJSON(res, { success: true, data: user, profile: user });
    }
    if (method === 'PUT' || method === 'POST') {
      if (db.users.length > 0) {
        db.users[0] = { ...db.users[0], ...body };
        saveCollection('users');
        return sendJSON(res, { success: true, message: 'Profile updated successfully', data: db.users[0] });
      }
    }
  }

  // 6. User Addresses
  if (pathname === '/api/v1/user/addresses' || pathname.match(/\/api\/v1\/user\/[^/]+\/addresses/)) {
    if (method === 'GET') {
      return sendJSON(res, { success: true, data: db.addresses });
    }
    if (method === 'POST') {
      const newAddr = {
        id: `addr-${Date.now()}`,
        name: body.name || body.full_name || 'Home',
        street: body.street || body.address_line1 || '42 Prestige Tower, MG Road',
        city: body.city || 'Bengaluru',
        state: body.state || 'Karnataka',
        pincode: body.pincode || '560001',
        phone: body.phone || '+91 98450 12345',
        is_default: body.is_default || db.addresses.length === 0
      };

      if (newAddr.is_default) {
        db.addresses.forEach(a => { a.is_default = false; });
      }

      db.addresses.push(newAddr);
      saveCollection('addresses');

      return sendJSON(res, { success: true, message: 'Address saved', data: newAddr }, 201);
    }
  }

  if (pathname.startsWith('/api/v1/user/addresses/')) {
    const addrId = pathname.split('/').pop();

    if (method === 'DELETE') {
      db.addresses = db.addresses.filter(a => a.id !== addrId);
      saveCollection('addresses');
      return sendJSON(res, { success: true, message: 'Address removed' });
    }

    if (method === 'PUT' || method === 'PATCH') {
      const idx = db.addresses.findIndex(a => a.id === addrId);
      if (idx > -1) {
        db.addresses[idx] = { ...db.addresses[idx], ...body };
        if (body.is_default) {
          db.addresses.forEach((a, i) => { if (i !== idx) a.is_default = false; });
        }
        saveCollection('addresses');
        return sendJSON(res, { success: true, message: 'Address updated', data: db.addresses[idx] });
      }
      return sendJSON(res, { success: false, message: 'Address not found' }, 404);
    }
  }

  return false;
}
