# AnimalFood — Auditoría del sitio + catálogo de productos (2026-06-09)

> Fuente: **https://animalfood.com.ar/** (auditoría vía WebFetch, 2026-06-09). Es el sitio oficial del cliente. Sirve para: (a) alimentar la **tabla de recomendación** del totem con líneas, etapas de vida y presentaciones REALES; (b) tener los **packshots** (PNG de bolsas) y logos; (c) actualizar el [[animalfood-brand-registry]].
> ⚠️ Dato del sitio ≠ claim aprobado para el totem. Lo que el sitio dice (ej. Enercan "menos alergias") NO se traslada automáticamente al Advisor: el totem deriva alergias al veterinario. Ver "Notas de claims".

## 1. Estructura del sitio

| Sección | URL |
|---|---|
| Home | https://animalfood.com.ar/ |
| **Perros** | Canfeed · Puro · Enercan · IronPet Perros · SuperPet |
| Canfeed | https://animalfood.com.ar/canfeed/ |
| Puro | https://animalfood.com.ar/puro/ |
| Enercan | https://animalfood.com.ar/enercan/ |
| IronPet Perros | https://animalfood.com.ar/ironperros/ |
| SuperPet | https://animalfood.com.ar/superpet/ |
| **Gatos** | Catfeed · IronPet Gatos · Ulyses |
| Catfeed | https://animalfood.com.ar/catfeed/ |
| IronPet Gatos | https://animalfood.com.ar/irongatos/ |
| Ulyses | https://animalfood.com.ar/ulyses/ |
| Venta mayorista | https://animalfood.com.ar/venta-mayorista/ |

> Nota: el sitio muestra **8 líneas** (no hay Enercat). Coincide con que Enercat sigue "Needs data" en el Brand Registry.

## 2. Catálogo por línea

### 🐶 Perros

**Canfeed** — *"el premio a la lealtad"* · **Super premium+**
- Sistema **Five S Plus** (huesos/músculos, piel/pelo, digestivo, dental, órganos vitales + taurina/antioxidantes).
- Etapas: **Cachorros** (todas las razas) · **Adultos** (chico/mediano/grande × actividad baja/media/alta) · **Mature & Weight Control** (senior / control de peso).
- Bocado **"Mordida"** en 3 tamaños: **SSB** (chico), **SMB** (chico-mediano), **LB** (grande).
- Presentaciones: Cachorros 3/15/20 kg · Adultos 3/7,5/15/20 kg · Mature 3/15 kg.
- Color: negro/blanco + acentos tostado/beige.

**Enercan** — *"energía que hace bien"* · **Funcional**
- **Monoproteína de cerdo + cúrcuma natural**. Para perros **activos**, medianos/grandes; perfil con sensibilidades digestivas/piel.
- Presentaciones: **20 kg** · **20+2 kg (Pack Protegido)**.
- Color: negro + naranja/dorado (temática cúrcuma).
- ⚠️ El sitio usa "menos alergias" y "antioxidante/antiinflamatorio natural" → **claims a NO repetir en el totem** (ver §4).

**IronPet Perros** — *"nutrición sobre todas las cosas"* · **Calidad/accesible**
- Etapas: **Cachorros** (hasta 12 meses) · **Adultos** · **Premium** (perro atleta adulto).
- Tamaños: chico (5-10 kg) · mediano (10-25 kg) · grande (25-40 kg+).
- Presentaciones: chico/mediano 3/7,5/15/20 kg · grande 15/20 kg.
- Color: negro/oscuro + blanco.

**Puro** — *"puro amor por tu mascota"* · **Simple/natural**
- "Nutrición simple, sin saborizantes ni colorantes artificiales". Todos los perros, guía por peso/actividad.
- Presentación: **20 kg** (única).
- Color: negro + dorado/crema.

**SuperPet** — *"active dogs food"* · **Valor/activo**
- Etapas: **Cachorros** (15 kg) · **Adultos** (10 kg, 22 kg).
- Color: negro/oscuro.

### 🐱 Gatos

**Catfeed** — *"el premio a la lealtad"* · **Premium**
- **Five S Plus** felino (inmunidad, salud urinaria, órganos vitales, digestión, piel/pelo). Proteína: **pollo**.
- Etapas: **Kitten** (1-12 m) · **Adultos** (sedentario/moderado/activo) · **Sterilized & Weight Control**.
- Presentaciones: Kitten 1,5/3/7,5 kg · Adultos 1,5/3/7,5/20 kg · Sterilized 1,5/3/7,5 kg.
- Color: azul marino/oscuro + blanco.

**IronPet Gatos** — *"nutrición sobre todas las cosas"* · **Calidad/accesible**
- Etapas: **Kitten** (hasta 12 m) · **Adultos** (todas las razas). Usa **"Protect Pack"**.
- Presentaciones: Kitten 1,5/3/7,5 kg · Adultos 0,5/1,5/3/7,5/15 kg.
- Color: negro/oscuro.

**Ulyses** — *"calidad al mejor precio"* · **Económico**
- Proteína: **salmón** (pescado fresco), 100% natural sin colorantes. Gato adulto (también reproducción/lactancia).
- Presentación: **10 kg** (única).
- Color: naranja/salmón + azul marino/negro.

