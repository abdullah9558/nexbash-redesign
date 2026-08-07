'use client';

import { useEffect, useRef } from 'react';

export default function HeroExperience() {
  const experienceRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    const play = () => video.play().catch(() => {});
    const resume = () => {
      if (!document.hidden && video.paused) play();
    };
    play();
    video.addEventListener('canplay', play);
    document.addEventListener('visibilitychange', resume);
    return () => {
      video.removeEventListener('canplay', play);
      document.removeEventListener('visibilitychange', resume);
    };
  }, []);

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
      <video
        className="hero-experience-video"
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src="/assets/hero-bg-video.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
