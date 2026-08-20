import { notFound, redirect } from 'next/navigation';
import { site } from '@/lib/detailContent';

export function generateStaticParams() { return site.capabilities.map((item) => ({ slug: item.id })); }
export default async function CapabilityPage({ params }) { const { slug } = await params; const item = site.capabilities.find((entry) => entry.id === slug); if (!item) notFound(); redirect(`/services/${item.serviceId || item.id}`); }
