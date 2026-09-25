# GoMo Deals — Backend Migration & Architecture Blueprint
**Single-Vendor E-Commerce Frontend → Spring Boot REST API + PostgreSQL**

---

## 1. Executive Summary

This document specifies the technical architecture, data model mapping, REST API contracts, and migration blueprint for transitioning the **GoMo Deals** single-vendor e-commerce frontend from client-side mock persistence to a production-grade **Spring Boot 3.x + PostgreSQL 16** backend.

The frontend is architected with strict layer separation:
```
UI Components (JSX)
       ↓
Page Containers
       ↓
Services Layer (src/services/*)
       ↓
API Client (src/services/apiClient.js)
       ↓ [Toggle: API_CONFIG.USE_MOCK = false]
Spring Boot REST API Controllers (/api/v1/*)
       ↓
Spring Service Layer (@Service)
       ↓
Spring Data JPA Repositories (@Repository)
       ↓
PostgreSQL 16 Relational Database
```

When backend migration commences, toggling `API_CONFIG.USE_MOCK = false` in `src/services/apiClient.js` will route requests directly to the Spring Boot REST API with **zero structural changes** required in UI pages or components.

---

## 2. Core Service & Endpoint Mapping

| Frontend Service | Future Spring Boot Controller | Base Path | Future Spring Boot Service | Primary PostgreSQL Table(s) |
|---|---|---|---|---|
| `authService.js` | `AuthController` | `/api/v1/auth` | `AuthenticationService` | `users` |
| `userService.js` | `UserController` | `/api/v1/users` | `UserService` | `users`, `addresses` |
| `productService.js` | `ProductController` | `/api/v1/products` | `ProductService` | `products`, `product_images`, `product_variants` |
| `categoryService.js` | `CategoryController` | `/api/v1/categories` | `CategoryService` | `categories`, `subcategories` |
| `cartService.js` | `CartController` | `/api/v1/cart` | `CartService` | `carts`, `cart_items` |
| `wishlistService.js` | `WishlistController` | `/api/v1/wishlist` | `WishlistService` | `wishlists`, `wishlist_items` |
| `orderService.js` | `OrderController` | `/api/v1/orders` | `OrderService` | `orders`, `order_items`, `returns` |
| `paymentService.js` | `PaymentController` | `/api/v1/payments` | `PaymentService` | `payments` |
| `addressService.js` | `AddressController` | `/api/v1/addresses` | `AddressService` | `addresses` |
| `reviewService.js` | `ReviewController` | `/api/v1/reviews` | `ReviewService` | `reviews` |
| `couponService.js` | `CouponController` | `/api/v1/coupons` | `CouponService` | `coupons`, `coupon_usage` |
| `inventoryService.js`| `InventoryController` | `/api/v1/inventory` | `InventoryService` | `inventory`, `product_variants` |
| `notificationService.js`| `NotificationController` | `/api/v1/notifications`| `NotificationService` | `notifications` |
| `adminService.js` | `AdminDashboardController`| `/api/v1/admin` | `AdminDashboardService` | `banners`, `homepage_sections`, all aggregates |

---

## 3. Comprehensive REST Endpoint Specifications

### 3.1 Authentication (`authService.js` ↔ `AuthController`)
- `POST /api/v1/auth/register` — Register new customer account (`email`, `password`, `fullName`, `phone`). Returns JWT tokens.
- `POST /api/v1/auth/login` — Customer and Admin authentication (`email`, `password`). Returns `{ accessToken, refreshToken, user }`.
- `POST /api/v1/auth/logout` — Blacklist current token and terminate session.
- `POST /api/v1/auth/refresh-token` — Rotate expired access token via refresh token.
- `POST /api/v1/auth/forgot-password` — Generate password reset token and send verification email.
- `POST /api/v1/auth/reset-password` — Validate token and set new encrypted password.
- `GET  /api/v1/auth/me` — Retrieve authenticated user profile from Security Context.

