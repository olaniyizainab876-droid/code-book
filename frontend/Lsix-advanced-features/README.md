# Lesson 6: Advanced Features

## Topic
Building **admin functionality** with protected routes and product management. Implementing role-based access control and an admin dashboard where privileged users can create, edit, and delete products.

## Features Introduced in This Lesson
- **AdminProtectedRoute Component** — Route protection based on admin status ✨ NEW
- **AdminPage Component** — Full admin dashboard with tabbed interface ✨ NEW
- **AdminProductForm** — Form for creating/editing products with validation ✨ NEW
- **AdminProductList** — Table view of all products with edit/delete actions ✨ NEW
- **Role-Based Access Control** — Admin-only routes using localStorage flags
- **Demo Authentication** — Simple login that grants admin access for testing
- **Toast Notifications** — User feedback on product operations

## Features Carried Forward From Previous Lessons
- All Context API functionality
- All custom hooks
- All pages and components
- Tailwind CSS styling with dark mode
- React Router with protected routes
- Cart and filter state management

## Features Still To Come
- Real authentication with password hashing
- Persistent product database with json-server
- Order management and user dashboard
- Payment processing
- User profile management

## What Changed From the Previous Lesson

### New Files Created
- `src/Routes/AdminProtectedRoute.jsx` — Route guard for admin pages ✨ NEW
- `src/Pages/Admin/AdminPage.jsx` — Admin dashboard main page ✨ NEW
- `src/Components/Admin/AdminProductForm.jsx` — Product form for CRUD operations ✨ NEW
- `src/Components/Admin/AdminProductList.jsx` — Table of products with actions ✨ NEW

### Modified Files
- `src/Routes/AllRoutes.jsx` — Added /admin route with AdminProtectedRoute
- `src/Pages/Login.jsx` — Now saves admin flag to localStorage on login
- `package.json` — Updated project name to "code-book-lesson-6"

## Key Concepts Introduced
- **Protected Routes** — Restricting access based on authentication status
- **Role-Based Access Control** — Different permissions for different users
- **Admin Dashboard** — Centralized interface for site management
- **CRUD Operations** — Create, Read, Update, Delete functionality
- **Form Validation** — Client-side validation before submission
- **Tab Navigation** — Organizing multiple views within a page

## Why These Changes Were Made
Admin functionality is essential for a complete e-commerce platform because it:
1. **Allows Content Management** — Admins can add/update/delete products
2. **Establishes Security** — Protected routes prevent unauthorized access
3. **Scales the Application** — Separates admin and user experiences
4. **Prepares for Backend** — Structure ready for API integration in Lesson 7
5. **Demonstrates Real-World Patterns** — Common in production applications

## What You Should See When You Run This
When you run `npm install && npm run dev`:

### User Experience
1. **Without Login**: 
   - Visiting `/admin` redirects to `/login`
   - Can browse products and add to cart normally

2. **After Login**:
   - Email saved to localStorage
   - Admin flag set (in demo mode, all users are admins)
   - New `/admin` route accessible

3. **In Admin Dashboard**:
   - Two tabs: "View Products" and "Add Product"
   - Product list shows all items with edit/delete buttons
   - Form validates required fields before submission
   - Tab switching and form state management working
   - Logout button clears authentication and returns to home

4. **Product Management**:
   - Add Product form captures: name, price, rating, image URL, descriptions, stock/bestseller flags
   - Edit Product pre-fills form with existing data
   - Delete confirms before removing
   - Toast notifications confirm actions
   - Demo mode shows feedback but doesn't persist to database

## How to Run
```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173/`

### Accessing Admin Features
1. Click Login in the header
2. Enter any email and password
3. Get redirected to home with admin privileges
4. Click browser address bar and go to `/admin`
5. See the admin dashboard with product management

## Admin Dashboard Architecture

### AdminProtectedRoute
```javascript
// Checks localStorage for adminUser flag
const isAdmin = JSON.parse(localStorage.getItem("adminUser")) || false;
// Returns children if admin, otherwise redirects to /login
return isAdmin ? children : <Navigate to="/login" />;
```

