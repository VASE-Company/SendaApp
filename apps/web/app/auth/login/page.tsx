"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { supabaseBrowser } from '../../../lib/supabase-browser';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabaseBrowser) {
      setMsg('Faltan variables de Supabase en el deploy.');
      return;
    }

    const { error } = await supabaseBrowser.auth.signInWithPassword({ email, password });
    if (error) {
      setMsg(error.message);
      return;
    }

    router.push('/app/dashboard');
  }

  return (
    <main style={wrap}>
      <form onSubmit={onSubmit} style={card}>
        <h1>Iniciar sesión</h1>
        <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={input} required />
        <input placeholder="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={input} required minLength={6} />
        <button style={primary}>Entrar</button>
        <p style={{ opacity: 0.8 }}>{msg}</p>
        <Link href="/auth/signup" style={link}>Crear cuenta</Link>
      </form>
    </main>
  );
}

const wrap: React.CSSProperties = { minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#0b1118', color: '#e8f0ff' };
const card: React.CSSProperties = { width: 360, background: '#121b2b', border: '1px solid #2a3953', borderRadius: 14, padding: 20, display: 'grid', gap: 10 };
const input: React.CSSProperties = { background: '#0f1726', border: '1px solid #33445f', borderRadius: 10, color: '#e8f0ff', padding: '10px 12px' };
const primary: React.CSSProperties = { border: 'none', borderRadius: 10, padding: '10px 12px', background: 'linear-gradient(90deg,#13c8ec,#8b5cf6)', color: '#06131a', fontWeight: 700 };
const link: React.CSSProperties = { color: '#9bd8ff', textDecoration: 'none', fontSize: 14 };