### 3.2 User & Profile Management (`userService.js` ↔ `UserController`)
- `GET  /api/v1/users/profile` — Fetch current customer profile details.
- `PUT  /api/v1/users/profile` — Update personal information (`fullName`, `phone`, `gender`, `dateOfBirth`).
- `PUT  /api/v1/users/change-password` — Update password (`currentPassword`, `newPassword`).
- `GET  /api/v1/users/addresses` — List saved delivery addresses.
- `POST /api/v1/users/addresses` — Add new delivery address.
- `PUT  /api/v1/users/addresses/{id}` — Update delivery address.
- `DELETE /api/v1/users/addresses/{id}` — Delete delivery address.
- `PATCH /api/v1/users/addresses/{id}/default` — Set primary delivery address.

### 3.3 Catalog & Products (`productService.js` ↔ `ProductController`)
- `GET  /api/v1/products` — Filtered catalog search (`category`, `subcategory`, `deal`, `minPrice`, `maxPrice`, `brand`, `rating`, `page`, `limit`, `sort`).
- `GET  /api/v1/products/{id}` — Retrieve single product details with full variant hierarchy and high-res image gallery.
- `GET  /api/v1/products/featured` — Get featured products for homepage.
- `GET  /api/v1/products/deals` — Get discounted and promotional products.
- `POST /api/v1/admin/products` — Create new product (Admin).
- `PUT  /api/v1/admin/products/{id}` — Update product details, prices, specifications (Admin).
- `PATCH /api/v1/admin/products/{id}/status` — Toggle product active/deactivated status.
- `DELETE /api/v1/admin/products/{id}` — Soft delete product SKU (Admin).

### 3.4 Categories & Taxonomy (`categoryService.js` ↔ `CategoryController`)
- `GET  /api/v1/categories` — Retrieve full hierarchical category tree with subcategories and product counts.
- `GET  /api/v1/categories/{slug}` — Retrieve single category details with subcategories.
- `POST /api/v1/admin/categories` — Create category (Admin).
- `PUT  /api/v1/admin/categories/{id}` — Update category (Admin).
- `DELETE /api/v1/admin/categories/{id}` — Delete or deactivate category (Admin).
- `POST /api/v1/admin/categories/{id}/subcategories` — Create subcategory (Admin).

### 3.5 Shopping Cart (`cartService.js` ↔ `CartController`)
- `GET  /api/v1/cart` — Retrieve customer's active server-side cart.
- `POST /api/v1/cart/items` — Add item to cart (`productId`, `variantId`, `quantity`).
- `PUT  /api/v1/cart/items/{itemId}` — Update cart item quantity.
- `DELETE /api/v1/cart/items/{itemId}` — Remove item from cart.
- `DELETE /api/v1/cart/clear` — Empty shopping cart.
- `POST /api/v1/cart/merge` — Merge anonymous guest cart with authenticated user cart upon login.

### 3.6 Wishlist (`wishlistService.js` ↔ `WishlistController`)
- `GET  /api/v1/wishlist` — Fetch user's wishlist items.
- `POST /api/v1/wishlist/{productId}` — Add product to wishlist.
- `DELETE /api/v1/wishlist/{productId}` — Remove product from wishlist.
- `POST /api/v1/wishlist/share` — Generate unique shareable token snapshot for public sharing.
- `GET  /api/v1/wishlist/shared/{token}` — Retrieve public wishlist snapshot by token.

### 3.7 Orders & Fulfillment (`orderService.js` ↔ `OrderController`)
- `POST /api/v1/orders` — Place order from current cart with delivery address, shipping method, and applied coupon.
- `GET  /api/v1/orders/my-orders` — Retrieve paginated order history for current customer.
- `GET  /api/v1/orders/{id}` — Retrieve order invoice and live fulfillment milestones.
- `POST /api/v1/orders/{id}/cancel` — Customer cancellation request (allowed before `Shipped` status).
- `POST /api/v1/orders/{id}/returns` — Customer return / exchange request (allowed post `Delivered` status).
- `GET  /api/v1/admin/orders` — List all store orders with status and date filtering (Admin).
- `PATCH /api/v1/admin/orders/{id}/status` — Advance order fulfillment status (`Confirmed` → `Processing` → `Shipped` → `Delivered`) (Admin).