### AdminPage
```javascript
// Provides tabbed interface:
- View Products tab: Shows AdminProductList
- Add/Edit Product tab: Shows AdminProductForm
- Logout button: Clears auth and redirects

// State:
- activeTab: "products" | "add"
- editingProduct: null | product object
```

### AdminProductForm
```javascript
// Handles both add and edit modes
// Fields: name, price, rating, poster, overview, long_description, in_stock, best_seller
// Validation: Required fields checked before submit
// Callbacks: onSubmit with new product data
```

### AdminProductList
```javascript
// Table display of products with columns:
- Product Name
- Price
- Rating
- In Stock (yes/no)
- Best Seller (yes/no)
- Actions (Edit/Delete buttons)

// Events:
- onEdit: Pass to form for editing
- onDelete: Remove with confirmation
```

## Project Structure
```
LSix-advancedFeatures/
├── src/
│   ├── Routes/
│   │   ├── AdminProtectedRoute.jsx ✨ NEW
│   │   └── AllRoutes.jsx (updated)
│   ├── Pages/
│   │   ├── Admin/ ✨ NEW
│   │   │   └── AdminPage.jsx ✨ NEW
│   │   └── Login.jsx (updated)
│   ├── Components/
│   │   └── Admin/ ✨ NEW
│   │       ├── AdminProductForm.jsx ✨ NEW
│   │       └── AdminProductList.jsx ✨ NEW
│   ├── context/
│   │   ├── CartContext.jsx
│   │   └── FilterContext.jsx
│   └── ...
└── package.json
```

## State Flow: Admin Operations

### Adding a Product
1. Click "Add Product" tab
2. Fill in form fields
3. Click "Add Product" button
4. `handleAddProduct` validates and creates product
5. Toast confirms action
6. Form resets
7. (In Lesson 7: Sent to API)

### Editing a Product
1. Click Edit icon on product row
2. Tab switches to "Edit Product"
3. Form pre-fills with product data
4. Update fields as needed
5. Click "Update Product"
6. Changes applied
7. (In Lesson 7: Sent to API)

### Deleting a Product
1. Click Delete icon on product row
2. Confirmation dialog appears
3. Confirm deletion
4. Product removed from list
5. Toast confirms action
6. (In Lesson 7: Sent to API)

## Form Validation
```javascript
// Before submission, checks:
- Product name is not empty
- Price is not empty
- Image URL is not empty

// Shows toast error if validation fails
if (!formData.name || !formData.price || !formData.poster) {
  toast.error("Please fill in all required fields");
  return;
}
```

## localStorage Structure
```javascript
// After login:
localStorage.setItem("email", "user@example.com");
localStorage.setItem("adminUser", true);

// On logout:
localStorage.removeItem("email");
localStorage.removeItem("adminUser");
```

## Comparison: User vs Admin Views

### User View
```
HomePage
├── Browse products
├── Filter/Sort
└── Add to Cart

ProductDetails
├── View full details
└── Add to Cart

CartPage
├── View cart items
└── Checkout (future)
```

### Admin View (New!)
```
AdminPage
├── AdminProductList (View/Edit/Delete)
├── AdminProductForm (Create/Update)
└── Logout
```

## How Login Works (Demo Mode)
```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  // Save email
  localStorage.setItem("email", email);
  // Grant admin access (in Lesson 7: check against user roles)
  localStorage.setItem("adminUser", true);
  toast.success("Logged in successfully!");
  navigate("/");
};
```

## Next Steps
In **Lesson 7: json-server Integration**, we'll:
- Replace localStorage-based admin flag with real authentication
- Connect product form to json-server POST/PUT/DELETE endpoints
- Fetch products from API instead of hardcoded data
- Implement real user authentication with backend validation
- Add order management and user dashboard
- Make all admin operations persist to database

## Demo Limitations (Upgraded in Lesson 7)
- ⚠️ Product changes don't persist (no database)
- ⚠️ All logins are admin (no role differentiation)
- ⚠️ No password validation
- ⚠️ No user profile management
- ⚠️ Product IDs are temporary (Date.now())

## Reference
See `frontend/main-client/` for the full production version of this project.
