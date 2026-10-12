import { ArrowUpRight } from 'lucide-react'
import { personal } from '../../data/portfolio'
import Reveal from '../ui/Reveal'
import Footer from '../layout/Footer'

export default function Contact() {
  return (
    <section id="contact" className="contact" aria-labelledby="contact-title" tabIndex={-1}>
      <div className="container contact-content">
        <Reveal><p className="eyebrow">07 / CONTACT</p><h2 id="contact-title">Have something<br />in mind?<br /><span>Let's connect.</span></h2></Reveal>
        <Reveal className="contact-bottom"><p>{personal.contactDescription}</p><div className="contact-links"><a href={`mailto:${personal.email}`} className="contact-primary">Say Hello <ArrowUpRight aria-hidden="true" /><span>{personal.email}</span></a><a href={personal.whatsappUrl} target="_blank" rel="noopener noreferrer" className="contact-whatsapp">Chat via WhatsApp <ArrowUpRight size={18} aria-hidden="true" /><span>{personal.whatsapp}</span></a></div></Reveal>
      </div>
      <Footer />
    </section>
  )
}
