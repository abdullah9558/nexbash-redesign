'use client';

import { useEffect, useState } from 'react';

export default function Industries({ industries = [] }) {
  const [idx, setIdx] = useState(0);
  const [open, setOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  const total = industries.length;

  useEffect(() => {
    if (!total || paused) return undefined;

    const timer = setInterval(() => {
      setIdx((i) => (i + 1) % total);
    }, 2000);

    return () => clearInterval(timer);
  }, [total, paused]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  function go(dir) {
    if (!total) return;
    setIdx((i) => (i + dir + total) % total);
  }

  return (
    <>
      <section id="help">
        <div className="eyebrow">WHO WE HELP</div>
        <div className="studios-header">
          <div>
            <h2>Industries we serve</h2>
            <p className="sub">
              If your organization runs on complex data or critical operations, chances are we
              already work in your field.
            </p>
          </div>
          <button className="btn-outline" type="button" onClick={() => setOpen(true)}>
            View All
          </button>
        </div>

        <div
          className="ind-slideshow"
          id="indSlideshow"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <button className="car-btn ind-prev" type="button" onClick={() => go(-1)}>
            ‹
          </button>
          <div className="ind-slide-viewport">
            <div
              className="ind-slide-track"
              id="indSlideTrack"
              style={{ transform: `translateX(-${idx * 100}%)` }}
            >
              {industries.map((ind) => (
                <div
                  className={`ind-slide${ind.image ? ' has-bg' : ''}`}
                  key={ind.name}
                  style={ind.image ? { backgroundImage: `url("${ind.image}")` } : undefined}
                >
                  <div className="ind-slide-text">
                    <h4>{ind.name}</h4>
                    <p>{ind.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="car-btn ind-next" type="button" onClick={() => go(1)}>
            ›
          </button>
        </div>
        <div className="ind-dots" id="indDots">
          {industries.map((ind, i) => (
            <div
              className={`ind-dot${i === idx ? ' active' : ''}`}
              key={ind.name}
              onClick={() => setIdx(i)}
            />
          ))}
        </div>
      </section>

      <div
        className={`studios-modal${open ? ' open' : ''}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(false);
        }}
      >
        <div className="studios-modal-card">
          <button
            className="modal-close"
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
          >
            ×
          </button>
          <h3>All Industries We Serve</h3>
          <p className="sub" style={{ textAlign: 'left', margin: '8px 0 0', maxWidth: '100%' }}>
            Organizations across sectors rely on Nexbash for AI, geospatial, and software systems
            built for complex operations.
          </p>
          <div className="industries-modal-grid">
            {industries.map((ind) => (
              <div className="industries-modal-item" key={ind.name}>
                <div
                  className="industries-modal-thumb"
                  style={ind.image ? { backgroundImage: `url('${ind.image}')` } : undefined}
                />
                <h4>{ind.name}</h4>
                <p>{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
