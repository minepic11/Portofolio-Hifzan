import { ArrowUpRight } from 'lucide-react'
import { projects } from '../../data/portfolio'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import InventoryPreview from './InventoryPreview'

function isExternalUrl(value) {
  if (!value) return false
  try { return ['https:', 'http:'].includes(new URL(value).protocol) } catch { return false }
}

export default function Projects() {
  return (
    <section id="projects" className="section container projects" aria-label="Proyek pilihan" tabIndex={-1}>
      <Reveal><div className="projects-heading"><SectionHeading number="03" label="SELECTED WORK">Things I've built.</SectionHeading><p>Belajar melalui praktik.<br />Membangun untuk kebutuhan nyata.</p></div></Reveal>
      {projects.map((project, index) => <Reveal key={project.id}><article className="project-grid">
        {project.image && project.imageType !== 'conceptual' ? <figure className="project-preview"><img src={project.image} alt={`Tampilan ${project.title}`} loading="lazy" width="960" height="720" /></figure> : <InventoryPreview />}
        <div className="project-info"><p className="project-index">PROJECT / {String(index + 1).padStart(2, '0')}</p><p className="project-category">{project.category}</p><h3>{project.title}</h3><p className="project-description">{project.description}</p><ul className="project-features">{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
          {project.technologies.length > 0 && <p className="project-technologies">{project.technologies.join(' · ')}</p>}
          <div className="project-credit"><span>{project.organization}</span><span>{project.date}</span></div>
          {[{ url: project.liveUrl, label: 'Buka proyek' }, { url: project.repositoryUrl, label: 'Lihat kode sumber' }].filter((link) => isExternalUrl(link.url)).map((link) => <a key={link.label} className="text-link" href={link.url} target="_blank" rel="noopener noreferrer">{link.label}<ArrowUpRight size={16} aria-hidden="true" /></a>)}
        </div>
      </article></Reveal>)}
    </section>
  )
}
