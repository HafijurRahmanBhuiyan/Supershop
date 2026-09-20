# 🛍️ SuperShop — Full-Stack MERN eCommerce Platform

A modern, responsive, and feature-rich full-stack eCommerce application built using the **MERN** stack (MongoDB, Express.js, React.js, Node.js) and powered by **Vite**.

---

## 🚀 Features

### 💻 Frontend (React + Vite)
- **Responsive & Modern UI:** Optimized for all screen sizes (mobile, tablet, and desktop) with smooth animations and transitions.
- **Hero Slider:** Auto-rotating promotional banner slider with custom controls.
- **Flash Deals with Live Countdown:** Real-time countdown timer for limited-time offers.
- **Category Filter Tabs:** Dynamic category switching for new arrivals (Fashion, Electronics, Home, etc.).
- **Interactive Shopping Cart:** Real-time cart state with toast notifications on item addition.
- **Floating Controls:** Back-to-top scroll button and hamburger menu for mobile devices.

### ⚙️ Backend (Node.js + Express + MongoDB)
- **RESTful API Architecture:** Clean, modular structure separating models, routes, controllers, and middleware.
- **User Authentication:** Secure JWT (JSON Web Tokens) and password hashing with `bcryptjs`.
- **Role-Based Access Control:** Separate permissions for regular users and administrators.
- **Product Management:** Full CRUD capabilities for products with filtering and keyword search.
- **Persistent Cart System:** Database-backed cart management synchronized with user accounts.
- **Order & Payment Processing:** Stripe integration for handling secure online checkout sessions and order state updates.

---

## 📁 Project Structure

```text
supershop/
├── client/                     # Frontend React application (Vite)
│   ├── public/                 # Static public assets
│   ├── src/
│   │   ├── App.jsx             # Main interactive SuperShop React component
│   │   ├── App.css             # Component-level styles
│   │   ├── index.css           # Global design system, variables & media queries
│   │   └── main.jsx            # React root entry point
│   ├── index.html              # HTML shell with Google Fonts & FontAwesome
│   ├── package.json            # Frontend dependencies & scripts
│   └── vite.config.js          # Vite configuration
│
├── server/                     # Backend Node.js / Express API
│   ├── config/
│   │   └── db.js               # MongoDB connection handler
│   ├── controllers/            # Request handlers & business logic
│   │   ├── authController.js
│   │   ├── cartController.js
│   │   ├── orderController.js
│   │   └── productController.js
│   ├── middleware/             # Auth protection & error handlers
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   ├── models/                 # Mongoose schemas
│   │   ├── Cart.js
│   │   ├── Order.js
│   │   ├── Product.js
│   │   └── User.js
│   ├── routes/                 # Express API endpoints
│   │   ├── auth.js
│   │   ├── cart.js
│   │   ├── orders.js
│   │   └── products.js
│   ├── utils/                  # Token generators & Stripe utilities
│   │   ├── generateToken.js
│   │   └── stripe.js
│   ├── .env                    # Environment configuration
│   ├── package.json            # Backend dependencies & scripts
│   └── server.js               # Express application entry point
│
├── index.html                  # Original standalone prototype HTML
├── style.css                   # Original standalone prototype CSS
├── main.js                     # Original standalone prototype JS
└── README.md                   # Project documentation
```

---

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite, FontAwesome, Google Fonts (Inter)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose ODM
- **Authentication:** JSON Web Tokens (JWT), Bcrypt.js
- **Payment Processing:** Stripe API

---

## 🏁 Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v18 or newer)
- [MongoDB](https://www.mongodb.com/) (running locally or via MongoDB Atlas)

---

### 1. Start the Backend Server

1. Open a terminal and navigate to the `server` directory:
   ```bash
   cd supershop/server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Ensure your `.env` file contains your configuration:
   ```env
   MONGODB_URI=mongodb://localhost:27017/supershop
   JWT_SECRET=supershop_jwt_secret_key_2024
   STRIPE_SECRET_KEY=sk_test_your_stripe_key
   PORT=5001
   NODE_ENV=development
   ```

4. Start the server:
   ```bash
   npm start
   ```
   *The server will start on [http://localhost:5001](http://localhost:5001)*

---

### 2. Start the Frontend Client

1. Open a **new** terminal window/tab and navigate to the `client` directory:
   ```bash
   cd supershop/client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit:
   ```
   http://localhost:5173/
   ```

---

## 🔌 API Endpoints Summary

### Authentication (`/api/auth`)
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Authenticate user and obtain JWT
- `GET /api/auth/me` — Fetch profile of current logged-in user *(Protected)*

### Products (`/api/products`)
- `GET /api/products` — Retrieve all products (supports `?keyword=` and `?category=`)
- `GET /api/products/:id` — Retrieve a single product by ID
- `POST /api/products` — Create a new product *(Admin only)*
- `PUT /api/products/:id` — Update an existing product *(Admin only)*
- `DELETE /api/products/:id` — Delete a product *(Admin only)*

### Cart (`/api/cart`) *(All Protected)*
- `GET /api/cart` — Fetch user's cart
- `POST /api/cart/add` — Add item to cart
- `PUT /api/cart/update/:itemId` — Update quantity of an item
- `DELETE /api/cart/remove/:itemId` — Remove item from cart
- `DELETE /api/cart/clear` — Clear entire cart

### Orders & Payment (`/api/orders`) *(All Protected)*
- `POST /api/orders` — Create a new order
- `GET /api/orders/myorders` — Get current user's order history
- `GET /api/orders/:id` — Get specific order details
- `POST /api/orders/create-payment-intent` — Generate Stripe payment intent client secret
- `PUT /api/orders/:id/pay` — Mark order as paid
- `GET /api/orders` — View all orders *(Admin only)*
- `PUT /api/orders/:id/status` — Update order shipping status *(Admin only)*

---

## 📝 License
This project is open-source and available under the [MIT License](LICENSE).
