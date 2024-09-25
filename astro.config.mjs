import { defineConfig } from 'astro/config';
import { imageService } from "@unpic/astro/service";
import svelte from "@astrojs/svelte";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  image: {
    service: imageService({
      placeholder: 'blurhash'
    })
  },
  integrations: [svelte(), sitemap()],
  site: 'https://www.dalbit.de/'
});