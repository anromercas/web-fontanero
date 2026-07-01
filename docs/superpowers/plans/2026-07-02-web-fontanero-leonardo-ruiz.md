# Web Fontanero Termos Eléctricos Leonardo Ruiz Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir la web estática en Astro + Tailwind para "Fontanero Termos Eléctricos Leonardo Ruiz", con las 9 páginas, componentes reutilizables, JSON-LD local SEO, formulario Netlify y despliegue estático, lista para `npm run dev` / `npm run build`.

**Architecture:** Astro con salida estática (`output: 'static'`), integraciones oficiales `@astrojs/tailwind` y `@astrojs/sitemap`. Datos de negocio (NAP, horario, reseñas, servicios) centralizados en `/src/data/`, consumidos por un `BaseLayout.astro` compartido que inyecta `SEOHead` (title/description/OG/Twitter/JSON-LD), `Header`, `Footer` y `CookieBanner`. Cada página pasa solo su copy específico.

**Tech Stack:** Astro (última estable), `@astrojs/tailwind`, `@astrojs/sitemap`, Tailwind CSS 3, `@fontsource/outfit`, `@fontsource/inter`, Netlify (build estático + Netlify Forms).

**Nota sobre testing:** este es un sitio estático informativo sin lógica de negocio (spec, sección 9). No se usa TDD con suite automatizada; cada tarea se verifica con `npm run build` (sin errores) y, cuando aplica, con `grep` sobre el HTML generado para confirmar que el contenido esperado está presente.

---

## Task 1: Scaffolding del proyecto Astro

**Files:**
- Create: proyecto Astro completo en el directorio actual (`package.json`, `astro.config.mjs`, `tsconfig.json`, `tailwind.config.mjs`, `.gitignore`, `src/pages/index.astro` por defecto)

- [ ] **Step 1: Crear el proyecto Astro con plantilla mínima**

```bash
npm create astro@latest . -- --template minimal --install --no-git --typescript strict --yes
```

Expected: termina con `astro   Liftoff confirmed. Explore your project!` y se crean `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/pages/index.astro`, `public/`.

- [ ] **Step 2: Añadir integración Tailwind**

```bash
npx astro add tailwind --yes
```

Expected: instala `tailwindcss`, `@astrojs/tailwind`, `autoprefixer`, crea `tailwind.config.mjs` y añade `tailwind()` a `astro.config.mjs`.

- [ ] **Step 3: Añadir integración Sitemap**

```bash
npx astro add sitemap --yes
```

Expected: instala `@astrojs/sitemap` y añade `sitemap()` a `astro.config.mjs`.

- [ ] **Step 4: Verificar que el proyecto compila**

```bash
npm run build
```

Expected: `astro build` termina con `Complete!` sin errores.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: scaffold proyecto Astro con Tailwind y Sitemap"
```

---

## Task 2: Fuentes y estilos globales

**Files:**
- Modify: `astro.config.mjs` (añadir campo `site`)
- Modify: `tailwind.config.mjs` (paleta de color y tipografías)
- Modify: `src/styles/global.css` (crear si no existe)
- Modify: `package.json` (dependencias de fuentes)

- [ ] **Step 1: Instalar fuentes autoalojadas**

```bash
npm install @fontsource/outfit @fontsource/inter
```

Expected: se añaden ambos paquetes a `dependencies` en `package.json`.

- [ ] **Step 2: Configurar `site` en `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// TODO pendiente: sustituir por el dominio real de Netlify (o dominio propio)
// en cuanto el cliente conecte el repo y lo confirme. Ver CLAUDE.md > Pendiente.
export default defineConfig({
  site: 'https://fontanero-leonardo-ruiz-sevilla.netlify.app',
  integrations: [tailwind(), sitemap()],
});
```

- [ ] **Step 3: Editar `tailwind.config.mjs` con la paleta e tipografías del proyecto**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        petroleo: {
          DEFAULT: '#0F3B5C',
          dark: '#0A2A42',
          light: '#1B5580',
        },
        ambar: {
          DEFAULT: '#E8892B',
          dark: '#C96F1A',
          light: '#F0A55C',
        },
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 4: Crear `src/styles/global.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply antialiased;
}
```

- [ ] **Step 5: Verificar build**

```bash
npm run build
```

Expected: build sin errores (todavía no se usa `global.css` en ninguna página, se conectará en la Task 5).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: configura paleta de color, tipografia y fuentes autoalojadas"
```

---

## Task 3: Datos de negocio centralizados

**Files:**
- Create: `src/data/business.ts`
- Create: `src/data/serviceIcons.ts`

- [ ] **Step 1: Crear `src/data/business.ts`**

```ts
export interface Review {
  author: string;
  timeAgo: string;
  text: string;
}

export interface Service {
  slug: string;
  title: string;
  description: string;
}

export const business = {
  name: 'Fontanero Termos Eléctricos Leonardo Ruiz',
  legalActivity:
    'Fontanero especializado en instalación y reparación de termos eléctricos',
  telephone: '651 91 25 07',
  telephoneE164: '+34651912507',
  telephoneHref: 'tel:+34651912507',
  address: {
    streetAddress: 'San Luis, Casco Antiguo',
    postalCode: '41003',
    addressLocality: 'Sevilla',
    addressRegion: 'Sevilla',
    addressCountry: 'ES',
  },
  areaServed: 'Sevilla',
  priceRange: '$$',
  ratingValue: '5.0',
  reviewCount: '45',
  googleMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Fontanero+Termos+Electricos+Leonardo+Ruiz+San+Luis+Casco+Antiguo+Sevilla',
  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '09:00', closes: '20:00' },
    { days: ['Friday'], opens: '09:00', closes: '14:00' },
  ],
  openingHoursDisplay: [
    { label: 'Lunes a jueves', hours: '9:00–20:00' },
    { label: 'Viernes', hours: '9:00–14:00' },
    { label: 'Sábado y domingo', hours: 'Cerrado' },
  ],
} as const;

export const reviews: Review[] = [
  {
    author: 'cara biglang-awa',
    timeAgo: 'hace 1 mes',
    text: 'Instalación rápida y profesional. El grifo quedó perfecto y funcionando sin problemas. Muy recomendable.',
  },
  {
    author: 'Jesús Domínguez',
    timeAgo: 'hace 3 meses',
    text: 'Solo tengo palabras de agradecimiento a la labor de Leonardo. Rapidez, profesionalidad, responsabilidad y empatía. Solo un día después de contactar con él, tenía instalado el nuevo termo.',
  },
  {
    author: 'Ana Mª Gavira Muñoz',
    timeAgo: 'hace 9 meses',
    text: 'La experiencia con Leo ha sido maravillosa. Resolutivo, rápido, cuidadoso, trato inmejorable. Me ha solucionado en menos de una semana lo que otros no habían podido solucionar en dos meses.',
  },
];

export const services: Service[] = [
  {
    slug: 'instalacion-termos',
    title: 'Instalación de termos eléctricos',
    description:
      'Instalo termos eléctricos de todas las marcas y capacidades, adaptados al consumo real de tu vivienda en Sevilla. Antes de instalar, valoro el espacio, la instalación eléctrica existente y tus necesidades de agua caliente para recomendarte el equipo adecuado, ni más grande ni más pequeño de lo que necesitas. La instalación incluye conexiones de agua y electricidad, purgado y prueba de funcionamiento antes de darla por terminada, para que tengas agua caliente sin sorpresas desde el primer día.',
  },
  {
    slug: 'reparacion-termos',
    title: 'Reparación y mantenimiento de termos eléctricos',
    description:
      'Si tu termo eléctrico no calienta, gotea o hace ruidos extraños, reviso la resistencia, el termostato, el ánodo y las conexiones para encontrar la avería real, no solo el síntoma. Muchas averías se solucionan con una reparación sencilla sin necesidad de cambiar el equipo completo. También ofrezco mantenimiento preventivo periódico para alargar la vida útil de tu termo y evitar averías justo cuando más lo necesitas, típicamente en pleno invierno.',
  },
  {
    slug: 'sustitucion-urgente',
    title: 'Sustitución urgente de termos averiados',
    description:
      'Un termo que deja de funcionar es de las averías que menos pueden esperar, por eso priorizo estas visitas y suelo tener disponibilidad para instalaciones urgentes en Sevilla en cuestión de días, a veces el mismo día siguiente a tu llamada. Retiro el termo averiado, instalo el nuevo equipo y dejo la zona probada y funcionando, minimizando el tiempo que tu casa está sin agua caliente.',
  },
  {
    slug: 'reparacion-fugas',
    title: 'Reparación de fugas de agua',
    description:
      'Localizo y reparo fugas de agua en tuberías, juntas y conexiones antes de que se conviertan en un problema mayor para tu vivienda: humedades, manchas en el techo o facturas de agua disparadas. Trabajo tanto en fugas visibles como en fugas más difíciles de localizar, buscando siempre solucionar el origen y no solo el síntoma. Servicio disponible en Sevilla capital y alrededores.',
  },
  {
    slug: 'griferia',
    title: 'Instalación y reparación de grifería',
    description:
      'Instalo y reparo grifos de cocina, baño y lavadero, desde una simple sustitución de grifo hasta la resolución de goteos, presión baja o piezas desgastadas. Trabajo con cuidado para dejar la zona limpia y el grifo funcionando de forma silenciosa y sin fugas, comprobando la instalación antes de finalizar el servicio.',
  },
  {
    slug: 'fontaneria-general',
    title: 'Fontanería general para vivienda',
    description:
      'Además de termos eléctricos, atiendo revisiones y pequeñas averías de fontanería en el día a día de tu vivienda en Sevilla: atascos, cisternas, válvulas, pequeñas reparaciones de tuberías y todo lo que necesites resolver en casa sin tener que buscar un fontanero distinto para cada cosa.',
  },
];
```

