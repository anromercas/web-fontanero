# CLAUDE.md — Inst. Fontaneria Diego Mora

> Nota: este proyecto se creó originalmente para "Fontanero Termos Eléctricos
> Leonardo Ruiz" (cliente descartado, versión conservada en el historial de git)
> y se reutilizó en julio de 2026 para Diego Mora.

## Proyecto
Web de presentación en Astro + Tailwind para un fontanero autónomo en Sevilla,
especializado en instalaciones y reparaciones de fontanería. Objetivo: captar
clientes locales vía SEO y llamada directa. Sin backend, sin CMS, despliegue
estático en Netlify.

## Datos de negocio (NAP — no modificar sin confirmación del cliente)
- Nombre: Inst. Fontaneria Diego Mora (nombre exacto de la ficha de Google Maps)
- Teléfono: 685 24 96 08
- Dirección: sin dirección pública (negocio de área de servicio en Google Maps)
- Horario: L-V 8:00-15:00, S-D cerrado
- Valoración Google: 5,0 / 30 reseñas
- Ficha de Google Maps: https://maps.app.goo.gl/jmG5b1vB3vvroDNz5

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
- Localidad base / zona de trabajo exacta (la ficha de Google no muestra
  dirección; de momento se usa "Sevilla y provincia" en `areaServed` y copy).
- Rango de precios (no disponible actualmente, se usa `priceRange: "$$"` genérico).
- Redes sociales (no disponibles actualmente).
- NIF/CIF y domicilio del titular para el Aviso Legal
  (`src/pages/aviso-legal.astro`), actualmente marcados como "pendientes".
- Dominio real de Netlify o dominio propio: actualizar `site` en
  `astro.config.mjs` y la línea `Sitemap:` de `public/robots.txt` en cuanto
  se conecte el repo a Netlify y se conozca la URL final (placeholder actual:
  `fontanero-diego-mora-sevilla.netlify.app`).
- Fotos propias del cliente (se mantienen fotos de stock libres de derechos de
  Unsplash/Pexels del proyecto original; los nombres de archivo aún hacen
  referencia a termos, p. ej. `hero-instalacion-termo.jpg`).
- La ficha de Google Maps tiene fotos en la categoría "Tubería" y "Del
  propietario" que podrían solicitarse para usar en la web.

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
