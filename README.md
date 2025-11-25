# Sigmora - Trading Management System

A comprehensive MERN stack application for managing trading academies, subscriptions, and trades.

## Project Structure

```
trade-axis/
├── backend/          # Express.js backend API
│   ├── models/      # MongoDB models
│   ├── routes/      # API routes
│   ├── controllers/ # Route controllers
│   ├── middleware/  # Auth middleware
│   ├── utils/       # Utility functions
│   └── jobs/        # Cron jobs
└── src/             # React frontend
    ├── components/  # Reusable components
    ├── pages/      # Page components
    ├── services/   # API services
    ├── context/    # React context
    └── utils/      # Utility functions
```

## Features

### Creator Features
- Create subscription packages (Basic, Pro, Advanced)
- Manage trading assets (USD/JPY, GOLD, BTC/USDT, etc.)
- Create and manage trades
- View active and completed trades
- Share academy code with students
- Close trades with TP/SL/Manual options

### Subscriber Features
- Join academy using academy code
- Subscribe to packages via Flutterwave payment
- View active trades in real-time
- View completed trade history
- Subscription status tracking

## Setup Instructions

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/sigmora
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
FLUTTERWAVE_PUBLIC_KEY=your_flutterwave_public_key
FLUTTERWAVE_SECRET_KEY=your_flutterwave_secret_key
FLUTTERWAVE_ENCRYPTION_KEY=your_flutterwave_encryption_key
FRONTEND_URL=http://localhost:3000
```

5. Start MongoDB (if not running):
```bash
# Make sure MongoDB is running on your system
```

6. Start the backend server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to root directory (frontend):
```bash
# Already in root directory
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (optional, defaults are set):
```
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register/creator` - Register as creator
- `POST /api/auth/register/subscriber` - Register as subscriber
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Packages
- `POST /api/packages` - Create package (Creator)
- `GET /api/packages/creator` - Get creator's packages
- `GET /api/packages/creator/:creatorId` - Get packages by creator
- `PUT /api/packages/:id` - Update package
- `DELETE /api/packages/:id` - Delete package

### Assets
- `POST /api/assets` - Create asset (Creator)
- `GET /api/assets` - Get creator's assets
- `PUT /api/assets/:id` - Update asset
- `DELETE /api/assets/:id` - Delete asset

### Trades
- `POST /api/trades` - Create trade (Creator)
- `GET /api/trades/active` - Get active trades (Creator)
- `GET /api/trades/completed` - Get completed trades (Creator)
- `GET /api/trades/subscriber/active` - Get active trades (Subscriber)
- `GET /api/trades/subscriber/completed` - Get completed trades (Subscriber)
- `PUT /api/trades/:id/close` - Close trade

### Subscriptions
- `GET /api/subscriptions` - Get subscriptions (Subscriber)
- `GET /api/subscriptions/status` - Get subscription status

### Payments
- `POST /api/payments/initialize` - Initialize payment
- `POST /api/payments/verify` - Verify payment
- `GET /api/payments/callback` - Payment callback

### Academy
- `GET /api/academy/code` - Get academy code (Creator)
- `GET /api/academy/:code` - Get academy info by code

## Technologies Used

- **Frontend**: React, React Router, React Query, Vite
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **Payment**: Flutterwave
- **Styling**: Inline styles (can be replaced with CSS modules or styled-components)

## Notes

- The frontend polls for trade updates every 5 seconds. Consider implementing WebSockets for real-time updates in production.
- Subscription expiry is checked daily via cron job.
- Make sure to configure Flutterwave keys in the backend `.env` file.
- The app uses JWT for authentication. Tokens are stored in localStorage.

## License

ISC

