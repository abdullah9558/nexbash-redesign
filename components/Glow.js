'use client';

import { useEffect } from 'react';

export default function Glow() {
  useEffect(() => {
    const glow = document.getElementById('glow');
    if (!glow) return;
    const onMove = (e) => {
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
    };
    document.addEventListener('mousemove', onMove);
    return () => document.removeEventListener('mousemove', onMove);
  }, []);

  return <div id="glow" />;
}
