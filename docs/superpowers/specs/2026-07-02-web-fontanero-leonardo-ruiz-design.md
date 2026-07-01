# Web "Fontanero Termos Eléctricos Leonardo Ruiz" — Spec

## 1. Objetivo y contexto

Web informativa + captación de clientes locales para un fontanero autónomo
en Sevilla, especializado en instalación y reparación de termos eléctricos.
Sin backend, sin CMS, sin lógica de negocio: prioridad absoluta en velocidad
de carga, Core Web Vitals y SEO local. Astro + Tailwind, desplegado
estáticamente en Netlify.

## 2. Stack técnico

- **Astro** (última estable) con `@astrojs/tailwind` y `@astrojs/sitemap`.
- Salida estática (`output: 'static'`), sin adapter SSR.
- Tailwind CSS, mobile-first.
- Despliegue: Netlify (`netlify.toml`: build `npm run build`, publish `dist`).
- Formulario de contacto: Netlify Forms (`data-netlify="true"` + campo oculto
  `form-name`), redirección a `/gracias`.
- Idioma: `lang="es"`, español de España.

## 3. Datos de negocio (NAP — fuente única de verdad)

Centralizados en `/src/data/business.ts` para que todos los componentes
(`SEOHead`, `Footer`, JSON-LD) lean del mismo sitio y no haya inconsistencias:

- Nombre: Fontanero Termos Eléctricos Leonardo Ruiz
- Actividad: Fontanero, especializado en instalación y reparación de termos eléctricos
- Dirección: San Luis, Casco Antiguo, 41003 Sevilla
- Teléfono: 651 91 25 07 (`tel:+34651912507`)
- Valoración: 5,0 / 5 sobre 45 reseñas en Google
- Zona de servicio: Sevilla capital y alrededores
- Horario:
  - Lunes a jueves: 9:00–20:00
  - Viernes: 9:00–14:00
  - Sábado y domingo: cerrado
- Enlace ficha Google Maps (provisional):
  `https://www.google.com/maps/search/?api=1&query=Fontanero+Termos+Electricos+Leonardo+Ruiz+San+Luis+Casco+Antiguo+Sevilla`

## 4. Estructura de páginas

| Ruta | Contenido |
|---|---|
| `/` | Hero, servicios destacados (resumen), sello 5,0★/45 reseñas, reseñas destacadas, zona de cobertura, CTA contacto/llamada, horario |
| `/servicios` | Listado detallado de 6 servicios |
| `/sobre-nosotros` | Presentación de Leonardo Ruiz, forma de trabajar, valores |
| `/opiniones` | Todas las reseñas + enlace para dejar una nueva en Google |
| `/contacto` | Teléfono, horario, zona, formulario Netlify, mapa embebido |
| `/gracias` | Página de agradecimiento tras envío del formulario |
| `/aviso-legal` | LSSI-CE |
| `/politica-privacidad` | RGPD |
| `/politica-cookies` | Política de cookies + banner de consentimiento |

`Header` (nav completa + botón de llamada `tel:` fijo en móvil) y `Footer`
(NAP + horario resumido + enlace a Google Maps) presentes en todas las páginas.

## 5. Componentes (`/src/components/`)

- `Header.astro` — navegación + CTA de llamada directa, sticky en móvil.
- `Footer.astro` — NAP, horario resumido, enlace ficha Google Maps.
- `Hero.astro` — H1 + subtítulo + CTA, imagen eager.
- `ServiceCard.astro` — icono lineal + título + descripción.
- `ReviewCard.astro` — nombre, tiempo transcurrido, texto de reseña.
- `CTAButton.astro` — botón de acento (ámbar) reutilizable, variantes tel/enlace.
- `MapEmbed.astro` — iframe Google Maps centrado en San Luis, Casco Antiguo.
- `SEOHead.astro` — title/description únicos, OG, Twitter Cards, JSON-LD
  `Plumber` + `AggregateRating` + `Review` (recibe props por página, lee NAP
  de `business.ts`).
- `CookieBanner.astro` — única isla interactiva (Astro island con JS mínimo),
  aceptar/rechazar cookies técnicas/analíticas.

