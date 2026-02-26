import fs from 'node:fs/promises';
import path from 'node:path';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const pages = [
  { slug: 'home', file: 'editorial-home-hero.html', title: 'Home Hero' },
  { slug: 'gallery', file: 'curated-portfolio-grid.html', title: 'Portfolio Grid' },
  { slug: 'project', file: 'project-story-detail.html', title: 'Project Detail' },
  { slug: 'about', file: 'magazine-style-about.html', title: 'About' },
  { slug: 'services', file: 'sophisticated-services-list.html', title: 'Services' },
  { slug: 'booking', file: 'minimalist-booking-flow.html', title: 'Booking' }
] as const;

function getNeighbors(slug: string) {
  const idx = pages.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? pages[idx - 1] : null,
    next: idx < pages.length - 1 ? pages[idx + 1] : null
  };
}

export default async function PortfolioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = pages.find((p) => p.slug === slug);
  if (!page) return notFound();

  const htmlPath = path.join(process.cwd(), 'stitch-export', page.file);
  const html = await fs.readFile(htmlPath, 'utf8');

  const { prev, next } = getNeighbors(slug);

  return (
    <main style={{ minHeight: '100vh', background: '#0b0d10', color: '#f3f4f6', padding: 16 }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 8,
            border: '1px solid #272a30',
            borderRadius: 12,
            padding: '10px 12px',
            marginBottom: 12,
            background: '#12151b'
          }}
        >
          <strong>Senda Portfolio · {page.title}</strong>
          <div style={{ display: 'flex', gap: 8 }}>
            <Link href="/portfolio/home" style={btn}>Inicio</Link>
            {prev ? <Link href={`/portfolio/${prev.slug}`} style={btn}>← {prev.title}</Link> : null}
            {next ? <Link href={`/portfolio/${next.slug}`} style={btnPrimary}>{next.title} →</Link> : null}
          </div>
        </header>

        <section style={{ border: '1px solid #2a2f37', borderRadius: 14, overflow: 'hidden', background: '#fff' }}>
          <div
            style={{
              width: '100%',
              minHeight: '86vh',
              animation: 'fadeIn .45s ease-out'
            }}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </section>
      </div>
    </main>
  );
}

const btn: React.CSSProperties = {
  textDecoration: 'none',
  color: '#e5e7eb',
  border: '1px solid #3b404b',
  borderRadius: 10,
  padding: '8px 10px'
};

const btnPrimary: React.CSSProperties = {
  ...btn,
  background: '#e5e7eb',
  color: '#0b0d10',
  borderColor: '#e5e7eb',
  fontWeight: 700
};
