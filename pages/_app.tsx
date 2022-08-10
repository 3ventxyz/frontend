import '../styles/globals.css'
import Head from 'next/head'
import Header from '../components/header'
import Footer from '../components/footer'
import { AppProps } from 'next/app'
import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { publicProvider } from 'wagmi/providers/public'
import { AuthProvider, useAuth } from '../contexts/auth'
import Layout from '../components/layout'

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY

const { chains, provider } = configureChains(
  [chain.mainnet, chain.localhost, chain.rinkeby],
  [
    jsonRpcProvider({ rpc: () => ({ http: 'https://rpc.ankr.com/eth' }) }),
    publicProvider()
  ]
)

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors: connectors,
  provider: provider
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="h-screen w-screen">
      <Head>
        <title>3vent</title>
        <meta
          name="description"
          content="your web3 events and ticketing solution"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.svg" />
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`}
          async
        ></script>
      </Head>
      <AuthProvider>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </RainbowKitProvider>
        </WagmiConfig>
      </AuthProvider>
    </div>
  )
}

export default MyApp
