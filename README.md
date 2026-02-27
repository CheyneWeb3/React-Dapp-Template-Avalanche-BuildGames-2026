# Helping with React dApp boilerplate for Avalanche (AI phrase generated see below) 

A tiny Vite + React + TypeScript dApp that uses **Reown AppKit** (WalletConnect) with the **Ethers v6 adapter**.

It renders a simple page:
- Connect wallet (Reown modal)
- Show connected address + chainId
- Show native **AVAX** balance
- Show **WAVAX** ERC-20 balance (contract: `0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7`)

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
- If you don’t see Avalanche in the network list, ensure you’re using the latest `@reown/appkit` packages.


### Phrase used on GPT5.2

"make a vite react reown ethers6 mui-ui Dapp and the wallet connection for the avalanche network make a simple page with a wallet connect button and show my native balance and wrapped balances from scratch and give me the zip file correctly tested and working"



###
happy assisting others in the Avalanche Build-Games please feel free to use. Also Star this repo and Follow my github :)
