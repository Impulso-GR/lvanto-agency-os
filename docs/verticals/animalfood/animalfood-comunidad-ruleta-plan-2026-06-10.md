# Club AnimalFood (Comunidad) + Ruleta — Plan de la próxima fase

> **Estado:** PENDIENTE (backlog priorizado) · **Fecha:** 2026-06-10 · **Origen:** pedido de Roberto (juegos en el totem, ej. ruleta) + comunidad con registro Google.
> **Decisión de arquitectura (Lvanto):** la comunidad es una **app web separada** del Advisor, ambas comparten **la misma base de datos**. La ruleta vive **dentro de la comunidad** (el registro es el requisito para jugar); el totem la **promociona** vía QR. El Advisor queda como kiosko puro (sin auth, sin datos personales en el local).

---

## 1. Por qué así (resumen de la decisión)

- La ruleta sin registro = regalar descuentos sin base de datos. **El giro es el anzuelo del registro.**
- El premio (cupón) debe vivir en la cuenta de la persona → la cuenta vive en la comunidad.
- En el celular, la ruleta funciona también **fuera del local** (compartible por WhatsApp/IG → registros sin totem).
- El totem no maneja sesiones de usuarios (un kiosko con login de clientes = riesgo y fricción).
- Fase posterior (opcional, efecto wow): "girar EN el totem" emparejando teléfono↔totem por QR con token — requiere backend realtime; NO para v1.

## 2. Qué es el Club AnimalFood (v1)

**Una web** (`animalfood.com.ar/comunidad` o `comunidad.animalfood.com.ar` — requiere acceso al dominio; mientras tanto `club-animalfood.vercel.app`):

1. **Landing del Club**: qué gano por sumarme (beneficio mensual + ruleta + sorteos), branding negro+amarillo del Advisor.
2. **Registro con Google** (1 toque, sin formularios) + **consentimiento explícito** (Ley 25.326: checkbox, política de privacidad, baja fácil).
3. **Registrar la mascota** (el corazón de la base de datos): multiple choice estilo Advisor (especie, edad, porte, actividad) + **nombre + foto** 📸 + **línea de alimento que usa/prefiere** (elige de las 8 líneas reales).
4. **La Ruleta** 🎡: gira al registrarse (y luego según regla a definir) → premio = cupón en su cuenta.
5. **Mi cuenta**: mi mascota, mis cupones, **mi descuento mensual** en la línea elegida (1×/mes).
6. **Email mensual** con el cupón (fase: N8N + servicio de email).

## 3. La base de datos (lo que realmente quiere Roberto)

| Tabla | Campos clave |
|---|---|
| `users` | google_id, email, nombre, fecha alta, **consentimiento** (fecha/versión), localidad? |
| `pets` | user_id, nombre, especie, edad, porte, actividad, **foto**, línea preferida |
| `coupons` | user_id, tipo (mensual/ruleta), línea, valor, estado (emitido/canjeado/vencido), vencimiento |
| `spins` | user_id, fecha, premio — regla anti-abuso (1 por usuario/período) |
| `events` | origen del alta (totem/IG/WhatsApp) → mide qué canal trae registros |

→ Con esto: tablero de Roberto (cuántos socios, qué mascotas, qué líneas, qué canal funciona) + el sustento del email mensual.

## 4. Stack recomendado

- **Frontend:** app nueva `club-animalfood` (React + Vite + Tailwind, mismo design system del Advisor — se reusa la estética que Roberto ya aprobó).
- **Backend sin servidores propios: Supabase** → Auth con Google listo, Postgres, Storage para fotos, gratis para arrancar y escala. (Es la pieza "base de datos" pedida.)
- **Email:** Resend o Brevo + **N8N** para el cron mensual (como se planteó en la propuesta original).
- **Deploy:** Vercel (igual que el Advisor). Dominio definitivo cuando haya acceso a animalfood.com.ar.

## 5. Integración con el Advisor (totem)

1. El QR de la pantalla Club pasa a apuntar a la URL real del Club (hoy es placeholder).
2. Banner en el reposo: "🎡 Girá la ruleta y ganá — escaneá" (cuando la ruleta exista).
3. Parámetro de origen en el QR (`?src=totem-<local>`) → mide qué veterinaria genera más registros.

## 6. Definiciones que necesita Roberto ANTES de construir (bloqueantes)

- [ ] **Premios de la ruleta**: qué se gana (descuentos %, producto, merch), probabilidades, tope mensual de premios, quién los financia.
- [ ] **Regla de giro**: ¿solo al registrarse? ¿1 vez por mes? ¿1 por compra?
- [ ] **Descuento mensual**: monto/%, ¿sobre cualquier línea o la elegida?, ¿dónde se canjea (mostrador con código)?, quién lo financia (AnimalFood vs local).
- [ ] **Canje en mostrador**: ¿el vendedor valida el cupón cómo? (código simple v1 / app del local después).
- [ ] Acceso al dominio animalfood.com.ar (para la URL definitiva).
- [ ] Validación legal de bases y condiciones del juego + política de privacidad (Ley 25.326; los sorteos/juegos promocionales tienen requisitos propios).

## 7. Orden de construcción propuesto (cuando se apruebe la fase)

1. **Sprint 1 — Fundación:** Supabase (auth Google + tablas + storage) + landing del Club + registro + consentimiento.
2. **Sprint 2 — Mascota + cuenta:** alta de mascota (multiple choice + foto) + "mi cuenta" + cupón mensual manual.
3. **Sprint 3 — Ruleta:** juego con animación premium + reglas anti-abuso + cupones automáticos.
4. **Sprint 4 — Retención:** email mensual automatizado (N8N) + QR del totem con origen + métricas de canal.

> Nota comercial: esta fase corresponde al flujo "Comunidad" de la propuesta a Gustavo (etapa más valiosa y de más trabajo). Conviene presupuestarla/aprobarla como etapa propia.
