# Senda — Branding & Design Assets (2026-02-25)

## Estado general
- **Stitch:** intento realizado sobre proyecto existente en cuenta (`Modo Crisis y Auxilio`), prompt cargado y generación iniciada.
- **Google Whisk (logo):** no ejecutado por caída del servicio de browser automation antes de abrir la herramienta.
- **Google Flow (animación):** no ejecutado por la misma caída.
- **Bloqueo real:** `browser` quedó inaccesible con error de timeout del servicio OpenClaw browser control.

---

## 1) Stitch — pantallas extra para Senda

### Prompt usado (exacto)
```text
Diseñá para Senda una app mobile de bienestar y acompañamiento emocional con estética cálida y moderna. Generá 3 pantallas conectadas:
1) Inicio/marketing con propuesta de valor, social proof y CTA principal "Comenzar gratis".
2) Registro con opción email + Google, campo nombre, email, contraseña, checkbox términos y CTA "Crear cuenta".
3) Bienvenida post-registro con selección de objetivo inicial (ansiedad, hábitos, sueño, crisis) y botón "Continuar".
Usar copy en español rioplatense, jerarquía clara, alto contraste, y componentes reutilizables consistentes.
```

### Evidencias guardadas
- `design/stitch/stitch-home-2026-02-25.png` (captura del estado de Stitch en sesión previa a completar render)

### Resultado
- **En progreso al momento del fallo.** Se observó estado `Generando... (Estimated time 40 seconds)` y luego caída del controlador de navegador.

---

## 2) Google Whisk — logo de Senda

### Prompt listo para usar
```text
Create a modern, warm, minimalist logo for a digital wellbeing brand called "Senda".
Concept: guided path + emotional balance.
Visual metaphor: a soft curved path forming an abstract "S".
Style: flat vector, clean geometry, premium startup look.
Palette: deep indigo (#1E1B4B), aqua accent (#2DD4BF), optional warm lilac highlight (#A78BFA).
Variations: icon-only, horizontal lockup, stacked lockup.
Deliverables: transparent background, monochrome version, favicon-safe variant.
Avoid clichés (no hearts, no medical cross, no generic leaf).
```

### Alternativa (si Whisk no está disponible)
- Usar **Gemini/Imagen** o **OpenAI Images** con el mismo prompt y exportar:
  - SVG (si la plataforma lo permite)
  - PNG 2048x2048 (fondo transparente)
  - versión monocroma y favicon 512x512

### Estado
- **No ejecutado** por bloqueo técnico del browser control.

---

## 3) Google Flow — animación breve del logo

### Flujo/propuesta exacta (5–6 s)

**Escena 1 (0.0s–1.8s):**
- Fondo oscuro suave.
- Trazo luminoso dibuja una curva tipo sendero desde abajo-izquierda hacia centro.

**Escena 2 (1.8s–3.8s):**
- El trazo completa una forma abstracta de “S”.
- Aparece el isotipo sólido con easing suave.

**Escena 3 (3.8s–5.5s):**
- Fade-in del wordmark `Senda`.
- Glow muy leve al acento aqua, luego settle estático.

### Prompt listo para Flow (text-to-video / motion)
```text
Animate a minimalist brand reveal for "Senda" in 5.5 seconds.
Scene 1: a soft glowing line draws a curved path on a dark indigo background.
Scene 2: the path resolves into an abstract S-shaped icon, clean vector style.
Scene 3: the wordmark "Senda" fades in with subtle premium easing.
Color palette: indigo #1E1B4B, aqua #2DD4BF, subtle lilac #A78BFA.
Mood: calm, trustworthy, modern, emotionally supportive.
No particles overload, no flashy transitions, no lens flares.
Output: 1920x1080, 24fps, loop-friendly ending.
```

### Estado
- **No renderizado** por bloqueo técnico del browser control.

---

## 4) Próximo paso recomendado (cuando vuelva el browser)
1. Reabrir Stitch y confirmar salida final de las 3 pantallas.
2. Capturar 3 screenshots individuales:
   - `design/stitch/senda-screen-01-marketing.png`
   - `design/stitch/senda-screen-02-registro.png`
   - `design/stitch/senda-screen-03-bienvenida.png`
3. Ejecutar Whisk con prompt anterior y guardar variantes en `design/branding/`.
4. Ejecutar Flow y guardar preview/video export en `design/branding/`.

---

## Referencias rápidas
- Stitch: https://stitch.withgoogle.com
- Whisk: https://labs.google/fx/tools/whisk
- Flow: https://labs.google/fx/tools/flow
