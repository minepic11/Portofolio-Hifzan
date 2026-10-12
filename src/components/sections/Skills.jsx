import { capabilities } from '../../data/portfolio'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

export default function Skills() {
  return (
    <section id="skills" className="section container skills" aria-label="Kemampuan" tabIndex={-1}>
      <Reveal><SectionHeading number="05" label="CAPABILITIES">What I work with.</SectionHeading></Reveal>
      <Reveal className="capability-grid">{capabilities.map((group, index) => <div key={group.title} className="capability"><span className="capability-number">0{index + 1}</span><h3>{group.title}</h3><ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul></div>)}</Reveal>
    </section>
  )
}