## 3. Implicancias para la tabla de recomendación del totem

Ahora hay estructura REAL para mapear `especie × etapa × tamaño × actividad → línea`:
- **Perro premium / salud integral** → Canfeed (etapa: cachorro/adulto/mature; tamaño define Mordida SSB/SMB/LB).
- **Perro activo / sensibilidad** → Enercan (monoproteína cerdo) — sin claim médico.
- **Perro accesible / performance** → IronPet (cachorro/adulto/premium-atleta).
- **Perro simple / sin aditivos** → Puro.
- **Perro valor** → SuperPet.
- **Gato premium** → Catfeed (kitten/adulto/sterilized).
- **Gato accesible** → IronPet Gatos (kitten/adulto).
- **Gato económico** → Ulyses (salmón).

> La **decisión final de qué línea para qué caso** la confirman Gonzalo + Roberto (negocio). Esto solo da el universo real para armar la tabla — reemplaza al placeholder actual del prototipo.

## 4. Notas de claims (para el `claimsGuard` del totem)

- **Enercan:** se puede decir "monoproteína de cerdo con cúrcuma" (hecho de producto). **NO** repetir "menos alergias", "antiinflamatorio", "antioxidante" como promesa → es claim funcional/médico. Si el cliente declara alergia, el totem **deriva al veterinario** igual.
- **Canfeed/Catfeed:** "Five S Plus · Salud Total" y nombres de pilares = OK. Evitar AAFCO, estadísticas no verificadas, barreras de humedad/multicapa.
- **Puro/Ulyses:** "sin colorantes/saborizantes artificiales", "natural" = OK (lo dice el sitio). Sin precios fijos.
- General: real packshots sí; sin "+X% YoY"; IronPet nunca como "Canfeed más barato".

## 5. Assets (URLs oficiales para descargar)

> El download automático lo bloqueó el sandbox. Bajalos a `animalfood-advisor/public/assets/packs/` (bolsas) y `/brand` (logos).

**Bolsas (packshots PNG):**
```
Canfeed   https://animalfood.com.ar/wp-content/uploads/2024/05/Canfeed_Cachorros_Bolsas_1.png
Canfeed   https://animalfood.com.ar/wp-content/uploads/2024/05/Canfeed_Adultos_Bolsas_1.png
Canfeed   https://animalfood.com.ar/wp-content/uploads/2024/05/Canfeed_MAture_Bolsas_1.png
Enercan   https://animalfood.com.ar/wp-content/uploads/2025/05/Enercan_Bolsas_1.png
IronPerro https://animalfood.com.ar/wp-content/uploads/2024/12/Iron_PCachorros_Bolsas_1.png
IronPerro https://animalfood.com.ar/wp-content/uploads/2024/12/Iron_PAdultos_Bolsas_1.png
IronPerro https://animalfood.com.ar/wp-content/uploads/2024/12/Iron_PPremium_Bolsas_1.png
Puro      https://animalfood.com.ar/wp-content/uploads/2024/05/Puro_Bolsas_1.png
SuperPet  https://animalfood.com.ar/wp-content/uploads/2024/12/SuperPet_Cachorros_Bolsas_1.png
SuperPet  https://animalfood.com.ar/wp-content/uploads/2024/12/SuperPet_Adultos_Bolsas_1.png
Catfeed   https://animalfood.com.ar/wp-content/uploads/2024/12/Catfeed_Kitten_Bolsas_1.png
Catfeed   https://animalfood.com.ar/wp-content/uploads/2024/12/Catfeed_Adultos_Bolsas_1.png
Catfeed   https://animalfood.com.ar/wp-content/uploads/2024/12/Catfeed_Sterilized_Bolsas_1.png
IronGato  https://animalfood.com.ar/wp-content/uploads/2024/12/Iron_GKitten_Bolsas_2.png
IronGato  https://animalfood.com.ar/wp-content/uploads/2024/12/Iron_GAdultos_Bolsas_1.png
Ulyses    https://animalfood.com.ar/wp-content/uploads/2024/12/Ulyses_Bolsas_1.png
```

**Logos / marca:**
```
AnimalFood  https://animalfood.com.ar/wp-content/uploads/2024/05/Animalfood_MarcaNegativo.png
Canfeed     https://animalfood.com.ar/wp-content/uploads/2024/05/Canfeed_Logo_1.png
Enercan     https://animalfood.com.ar/wp-content/uploads/2025/05/Enercan_Logo_1.png
AAFCO       https://animalfood.com.ar/wp-content/uploads/2024/05/AFFCO.png
```
> Faltan logos sueltos de IronPet/Puro/SuperPet/Catfeed/IronGatos/Ulyses como archivo aislado: están dentro de las páginas (`Marcas_*.png`, `*_Marca_*.png`) o como tiles del home (`W23_02_Home_*`). Si los necesitás aislados, los ubico en cada página.

## 6. Pendiente / a confirmar con Roberto
- **Colores oficiales por línea (HEX/Pantone)** — la auditoría infiere colores de las imágenes; falta el brand kit oficial.
- **Tipografía oficial.**
- Confirmar la **tabla de recomendación final** (qué línea para qué perfil).
- Enercat: sigue sin existir en el sitio → "Needs data".
