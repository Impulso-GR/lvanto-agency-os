# Asistente de WhatsApp AnimalFood — B2B (captación de comercios)

> **Fecha:** 2026-06-18 · **Para:** Gonzalo (Lvanto)
> **Objetivo:** captar leads **B2B** de las campañas de Meta Ads (zonas Buenos Aires provincia y Santiago del Estero): **veterinarias (prioritario), petshops y distribuidoras**. Atenderlos al instante, **calificar que sean comercios reales, frenar a los curiosos B2C**, mantenerlos calientes y **derivarlos al vendedor correcto por zona** (Santiago → equipo Santiago · Buenos Aires → Brayan).
> **Importante:** este canal NO es para consumidores finales. El bot debe filtrar B2C antes de pasar el lead a un vendedor.
> **Por qué ahora:** API oficial (sin riesgo de ban), task-specific (lo que Meta permite). Mensajería de leads que entran por anuncio = **gratis** (ventana 72 hs de Click-to-WhatsApp).

---

## 1. El problema que resuelve
- Los leads B2B llegan calientes del anuncio, pero **los vendedores demoran 1 día o más** → se enfrían y se pierden.
- Además, a un canal de comercios se cuelan **consumidores finales** ("quiero una bolsa para mi perro") que **hacen perder tiempo** a los vendedores.
- **Solución:** el asistente responde **al instante**, **separa comercio de consumidor final**, califica al comercio, **lo captura en la base** (no se pierde aunque el vendedor tarde) y lo **rutea al vendedor correcto por zona**. Si el vendedor tarda, el bot **reactiva** al lead y le recuerda al vendedor.

## 2. Segmentos (orden de prioridad)
1. 🩺 **Veterinarias** — prescriptoras, recomiendan con autoridad. **El segmento más valioso.**
2. 🛍️ **Petshops** — volumen y reposición.
3. 📦 **Distribuidoras / mayoristas** — escala.
4. 🚫 **Consumidor final (B2C)** → se frena/deriva, NO va a los vendedores.

## 3. Arquitectura / stack (2 opciones)
**Opción A — Plataforma gestionada (rápida) ✅ recomendada para arrancar**
- Flujos + **bandeja de equipo** + **asignación por zona** (Respond.io / ManyChat / Wati / 360dialog). Trae listo el flujo, los botones, los asientos para Brayan y el equipo de Santiago y la asignación automática. ~USD 15–99/mes (lo paga AnimalFood).

**Opción B — Low-cost (más setup)**
- **Cloud API** + **n8n** (flujo) + **Chatwoot** (bandeja de equipo, gratis). ~USD 0–10/mes. Más control, más configuración.

> En las dos, los mensajes de leads que entran por anuncio son **gratis** (ventana 72 hs).

## 4. Detección de zona (para el ruteo)
1. **Automática por anuncio (ideal):** un ad set para Buenos Aires y otro para Santiago → el bot lee el dato del anuncio (referral) y **sabe la zona sin preguntar**.
2. **Fallback:** el bot pregunta la **localidad**.

## 5. El flujo conversacional (B2B)

**0. Disparo:** anuncio B2B ("¿Tenés veterinaria, petshop o distribuidora? Sumá AnimalFood — mejores márgenes y reposición rápida") → click → WhatsApp.

**1. Bienvenida + FILTRO B2B/B2C (primer mensaje, botones):**
> ¡Hola! 👋 Soy el asistente comercial de AnimalFood. Para orientarte bien: ¿nos escribís por tu **comercio** o **para tu mascota**?

Botones: **[Tengo un comercio]** · **[Es para mi mascota]**

- ➡️ Si **"Es para mi mascota" (B2C)** → **se frena con buena onda, NO se rutea a vendedor:**
  > ¡Genial que elijas AnimalFood! 🐾 Este canal es solo para comercios. Para tu mascota, conseguinos en los puntos de venta cerca tuyo 👉 {link/buscador de locales}. Y si querés descuentos todos los meses, sumate al **Club AnimalFood** 👉 {link}. ¡Gracias!
  - (Opcional) se guarda en una **lista B2C aparte** (para el Club), sin molestar a los vendedores.
- ➡️ Si **"Tengo un comercio"** → sigue la calificación B2B.

**2. Tipo de comercio (botones):** 🩺 Veterinaria · 🛍️ Petshop · 📦 Distribuidora/Mayorista · Otro

**3. ¿Ya trabaja AnimalFood? (botones):** Ya la vendo (reposición) · Quiero sumarla (nuevo) — le da contexto al vendedor.

**4. Datos del comercio:**
- Nombre del comercio + **localidad** (sirve para el ruteo por zona) + nombre y cargo del contacto.

**5. Interés (botones/texto):** ¿Qué buscás? Lista de precios mayorista · Líneas/productos · Condiciones para ser punto de venta.

