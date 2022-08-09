import '../styles/globals.css'
import Head from 'next/head'
import { AppProps } from 'next/app'
import Layout from '../components/layout'
import { EventsProvider } from '../context/eventsContext'

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
      </Head>
      <Layout>
        <EventsProvider>
          <Component {...pageProps} />
        </EventsProvider>
      </Layout>
    </div>
  )
}

export default MyApp
