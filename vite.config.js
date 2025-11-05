import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite' // Auto-importazione componenti personalizzati
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite' // Auto-importazione vue components
import Pages from 'vite-plugin-pages';

export default defineConfig({
  plugins: [
    vue(),
    Components({
      // opzionale, specifica la directory dove hai i componenti
      dirs: ['src/components'],
      extensions: ['vue'],
      resolvers: [NaiveUiResolver()],
      // Cerca i componenti nelle sottocartelle fino a questa profondità
      deep: true,
      // Opzione utile per auto-importare solo i componenti usati
      dts: true, // Genera un file di tipi (TypeScript)
    }),
    AutoImport({
      imports: ['vue', 'vue-router'], // Specifica che vuoi auto-importare le API da 'vue'
      resolvers: [NaiveUiResolver()], // ✅ autoimport API di Naive UI
      dts: 'src/auto-imports.d.ts',
    }),
    Pages({
      dirs: ['src/pages'],
      extensions: ['vue'],
      // exclude: ['src/components/**'], // se vuoi ignorare altri file
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})