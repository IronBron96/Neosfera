import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite"; // Auto-importazione componenti personalizzati
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import AutoImport from "unplugin-auto-import/vite"; // Auto-importazione vue components
import Pages from "vite-plugin-pages";

export default defineConfig({
  plugins: [
    vue(),
    Components({
      dirs: ["src/components"],
      extensions: ["vue"],
      resolvers: [NaiveUiResolver()],
      deep: true,
      dts: true,
    }),
    AutoImport({
      imports: ["vue", "vue-router"],
      resolvers: [NaiveUiResolver()],
      dts: "src/auto-imports.d.ts",
    }),
    Pages({
      dirs: ["src/pages"],
      extensions: ["vue"],
      // exclude: ['src/components/**'],
    }),
  ],
  resolve: {
    alias: {
      "@": "/src",
      vue: "vue/dist/vue.esm-bundler.js",
    },
  },
});
