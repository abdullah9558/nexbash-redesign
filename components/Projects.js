'use client';

import { useEffect } from 'react';

function useStackDepth(selector) {
  useEffect(() => {
    const cards = [...document.querySelectorAll(selector)];
    if (!cards.length) return;
    let ticking = false;

    function update() {
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) {
          card.style.transform = 'scale(1)';
          card.style.opacity = 1;
          return;
        }
        const cardRect = card.getBoundingClientRect();
        const nextRect = next.getBoundingClientRect();
        const overlap = Math.max(0, cardRect.bottom - nextRect.top);
        const progress = Math.min(overlap / 260, 1);
        card.style.transform = `scale(${1 - progress * 0.06})`;
        card.style.opacity = 1 - progress * 0.35;
      });
      ticking = false;
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => window.removeEventListener('scroll', onScroll);
  }, [selector]);
}

export default function Projects({ projects = [] }) {
  useStackDepth('.proj-card');

  return (
    <section id="projects">
      <div className="eyebrow">PREVIOUS PROJECTS</div>
      <h2>Case studies from the field</h2>
      <div className="proj-stack">
        {projects.map((p, i) => (
          <div
            className="proj-card"
            data-project={p.id}
            key={p.id}
            style={{ '--i': i, top: `calc(110px + ${i} * 14px)`, zIndex: i + 1 }}
          >
            <div className="proj-card-inner">
              <div className="proj-top" aria-hidden="true" />
              <div className="proj-body">
                <div className="proj-tag">{p.tag}</div>
                <h4>{p.title}</h4>
                <p>{p.desc}</p>
                <div className="proj-stats">
                  {p.stats.map((s) => (
                    <div className="proj-stat" key={s.label}>
                      <b>{s.value}</b>
                      <span>{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Capabilities({ capabilities = [] }) {
  useStackDepth('.cap-card');

  return (
    <section className="bg2" id="capabilities">
      <div className="eyebrow">CAPABILITIES SPOTLIGHT</div>
      <h2>What we build, and why it matters</h2>
      <div className="cap-stack">
        {capabilities.map((c, i) => (
          <div
            className="cap-card"
            data-cap={c.id}
            key={c.id}
            style={{ top: `calc(110px + ${i} * 14px)`, zIndex: i + 1 }}
          >
            <div className="cap-visual" aria-hidden="true" />
            <div className="cap-text">
              <div className="cap-name">{c.name}</div>
              <div className="cap-desc">{c.desc}</div>
            </div>
            <div className="cap-tag">{c.tag}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
