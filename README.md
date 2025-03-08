# Alma Lead Portal

A Next.js application for managing leads for visa assistance.

## Features

- **Public Lead Form**: A form for prospects to fill in their information and upload their resume/CV.
- **Admin Leads Management**: An authenticated UI for admins to display and manage leads.
- **Authentication**: JWT-based authentication system to protect admin pages.
- **Lead Status Management**: Ability to change lead status from PENDING to REACHED_OUT.

## Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Styled Components with Montserrat font and ThemeProvider
- **Form Management**: Custom form hooks with validation
- **Authentication**: JWT-based authentication with jose
- **Testing**: Jest, React Testing Library

## Documentation

- [System Design](./SYSTEM_DESIGN.md) - Details about the system architecture and design choices

## Best Practices Implemented

- **Theming**: Centralized theme with ThemeProvider for consistent styling
- **Component Structure**: Reusable UI components with proper TypeScript typing
- **Form Handling**: Custom hooks for form state management and validation
- **Authentication**: JWT-based authentication with proper token verification
- **Middleware**: Role-based access control with Next.js middleware
- **Type Safety**: Strong TypeScript typing throughout the application
- **Performance**: Optimized font loading and code splitting
- **Accessibility**: Semantic HTML and ARIA attributes

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `src/app`: Next.js app router pages
- `src/components`: React components
  - `src/components/ui`: Reusable UI components
- `src/hooks`: Custom React hooks
- `src/store`: Redux store and slices
- `src/types`: TypeScript type definitions
- `src/lib`: Utility functions and configurations
- `src/middleware.ts`: Authentication middleware

## Authentication

For demonstration purposes, the application uses a mock authentication system with JWT tokens. To log in, use:

- Admin: admin@example.com / password123

Authentication is only required for admin pages. The leads form is publicly accessible to anyone without authentication.

## API Routes

- `GET /api/leads`: Get all leads (admin only)
- `POST /api/leads`: Create a new lead (public)
- `GET /api/leads/:id`: Get a specific lead (admin only)
- `PATCH /api/leads/:id`: Update a lead's status (admin only)
- `POST /api/auth/login`: Log in and receive JWT token
- `POST /api/auth/logout`: Log out and clear JWT token
- `GET /api/auth/me`: Check authentication status

## Testing

Run tests with:

```bash
npm test
```

## License

This project is licensed under the MIT License.
