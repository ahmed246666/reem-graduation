# Culinary Bridge

A modern web application for discovering global cuisines and recipes, built with Vite, React, TypeScript, and shadcn/ui.

## Features

- 🌍 Explore cuisines from around the world
- 🍽️ Browse detailed recipes with ingredients and instructions
- ⭐ Save favorite recipes
- 🔍 Search functionality
- 🌙 Dark/light theme support
- 🌐 Multi-language support (English/Arabic)
- 📱 Responsive design

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Routing**: React Router
- **State Management**: React Query
- **Forms**: React Hook Form with Zod validation
- **Testing**: Vitest + Playwright
- **Linting**: ESLint with TypeScript support

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd culinary-bridge
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Building

Build for production:
```bash
npm run build
```

### Testing

Run tests:
```bash
npm run test
```

Run tests in watch mode:
```bash
npm run test:watch
```

Run E2E tests:
```bash
npx playwright test
```

### Linting

Run ESLint:
```bash
npm run lint
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/            # shadcn/ui components
│   ├── layout/        # Header, Footer
│   └── home/          # Home page components
├── context/           # React Context providers
├── data/             # Static data and mock data
├── pages/            # Page components
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
└── test/             # Test setup and utilities
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run tests and linting
6. Submit a pull request

## License

This project is licensed under the MIT License.
