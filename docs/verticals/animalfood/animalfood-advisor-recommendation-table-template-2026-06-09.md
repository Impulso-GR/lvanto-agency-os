# AnimalFood Advisor — Tabla de Recomendación (plantilla para completar)

> **Para:** Gonzalo + Roberto (definición de negocio) · **Fecha:** 2026-06-09
> **Qué es:** la lógica que decide **qué línea recomienda el totem** según las respuestas del cliente. Hoy el prototipo usa un mapeo **PROVISORIO** (hecho por Lvanto desde la auditoría del sitio). Acá lo confirman/ajustan. Al cerrarlo, se carga en un solo archivo (`src/data/recommendationTable.ts`) y deja de ser provisorio.
> **Reglas innegociables (claims):** sin claims médicos; **Enercan NO dice "menos alergias"** (es del sitio, no del totem); sin precios fijos de AnimalFood; IronPet nunca como "Canfeed más barato"; si el cliente declara **alergia → el totem deriva al veterinario** (no recomienda producto).

---

## 1. Qué pregunta el totem (inputs)

1. **Especie:** perro / gato
2. **Edad:** cachorro (o kitten) / adulto / senior
3. **Porte** (solo perros): chico / mediano / grande
4. **Actividad** (solo perro adulto): activo / tranquilo
5. **Alergia:** no / sí / no sé → **Sí = deriva al veterinario**

> El cuestionario es **adaptativo**: al gato no le pregunta porte ni actividad; la actividad solo se pregunta en perro adulto.

---

## 2. Mapeo a confirmar — PERROS 🐶

| Caso (edad · actividad) | Línea PROVISORIA (Lvanto) | **Línea confirmada (Roberto)** | Frase corta a mostrar | 3 beneficios |
|---|---|---|---|---|
| **Cachorro** | Canfeed **Cachorros** | _______ | Nutrición super premium | Five S Plus · Acompaña su crecimiento · Súper premium |
| **Adulto · Activo** | **Enercan** | _______ | Energía que hace bien | Energía sostenida · Monoproteína de cerdo + cúrcuma · Para perros activos |
| **Adulto · Tranquilo** | Canfeed **Adultos** | _______ | Nutrición super premium | Five S Plus · Cuida su salud integral · Súper premium |
| **Senior** | Canfeed **Mature & Weight Control** | _______ | Súper premium · etapa madura | Control de peso · Etapa madura · Súper premium |

**Bocado Canfeed por porte** (dato real del catálogo, se muestra como detalle): chico → **SSB** · mediano → **SMB** · grande → **LB**.

---

## 3. Mapeo a confirmar — GATOS 🐱

| Caso (edad) | Línea PROVISORIA (Lvanto) | **Línea confirmada (Roberto)** | Frase corta | 3 beneficios |
|---|---|---|---|---|
| **Kitten** | Catfeed **Kitten** | _______ | Nutrición premium felina | Five S Plus felino · Base de pollo · Acompaña su crecimiento |
| **Adulto** | Catfeed **Adultos** | _______ | Nutrición premium felina | Five S Plus felino · Base de pollo · Nutrición premium |
| **Senior** | Catfeed **Sterilized & Weight Control** | _______ | Premium felino · control de peso | Control de peso · Para gatos castrados · Premium felino |

---

## 4. Líneas que HOY el totem NO usa (decisión de Roberto)

El catálogo tiene más líneas. Hoy el totem **lidera con premium** (Canfeed/Catfeed) + **Enercan** para perros activos. Estas quedaron afuera del mapeo provisorio:

| Línea | Tipo | ¿Incluir? ¿En qué caso? |
|---|---|---|
| **IronPet Perros** (Cachorros/Adultos/Premium) | Accesible / performance | _______ |
| **Puro** (20 kg) | Simple / natural | _______ |
| **SuperPet** (Cachorros/Adultos) | Valor / activo | _______ |
| **IronPet Gatos** (Kitten/Adultos) | Accesible | _______ |
| **Ulyses** (salmón, 10 kg) | Económico | _______ |

> ⚠️ Para recomendar por **precio/presupuesto** (ej. derivar a IronPet/Puro/SuperPet/Ulyses como opción económica) habría que **agregar una pregunta** al totem (ej. "¿buscás premium o más accesible?"). **¿Lo sumamos?** _______

---

## 5. Para completar (Roberto)

- [ ] Confirmar o cambiar cada **línea recomendada** (columnas vacías de §2 y §3).
- [ ] Confirmar las **frases y beneficios** (que no haya ningún claim que no quieran).
- [ ] Decidir si entran las **líneas de §4** y si se agrega la **pregunta de presupuesto**.
- [ ] Confirmar **Enercat**: sigue sin existir en el sitio (Needs data) → hoy no se recomienda. ¿Va a haber?

Cuando esté completo, Lvanto lo carga y el totem recomienda con la lógica **oficial**.
