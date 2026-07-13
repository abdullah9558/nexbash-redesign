'use client';

export default function Hero({ heroBar = [] }) {
  return (
    <section className="hero" id="top">
      <div className="hero-bg" />
      <div className="hero-grid" />
      <div className="hero-content">
        <h1>Turning complex data into operational advantage</h1>
        <p className="sub">
          Enterprise AI, geospatial, and software engineering for organizations managing critical
          infrastructure and large-scale operations.
        </p>
        <div className="hero-ctas">
          <a href="#contact" className="btn">
            Start a Project
          </a>
          <a href="#projects" className="btn-outline">
            See Our Work
          </a>
        </div>
      </div>
      <div className="scroll-cue">
        <div className="dot" />
        Scroll
      </div>
      <div className="hero-bar">
        {heroBar.map((item) => (
          <div className="hero-bar-item" key={item.num}>
            <div className="hero-bar-num">{item.num}</div>
            <div>
              <h5>{item.title}</h5>
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
