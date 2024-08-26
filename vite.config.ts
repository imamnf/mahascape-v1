import path from 'node:path';
import { defineConfig } from 'vite';

import Vue from '@vitejs/plugin-vue';
import VueRouter from 'unplugin-vue-router/vite';
import { VueRouterAutoImports, getPascalCaseRouteName } from 'unplugin-vue-router';
import VueDevTools from 'vite-plugin-vue-devtools';
import Layouts from 'vite-plugin-vue-layouts';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';

import Tailwind from 'tailwindcss';
import Autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [Tailwind(), Autoprefixer()]
    }
  },
  plugins: [
    VueRouter({
      // Untuk automasi penamaan pada router
      getRouteName: (routeNode) => {
        return getPascalCaseRouteName(routeNode)
          .replace(/([a-z\d])([A-Z])/g, '$1-$2')
          .toLowerCase();
      }
    }),
    Vue({
      features: {
        propsDestructure: true
      }
    }),
    VueDevTools(),
    Layouts({
      layoutsDirs: 'src/layouts'
    }),
    Components({
      dirs: ['src/components', 'src/layouts'],
      dts: true,
      directoryAsNamespace: true,
      collapseSamePrefixes: true
    }),
    AutoImport({
      imports: ['vue', 'pinia', 'vee-validate', '@vueuse/core', VueRouterAutoImports],
      dirs: ['./src/lib', './src/composables', './src/utils'],
      vueTemplate: true
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@ui': path.resolve(__dirname, './src/components/ui'),
      '@store': path.resolve(__dirname, './src/stores'),
      '@type': path.resolve(__dirname, './src/types')
    }
  },
  build: {
    chunkSizeWarningLimit: 5000
  },
  optimizeDeps: {
    entries: ['./src/**/*.vue']
  },
  server: {
    port: 3010
  }
});
