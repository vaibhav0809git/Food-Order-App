# Food Ordering Backend (NestJS + Prisma)

## Project Overview

This is a backend system for a **Food Ordering Application** built using **NestJS, Prisma, and MySQL**.
It supports authentication, role-based access control, cart management, and order processing.

---

## 🛠 Tech Stack

* **Backend:** NestJS
* **Database:** MySQL
* **ORM:** Prisma
* **Authentication:** JWT (JSON Web Token)
* **API Testing:** Postman

---

##  Features

###  Authentication

* Login with email & password
* JWT-based authentication
* Secure password hashing using bcrypt

### 🛡 Role-Based Access Control (RBAC)

* Roles: `ADMIN`, `MANAGER`, `MEMBER`
* Restricted actions based on roles

###  Cart System

* Add items to cart
* View cart items
* Remove items from cart

###  Order Management

* Create order from cart
* View user orders
* Checkout (Admin/Manager only)
* Cancel order (Admin/Manager only)

---

##  API Endpoints

###  Auth

```
POST /auth/login
```

###  Cart

```
POST /cart
GET /cart
DELETE /cart/:id
```

###  Order

```
POST /order
GET /order
POST /order/checkout
POST /order/cancel
```

---

##  Setup Instructions

### 1️ Clone Repository

```
git clone https://github.com/vaibhav0809git/Food-Order-App.git
cd Food-Order-App
```

### 2️ Install Dependencies

```
npm install
```

### 3️ Setup Environment

Create `.env` file:

```
DATABASE_URL="mysql://user:password@localhost:3306/foodapp"
JWT_SECRET=secret
```

### 4️ Run Migrations

```
npx prisma migrate dev
```

### 5️ Start Server

```
npm run start:dev
```

---

##  Testing

Use **Postman** to test APIs:

* Login → Get JWT token
* Use token in Authorization header:

```
Bearer <your_token>
```

---

##  Project Structure

```
src/
 ├── modules/
 │   ├── auth/
 │   ├── cart/
 │   ├── order/
 │   ├── restaurant/
 │   └── payment/
 ├── common/
 │   ├── guards/
 │   └── decorators/
 └── prisma/
```

---

##  Key Highlights

* Clean modular architecture (NestJS)
* Secure authentication using JWT
* Efficient DB handling with Prisma
* Real-world backend workflow implementation

---

##  Author

**Vaibhav Davhale**

---

## ⭐ If you like this project

Give it a ⭐ on GitHub!
