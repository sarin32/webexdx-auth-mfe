# WebExDX Auth MFE

A React-based Micro-Frontend (MFE) for managing authentication in the WebExDX platform.

## Features

- **User Login/Registration**: secure forms using `react-hook-form` and `zod` validation.
- **Responsive Design**: built with Tailwind CSS and Radix UI components.
- **Theme Support**: light and dark mode integration using `next-themes`.
- **Micro-Frontend Ready**: designed to be integrated into larger container applications.

## Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4, Radix UI
- **Forms**: React Hook Form, Zod
- **Icons**: Lucide React, Radix Icons
- **HTTP Client**: Axios
- **Linter/Formatter**: Biome

## Prerequisites

- **Node.js**: >= 22
- **Package Manager**: pnpm

## Getting Started

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm run start
```

### Build

```bash
pnpm run build:prod
```

## Available Scripts

- `pnpm run start`: Starts the development server using Vite.
- `pnpm run build:prod`: Compiles the application for production.
- `pnpm run lint`: Checks the code for quality issues using Biome.
- `pnpm run fix`: Automatically fixes linting issues using Biome.
- `pnpm run preview`: Previews the production build locally.

## Docker

### Build

```bash
docker build -t webexdx-auth-mfe .
```

### Run

```bash
docker run -p 8080:80 webexdx-auth-mfe
```

The application will be available at `http://localhost:8080`.

## License

Private
