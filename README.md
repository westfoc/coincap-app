# Coinapp Project

## Technologies

This app is built using the following technologies:

- Next.js 15
- TypeScript 5.8.3
- Tailwind CSS 4.0.15
- chart.js 4.4.9
- React Redux 9.2.0
- Redux Toolkit 2.8.2

### Prerequisites 🛠️

- [Git](http://git-scm.com/)
- [Node.js](http://nodejs.org/) (v20.18.1 or higher)
- [pnpm](https://pnpm.io/) (recommended) or npm

### Installation Steps

You'll need to add secrets to an .env to use the db and for Clerk Auth. Let me know your email and I can share these secrets via the Vercel and Clerk apps.

Open your terminal and run:

```sh
$ git clone git@github.com:westfoc/coincap-app.git
$ cd coincap-app
$ pnpm install
$ pnpm run dev
$ Navigate to `http://localhost:3000/` to view the app
```

## Development

View the deployed app here: `https://coincap-app-delta.vercel.app/`

## Explanation:

I have created a simple Next.js application with Redux Toolkit, Tailwind, Typescript, and Chart.js to render the price history of selected coins. I've utilized an amalgamation of client-side and server-side rendering. To handle the interactivity of the homepage table, we call setInterval to rehydrate the state and update the table values, so the user can click on cell rows to navigate to coin pages for additional detail on each coin. To optimize the performance of the homepage, we use a table skeleton, so that the initial page load is fast while we wait to load the fetched data.

We use the App Router to create routes via a nested directory structure, passing the id slug to fetch a specific coin asset. After routing to the coin page, we use server-side rendering on the individual coin page with the coinapp api as the source of the truth. We do not store the fetched data in Redux. We use the charts.js library to render the pricing history data. This library is lightweight and is faster than handrolling graph visualizations using canvas.

## Tradeoffs

This Next.js crypto application makes several strategic tradeoffs to balance performance, user experience, and development efficiency. By combining Redux Toolkit for client-side state with direct API calls for server-rendered pages, we've created a clear separation of concerns, though this dual approach introduces some complexity in data management. The mixed rendering strategy—client-side for the interactive homepage table and server-side for detail pages—optimizes for interactivity and SEO, but requires maintaining two different rendering paradigms.

These performance optimizations include skeleton loading states that improve perceived speed while waiting for data, though this adds multiple rendering states to manage. Using setInterval for price updates offers simplicity over WebSockets but sacrifices some real-time accuracy. Chart.js accelerates the development of price history visualizations at the cost of bundle size increases and less control over customization.

From an SEO perspective, the client-rendered table might limit initial content indexing, while the server-rendered detail pages better support search visibility but potentially create less smooth transitions. The "API as source of truth" approach ensures fresh data but may generate redundant API calls compared to a more aggressive caching strategy.

The technical stack of TypeScript, Tailwind, and the App Router demonstrates a forward-looking approach, though each choice involves specific tradeoffs. Typescript type safety requires more upfront work, reducing developer velocity. Tailwind speeds up development at the expense of long strings of utility, which can make the React page harder to read, and the newer App Router gains modern features but faces a less mature ecosystem.

## Lighthouse scores

<img alt="lighthouse" src="/Users/corywest-forbes/Documents/code/coincap-app/public/Screenshot 2025-05-19 at 11.33.46 PM.png">
