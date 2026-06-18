# Asistente de WhatsApp AnimalFood — Plan de implementación + flujo

> **Fecha:** 2026-06-18 · **Para:** Gonzalo (Lvanto) · **Objetivo:** captar leads de las campañas de Meta Ads (Buenos Aires provincia y Santiago del Estero), atenderlos al instante, mantenerlos calientes y **derivarlos al vendedor correcto por zona** (Santiago → equipo Santiago · Buenos Aires → Brayan).
> **Por qué ahora:** se hace por la API oficial (sin riesgo de ban) y task-specific (lo que Meta permite desde 2026). Mensajería de leads que entran por anuncio = **gratis** (ventana de 72 hs de Click-to-WhatsApp).

---

## 1. El problema que resuelve
- Los leads llegan calientes del anuncio, pero **los vendedores demoran 1 día o más** → el lead se enfría y se pierde.
- **Solución:** el asistente (Tobi) responde **al instante**, asesora, **captura el lead en la base** (no se pierde aunque el vendedor no conteste) y lo **rutea al vendedor correcto por zona**. Si el vendedor tarda, el bot **reactiva** al lead y le recuerda al vendedor.

## 2. Arquitectura / stack (2 opciones)

**Opción A — Plataforma gestionada (rápida, para llegar a las campañas) ✅ recomendada para arrancar**
- Plataforma con flujos + **bandeja de equipo** + **asignación por zona**: Respond.io / ManyChat / Wati / 360dialog.
- Trae listo: el flujo, los botones, los asientos para Brayan y el equipo de Santiago, y la asignación automática.
- Costo: ~USD 15–99/mes según plataforma (lo paga AnimalFood).

**Opción B — Low-cost (más trabajo de setup)**
- **Cloud API oficial** + **n8n** (corre el flujo de Tobi) + **Chatwoot** (bandeja de equipo, open-source y gratis, donde responden los vendedores con asignación por zona).
- Costo: ~USD 0–10/mes. Más control, pero más configuración (servidores, webhooks).

> En las dos, los mensajes de leads que entran por anuncio son **gratis** (ventana 72 hs). El costo por mensaje (centavos) solo aparece en envíos masivos de marketing a futuro.

## 3. Detección de zona (clave para el ruteo)
1. **Automática por anuncio (lo ideal):** corré un ad set para Buenos Aires y otro para Santiago. Click-to-WhatsApp manda en el primer mensaje un dato del anuncio (referral) → el bot **sabe la zona sin preguntar**.
2. **Fallback (preguntando):** si no se detecta, el bot pregunta con botones: **[Buenos Aires] [Santiago del Estero]**.

## 4. El flujo conversacional (Tobi en WhatsApp)

**0. Disparo:** el usuario toca "Enviar mensaje" en el anuncio → abre el WhatsApp de AnimalFood.

**1. Bienvenida instantánea (0 espera — esto mantiene caliente):**
> ¡Hola! 🐾 Soy Tobi, el asistente de AnimalFood. ¡Gracias por escribir! En un minuto te ayudo a encontrar el alimento ideal para tu mascota. Para arrancar, ¿cómo es tu nombre?

**2. Especie (botones):** 🐶 Perro · 🐱 Gato

**3. Datos rápidos (botones, cortos para WhatsApp):**
- Edad: Cachorro · Adulto · Senior
- Porte: Chico · Mediano · Grande

**4. Recomendación (lógica de Tobi — da valor ya):**
> ¡Genial, {nombre}! Para {mascota} te recomiendo **{línea AnimalFood}**: {beneficio en 1 frase, claims-safe}.

**5. Zona (si no se detectó por el anuncio):**
> ¿De qué zona nos escribís? **[Buenos Aires] [Santiago del Estero]**

