import '../styles/globals.css'
import Head from 'next/head'
import Header from '../components/header'
import Footer from '../components/footer'

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
      <Header />
      <div className="pt-[78px]">
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  )
}

export default MyApp
