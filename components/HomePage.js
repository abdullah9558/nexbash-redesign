'use client';

import { useEffect, useState } from 'react';
import Nav, { API } from '@/components/Nav';
import Glow from '@/components/Glow';
import Hero from '@/components/Hero';
import Studios from '@/components/Studios';
import Projects, { Capabilities } from '@/components/Projects';
import Packages from '@/components/Packages';
import Industries from '@/components/Industries';
import Stories from '@/components/Stories';
import Process from '@/components/Process';
import FAQ from '@/components/FAQ';
import TrustedBy from '@/components/TrustedBy';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function HomePage({ initialData }) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    if (initialData) return;
    fetch(`${API}/api/site`)
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, [initialData]);

  if (!data) {
    return (
      <>
        <Glow />
        <Nav />
        <main style={{ padding: '160px 24px', textAlign: 'center' }}>Loading…</main>
      </>
    );
  }

  return (
    <>
      <Glow />
      <Nav />
      <Hero heroBar={data.heroBar} />
      <Studios studios={data.studios} />
      <Projects projects={data.projects} />
      <Packages packages={data.packages} />
      <Industries industries={data.industries} />
      <Capabilities capabilities={data.capabilities} />
      <Stories stories={data.stories} />
      <Process process={data.process} />
      <FAQ faq={data.faq} />
      <TrustedBy partners={data.partners} />
      <Contact />
      <Footer />
    </>
  );
}
