import { getDB, saveCollection } from '../database/db.js';
import { isPostgresConnected, pool } from '../database/pg.js';

export async function handleAuthRoutes(req, res, pathname, method, query, body, sendJSON) {
  const db = getDB();
  const pgConnected = isPostgresConnected();

  // 1. Login
  if (pathname === '/api/v1/auth/login' && method === 'POST') {
    const email = (body.email || '').trim().toLowerCase();
    const password = body.password || '';

    let user = null;

    if (pgConnected) {
      try {
        const userRes = await pool.query('SELECT * FROM users WHERE LOWER(email) = LOWER($1)', [email]);
        if (userRes.rows.length > 0) {
          user = userRes.rows[0];
        }
      } catch (err) {
        console.warn('[Auth] Postgres user query error:', err.message);
      }
    }

    if (!user) {
      user = db.users.find(u => (u.email || '').toLowerCase() === email);
    }

    if (!user) {
      // Auto-provision account if first time login
      const isAdmin = email.includes('admin');
      const newUser = {
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

      if (pgConnected) {
        try {
          const insertRes = await pool.query(`
            INSERT INTO users (id, customer_id, name, email, password_hash, role, avatar)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
          `, [newUser.id, newUser.customer_id, newUser.name, newUser.email, password || 'password123', newUser.role, newUser.avatar]);
          user = insertRes.rows[0];
        } catch (err) {
          console.warn('[Auth] Postgres insert error:', err.message);
          user = newUser;
        }
      } else {
        user = newUser;
      }

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
    
    // Check if user already exists
    let existing = null;
    if (pgConnected) {
      try {
        const checkRes = await pool.query('SELECT * FROM users WHERE LOWER(email) = LOWER($1)', [email]);
        if (checkRes.rows.length > 0) existing = checkRes.rows[0];
      } catch (err) {
        console.warn('[Auth] Postgres check existing user error:', err.message);
      }
    }

    if (!existing) {
      existing = db.users.find(u => (u.email || '').toLowerCase() === email);
    }

    if (existing) {
      return sendJSON(res, {
        success: true,
        message: 'Account already exists. Logged in successfully.',
        token: `gomo_jwt_${existing.id}_${Date.now()}`,
        user: existing
      });
    }

    const newId = `usr-${Date.now()}`;
    const newUser = {
      id: newId,
      customer_id: newId,
      name: body.name || body.full_name || email.split('@')[0] || 'Valued Customer',
      email,
      phone: body.phone || body.phone_number || '+91 98450 12345',
      role: 'customer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80',
      created_at: new Date().toISOString()
    };

    if (pgConnected) {
      try {
        const resInsert = await pool.query(`
          INSERT INTO users (id, customer_id, name, email, password_hash, phone, role, avatar)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          RETURNING *;
        `, [
          newUser.id,
          newUser.customer_id,
          newUser.name,
          newUser.email,
          body.password || 'password123',
          newUser.phone,
          newUser.role,
          newUser.avatar
        ]);
        newUser.created_at = resInsert.rows[0].created_at;
      } catch (err) {
        console.warn('[Auth] Postgres register insertion error:', err.message);
      }
    }

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
    let user = null;

    if (pgConnected) {
      try {
        if (authHeader.includes('admin') || authHeader.includes('admin-1')) {
          const resAdmin = await pool.query("SELECT * FROM users WHERE role = 'admin' LIMIT 1");
          if (resAdmin.rows.length > 0) user = resAdmin.rows[0];
        } else {
          // Extract token id or default to first customer
          const match = authHeader.match(/usr-[0-9]+/);
          if (match) {
            const resUser = await pool.query('SELECT * FROM users WHERE id = $1', [match[0]]);
            if (resUser.rows.length > 0) user = resUser.rows[0];
          }
          if (!user) {
            const resFirst = await pool.query("SELECT * FROM users WHERE role != 'admin' LIMIT 1");
            if (resFirst.rows.length > 0) user = resFirst.rows[0];
          }
        }
      } catch (err) {
        console.warn('[Auth] Postgres me query error:', err.message);
      }
    }

    if (!user) {
      user = db.users[0] || {
        id: 'usr-1',
        name: 'Priya Sharma',
        email: 'customer@gomodeals.com',
        role: 'customer'
      };

      if (authHeader.includes('admin') || authHeader.includes('admin-1')) {
        const adminUser = db.users.find(u => u.role === 'admin');
        if (adminUser) user = adminUser;
      }
    }

    return sendJSON(res, { success: true, user });
  }

  // 5. User Profile
  if (pathname === '/api/v1/user/profile') {
    if (method === 'GET') {
      let user = null;
      if (pgConnected) {
        try {
          const resUser = await pool.query('SELECT * FROM users LIMIT 1');
          if (resUser.rows.length > 0) user = resUser.rows[0];
        } catch {}
      }
      if (!user) user = db.users[0];
      return sendJSON(res, { success: true, data: user, profile: user });
    }
    if (method === 'PUT' || method === 'POST') {
      if (pgConnected && body.id) {
        try {
          await pool.query('UPDATE users SET name = COALESCE($1, name), phone = COALESCE($2, phone) WHERE id = $3', [body.name, body.phone, body.id]);
        } catch {}
      }
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
      if (pgConnected) {
        try {
          const resAddr = await pool.query('SELECT * FROM addresses ORDER BY is_default DESC, created_at DESC');
          if (resAddr.rows.length > 0) {
            return sendJSON(res, { success: true, data: resAddr.rows });
          }
        } catch {}
      }
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

      if (pgConnected) {
        try {
          if (newAddr.is_default) {
            await pool.query('UPDATE addresses SET is_default = FALSE');
          }
          await pool.query(`
            INSERT INTO addresses (id, name, street, city, state, pincode, phone, is_default)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
          `, [newAddr.id, newAddr.name, newAddr.street, newAddr.city, newAddr.state, newAddr.pincode, newAddr.phone, newAddr.is_default]);
        } catch (err) {
          console.warn('[Address] Postgres save address error:', err.message);
        }
      }

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
      if (pgConnected) {
        try { await pool.query('DELETE FROM addresses WHERE id = $1', [addrId]); } catch {}
      }
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
