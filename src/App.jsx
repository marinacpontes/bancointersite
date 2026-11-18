import { useCallback, useState } from 'react'
import Header from './components/sections/Header'
import Hero from './components/sections/Hero'
import Products from './components/sections/Products'
import Investments from './components/sections/Investments'
import Cards from './components/sections/Cards'
import Features from './components/sections/Features'
import About from './components/sections/About'
import CTA from './components/sections/CTA'
import Footer from './components/sections/Footer'
import DemoModal from './components/sections/DemoModal'

export default function App() {
  const [modal, setModal] = useState(false)
  const open = useCallback(() => setModal(true), [])
  const close = useCallback(() => setModal(false), [])

  return (
    <>
      <Header onLogin={open} />
      <main>
        <Hero onLogin={open} />
        <Products />
        <Investments />
        <Cards />
        <Features />
        <About />
        <CTA onOpen={open} />
      </main>
      <Footer />
      <DemoModal open={modal} onClose={close} />
    </>
  )
}