## 6. Copy de marketing (ya redactado, sin placeholders)

### Hero (Home)
**H1:** "Fontanero en Sevilla especialista en termos eléctricos"
**Subtítulo:** "Instalación y reparación urgente de termos eléctricos en Casco Antiguo y toda Sevilla. Leonardo Ruiz responde rápido, sin sorpresas y con trato cercano — 5,0★ en 45 reseñas de Google."

### Sobre nosotros (3-4 párrafos)
"Soy Leonardo Ruiz, fontanero autónomo en Sevilla especializado en termos
eléctricos. Llevo años ayudando a vecinos del Casco Antiguo y de toda la
ciudad a resolver desde una avería urgente hasta la instalación completa de
un termo nuevo, y lo hago yo mismo, de principio a fin: no hay intermediarios
ni cuadrillas distintas cada vez que llamas.

Sé que un termo estropeado o una fuga de agua no esperan, así que mi forma
de trabajar se basa en responder rápido y dar la cara desde el primer
momento. Muchos clientes destacan precisamente eso en sus reseñas: que en
menos de 24-48 horas desde la primera llamada ya tenían el problema resuelto,
incluso averías que otros profesionales no habían conseguido solucionar en
semanas.

Trabajo con seriedad y sin tecnicismos innecesarios: te explico qué le pasa
a tu instalación, qué opciones tienes y cuál te conviene, sin liarte. Cuido
cada instalación como si fuera la de mi propia casa, dejando el trabajo
limpio y probado antes de irme.

Si buscas un fontanero de confianza en Sevilla que conozca bien los termos
eléctricos y te trate como a un vecino más, estoy a un teléfono de
distancia."

### Servicios (`/servicios`, 60-100 palabras cada uno)

**Instalación de termos eléctricos**
"Instalo termos eléctricos de todas las marcas y capacidades, adaptados al
consumo real de tu vivienda en Sevilla. Antes de instalar, valoro el espacio,
la instalación eléctrica existente y tus necesidades de agua caliente para
recomendarte el equipo adecuado, ni más grande ni más pequeño de lo que
necesitas. La instalación incluye conexiones de agua y electricidad,
purgado y prueba de funcionamiento antes de darla por terminada, para que
tengas agua caliente sin sorpresas desde el primer día."

**Reparación y mantenimiento de termos eléctricos**
"Si tu termo eléctrico no calienta, gotea o hace ruidos extraños, reviso la
resistencia, el termostato, el ánodo y las conexiones para encontrar la
avería real, no solo el síntoma. Muchas averías se solucionan con una
reparación sencilla sin necesidad de cambiar el equipo completo. También
ofrezco mantenimiento preventivo periódico para alargar la vida útil de tu
termo y evitar averías justo cuando más lo necesitas, típicamente en pleno
invierno."

**Sustitución urgente de termos averiados**
"Un termo que deja de funcionar es de las averías que menos pueden esperar,
por eso priorizo estas visitas y suelo tener disponibilidad para
instalaciones urgentes en Sevilla en cuestión de días, a veces el mismo día
siguiente a tu llamada. Retiro el termo averiado, instalo el nuevo equipo y
dejo la zona probada y funcionando, minimizando el tiempo que tu casa está
sin agua caliente."

**Reparación de fugas de agua**
"Localizo y reparo fugas de agua en tuberías, juntas y conexiones antes de
que se conviertan en un problema mayor para tu vivienda: humedades, manchas
en el techo o facturas de agua disparadas. Trabajo tanto en fugas visibles
como en fugas más difíciles de localizar, buscando siempre solucionar el
origen y no solo el síntoma. Servicio disponible en Sevilla capital y
alrededores."

**Instalación y reparación de grifería**
"Instalo y reparo grifos de cocina, baño y lavadero, desde una simple
sustitución de grifo hasta la resolución de goteos, presión baja o piezas
desgastadas. Trabajo con cuidado para dejar la zona limpia y el grifo
funcionando de forma silenciosa y sin fugas, comprobando la instalación
antes de finalizar el servicio."

