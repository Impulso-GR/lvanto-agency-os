# Brief de diseño — Packaging del AnimalFood Advisor (caja del totem)

> **Para:** Gonzalo (diseño en Photoshop) · **Fecha:** 2026-06-10 · **Urgencia:** ALTA (impresión en fábrica China)
> **Regla de oro acordada:** *slogan de marca = SÍ · función operativa específica = NO* (un update de software nunca puede dejar la caja vieja).

---

## 1. La caja (medidas reales del proveedor)

**1920 × 205 × 805 mm · 50 kg** → caja **vertical de casi 2 metros**, angosta.

| Cara | Medida (mm) | Uso |
|---|---|---|
| **Frente** (cara grande A) | 1920 × 805 | Arte principal — se ve PARADA |
| **Dorso** (cara grande B) | 1920 × 805 | Specs + QR tutorial + comodato |
| **Laterales** (×2) | 1920 × 205 | Wordmark vertical + íconos manipulación |
| **Tapa superior** | 805 × 205 | "Abrir acá" + frágil |
| **Base** | 805 × 205 | (sin arte, solo cartón) |

⚠️ **Pendiente del proveedor: el dieline real** (troquel, solapas, zonas de pegado, sangrado). Diseñá las caras a medida final + **20 mm de sangrado** por lado y después lo ajustamos al troquel. Trabajá a **150 dpi mínimo** a tamaño real (las caras grandes son enormes; 150 dpi alcanza para cartón).

---

## 2. Dirección visual

- **Minimalista oscuro premium** — la caja se ve como el producto: negro profundo + amarillo AnimalFood. Mucho aire, UNA idea por cara.
- **Colores:** Negro `#0d0b09` (en imprenta: negro enriquecido C60 M40 Y40 K100) · Amarillo `#FFD21A` (aprox. C0 M16 Y95 K0 — **confirmar contra brand kit oficial/Pantone cuando esté**) · Blanco.
- **Tipografía:** la oficial del brand kit cuando llegue; mientras tanto **Plus Jakarta Sans** (la del Advisor) — pesos 800 para títulos, 500 para textos.
- **NO imprimir** bolsas/líneas de producto (Canfeed/Enercan/etc.) — la línea rota y la caja se imprime una sola vez.
- Recurso gráfico sugerido: **silueta del totem en línea amarilla** (trazo fino) + partículas/puntos dorados sutiles (el mismo lenguaje del Advisor). Wordmark siempre **Animal**(blanco)+**food**(amarillo).

---

## 3. Cara por cara — copy LISTO para pegar

### FRENTE (1920×805) — el héroe
```
animalfood            ← wordmark grande, arriba
ADVISOR               ← nombre del producto, gigante, blanco
Tu mejor vendedor.    ← slogan en amarillo
Disponible 24 hs.
[ Silueta del totem en línea amarilla, centro/abajo ]
Asistente digital para veterinarias y pet shops   ← bajada chica, abajo
```

### DORSO (1920×805) — info + confianza
```
animalfood ADVISOR    ← wordmark mediano arriba

LO QUE HAY ADENTRO          ← specs FÍSICAS (nunca cambian):
· Pantalla táctil 50" · 4K
· Parlantes integrados
· WiFi + Ethernet
· Android

ANTES DE INSTALAR, ESCANEÁ  ← bloque QR (reservar 120×120 mm)
[ QR ]  Video paso a paso de instalación y puesta en marcha.
        ⚠️ URL pendiente (canal de YouTube) — dejar QR PLACEHOLDER editable.

EQUIPO EN COMODATO          ← recuadro destacado, borde amarillo:
"Este equipo es propiedad de AnimalFood, entregado en comodato.
Cuidalo como propio: dentro de la caja vas a encontrar la guía
de instalación y cuidado."
```

### LATERALES (1920×205, ×2) — los que se ven en depósito
```
animalfood ADVISOR   ← wordmark en vertical (rotado 90°), grande
[ Fila de íconos de manipulación, abajo ]
```

### TAPA SUPERIOR (805×205)
```
[ ícono copa "frágil" ]  [ flechas "este lado arriba" ]  ABRIR ACÁ →
```

---

## 4. Íconos de manipulación (obligatorios — protegen el comodato)

En **todas las caras laterales** + tapa, en blanco o amarillo, estilo línea:
1. ☂️ Proteger de la humedad
2. 🍷 Frágil (copa)
3. ⬆️ Este lado arriba (flechas)
4. 👥 **Levantar entre 2 personas** (50 kg)
5. 🚫📚 No apilar (o "máx. X" si fábrica lo define)
6. **"50 kg"** en texto visible

---

## 5. Qué NO va (checklist de control antes de exportar)

- ❌ Funciones de software ("recomienda según peso/raza", "con IA", "escaneá y sumate al club", pasos del flujo)
- ❌ Marcas/líneas de producto (Canfeed, Enercan…) ni packshots de bolsas
- ❌ Precios / promociones
- ❌ AAFCO, claims nutricionales o médicos
- ❌ "Dr. Cossia" (descartado)
- ✅ Slogans de posicionamiento SÍ: "Tu mejor vendedor", "Disponible 24 hs", "El vendedor que nunca descansa"

---

## 6. Entregables para fábrica

1. PDF/X o TIFF aplanado por cara (CMYK, 150+ dpi, 20 mm sangrado)
2. Tipografías rasterizadas o embebidas
3. QR como **vector editable** en archivo aparte (se reemplaza cuando exista la URL del tutorial)
4. Mockup 3D de presentación para Roberto (render de la caja parada) — opcional pero vende

**Pendientes que destraban el final:** dieline del proveedor · brand kit oficial (Pantone/tipografía) · URL del video tutorial.
