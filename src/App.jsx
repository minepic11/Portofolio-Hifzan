import { LazyMotion, MotionConfig, domAnimation } from 'motion/react'
import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Experience from './components/sections/Experience'
import Projects from './components/sections/Projects'
import CreativeExplorations from './components/sections/CreativeExplorations'
import Skills from './components/sections/Skills'
import Education from './components/sections/Education'
import Contact from './components/sections/Contact'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        <a href="#main-content" className="skip-link">Langsung ke konten</a>
        <Navbar />
        <main id="main-content" tabIndex={-1}>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <CreativeExplorations />
          <Skills />
          <Education />
          <Contact />
        </main>
      </LazyMotion>
    </MotionConfig>
  )
}