**6. Captura + derivación al vendedor correcto:**
- Guarda el lead en la base: nombre, zona, mascota (especie/edad/porte), producto recomendado, teléfono, fecha.
- Asigna la conversación + **notifica al vendedor correcto** con un resumen.
> ¡Listo, {nombre}! Te conecto con {Brayan / nuestro equipo en Santiago}, que te pasa precios y dónde conseguirlo cerca tuyo 📍. Te escribe a la brevedad.
- (Opcional, suma a la base) Invitación al Club:
> Mientras tanto, sumate al **Club AnimalFood** y tené descuentos todos los meses 👉 {link}

**7. Anti-enfriamiento (si el vendedor no respondió en X horas):**
- Al lead (lo mantiene tibio):
> {nombre}, ¿seguís con la duda sobre la alimentación de {mascota}? Cualquier cosa escribime. {Vendedor} ya tiene tus datos y te contacta a la brevedad. 🐾
- Al vendedor (recordatorio + escalamiento):
> ⏰ Lead sin responder hace {X} hs — {nombre}, {zona}, {mascota}, interesado en {producto}. Tel: {número}.

**8. Fuera de horario:** el bot igual atiende, califica y captura (no se pierde el lead) y avisa: *"Nuestro equipo te responde apenas abra. Mientras, te dejo la recomendación para {mascota}."*

## 5. Lógica de ruteo
```
si zona = "Santiago del Estero"  → asignar a EQUIPO SANTIAGO (round-robin si son varios)
si zona = "Buenos Aires"         → asignar a BRAYAN
si no se detecta                 → preguntar con botones
```
- El vendedor responde desde la **misma línea de la marca** (bandeja de equipo) → el lead queda en una sola conversación, con todo el contexto que ya levantó el bot.

## 6. Lo que necesito de vos para terminar de configurarlo
- [ ] **Números de WhatsApp** de Brayan (BA) y del/los vendedor(es) de Santiago (¿cuántos son? ¿round-robin o uno fijo?).
- [ ] **Horario de atención** de los vendedores (para el mensaje fuera de horario).
- [ ] ¿El bot **recomienda producto** o solo califica y deriva? (Recomiendo que recomiende: mantiene caliente y da valor.)
- [ ] **Criterio de recomendación** por mascota (mismo pendiente del tótem — sirve para los dos).
- [ ] ¿Hay un **número de WhatsApp Business de la marca** ya? ¿Verificación de Meta Business hecha?
- [ ] **Cada cuánto** el bot reactiva al lead si el vendedor no responde (ej.: a las 2 hs y a las 24 hs).
- [ ] Quién decide la **plataforma** (Opción A) o si vamos por la Opción B (Cloud API).

## 7. Pasos de implementación (orden)
1. Número de WhatsApp Business de la marca + verificación Meta.
2. Elegir stack (A o B) y conectar la API.
3. Cargar el flujo de Tobi + botones + plantillas (las de respuesta dentro de 24 hs son gratis).
4. Cargar la regla de ruteo por zona + dar de alta a Brayan y al equipo de Santiago en la bandeja.
5. Configurar el destino "WhatsApp" en los anuncios (un ad set por zona para autodetección).
6. **Probar de punta a punta** con tu número (anuncio → bot → derivación → notificación al vendedor → reactivación).
7. Prender las campañas.

## 8. Costo (resumen)
- **Captar leads de los anuncios:** prácticamente **gratis** (ventana 72 hs). Solo pagás la **pauta**.
- **Plataforma:** ~USD 0–10/mes (Opción B) o ~USD 15–99/mes (Opción A).
- **IA:** $0 (Tobi es por reglas).
- **Envíos masivos de marketing** (a futuro): centavos por mensaje. Lo cubre AnimalFood.
- **Tu parte:** cobrás el **armado + operación** (fee / extra de Línea C). Los costos de plataforma/pauta los paga AnimalFood.

## 9. Doble beneficio estratégico
1. **Cumplís una promesa pendiente con AnimalFood** y la entregás ahora — goodwill mientras esperás la propuesta del tótem.
2. Es tu **primer caso del servicio de "Asistente de WhatsApp"** productizado → demo para vender a otros clientes.