**Fontanería general para vivienda**
"Además de termos eléctricos, atiendo revisiones y pequeñas averías de
fontanería en el día a día de tu vivienda en Sevilla: atascos, cisternas,
válvulas, pequeñas reparaciones de tuberías y todo lo que necesites resolver
en casa sin tener que buscar un fontanero distinto para cada cosa."

### Introducción a Opiniones
"La confianza se gana visita a visita. Estas son algunas de las reseñas
reales que mis clientes han dejado en Google, con una valoración media de
5,0 sobre 45 opiniones. Si ya has trabajado conmigo, me ayudas mucho
dejando tu reseña en la ficha de Google del negocio."

### Reseñas reales (usar tal cual)
1. "Instalación rápida y profesional. El grifo quedó perfecto y
   funcionando sin problemas. Muy recomendable." — cara biglang-awa, hace 1 mes
2. "Solo tengo palabras de agradecimiento a la labor de Leonardo. Rapidez,
   profesionalidad, responsabilidad y empatía. Solo un día después de
   contactar con él, tenía instalado el nuevo termo." — Jesús Domínguez, hace 3 meses
3. "La experiencia con Leo ha sido maravillosa. Resolutivo, rápido,
   cuidadoso, trato inmejorable. Me ha solucionado en menos de una semana
   lo que otros no habían podido solucionar en dos meses." — Ana Mª Gavira Muñoz, hace 9 meses

## 7. Diseño visual

- **Colores**: azul petróleo `#0F3B5C` (principal), ámbar `#E8892B` (acento/CTA),
  grises cálidos + blanco roto de fondo.
- **Tipografía**: Outfit (titulares, semibold/bold), Inter (cuerpo,
  regular/medium), `font-display: swap`.
- **Estilo**: aire generoso, esquinas redondeadas suaves, iconografía lineal
  (sin emojis), fotografía real de baños/termos en vez de ilustraciones.
- **Imágenes**: fotos de stock libres de derechos (Unsplash/Pexels) de baños
  y termos eléctricos — decisión confirmada con el usuario. Formato WebP,
  `alt` descriptivo con "Sevilla"/servicio, `loading="lazy"` salvo Hero (`eager`).

## 8. SEO técnico (checklist obligatorio)

- `<title>` + `meta description` únicos por página (incluyen "Sevilla" +
  servicio principal).
- JSON-LD `Plumber` global en `<head>`: NAP, `telephone: "+34651912507"`,
  `address`, `areaServed: "Sevilla"`, `priceRange: "$$"`,
  `openingHoursSpecification` con el horario exacto.
- `AggregateRating`: `ratingValue: "5.0"`, `reviewCount: "45"`.
- Bloque `Review` con las 3 reseñas reales.
- Open Graph + Twitter Cards en todas las páginas, `og:locale: es_ES`.
- `sitemap.xml` (`@astrojs/sitemap`) + `robots.txt` permitiendo indexación completa.
- Todas las imágenes con `alt` descriptivo y `loading="lazy"` (salvo Hero).
- Diseño mobile-first, CTA de llamada accesible con una mano en móvil.
- Enlace directo a ficha de Google Maps en Footer y `/contacto`.
- Iframe de Google Maps en `/contacto` centrado en San Luis, Casco Antiguo, Sevilla.

## 9. Testing y verificación

Sitio estático sin lógica compleja: no se justifica una suite de tests
automatizados. Verificación manual antes de dar por completado:
- `npm run build` sin errores ni warnings de Astro.
- Revisión visual en navegador de las 9 páginas (desktop + mobile).
- Envío de prueba del formulario de contacto y redirección a `/gracias`.
- Verificar JSON-LD con una herramienta de validación de datos estructurados.

## 10. Fuera de alcance / pendiente de confirmar con el cliente

- Rango de precios (no disponible).
- Redes sociales (no disponibles).
- Enlace directo real a la ficha de Google Maps (se usa URL de búsqueda
  provisional hasta que el cliente la facilite).
- Fotos reales del negocio más allá del stock libre de derechos usado ahora.

## 11. Entregable adicional

Archivo `CLAUDE.md` en la raíz del proyecto con contexto de negocio,
convenciones y pendientes, para dar continuidad a futuras iteraciones
(contenido ya definido en el prompt original del cliente).
