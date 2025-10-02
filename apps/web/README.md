# IntelliSMART Web Application

A modern web application for managing and showcasing business intelligence and AI solutions.

## Features

- **News & Blog** - Dynamic news section with featured articles and category filtering
- **User Authentication** - Secure login and registration system
- **Admin Dashboard** - Manage content and users
- **Responsive Design** - Works on all device sizes
- **Modern UI** - Built with Tailwind CSS and Shadcn UI components

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
  - `/news` - News and blog section with article listings
  - `/admin` - Admin dashboard and content management
  - `/(auth)` - Authentication routes (login, register, etc.)
  - `/(marketing)` - Public marketing pages
- `/src/components` - Reusable React components
  - `/ui` - Shadcn UI components
  - `/icons` - Custom SVG icons
- `/src/lib` - Utility functions and configurations
- `/src/models` - Mongoose models
- `/public` - Static files
  - `/blog` - Blog post images
  - `/team` - Team member photos

## Authentication

The application uses JWT for authentication. The token is stored in an HTTP-only cookie for security.

## News & Blog Features

The news section includes the following features:

- **Featured Articles** - Highlight important posts at the top
- **Category Filtering** - Filter posts by category
- **Pagination** - Browse through multiple pages of articles
- **Responsive Grid** - Adapts to different screen sizes
- **Author Information** - Shows author details and publication date
- **Read Time** - Estimated reading time for each article

### Adding New Articles

1. Create a new blog post by adding an object to the `blogPosts` array in `/src/app/news/page.tsx`
2. Add the corresponding image to `/public/blog/`
3. Add author images to `/public/team/`

## Deployment

For production deployment, make sure to set the following environment variables:


```bash
NODE_ENV=production
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_secure_jwt_secret
NEXTAUTH_SECRET=your_secure_nextauth_secret
NEXTAUTH_URL=https://your-production-url.com
```


### Deployment Recommendations

- Use a platform like Vercel or Netlify for seamless deployments
- Set up a CI/CD pipeline for automated testing and deployment
- Enable compression and image optimization in production
- Implement proper caching headers for better performance
