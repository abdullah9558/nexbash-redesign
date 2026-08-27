'use client';

import Link from 'next/link';
import useDragScroll from '@/components/useDragScroll';

const HERO_SERVICE_THUMBNAILS = {
  gis: '/assets/service-thumbnails/gis.webp',
  'ai-ml': '/assets/service-thumbnails/ai-ml.webp',
  'web-mobile': '/assets/service-thumbnails/web-mobile.webp',
  'data-science': '/assets/service-thumbnails/data-science.webp',
  'cloud-devops': '/assets/service-thumbnails/cloud-devops.webp',
  blockchain: '/assets/service-thumbnails/blockchain.webp',
  'design-ux': '/assets/service-thumbnails/design-ux.webp',
  'qa-security': '/assets/service-thumbnails/qa-security.webp',
};

export default function Spectrum({ studios = [] }) {
  const { ref: railRef, didDrag } = useDragScroll();

  if (!studios.length) return null;

  return (
    <section className="band screen studio-services is-expanded" id="studios" data-reveal>
      <header className="band-head row-head">
        <div>
          <p className="kicker">Studios</p>
          <h2>Pick where you need us</h2>
          <p className="lede">Each studio is a full delivery team. Tune a band, or open the full rack.</p>
        </div>
      </header>
      <div className="studio-service-grid" ref={railRef}>
        {studios.map((studio) => (
          <Link
            className="studio-service-card"
            key={studio.id}
            href={`/services/${studio.id}`}
            onClick={(event) => {
              if (didDrag.current) {
                event.preventDefault();
                didDrag.current = false;
              }
            }}
          >
            <img
              src={HERO_SERVICE_THUMBNAILS[studio.id] || studio.image}
              alt=""
              loading="lazy"
              decoding="async"
              fetchPriority="low"
            />
            <div className="studio-service-shade" />
            <div className="studio-service-copy"><h3>{studio.title}</h3><p>{studio.modalDesc}</p></div>
          </Link>
        ))}
      </div>
    </section>
  );
}