### 3.8 Payments (`paymentService.js` ↔ `PaymentController`)
- `POST /api/v1/payments/initiate` — Create Razorpay / Stripe payment intent / order.
- `POST /api/v1/payments/verify` — Verify cryptographic webhook/signature for online payment completion.
- `GET  /api/v1/payments/{orderId}/status` — Check transaction status and gateway reference.

### 3.9 Centralized Coupons (`couponService.js` ↔ `CouponController`)
- `POST /api/v1/coupons/validate` — Validate coupon eligibility against current cart subtotal and product categories.
- `GET  /api/v1/coupons/active` — List public promotional coupons.
- `GET  /api/v1/admin/coupons` — Admin coupon management list.
- `POST /api/v1/admin/coupons` — Create coupon with rules (percentage/flat, min order, max cap, expiry, usage limit).
- `PUT  /api/v1/admin/coupons/{id}` — Update coupon details.
- `DELETE /api/v1/admin/coupons/{id}` — Toggle active or remove coupon.

### 3.10 Inventory Control (`inventoryService.js` ↔ `InventoryController`)
- `GET  /api/v1/inventory` — Query store inventory status with threshold filtering (`in_stock`, `low_stock`, `out_of_stock`).
- `PATCH /api/v1/inventory/{productId}/stock` — Adjust main product or variant stock quantity.
- `GET  /api/v1/inventory/history` — Audit trail of stock adjustments with delta, reason, and admin actor.

### 3.11 Customer Reviews (`reviewService.js` ↔ `ReviewController`)
- `GET  /api/v1/reviews/product/{productId}` — Public approved reviews for a product with rating statistics.
- `POST /api/v1/reviews/product/{productId}` — Submit review (checks verified purchase in `orders`).
- `GET  /api/v1/admin/reviews` — Admin moderation queue.
- `PATCH /api/v1/admin/reviews/{id}/status` — Approve or flag review (Admin).
- `DELETE /api/v1/admin/reviews/{id}` — Remove inappropriate review (Admin).

### 3.12 Notifications (`notificationService.js` ↔ `NotificationController`)
- `GET  /api/v1/notifications` — List customer account notifications.
- `PATCH /api/v1/notifications/{id}/read` — Mark notification as read.
- `POST /api/v1/notifications/mark-all-read` — Mark all notifications as read.

### 3.13 Admin Content & Reports (`adminService.js` ↔ `AdminDashboardController`)
- `GET  /api/v1/admin/dashboard/metrics` — Consolidated sales, orders, customer counts, low stock alerts.
- `GET  /api/v1/admin/reports` — Dynamic business reports across revenue, orders, products, customers, and inventory.
- `GET  /api/v1/admin/homepage` — Homepage sections configuration (hero banners, brand showcase).
- `PUT  /api/v1/admin/homepage` — Save homepage layout configuration.
- `GET  /api/v1/admin/banners` — Manage promotional ad banners.

---

## 4. PostgreSQL Relational Database Schema (22 Tables)

