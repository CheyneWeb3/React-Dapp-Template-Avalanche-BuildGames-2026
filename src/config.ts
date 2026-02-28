// InHaus Devs — Avalanche Build-Games boilerplate config

export const APP_NAME = 'Avalanche Build-Games Boilerplate'

// Default chain on first load (Fuji testnet)
export const DEFAULT_CHAIN_ID = 43113

// Token addresses per network
// WAVAX mainnet: 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7
// WAVAX Fuji:    0xd00ae08403b9bbb9124bb305c09058e32c39a48c
export const TOKENS = {
  43114: {
    WAVAX: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7'
  },
  43113: {
    WAVAX: '0xd00ae08403b9bbb9124bb305c09058e32c39a48c'
  }
} as const
