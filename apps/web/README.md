# IntelliSMART Web Application

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB 6.0+
- npm or yarn

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env.local` and update the values:
   ```bash
   cp .env.example .env.local
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Seed the admin user (in a separate terminal):
   ```bash
   npm run seed:admin
   ```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run seed:admin` - Seed the admin user

## Environment Variables

- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `ADMIN_EMAIL` - Admin email (for seeding)
- `ADMIN_PASSWORD` - Admin password (for seeding)
- `NEXTAUTH_URL` - Base URL for NextAuth
- `NEXTAUTH_SECRET` - Secret for NextAuth
- `NODE_ENV` - Environment (development/production)

## Project Structure

- `/src/app` - Next.js App Router pages and API routes
- `/src/components` - Reusable React components
- `/src/lib` - Utility functions and configurations
- `/src/models` - Mongoose models
- `/public` - Static files

## Authentication

The application uses JWT for authentication. The token is stored in an HTTP-only cookie for security.

## Deployment

For production deployment, make sure to set the following environment variables:

- `NODE_ENV=production`
- `MONGODB_URI` with your production MongoDB connection string
- `JWT_SECRET` with a strong secret key
- `NEXTAUTH_SECRET` with a strong secret key
- `NEXTAUTH_URL` with your production URL