```sql
-- 1. USERS
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(30) NOT NULL DEFAULT 'CUSTOMER', -- 'CUSTOMER', 'ADMIN', 'SUPER_ADMIN'
    gender VARCHAR(20),
    date_of_birth DATE,
    membership_tier VARCHAR(20) DEFAULT 'free', -- 'free', 'silver', 'gold', 'platinum'
    membership_points INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. CATEGORIES
CREATE TABLE categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(120) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(80),
    image_url TEXT,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. SUBCATEGORIES
CREATE TABLE subcategories (
    id BIGSERIAL PRIMARY KEY,
    category_id BIGINT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(120) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_subcategory_slug UNIQUE (category_id, slug)
);

-- 4. PRODUCTS
CREATE TABLE products (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(280) UNIQUE NOT NULL,
    brand VARCHAR(100) NOT NULL,
    description TEXT,
    category_id BIGINT NOT NULL REFERENCES categories(id),
    subcategory_id BIGINT REFERENCES subcategories(id),
    price NUMERIC(12, 2) NOT NULL CHECK (price >= 0),
    mrp NUMERIC(12, 2) CHECK (mrp >= price),
    discount_percent INT DEFAULT 0,
    rating NUMERIC(2, 1) DEFAULT 0.0 CHECK (rating >= 0 AND rating <= 5.0),
    reviews_count INT DEFAULT 0,
    is_bestseller BOOLEAN DEFAULT FALSE,
    is_new_arrival BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    recipient VARCHAR(50), -- 'him', 'her', 'kids', 'couples', 'self'
    occasion VARCHAR(50),  -- 'birthday', 'anniversary', 'wedding', 'festival'
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. PRODUCT_IMAGES
CREATE TABLE product_images (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text VARCHAR(255),
    is_primary BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0
);

-- 6. PRODUCT_VARIANTS
CREATE TABLE product_variants (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    sku VARCHAR(80) UNIQUE NOT NULL,
    title VARCHAR(100) NOT NULL,
    variant_type VARCHAR(50) NOT NULL, -- 'Size', 'Color', 'Material', 'Pack'
    variant_value VARCHAR(100) NOT NULL,
    price NUMERIC(12, 2) NOT NULL,
    mrp NUMERIC(12, 2),
    stock_quantity INT NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    is_active BOOLEAN DEFAULT TRUE
);

-- 7. INVENTORY
CREATE TABLE inventory (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT UNIQUE NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    stock_quantity INT NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    low_stock_threshold INT NOT NULL DEFAULT 5,
    reorder_quantity INT DEFAULT 20,
    last_restocked_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE inventory_history (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    variant_id BIGINT REFERENCES product_variants(id) ON DELETE SET NULL,
    delta_quantity INT NOT NULL,
    resulting_stock INT NOT NULL,
    change_type VARCHAR(50) NOT NULL, -- 'RESTOCK', 'ORDER_DEDUCTION', 'ORDER_CANCELLATION', 'DAMAGE', 'RETURN_RESTOCK', 'AUDIT'
    reason TEXT,
    performed_by VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. CARTS
CREATE TABLE carts (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. CART_ITEMS
CREATE TABLE cart_items (
    id BIGSERIAL PRIMARY KEY,
    cart_id BIGINT NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
    product_id BIGINT NOT NULL REFERENCES products(id),
    variant_id BIGINT REFERENCES product_variants(id),
    quantity INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_cart_product_variant UNIQUE (cart_id, product_id, variant_id)
);

-- 10. ADDRESSES
CREATE TABLE addresses (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    full_name VARCHAR(150) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    street TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL DEFAULT 'India',
    address_type VARCHAR(20) DEFAULT 'Home', -- 'Home', 'Work', 'Other'
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. ORDERS
CREATE TABLE orders (
    id BIGSERIAL PRIMARY KEY,
    order_number VARCHAR(60) UNIQUE NOT NULL,
    user_id BIGINT NOT NULL REFERENCES users(id),
    order_status VARCHAR(40) NOT NULL DEFAULT 'Confirmed', 
    -- 'Order Placed', 'Confirmed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled', 'Return Requested', 'Returned'
    payment_status VARCHAR(30) NOT NULL DEFAULT 'PENDING', -- 'PENDING', 'PAID', 'FAILED', 'REFUNDED'
    payment_method VARCHAR(30) NOT NULL, -- 'CARD', 'UPI', 'NETBANKING', 'COD'
    shipping_method VARCHAR(30) DEFAULT 'standard', -- 'standard', 'express'
    subtotal NUMERIC(12, 2) NOT NULL,
    discount_amount NUMERIC(12, 2) DEFAULT 0.00,
    shipping_fee NUMERIC(12, 2) DEFAULT 0.00,
    tax_amount NUMERIC(12, 2) DEFAULT 0.00,
    total_amount NUMERIC(12, 2) NOT NULL,
    coupon_code VARCHAR(50),
    delivery_address JSONB NOT NULL,
    cancellation_reason TEXT,
    tracking_number VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 12. ORDER_ITEMS
CREATE TABLE order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id BIGINT NOT NULL REFERENCES products(id),
    variant_id BIGINT REFERENCES product_variants(id),
    product_name VARCHAR(255) NOT NULL,
    sku VARCHAR(80),
    variant_name VARCHAR(100),
    unit_price NUMERIC(12, 2) NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    subtotal NUMERIC(12, 2) NOT NULL,
    thumbnail TEXT
);

-- 13. PAYMENTS
CREATE TABLE payments (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT UNIQUE NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    transaction_reference VARCHAR(120) UNIQUE NOT NULL,
    gateway_provider VARCHAR(50) NOT NULL, -- 'RAZORPAY', 'STRIPE', 'COD'
    payment_method VARCHAR(30) NOT NULL,
    amount NUMERIC(12, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    status VARCHAR(30) NOT NULL, -- 'SUCCESS', 'FAILED', 'PENDING', 'REFUNDED'
    gateway_payload JSONB,
    paid_at TIMESTAMP WITH TIME ZONE
);

-- 14. COUPONS
CREATE TABLE coupons (
    id BIGSERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    discount_type VARCHAR(20) NOT NULL, -- 'PERCENTAGE', 'FIXED', 'FREE_SHIPPING'
    discount_value NUMERIC(12, 2) NOT NULL,
    min_order_value NUMERIC(12, 2) DEFAULT 0.00,
    max_discount_amount NUMERIC(12, 2),
    usage_limit INT,
    used_count INT DEFAULT 0,
    starts_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT TRUE,
    category_ids BIGINT[]
);

-- 15. COUPON_USAGE
CREATE TABLE coupon_usage (
    id BIGSERIAL PRIMARY KEY,
    coupon_id BIGINT NOT NULL REFERENCES coupons(id),
    user_id BIGINT NOT NULL REFERENCES users(id),
    order_id BIGINT NOT NULL REFERENCES orders(id),
    discount_applied NUMERIC(12, 2) NOT NULL,
    used_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 16. WISHLISTS
CREATE TABLE wishlists (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    share_token VARCHAR(100) UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 17. WISHLIST_ITEMS
CREATE TABLE wishlist_items (
    id BIGSERIAL PRIMARY KEY,
    wishlist_id BIGINT NOT NULL REFERENCES wishlists(id) ON DELETE CASCADE,
    product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    variant_id BIGINT REFERENCES product_variants(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_wishlist_product_variant UNIQUE (wishlist_id, product_id, variant_id)
);

-- 18. REVIEWS
CREATE TABLE reviews (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    order_id BIGINT REFERENCES orders(id) ON DELETE SET NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(150),
    review_text TEXT NOT NULL,
    is_verified_purchase BOOLEAN DEFAULT FALSE,
    status VARCHAR(30) DEFAULT 'APPROVED', -- 'APPROVED', 'PENDING', 'FLAGGED'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 19. RETURNS
CREATE TABLE returns (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    user_id BIGINT NOT NULL REFERENCES users(id),
    return_type VARCHAR(30) NOT NULL, -- 'REFUND', 'EXCHANGE', 'REPLACEMENT'
    reason VARCHAR(100) NOT NULL,
    customer_notes TEXT,
    return_status VARCHAR(40) NOT NULL DEFAULT 'REQUESTED', -- 'REQUESTED', 'APPROVED', 'PICKED_UP', 'INSPECTED', 'REFUNDED', 'REJECTED'
    refund_amount NUMERIC(12, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 20. NOTIFICATIONS
CREATE TABLE notifications (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- 'ORDER_CONFIRMED', 'ORDER_SHIPPED', 'ORDER_DELIVERED', 'ORDER_CANCELLED', 'ORDER_REFUNDED', 'PROMOTION'
    title VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    reference_id VARCHAR(100),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 21. BANNERS
CREATE TABLE banners (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    tagline VARCHAR(200),
    image_url TEXT NOT NULL,
    link_url TEXT,
    badge_text VARCHAR(50),
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 22. HOMEPAGE_SECTIONS
CREATE TABLE homepage_sections (
    id BIGSERIAL PRIMARY KEY,
    section_key VARCHAR(80) UNIQUE NOT NULL,
    title VARCHAR(120),
    subtitle TEXT,
    config_json JSONB NOT NULL,
    display_order INT DEFAULT 0,
    is_enabled BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- PERFORMANCE INDEXES
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_subcategory ON products(subcategory_id);
CREATE INDEX idx_products_active_rating ON products(is_active, rating DESC);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(order_status);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_reviews_product ON reviews(product_id, status);
CREATE INDEX idx_notifications_user_unread ON notifications(user_id, is_read);
```

