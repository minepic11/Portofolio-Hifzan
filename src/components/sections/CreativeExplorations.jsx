import { useState } from 'react'
import { artworks, creativeExplorations } from '../../data/portfolio'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import ArtworkMedia from './ArtworkMedia'
import ModelArtwork from './ModelArtwork'

export default function CreativeExplorations() {
  const [activeModel, setActiveModel] = useState(null)

  return (
    <section
      id="playground"
      className="section creative-explorations"
      aria-labelledby="playground-title"
      tabIndex={-1}
    >
      <div className="container">
        <Reveal className="creative-heading">
          <SectionHeading number="04" label="CREATIVE EXPLORATIONS">
            <span id="playground-title">Beyond the screen.</span>
          </SectionHeading>
          <div className="creative-introduction">
            <p className="creative-subtitle">{creativeExplorations.subtitle}</p>
            <p>{creativeExplorations.description}</p>
          </div>
        </Reveal>

        {artworks.length === 0 ? (
          <div className="artwork-empty" role="status">
            <p className="eyebrow">GALERI BELUM TERISI</p>
            <h3>{creativeExplorations.emptyTitle}</h3>
            <p>{creativeExplorations.emptyDescription}</p>
          </div>
        ) : (
          <div className="artwork-gallery">
            {artworks.map((artwork) => (
              <figure key={artwork.id} className="artwork">
                {artwork.mediaType === 'model' && artwork.modelSrc ? (
                  <ModelArtwork
                    artwork={artwork}
                    active={activeModel === artwork.id}
                    onActivate={() => setActiveModel(artwork.id)}
                    onDeactivate={() => setActiveModel(null)}
                  />
                ) : <ArtworkMedia artwork={artwork} />}
                <figcaption className="artwork-caption">
                  <div>
                    {(artwork.title || artwork.fileName) && <h3>{artwork.title || artwork.fileName}</h3>}
                    {artwork.category && <p>{artwork.category}</p>}
                  </div>
                  {(artwork.year || artwork.software?.length > 0) && (
                    <div className="artwork-details">
                      {artwork.year && <p>{artwork.year}</p>}
                      {artwork.software?.length > 0 && <p>{artwork.software.join(' · ')}</p>}
                    </div>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
