import { Navbar, Footer, BackToTop } from 'src/components'

const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative bg-white">
      <Navbar />
      <div className="min-h-screen">{children}</div>
      <Footer />
      <BackToTop />
    </div>
  )
}

export default MainLayout
