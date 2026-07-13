'use client';

import { useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const useWhiteLogo = !scrolled || theme === 'dark';

  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <a href="#top" className="brand">
        <img
          src={useWhiteLogo ? '/assets/nexbash-logo-white.png' : '/assets/nexbash-logo.png'}
          alt="Nexbash Systems"
          className="brand-logo"
        />
      </a>
      <div className="navlinks">
        <a href="#studios">Studios</a>
        <a href="#packages">Packages</a>
        <a href="#process">Process</a>
        <a href="#projects">Projects</a>
        <a href="#help">Who We Help</a>
        <a href="#contact">Contact</a>
      </div>
      <div className="nav-actions">
        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
        >
          {theme === 'dark' ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
              <path
                d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M21 14.5A8.5 8.5 0 1 1 9.5 3a7 7 0 0 0 11.5 11.5z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
        <a href="#contact" className="btn">
          Get Started
        </a>
      </div>
    </nav>
  );
}

export { API };
