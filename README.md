# Round-Robin Coupon Distribution System

A full-stack web application that distributes coupons to guest users in a round-robin manner while providing an admin panel to manage coupons and prevent abuse.

## Features

### Public Interface
- Claim coupons without logging in
- Round-robin coupon distribution
- Abuse prevention (IP tracking & cookie-based)

### Admin Panel
- View all coupons and their status
- Add/Update coupons
- View claim history with user details
- Toggle coupon availability

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT

## Installation

### Clone the Repository



2. Frontend

```bash
git clone https://github.com/sid-rh/CouponSystemFrontend
```

### Backend Setup

1. Clone the repository

```bash
git clone https://github.com/sid-rh/CouponSystemBackend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the backend directory with the following variables:

```
PORT=8000
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=your_jwt_secret_key
```

4. Initialize the database with an admin user:

- `POST /api/auth/register` - Admin Register

**Important**: You need to manually change isAdmin to true in your MongoDB collection.

### Frontend Setup

1. Clone the repository

```bash
git clone https://github.com/sid-rh/CouponSystemFrontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the frontend directory:

```
VITE_API_URL=http://localhost:8000/api
```

## Running the Application

### Development Mode

1. Start the backend server:

```bash
cd backend
npm run dev
```

2. In a separate terminal, start the frontend development server:

```bash
cd frontend
npm run dev
```

The application will be accessible at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api


## API Endpoints

### Public Routes

- `GET /api/coupons/claim` - Claim a coupon 

### Auth Routes

- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Admin register

### Admin Routes (Protected)

- `GET /api/coupons` - Get all coupons
- `POST /api/coupons` - Create a new coupon
- `PUT /api/coupons/:id` - Update a coupon


