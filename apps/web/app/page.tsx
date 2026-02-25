"use client";

import { useEffect, useState } from 'react';
import s from './page.module.css';

type DashboardPayload = {
  source: 'mock' | 'supabase';
  streakDays: number;
  checkin: { mood: number; risk_level: 'low' | 'medium' | 'high' };
};

const screens = [1, 2, 3, 4, 5, 6];

export default function Page() {
  const [data, setData] = useState<DashboardPayload | null>(null);

  useEffect(() => {
    fetch('/api/dashboard')
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData({ source: 'mock', streakDays: 0, checkin: { mood: 3, risk_level: 'medium' } }));

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add(s.visible)),
      { threshold: 0.12 }
    );

    document.querySelectorAll(`.${s.card}`).forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <main className={s.page}>
      <header className={s.header}>
        <h1>Senda · Stitch 1:1 base</h1>
        <p>
          Datos en vivo: {data?.source ?? '...'} · Racha: {data?.streakDays ?? '--'} · Riesgo: {data?.checkin.risk_level ?? '--'}
        </p>
      </header>

      <section className={s.stack}>
        {screens.map((n) => (
          <article key={n} className={s.card}>
            <div className={s.meta}>Pantalla {n}</div>
            <a href={`/stitch/${n}`} style={{ color: '#9bd8ff', textDecoration: 'none', fontWeight: 700 }}>
              Abrir como página independiente →
            </a>
            <iframe className={s.frame} src={`/stitch/senda${n}.html`} title={`Senda Stitch ${n}`} loading="lazy" />
          </article>
        ))}
      </section>
    </main>
  );
}
