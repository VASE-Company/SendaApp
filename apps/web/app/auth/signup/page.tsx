"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { supabaseBrowser } from '../../../lib/supabase-browser';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    gsap.fromTo('.rb-auth', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out' });
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabaseBrowser) return setMsg('Falta configurar Supabase.');
    const { error } = await supabaseBrowser.auth.signUp({ email, password });
    if (error) return setMsg(error.message);
    router.push('/auth/login');
  }

  return (
    <main style={page}>
      <form onSubmit={onSubmit} style={card} className="rb-auth">
        <p style={eyebrow}>PASO 2/3</p>
        <h1 style={title}>Crear cuenta</h1>
        <p style={sub}>Usá tu email para comenzar el camino en Senda.</p>

        <label style={label}>Email</label>
        <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={input} placeholder="tu@email.com" />

        <label style={label}>Contraseña</label>
        <input required minLength={6} type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={input} placeholder="••••••••" />

        <button style={btnPrimary}>Continuar</button>
        <p style={{ color: '#ffb8b8', minHeight: 20, margin: 0 }}>{msg}</p>
        <Link href="/auth/login" style={link}>Ya tengo cuenta</Link>
      </form>
    </main>
  );
}

const page: React.CSSProperties = { minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#101f22', padding: 16, color: '#e9f4f7', fontFamily: 'Inter, system-ui' };
const card: React.CSSProperties = { width: 'min(420px,100%)', background: '#13282d', border: '1px solid #2f4b52', borderRadius: 18, padding: 20, display: 'grid', gap: 10 };
const eyebrow: React.CSSProperties = { margin: 0, fontSize: 12, color: '#8ab4bf', letterSpacing: '0.1em' };
const title: React.CSSProperties = { margin: 0, fontSize: 30 };
const sub: React.CSSProperties = { margin: 0, color: '#b5ced5' };
const label: React.CSSProperties = { fontSize: 13, color: '#bfd6dc', marginTop: 4 };
const input: React.CSSProperties = { background: '#0f1d21', border: '1px solid #34545c', borderRadius: 10, color: '#e9f4f7', padding: '11px 12px' };
const btnPrimary: React.CSSProperties = { marginTop: 8, border: 'none', borderRadius: 12, padding: '12px 14px', background: 'linear-gradient(90deg,#13c8ec,#8b5cf6)', color: '#07191e', fontWeight: 700 };
const link: React.CSSProperties = { color: '#9bd8ff', textDecoration: 'none', fontSize: 14 };
