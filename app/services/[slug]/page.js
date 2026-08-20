import { notFound } from 'next/navigation';
import DetailExperience from '@/components/DetailExperience';
import { serviceDetail, site } from '@/lib/detailContent';

export function generateStaticParams() { return site.studios.map((item) => ({ slug: item.id })); }
export async function generateMetadata({ params }) { const { slug } = await params; const data = serviceDetail(slug); return data ? { title: `${data.title} | Nexbash Systems`, description: data.intro } : {}; }
export default async function ServicePage({ params }) { const { slug } = await params; const data = serviceDetail(slug); if (!data) notFound(); return <DetailExperience data={data} />; }
