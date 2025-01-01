# Bank Street

A modern banking platform built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Bank Station**: Central hub for account management and financial overview
  - Transaction history with filtering
  - Spending insights with interactive charts
  - Account balance overview
  - Quick transfer functionality

- **Bank Store**: Marketplace for financial products
  - Credit cards
  - Mortgages
  - Business accounts
  - Savings accounts
  - Advanced filtering and search

- **Bank Atlas**: Interactive map for finding banks and ATMs
  - Real-time location tracking
  - Bank branch information
  - Service availability
  - Appointment scheduling

- **Bank Stella**: AI-powered financial assistant
  - Natural language interactions
  - Financial advice
  - Product recommendations
  - Transaction insights

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/bank-street.git
cd bank-street
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file with the following variables:
```env
# Authentication
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Database
DATABASE_URL=your_database_url

# Next Auth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Map Services
MAPBOX_TOKEN=your_mapbox_token
```

4. Initialize the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

## Testing

Run the test suite:
```bash
npm test
```

Watch mode for development:
```bash
npm run test:watch
```

## Deployment

1. Install the Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy to Vercel:
```bash
vercel deploy
```

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **Authentication**: NextAuth.js
- **Database**: PostgreSQL with Prisma
- **AI Integration**: OpenAI GPT-4
- **Maps**: React Leaflet
- **Charts**: Recharts
- **Testing**: Jest + React Testing Library

## Project Structure

```
bank-street/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── bank-station/      # Bank Station feature
│   ├── bank-store/        # Bank Store feature
│   ├── bank-atlas/        # Bank Atlas feature
│   └── settings/          # User settings
├── components/            # React components
│   ├── bank-station/      # Bank Station components
│   ├── bank-store/        # Bank Store components
│   ├── bank-stella/       # AI chat components
│   ├── notifications/     # Notification components
│   └── ui/               # Shared UI components
├── lib/                   # Utility functions and store
│   ├── store/            # Zustand store
│   └── utils/            # Helper functions
├── prisma/               # Database schema and migrations
└── __tests__/           # Test files
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
