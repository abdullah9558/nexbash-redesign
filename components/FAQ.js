'use client';

import { useState } from 'react';

export default function FAQ({ faq = [] }) {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq">
      <div className="eyebrow">FAQ</div>
      <h2>Questions you&apos;re probably asking</h2>
      <div className="faq">
        {faq.map((item, i) => (
          <div
            className={`faq-item${open === i ? ' open' : ''}`}
            key={item.q}
            onClick={() => setOpen(open === i ? null : i)}
          >
            <div className="faq-q">
              <span>{item.q}</span>
              <span className="plus">+</span>
            </div>
            <div className="faq-a">{item.a}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