- [ ] **Step 2: Crear `src/data/serviceIcons.ts`**

```ts
export const serviceIcons: Record<string, string> = {
  'instalacion-termos':
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="7" y="3" width="10" height="18" rx="3"/><path d="M12 8v5l3 2"/></svg>',
  'reparacion-termos':
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.8 2.8-2-2 2.8-2.8z"/></svg>',
  'sustitucion-urgente':
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 9v4M12 17h.01M10.3 3.9 2.5 17a1.5 1.5 0 0 0 1.3 2.2h16.4a1.5 1.5 0 0 0 1.3-2.2L13.7 3.9a1.5 1.5 0 0 0-3.4 0z"/></svg>',
  'reparacion-fugas':
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3c-3.5 5-5.5 8.3-5.5 11a5.5 5.5 0 0 0 11 0C17.5 11.3 15.5 8 12 3z"/></svg>',
  griferia:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 9V6a3 3 0 0 1 3-3h1a3 3 0 0 1 3 3v3"/><path d="M6 9h9a3 3 0 0 1 3 3v0a3 3 0 0 1-3 3h-2v2a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-8z"/></svg>',
  'fontaneria-general':
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 11 12 4l9 7"/><path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9"/></svg>',
};
```

- [ ] **Step 3: Verificar tipado**

```bash
npx astro check
```

Expected: `0 errors` (puede haber warnings de páginas por defecto, no relacionados con estos ficheros).

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: centraliza datos de negocio, resenas, servicios e iconos"
```

---

## Task 4: Componente SEOHead (meta tags + JSON-LD)

**Files:**
- Create: `src/components/SEOHead.astro`

- [ ] **Step 1: Crear el componente**

```astro
---
import { business, reviews } from '../data/business';

interface Props {
  title: string;
  description: string;
  path: string;
  image?: string;
}

const { title, description, path, image = '/images/og-default.jpg' } = Astro.props;
const canonicalURL = new URL(path, Astro.site);
const imageURL = new URL(image, Astro.site);

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Plumber',
  name: business.name,
  image: imageURL.toString(),
  telephone: business.telephoneE164,
  priceRange: business.priceRange,
  areaServed: business.areaServed,
  address: {
    '@type': 'PostalAddress',
    streetAddress: business.address.streetAddress,
    addressLocality: business.address.addressLocality,
    postalCode: business.address.postalCode,
    addressRegion: business.address.addressRegion,
    addressCountry: business.address.addressCountry,
  },
  url: Astro.site?.toString(),
  openingHoursSpecification: business.openingHours.map((h) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: h.days,
    opens: h.opens,
    closes: h.closes,
  })),
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: business.ratingValue,
    reviewCount: business.reviewCount,
  },
  review: reviews.map((r) => ({
    '@type': 'Review',
    author: { '@type': 'Person', name: r.author },
    reviewBody: r.text,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: '5',
      bestRating: '5',
    },
  })),
};
---
<title>{title}</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonicalURL} />

<meta property="og:type" content="website" />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={imageURL} />
<meta property="og:url" content={canonicalURL} />
<meta property="og:locale" content="es_ES" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={imageURL} />

<script type="application/ld+json" set:html={JSON.stringify(jsonLd)} />
```

- [ ] **Step 2: Verificar tipado**

```bash
npx astro check
```

Expected: `0 errors` en `SEOHead.astro`.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: componente SEOHead con OG, Twitter Cards y JSON-LD Plumber"
```

---

## Task 5: Layout base (BaseLayout, favicon)

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `public/favicon.svg`

- [ ] **Step 1: Crear `public/favicon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="8" fill="#0F3B5C"/>
  <path d="M16 6c-4 5.5-6 9-6 12a6 6 0 0 0 12 0c0-3-2-6.5-6-12z" fill="#E8892B"/>
</svg>
```

- [ ] **Step 2: Crear `src/layouts/BaseLayout.astro`** (Header y Footer se crean en las Tasks 6-7; se importan ya aquí porque el layout los referencia)

```astro
---
import '@fontsource/outfit/500.css';
import '@fontsource/outfit/600.css';
import '@fontsource/outfit/700.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '../styles/global.css';
import SEOHead from '../components/SEOHead.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import CookieBanner from '../components/CookieBanner.astro';

interface Props {
  title: string;
  description: string;
  path: string;
  image?: string;
}

const { title, description, path, image } = Astro.props;
---
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <SEOHead title={title} description={description} path={path} image={image} />
  </head>
  <body class="flex min-h-screen flex-col bg-stone-50 font-body text-stone-800">
    <Header />
    <main class="flex-1">
      <slot />
    </main>
    <Footer />
    <CookieBanner />
  </body>
</html>
```

- [ ] **Step 3: Verificar (fallará hasta la Task 8 porque Header/Footer/CookieBanner aún no existen)**

Este archivo queda referenciando componentes que se crean en las Tasks 6, 7 y 13. No ejecutar `npm run build` todavía; se verificará en la Task 13 cuando todas las dependencias existan.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: anade BaseLayout y favicon"
```

---

## Task 6: Componente Header

**Files:**
- Create: `src/components/Header.astro`

- [ ] **Step 1: Crear el componente**

```astro
---
import { business } from '../data/business';

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/sobre-nosotros', label: 'Sobre nosotros' },
  { href: '/opiniones', label: 'Opiniones' },
  { href: '/contacto', label: 'Contacto' },
];

