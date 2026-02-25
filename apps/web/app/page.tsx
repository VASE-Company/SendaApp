"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import gsap from 'gsap';

export default function Home() {
  useEffect(() => {
    gsap.fromTo('.rb-fade-up', { y: 26, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.7, ease: 'power3.out' });
    gsap.fromTo('.rb-phone', { y: 30, scale: 0.97, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.15 });
    gsap.to('.rb-glow', { opacity: 0.8, scale: 1.08, yoyo: true, repeat: -1, duration: 2.2, ease: 'sine.inOut' });
  }, []);

  return (
    <main style={page}>
      <div style={desktopWrap}>
        <section style={leftCopy}>
          <p className="rb-fade-up" style={eyebrow}>SENDA · ONBOARDING</p>
          <h1 className="rb-fade-up" style={title}>Recuperá enfoque, paz y propósito.</h1>
          <p className="rb-fade-up" style={desc}>
            Un sistema diario para hábitos saludables, pureza digital y apoyo en momentos críticos.
          </p>
          <ul className="rb-fade-up" style={list}>
            <li>✓ Check-ins y rachas</li>
            <li>✓ Modo crisis en 1 toque</li>
            <li>✓ Accountability con persona de confianza</li>
          </ul>
        </section>

        <section className="rb-phone" style={phoneFrame}>
          <div className="rb-glow" style={glow} />
          <div style={statusBar}>
            <span>9:41</span>
            <span>•••</span>
          </div>

          <div style={heroImgWrap}>
            <Image src="/sendaapplogo.png" alt="Senda" width={180} height={180} style={{ borderRadius: 28 }} />
          </div>

          <h2 style={phoneTitle}>Bienvenido a Senda</h2>
          <p style={phoneDesc}>
            Tu compañero diario para fortalecer hábitos y mantener claridad cuando más la necesitás.
          </p>

          <div style={dots}>
            <span style={dotActive} />
            <span style={dot} />
            <span style={dot} />
          </div>

          <div style={{ marginTop: 'auto', display: 'grid', gap: 10 }}>
            <Link href="/auth/signup" style={btnPrimary}>Continuar</Link>
            <Link href="/auth/login" style={btnGhost}>Ya tengo cuenta</Link>
          </div>
        </section>
      </div>
    </main>
  );
}

const page: React.CSSProperties = {
  minHeight: '100vh',
  background: 'radial-gradient(circle at 20% -20%, #1f3f47 0%, #101f22 45%, #0d1619 100%)',
  color: '#e9f4f7',
  display: 'grid',
  placeItems: 'center',
  padding: 16,
  fontFamily: 'Inter, system-ui, sans-serif'
};
const desktopWrap: React.CSSProperties = {
  width: '100%',
  maxWidth: 1120,
  display: 'grid',
  gap: 28,
  gridTemplateColumns: '1fr minmax(320px,420px)',
  alignItems: 'center'
};
const leftCopy: React.CSSProperties = { display: 'grid', gap: 12 };
const eyebrow: React.CSSProperties = { margin: 0, letterSpacing: '0.12em', color: '#8ab4bf', fontSize: 12 };
const title: React.CSSProperties = { margin: 0, fontSize: 'clamp(1.8rem,4vw,3.1rem)', lineHeight: 1.02 };
const desc: React.CSSProperties = { margin: 0, color: '#b8d0d7', maxWidth: 560 };
const list: React.CSSProperties = { margin: 0, paddingLeft: 18, lineHeight: 1.8, color: '#c8dde3' };

const phoneFrame: React.CSSProperties = {
  position: 'relative',
  minHeight: 720,
  borderRadius: 30,
  border: '1px solid #2d4a51',
  background: 'linear-gradient(180deg,#13272b,#101f22)',
  boxShadow: '0 30px 60px rgba(0,0,0,.4)',
  padding: 18,
  display: 'grid',
  gap: 12,
  overflow: 'hidden'
};
const glow: React.CSSProperties = {
  position: 'absolute',
  width: 320,
  height: 320,
  borderRadius: '50%',
  background: 'radial-gradient(circle,#13c8ec55 0%, #8b5cf640 45%, transparent 70%)',
  top: -70,
  right: -90,
  opacity: 0.55,
  pointerEvents: 'none'
};
const statusBar: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#a8c3ca', zIndex: 1 };
const heroImgWrap: React.CSSProperties = {
  marginTop: 8,
  height: 240,
  borderRadius: 22,
  background: 'radial-gradient(circle at 60% 20%, rgba(19,200,236,.45), rgba(139,92,246,.2) 55%, rgba(255,255,255,0) 72%)',
  display: 'grid',
  placeItems: 'center',
  zIndex: 1
};
const phoneTitle: React.CSSProperties = { margin: 0, fontSize: 30, lineHeight: 1.03, zIndex: 1 };
const phoneDesc: React.CSSProperties = { margin: 0, color: '#b1ccd3', zIndex: 1 };
const dots: React.CSSProperties = { display: 'flex', gap: 8, marginTop: 4, zIndex: 1 };
const dot: React.CSSProperties = { width: 8, height: 8, borderRadius: 999, background: '#35575f' };
const dotActive: React.CSSProperties = { ...dot, background: '#13c8ec', width: 24 };

const btnPrimary: React.CSSProperties = {
  textDecoration: 'none',
  borderRadius: 12,
  border: 'none',
  padding: '12px 14px',
  textAlign: 'center',
  background: 'linear-gradient(90deg,#13c8ec,#8b5cf6)',
  color: '#06171b',
  fontWeight: 700,
  zIndex: 1
};
const btnGhost: React.CSSProperties = {
  textDecoration: 'none',
  borderRadius: 12,
  border: '1px solid #39545b',
  padding: '12px 14px',
  textAlign: 'center',
  color: '#cfe2e8',
  fontWeight: 600,
  zIndex: 1
};
