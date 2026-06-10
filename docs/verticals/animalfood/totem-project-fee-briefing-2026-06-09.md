# Briefing para otra IA — Proyecto Totems AnimalFood + Fee de Gonzalo

> **Propósito de este archivo:** poner al tanto, desde cero, a otra IA (u otra cuenta de Claude) sobre el trabajo hecho hasta el **2026-06-09**. Es autocontenido: no asume acceso a la memoria ni al historial de chat. Léelo entero antes de continuar el trabajo.

---

## 1. Quién es quién y contexto

- **Gonzalo** — operador humano. Director creativo + growth strategist. NO es programador senior; las explicaciones técnicas deben ser en lenguaje práctico. Email: gonza.mdq25@gmail.com. Está en **Argentina** (precios/impuestos/cambio en contexto argentino).
- **Lvanto** — agencia de marketing digital de Gonzalo (landing pages, webs, redes, ads, automatizaciones, IA). Este repo (`C:\Proyecto Code\VSCODE`) es el "cerebro operativo" de la agencia (Lvanto Agency OS). Reglas completas en `CLAUDE.md`.
- **AnimalFood Argentina** — cliente principal / vertical prioritaria de Lvanto. Empresa de alimento para mascotas con **9 marcas** (AnimalFood madre, Canfeed, Catfeed, IronPet, Enercan, Enercat, Puro, SuperPet, Ulyses). Gonzalo le hace dirección creativa + growth + contenido + comunidad + B2B + campañas.
  - **Gustavo** — aprobó el fee de Gonzalo "en principio".
  - **Roberto** — contacto de AnimalFood que **encargó el proyecto de los totems** y de quien depende la confirmación operativa final del fee.
- **Aranza** — community manager que ejecuta tareas (Gonzalo dirige/aprueba).

---

## 2. El proyecto: "AnimalFood Smart Seller" (totems + comunidad)

Roberto le encargó a Gonzalo un proyecto que se nombró **"AnimalFood Smart Seller"**. Hay una **propuesta HTML completa** ya hecha:
`docs/verticals/animalfood/animalfood-totem-proposal-roberto-2026-06-08.html` (estado "Para aprobación", fecha 08/06/2026). **Está SIN commitear en git** (untracked).

### Qué es (dos piezas conectadas)

1. **El Totem** — pantalla táctil de 50" en petshops/veterinarias.
   - **Modo reposo:** videos + promo del local + "Tocá para empezar".
   - **Cuestionario** sobre la mascota: ¿perro o gato?, raza, peso, edad, nivel de actividad.
   - **Veredicto:** qué línea del universo AnimalFood le conviene y por qué, en lenguaje simple.
   - **QR a la comunidad** al final.
   - **Agente IA conversacional** adentro: con internet, charla natural vía servicio de IA en la nube; **sin internet, cae a cuestionario por botones con recomendación resuelta localmente** (así el totem NUNCA queda inservible).
   - **Panel de login por local:** cada petshop/vet entra con usuario/contraseña y define el **precio de su promo del mes** + qué productos destacar.
   - **Disclaimer obligatorio:** el agente da orientación de producto, NO diagnóstico ni prescripción veterinaria; sin claims médicos/terapéuticos sin validación.

2. **La Comunidad** — sección nueva en `animalfood.com.ar/comunidad` (nombre propuesto: **"Manada AnimalFood"**).
   - Registro del cliente + su mascota (desde el totem por QR o directo desde la web).
   - **Puntos → canje por merch.**
   - **Un descuento mensual** para la compra de la bolsa.
   - Funciona aunque el cliente nunca haya tocado un totem.
   - Encima se monta **email marketing** (recordatorio de recompra, tips, promo del mes).

### Escala y modelo de negocio

- **100 totems** en rollout.
- **El hardware lo provee el proveedor de Roberto.** Gonzalo NO vende fierro: vende **software + contenido + estrategia** (que es lo que tiene margen).
- El hardware del totem es Android con memoria limitada → **no corre la IA solo**; el agente necesita internet (de ahí el fallback offline).

### Fases del proyecto

| Fase | Qué | Nota |
|---|---|---|
| **0** | Aprobación de Roberto + definiciones pendientes | Hoy |
| **1** | Packaging (caja con QR) + instructivo impreso anti-daños + video tutorial YouTube | **URGENTE** por fecha de impresión; es trabajo de diseño de Gonzalo |
| **2** | App totem en modo kiosko, **offline** (reposo, cuestionario, recomendación local, login del local) | App base |
| **3** | Agente IA conversacional (conexión a IA en la nube + reglas de marca) | Requiere internet |
| **4** | `animalfood.com.ar/comunidad`: registro, cuentas, puntos, merch, descuento mensual, email mkt | Lo más valioso y lo que más trabajo lleva |
| **Rollout** | Preparar los 100 equipos, asignación por local, carga de contenido, mantenimiento remoto | — |

### Qué tiene que definir Roberto (de la sección 6 de la propuesta)

