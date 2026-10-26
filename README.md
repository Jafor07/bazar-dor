# 🛒 বাজার দর (BazarDor)

A Bangla grocery price tracker. See today's prices of rice, lentils, oil, vegetables,
fish, meat, eggs & dairy and spices, market by market, with daily price changes.

🔗 **Live site:** https://bazar-dor-bc28.vercel.app/
📦 **Repository:** https://github.com/Jafor07/bazar-dor

## Features

- **Home** – hero, today's biggest price rises and falls, all products, and a live scrolling price ticker
- **Category pages** – products by category with price sorting (low → high, high → low)
- **Product details** (login required) – lowest / highest / average price, market-wise price table, and price history (yesterday, last week, last month)
- **Authentication** – email & password, Google and GitHub login (BetterAuth + MongoDB Atlas)
- **Protected routes** – `/product/*` and `/profile/*` redirect to sign in and return you afterwards
- **Profile** – view your account details and update your name
- Custom 404 page, loading skeletons, fully responsive, Bangla numerals and dates

## Tech stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · DaisyUI · BetterAuth · MongoDB Atlas · react-hot-toast · react-icons
