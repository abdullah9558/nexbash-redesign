'use client';

import { useRef } from 'react';
import HeroWorld from '@/components/HeroWorld';

export default function HeroExperience() {
  const experienceRef = useRef(null);

  const onPointerMove = (event) => {
    const node = experienceRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty('--experience-x', `${((event.clientX - rect.left) / rect.width - 0.5) * 18}px`);
    node.style.setProperty('--experience-y', `${((event.clientY - rect.top) / rect.height - 0.5) * 12}px`);
  };

  const resetPointer = () => {
    const node = experienceRef.current;
    if (!node) return;
    node.style.setProperty('--experience-x', '0px');
    node.style.setProperty('--experience-y', '0px');
  };

  return (
    <div
      className="hero-experience"
      ref={experienceRef}
      onPointerMove={onPointerMove}
      onPointerLeave={resetPointer}
      aria-label="Interactive Nexbash global technology experience"
    >
      <img
        className="hero-experience-video"
        src="/assets/hero-bg-minimal.png"
        alt=""
        aria-hidden="true"
      />
      <div className="hero-experience-globe">
        <HeroWorld />
      </div>
    </div>
  );
}
