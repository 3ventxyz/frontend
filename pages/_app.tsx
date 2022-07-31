import '../styles/globals.css'
import Head from 'next/head'
import Header from '../components/header'
import Footer from '../components/footer'
import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { publicProvider } from 'wagmi/providers/public'

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

function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  return (
    <div className="h-screen w-screen">
      <Head>
        <title>3vent</title>
        <meta
          name="description"
          content="your web3 events and ticketing solution"
        />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.svg" />
        {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-25NZ8J2L82"
        ></script>
      </Head>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <Header />
          <div className="pt-[78px]">
            <Component {...pageProps} />
          </div>
          <Footer />
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  )
}

export default MyApp
