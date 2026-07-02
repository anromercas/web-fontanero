// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // TODO pendiente: sustituir por el dominio real de Netlify (o dominio propio)
  // en cuanto el cliente conecte el repo y lo confirme. Ver CLAUDE.md > Pendiente.
  site: 'https://fontanero-leonardo-ruiz-sevilla.netlify.app',
  trailingSlash: 'never',
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => !page.endsWith('/gracias'),
    }),
  ]
});