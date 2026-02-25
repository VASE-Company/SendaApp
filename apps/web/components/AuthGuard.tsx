"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseBrowser } from '../lib/supabase-browser';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function check() {
      if (!supabaseBrowser) {
        router.replace('/auth/login');
        return;
      }

      const { data } = await supabaseBrowser.auth.getSession();
      if (!mounted) return;

      if (!data.session) {
        router.replace('/auth/login');
        return;
      }

      setReady(true);
    }

    check();
    return () => {
      mounted = false;
    };
  }, [router]);

  if (!ready) return <main style={{ padding: 24, color: '#dbe7ff' }}>Verificando sesión...</main>;

  return <>{children}</>;
}
