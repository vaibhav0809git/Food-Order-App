#  Food Order App (Backend)

A backend API for a food ordering system built using NestJS, Prisma, and MySQL.

---

##  Features

- User Authentication (JWT)
- Role-Based Access Control (Admin / Manager / Member)
- Cart Management
- Order Creation from Cart
- Checkout & Cancel Orders (Admin/Manager only)
- Prisma ORM with MySQL

---

## 🛠 Tech Stack

- NestJS
- Prisma
- MySQL
- JWT Auth
- TypeScript

---

## ⚙️ Setup Instructions (Local)

### 1. Clone the repo
git clone https://github.com/vaibhav0809git/Food-Order-App.git

### 2. Go into project
cd Food-Order-App

### 3. Install dependencies
npm install

### 4. Setup environment variables
Create a `.env` file:

DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/foodapp"
JWT_SECRET="your_secret_key"

### 5. Run migrations
npx prisma migrate dev

### 6. Start server
npm run start:dev

Server runs at:
http://localhost:3000

---

## 🔐 API Flow

### 1. Login
POST /auth/login

### 2. Add to Cart
POST /cart

### 3. Create Order
POST /order

### 4. Get My Orders
GET /order

### 5. Checkout (Admin/Manager)
POST /order/checkout
Body:
{
  "orderId": 1
}

### 6. Cancel Order
POST /order/cancel
Body:
{
  "orderId": 1
}

---

##  Notes

- Members cannot checkout or cancel orders
- Only Admin/Manager roles have permission
- JWT token required for protected routes

---

##  Author

Vaibhav Davhale
