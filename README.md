# Burger Dev

## Description

Burger Dev is a web application designed to manage **digital menus for restaurants**. It allows users to explore products, categories, promotions, and place orders via WhatsApp. Each deployment is **customized per client**, reflecting their branding, menu structure, and business flow.

> ⚠️ **Note:** This repository contains the core application used as a base for client-specific implementations. Client deployments are delivered individually and are **not publicly shared**.

## Main Features

- **Shopping Cart**: Add products, adjust quantities, and place orders.
- **Category and Product Management**: Organize products into categories for easier navigation.
- **Promotions**: Apply discounts and special offers to selected products.
- **WhatsApp Integration**: Orders are sent directly via WhatsApp.
- **Modern Interface**: Responsive design with Tailwind CSS.
- **Client-specific Customization**: Each deployment can have unique branding, menu structure, and database integration.
- **Analytics Dashboard**: Track visits, orders, and user interactions.

## Technologies Used

- **Next.js 13+**: React framework with App Router and Server Components
- **TypeScript**: Static typing for JavaScript
- **Prisma**: Type-safe ORM for database operations
- **PostgreSQL**: Robust relational database
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/ui**: High-quality reusable components
- **Framer Motion**: Smooth animations
- **Zustand**: Lightweight state management
- **Server Actions**: Backend functionality
- **NextAuth.js**: Authentication handling

## Project Structure

```
├── prisma/                  # Database schema and migrations
│   ├── schema.prisma
│   └── migrations/
├── public/                  # Static files
│   ├── images/
│   └── resources/
└── src/
    ├── actions/            # Server actions (API handlers)
    │   ├── analitycs/     # Analytics and tracking
    │   ├── auth/          # Authentication actions
    │   ├── products/      # Product management
    │   └── upload/        # File upload handlers
    ├── app/               # Next.js 13 App Router
    │   ├── admin/        # Admin dashboard routes
    │   ├── api/          # API routes
    │   └── auth/         # Auth pages
    ├── components/        # Reusable UI components
    │   ├── admin/        # Admin interface components
    │   ├── products/     # Product-related components
    │   ├── ui/           # Shadcn/ui components
    │   └── analitycs/    # Analytics components
    ├── hooks/            # Custom React hooks
    ├── lib/              # Utilities and configurations
    │   ├── types/        # TypeScript types
    │   └── utils/        # Helper functions
    └── store/            # Zustand store modules
```

## Installation

1. Clone this repository:

```
git clone https://github.com/deiviiss/menu-digital.git
```

2. Install dependencies:

```
pnpm install
```

## Available Scripts

- `pnpm dev`: Starts the development server
- `pnpm build`: Builds the application for production
- `pnpm start`: Starts the application in production mode

## Contribution

1. Fork the project
2. Create a branch for your feature:

```
git checkout -b feature/new-feature
```

3. Make your changes and commit them:

```
git commit -m "Add new feature"
```

4. Push your changes:

```
git push origin feature/new-feature
```

5. Open a Pull Request

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"

# NextAuth.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# App Configuration
NEXT_PUBLIC_COMPANY_NAME="Your Restaurant Name"
```

## Development

1. Start the PostgreSQL database:

```
docker-compose up -d
```

2. Run database migrations:

```
pnpm prisma migrate dev
```

3. Start the development server:

```
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to view your application.
