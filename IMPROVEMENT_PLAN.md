# Farmer Market Improvement Plan

This document outlines the step-by-step plan to upgrade the platform to a production-ready, Amazon-style marketplace.

## Phase 1: Backend Core & Order Management 🛠️
**Goal:** Enable real transactions and secure order lifecycle.
1. **Middleware Upgrade**: Implement `auth` and `roleCheck` middleware for secure routes.
2. **Order API**: Create robust endpoints for:
   - Creating an order (checkout).
   - Getting user order history.
   - Getting received orders (for farmers).
   - Updating order status (Pending -> Shipped -> Delivered).
3. **Database Constraints**: Ensure stock is deducted upon ordering.

## Phase 2: Product Discovery Engine 🔍
**Goal:** Help users find products faster.
1. **Advanced Querying**: Update `GET /api/products` to support:
   - Queries: `?category=Veg&minPrice=10&sort=price_asc`.
   - Pagination: `?page=1&limit=20`.
2. **Search Logic**: Implement case-insensitive search (using `iLike` in Postgres).

## Phase 3: Dashboard Architecture 📊
**Goal:** Empower users with role-specific tools.
1. **Consumer Dashboard**:
   - Tabbed view: "My Orders", "Profile", "Settings".
   - Order tracking timeline.
2. **Farmer Dashboard**:
   - "My Products": Add/Edit/Delete products.
   - "Incoming Orders": Accept/Reject/Ship orders.
   - Revenue analytics chart.
3. **Admin Dashboard (Optional)**:
   - User supervision and global order view.

## Phase 4: Frontend UI/UX Upgrade 🎨
**Goal:** "Amazon-style" premium feel.
1. **Product Detail Page**: Create `ProductDetails.jsx` with:
   - High-quality image filtering.
   - Related products.
   - Detailed specs (Origin, Harvest Date).
2. **Cart & Checkout**:
   - Multi-step checkout (Address -> Payment -> Confirm).
   - Address management.
3. **Navigation**: Update Navbar with dynamic "Hello, [Name]" and dropdowns.

## Phase 5: Technical Polish 🚀
1. **Validation**: Add `express-validator` for API inputs.
2. **Error Handling**: Centralized error middleware.
3. **Loading States**: Skeletons instead of spinners where possible.
