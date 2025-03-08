# Alma Lead Portal System Design

## System Overview

Alma Lead Portal is a Next.js application designed to capture, store, and manage leads for visa assistance services. The system consists of two main components:

1. **Public Lead Form** - A publicly accessible form for prospects to submit their information
2. **Admin Interface** - A protected interface for internal users to view and manage leads

## Architecture

### Technology Stack

- **Frontend Framework**: Next.js 15.2.1 with React 19
- **Language**: TypeScript for type safety
- **State Management**: Redux Toolkit with React-Redux
- **Styling**: Styled Components with ThemeProvider
- **Authentication**: JWT-based authentication with jose library
- **Routing**: Next.js App Router
- **Form Management**: Custom form validation hooks
- **Testing**: Jest and React Testing Library

### System Components

#### Frontend Components

- **Public Lead Form**: Implemented using React components with form validation
- **Admin Dashboard**: Protected interface for managing leads
- **Authentication System**: JWT-based login system

#### Backend Components (API Routes)

- **Authentication API**: Login, logout, and session management
- **Leads API**: CRUD operations for lead management

## Design Choices

### Next.js App Router

I chose to use Next.js App Router (instead of Pages Router) because:

- It provides more intuitive route grouping and nesting
- Better support for layouts and templates
- Built-in loading and error states
- Better performance with React Server Components

### TypeScript

TypeScript was chosen to:

- Provide strong type safety across the application
- Improve developer experience with better autocomplete and error catching
- Document the codebase through types and interfaces
- Reduce runtime errors by catching type errors during development

### Redux Toolkit for State Management

I implemented Redux Toolkit because:

- It provides a centralized store for all application state
- Simplifies state management with createSlice and createAsyncThunk
- Makes it easier to handle complex state transitions for lead status
- Allows for better separation of concerns between UI and state logic
- Simpler testing of state logic in isolation

### JWT Authentication

JWT-based authentication was chosen because:

- It's stateless, reducing server load and database queries
- Easy to implement with jose library
- Provides a secure way to store user information
- Well-suited for a simple admin authentication system

### Styled Components

Styled Components was selected for styling because:

- It enables component-scoped styling to prevent CSS conflicts
- Allows for theme-based styling through ThemeProvider
- Makes it easy to create a consistent design system
- Enables dynamic styling based on props and state

### Local Storage Persistence

For demonstration purposes, the application uses local storage to persist leads data:

- Simulates a backend database without requiring external services
- Allows for testing the full application flow
- Maintains data between page refreshes during development
- Can be easily replaced with real API calls in production

## Form Implementation

The lead form is implemented with:

- Custom validation hooks for real-time field validation
- File upload component with drag-and-drop support
- Responsive design for mobile and desktop
- Accessible form elements with proper ARIA attributes

## Admin Interface Implementation

The admin interface includes:

- Protected routes using Next.js middleware
- Lead status management (PENDING to REACHED_OUT)
- Sortable and filterable lead list
- Responsive design for various screen sizes

## Authentication Flow

1. User submits credentials on login page
2. Credentials are validated against predefined admin user(s)
3. Upon successful authentication, JWT token is generated and stored in cookies
4. Middleware validates the token on protected routes
5. Token expiration is handled with automatic logout

## Potential Improvements

Future improvements could include:

1. **Database Integration**: Replace local storage with a real database
2. **File Storage Service**: Implement cloud storage for uploaded resumes
3. **Email Notifications**: Add email notifications when new leads are submitted
4. **Advanced Lead Filtering**: Implement more advanced filtering and sorting options
5. **User Management**: Add ability to create and manage admin users
6. **Analytics Dashboard**: Add analytics to track lead source and conversion rates
7. **Multi-language Support**: Add internationalization for global usage
8. **CI/CD Pipeline**: Implement automated testing and deployment

## Security Considerations

The application implements several security measures:

- JWT authentication with proper token verification
- Route protection with Next.js middleware
- Form validation to prevent invalid data
- Role-based access control for admin features