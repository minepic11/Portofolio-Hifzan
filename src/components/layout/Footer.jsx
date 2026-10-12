import { ArrowUp } from 'lucide-react'
import { personal } from '../../data/portfolio'

export default function Footer() {
  return (
    <footer className="site-footer container">
      <p>{personal.name}<span>© {new Date().getFullYear()}</span></p>
      <a href="#home">Kembali ke atas <ArrowUp size={17} aria-hidden="true" /></a>
    </footer>
  )
}
