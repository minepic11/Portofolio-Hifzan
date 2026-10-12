import { education } from '../../data/portfolio'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

export default function Education() {
  return (
    <section id="education" className="section container education" aria-label="Pendidikan" tabIndex={-1}>
      <Reveal className="education-grid"><SectionHeading number="06" label="EDUCATION">Where it started.</SectionHeading><div className="education-info"><p className="education-period">{education.period}</p><h3>{education.institution}</h3><p>{education.major}</p></div></Reveal>
    </section>
  )
}
