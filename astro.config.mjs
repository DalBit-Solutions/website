import { defineConfig } from 'astro/config';
import { imageService } from "@unpic/astro/service";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  image: {
    service: imageService({
      placeholder: 'blurhash'
    }),
  },
  integrations: [svelte()]
});