**6. Captura + derivación al vendedor correcto por zona:**
- Guarda el lead B2B en la base: tipo de comercio, nombre, localidad/zona, contacto, ¿nuevo o reposición?, interés, teléfono, fecha.
- Asigna la conversación + **notifica al vendedor correcto** con el resumen comercial.
> ¡Listo, {nombre}! Te conecto con {Brayan / nuestro equipo en Santiago}, que te pasa la **lista mayorista** y las condiciones. Te escribe a la brevedad. 📋

**7. Anti-enfriamiento (si el vendedor no respondió en X horas):**
- Al lead (lo mantiene tibio):
  > {nombre}, ¿seguís interesado en sumar AnimalFood a {comercio}? {Vendedor} ya tiene tus datos y te contacta a la brevedad. Cualquier cosa, escribime. 🐾
- Al vendedor (recordatorio + escalamiento):
  > ⏰ Lead B2B sin responder hace {X} hs — {tipo de comercio} "{nombre comercio}", {localidad}, {nuevo/reposición}. Contacto: {nombre} · {teléfono}.

**8. Fuera de horario:** el bot igual califica y captura (no se pierde), y avisa que el equipo responde apenas abra.

## 6. Lógica de ruteo
```
si es B2C (consumidor final)      → frenar + derivar a puntos de venta / Club (NO a vendedores)
si zona = "Santiago del Estero"   → asignar a EQUIPO SANTIAGO (round-robin si son varios)
si zona = "Buenos Aires"          → asignar a BRAYAN
si no se detecta la zona          → preguntar la localidad
```
- El vendedor responde desde la **misma línea de la marca** (bandeja de equipo) → el lead queda en una sola conversación con todo el contexto.

## 7. El anuncio ya pre-filtra (adelanto del trafficker — paso 2)
El mejor filtro empieza en el anuncio: creatividad y segmentación apuntadas a **dueños de veterinarias/petshops/distribuidoras** ("Sumá AnimalFood a tu comercio", "precios mayoristas", "margen", "reposición"). Eso reduce los clicks B2C antes de que lleguen al bot. → Esto lo armamos en el **paso 2 (trafficker)**.

## 8. Lo que necesito de vos para terminar de configurarlo
- [ ] **Números de WhatsApp** de Brayan (BA) y del/los vendedor(es) de Santiago (¿cuántos? ¿round-robin o uno fijo?).
- [ ] **Horario de atención** de los vendedores (para el mensaje fuera de horario).
- [ ] ¿Qué define un **lead B2B válido**? (¿piden CUIT / condición de IVA? ¿mínimo de compra? ¿requisitos para ser punto de venta?).
- [ ] ¿Existe una **lista de precios mayorista** para enviar, o la pasa el vendedor?
- [ ] ¿Qué hacemos con los **B2C**? (solo frenarlos, o también ofrecer el Club / guardarlos aparte).
- [ ] ¿Hay un **número de WhatsApp Business de la marca** ya? ¿Verificación de Meta Business hecha?
- [ ] **Cada cuánto** el bot reactiva el lead si el vendedor no responde (ej.: 2 hs y 24 hs).

## 9. Pasos de implementación (orden)
1. Número de WhatsApp Business de la marca + verificación Meta.
2. Elegir stack (A o B) y conectar la API.
3. Cargar el flujo B2B + el **filtro B2C** + botones + plantillas.
4. Cargar la regla de ruteo por zona + alta de Brayan y equipo Santiago en la bandeja.
5. Configurar el destino "WhatsApp" en los anuncios (un ad set por zona).
6. **Probar de punta a punta** (anuncio → filtro → calificación → derivación → notificación → reactivación).
7. Recién ahí: **paso 2 → trafficker** (campañas B2B) y prender.

## 10. Costo (resumen)
- **Captar leads de los anuncios:** prácticamente **gratis** (ventana 72 hs). Solo pagás la **pauta**.
- **Plataforma:** ~USD 0–10/mes (B) o ~USD 15–99/mes (A).
- **IA:** $0 (flujo por reglas).
- **Tu parte:** cobrás **armado + operación** (fee / Línea C); plataforma y pauta las paga AnimalFood.

## 11. Doble beneficio estratégico
1. Cumplís algo concreto para AnimalFood **ahora** (goodwill mientras espera lo del tótem).
2. Es tu **primer caso del servicio "Asistente de WhatsApp B2B"** → demo para vender a otros clientes (mayoristas, marcas con red de comercios).

---
> **Próximo paso (cuando cerremos esto):** preparar el **trafficker** — campañas Meta Ads B2B, segmentación por rubro/zona, creatividades que pre-filtran B2C, y conexión Click-to-WhatsApp.