---

## 5. Spring Boot Architecture Blueprint

### 5.1 Project Dependencies (pom.xml)
```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>
    <dependency>
        <groupId>org.postgresql</groupId>
        <artifactId>postgresql</artifactId>
        <scope>runtime</scope>
    </dependency>
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-api</artifactId>
        <version>0.12.5</version>
    </dependency>
    <dependency>
        <groupId>org.flywaydb</groupId>
        <artifactId>flyway-core</artifactId>
    </dependency>
    <dependency>
        <groupId>org.flywaydb</groupId>
        <artifactId>flyway-database-postgresql</artifactId>
    </dependency>
</dependencies>
```

### 5.2 Package Organization
```
com.gomodeals.api
├── config
│   ├── SecurityConfig.java
│   ├── JwtAuthenticationFilter.java
│   ├── WebMvcCorsConfig.java
│   └── RestExceptionHandler.java (RFC 7807)
├── controller
│   ├── AuthController.java
│   ├── UserController.java
│   ├── ProductController.java
│   ├── CategoryController.java
│   ├── CartController.java
│   ├── WishlistController.java
│   ├── OrderController.java
│   ├── PaymentController.java
│   ├── AddressController.java
│   ├── ReviewController.java
│   ├── CouponController.java
│   ├── InventoryController.java
│   ├── NotificationController.java
│   └── AdminDashboardController.java
├── dto
│   ├── request.*
│   └── response.*
├── entity
│   ├── User.java
│   ├── Product.java
│   ├── ProductVariant.java
│   ├── Category.java
│   ├── Subcategory.java
│   ├── Cart.java
│   ├── CartItem.java
│   ├── Order.java
│   ├── OrderItem.java
│   ├── Payment.java
│   ├── Address.java
│   ├── Coupon.java
│   ├── Review.java
│   ├── Notification.java
│   ├── Banner.java
│   └── HomepageSection.java
├── repository
│   └── *Repository.java (Spring Data JPA)
└── service
    └── *Service.java & *ServiceImpl.java
```

---

## 6. Standardized Response Envelope

To match the frontend `apiClient.js` contract, all Spring Boot REST responses will conform to:

```json
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully.",
  "timestamp": "2026-09-15T12:00:00Z"
}
```

Error responses:
```json
{
  "success": false,
  "error": {
    "code": "OUT_OF_STOCK",
    "message": "Requested quantity exceeds available stock.",
    "details": { "available": 2, "requested": 5 }
  },
  "timestamp": "2026-09-15T12:00:00Z"
}
```

---

## 7. Zero-Disruption Transition Checklist

1. **Deploy Spring Boot REST API & PostgreSQL DB**:
   - Run Flyway V1 migration script creating the 22 tables.
   - Seed default categories and sample boutique inventory.
2. **Frontend Switch**:
   - In `src/services/apiClient.js`: Set `USE_MOCK = false`.
   - In `.env`: Set `VITE_API_BASE_URL=https://api.gomodeals.com/api/v1`.
3. **Run Validation Test Suite**:
   - Customer Flow: Login → Browse → Add to Cart → Apply Coupon → Place Order.
   - Admin Flow: Admin Login → Dashboard → Inventory Adjustment → Category Management → Reports.
