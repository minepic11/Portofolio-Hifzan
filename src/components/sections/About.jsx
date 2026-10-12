import { about } from '../../data/portfolio'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

export default function About() {
  return (
    <section id="about" className="section container about" aria-label="Tentang saya" tabIndex={-1}>
      <Reveal className="about-grid">
        <SectionHeading number="01" label="ABOUT">A little<br />about me.</SectionHeading>
        <div className="about-copy">
          {about.paragraphs.map((paragraph, index) => <p key={paragraph} className={index === 0 ? 'lead' : ''}>{paragraph}</p>)}
          <dl className="profile-details">
            {about.details.map(({ label, value }) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
          </dl>
        </div>
      </Reveal>
    </section>
  )
}
