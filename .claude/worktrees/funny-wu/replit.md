# HUManity Foundation Website

## Overview

This is a full-stack web application for HUManity Foundation, an Indian education nonprofit organization. The platform serves as the organization's digital presence, enabling donations via Razorpay payment integration, volunteer registration, corporate partnership inquiries, and showcasing their education programs for Child Care Institutions (CCIs) and schools.

The application features a modern React frontend with a Node.js/Express backend, PostgreSQL database, and integrations with Razorpay for payments and Resend for transactional emails.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS v4 with shadcn/ui component library
- **Animations**: Framer Motion for page transitions and micro-interactions
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite

The frontend follows a page-based structure under `client/src/pages/` with shared components in `client/src/components/`. The UI component library uses Radix UI primitives styled with Tailwind CSS.

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (compiled with tsx for development, esbuild for production)
- **API Pattern**: RESTful endpoints under `/api/` prefix
- **Database ORM**: Drizzle ORM with PostgreSQL

The server handles payment processing, donation receipt generation (PDFKit), and email delivery. Routes are registered in `server/routes.ts` with database operations abstracted in `server/storage.ts`.

### Data Storage
- **Database**: PostgreSQL (Neon serverless)
- **Schema**: Defined in `shared/schema.ts` using Drizzle ORM
- **Tables**: 
  - `users` - Basic user authentication
  - `donations` - Donation records with Razorpay payment details

Schema changes are applied using `drizzle-kit push` command.

### Build System
- Development: Vite dev server with HMR for frontend, tsx for backend
- Production: Custom build script (`script/build.ts`) that uses Vite for frontend and esbuild for backend bundling
- Output: Compiled to `dist/` directory with frontend assets in `dist/public/`

## External Dependencies

### Payment Processing
- **Razorpay**: Indian payment gateway for processing donations
- Requires `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` environment variables
- Client-side SDK loaded via script tag in `index.html`

### Email Service
- **Resend**: Transactional email API for sending donation receipts
- Configured through Replit Connectors (auto-provisioned)
- Generates PDF receipts using PDFKit before sending

### Database
- **Neon PostgreSQL**: Serverless Postgres with WebSocket support
- Requires `DATABASE_URL` environment variable
- Uses `@neondatabase/serverless` driver with WebSocket configuration

### CDN & Fonts
- Google Fonts: Montserrat and Open Sans font families
- Static assets served from `client/public/` and `attached_assets/`

### Replit-Specific Integrations
- `@replit/vite-plugin-runtime-error-modal`: Error overlay in development
- `@replit/vite-plugin-cartographer`: Development tooling
- `@replit/vite-plugin-dev-banner`: Development environment indicator
- Custom `vite-plugin-meta-images`: Handles OpenGraph image URLs for Replit deployments