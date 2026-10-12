import { ArrowDown, ArrowUpRight } from "lucide-react";
import { personal } from "../../data/portfolio";
import Reveal from "../ui/Reveal";

export default function Hero() {
  return (
    <section
      id="home"
      className="hero container"
      aria-labelledby="hero-title"
      tabIndex={-1}
    >
      <div className="hero-intro">
        <Reveal hero>
          <p className="eyebrow">HELLO, I'M HIFZAN</p>
        </Reveal>
        <p className="hero-role">
          Web Development
          <br />& Digital Operations
        </p>
      </div>
      <div className="hero-main">
        <Reveal hero delay={0.1}>
          <h1 id="hero-title">
            <span>Building</span>
            <span>
              <em>useful</em> digital
            </span>
            <span>experiences.</span>
          </h1>
        </Reveal>
        <Reveal hero delay={0.2} className="hero-art">
          <figure>
            <div className="hero-portrait-frame">
              <img
                src={`${import.meta.env.BASE_URL}Hifzan.jpg`}
                alt={`Foto potret ${personal.name}`}
                className="hero-portrait"
                width="354"
                height="472"
                decoding="async"
              />
            </div>
            <figcaption className="art-signature">
              {personal.name}
            </figcaption>
          </figure>
        </Reveal>
      </div>
      <div className="hero-bottom">
        <Reveal
          hero
          delay={0.3}
          className="hero-actions flex flex-wrap items-center gap-6"
        >
          <a href="#projects" className="button-primary">
            Lihat Proyek <ArrowDown size={18} aria-hidden="true" />
          </a>
          <a href="#contact" className="text-link">
            Hubungi Saya <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </Reveal>
        <Reveal hero delay={0.25}>
          <p className="hero-description">{personal.introduction}</p>
        </Reveal>
      </div>
      <div className="hero-meta">
        <p>BASED IN BANDUNG, INDONESIA</p>
        <span>Desain yang teliti. Solusi yang praktis.</span>
        <a href="#about" aria-label="Scroll ke bagian About">
          <ArrowDown size={18} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
