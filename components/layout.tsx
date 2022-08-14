import Footer from './footer'
import Header from './header'

export default function Layout({ children }: { children: JSX.Element }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-grow pt-[78px]">{children}</main>
      <Footer />
    </div>
  )
}
