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
