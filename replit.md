# Content Creation Platform (Kreatiq)

## Overview

This is a full-stack content creation platform built with React, Express.js, and PostgreSQL. The application helps users generate and manage content ideas using AI assistance, featuring a modern dashboard interface with real-time chat capabilities, content calendar, and workflow templates.

## System Architecture

### Frontend Architecture
- **React 18** with TypeScript for the client-side application
- **Vite** as the build tool and development server
- **Tailwind CSS** with shadcn/ui components for styling
- **TanStack Query** for state management and API caching
- **Wouter** for client-side routing
- Component-based architecture with reusable UI components

### Backend Architecture
- **Express.js** server with TypeScript
- **RESTful API** design with structured route handling
- **Drizzle ORM** for database interactions with PostgreSQL
- **OpenAI integration** for AI-powered content generation
- Middleware-based request processing with logging

### Database Design
PostgreSQL database with three main tables:
- `content_ideas`: Stores generated content with metadata (title, description, content type, platform, status, tags)
- `chat_messages`: Manages AI chat conversations with session tracking
- `workflow_templates`: Pre-built automation workflows with JSON step definitions

## Key Components

### Content Management
- AI-powered content idea generation using OpenAI GPT-4o
- Content categorization by type (social, blog, video, email) and platform
- Status tracking (draft, ready, published)
- Tag-based organization system

### AI Chat Interface
- Real-time chat with AI assistant
- Session-based conversation tracking
- Content generation through natural language prompts
- Integration with content idea creation workflow

### Dashboard Features
- Quick action buttons for content generation
- Recent ideas overview with visual status indicators
- Content calendar for scheduling and planning
- Workflow templates for automated content creation

### UI/UX Design
- Modern, clean interface with gradient accents
- Responsive design optimized for desktop and mobile
- Loading states and error handling
- Toast notifications for user feedback

## Data Flow

1. **Content Generation**: User submits prompts → OpenAI API → Structured content ideas → Database storage
2. **Chat Interaction**: User messages → AI processing → Response generation → Session storage
3. **Content Management**: CRUD operations on content ideas with real-time UI updates
4. **Workflow Execution**: Template selection → Step processing → Content generation

## External Dependencies

### Core Technologies
- **@neondatabase/serverless**: PostgreSQL database connection
- **drizzle-orm**: Type-safe database queries and migrations
- **openai**: AI content generation capabilities
- **@tanstack/react-query**: Data fetching and caching
- **@radix-ui**: Accessible UI component primitives

### Development Tools
- **Vite**: Fast development server and build tool
- **TypeScript**: Type safety across the entire stack
- **Tailwind CSS**: Utility-first styling framework
- **tsx**: TypeScript execution for development

## Deployment Strategy

### Environment Configuration
- **Development**: Vite dev server with hot module replacement
- **Production**: Built static assets served by Express server
- **Database**: PostgreSQL with connection pooling via Neon

### Build Process
1. Frontend build using Vite (outputs to `dist/public`)
2. Backend build using esbuild (outputs to `dist/index.js`)
3. Database migrations managed through Drizzle Kit

### Hosting Requirements
- Node.js runtime environment
- PostgreSQL database instance
- OpenAI API key for content generation
- Port 5000 for the application server

## Recent Changes

```
- June 22, 2025: AI integration with demo mode fallback system
- June 22, 2025: Content generation works without API key for testing
- June 22, 2025: Chat interface with intelligent demo responses
- June 22, 2025: Fixed type errors in storage layer
- June 22, 2025: Initial platform setup and architecture
- June 22, 2025: OpenAI API key successfully connected
- June 22, 2025: Robust error handling for API quota limits
- June 22, 2025: PostgreSQL database integration complete
- June 22, 2025: Migrated from in-memory to persistent database storage
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```