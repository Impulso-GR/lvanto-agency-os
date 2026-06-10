# AnimalFood Smart Seller — Investigación + Plan del Proyecto

> **Estado:** Investigación / Planificación · **Fecha:** 2026-06-09 · **Preparado por:** Lvanto (Gonzalo)
> **Propósito:** consolidar TODA la investigación y las decisiones del proyecto de totems + comunidad antes de producir los dos entregables urgentes: **(1) diseño del packaging (9 días → ~2026-06-18)** y **(2) propuesta del proyecto por etapas**.
> **Regla de lectura:** dato confirmado vs. hipótesis/pendiente están separados y etiquetados. No construye nada del proyecto; ordena la investigación.

---

## 0. Resumen ejecutivo

Roberto (AnimalFood) trae **100 totems táctiles desde China** y los entrega **en comodato** a sus **100 mejores petshops / veterinarias**. Lvanto (Gonzalo) provee **software + contenido + estrategia + diseño** (no vende hardware). El proyecto tiene dos piezas conectadas:

1. **El Totem** — pantalla táctil en el local: modo reposo (reels + placas con la promo del local) → cuestionario sobre la mascota → veredicto de qué línea AnimalFood conviene → invitación a la comunidad por QR.
2. **La Comunidad** — sección web (`animalfood.com.ar/comunidad`): alta con cuenta de Google, base de datos propia, voucher de descuento mensual, email marketing automatizado.

**Lo urgente (9 días):** diseñar el **packaging** que se imprime en China + enviar junto a él la **propuesta del proyecto**.

---

## 1. Hardware confirmado (modelo exacto de Roberto)

