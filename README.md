# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.

## Sr. Frontend Developer Technical Assignment

### Assignment Overview

Please build a responsive, server-rendered front-end web application using the CoinCap API (https://docs.coincap.io/).

The goal is to demonstrate your ability to consume a public API, implement Server-Side Rendering (SSR), manage state effectively, and handle simulated real-time data using Server-Sent Events (SSE).

## Requirements

### Technology Stack

- [x] Framework: Next.js (with TypeScript)
- [x] Styling: TailwindCSS
- [x] State Management: Redux
- [x] Server-side Rendering
- [x] Public API Integration – use CoinCap API

### Minimum Features

- [x] Home Page that displays the top 20 cryptocurrencies by market cap.
- [x] Coin Detail Page (/coin/[id]) that shows real-time price updates and metadata.
- [x] A real-time price ticker or chart that updates every few seconds.
- [ ] You may simulate SSE using a custom API route or setInterval().

## Responsive Design

- [ ] The application must be usable and visually coherent on both desktop and mobile devices.
- [ ] Deployment
- [ ] The application must be deployed and publicly accessible.

## Bonus (Optional) Features

- [ ] Filtering or sorting by price, volume, or change %
- [ ] Dark mode toggle with persisted preference
- [ ] Unit tests for at least one component using Jest or React Testing Library

## Submission Guidelines

### Please submit the following:

- [ ] Link to the GitHub repository (public)
- [ ] Link to the deployed application
- [ ] A README file containing:
- [ ] Setup instructions
- [ ] Explanation of your architecture/approach
- [ ] Any assumptions or trade-offs made
