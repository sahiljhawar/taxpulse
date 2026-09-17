# Taxfix Treasure

Mobile-first demo of "Taxfix Treasure" — find the money hiding in your year. Built with React, Vite, and Tailwind CSS. Hackathon demo — no backend, no real tax logic, all state is in-memory.

**Flow:** Dashboard (Tax Treasure + Readiness) → scan a receipt → a simulated multi-agent pipeline (Receipt Agent, Tax Agent, Treasure Agent) estimates its tax impact → claim it and watch the Treasure grow → the Context Agent surfaces a second opportunity (a partially-documented work trip) as the demo's wow moment.

## Quick install

**Requirements:** Node.js 18+ and npm.

Check what you have (or install if missing):

```bash
node -v   # should print v18 or higher
npm -v
```

Don't have Node? Install it with [nvm](https://github.com/nvm-sh/nvm):

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
nvm install --lts
```

Or via Homebrew on macOS:

```bash
brew install node
```

**Then, clone and run:**

```bash
git clone git@github.com:sahiljhawar/taxpulse.git
cd taxpulse
npm install
npm run dev
```

Open the URL Vite prints (default [http://localhost:5173](http://localhost:5173)). For the best look, open dev tools and switch to a mobile device viewport.

## Other commands

```bash
npm run build     # production build to dist/
npm run preview   # preview the production build locally
```

## Demo tips

- Long-press the "Hi Alex" greeting on the Dashboard to reset all state back to the starting scenario.
- On the upload screen, "Use demo receipt instead" skips the file picker so you can run the pitch without a real photo.
- Everything (treasure, readiness, receipts) resets on a page refresh — it's session-only, by design.
