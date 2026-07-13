'use client';

export default function TrustedBy({ partners = [] }) {
  const logos = [...partners, ...partners];

  return (
    <section id="trusted-by">
      <div className="eyebrow">TRUSTED BY</div>
      <div className="marquee">
        <div className="marquee-track" id="logoTrack">
          {logos.map((p, i) => (
            <div className="logo-badge" key={`${p.alt}-${i}`}>
              <img src={p.src} alt={p.alt} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