const currentPath = Astro.url.pathname;
---
<header class="sticky top-0 z-40 bg-petroleo text-white shadow-md">
  <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
    <a href="/" class="font-heading text-lg font-bold sm:text-xl">
      Leonardo Ruiz <span class="hidden font-normal text-ambar sm:inline">· Fontanero Sevilla</span>
    </a>

    <nav class="hidden gap-6 font-medium md:flex">
      {navLinks.map((link) => (
        <a
          href={link.href}
          class:list={[
            'transition-colors hover:text-ambar',
            currentPath === link.href && 'text-ambar',
          ]}
        >
          {link.label}
        </a>
      ))}
    </nav>

    <a
      href={business.telephoneHref}
      class="hidden items-center gap-2 rounded-full bg-ambar px-4 py-2 font-semibold text-white transition-colors hover:bg-ambar-dark md:inline-flex"
    >
      Llamar ahora
    </a>
  </div>

  <nav class="flex justify-around gap-1 border-t border-white/10 px-2 py-2 text-sm font-medium md:hidden">
    {navLinks.map((link) => (
      <a
        href={link.href}
        class:list={[
          'rounded-md px-2 py-1 transition-colors',
          currentPath === link.href ? 'bg-white/10 text-ambar' : 'hover:text-ambar',
        ]}
      >
        {link.label}
      </a>
    ))}
  </nav>
</header>

<a
  href={business.telephoneHref}
  class="fixed inset-x-4 bottom-4 z-50 flex items-center justify-center gap-2 rounded-full bg-ambar px-6 py-3 text-center font-heading font-semibold text-white shadow-lg sm:hidden"
  aria-label={`Llamar a ${business.name}`}
>
  Llamar ahora · {business.telephone}
</a>
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat: componente Header con navegacion y CTA de llamada fijo en movil"
```

---

## Task 7: Componente Footer

**Files:**
- Create: `src/components/Footer.astro`

- [ ] **Step 1: Crear el componente**

```astro
---
import { business } from '../data/business';

const year = new Date().getFullYear();
---
<footer class="bg-petroleo-dark text-white/90">
  <div class="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
    <div>
      <p class="font-heading text-lg font-semibold text-white">{business.name}</p>
      <p class="mt-2 text-sm">
        {business.address.streetAddress}, {business.address.postalCode} {business.address.addressLocality}
      </p>
      <a href={business.telephoneHref} class="mt-2 inline-block text-ambar hover:underline">
        {business.telephone}
      </a>
    </div>

    <div>
      <p class="font-heading font-semibold text-white">Horario</p>
      <ul class="mt-2 space-y-1 text-sm">
        {business.openingHoursDisplay.map((item) => (
          <li>{item.label}: {item.hours}</li>
        ))}
      </ul>
    </div>

    <div>
      <p class="font-heading font-semibold text-white">Enlaces</p>
      <ul class="mt-2 space-y-1 text-sm">
        <li>
          <a href={business.googleMapsUrl} target="_blank" rel="noopener noreferrer" class="hover:text-ambar">
            Ver ficha en Google Maps
          </a>
        </li>
        <li><a href="/aviso-legal" class="hover:text-ambar">Aviso legal</a></li>
        <li><a href="/politica-privacidad" class="hover:text-ambar">Política de privacidad</a></li>
        <li><a href="/politica-cookies" class="hover:text-ambar">Política de cookies</a></li>
      </ul>
    </div>
  </div>

  <div class="border-t border-white/10 px-4 py-4 text-center text-xs text-white/60 sm:px-6">
    © {year} {business.name}. Todos los derechos reservados.
  </div>
</footer>
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat: componente Footer con NAP, horario y enlace a Google Maps"
```

---

## Task 8: Componente CTAButton

**Files:**
- Create: `src/components/CTAButton.astro`

- [ ] **Step 1: Crear el componente**

```astro
---
import { business } from '../data/business';

interface Props {
  variant?: 'tel' | 'link';
  href?: string;
  label: string;
}

const { variant = 'tel', href, label } = Astro.props;
const finalHref = variant === 'tel' ? business.telephoneHref : href ?? '#';
---
<a
  href={finalHref}
  class="inline-flex items-center justify-center gap-2 rounded-full bg-ambar px-6 py-3 font-heading font-semibold text-white shadow-sm transition-colors hover:bg-ambar-dark"
>
  {label}
</a>
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat: componente CTAButton reutilizable"
```

---

## Task 9: Componente Hero

**Files:**
- Create: `src/components/Hero.astro`

- [ ] **Step 1: Crear el componente** (usa `astro:assets` para optimizar automáticamente a WebP/AVIF)

```astro
---
import { Image } from 'astro:assets';
import type { ImageMetadata } from 'astro';

interface Props {
  title: string;
  subtitle: string;
  image: ImageMetadata;
  imageAlt: string;
}

const { title, subtitle, image, imageAlt } = Astro.props;
---
<section class="bg-petroleo text-white">
  <div class="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 md:py-20">
    <div>
      <h1 class="font-heading text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
        {title}
      </h1>
      <p class="mt-4 text-lg text-white/90">{subtitle}</p>
      <div class="mt-8 flex flex-wrap gap-4">
        <a
          href="tel:+34651912507"
          class="inline-flex items-center justify-center gap-2 rounded-full bg-ambar px-6 py-3 font-heading font-semibold text-white shadow-sm transition-colors hover:bg-ambar-dark"
        >
          Llamar ahora
        </a>
        <a
          href="/contacto"
          class="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-3 font-heading font-semibold text-white transition-colors hover:bg-white/10"
        >
          Pedir presupuesto
        </a>
      </div>
    </div>
    <Image
      src={image}
      alt={imageAlt}
      loading="eager"
      fetchpriority="high"
      width={640}
      height={480}
      class="w-full rounded-2xl object-cover shadow-lg"
    />
  </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat: componente Hero con imagen optimizada via astro:assets"
```

---

## Task 10: Componente ServiceCard

**Files:**
- Create: `src/components/ServiceCard.astro`

- [ ] **Step 1: Crear el componente**

```astro
---
interface Props {
  title: string;
  description: string;
}

const { title, description } = Astro.props;
---
<div class="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
  <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-petroleo/10 text-petroleo">
    <slot name="icon" />
  </div>
  <h3 class="font-heading text-lg font-semibold text-petroleo">{title}</h3>
  <p class="mt-2 text-sm text-stone-600">{description}</p>
</div>
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat: componente ServiceCard"
```

---

## Task 11: Componente ReviewCard

**Files:**
- Create: `src/components/ReviewCard.astro`

- [ ] **Step 1: Crear el componente**

```astro
---
interface Props {
  author: string;
  timeAgo: string;
  text: string;
}

const { author, timeAgo, text } = Astro.props;
---
<figure class="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
  <div class="flex gap-1 text-ambar" aria-hidden="true">
    {Array.from({ length: 5 }).map(() => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4">
        <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.86L12 17.77l-6.18 3.23L7 14.14 2 9.27l7.1-1.01L12 2z" />
      </svg>
    ))}
  </div>
  <blockquote class="mt-3 text-sm text-stone-700">"{text}"</blockquote>
  <figcaption class="mt-4 text-sm font-semibold text-petroleo">
    {author} <span class="font-normal text-stone-500">· {timeAgo}</span>
  </figcaption>
</figure>
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat: componente ReviewCard"
```

---

## Task 12: Componente MapEmbed

**Files:**
- Create: `src/components/MapEmbed.astro`

- [ ] **Step 1: Crear el componente** (embed sin necesidad de API key de Google Maps)

```astro
---
interface Props {
  className?: string;
}

