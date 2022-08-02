import '../styles/globals.css'
import Head from 'next/head'
import Header from '../components/header'
import Footer from '../components/footer'
import { AppProps } from 'next/app'

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
      <Header />
      <div className="pt-[78px]">
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  )
}

export default MyApp