**Para el packaging (urgente):** dieline/medidas reales de la caja del proveedor · colores y logos oficiales de AnimalFood y líneas · método de impresión y proveedor · ¿el totem trae parlantes? (define si hay audio).
**Para la comunidad/IA:** ¿quién administra `animalfood.com.ar` y podemos crear `/comunidad` con accesos? · ¿hay wifi estable en los locales? · política del descuento mensual (monto, quién lo financia, dónde se canjea) · sistema de puntos (qué merch, cuánto vale, quién la envía) · ¿el local fija libre el precio de su promo o dentro de un rango? · tope de presupuesto mensual para servicios en la nube · quién valida legalmente los claims y los términos de datos.

---

## 3. La consulta de Gonzalo (2026-06-09): cuánto cobrar

Gonzalo preguntó **dos cosas** y pidió explícitamente **números auditados en el mercado, NO opinión**, con foco Argentina + USD:
1. ¿Cuánto cobrar el **proyecto de totems** (cobrado **aparte** del fee)?
2. ¿Cuánto **aumentar su fee mensual**?

Contexto previo del fee (de `docs/verticals/animalfood/animalfood-context.md`): fee actual **3.000.000 ARS/mes**, aprobado en principio por Gustavo, pendiente confirmación con Roberto. El objetivo declarado es **justificar** ese fee con resultados/sistemas/nuevas implementaciones (el proyecto de totems es justo eso).

### Cómo se hizo la auditoría

Se intentó usar el CLI **agent-browser** (Gonzalo lo había instalado para tener "browser propio"), pero **está caído en su máquina** (ver §5). Se hizo la auditoría con las herramientas **WebSearch / WebFetch** integradas. Tipo de cambio de anclaje: **~$1.450 ARS/USD** (MEP/blue, 8-jun-2026).

---

## 4. La recomendación entregada (números auditados, jun 2026)

**Principio rector: TRES flujos separados.** No mezclar el proyecto con el fee (sería regalarlo).

### A) Build del proyecto — one-time, por fases

Gonzalo **no es un dev shop**: dirige y subcontrata desarrollo + pone su trabajo creativo. Precio = costo de desarrollo + su dirección/creatividad + margen.

| Fase | Precio sugerido (USD) | ARS aprox (×1.450) |
|---|---|---|
| 1 · Packaging + video + instructivo (urgente) | **1.500 – 2.000** | 2,2M – 2,9M |
| 2 · App totem Android offline | **8.000 – 11.000** | 11,6M – 16M |
| 3 · Agente IA conversacional | **4.000 – 5.500** | 5,8M – 8M |
| 4 · Comunidad (web + puntos + merch + descuento + email) | **13.000 – 19.000** | 18,8M – 27,5M |
| Rollout 100 totems | **2.500 – 4.000** | 3,6M – 5,8M |
| **TOTAL** | **~29.000 – 41.000** | **~42M – 60M ARS** |

**Sugerencia concreta:** poner el total en **USD 32.000–35.000 (≈ ARS 46M–51M)**, presentado **por fases** para aprobación incremental. **Fase 1 (urgente) = primera factura standalone ~USD 1.800**, arranca ya.

### B) Infraestructura — recurrente, con TOPE (pass-through, NO es margen de Gonzalo)

Hosting + DB + IA por uso + email + storage para 100 totems activos: **USD 250–600/mes (≈ ARS 360k–870k)** según volumen. Se factura aparte con tope claro. Margen opcional de gestión 10-15%.

### C) Aumento del fee mensual — escalonado

El fee de **3M ARS (~USD 2.070/mes) está BARATO** para su rol (dirección creativa + growth sobre 9 marcas).

| Momento | Fee sugerido | Razón |
|---|---|---|
| Hoy → arranque del proyecto | **3M → 4M ARS** (+33%) | Coordinación/dirección del proyecto suma carga ya |
| Cuando la comunidad va live (Fase 4) | **4M → 4,5M–5M ARS** (~+50-65% vs hoy) | Operación continua del sistema nuevo |

Aun a 5M ARS (~USD 3.450) sigue **por debajo** de un marketing manager full-time.

### Referencias de mercado usadas (Argentina, jun 2026)

- **App móvil a medida Argentina:** MVP ~USD 5.000, media ~USD 15.000, compleja USD 50.000+. Hora senior USD 45-60.
- **Plataforma loyalty/puntos custom:** points-based USD 15.000-40.000 global; Argentina ~40-60% de eso.
- **Agente IA generativo LATAM/Argentina:** USD 3.500-5.000 típico; operación USD 800-1.500/mes.
- **Kiosko interactivo software a medida:** USD 10.000-75.000.
- **Retainer agencia integral Argentina:** 500k-1,5M ARS/mes (1 marca).
- **Marketing manager B2C mediano Argentina:** 6,2-7,7M ARS/mes (B2B 5,1-7,5M). Costo cargado p/ empleador ~$9-11M.
- **Markup de agencia:** 2x-4x (2,5x conservador); margen bruto objetivo 55-65%.

