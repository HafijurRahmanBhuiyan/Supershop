# 🛍️ SuperShop — Full-Stack MERN eCommerce Platform

A production-ready, full-stack eCommerce application built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). SuperShop features secure user authentication, a professional admin dashboard, shopping cart functionality, and a modern responsive frontend.

---

## ✨ What's New (September 2026)

This is a **fully functional full-stack application** with real authentication, not just a frontend prototype:

- ✅ **Real User Authentication** — JWT-based login/registration with secure password hashing
- ✅ **Role-Based Access Control** — Admin and regular user roles with protected routes
- ✅ **Professional Admin Dashboard** — Manage products, orders, and users
- ✅ **Persistent Shopping Cart** — Cart data stored in MongoDB
- ✅ **Redux State Management** — Centralized auth and cart state
- ✅ **RESTful API Integration** — Frontend connected to backend

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19, Vite, Redux Toolkit, React Router DOM |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose ODM |
| **Authentication** | JWT (JSON Web Tokens), bcryptjs |
| **Styling** | CSS3, FontAwesome, Google Fonts (Inter) |
| **Payment** | Stripe API (configured) |

---

## 📁 Project Structure

```
supershop/
├── client/                          # React Frontend (Vite)
│   ├── src/
│   │   ├── components/              # Reusable components
│   │   │   └── ProtectedRoute.jsx   # Route protection wrapper
│   │   ├── pages/
│   │   │   ├── Home.jsx             # Main shop page
│   │   │   ├── Login.jsx            # User login page
│   │   │   └── Register.jsx         # User registration page
│   │   ├── services/
│   │   │   └── api.js               # Axios API configuration
│   │   ├── store/
│   │   │   ├── index.js             # Redux store configuration
│   │   │   ├── authSlice.js         # Authentication state
│   │   │   └── cartSlice.js         # Cart state
│   │   ├── AdminDashboard.jsx       # Admin panel component
│   │   ├── admin.css                # Admin dashboard styles
│   │   ├── App.jsx                  # Main app with routing
│   │   ├── App.css                  # App-specific styles
│   │   ├── index.css                # Global styles
│   │   └── main.jsx                 # React entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/                          # Express Backend API
│   ├── config/
│   │   └── db.js                    # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js        # Login/register logic
│   │   ├── cartController.js        # Cart operations
│   │   ├── orderController.js       # Order & Stripe logic
│   │   └── productController.js     # Product CRUD
│   ├── middleware/
│   │   ├── authMiddleware.js        # JWT verification
│   │   └── errorHandler.js          # Error handling
│   ├── models/
│   │   ├── Cart.js                  # Cart schema
│   │   ├── Order.js                 # Order schema
│   │   ├── Product.js               # Product schema
│   │   └── User.js                  # User schema
│   ├── routes/
│   │   ├── auth.js                  # Auth API routes
│   │   ├── cart.js                  # Cart API routes
│   │   ├── orders.js                # Order API routes
│   │   └── products.js              # Product API routes
│   ├── utils/
│   │   ├── generateToken.js         # JWT token generator
│   │   └── stripe.js                # Stripe configuration
│   ├── .env                         # Environment variables
│   ├── package.json
│   ├── seed.js                      # Database seeder
│   └── server.js                    # Express entry point
│
├── README.md
└── package.json                     # Root package (optional)
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or newer)
- **MongoDB** (running locally or MongoDB Atlas)
- **npm** or **yarn**

---

### Step 1: Clone & Install Dependencies

```bash
# Navigate to project
cd supershop

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

---

### Step 2: Configure Environment

The backend already has a `.env` file with these defaults:

```env
MONGODB_URI=mongodb://localhost:27017/supershop
JWT_SECRET=supershop_jwt_secret_key_2024
STRIPE_SECRET_KEY=sk_test_your_stripe_key
PORT=5001
NODE_ENV=development
```

> **Note:** If Port 5000 is taken (common on macOS), the server runs on **Port 5001**.

---

### Step 3: Seed the Database

Create an admin user and sample products:

```bash
cd ../server
npm run seed
```

**Expected output:**
```
✅ Database seeded successfully!

📧 Admin Login:
   Email: admin@supershop.com
   Password: admin123

📧 User Login:
   Email: user@supershop.com
   Password: user123
```

---

### Step 4: Run the Application

**Terminal 1 — Backend (Port 5001):**
```bash
cd supershop/server
npm start
```

**Terminal 2 — Frontend (Port 5173):**
```bash
cd supershop/client
npm run dev
```

---

### Step 5: Open in Browser

Navigate to: **http://localhost:5173**

---

## 🔐 Login Credentials

After running `npm run seed`, you can log in with these accounts:

| Role | Email | Password | Access |
|------|-------|----------|--------|
| **Admin** | `admin@supershop.com` | `admin123` | Full admin dashboard at `/admin` |
| **User** | `user@supershop.com` | `user123` | Shop and add to cart |

---

## 🧩 Key Features

### 👤 User Features
- User registration and login
- Browse products by category
- Add items to cart (requires login)
- View deals with live countdown timer
- Newsletter subscription

### 🛠️ Admin Features
- **Dashboard** — Overview stats, system health, recent orders
- **Products** — Add, edit, delete products with stock management
- **Orders** — View all orders, update status (Pending → Processing → Shipped → Delivered)
- **Users** — View and manage user accounts

### 🔌 API Endpoints

**Auth:**
- `POST /api/auth/register` — Register new user
- `POST /api/auth/login` — Login and get JWT
- `GET /api/auth/me` — Get current user (protected)

**Products:**
- `GET /api/products` — List all products
- `POST /api/products` — Create product (admin)
- `PUT /api/products/:id` — Update product (admin)
- `DELETE /api/products/:id` — Delete product (admin)

**Cart (Protected):**
- `GET /api/cart` — Get user's cart
- `POST /api/cart/add` — Add item
- `PUT /api/cart/update/:id` — Update quantity
- `DELETE /api/cart/remove/:id` — Remove item

**Orders (Protected):**
- `GET /api/orders/myorders` — User's orders
- `POST /api/orders` — Create order
- `POST /api/orders/create-payment-intent` — Stripe payment

---

## 📸 Screenshots

The frontend features:
- Responsive hero slider with 3 promotional slides
- Trust badges (Free Shipping, Secure Payment, etc.)
- Category grid with hover effects
- Product cards with ratings and prices
- Tab-filtered new arrivals section
- Testimonials carousel
- Newsletter subscription form
- Full footer with links

The admin dashboard features:
- Dark sidebar navigation
- KPI stat cards with metrics
- System health monitoring
- Product management table with CRUD
- Order management with status dropdowns
- User management with role badges

---

## 📝 License

MIT License — feel free to use this project for learning or commercial purposes.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Built with ❤️ using MERN Stack**