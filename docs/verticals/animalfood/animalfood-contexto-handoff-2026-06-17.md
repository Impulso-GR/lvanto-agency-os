# Contexto / Handoff — Proyecto AnimalFood (al 2026-06-17)

> **Para qué sirve este archivo:** bajarle todo el contexto a una sesión nueva de Claude (otra PC). Pegalo o referencialo al arrancar.
> **Estado en una línea:** propuesta del totem enviada a Roberto hoy 17/06 ~9 AM, esperando respuesta. En paralelo, Gonzalo quiere sumar esta experiencia como servicio en su landing page.

---

## 1. Quién es quién
- **Gonzalo** — dueño de **Lvanto** (agencia de marketing digital). No es programador senior; construye con IA y subcontrata dev puntual.
- **AnimalFood** — marca de alimento balanceado para mascotas (Argentina). Cliente de Lvanto hace +1 año (redes/contenido de ~9 marcas del grupo).
- **Roberto** — **dueño** de AnimalFood. Es el interlocutor de plata (histórico, directo). Le encantó el prototipo del totem. Es a quien se le envió la propuesta.
- **Gustavo** — maneja pagos/fee mensual. El mes pasado pagó ARS 1.8M (Gonzalo esperaba estar en 3M). La estrategia es hablar la plata con Roberto, no con Gustavo.
- **Aranza** — colaboradora; generó las fotos hero (perro/gato/tobi/duo).

