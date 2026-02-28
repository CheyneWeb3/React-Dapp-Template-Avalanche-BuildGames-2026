import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  Stack,
  Typography
} from '@mui/material'
import { BrowserProvider, Contract, formatEther, formatUnits } from 'ethers'
import { useAppKit, useAppKitAccount, useAppKitProvider, useDisconnect } from '@reown/appkit/react'
import { APP_NAME, DEFAULT_CHAIN_ID, TOKENS } from '../config'

const ERC20_ABI = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
  'function balanceOf(address) view returns (uint256)'
]

const CHAINS: Record<number, { name: string; hex: string }> = {
  43113: { name: 'Avalanche Fuji (43113)', hex: '0xa869' },
  43114: { name: 'Avalanche C-Chain (43114)', hex: '0xa86a' }
}

function shortAddr(addr?: string) {
  if (!addr) return ''
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`
}

async function trySwitchChain(walletProvider: any, chainId: number) {
  if (!walletProvider?.request) throw new Error('Wallet provider does not support request()')
  const chainHex = CHAINS[chainId]?.hex || `0x${chainId.toString(16)}`
  await walletProvider.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: chainHex }]
  })
}

export default function HomePage() {
  const { open } = useAppKit()
  const { disconnect } = useDisconnect()

  // Explicitly use the EVM namespace
  const { address, isConnected, status } = useAppKitAccount({ namespace: 'eip155' })
  const { walletProvider } = useAppKitProvider('eip155')

  const [chainId, setChainId] = useState<number | null>(null)
  const [native, setNative] = useState<string>('')
  const [wavax, setWavax] = useState<string>('')
  const [wavaxSymbol, setWavaxSymbol] = useState<string>('WAVAX')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const desiredChainId = DEFAULT_CHAIN_ID
  const wrongNetwork = useMemo(() => {
    return isConnected && chainId !== null && chainId !== desiredChainId
  }, [isConnected, chainId, desiredChainId])

  const wavaxAddress = useMemo(() => {
    const key = chainId ?? desiredChainId
    return (TOKENS as any)[key]?.WAVAX
  }, [chainId, desiredChainId])

  const refreshBalances = useCallback(async () => {
    setError(null)
    setNative('')
    setWavax('')

    if (!isConnected || !address) return
    if (!walletProvider) {
      setError('Wallet provider not available (try reconnecting).')
      return
    }

    setLoading(true)
    try {
      const provider = new BrowserProvider(walletProvider)
      const net = await provider.getNetwork()
      const cid = Number(net.chainId)
      setChainId(cid)

      // Native AVAX balance
      const bal = await provider.getBalance(address)
      setNative(formatEther(bal))

      // WAVAX ERC20 balance (depends on network)
      const tokenAddr = (TOKENS as any)[cid]?.WAVAX
      if (!tokenAddr) {
        setWavax('')
        setWavaxSymbol('WAVAX')
        return
      }

      const signer = await provider.getSigner()
      const token = new Contract(tokenAddr, ERC20_ABI, signer)
      const [sym, dec, raw] = await Promise.all([token.symbol(), token.decimals(), token.balanceOf(address)])
      setWavaxSymbol(String(sym || 'WAVAX'))
      setWavax(formatUnits(raw, Number(dec)))
    } catch (e: any) {
      console.error(e)
      setError(e?.message || 'Failed to load balances')
    } finally {
      setLoading(false)
    }
  }, [isConnected, address, walletProvider])

  const switchToDefault = useCallback(async () => {
    setError(null)
    if (!walletProvider) return
    try {
      await trySwitchChain(walletProvider as any, desiredChainId)
      // provider emits chainChanged; but we also refresh
      await refreshBalances()
    } catch (e: any) {
      setError(e?.message || 'Failed to switch network')
    }
  }, [walletProvider, desiredChainId, refreshBalances])

  useEffect(() => {
    // Auto-refresh on connect
    refreshBalances()
  }, [refreshBalances])

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', py: 6 }}>
      <Container maxWidth="sm">
        <Stack spacing={2.25}>
          <Stack spacing={0.5}>
            <Typography variant="overline" sx={{ opacity: 0.85 }}>
              Boilerplate by Cheyne • InHaus Devs
            </Typography>
            <Typography variant="h4" fontWeight={900}>
              {APP_NAME}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Default network: <b>{CHAINS[DEFAULT_CHAIN_ID].name}</b>. Connect a wallet to view native AVAX + WAVAX.
            </Typography>
          </Stack>

          <Card elevation={0}>
            <CardContent>
              <Stack spacing={2}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems={{ sm: 'center' }}>
                  {!isConnected ? (
                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => open({ view: 'Connect', namespace: 'eip155' })}
                    >
                      Connect Wallet
                    </Button>
                  ) : (
                    <>
                      <Button variant="outlined" onClick={() => open({ view: 'Account' })}>
                        {shortAddr(address)}
                      </Button>
                      <Button color="inherit" onClick={() => disconnect()}>
                        Disconnect
                      </Button>
                    </>
                  )}

                  <Box sx={{ flex: 1 }} />

                  <Typography variant="body2" color="text.secondary">
                    Status: {status}
                  </Typography>
                </Stack>

                <Divider />

                {error && <Alert severity="error">{error}</Alert>}

                {wrongNetwork && (
                  <Alert
                    severity="warning"
                    action={
                      <Button color="inherit" size="small" onClick={switchToDefault}>
                        Switch
                      </Button>
                    }
                  >
                    You are on <b>{chainId}</b>. This app defaults to <b>{CHAINS[desiredChainId].name}</b>.
                  </Alert>
                )}

                <Stack direction="row" spacing={1} alignItems="center">
                  <Button variant="contained" disabled={!isConnected || loading} onClick={refreshBalances}>
                    Refresh
                  </Button>
                  {loading && <CircularProgress size={20} />}
                  <Box sx={{ flex: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    Chain: {chainId ?? '—'}
                  </Typography>
                </Stack>

                <Stack spacing={1}>
                  <Typography variant="h6">Balances</Typography>

                  <Stack direction="row" justifyContent="space-between">
                    <Typography color="text.secondary">Native (AVAX)</Typography>
                    <Typography fontFamily="monospace">{native ? `${native} AVAX` : '—'}</Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between">
                    <Typography color="text.secondary">Wrapped</Typography>
                    <Typography fontFamily="monospace">{wavax ? `${wavax} ${wavaxSymbol}` : '—'}</Typography>
                  </Stack>
                </Stack>

                <Typography variant="caption" color="text.secondary">
                  WAVAX contract: {wavaxAddress || '—'}
                </Typography>
              </Stack>
            </CardContent>
          </Card>

          <Typography variant="caption" color="text.secondary">
            Tip: set <code>VITE_REOWN_PROJECT_ID</code> in <code>.env</code> (copy from <code>.env.example</code>).
          </Typography>
        </Stack>
      </Container>
    </Box>
  )
}
