# SendaApp

Base monorepo para Senda:

- `apps/mobile`: Expo React Native (mock navegable)
- `apps/web`: Next.js (dashboard simple)
- `packages/shared`: contratos TS + mock data + reglas chatbot

## Instalar

```bash
npm install
```

## Correr

```bash
npm run dev:mobile
npm run dev:web
```

## Calidad

```bash
npm run lint
npm run typecheck
```

## Regla chatbot bíblico

Solo se aceptan fuentes `jw.org` y `wol.jw.org`.
Si no hay evidencia verificable, la respuesta debe declarar el límite explícitamente.

## Vercel + Supabase (quick setup)

1. Crear proyecto en Supabase.
2. Ejecutar `supabase/schema.sql` en SQL Editor.
3. En `apps/web`, copiar `.env.example` a `.env.local` y completar variables.
4. En Vercel, crear proyecto apuntando a `apps/web` (Root Directory).
5. Cargar en Vercel estas variables de entorno:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
6. Deploy.

También podés seguir la guía detallada en `docs/deploy-vercel-supabase.md`.
