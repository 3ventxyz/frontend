import '../styles/globals.css'
import { AppProps } from 'next/app'
import Script from 'next/script'
import Head from 'next/head'
import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { publicProvider } from 'wagmi/providers/public'
import { AuthProvider } from '../contexts/auth'
import { EventsProvider } from '../contexts/events'
import Layout from '../components/layout/layout'
import { NextPage } from 'next'
import { AuthGuard } from '../components/auth/authGuard'
import { UsersProvider } from '../contexts/users'

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

export type NextApplicationPage<P = any, IP = P> = NextPage<P, IP> & {
  requireAuth?: boolean
}

function MyApp(props: AppProps) {
  const {
    Component,
    pageProps
  }: { Component: NextApplicationPage; pageProps: any } = props
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
      </Head>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places`}
        async
      ></Script>

      <AuthProvider>
        <UsersProvider>
          <EventsProvider>
            <WagmiConfig client={wagmiClient}>
              <RainbowKitProvider chains={chains}>
                <Layout>
                  {/* if requireAuth property is present - protect the page */}
                  {Component.requireAuth ? (
                    <AuthGuard>
                      <Component {...pageProps} />
                    </AuthGuard>
                  ) : (
                    <Component {...pageProps} />
                  )}
                </Layout>
              </RainbowKitProvider>
            </WagmiConfig>
          </EventsProvider>
        </UsersProvider>
      </AuthProvider>
    </div>
  )
}

export default MyApp
