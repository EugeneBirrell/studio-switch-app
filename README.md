# StudioSwitchApp

StudioSwitchApp is a Next.js application created with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

Repository: [https://github.com/EugeneBirrell/studio-switch-app.git](https://github.com/EugeneBirrell/studio-switch-app.git)

## Overview

This project provides a modern Next.js starter application structure for building and iterating on the StudioSwitchApp interface.

It uses the Next.js App Router structure and includes the default development workflow provided by Next.js.

The application can be run locally, edited in place, and deployed using any platform that supports Next.js.

## Features

- Built with [Next.js](https://nextjs.org)
- Bootstrapped with `create-next-app`
- Uses the App Router project structure
- Supports local development with hot reloading
- Includes optimized font loading through [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
- Uses the [Geist](https://vercel.com/font) font family
- Ready for deployment on platforms that support Next.js

## Requirements

Before running the project, make sure you have one of the supported JavaScript package managers installed.

You can use:

- npm
- Yarn
- pnpm
- Bun

You will also need Node.js installed for the standard Next.js development workflow.

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

Or use your preferred package manager:

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

Start the local development server with one of the following commands:

```bash
npm run dev
```

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

The page will update automatically as you edit the source files.

## Editing the Application

The main page can be edited in:

```text
app/page.tsx
```

Save changes to see updates in the browser while the development server is running.

## Project Structure

A typical Next.js App Router project includes files and folders such as:

```text
app/
public/
package.json
next.config.*
tsconfig.json
```

The `app` directory contains application routes and pages.

The `public` directory is used for static assets.

The `package.json` file defines scripts and dependencies for the project.

## Fonts

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to optimize and load fonts.

The default font referenced by the original project setup is [Geist](https://vercel.com/font).

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
