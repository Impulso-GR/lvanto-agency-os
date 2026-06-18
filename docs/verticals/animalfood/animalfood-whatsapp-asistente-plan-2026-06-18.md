# Asistente de WhatsApp AnimalFood — B2B + mini-CRM en Google Sheets

> **Fecha:** 2026-06-18 · **Para:** Gonzalo (Lvanto)
> **Objetivo:** captar leads **B2B** de las campañas de Meta Ads (Buenos Aires provincia y Santiago del Estero): **veterinarias (prioritario), petshops y distribuidoras**. Atenderlos al instante, **filtrar a los curiosos B2C**, **registrarlos solos en un Google Sheet con estados**, mantenerlos calientes y **derivarlos al vendedor correcto por zona** (Santiago → equipo Santiago · Buenos Aires → Brayan).
> **Club AnimalFood:** ⏸️ en pausa por ahora. El flujo queda **listo para enchufarlo** (cambio de 1 línea) cuando se active.

---

## 1. El problema que resuelve
- Los leads B2B llegan calientes del anuncio, pero **los vendedores demoran 1 día o más** → se enfrían y se pierden.
- Se cuelan **consumidores finales** que hacen perder tiempo a los vendedores.
- Cargar los leads **a mano en un Sheet** es lento y se pierde el seguimiento.
- **Solución:** el asistente responde **al instante**, **separa comercio de consumidor final**, califica, **escribe el lead solo en el Sheet con su estado**, lo **rutea al vendedor por zona** y lo **reactiva** si el vendedor tarda.

## 2. Segmentos (prioridad)
1. 🩺 **Veterinarias** — prescriptoras, recomiendan con autoridad. **El segmento más valioso.**
2. 🛍️ **Petshops** — volumen y reposición.
3. 📦 **Distribuidoras / mayoristas** — escala.
4. 🚫 **Consumidor final (B2C)** → se frena/deriva, NO va a los vendedores.

## 3. Arquitectura / stack
- **WhatsApp:** API oficial (Cloud API) o un BSP (Respond.io / 360dialog / Wati).
- **Automatización del flujo:** n8n (o el constructor del BSP).
- **CRM:** **Google Sheets** (el bot escribe la fila; los vendedores actualizan el estado).
- **Conexión bot → Sheet:** nodo de Google Sheets en n8n (o Make/Zapier, o la integración nativa de la plataforma).
- Costo: leads de anuncios = **gratis** (ventana 72 hs). Plataforma ~USD 0–10/mes (Cloud API+n8n) o ~USD 15–99/mes (BSP). Lo paga AnimalFood.

## 4. Detección de zona (para el ruteo)
1. **Automática por anuncio (ideal):** un ad set para Buenos Aires y otro para Santiago → el bot lee el dato del anuncio (referral) y sabe la zona sin preguntar.
2. **Fallback:** el bot pregunta la **localidad**.

## 5. El flujo conversacional (B2B)

**0. Disparo:** anuncio B2B → click → WhatsApp.

**1. Bienvenida + FILTRO B2B/B2C (botones):**
> ¡Hola! 👋 Soy el asistente comercial de AnimalFood. Para orientarte bien: ¿nos escribís por tu **comercio** o **para tu mascota**?

**[Tengo un comercio]** · **[Es para mi mascota]**

- ➡️ **"Es para mi mascota" (B2C)** → se frena con buena onda, **NO va al vendedor**:
  > ¡Genial que elijas AnimalFood! 🐾 Este canal es solo para comercios. Para tu mascota, conseguinos en los puntos de venta cerca tuyo 👉 {link/buscador de locales}. ¡Gracias!
  - 🔒 *Club AnimalFood: en pausa. Acá se agrega el link de registro al Club apenas se active (cambio de 1 línea). Mientras, opcionalmente se guarda en una pestaña "B2C" del Sheet.*
- ➡️ **"Tengo un comercio"** → sigue la calificación B2B.

**2. Tipo de comercio (botones):** 🩺 Veterinaria · 🛍️ Petshop · 📦 Distribuidora/Mayorista · Otro

**3. ¿Ya trabaja AnimalFood? (botones):** Ya la vendo (reposición) · Quiero sumarla (nuevo)

**4. Datos del comercio:** nombre del comercio + **localidad** + nombre y cargo del contacto.

**5. Interés (botones):** Lista de precios mayorista · Líneas/productos · Condiciones para ser punto de venta.
> *(El bot puede aclarar que hay un **mínimo de compra mayorista**; el número y la lista los pasa el vendedor.)*

**6. Captura + Sheet + derivación:**
- ✍️ **Escribe la fila en el Google Sheet** con **Estado: 🆕 Nuevo** y **Vendedor asignado** según la zona.
- Notifica al vendedor correcto con el resumen.
> ¡Listo, {nombre}! Te conecto con {Brayan / nuestro equipo en Santiago}, que te pasa la **lista mayorista** y las condiciones. Te escribe a la brevedad. 📋

