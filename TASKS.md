# Tareas activas — Lvanto Agency OS

> Actualizado: 2026-06-16. Frente activo: **AnimalFood Advisor** (totem) + próxima fase **Club AnimalFood** + **propuesta comercial Próximo Nivel**.

## 🔥 En curso

- [ ] **ENVIAR HOY (16/06) la propuesta "Próximo Nivel" a Roberto** — `docs/verticals/animalfood/animalfood-propuesta-proximo-nivel-roberto-2026-06-16.html/.pdf` + guion interno `animalfood-guion-conversacion-roberto-2026-06-16.md`. Plazo: Roberto dio ~10 días para el diseño de cajas. **Decisión: hablar DIRECTO con Roberto** 1:1 (dueño + canal histórico de plata). 2 líneas: (1) Proyecto Asistente por fases (dev USD, montos en blanco) + (2) fee marketing 1.8M→3M→4-5M con scope ampliado (todas las marcas, contenido diario 2 marcas+historias, reels semanales, campañas YouTube, tráfico, soporte/updates tótems, GEO+SEO+blog futuro). Extras a demanda (viajes/dron/IA otras áreas). **Falta: Gonzalo cierra los USD en blanco** + plantear el atraso 1.8 vs 3 con calma.
- [x] **Diseño de la caja** — DISEÑADO por Gonzalo (frente "ASISTENTE DIGITAL INTELIGENTE"; Roberto vio la caja y pidió lo del "asistente virtual"). ⚠️ El tótem NO está funcionando/aprobado: hay diseño de caja + PROTOTIPO navegable (vercel), aún sin presentar formalmente.
- [ ] **Animaciones de interfaz extra** (Gonzalo busca repos de referencia → Claude adapta). Incluye **animación al elegir perro/gato** (pizarra Roberto — evaluar video generado vs motion).

## ⏳ Esperando assets / definiciones

- [ ] `guau.mp3` / `miau.mp3` → `animalfood-advisor/public/assets/sounds/` (cableados, suenan solos al dropearlos).
- [ ] **Tabla de recomendación oficial** (Roberto completa la plantilla `animalfood-advisor-recommendation-table-template-2026-06-09.md`) → reemplaza el mapeo provisorio.
- [ ] **Brand kit oficial** AnimalFood (HEX/Pantone + tipografía) → ajuste fino app + packaging.
- [ ] **Dieline de la caja** (proveedor China) + **URL del video tutorial** (para el QR del packaging).

## 📦 PRÓXIMA FASE — Club AnimalFood (comunidad + ruleta) — PENDIENTE DE APROBACIÓN

> Plan completo: `docs/verticals/animalfood/animalfood-comunidad-ruleta-plan-2026-06-10.md`
> Decisión (Gonzalo): **ruleta TOTEM-FIRST** — gira en el totem (hype en el local), el premio se reclama registrándose vía QR; socios del Club giran además 1×/mes desde el celular. ✅ Ruleta del totem YA construida en el Advisor (premios provisorios, canje demo); falta backend real (Sprint Club).

- [ ] Definiciones de Roberto (bloqueantes): premios/probabilidades de la ruleta y quién financia · regla de giro · monto y mecánica del descuento mensual · canje en mostrador · acceso al dominio animalfood.com.ar · validación legal (Ley 25.326 + bases de juegos promocionales).
- [ ] Sprint 1: Supabase (Auth Google + DB + storage) + landing Club + registro + consentimiento.
- [ ] Sprint 2: registro de mascota (multiple choice + nombre + foto + línea preferida) + "mi cuenta" + cupón mensual.
- [ ] Sprint 3: **Ruleta** con animación premium + reglas anti-abuso + cupones automáticos.
- [ ] Sprint 4: email mensual automatizado (N8N) + QR del totem con origen por local + métricas de canal.

## 🗒️ Backlog Advisor (menores)

- [ ] Compartir cuenta/credenciales del canal de YouTube para el tutorial (Fase 1).
- [ ] Manual de instalación y cuidado: redactar contenido (Claude) → diagramar (Gonzalo).
- [ ] Guion del video tutorial del QR.
- [ ] Evaluar 21st.dev MCP cuando arranque la fase Club (componentes web).
- [ ] Sensor de presencia (piloto fase 2, según nota de cámaras — sin biometría).
