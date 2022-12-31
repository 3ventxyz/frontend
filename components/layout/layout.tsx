import Footer from './footer'
import Header from './header'

export default function Layout({ children }: { children: JSX.Element }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex min-h-[80vh] flex-grow pt-[78px]">{children}</main>
      <Footer />
    </div>
  )
}
