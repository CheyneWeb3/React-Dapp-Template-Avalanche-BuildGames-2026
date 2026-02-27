import { createAppKit } from '@reown/appkit/react'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { avalanche } from '@reown/appkit/networks'

// Reown Dashboard Project ID
// Docs note: WalletConnect provides a public projectId suitable for localhost in examples.
// You should replace this with your own projectId for production.
const FALLBACK_LOCALHOST_PROJECT_ID = 'b56e18d47c72ab683b10814fe9495694'

export const projectId =
  import.meta.env.VITE_REOWN_PROJECT_ID?.trim() || FALLBACK_LOCALHOST_PROJECT_ID

const metadata = {
  name: 'Avalanche Balances Dapp',
  description: 'Simple Avalanche (AVAX + WAVAX) balance viewer',
  url:
    import.meta.env.VITE_APP_URL?.trim() ||
    (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173'),
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

export const networks = [avalanche]

// IMPORTANT: call createAppKit outside of React components to avoid rerenders.
export const appKit = createAppKit({
  adapters: [new EthersAdapter()],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true
  }
})
