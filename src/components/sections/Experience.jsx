import { experiences } from '../../data/portfolio'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

export default function Experience() {
  return (
    <section id="experience" className="experience section" aria-label="Pengalaman" tabIndex={-1}>
      <div className="container">
        <Reveal><SectionHeading number="02" label="EXPERIENCE">Where I've contributed.</SectionHeading></Reveal>
        {experiences.map((experience) => (
          <Reveal key={experience.id}>
            <article className="experience-grid">
              <div className="experience-date"><p>{experience.period}</p><span className="eyebrow">{experience.type}</span></div>
              <div className="experience-role"><h3>{experience.position}</h3><p>{experience.company}</p></div>
              <ul className="responsibility-list">{experience.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