const { className = '' } = Astro.props;
---
<iframe
  src="https://www.google.com/maps?q=San+Luis,+Casco+Antiguo,+41003+Sevilla&output=embed"
  width="100%"
  height="400"
  style="border:0;"
  allowfullscreen
  loading="lazy"
  referrerpolicy="no-referrer-when-downgrade"
  title="Ubicación de Fontanero Termos Eléctricos Leonardo Ruiz en San Luis, Casco Antiguo, Sevilla"
  class={`rounded-2xl ${className}`}
></iframe>
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat: componente MapEmbed"
```

---

## Task 13: Componente CookieBanner y verificación del layout completo

**Files:**
- Create: `src/components/CookieBanner.astro`

- [ ] **Step 1: Crear el componente** (vanilla JS, sin framework, único script del sitio)

```astro
---
---
<div id="cookie-banner" class="fixed inset-x-0 bottom-0 z-50 hidden bg-petroleo text-white p-4 sm:p-6">
  <div class="mx-auto flex max-w-4xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <p class="text-sm sm:text-base">
      Usamos cookies técnicas y analíticas para mejorar tu experiencia. Puedes aceptarlas o rechazarlas.
      Consulta nuestra <a href="/politica-cookies" class="underline font-medium">Política de Cookies</a>.
    </p>
    <div class="flex shrink-0 gap-3">
      <button id="cookie-reject" class="rounded-full border border-white/40 px-4 py-2 text-sm font-medium hover:bg-white/10">
        Rechazar
      </button>
      <button id="cookie-accept" class="rounded-full bg-ambar px-4 py-2 text-sm font-semibold text-white hover:bg-ambar-dark">
        Aceptar
      </button>
    </div>
  </div>
</div>

<script>
  const STORAGE_KEY = 'cookie-consent';
  const banner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('cookie-accept');
  const rejectBtn = document.getElementById('cookie-reject');

  const consent = localStorage.getItem(STORAGE_KEY);
  if (!consent && banner) {
    banner.classList.remove('hidden');
  }

  acceptBtn?.addEventListener('click', () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    banner?.classList.add('hidden');
  });

  rejectBtn?.addEventListener('click', () => {
    localStorage.setItem(STORAGE_KEY, 'rejected');
    banner?.classList.add('hidden');
  });
</script>
```

- [ ] **Step 2: Verificar que `BaseLayout` compila** (ya existen Header, Footer, SEOHead, CookieBanner)

```bash
npx astro check
```

Expected: `0 errors`.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: componente CookieBanner con aceptar/rechazar via localStorage"
```

---

## Task 14: Imágenes reales (stock libre de derechos)

**Files:**
- Create: `src/assets/images/hero-instalacion-termo.jpg`
- Create: `src/assets/images/sobre-nosotros-fontanero.jpg`
- Create: `src/assets/images/servicios-termo-electrico.jpg`
- Create: `public/images/og-default.jpg`

Decisión confirmada con el usuario: usar imágenes de stock libres de derechos (Unsplash/Pexels) de baños y termos eléctricos.

- [ ] **Step 1: Buscar fotos temáticas apropiadas**

Usar `WebSearch` o `WebFetch` sobre `https://unsplash.com/s/photos/water-heater` y `https://unsplash.com/s/photos/bathroom` (o Pexels equivalentes) para localizar 4 fotos bajo licencia Unsplash/Pexels (uso comercial libre, sin atribución obligatoria):
1. Foto de instalación/termo o cuarto de baño moderno para el Hero de Home (orientación horizontal, mínimo 1200px de ancho).
2. Foto de fontanero trabajando o cuarto de baño para "Sobre nosotros".
3. Foto de termo eléctrico o grifería para el banner de "Servicios".
4. Foto horizontal 1200x630 aprox. para `og-default.jpg` (puede reutilizar el mismo motivo que el Hero).

- [ ] **Step 2: Descargar cada imagen con `curl` y verificar que es un JPEG válido**

```bash
mkdir -p src/assets/images public/images
curl -L "<url-directa-de-la-imagen-1>" -o src/assets/images/hero-instalacion-termo.jpg
curl -L "<url-directa-de-la-imagen-2>" -o src/assets/images/sobre-nosotros-fontanero.jpg
curl -L "<url-directa-de-la-imagen-3>" -o src/assets/images/servicios-termo-electrico.jpg
curl -L "<url-directa-de-la-imagen-4>" -o public/images/og-default.jpg
file src/assets/images/*.jpg public/images/og-default.jpg
```

Expected: `file` reporta `JPEG image data` para los 4 archivos, cada uno con tamaño > 20 KB (`ls -la`).

- [ ] **Step 3: Commit** (los binarios de imagen sí se commitean, forman parte del contenido del sitio)

```bash
git add -A
git commit -m "feat: anade imagenes de stock libres de derechos para hero, sobre-nosotros y servicios"
```

---

## Task 15: Página Home (`/`)

**Files:**
- Modify: `src/pages/index.astro` (sobrescribir el contenido por defecto de la plantilla)

- [ ] **Step 1: Escribir la página completa**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
import ServiceCard from '../components/ServiceCard.astro';
import ReviewCard from '../components/ReviewCard.astro';
import CTAButton from '../components/CTAButton.astro';
import { business, reviews, services } from '../data/business';
import { serviceIcons } from '../data/serviceIcons';
import heroImage from '../assets/images/hero-instalacion-termo.jpg';

const featuredServices = services.filter((s) =>
  ['instalacion-termos', 'sustitucion-urgente', 'reparacion-fugas'].includes(s.slug)
);
---
<BaseLayout
  title="Fontanero en Sevilla especialista en termos eléctricos | Leonardo Ruiz"
  description="Fontanero en Sevilla especializado en instalación y reparación de termos eléctricos. Respuesta rápida en Casco Antiguo y toda Sevilla. 5,0★ en 45 reseñas de Google."
  path="/"
>
  <Hero
    title="Fontanero en Sevilla especialista en termos eléctricos"
    subtitle="Instalación y reparación urgente de termos eléctricos en Casco Antiguo y toda Sevilla. Leonardo Ruiz responde rápido, sin sorpresas y con trato cercano — 5,0★ en 45 reseñas de Google."
    image={heroImage}
    imageAlt="Instalación de termo eléctrico en un cuarto de baño en Sevilla"
  />

  <section class="mx-auto max-w-6xl px-4 py-16 sm:px-6">
    <div class="flex items-center justify-center gap-2 rounded-2xl bg-white p-6 text-center shadow-sm">
      <div class="flex text-ambar" aria-hidden="true">
        {Array.from({ length: 5 }).map(() => (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6">
            <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.86L12 17.77l-6.18 3.23L7 14.14 2 9.27l7.1-1.01L12 2z" />
          </svg>
        ))}
      </div>
      <p class="font-heading text-lg font-semibold text-petroleo">
        {business.ratingValue} sobre 5 · {business.reviewCount} reseñas en Google
      </p>
    </div>
  </section>

  <section class="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
    <h2 class="text-center font-heading text-2xl font-bold text-petroleo sm:text-3xl">
      Servicios destacados
    </h2>
    <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {featuredServices.map((service) => (
        <ServiceCard title={service.title} description={service.description}>
          <Fragment slot="icon" set:html={serviceIcons[service.slug]} />
        </ServiceCard>
      ))}
    </div>
    <div class="mt-8 text-center">
      <CTAButton variant="link" href="/servicios" label="Ver todos los servicios" />
    </div>
  </section>

  <section class="bg-white py-16">
    <div class="mx-auto max-w-6xl px-4 sm:px-6">
      <h2 class="text-center font-heading text-2xl font-bold text-petroleo sm:text-3xl">
        Lo que dicen mis clientes
      </h2>
      <div class="mt-8 grid gap-6 md:grid-cols-3">
        {reviews.map((review) => (
          <ReviewCard author={review.author} timeAgo={review.timeAgo} text={review.text} />
        ))}
      </div>
      <div class="mt-8 text-center">
        <CTAButton variant="link" href="/opiniones" label="Ver todas las opiniones" />
      </div>
    </div>
  </section>

  <section class="mx-auto max-w-6xl px-4 py-16 sm:px-6">
    <div class="grid gap-8 rounded-2xl bg-petroleo p-8 text-white sm:p-12 md:grid-cols-2">
      <div>
        <h2 class="font-heading text-2xl font-bold sm:text-3xl">Zona de cobertura y horario</h2>
        <p class="mt-4 text-white/90">
          Atiendo Sevilla capital y alrededores, con especial presencia en el Casco Antiguo. Disponible en:
        </p>
        <ul class="mt-4 space-y-1 text-white/90">
          {business.openingHoursDisplay.map((item) => (
            <li>{item.label}: {item.hours}</li>
          ))}
        </ul>
      </div>
      <div class="flex flex-col items-start justify-center gap-4">
        <p class="text-white/90">
          ¿Necesitas un fontanero de confianza en Sevilla? Llama ahora o pide presupuesto sin compromiso.
        </p>
        <div class="flex flex-wrap gap-4">
          <CTAButton label="Llamar ahora" />
          <CTAButton variant="link" href="/contacto" label="Ir a contacto" />
        </div>
      </div>
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 2: Verificar build y contenido**

