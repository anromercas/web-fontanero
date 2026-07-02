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

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
