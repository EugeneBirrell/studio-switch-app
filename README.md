# StudioSwitchApp

StudioSwitchApp is a Next.js application created with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

Repository: [https://github.com/EugeneBirrell/studio-switch-app.git](https://github.com/EugeneBirrell/studio-switch-app.git)

## Overview

StudioSwitchApp provides a modern Next.js project structure for building and iterating on the application interface.

The project uses the Next.js App Router and follows the standard development workflow provided by Next.js.

It can be run locally, edited in place, built for production, and deployed to any hosting platform that supports Next.js.

## Features

- Built with [Next.js](https://nextjs.org)
- Bootstrapped with `create-next-app`
- Uses the Next.js App Router structure
- Supports local development with fast refresh
- Includes optimized font loading through [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
- Uses the [Geist](https://vercel.com/font) font family from the default setup
- Ready for production builds using the standard Next.js toolchain
- Suitable as a starting point for continued StudioSwitchApp development

## Requirements

Before running the project, install Node.js and at least one supported JavaScript package manager.

Supported package managers include:

- npm
- Yarn
- pnpm
- Bun

The examples below use npm by default, with alternatives shown where useful.

## Getting Started

Clone the repository:

```bash
git clone https://github.com/EugeneBirrell/studio-switch-app.git
```

Move into the project directory:

```bash
cd studio-switch-app
```

Install dependencies:

```bash
npm install
```

You can also install dependencies with another package manager:

```bash
yarn install
```

```bash
pnpm install
```

```bash
bun install
```

## Running the Development Server

Start the local development server:

```bash
npm run dev
```

Or use your preferred package manager:

```bash
yarn dev
```

```bash
pnpm dev
```

```bash
bun dev
```

After the server starts, open the application in your browser:

[http://localhost:3000](http://localhost:3000)

The application will update automatically as you edit source files.

## Editing the Application

The main page is located at:

```text
app/page.tsx
```

Edit this file and save your changes while the development server is running to see updates in the browser.

Additional routes and layouts can be added using the standard Next.js App Router structure.

## Project Structure

A typical project layout includes:

```text
app/
public/
package.json
next.config.*
tsconfig.json
```

The `app` directory contains application routes, pages, layouts, and related UI files.

The `public` directory stores static assets that can be served directly by the application.

The `package.json` file defines project scripts, dependencies, and development commands.

Configuration files such as `next.config.*` and `tsconfig.json` control Next.js and TypeScript behavior when present.

## Fonts

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) for font optimization.

The default setup references the [Geist](https://vercel.com/font) font family.

Font configuration is typically handled in the application layout or related style files.

## Available Scripts

The following scripts are commonly available in a Next.js project created with `create-next-app`.

Run the development server:

```bash
npm run dev
```

Build the application for production:

```bash
npm run build
```

Start the production server after building:

```bash
npm run start
```

Run linting if configured:

```bash
npm run lint
```

If a script is not available, check `package.json` for the exact commands included in the project.

## Building for Production

Create an optimized production build:

```bash
npm run build
```

After the build completes, start the production server:

```bash
npm run start
```

The production server serves the compiled Next.js application.

## Deployment

StudioSwitchApp can be deployed to any platform that supports Next.js.

A common deployment option is [Vercel](https://vercel.com), the platform from the creators of Next.js.

For more deployment guidance, see the official Next.js documentation:

[Next.js Deployment Documentation](https://nextjs.org/docs/app/building-your-application/deploying)

## Learn More

Useful Next.js resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Next.js GitHub Repository](https://github.com/vercel/next.js)

## Notes

This README is intended to provide a clear starting point for working with StudioSwitchApp.

As the project evolves, update this documentation with project-specific setup steps, environment configuration, scripts, and usage details.

Keeping the README current will help contributors run, understand, and maintain the application more easily.