```bash
npm run build
grep -o "Fontanero en Sevilla especialista en termos eléctricos" dist/index.html | head -1
grep -o "AggregateRating" dist/index.html | head -1
```

Expected: build sin errores; ambos `grep` devuelven una coincidencia.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: pagina Home con hero, servicios destacados, resenas y cobertura"
```

---

## Task 16: Página Servicios (`/servicios`)

**Files:**
- Create: `src/pages/servicios.astro`

- [ ] **Step 1: Escribir la página**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import ServiceCard from '../components/ServiceCard.astro';
import CTAButton from '../components/CTAButton.astro';
import { services } from '../data/business';
import { serviceIcons } from '../data/serviceIcons';
---
<BaseLayout
  title="Servicios de fontanería y termos eléctricos en Sevilla | Leonardo Ruiz"
  description="Instalación, reparación y sustitución urgente de termos eléctricos en Sevilla, reparación de fugas, grifería y fontanería general. Presupuesto sin compromiso."
  path="/servicios"
>
  <section class="mx-auto max-w-6xl px-4 py-16 sm:px-6">
    <h1 class="font-heading text-3xl font-bold text-petroleo sm:text-4xl">
      Servicios de fontanería en Sevilla
    </h1>
    <p class="mt-4 max-w-2xl text-stone-600">
      Especializado en termos eléctricos, pero resuelvo cualquier avería de fontanería en tu vivienda
      en Sevilla y alrededores. Estos son los servicios que ofrezco:
    </p>

    <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceCard title={service.title} description={service.description}>
          <Fragment slot="icon" set:html={serviceIcons[service.slug]} />
        </ServiceCard>
      ))}
    </div>

    <div class="mt-12 text-center">
      <CTAButton label="Llamar ahora para pedir presupuesto" />
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 2: Verificar build y contenido**

```bash
npm run build
grep -o "Instalación de termos eléctricos" dist/servicios/index.html | head -1
```

Expected: build sin errores; `grep` devuelve una coincidencia.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: pagina Servicios con listado completo de 6 servicios"
```

---

## Task 17: Página Sobre nosotros (`/sobre-nosotros`)

**Files:**
- Create: `src/pages/sobre-nosotros.astro`

- [ ] **Step 1: Escribir la página**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import CTAButton from '../components/CTAButton.astro';
import { Image } from 'astro:assets';
import aboutImage from '../assets/images/sobre-nosotros-fontanero.jpg';
---
<BaseLayout
  title="Sobre Leonardo Ruiz, fontanero en Sevilla | Termos Eléctricos"
  description="Conoce a Leonardo Ruiz, fontanero autónomo en Sevilla especializado en termos eléctricos: rapidez, seriedad y trato cercano en cada visita."
  path="/sobre-nosotros"
>
  <section class="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:items-center">
    <div>
      <h1 class="font-heading text-3xl font-bold text-petroleo sm:text-4xl">
        Sobre Leonardo Ruiz
      </h1>
      <div class="mt-6 space-y-4 text-stone-700">
        <p>
          Soy Leonardo Ruiz, fontanero autónomo en Sevilla especializado en termos eléctricos. Llevo
          años ayudando a vecinos del Casco Antiguo y de toda la ciudad a resolver desde una avería
          urgente hasta la instalación completa de un termo nuevo, y lo hago yo mismo, de principio a
          fin: no hay intermediarios ni cuadrillas distintas cada vez que llamas.
        </p>
        <p>
          Sé que un termo estropeado o una fuga de agua no esperan, así que mi forma de trabajar se
          basa en responder rápido y dar la cara desde el primer momento. Muchos clientes destacan
          precisamente eso en sus reseñas: que en menos de 24-48 horas desde la primera llamada ya
          tenían el problema resuelto, incluso averías que otros profesionales no habían conseguido
          solucionar en semanas.
        </p>
        <p>
          Trabajo con seriedad y sin tecnicismos innecesarios: te explico qué le pasa a tu instalación,
          qué opciones tienes y cuál te conviene, sin liarte. Cuido cada instalación como si fuera la
          de mi propia casa, dejando el trabajo limpio y probado antes de irme.
        </p>
        <p>
          Si buscas un fontanero de confianza en Sevilla que conozca bien los termos eléctricos y te
          trate como a un vecino más, estoy a un teléfono de distancia.
        </p>
      </div>
      <div class="mt-8">
        <CTAButton label="Llamar a Leonardo ahora" />
      </div>
    </div>
    <Image
      src={aboutImage}
      alt="Fontanero trabajando en la instalación de fontanería de una vivienda en Sevilla"
      loading="lazy"
      width={560}
      height={640}
      class="w-full rounded-2xl object-cover shadow-lg"
    />
  </section>
</BaseLayout>
```

- [ ] **Step 2: Verificar build y contenido**

```bash
npm run build
grep -o "Soy Leonardo Ruiz" dist/sobre-nosotros/index.html | head -1
```

Expected: build sin errores; `grep` devuelve una coincidencia.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: pagina Sobre nosotros con presentacion de Leonardo Ruiz"
```

---

## Task 18: Página Opiniones (`/opiniones`)

**Files:**
- Create: `src/pages/opiniones.astro`

- [ ] **Step 1: Escribir la página**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import ReviewCard from '../components/ReviewCard.astro';
import { business, reviews } from '../data/business';
---
<BaseLayout
  title="Opiniones de clientes | Fontanero Leonardo Ruiz Sevilla"
  description="Lee las opiniones reales de clientes de Leonardo Ruiz, fontanero en Sevilla especializado en termos eléctricos: 5,0★ sobre 45 reseñas en Google."
  path="/opiniones"