### Referencias salariales (consultadas después, jun 2026)

- **Salario mínimo (SMVM):** $367.800/mes (jul $372.400, ago $376.600); hora $1.839. Es piso teórico, casi nadie en convenio cobra eso.
- **Administrativo en blanco (Empleado de Comercio CCT 130/75):** categoría A inicial básico ~$1.210.613 (mayo 2026); +sumas no remunerativas ($100k+$20k) → bolsillo ~$1,3M; +antigüedad/presentismo.
- **Costo REAL para el empleador** de ese administrativo (cargas ~30-40% + SAC + vacaciones): **~$1,7-2M/mes**.
- Marco para el fee: el fee de 3M ≈ 2,3 administrativos en blanco, pero Gonzalo hace un rol que en relación de dependencia cuesta el doble/triple → confirma que hay techo para subir a 4-5M.

### Caveats honestos comunicados

Son estimaciones de referencia de mercado. El número fino del build depende del **equipo de desarrollo que use Gonzalo** (su costo de subcontratación define el margen real). Falta ese dato para afinar.

---

## 5. Estado técnico: agent-browser CLI CAÍDO

El CLI **agent-browser** (v0.27.1, Chrome 149.0.7827.55) está instalado pero **NO puede levantar un browser usable en esta máquina** (Windows 11):
- El **Chrome embebido (for Testing) crashea al iniciar** — sale código 0 sin escribir DevToolsActivePort, incluso limpio + `--no-sandbox`. `chrome --version` no imprime nada. Los intentos dejaron **257 procesos chrome.exe zombis** que bloquearon el user-data-dir (se mataron con PowerShell).
- El **Chrome del sistema vía `--executable-path` tampoco sirve**: Gonzalo tiene su Chrome real abierto con ~117 procesos (muchas pestañas); agent-browser deriva a esa instancia y pierde el control. **NO cerrar su Chrome** (destructivo para su trabajo).
- **Solución actual:** usar **WebSearch / WebFetch** (funcionó para la auditoría). Si Gonzalo pide "usar el CLI / auditar la web", por defecto usar web tools y avisar que el CLI está caído.
- **Fix no intentado:** `agent-browser doctor --fix` (reinstala Chrome, purga estado) — probar en una sesión técnica dedicada, no en medio de otra tarea.

---

## 6. Preguntas abiertas / próximos pasos

1. **Decidir:** ¿volcar la cotización en una **hoja de precios formal para Roberto**, o dejarla como nota estratégica interna de Gonzalo? (pendiente, Gonzalo no decidió aún).
2. **Posible contratación:** Gonzalo preguntó por sueldos de administrativos — puede estar evaluando **sumar un asistente/administrativo** al equipo. Si avanza, armar el costo cargado real y cómo encaja en la estructura.
3. **Commitear** la propuesta HTML (`animalfood-totem-proposal-roberto-2026-06-08.html`) — sigue untracked, conviene no perderla. También untracked: `apps/lvanto-command-center/start-lvanto-command-center.ps1` y `lvanto-icon.ico`.
4. **Fase 1 (packaging) es lo urgente** por fecha de impresión: necesita dieline + colores/logos oficiales de Roberto para arrancar.

---

## 7. Archivos clave para esta línea de trabajo

| Archivo | Qué es |
|---|---|
| `docs/verticals/animalfood/animalfood-totem-proposal-roberto-2026-06-08.html` | La propuesta del proyecto (untracked) |
| `docs/verticals/animalfood/totem-project-fee-briefing-2026-06-09.md` | **Este archivo** (briefing de traspaso) |
| `docs/verticals/animalfood/animalfood-context.md` | Contexto del fee (3M ARS) y rol de Gonzalo |
| `docs/verticals/animalfood/animalfood-brand-registry.md` | Las 9 marcas, claims permitidos/bloqueados |
| `CLAUDE.md` | Reglas del Agency OS (rol, comportamiento, modelo) |
| `SESSION_LOG.md` | Historial de sesiones (entrada 2026-06-09 resume esto) |
| `HANDOFF.md` | Continuidad cross-sesión del estado general del repo |

---

## 8. Reglas de trabajo a respetar (de CLAUDE.md)

- Inspeccionar la estructura antes de editar. Cambios chicos y controlados. No borrar archivos sin pedido explícito.
- No tocar secretos/credenciales/.env/API keys/billing.
- Explicar lo técnico en lenguaje práctico (Gonzalo no es programador senior).
- No publicar, no pautar, no hacer outreach ni cambios de presupuesto sin aprobación de Gonzalo.
- Separar siempre **dato real** de **hipótesis**; etiquetar la incertidumbre.
- Para claims de AnimalFood: nada médico/terapéutico sin validación; sin precios/márgenes fijos sin confirmar.

---

*Generado el 2026-06-09. Si seguís el trabajo, actualizá este briefing o el SESSION_LOG.md al cerrar.*
