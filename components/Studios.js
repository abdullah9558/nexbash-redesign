'use client';

import { useEffect, useRef, useState } from 'react';

export default function Studios({ studios = [] }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const idxRef = useRef(0);
  const timerRef = useRef(null);
  const total = studios.length;

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
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
  }, [total, studios]);

  const loop = [...studios, ...studios, ...studios];

  return (
    <>
      <section className="bg2" id="studios">
        <div className="eyebrow">STUDIOS</div>
        <div className="studios-header">
          <div>
            <h2>Pick where you need us</h2>
            <p className="sub">
              Each studio operates as a full delivery team — engineering, design, and domain
              expertise together.
            </p>
          </div>
          <button className="btn-outline" type="button" onClick={() => setOpen(true)}>
            View All
          </button>
        </div>
        <div className="carousel-wrap" id="studiosCarousel" ref={wrapRef}>
          <button className="car-btn car-prev" type="button">
            ‹
          </button>
          <div className="carousel-viewport">
            <div className="carousel-track" ref={trackRef}>
              {loop.map((s, i) => (
                <div className="sol-card car-item" data-studio={s.id} key={`${s.id}-${i}`}>
                  <div className="sol-card-body">
                    <h3>{s.title}</h3>
                    <div className="sol-tag">FOR</div>
                    <div className="sol-desc">{s.forText}</div>
                    <div className="sol-tag">SOLVES</div>
                    <div className="sol-desc">{s.solves}</div>
                    <hr className="div" />
                    <div className="sol-tag">INCLUDED</div>
                    <ul className="check">
                      {s.included.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <span className="pill">⏱ {s.timeline}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="car-btn car-next" type="button">
            ›
          </button>
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
          <h3>All Nexbash Studios</h3>
          <p className="sub" style={{ textAlign: 'left', margin: '8px 0 0', maxWidth: '100%' }}>
            A complete view of the studio capabilities we bring to complex product and operations
            work.
          </p>
          <div className="studios-modal-grid">
            {studios.map((s) => (
              <div className="studios-modal-item" key={s.id}>
                <div
                  className="studios-modal-thumb"
                  style={{ backgroundImage: `url('${s.image}')` }}
                />
                <h4>{s.title}</h4>
                <p>{s.modalDesc}</p>
                <ul>
                  {s.modalItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
