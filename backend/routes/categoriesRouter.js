import { getDB, saveCollection } from '../database/db.js';

export function handleCategoriesRoutes(req, res, pathname, method, query, body, sendJSON) {
  const db = getDB();

  // 1. List all categories with live product count
  if ((pathname === '/api/v1/categories' || pathname === '/api/v1/products/categories' || pathname === '/api/v1/admin/categories') && method === 'GET') {
    // Dynamically calculate live product counts
    const countMap = {};
    db.products.forEach(p => {
      const cat = (p.category || '').toLowerCase();
      if (cat) countMap[cat] = (countMap[cat] || 0) + 1;
    });

    const enrichedCategories = db.categories.map(c => ({
      ...c,
      count: countMap[c.slug.toLowerCase()] || countMap[c.id.toLowerCase()] || 0
    }));

    return sendJSON(res, {
      success: true,
      count: enrichedCategories.length,
      data: enrichedCategories
    });
  }

  // 2. Single Category
  if (pathname.startsWith('/api/v1/categories/') && method === 'GET') {
    const slug = pathname.split('/').pop().toLowerCase();
    const cat = db.categories.find(c => c.slug.toLowerCase() === slug || c.id.toLowerCase() === slug);
    if (!cat) {
      return sendJSON(res, { success: false, message: 'Category not found' }, 404);
    }
    const count = db.products.filter(p => (p.category || '').toLowerCase() === slug).length;
    return sendJSON(res, {
      success: true,
      data: { ...cat, count }
    });
  }

  // 3. Create Category
  if ((pathname === '/api/v1/categories' || pathname === '/api/v1/admin/categories') && method === 'POST') {
    const slug = body.slug || (body.name || 'new-category').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const newCat = {
      id: slug,
      slug,
      name: body.name || 'New Category',
      description: body.description || '',
      image_url: body.image_url || 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=80',
      is_active: body.is_active !== undefined ? body.is_active : true,
      subcategories: Array.isArray(body.subcategories) ? body.subcategories : []
    };

    db.categories.push(newCat);
    saveCollection('categories');

    return sendJSON(res, { success: true, message: 'Category created successfully', data: newCat }, 201);
  }

  // 4. Update Category
  if ((pathname.startsWith('/api/v1/admin/category/') || pathname.startsWith('/api/v1/categories/')) && (method === 'PUT' || method === 'PATCH')) {
    const id = pathname.split('/').pop().toLowerCase();
    const idx = db.categories.findIndex(c => c.id.toLowerCase() === id || c.slug.toLowerCase() === id);
    if (idx === -1) {
      return sendJSON(res, { success: false, message: 'Category not found' }, 404);
    }

    db.categories[idx] = {
      ...db.categories[idx],
      ...body,
      id: db.categories[idx].id,
      slug: body.slug || db.categories[idx].slug
    };
    saveCollection('categories');

    return sendJSON(res, { success: true, message: 'Category updated successfully', data: db.categories[idx] });
  }

  // 5. Delete Category
  if ((pathname.startsWith('/api/v1/admin/category/') || pathname.startsWith('/api/v1/categories/')) && method === 'DELETE') {
    const id = pathname.split('/').pop().toLowerCase();
    const initialLen = db.categories.length;
    db.categories = db.categories.filter(c => c.id.toLowerCase() !== id && c.slug.toLowerCase() !== id);
    if (db.categories.length === initialLen) {
      return sendJSON(res, { success: false, message: 'Category not found' }, 404);
    }
    saveCollection('categories');
    return sendJSON(res, { success: true, message: 'Category deleted successfully' });
  }

  return false;
}
