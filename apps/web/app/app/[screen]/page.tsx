"use client";

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AuthGuard from '../../../components/AuthGuard';
import { supabaseBrowser } from '../../../lib/supabase-browser';

const order = ['dashboard', 'crisis', 'chat', 'tracking', 'accountability'] as const;

type Screen = (typeof order)[number];

type Habit = { id: string; label: string; done: boolean };
type Contact = { id: string; name: string; role: string };
type ChatMsg = { role: 'user' | 'assistant'; text: string };

const mapToFile: Record<Screen, string> = {
  dashboard: 'senda2.html',
  crisis: 'senda3.html',
  chat: 'senda4.html',
  tracking: 'senda5.html',
  accountability: 'senda6.html'
};

export default function AppScreenPage() {
  const router = useRouter();
  const params = useParams<{ screen: string }>();
  const screen = (params.screen || 'dashboard') as Screen;

  const [userId, setUserId] = useState<string | null>(null);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [newHabit, setNewHabit] = useState('');
  const [newContact, setNewContact] = useState('');
  const [newRole, setNewRole] = useState('Compañero');
  const [chatInput, setChatInput] = useState('');
  const [chat, setChat] = useState<ChatMsg[]>([]);
  const [status, setStatus] = useState('');

  if (!order.includes(screen)) {
    router.replace('/app/dashboard');
    return null;
  }

  const idx = order.indexOf(screen);
  const prev = idx > 0 ? order[idx - 1] : null;
  const next = idx < order.length - 1 ? order[idx + 1] : null;

  useEffect(() => {
    async function boot() {
      if (!supabaseBrowser) return;
      const { data } = await supabaseBrowser.auth.getUser();
      const uid = data.user?.id ?? null;
      setUserId(uid);
      if (!uid) return;

      const [{ data: h }, { data: c }] = await Promise.all([
        supabaseBrowser.from('habits').select('id,label,done').eq('user_id', uid).order('created_at', { ascending: false }),
        supabaseBrowser.from('accountability_contacts').select('id,name,role').eq('user_id', uid).order('created_at', { ascending: false })
      ]);
      setHabits((h ?? []) as Habit[]);
      setContacts((c ?? []) as Contact[]);
    }

    boot();
  }, []);

  const doneCount = useMemo(() => habits.filter((h) => h.done).length, [habits]);

  async function logout() {
    if (supabaseBrowser) await supabaseBrowser.auth.signOut();
    router.push('/auth/login');
  }

  async function addHabit() {
    if (!supabaseBrowser || !userId || !newHabit.trim()) return;
    const { data, error } = await supabaseBrowser
      .from('habits')
      .insert({ user_id: userId, label: newHabit.trim(), done: false })
      .select('id,label,done')
      .single();
    if (error) return setStatus(error.message);
    setHabits((prev) => [data as Habit, ...prev]);
    setNewHabit('');
  }

  async function toggleHabit(habit: Habit) {
    if (!supabaseBrowser) return;
    const { error } = await supabaseBrowser.from('habits').update({ done: !habit.done }).eq('id', habit.id);
    if (error) return setStatus(error.message);
    setHabits((prev) => prev.map((h) => (h.id === habit.id ? { ...h, done: !h.done } : h)));
  }

  async function addContact() {
    if (!supabaseBrowser || !userId || !newContact.trim()) return;
    const { data, error } = await supabaseBrowser
      .from('accountability_contacts')
      .insert({ user_id: userId, name: newContact.trim(), role: newRole })
      .select('id,name,role')
      .single();
    if (error) return setStatus(error.message);
    setContacts((prev) => [data as Contact, ...prev]);
    setNewContact('');
  }

  async function triggerCrisis() {
    if (!supabaseBrowser || !userId) return;
    const { error } = await supabaseBrowser.from('checkins').insert({
      user_id: userId,
      mood: 2,
      risk_level: 'high',
      notes: 'Modo crisis activado desde app'
    });
    if (error) return setStatus(error.message);
    setStatus('Modo crisis registrado ✅');
  }

  function sendChat() {
    if (!chatInput.trim()) return;
    const msg = chatInput.trim();
    setChat((c) => [...c, { role: 'user', text: msg }]);
    setChatInput('');

    const response = `Guía Senda: Respirá 90 segundos y leé un texto en jw.org o wol.jw.org relacionado con fortaleza y autocontrol. Después elegí una acción alternativa de 5 minutos.`;
    setTimeout(() => setChat((c) => [...c, { role: 'assistant', text: response }]), 250);
  }

  return (
    <AuthGuard>
      <main style={{ minHeight: '100vh', background: '#0b1118', color: '#e8f0ff', padding: 16 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <header style={{ border: '1px solid #2b3850', borderRadius: 14, background: '#121b2b', padding: '10px 12px', marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <strong>Senda / {screen}</strong>
            <div style={{ display: 'flex', gap: 8 }}>
              {prev ? <Link href={`/app/${prev}`} style={btn}>← Atrás</Link> : null}
              {next ? <Link href={`/app/${next}`} style={btnPrimary}>Continuar →</Link> : <Link href="/app/dashboard" style={btnPrimary}>Volver al inicio</Link>}
              <button onClick={logout} style={btn}>Salir</button>
            </div>
          </header>

          <iframe src={`/stitch/${mapToFile[screen]}`} title={screen} style={{ width: '100%', height: '62vh', border: 0, borderRadius: 12, background: '#fff' }} />

          <section style={{ marginTop: 12, border: '1px solid #2b3850', borderRadius: 12, background: '#101a2a', padding: 12 }}>
            {screen === 'dashboard' && (
              <div>
                <h3 style={{ marginTop: 0 }}>Funciones Dashboard</h3>
                <p>Hábitos completados: {doneCount}/{habits.length}</p>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input value={newHabit} onChange={(e) => setNewHabit(e.target.value)} placeholder="Nuevo hábito" style={input} />
                  <button onClick={addHabit} style={btnPrimary}>Agregar</button>
                </div>
              </div>
            )}

            {screen === 'crisis' && (
              <div>
                <h3 style={{ marginTop: 0 }}>Funciones Modo Crisis</h3>
                <button onClick={triggerCrisis} style={btnPrimary}>Activar y registrar crisis</button>
              </div>
            )}

            {screen === 'chat' && (
              <div>
                <h3 style={{ marginTop: 0 }}>Funciones Chat</h3>
                <div style={{ display: 'grid', gap: 6, marginBottom: 8 }}>
                  {chat.map((m, i) => (
                    <div key={i} style={{ ...bubble, background: m.role === 'user' ? '#203147' : '#17354a' }}>{m.text}</div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Escribí tu mensaje" style={input} />
                  <button onClick={sendChat} style={btnPrimary}>Enviar</button>
                </div>
              </div>
            )}

            {screen === 'tracking' && (
              <div>
                <h3 style={{ marginTop: 0 }}>Funciones Tracking</h3>
                <div style={{ display: 'grid', gap: 8 }}>
                  {habits.map((h) => (
                    <button key={h.id} onClick={() => toggleHabit(h)} style={{ ...btn, textAlign: 'left' }}>
                      {h.done ? '✅' : '⬜'} {h.label}
                    </button>
                  ))}
                  {!habits.length && <p style={{ opacity: 0.8, margin: 0 }}>Todavía no tenés hábitos cargados.</p>}
                </div>
              </div>
            )}

            {screen === 'accountability' && (
              <div>
                <h3 style={{ marginTop: 0 }}>Funciones Accountability</h3>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <input value={newContact} onChange={(e) => setNewContact(e.target.value)} placeholder="Nombre contacto" style={input} />
                  <input value={newRole} onChange={(e) => setNewRole(e.target.value)} placeholder="Rol" style={input} />
                  <button onClick={addContact} style={btnPrimary}>Agregar</button>
                </div>
                <ul>
                  {contacts.map((c) => <li key={c.id}>{c.name} — {c.role}</li>)}
                </ul>
              </div>
            )}

            <p style={{ color: '#9fc1d8', marginBottom: 0 }}>{status}</p>
          </section>
        </div>
      </main>
    </AuthGuard>
  );
}

const btn: React.CSSProperties = {
  border: '1px solid #33445f',
  background: '#0f1726',
  color: '#dbe7ff',
  borderRadius: 10,
  padding: '8px 10px',
  textDecoration: 'none',
  cursor: 'pointer'
};

const btnPrimary: React.CSSProperties = {
  ...btn,
  border: 'none',
  color: '#06131a',
  background: 'linear-gradient(90deg,#13c8ec,#8b5cf6)',
  fontWeight: 700
};

const input: React.CSSProperties = {
  ...btn,
  background: '#0f1726',
  minWidth: 180
};

const bubble: React.CSSProperties = {
  borderRadius: 10,
  padding: '8px 10px',
  border: '1px solid #335275'
};
