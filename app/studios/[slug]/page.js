import { redirect } from 'next/navigation';
import { site } from '@/lib/detailContent';

export function generateStaticParams() { return site.studios.map((item) => ({ slug: item.id })); }
export default async function StudioPage({ params }) { const { slug } = await params; redirect(`/services/${slug}`); }
