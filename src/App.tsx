import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navigation from './sections/Navigation'
import Hero from './sections/Hero'
import About from './sections/About'
import Services from './sections/Services'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.2,
      smoothWheel: true,
    })

    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.lagSmoothing(0)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div>
      <Navigation lenisRef={lenisRef} />
      <Hero lenisRef={lenisRef} />
      <About />
      <Services />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </div>
  )
}
