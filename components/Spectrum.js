'use client';

import Link from 'next/link';
import useDragScroll from '@/components/useDragScroll';

const HERO_SERVICE_THUMBNAILS = {
  gis: '/assets/service-thumbnails/gis.png',
  'ai-ml': '/assets/service-thumbnails/ai-ml.png',
  'web-mobile': '/assets/service-thumbnails/web-mobile.png',
  'data-science': '/assets/service-thumbnails/data-science.png',
  'cloud-devops': '/assets/service-thumbnails/cloud-devops.png',
  blockchain: '/assets/service-thumbnails/blockchain.png',
  'design-ux': '/assets/service-thumbnails/design-ux.png',
  'qa-security': '/assets/service-thumbnails/qa-security.png',
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
            <img src={HERO_SERVICE_THUMBNAILS[studio.id] || studio.image} alt="" />
            <div className="studio-service-shade" />
            <div className="studio-service-copy"><h3>{studio.title}</h3><p>{studio.modalDesc}</p></div>
          </Link>
        ))}
      </div>
    </section>
  );
}
