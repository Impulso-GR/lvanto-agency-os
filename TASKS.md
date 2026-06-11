# Tareas activas — Lvanto Agency OS

> Actualizado: 2026-06-10. Frente activo: **AnimalFood Advisor** (totem) + próxima fase **Club AnimalFood**.

## 🔥 En curso

- [ ] **Packaging del totem** (Gonzalo, Photoshop) — brief listo: `docs/verticals/animalfood/animalfood-advisor-packaging-brief-2026-06-10.md`. Roberto lo pidió explícitamente.
- [ ] **Animaciones de interfaz extra** (Gonzalo busca repos de referencia → Claude adapta).

## ⏳ Esperando assets / definiciones

- [ ] `guau.mp3` / `miau.mp3` → `animalfood-advisor/public/assets/sounds/` (cableados, suenan solos al dropearlos).
- [ ] **Tabla de recomendación oficial** (Roberto completa la plantilla `animalfood-advisor-recommendation-table-template-2026-06-09.md`) → reemplaza el mapeo provisorio.
- [ ] **Brand kit oficial** AnimalFood (HEX/Pantone + tipografía) → ajuste fino app + packaging.
- [ ] **Dieline de la caja** (proveedor China) + **URL del video tutorial** (para el QR del packaging).

## 📦 PRÓXIMA FASE — Club AnimalFood (comunidad + ruleta) — PENDIENTE DE APROBACIÓN

> Plan completo: `docs/verticals/animalfood/animalfood-comunidad-ruleta-plan-2026-06-10.md`
> Decisión tomada: **app separada** del Advisor, misma base de datos (Supabase). **La ruleta vive dentro de la comunidad** (girar requiere registro); el totem la promociona vía QR.

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
