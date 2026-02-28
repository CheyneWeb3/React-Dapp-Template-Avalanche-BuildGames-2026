# InHaus Devs — Avalanche Build-Games Boilerplate

Vite + React + TypeScript dApp boilerplate using:

- **Reown AppKit** (WalletConnect)
- **Ethers v6**
- **MUI** (Avalanche-themed)

Includes **Avalanche Fuji + Mainnet** with **Fuji as the default**.

A tiny Vite + React + TypeScript dApp that uses **Reown AppKit** (WalletConnect) with the **Ethers v6 adapter**.

It renders a simple page (in `src/pages/HomePage.tsx`):
- Connect wallet (Reown modal)
- Show connected address + chain
- Show native **AVAX** balance
- Show **WAVAX** ERC-20 balance

WAVAX contracts:
- Mainnet: `0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7`
- Fuji: `0xd00ae08403b9bbb9124bb305c09058e32c39a48c`

## Setup

1) Install deps

```bash
npm install --no-audit --no-fund
```

2) Add your Reown project id

```bash
cp .env.example .env
```

Then set `VITE_REOWN_PROJECT_ID` in `.env`.

Get a project id from the Reown Dashboard:
- https://dashboard.reown.com

3) Run

```bash
npm run dev
```

Open http://localhost:5173

## Notes

- AppKit expects `metadata.url` to match your actual domain (for Verify API). For local dev we use `window.location.origin`.
- Change the default network in `src/config.ts` (`DEFAULT_CHAIN_ID`).
- Background image lives in `public/images/bg-avax.svg`.