>
  <section class="mx-auto max-w-6xl px-4 py-16 sm:px-6">
    <h1 class="font-heading text-3xl font-bold text-petroleo sm:text-4xl">Opiniones de clientes</h1>
    <p class="mt-4 max-w-2xl text-stone-600">
      La confianza se gana visita a visita. Estas son algunas de las reseñas reales que mis clientes
      han dejado en Google, con una valoración media de {business.ratingValue} sobre {business.reviewCount}
      opiniones. Si ya has trabajado conmigo, me ayudas mucho dejando tu reseña en la ficha de Google
      del negocio.
    </p>

    <div class="mt-10 grid gap-6 md:grid-cols-3">
      {reviews.map((review) => (
        <ReviewCard author={review.author} timeAgo={review.timeAgo} text={review.text} />
      ))}
    </div>

    <div class="mt-12 text-center">
      <a
        href={business.googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center justify-center gap-2 rounded-full bg-ambar px-6 py-3 font-heading font-semibold text-white shadow-sm transition-colors hover:bg-ambar-dark"
      >
        Dejar una reseña en Google
      </a>
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 2: Verificar build y contenido**

```bash
npm run build
grep -o "Dejar una reseña en Google" dist/opiniones/index.html | head -1
```

Expected: build sin errores; `grep` devuelve una coincidencia.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: pagina Opiniones con resenas y enlace a Google"
```

---

## Task 19: Página Contacto (`/contacto`) con formulario Netlify y mapa

**Files:**
- Create: `src/pages/contacto.astro`

- [ ] **Step 1: Escribir la página**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import MapEmbed from '../components/MapEmbed.astro';
import { business } from '../data/business';
---
<BaseLayout
  title="Contacto | Fontanero Leonardo Ruiz en San Luis, Casco Antiguo, Sevilla"
  description="Contacta con Leonardo Ruiz, fontanero en Sevilla especializado en termos eléctricos. Teléfono, horario, zona de servicio y formulario de contacto."
  path="/contacto"
>
  <section class="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2">
    <div>
      <h1 class="font-heading text-3xl font-bold text-petroleo sm:text-4xl">Contacto</h1>
      <p class="mt-4 text-stone-600">
        ¿Necesitas un fontanero en Sevilla? Llama directamente o rellena el formulario y te responderé
        lo antes posible.
      </p>

      <dl class="mt-8 space-y-4 text-stone-700">
        <div>
          <dt class="font-heading font-semibold text-petroleo">Teléfono</dt>
          <dd><a href={business.telephoneHref} class="text-ambar hover:underline">{business.telephone}</a></dd>
        </div>
        <div>
          <dt class="font-heading font-semibold text-petroleo">Dirección</dt>
          <dd>{business.address.streetAddress}, {business.address.postalCode} {business.address.addressLocality}</dd>
        </div>
        <div>
          <dt class="font-heading font-semibold text-petroleo">Horario</dt>
          <dd>
            <ul class="space-y-1">
              {business.openingHoursDisplay.map((item) => (
                <li>{item.label}: {item.hours}</li>
              ))}
            </ul>
          </dd>
        </div>
        <div>
          <dt class="font-heading font-semibold text-petroleo">Zona de servicio</dt>
          <dd>Sevilla capital y alrededores</dd>
        </div>
      </dl>

      <form
        name="contacto"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        action="/gracias"
        class="mt-10 space-y-4"
      >
        <input type="hidden" name="form-name" value="contacto" />
        <p class="hidden">
          <label>No rellenar si eres humano: <input name="bot-field" /></label>
        </p>

        <div>
          <label for="nombre" class="block text-sm font-medium text-stone-700">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            required
            class="mt-1 w-full rounded-lg border border-stone-300 px-4 py-2 focus:border-petroleo focus:outline-none focus:ring-1 focus:ring-petroleo"
          />
        </div>

        <div>
          <label for="telefono" class="block text-sm font-medium text-stone-700">Teléfono</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            required
            class="mt-1 w-full rounded-lg border border-stone-300 px-4 py-2 focus:border-petroleo focus:outline-none focus:ring-1 focus:ring-petroleo"
          />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-stone-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            class="mt-1 w-full rounded-lg border border-stone-300 px-4 py-2 focus:border-petroleo focus:outline-none focus:ring-1 focus:ring-petroleo"
          />
        </div>

        <div>
          <label for="mensaje" class="block text-sm font-medium text-stone-700">Mensaje</label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows="4"
            required
            class="mt-1 w-full rounded-lg border border-stone-300 px-4 py-2 focus:border-petroleo focus:outline-none focus:ring-1 focus:ring-petroleo"
          ></textarea>
        </div>

        <button
          type="submit"
          class="inline-flex items-center justify-center gap-2 rounded-full bg-ambar px-6 py-3 font-heading font-semibold text-white shadow-sm transition-colors hover:bg-ambar-dark"
        >
          Enviar mensaje
        </button>
      </form>
    </div>

    <div>
      <MapEmbed className="h-full min-h-[400px]" />
      <a
        href={business.googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        class="mt-4 inline-block text-petroleo hover:underline"
      >
        Ver ficha en Google Maps
      </a>
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 2: Verificar build y contenido**

```bash
npm run build
grep -o 'data-netlify="true"' dist/contacto/index.html | head -1
grep -o "name=\"form-name\"" dist/contacto/index.html | head -1
```

Expected: build sin errores; ambos `grep` devuelven una coincidencia.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: pagina Contacto con formulario Netlify Forms y mapa embebido"
```

---

## Task 20: Página Gracias (`/gracias`)

**Files:**
- Create: `src/pages/gracias.astro`

- [ ] **Step 1: Escribir la página**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import CTAButton from '../components/CTAButton.astro';
---
<BaseLayout
  title="Gracias por contactar | Fontanero Leonardo Ruiz Sevilla"
  description="Hemos recibido tu mensaje. Leonardo Ruiz, fontanero en Sevilla, te responderá lo antes posible."
  path="/gracias"
>
  <section class="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
    <h1 class="font-heading text-3xl font-bold text-petroleo sm:text-4xl">¡Gracias por tu mensaje!</h1>
    <p class="mt-4 text-stone-600">
      He recibido tu consulta y te responderé lo antes posible. Si tu avería es urgente, llámame
      directamente y te atiendo al momento.
    </p>
    <div class="mt-8 flex flex-wrap justify-center gap-4">
      <CTAButton label="Llamar ahora" />
      <CTAButton variant="link" href="/" label="Volver al inicio" />
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 2: Verificar build**

```bash
npm run build
```

Expected: build sin errores; `dist/gracias/index.html` existe.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: pagina de agradecimiento tras envio de formulario"
```

---

## Task 21: Página Aviso Legal (`/aviso-legal`)

**Files:**
- Create: `src/pages/aviso-legal.astro`

- [ ] **Step 1: Escribir la página** (LSSI-CE). El NIF/CIF real del titular no ha sido facilitado por el cliente; se deja marcado explícitamente como pendiente, junto con el resto de datos NAP ya confirmados.

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { business } from '../data/business';
---
<BaseLayout
  title="Aviso Legal | Fontanero Leonardo Ruiz Sevilla"
  description="Aviso legal del sitio web de Fontanero Termos Eléctricos Leonardo Ruiz, en cumplimiento de la LSSI-CE."
  path="/aviso-legal"
>
  <section class="mx-auto max-w-3xl px-4 py-16 sm:px-6">
    <h1 class="font-heading text-3xl font-bold text-petroleo">Aviso Legal</h1>

    <div class="mt-8 space-y-6 text-stone-700">
      <div>
        <h2 class="font-heading text-xl font-semibold text-petroleo">1. Datos identificativos del titular</h2>
        <p class="mt-2">
          En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la
          Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de los siguientes
          datos: el titular de este sitio web es <strong>{business.name}</strong>, actividad económica
          de {business.legalActivity}, con domicilio en {business.address.streetAddress},
          {business.address.postalCode} {business.address.addressLocality}, España. NIF/CIF: pendiente
          de facilitar por el titular del negocio. Teléfono de contacto: {business.telephone}.
        </p>
      </div>

      <div>
        <h2 class="font-heading text-xl font-semibold text-petroleo">2. Objeto</h2>
        <p class="mt-2">
          Este sitio web tiene como finalidad informar sobre los servicios de fontanería ofrecidos por
          {business.name} y facilitar el contacto de clientes potenciales en Sevilla y alrededores. El
          acceso y uso del sitio atribuye la condición de usuario e implica la aceptación de las
          condiciones incluidas en este Aviso Legal.
        </p>
      </div>

      <div>
        <h2 class="font-heading text-xl font-semibold text-petroleo">3. Condiciones de uso</h2>
        <p class="mt-2">
          El usuario se compromete a hacer un uso adecuado y lícito del sitio web, de conformidad con
          la legislación aplicable, y a no emplearlo para actividades ilícitas o que puedan dañar los
          derechos e intereses de terceros. Queda prohibida la reproducción total o parcial del sitio
          sin autorización expresa del titular.
        </p>
      </div>

      <div>
        <h2 class="font-heading text-xl font-semibold text-petroleo">4. Propiedad intelectual</h2>
        <p class="mt-2">
          Los contenidos del sitio web (textos, imágenes, diseño y código) son propiedad de
          {business.name} o de sus licenciantes, y están protegidos por la normativa de propiedad
          intelectual e industrial. Las fotografías utilizadas proceden de bancos de imágenes de uso
          libre bajo licencia comercial (Unsplash/Pexels).
        </p>
      </div>

      <div>
        <h2 class="font-heading text-xl font-semibold text-petroleo">5. Responsabilidad</h2>
        <p class="mt-2">
          {business.name} no se hace responsable de los daños y perjuicios que pudieran derivarse de
          interferencias, interrupciones, virus informáticos o cualquier otra causa ajena a su control
          que impidan el normal funcionamiento del sitio web.
        </p>
      </div>

      <div>
        <h2 class="font-heading text-xl font-semibold text-petroleo">6. Legislación aplicable</h2>
        <p class="mt-2">
          Las presentes condiciones se rigen por la legislación española. Para cualquier controversia
          que pudiera derivarse del acceso o uso de este sitio web, las partes se someten a los Juzgados
          y Tribunales de Sevilla, salvo que la normativa de consumidores y usuarios establezca otro
          fuero.
        </p>
      </div>
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 2: Verificar build**

```bash
npm run build
grep -o "LSSI-CE" dist/aviso-legal/index.html | head -1
```

Expected: build sin errores; `grep` devuelve una coincidencia.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: pagina Aviso Legal (LSSI-CE)"
```

---

## Task 22: Página Política de Privacidad (`/politica-privacidad`)

**Files:**
- Create: `src/pages/politica-privacidad.astro`

- [ ] **Step 1: Escribir la página** (RGPD, adaptada al único tratamiento real del sitio: el formulario de contacto vía Netlify Forms)

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { business } from '../data/business';
---
<BaseLayout
  title="Política de Privacidad | Fontanero Leonardo Ruiz Sevilla"
  description="Política de privacidad y protección de datos (RGPD) del sitio web de Fontanero Termos Eléctricos Leonardo Ruiz en Sevilla."
  path="/politica-privacidad"
>
  <section class="mx-auto max-w-3xl px-4 py-16 sm:px-6">
    <h1 class="font-heading text-3xl font-bold text-petroleo">Política de Privacidad</h1>

    <div class="mt-8 space-y-6 text-stone-700">
      <div>
        <h2 class="font-heading text-xl font-semibold text-petroleo">1. Responsable del tratamiento</h2>
        <p class="mt-2">
          El responsable del tratamiento de los datos personales recabados a través de este sitio web
          es <strong>{business.name}</strong>, con domicilio en {business.address.streetAddress},
          {business.address.postalCode} {business.address.addressLocality}, y teléfono de contacto
          {business.telephone}.
        </p>
      </div>

      <div>
        <h2 class="font-heading text-xl font-semibold text-petroleo">2. Finalidad del tratamiento</h2>
        <p class="mt-2">
          Los datos que facilitas a través del formulario de contacto (nombre, teléfono, email y
          mensaje) se utilizan únicamente para responder a tu consulta o solicitud de presupuesto sobre
          servicios de fontanería. No se utilizan para envío de comunicaciones comerciales salvo que lo
          solicites expresamente.
        </p>
      </div>

      <div>
        <h2 class="font-heading text-xl font-semibold text-petroleo">3. Legitimación</h2>
        <p class="mt-2">
          La base legal para el tratamiento de tus datos es tu consentimiento expreso, otorgado al
          rellenar y enviar voluntariamente el formulario de contacto.
        </p>
      </div>

      <div>
        <h2 class="font-heading text-xl font-semibold text-petroleo">4. Destinatarios y encargados de tratamiento</h2>
        <p class="mt-2">
          El formulario de contacto se gestiona mediante el servicio Netlify Forms, proporcionado por
          Netlify, Inc., que actúa como encargado de tratamiento y almacena los envíos del formulario
          en sus servidores conforme a su propia política de privacidad. No se cede tu información a
          terceros para fines distintos a la gestión de tu consulta.
        </p>
      </div>

      <div>
        <h2 class="font-heading text-xl font-semibold text-petroleo">5. Conservación de los datos</h2>
        <p class="mt-2">
          Tus datos se conservarán únicamente durante el tiempo necesario para atender tu consulta y,
          en su caso, formalizar y prestar el servicio solicitado, salvo obligación legal de
          conservación superior.
        </p>
      </div>

      <div>
        <h2 class="font-heading text-xl font-semibold text-petroleo">6. Derechos de las personas interesadas</h2>
        <p class="mt-2">
          Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación del
          tratamiento y portabilidad de tus datos contactando directamente en el teléfono
          {business.telephone}, indicando el derecho que deseas ejercer.
        </p>
      </div>
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 2: Verificar build**

```bash
npm run build
grep -o "RGPD" dist/politica-privacidad/index.html | head -1
```

Expected: build sin errores; `grep` devuelve al menos una coincidencia (en `<meta name="description">`).

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: pagina Politica de Privacidad (RGPD)"
```

---

## Task 23: Página Política de Cookies (`/politica-cookies`)

**Files:**
- Create: `src/pages/politica-cookies.astro`

- [ ] **Step 1: Escribir la página**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout
  title="Política de Cookies | Fontanero Leonardo Ruiz Sevilla"
  description="Información sobre el uso de cookies técnicas y analíticas en el sitio web de Fontanero Termos Eléctricos Leonardo Ruiz."
  path="/politica-cookies"
>
  <section class="mx-auto max-w-3xl px-4 py-16 sm:px-6">
    <h1 class="font-heading text-3xl font-bold text-petroleo">Política de Cookies</h1>

    <div class="mt-8 space-y-6 text-stone-700">
      <div>
        <h2 class="font-heading text-xl font-semibold text-petroleo">1. ¿Qué son las cookies?</h2>
        <p class="mt-2">
          Las cookies son pequeños archivos de texto que un sitio web almacena en tu navegador para
          recordar información sobre tu visita, como tus preferencias de navegación.
        </p>
      </div>

      <div>
        <h2 class="font-heading text-xl font-semibold text-petroleo">2. Cookies utilizadas en este sitio</h2>
        <p class="mt-2">
          Este sitio web utiliza exclusivamente cookies técnicas, necesarias para su correcto
          funcionamiento (por ejemplo, para recordar tu decisión sobre el banner de cookies), y, en su
          caso, cookies analíticas anonimizadas para conocer el uso agregado del sitio y mejorar la
          experiencia de navegación. No se utilizan cookies de publicidad ni de seguimiento de terceros.
        </p>
      </div>

      <div>
        <h2 class="font-heading text-xl font-semibold text-petroleo">3. Gestión de tu consentimiento</h2>
        <p class="mt-2">
          Al entrar por primera vez en el sitio verás un aviso en la parte inferior de la pantalla desde
          el que puedes <strong>aceptar</strong> o <strong>rechazar</strong> el uso de cookies
          analíticas. Tu decisión se guarda en tu propio navegador y puedes cambiarla en cualquier
          momento borrando los datos de navegación de este sitio.
        </p>
      </div>

      <div>
        <h2 class="font-heading text-xl font-semibold text-petroleo">4. Cómo deshabilitar las cookies desde el navegador</h2>
        <p class="mt-2">
          Además del banner de este sitio, puedes configurar tu navegador para bloquear o eliminar las
          cookies. Ten en cuenta que deshabilitar las cookies técnicas puede afectar al correcto
          funcionamiento de algunas partes del sitio.
        </p>
      </div>
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 2: Verificar build**

```bash
npm run build
grep -o "banner de cookies" dist/politica-cookies/index.html | head -1
```

Expected: build sin errores; `grep` devuelve una coincidencia.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: pagina Politica de Cookies"
```

---

## Task 24: robots.txt y confirmación de sitemap

**Files:**
- Create: `public/robots.txt`

- [ ] **Step 1: Crear `public/robots.txt`**

```
User-agent: *
Allow: /

# TODO pendiente: sustituir por el dominio real en cuanto el cliente
# conecte el repo a Netlify (ver CLAUDE.md > Pendiente).
Sitemap: https://fontanero-leonardo-ruiz-sevilla.netlify.app/sitemap-index.xml
```

- [ ] **Step 2: Verificar que el sitemap se genera en el build**

```bash
npm run build
ls dist/sitemap-index.xml dist/sitemap-0.xml
cat dist/robots.txt
```

Expected: ambos ficheros de sitemap existen; `robots.txt` contiene `Allow: /` y la línea `Sitemap:`.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: anade robots.txt permitiendo indexacion completa"
```

---

## Task 25: netlify.toml

**Files:**
- Create: `netlify.toml`

- [ ] **Step 1: Crear el archivo**

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "chore: anade configuracion de build para Netlify"
```

---

## Task 26: CLAUDE.md

**Files:**
- Create: `CLAUDE.md`

- [ ] **Step 1: Crear el archivo**

```markdown
# CLAUDE.md — Fontanero Termos Eléctricos Leonardo Ruiz

## Proyecto
Web de presentación en Astro + Tailwind para un fontanero autónomo en Sevilla,
especializado en termos eléctricos. Objetivo: captar clientes locales vía SEO
y llamada directa. Sin backend, sin CMS, despliegue estático en Netlify.

## Datos de negocio (NAP — no modificar sin confirmación del cliente)
- Nombre: Fontanero Termos Eléctricos Leonardo Ruiz
- Teléfono: 651 91 25 07
- Dirección: San Luis, Casco Antiguo, 41003 Sevilla
- Horario: L-J 9:00-20:00, V 9:00-14:00, S-D cerrado
- Valoración Google: 5,0 / 45 reseñas

Todos estos datos viven en `/src/data/business.ts` como fuente única de verdad;
`SEOHead`, `Header`, `Footer` y el JSON-LD los leen de ahí. No dupliques estos
valores directamente en componentes o páginas.

## Convenciones del proyecto
- Componentes Astro en `/src/components`, un componente por bloque de UI.
- Paleta: azul petróleo `#0F3B5C` (principal) + ámbar `#E8892B` (acento),
  definida en `tailwind.config.mjs`.
- Tipografía: Outfit (titulares) / Inter (cuerpo), autoalojadas via `@fontsource`.
- Todo el copy en español de España, tono cercano y profesional.
- Imágenes fotográficas en `/src/assets/images` (optimizadas via `astro:assets`
  a WebP/AVIF); solo `public/images/og-default.jpg` vive fuera de `src` porque
  el meta `og:image` necesita una URL estática.
- Cualquier dato nuevo del negocio (precios, redes sociales, más reseñas)
  debe integrarse en `business.ts` y propagarse automáticamente al JSON-LD y
  al copy correspondiente.

## Pendiente / a confirmar con el cliente
- Rango de precios (no disponible actualmente, se usa `priceRange: "$$"` genérico).
- Redes sociales (no disponibles actualmente).
- Enlace directo real a la ficha de Google Maps (se usó una URL de búsqueda
  provisional en `business.ts` > `googleMapsUrl`, sustituir en cuanto el
  cliente la facilite).
- NIF/CIF del titular para el Aviso Legal (`src/pages/aviso-legal.astro`),
  actualmente marcado como "pendiente de facilitar".
- Dominio real de Netlify o dominio propio: actualizar `site` en
  `astro.config.mjs` y la línea `Sitemap:` de `public/robots.txt` en cuanto
  se conecte el repo a Netlify y se conozca la URL final.
- Fotos adicionales más allá de la categoría "cuarto de baño" (actualmente se
  usan fotos de stock libres de derechos de Unsplash/Pexels).
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "docs: anade CLAUDE.md con contexto de negocio y pendientes"
```

---

## Task 27: Verificación final y checklist manual

**Files:** ninguno nuevo — verificación end-to-end.

- [ ] **Step 1: Instalar dependencias desde cero y compilar**

```bash
rm -rf node_modules dist
npm install
npm run build
```

Expected: `npm install` sin errores; `npm run build` termina con `Complete!` y genera `dist/` con las 9 páginas + `sitemap-index.xml` + `robots.txt`.

- [ ] **Step 2: Servir el sitio en local y revisar visualmente**

```bash
npm run preview
```

Visitar manualmente en el navegador (desktop y con las devtools en modo móvil) las 9 rutas: `/`, `/servicios`, `/sobre-nosotros`, `/opiniones`, `/contacto`, `/gracias`, `/aviso-legal`, `/politica-privacidad`, `/politica-cookies`. Confirmar:
- El botón de llamada fijo aparece en móvil en todas las páginas.
- El banner de cookies aparece la primera vez y desaparece al aceptar/rechazar (recargar sin borrar `localStorage` y confirmar que no vuelve a aparecer).
- El formulario de `/contacto` es enviable (en local hará un POST normal; la integración real con Netlify Forms se valida tras el primer deploy).
- El iframe del mapa carga correctamente.

- [ ] **Step 2b: Detener el servidor de preview**

```bash
# Ctrl+C en la terminal donde corre `npm run preview`
```

- [ ] **Step 3: Validar JSON-LD**

```bash
grep -o '"@type":"Plumber"' dist/index.html | head -1
grep -o '"@type":"AggregateRating"' dist/index.html | head -1
```

Expected: ambas búsquedas devuelven una coincidencia. Adicionalmente, copiar el contenido del `<script type="application/ld+json">` de `dist/index.html` y validarlo en el Rich Results Test de Google u otra herramienta de validación de datos estructurados.

- [ ] **Step 4: Commit final (si quedara algún cambio pendiente)**

```bash
git status
git add -A
git commit -m "chore: verificacion final de build y contenido" || echo "Nada que commitear"
```

---

## Notas de despliegue (fuera del alcance de este plan, a ejecutar por el usuario)

1. Subir el repositorio a GitHub/GitLab/Bitbucket.
2. En Netlify: "Add new site" → "Import an existing project" → conectar el repo.
3. Build command: `npm run build`. Publish directory: `dist`. (Ya configurado en `netlify.toml`, Netlify lo detectará automáticamente).
4. Activar despliegue automático en cada push a `main` (comportamiento por defecto de Netlify Git-based deploy).
5. Una vez asignado el dominio de Netlify (o configurado un dominio propio), actualizar `site` en `astro.config.mjs` y la línea `Sitemap:` en `public/robots.txt`, y volver a desplegar.
