'use client';

import HeroExperience from '@/components/HeroExperience';

export default function Hero({ heroBar = [] }) {
  return (
    <section className="hero screen" id="top">
      <HeroExperience />

      <div className="hero-main hero-main-award">
        <div className="hero-copy hero-copy-award">
          <p className="hero-trust anim-fade">
            Trusted by organizations operating <strong>at scale</strong>
          </p>
          <div className="hero-text-award">
            <h1 className="anim-fade hero-title">
              <span className="hero-title-line">Turning complex data into</span>
              <span className="hero-title-line hero-title-muted">operational advantage</span>
            </h1>
            <p className="hero-sub anim-fade">
              Enterprise AI, geospatial, and software engineering for organizations managing critical
              infrastructure and large-scale operations.
            </p>
          </div>
          <div className="hero-row anim-fade">
            <a href="#contact" className="go go-pulse">
              Start a Project
            </a>
          </div>
        </div>
      </div>

      <div className="hero-bar">
        {heroBar.map((item, i) => (
          <article className="hero-bar-item" key={item.num} style={{ '--i': i }}>
            <span className="hero-bar-num">{item.num}</span>
            <div>
              <h5>{item.title}</h5>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
