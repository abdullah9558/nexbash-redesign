'use client';

import { useEffect, useRef, useState } from 'react';

export default function Stories({ stories = [] }) {
  const [viewAllOpen, setViewAllOpen] = useState(false);
  const [activeStory, setActiveStory] = useState(null);
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const idxRef = useRef(0);
  const timerRef = useRef(null);
  const total = stories.length;

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      setActiveStory((prev) => {
        if (prev) return null;
        setViewAllOpen(false);
        return null;
      });
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!total || !wrapRef.current || !trackRef.current) return;

    const wrap = wrapRef.current;
    const track = trackRef.current;
    const viewport = wrap.querySelector('.carousel-viewport');
    idxRef.current = total;

    function render(instant) {
      const cards = [...track.children];
      if (!cards.length) return;
      const cardWidth = cards[0].offsetWidth;
      const gap = parseFloat(getComputedStyle(track).gap) || 20;
      const offset =
        viewport.offsetWidth / 2 - cardWidth / 2 - idxRef.current * (cardWidth + gap);
      track.style.transition = instant ? 'none' : 'transform .5s ease';
      track.style.transform = `translateX(${offset}px)`;
      cards.forEach((c, i) => c.classList.toggle('active', i === idxRef.current));
    }

    function go(dir) {
      idxRef.current += dir;
      render();
      if (idxRef.current >= total * 2) {
        setTimeout(() => {
          idxRef.current -= total;
          render(true);
        }, 520);
      }
      if (idxRef.current < total) {
        setTimeout(() => {
          idxRef.current += total;
          render(true);
        }, 520);
      }
    }

    let delayTimer = null;

    function clearAuto() {
      clearTimeout(delayTimer);
      clearInterval(timerRef.current);
      delayTimer = null;
      timerRef.current = null;
    }

    function startAuto() {
      clearAuto();
      timerRef.current = setInterval(() => go(1), 2000);
    }

    function resumeAuto(delay = false) {
      clearAuto();
      if (delay) delayTimer = setTimeout(startAuto, 1200);
      else startAuto();
    }

    const prevBtn = wrap.querySelector('.car-prev');
    const nextBtn = wrap.querySelector('.car-next');
    const onPrev = () => {
      go(-1);
      resumeAuto(true);
    };
    const onNext = () => {
      go(1);
      resumeAuto(true);
    };
    const onEnter = () => clearAuto();
    const onLeave = () => resumeAuto(false);
    const onResize = () => render(true);

    prevBtn.addEventListener('click', onPrev);
    nextBtn.addEventListener('click', onNext);
    wrap.addEventListener('mouseenter', onEnter);
    wrap.addEventListener('mouseleave', onLeave);
    window.addEventListener('resize', onResize);

    const cards = [...track.children];
    const handlers = cards.map((c) => {
      const enter = () => {
        cards.forEach((x) => x.classList.remove('active'));
        c.classList.add('hovered');
      };
      const leave = () => {
        c.classList.remove('hovered');
        render(true);
      };
      c.addEventListener('mouseenter', enter);
      c.addEventListener('mouseleave', leave);
      return { c, enter, leave };
    });

    startAuto();
    render(true);

    return () => {
      clearAuto();
      prevBtn.removeEventListener('click', onPrev);
      nextBtn.removeEventListener('click', onNext);
      wrap.removeEventListener('mouseenter', onEnter);
      wrap.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', onResize);
      handlers.forEach(({ c, enter, leave }) => {
        c.removeEventListener('mouseenter', enter);
        c.removeEventListener('mouseleave', leave);
      });
    };
  }, [total, stories]);

  const openStory = (story) => {
    setActiveStory(story);
  };

  const loop = [...stories, ...stories, ...stories];

  return (
    <>
      <section id="stories">
        <div className="eyebrow">SUCCESS STORIES</div>
        <div className="studios-header">
          <div>
            <h2>Real problems, real solutions, real results</h2>
            <p className="sub">
              Real results from real clients. See how we have helped businesses transform their
              operations and achieve remarkable growth.
            </p>
          </div>
          <button className="btn-outline" type="button" onClick={() => setViewAllOpen(true)}>
            View All
          </button>
        </div>
        <div className="carousel-wrap" id="storiesCarousel" ref={wrapRef}>
          <button className="car-btn car-prev" type="button">
            ‹
          </button>
          <div className="carousel-viewport">
            <div className="carousel-track" ref={trackRef}>
              {loop.map((s, i) => (
                <button
                  type="button"
                  className="story car-item"
                  data-story={s.id}
                  key={`${s.id}-${i}`}
                  onClick={() => openStory(s)}
                >
                  <div className="story-body">
                    <div className="story-tag">{s.tag}</div>
                    <h3>{s.title}</h3>
                    <p>{s.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <button className="car-btn car-next" type="button">
            ›
          </button>
        </div>
      </section>

      <div
        className={`studios-modal${viewAllOpen ? ' open' : ''}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setViewAllOpen(false);
        }}
      >
        <div className="studios-modal-card">
          <button
            className="modal-close"
            type="button"
            aria-label="Close"
            onClick={() => setViewAllOpen(false)}
          >
            ×
          </button>
          <h3>All Success Stories</h3>
          <p className="sub" style={{ textAlign: 'left', margin: '8px 0 0', maxWidth: '100%' }}>
            Browse every case study. Click any story to open the full project detail.
          </p>
          <div className="studios-modal-grid">
            {stories.map((s) => (
              <button
                type="button"
                className="studios-modal-item story-modal-item"
                key={s.id}
                onClick={() => openStory(s)}
              >
                <div
                  className="studios-modal-thumb"
                  style={{ backgroundImage: `url('${s.image}')` }}
                />
                <h4>{s.title}</h4>
                <p>{s.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`studios-modal story-detail-modal${activeStory ? ' open' : ''}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setActiveStory(null);
        }}
      >
        {activeStory && (
          <div className="studios-modal-card story-detail-card">
            <button
              className="modal-close"
              type="button"
              aria-label="Close"
              onClick={() => setActiveStory(null)}
            >
              ×
            </button>

            <div
              className="story-detail-hero"
              style={{ backgroundImage: `url('${activeStory.image}')` }}
            />

            <div className="story-tag">{activeStory.tag}</div>
            <h3>{activeStory.title}</h3>
            <p className="story-detail-summary">{activeStory.description}</p>

            {activeStory.metrics?.length > 0 && (
              <div className="story-detail-metrics">
                {activeStory.metrics.map((m) => (
                  <div className="story-metric" key={`${m.value}-${m.label}`}>
                    <div className="story-metric-value">{m.value}</div>
                    <div className="story-metric-label">{m.label}</div>
                  </div>
                ))}
              </div>
            )}

            <div className="story-detail-meta">
              <div>
                <div className="story-meta-label">Industry</div>
                <div>{activeStory.industry}</div>
              </div>
              <div>
                <div className="story-meta-label">Duration</div>
                <div>{activeStory.duration}</div>
              </div>
            </div>

            <div className="story-detail-section">
              <h4>The Challenge</h4>
              <p>{activeStory.challenge}</p>
            </div>

            <div className="story-detail-section">
              <h4>The Solution</h4>
              <p>{activeStory.solution}</p>
            </div>

            {activeStory.implementation?.length > 0 && (
              <div className="story-detail-section">
                <h4>Implementation Approach</h4>
                <div className="story-impl-grid">
                  {activeStory.implementation.map((step, idx) => (
                    <div className="story-impl-item" key={step.title}>
                      <div className="story-impl-num">{idx + 1}</div>
                      <div>
                        <strong>{step.title}</strong>
                        <p>{step.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeStory.stack && Object.keys(activeStory.stack).length > 0 && (
              <div className="story-detail-section">
                <h4>Technical Stack</h4>
                <div className="story-stack-grid">
                  {Object.entries(activeStory.stack).map(([group, items]) => (
                    <div className="story-stack-group" key={group}>
                      <div className="story-meta-label">{group}</div>
                      <div className="story-stack-chips">
                        {items.map((item) => (
                          <span key={item}>{item}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeStory.achievements?.length > 0 && (
              <div className="story-detail-section">
                <h4>Key Achievements</h4>
                <ul className="story-achievements">
                  {activeStory.achievements.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
