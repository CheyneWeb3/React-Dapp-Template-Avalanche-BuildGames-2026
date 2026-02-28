import { createAppKit } from '@reown/appkit/react'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { DEFAULT_CHAIN_ID } from './config'

const FALLBACK_LOCALHOST_PROJECT_ID = 'b56e18d47c72ab683b10814fe9495694'

export const projectId =
  import.meta.env.VITE_REOWN_PROJECT_ID?.trim() || FALLBACK_LOCALHOST_PROJECT_ID

const appUrl =
  import.meta.env.VITE_APP_URL?.trim() ||
  (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173')

const metadata = {
  name: 'Avalanche Balances Dapp',
  description: 'Simple Avalanche (AVAX + WAVAX) balance viewer',
  url: appUrl,
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

const avalancheMainnet = {
  id: 43114,
  chainId: 43114,
  name: 'Avalanche C-Chain',
  network: 'avalanche',
  nativeCurrency: { name: 'Avalanche', symbol: 'AVAX', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://api.avax.network/ext/bc/C/rpc']
    }
  },
  blockExplorers: {
    default: { name: 'Snowtrace', url: 'https://snowtrace.io' }
  }
} as any

const avalancheFuji = {
  id: 43113,
  chainId: 43113,
  name: 'Avalanche Fuji',
  network: 'avalanche-fuji',
  nativeCurrency: { name: 'Avalanche', symbol: 'AVAX', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://api.avax-test.network/ext/bc/C/rpc']
    }
  },
  blockExplorers: {
    default: { name: 'Snowtrace (Testnet)', url: 'https://testnet.snowtrace.io' }
  }
} as any

export const networks =
  DEFAULT_CHAIN_ID === 43114
    ? [avalancheMainnet, avalancheFuji]
    : [avalancheFuji, avalancheMainnet]


const avaxChainIconUrl = new URL('/images/chain-avax.png', appUrl).toString()

const featuredWalletIds = [
  // Avalanche Core wallet id
  'f323633c1f67055a45aac84e321af6ffe46322da677ffdd32f9bc1e33bafe29c',

]

export const appKit = createAppKit({
  adapters: [new EthersAdapter()],
  networks,
  projectId,
  metadata,
  featuredWalletIds,

  chainImages: {
    43114: avaxChainIconUrl,
    43113: avaxChainIconUrl
  },

  features: {
    analytics: true
  }
})