Fabricante: **LETINE** (Shenzhen, China · letine.com · 19 años · clientes Walmart/Samsung/Disney/McDonald's). Modelo solicitado:

| Spec | Valor confirmado |
|---|---|
| Tipo | Señalización digital interior de pie, 50" vertical |
| Resolución | **4K (3840×2160)** |
| Touch | **Táctil por infrarrojos (IR)** ✅ |
| Procesador | RK3568 |
| Memoria | **2GB RAM + 32GB almacenamiento** |
| Sistema operativo | **Android 11.0** |
| Parlantes | **Sí — 2 × 8Ω 5W** ✅ (hay audio) |
| Conectividad | WiFi + Ethernet RJ45 (3G/4G opcional) |
| Packaging | **1920 × 205 × 805 mm · 50 kg** (caja alta, angosta, pesada) |
| CMS en la nube | **Letine Cloud Management System** incluido (subir/programar video e imágenes remoto) |
| Garantía | 3 años estándar (5 opcional) · reemplazo anticipado |
| Servicio fábrica | "Testing & Custom Configuration": pueden pre-configurar modo kiosko, URL de arranque, orientación y red antes de despachar |

**Salvedad técnica (hipótesis a validar con fábrica):** 4K sobre RK3568 + 2GB RAM es exigente. El **video 4K corre bien** (decodificación por hardware), pero una **interfaz web pesada a 4K puede ir lenta** → regla de diseño: app liviana, lógica dura en la nube. Pedir a Letine confirmación de fluidez de una web app a esa resolución.

---

## 2. Requisitos confirmados por Roberto

- **100 totems** a sus **100 mejores clientes** (petshops / veterinarias).
- Equipos **en COMODATO** (propiedad sigue siendo de AnimalFood) → capa legal nueva (ver §6).
- **Packaging rediseñado desde China** (Roberto lo pide a fábrica con el nuevo arte).
- **WiFi obligatorio** en el local (requisito a los petshops; "hoy todos tienen internet").
- **Modo reposo:** reels + placas publicitarias; **el dueño del local puede cambiar el precio** de su promo (cada local tiene precios distintos) → **login por local** que edita **solo ese punto**.
- **Flujo interactivo:** ¿perro o gato? · peso · ¿activo o no? · ¿alguna vez presentó alergia? → **veredicto / recomendación** de qué línea AnimalFood pedirle al vendedor en el mostrador.
- **Último paso:** invitar a sumarse a la **Comunidad AnimalFood** → escanear QR → **alta automática con cuenta de Google** → **voucher de descuento 1 vez al mes**.
- **Base de datos** de todos los inscriptos → email mensual → **automatizable con IA / N8N**.
- **Comunidad accesible desde la web** (no solo desde el totem): subruta/subdominio del dominio existente.
- **Mini folleto / instructivo** impreso con instrucciones claras + **sección de cuidado del equipo** (instalación, limpieza) — refuerza el comodato — con **QR a YouTube** (cómo configurar / cambiar promociones).

---

## 3. Arquitectura recomendada (el "mejor camino")

**Decisión central: NO hacer app Android nativa. Hacer UNA web app (PWA) responsive** que:
- **En el totem:** se carga en el navegador en modo kiosko (pantalla completa, auto-arranque).
- **En la web pública:** la misma app ES `animalfood.com.ar/comunidad`.

**Por qué:** un solo desarrollo (no dos), actualización instantánea de los 100 totems sin tocar cada equipo, no depende de los 2GB de RAM (la lógica pesada vive en la nube), y la comunidad sale del mismo proyecto. Baja costo y riesgo.

| Pieza | Mejor camino |
|---|---|
| Reposo (reels + placas) | **Letine Cloud CMS** (ya viene) → cero/mínimo desarrollo |
| Precio editable por local | Login por local en la web app → edita **solo su precio/promo** |
| Cuestionario + veredicto | Web app. Con internet → agente IA en la nube. Caída momentánea → fallback liviano (cuestionario por botones, recomendación local) para que el totem nunca quede en negro |
| QR comunidad + alta Google | QR → web app → **login Google (OAuth)** → alta automática |
| Base de datos + voucher | DB propia de AnimalFood (recomendado **Supabase**) = fuente de verdad |
| Email mensual automático | **N8N**: webhook al alta → lista → cron mensual → genera código → dispara email vía proveedor de email |
| Dominio comunidad | **Subruta/subdominio del dominio existente** (`/comunidad` o `comunidad.animalfood.com.ar`). NO comprar dominio nuevo |

**Impacto del WiFi obligatorio:** el agente IA pasa a ser el camino principal → ya **no hace falta construir un motor de recomendación offline completo** (solo un fallback liviano). Baja la complejidad y el costo de las Fases 2-3.

---

## 4. Packaging — el entregable urgente (9 días)

### 4.1 Lienzo / formato
- Caja **vertical de 1.92 m, angosta (80,5 cm) y profunda 20,5 cm, 50 kg**. El arte principal va en la **cara grande (1920×805)** pensado para verse **parado**, no como banner horizontal.
- **Falta el dieline real (troquel) del proveedor** → zonas de impresión, solapas, pegado. **Bloquea el arte final, no la planificación.**

### 4.2 Dirección visual
- **Minimalista oscuro**, alineado al totem real (negro premium) + identidad AnimalFood (naranja/branding oficial — **falta brand kit oficial**).
- Mucho aire, logo dominante, **una sola idea visual**. Debe decir **AnimalFood** y estar 100% conectado al branding.
- **No imprimir bolsas/marcas/líneas de producto específicas** en el cartón: la línea rota y son 100 cajas impresas una sola vez → mantener a **nivel marca AnimalFood + hardware**. Los productos van en material POP aparte (se reimprime fácil), no en el cartón.

### 4.3 Regla de copy (CRÍTICA — definida con Gonzalo 2026-06-09)
Las actualizaciones futuras de software no deben dejar la caja desactualizada.

| ✅ SÍ va (no envejece / no se rompe) | ❌ NO va (función puntual que un update puede cambiar) |
|---|---|
| Branding y logo AnimalFood | "Recomienda según peso/raza/edad" |
| **Slogans de posicionamiento**: "Tu mejor vendedor", "Disponible 24hs", "El vendedor que nunca descansa" | "Agente conversacional con IA" |
| Specs físicas: **50" táctil, 4K, parlantes, WiFi, Android** | Listado de pasos del flujo |
| Íconos de manipulación: frágil · este lado arriba · 2 personas · 50 kg | Listado de marcas/productos puntuales |
| Aviso de **comodato** ("Propiedad de AnimalFood") | Precios / promociones |
| QR → video de setup (YouTube) | Cualquier feature que un update pueda sacar |

> **Línea acordada:** *slogan de marca/posicionamiento = OK · descripción de función operativa específica = NO.*

### 4.4 Nombre del totem en la caja (a elegir por Gonzalo)
Se imprime una sola vez para 100 equipos → conviene un nombre **atemporal**.
- **Opción A — "Asistente Digital AnimalFood"** (genérico, envejece bien). *Recomendado para la caja.*
- **Opción B — "AnimalFood — Tu mejor vendedor"** (slogan aprobado, más comercial).
- **Opción C — "AnimalFood Smart Seller"** (nombre del proyecto; mejor como marca interna/comercial que en la caja).

### 4.5 Íconos de manipulación + comodato
No son decorativos: protegen el equipo prestado y respaldan el deber de cuidado. Encajan con la regla (son físicos, no cambian). 50 kg + 1.92 m → frágil, este lado arriba, no apilar, levantar entre 2.

---

## 5. Instructivo / folleto impreso (Fase 1)

Dos públicos, **dos QR distintos**:

| Pieza | Para quién | QR |
|---|---|---|
| **Instructivo de instalación + cuidado** (en la caja) | Dueño del local | **QR → YouTube: configurar / cambiar promociones / login** |
| **Invitación a la comunidad** (en el totem, al final del flujo) | Cliente final | **QR → comunidad + alta con Google** |

**Estructura del instructivo de instalación + cuidado:**
1. Bienvenida + qué es (1 línea de marca).
2. **Instalación:** ubicación, cómo levantarlo (entre 2 personas, 50 kg), enchufe (AC 110-240V), conexión al WiFi.
3. **Cuidado del equipo** (corazón, por el comodato): limpieza de pantalla (paño suave, qué NO usar), no sol directo/humedad, no mover encendido, anti-golpes.
4. **Uso / cambiar la promo:** pasos básicos + **QR al video de YouTube**.
5. **Recordatorio de comodato:** "Equipo propiedad de AnimalFood, entregado en comodato. Cuidalo como propio."
6. Contacto de soporte.

---

## 6. Capa legal y de riesgo (resolver en investigación)

- **🔴 Comodato:** la propiedad sigue siendo de AnimalFood → hace falta un **contrato de comodato por local** (deber de cuidado, daño/pérdida, devolución, responsabilidad). El instructivo de cuidado es la **prueba documentada** del deber de cuidado y debe estar alineado con el contrato.
- **🔴 Pregunta de alergias = zona de claims:** que el agente pregunte por alergias y recomiende un producto roza el **claim médico/veterinario** (bloqueado en el Brand Registry: nada "hipoalergénico"/médico sin validación). Camino seguro: el veredicto es **orientación de producto para consultar con el vendedor/veterinario**, nunca "este producto cura/previene la alergia". Si responde "sí tuvo alergia" → **derivar a "consultá con tu veterinario"**. Requiere **validación legal antes de programar**.
- **🔴 Datos personales:** login Google + base de datos + email mensual cae bajo la **Ley 25.326 (Datos Personales, Argentina)** → consentimiento explícito al escanear el QR, política de privacidad, base legal, opción de baja. La DB debe ser **de AnimalFood**.
- **🟡 Quién valida legalmente** los textos/claims y los términos de datos: a definir con Roberto.

---

## 7. Fases del proyecto (refinadas)

| Fase | Qué | Nota |
|---|---|---|
| **0** | Aprobación de Roberto + definiciones pendientes | En curso |
| **1** | **Packaging + instructivo + video tutorial** | **URGENTE (9 días)** — diseño de Gonzalo |
| **2** | App totem (web app en kiosko): reposo, cuestionario, recomendación local, login del local | App base; reposo vía Letine CMS |
| **3** | Agente IA conversacional (IA en la nube + reglas de marca) | Requiere internet (wifi obligatorio destraba) |
| **4** | `animalfood.com.ar/comunidad`: alta Google, puntos/merch (opcional), voucher mensual, email (N8N) | Lo más valioso y de más trabajo |
| **Rollout** | Preparar 100 equipos, asignación por local, carga de contenido, mantenimiento remoto | — |

---

## 8. Qué necesitamos de Roberto / China para EJECUTAR

**Para el packaging (urgente):**
1. **Dieline / troquel real** de la caja del proveedor.
2. **Brand kit oficial de AnimalFood**: logo vectorial, colores (Pantone/HEX), tipografía.
3. Confirmar que las 100 unidades vienen con **touch** (el modelo de la captura sí lo trae).

**Para la comunidad / IA:**
4. ¿Quién administra `animalfood.com.ar`? ¿Podemos crear `/comunidad` y tener accesos?
5. Política del **voucher mensual**: monto, quién lo financia, dónde se canjea.
6. ¿El local fija libre el precio de su promo, o dentro de un rango de AnimalFood?
7. Tope de presupuesto mensual para servicios en la nube.
8. Quién valida legalmente claims y términos de datos.

---

## 9. Plan de los 9 días (hasta ~2026-06-18)

1. **Hoy** — este documento (research/plan consolidado). ✅
2. **Siguiente** — **brief de diseño del packaging** (qué va / qué no / layout / medidas), listo para diseñar; en paralelo pedir dieline + brand kit.
3. **Diseño del packaging** apenas lleguen dieline + brand kit (sin eso, se avanza maqueta con assets provisorios).
4. **Actualizar la propuesta del proyecto** (HTML del 08/06) con: comodato, modelo exacto, wifi obligatorio, doble instructivo, regla de copy, fases refinadas — para enviar **junto** al diseño del packaging.

---

## 10. Supuestos y pendientes (etiquetados)

- **[PENDIENTE]** Dieline real de la caja · brand kit oficial AnimalFood.
- **[PENDIENTE]** ¿Gonzalo tiene equipo de desarrollo para Fases 2-4, o hay que conseguirlo? (define costeo/plazos).
- **[PENDIENTE]** Nombre del totem en la caja (Opción A/B/C de §4.4).
- **[PENDIENTE]** Definiciones de comunidad/legal de §8.
- **[HIPÓTESIS]** Fluidez de web app 4K sobre RK3568/2GB → validar con fábrica.
- **[RESUELTO]** "Dr. Cossia" descartado, no se incluye en ningún material.
- **[RESUELTO]** WiFi obligatorio → fallback offline liviano, no motor completo.
- **[RESUELTO]** Slogans de posicionamiento permitidos en la caja; funciones operativas específicas no.

---

## 11. Próxima acción recomendada

Armar el **brief de diseño del packaging** (entregable de §9.2) para que Gonzalo arranque el arte, y en paralelo conseguir **dieline + brand kit oficial**. Cerrar las definiciones de §8 con Roberto destraba la comunidad y la IA.

---

> **Build (2026-06-09):** prototipo navegable del totem creado como **repo separado** en `C:\Proyecto Code\animalfood-advisor` (Vite+React+TS+Tailwind, PWA, modo kiosko). v0.1, commit `96f1b5b`, build limpio. Motor de reglas con `claimsGuard` (alergia→veterinario), UX con nombres + "escribiendo…", reset por inactividad. Marca y tabla de recomendación PROVISORIAS — pendientes de reemplazo (ver README del repo).

*Archivos relacionados: `animalfood-totem-proposal-roberto-2026-06-08.html` (propuesta a actualizar) · `totem-project-fee-briefing-2026-06-09.md` (fee + traspaso) · `animalfood-brand-registry.md` (9 marcas, claims) · `animalfood-context.md` (fee/rol). Spec del hardware: PDF "Indoor Standing Kiosk Specification" (LETINE) en Descargas (fuera del repo).*
