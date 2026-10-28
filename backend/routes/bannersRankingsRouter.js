import { getDB, saveCollection } from '../database/db.js';

export function handleBannersRankingsRoutes(req, res, pathname, method, query, body, sendJSON) {
  const db = getDB();

  // 1. Ad Banners
  if (pathname === '/api/v1/ad-banners/active' || pathname === '/api/v1/ad-banners' || pathname === '/api/v1/ad-banners/admin') {
    if (method === 'GET') {
      const activeOnly = pathname === '/api/v1/ad-banners/active';
      const list = activeOnly ? db.banners.filter(b => b.is_active !== false) : db.banners;
      return sendJSON(res, {
        success: true,
        count: list.length,
        banners: list,
        data: list
      });
    }

    if (method === 'POST') {
      const newBanner = {
        id: `ban_${Date.now()}`,
        banner_id: `ban_${Date.now()}`,
        title: body.title || 'Special Promotion',
        subtitle: body.subtitle || '',
        image: body.image || body.image_url || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1600&q=80',
        image_url: body.image_url || body.image || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1600&q=80',
        link: body.link || body.target_url || '/collection/clothing',
        target_url: body.target_url || body.link || '/collection/clothing',
        badge: body.badge || 'Featured',
        is_active: body.is_active !== undefined ? body.is_active : true,
        created_at: new Date().toISOString()
      };

      db.banners.push(newBanner);
      saveCollection('banners');
      return sendJSON(res, { success: true, message: 'Banner saved', data: newBanner }, 201);
    }
  }

  if (pathname.startsWith('/api/v1/ad-banners/')) {
    const bannerId = pathname.split('/').pop();

    if (method === 'DELETE') {
      db.banners = db.banners.filter(b => b.id !== bannerId && b.banner_id !== bannerId);
      saveCollection('banners');
      return sendJSON(res, { success: true, message: 'Banner deleted' });
    }

    if (method === 'PUT' || method === 'PATCH') {
      const idx = db.banners.findIndex(b => b.id === bannerId || b.banner_id === bannerId);
      if (idx > -1) {
        db.banners[idx] = { ...db.banners[idx], ...body };
        saveCollection('banners');
        return sendJSON(res, { success: true, message: 'Banner updated', data: db.banners[idx] });
      }
      return sendJSON(res, { success: false, message: 'Banner not found' }, 404);
    }
  }

  // 2. Brand Rankings & Homepage Showcase
  if (pathname.startsWith('/api/v1/rankings')) {
    if (pathname === '/api/v1/rankings/showcase' && method === 'GET') {
      return sendJSON(res, {
        success: true,
        data: db.rankings.showcase || []
      });
    }

    if (pathname === '/api/v1/rankings/open' && method === 'GET') {
      return sendJSON(res, {
        success: true,
        data: db.rankings.open || []
      });
    }

    if (pathname === '/api/v1/rankings/vote' && method === 'POST') {
      const compId = body.competition_id;
      const sellerId = body.seller_id;

      // Find competition and brand
      const comp = (db.rankings.open || []).find(c => c.id === compId);
      if (comp && Array.isArray(comp.brands)) {
        const brand = comp.brands.find(b => b.id === sellerId);
        if (brand) {
          brand.votes = (brand.votes || 0) + 1;
          saveCollection('rankings');
          return sendJSON(res, {
            success: true,
            message: `Vote recorded for ${brand.name}!`,
            total_votes: brand.votes
          });
        }
      }

      return sendJSON(res, { success: true, message: 'Vote recorded!' });
    }

    if (pathname === '/api/v1/rankings/admin' && method === 'GET') {
      return sendJSON(res, { success: true, data: db.rankings.admin || [] });
    }

    if (pathname === '/api/v1/rankings/admin' && method === 'POST') {
      if (!db.rankings.admin) db.rankings.admin = [];
      const newComp = { id: `comp-${Date.now()}`, ...body };
      db.rankings.admin.push(newComp);
      saveCollection('rankings');
      return sendJSON(res, { success: true, data: newComp }, 201);
    }

    if (pathname.includes('/rankings/admin/winner') && method === 'POST') {
      return sendJSON(res, { success: true, message: 'Winner declared successfully' });
    }
  }

  return false;
}