**7. Anti-enfriamiento (si el vendedor no respondió en X horas):**
- Al lead: *{nombre}, ¿seguís interesado en sumar AnimalFood a {comercio}? {Vendedor} ya tiene tus datos y te contacta a la brevedad. 🐾*
- Al vendedor: *⏰ Lead B2B sin responder hace {X} hs — {tipo} "{comercio}", {localidad}.*

**8. Horario y fuera de hora:** atención **8 a 16 hs** (tentativo, a confirmar). Fuera de ese horario el bot igual califica y captura (no se pierde) y avisa que el equipo responde al abrir.

## 6. Lógica de ruteo
```
si es B2C                         → frenar + derivar a puntos de venta (NO a vendedores)
si zona = "Santiago del Estero"   → asignar a EQUIPO SANTIAGO (round-robin si son varios)
si zona = "Buenos Aires"          → asignar a BRAYAN
si no se detecta la zona          → preguntar la localidad
```

## 7. 🆕 Seguimiento en Google Sheets (mini-CRM)
El bot **escribe cada lead como una fila**; vendedores y vos ven el embudo en vivo y actualizan el estado con desplegables.

**Columnas:**
| Col | Campo | Quién lo carga |
|---|---|---|
| A | Fecha/hora | bot (auto) |
| B | **Estado** (desplegable) | vendedor |
| C | **Zona** (desplegable: Bs As / Santiago) | bot |
| D | **Vendedor** (desplegable: Brayan / Santiago-1 / …) | bot (por zona) |
| E | **Tipo de comercio** (desplegable: Veterinaria / Petshop / Distribuidora / Otro) | bot |
| F | Comercio (nombre) | bot |
| G | Contacto (nombre) | bot |
| H | WhatsApp (tel / link) | bot |
| I | **¿Nuevo o reposición?** (desplegable) | bot |
| J | Interés / nota | bot + vendedor |
| K | **Origen** (desplegable: Anuncio BA / Anuncio Santiago / Orgánico) | bot |
| L | Última actualización | vendedor |
| M | Próximo seguimiento (fecha) | vendedor |
| N | Días sin contactar (fórmula) | auto → se pinta en rojo si >1 día sin contactar |

**Estados (desplegable B):** 🆕 Nuevo · 👤 Asignado · 💬 Contactado · 📋 Negociando · ✅ Ganado · ❌ Perdido · 🚫 No califica

**Cómo funciona:**
- El bot agrega la fila al capturar (Estado = Nuevo, Vendedor por zona).
- **Formato condicional:** cada Estado pinta la fila de un color → se ve el embudo de un vistazo.
- **Columna N (días sin contactar):** marca en rojo los leads atascados en "Nuevo/Asignado" → conecta con el anti-enfriamiento (paso 7).
- **Vistas filtradas:** una pestaña/filtro por vendedor (Brayan ve lo suyo, Santiago lo suyo) y un **tablero** con totales por estado y por zona.
- (Opcional) pestaña **"B2C"** aparte donde caen los consumidores finales, sin mezclarse con el embudo B2B.

## 8. Config decidida / pendiente
**Decidido (hoy):**
- Horario **8–16 hs** (tentativo, a confirmar).
- **Hay mínimo de compra** mayorista (número TBD; lo pasa el vendedor).
- **La lista de precios la envía el vendedor** (no el bot).
- **Club: sin opción por ahora**, dejar listo para activar.

**Falta para terminar:**
- [ ] **Números de WhatsApp** de Brayan (BA) y del/los vendedor(es) de Santiago (¿cuántos? ¿round-robin?).
- [ ] ¿Qué define un **lead B2B válido**? (¿piden CUIT / condición de IVA?).
- [ ] **Cada cuánto** el bot reactiva el lead si no hay respuesta (ej.: a las 2 hs y a las 24 hs).
- [ ] ¿Hay **número de WhatsApp Business de la marca** + verificación Meta?
- [ ] ¿Quién más necesita acceso al Sheet además de los vendedores?

## 9. Pasos de implementación
1. Crear el **Google Sheet** con columnas, desplegables, formato condicional y vistas.
2. Número de WhatsApp Business + verificación Meta.
3. Conectar API (Cloud API+n8n o BSP) + cargar el flujo B2B + filtro B2C.
4. Conectar el flujo al Sheet (append de fila + asignación por zona).
5. Alta de Brayan y equipo Santiago (bandeja + acceso al Sheet).
6. Probar de punta a punta (anuncio → filtro → calificación → fila en Sheet → notificación → reactivación).
7. **Paso 2: trafficker** (campañas Meta Ads B2B) y prender.

## 10. El anuncio pre-filtra (adelanto del paso 2)
Creatividad/segmentación a **dueños de veterinarias/petshops/distribuidoras** ("sumá AnimalFood a tu comercio", "precios mayoristas", "margen", "reposición") → baja los clicks B2C antes del bot. Se arma en el **paso 2 (trafficker)**.

## 11. Doble beneficio
1. Cumplís algo concreto para AnimalFood **ahora** + le ordenás el seguimiento de leads (que hoy es manual).
2. Es tu **primer caso del servicio "Asistente de WhatsApp B2B + CRM"** → demo para vender a otros.
