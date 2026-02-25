"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import s from './page.module.css';

type DashboardPayload = {
  source: 'mock' | 'supabase';
  habits: { id: string; label: string; done: boolean }[];
  checkin: { mood: number; risk_level: 'low' | 'medium' | 'high' };
  tracking: { cleanDays: number; relapses: number; criticalHours: string[] };
  contacts: { id: string; name: string; role: string }[];
  summary: string;
  streakDays: number;
};

export default function Page() {
  const [data, setData] = useState<DashboardPayload | null>(null);

  useEffect(() => {
    fetch('/api/dashboard')
      .then((r) => r.json())
      .then(setData)
      .catch(() =>
        setData({
          source: 'mock',
          habits: [],
          checkin: { mood: 3, risk_level: 'medium' },
          tracking: { cleanDays: 12, relapses: 1, criticalHours: ['23:00', '00:00'] },
          contacts: [],
          summary: 'Sin datos aún',
          streakDays: 12
        })
      );

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add(s.visible);
        });
      },
      { threshold: 0.16 }
    );

    document.querySelectorAll(`.${s.screen}`).forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  if (!data) {
    return <main className={s.page} style={{ padding: 24 }}>Cargando diseño Stitch…</main>;
  }

  return (
    <main className={s.page}>
      <section className={s.hero}>
        <div className={s.brand}>
          <Image src="/sendaapplogo.png" alt="Senda" width={58} height={58} className={s.logo} />
          <div>
            <h1 className={s.headline}>Senda · Diseño base Stitch + funcional</h1>
            <p className={s.sub}>Fuente: {data.source === 'supabase' ? 'Supabase (live)' : 'Mock local'}</p>
          </div>
        </div>
      </section>

      <section className={s.stack}>
        <article className={s.screen}>
          <h2 className={s.sectionTitle}>01 — Onboarding Bienvenida</h2>
          <div className={s.grid}>
            <div className={s.card}><p className={s.k}>Objetivo</p><p className={s.v}>Pureza digital</p></div>
            <div className={s.card}><p className={s.k}>Progreso inicial</p><p className={s.v}>{data.streakDays} días</p></div>
            <div className={s.card}><p className={s.k}>Estado</p><p className={s.v}>Listo para empezar</p></div>
          </div>
        </article>

        <article className={s.screen}>
          <h2 className={s.sectionTitle}>02 — Dashboard Hoy</h2>
          <div className={s.grid}>
            <div className={s.card}><p className={s.k}>Riesgo</p><p className={s.v}>{data.checkin.risk_level.toUpperCase()}</p></div>
            <div className={s.card}><p className={s.k}>Check-in</p><p className={s.v}>{data.checkin.mood}/5</p></div>
            <div className={s.card}><p className={s.k}>Días limpios</p><p className={s.v}>{data.tracking.cleanDays}</p></div>
          </div>
        </article>

        <article className={s.screen}>
          <h2 className={s.sectionTitle}>03 — Modo Crisis y Auxilio</h2>
          <div className={s.list}>
            <div className={s.row}><span>Respiración guiada</span><strong>90s</strong></div>
            <div className={s.row}><span>Texto bíblico</span><strong>Contextual</strong></div>
            <div className={s.row}><span>Acción inmediata</span><strong>5 min</strong></div>
          </div>
          <button className={s.cta}>Activar modo crisis</button>
        </article>

        <article className={s.screen}>
          <h2 className={s.sectionTitle}>04 — Chat Bíblico Contextual</h2>
          <div className={`${s.chatBubble} ${s.user}`}>Me siento tentado ahora.</div>
          <div className={s.chatBubble}>Respirá 90 segundos. Luego leé Juan 8:32 y hacé una acción alternativa.</div>
          <div className={s.chatBubble}>Fuente permitida: jw.org / wol.jw.org</div>
        </article>

        <article className={s.screen}>
          <h2 className={s.sectionTitle}>05 — Tracking de Hábitos y Rachas</h2>
          <div className={s.progressWrap}><div className={s.progressFill} /></div>
          <div className={s.list} style={{ marginTop: 10 }}>
            {data.habits.map((h) => (
              <div key={h.id} className={s.row}>
                <span>{h.label}</span>
                <strong className={h.done ? s.ok : s.pending}>{h.done ? 'Completado' : 'Pendiente'}</strong>
              </div>
            ))}
          </div>
        </article>

        <article className={s.screen}>
          <h2 className={s.sectionTitle}>06 — Panel de Accountability</h2>
          <div className={s.grid}>
            {data.contacts.length ? data.contacts.map((c) => (
              <div key={c.id} className={s.card}>
                <p className={s.v} style={{ marginTop: 0 }}>{c.name}</p>
                <p className={s.k}>{c.role}</p>
              </div>
            )) : <p>Sin contactos cargados.</p>}
          </div>
          <p className={s.sub} style={{ marginTop: 12 }}>Resumen: {data.summary}</p>
        </article>
      </section>
    </main>
  );
}