## 2. Qué es el proyecto — "AnimalFood Advisor" (el totem)
Roberto despliega **100 tótems táctiles** (50" 4K, Android, en comodato) en 100 petshops/veterinarias. Lvanto desarrolla el **software + experiencia**: un "vendedor digital" llamado **Tobi** que asesora al cliente, recomienda la línea de alimento ideal y lo invita a una comunidad con beneficios.
- **Arquitectura clave:** motor de **reglas** (NO LLM en vivo) → costo $0 de tokens, sin riesgo de claims. "Parece IA" por la UX.
- **Objetivo real:** que el cliente se **suscriba al Programa AnimalFood** (descuento mensual) → **base de datos propia** de consumidores finales → genera demanda (que pidan la marca en el mostrador). Mismo mecanismo se replica en redes (retargeting/permanencia).

## 3. Estado actual (17/06/2026)
- ✅ **Prototipo navegable EN VIVO:** https://animalfood-advisor.vercel.app (Roberto lo vio y le encantó).
- ✅ Diseño de la **caja/packaging** ("ASISTENTE DIGITAL INTELIGENTE", negro+amarillo).
- ✅ **Propuesta comercial + Plan de trabajo** enviados a Roberto hoy.
- ⏳ **Esperando respuesta de Roberto** (enviado ~9 AM). NO hacer seguimiento hasta ~2-3 días hábiles; si no contesta, mandar nudge liviano (está en el guion).
- ❌ El totem NO está operativo/instalado todavía. Es diseño + prototipo. La propuesta NO debe decir "en vivo/aprobado".

## 4. La propuesta — estructura y números
**Documento:** `animalfood-propuesta-proximo-nivel-roberto-2026-06-16.html/.pdf`
Encuadre central: **"esto NO es un fee de redes — es una unidad de crecimiento"** (software + IA + captación + operación de flota + contenido + soporte). Evitar que se compare con una agencia de community.

**Línea 1 — Proyecto (inversión única, por fases, en USD):**
- Fase 1 Asistente: USD 7.500
- Fase 2 Comunidad + base de datos: USD 13.000 (la de mayor desarrollo)
- Fase 3 Retención (emails) + blog GEO/SEO: USD 4.500
- Subtotal USD 25.000 → **Bonificación cliente AnimalFood –15%** (–3.750) → **Total USD 21.250**
- Plazo: Fase 1 operativa en **40 días desde la aprobación**.

**Línea 2 — Fee mensual (ARS):** **$5.000.000/mes, todo incluido** (marketing + contenido diario x2 + reels + campañas + retargeting + GEO/SEO + operación de los 100 tótems: soporte <24h hábiles, actualizaciones, monitoreo, comunidad). El 3M no se nombra en el doc (es carta verbal).

**Incluye/No incluye:** No incluye hosting, APIs de IA, email, SaaS, pauta, viajes/instalación, honorarios legales/inscripción de bases, mantenimiento de hardware. (Se quitó "eventos con dron".)

**Control de marca:** sistema 100% operado por Lvanto; solo se muestra contenido del universo AnimalFood; el local puede subir un video propio, con **aprobación manual** de Lvanto.

**KPIs:** B2C (registros, costo por registrado, uso de cupón, recompra) + B2B (uptime, locales activos, incidencias <24h). Retorno real cuando AnimalFood comparta datos de venta.

**Datos/cumplimiento:** sistema preparado para Ley 25.326 / AAIP (consentimiento, baja de emails, bases y condiciones). Validación legal e inscripción de bases a cargo de AnimalFood (su abogado), no de Lvanto.

## 5. Respaldo de precio (negociación)
- Hardware que invirtió Roberto: estimado **~USD 250.000–350.000** (100 tótems nacionalizados). El software es **~7%** de eso (~USD 212/tótem).
- Mismo proyecto en **Accenture: USD 300.000–500.000+** (tarifa USD 150–900/h; ni tomarían algo <500k).
- Software de cartelería enlatado: **USD 12.000–60.000 por AÑO** para 100 pantallas (y hace mucho menos).
- App/MVP custom por agencia: USD 30–80k. Kiosko custom: USD 10–75k. Loyalty: USD 15–60k.
- **Conclusión: USD 21.250 está en el extremo eficiente de TODAS las referencias.** No está caro; si algo, corto.

## 6. Plan de trabajo (cómo se ejecuta)
**Documento:** `animalfood-plan-de-trabajo-roberto-2026-06-17.html/.pdf`
- Fase 1 Asistente: 6 semanas · Fase 2 Comunidad: 6 semanas · Fase 3 Retención: 4 semanas. Total ~4 meses, secuencial.
- Tiempo real estimado (Gonzalo + IA, dev puntual): Fase 1 ~3-4 sem, Fase 2 ~4-6 sem, Fase 3 ~2-3 sem. Contratar programador solo para: backend Fase 2 (Supabase, seguridad, cupones antifraude) + infra de actualización remota de flota.

## 7. Pendientes / dependencias (las define AnimalFood)
- Tabla/criterio de recomendación de productos (destraba Fase 1).
- Brand kit oficial (HEX/Pantone/tipografía).
- Acceso al dominio animalfood.com.ar (para /comunidad, Fase 2).
- Definición de premios/probabilidades de la ruleta + mecánica del descuento.
- Validación legal (abogado de ellos).
- Sonidos guau.mp3 / miau.mp3 (cableados, faltan los archivos).
- Un tótem físico para QA.

## 8. Archivos clave
- App (repo aparte): `C:\Proyecto Code\animalfood-advisor` — Vite + React + TS + Tailwind + Framer Motion. Deploy: Vercel (`animalfood-advisor.vercel.app`).
- Docs (este repo): `c:\Proyecto Code\VSCODE\docs\verticals\animalfood\`
  - Propuesta: `animalfood-propuesta-proximo-nivel-roberto-2026-06-16.html/.pdf`
  - Plan de trabajo: `animalfood-plan-de-trabajo-roberto-2026-06-17.html/.pdf`
  - Guion interno (NO enviar): `animalfood-guion-conversacion-roberto-2026-06-16.md`
  - Nota cámaras/biometría: `animalfood-advisor-nota-camara-biometria-roberto-2026-06-10...`
  - Imágenes: `assets/` (mockup-tienda, mockup-caja, mockup-app, mockup-ruleta)

## 9. Branding
- Negro `#0d0b09` / `#171310` · Amarillo marca **`#FFD21A`** · Crema `#F5F1EA`. Wordmark: **Animal** (blanco) + **food** (amarillo). (Naranja #E8631A NO es de AnimalFood, es de la línea Enercan.)
- Tono: premium, oscuro, cálido. Tipografía app: Plus Jakarta Sans.

---

## 10. 🆕 PARA LA LANDING PAGE DE LVANTO (lo nuevo a trabajar en la PC de escritorio)
Gonzalo quiere **mostrar esta experiencia como servicio** en su landing — "este tipo de servicio está disponible", se concrete o no con AnimalFood.

**Servicio a comunicar (nombres posibles):** "Experiencias digitales en punto de venta" / "Asistentes digitales (tótems inteligentes) para retail" / "Sistemas de captación y fidelización para marcas".

**Pitch del servicio (borrador):**
> Convertimos el punto de venta en una máquina de captación: tótems con un asistente que asesora al cliente, recomienda producto y lo suma a una comunidad con beneficios. Capturás consumidores finales, construís tu base de datos y generás demanda — que pidan tu marca en el mostrador.

**Cómo presentar el CASO AnimalFood (con cuidado de no sobre-prometer):**
- ✅ Decir: "Diseñamos **Tobi**, el Asistente Digital Inteligente de AnimalFood" / "asesor digital para 100 puntos de venta" / mostrar el prototipo y los mockups.
- ❌ NO decir "100 tótems instalados/funcionando en la calle" hasta que sea verdad (está aprobándose). Framing seguro: **proyecto/sistema diseñado**, **prototipo navegable**, **caso en desarrollo**.
- Visuales disponibles: mockup-app (4 pantallas), mockup-tienda, mockup-caja, mockup-ruleta, prototipo en vivo.

**Servicios de Lvanto para listar en la landing (próximo nivel):**
landing pages · web · social/contenido · campañas (Meta/Google/YouTube) · UGC · **automatizaciones e IA** · **experiencias digitales en PDV / tótems** · **comunidad y fidelización (loyalty)** · GEO (posicionamiento en IA) + SEO · contenido con dron.

**Ángulo diferencial de Gonzalo/Lvanto:** velocidad (del brief al prototipo en semanas), formación constante en IA, socio de growth (no proveedor de tareas sueltas).

---

### Próximo paso inmediato
1. Esperar respuesta de Roberto (sin presionar). Si no responde en 2-3 días hábiles → nudge del guion.
2. En la PC de escritorio: trabajar la landing con la sección 10 de este doc.
