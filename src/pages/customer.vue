<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col"
  >
    <!-- Header -->
    <header class="bg-[#27272a] sticky top-0 z-50 shadow-sm">
      <div
        class="max-w-md w-full mx-auto px-4 py-3 flex items-center justify-between"
      >
        <n-button circle quaternary @click="goBack">
          <template #icon>
            <n-icon :size="20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
                color="white"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </n-icon>
          </template>
        </n-button>

        <h2 class="text-white font-semibold text-lg">Il nostro locale</h2>

        <n-button circle quaternary>
          <template #icon>
            <n-icon :size="20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
                color="white"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="5" r="1" />
                <circle cx="12" cy="19" r="1" />
              </svg>
            </n-icon>
          </template>
        </n-button>
      </div>
    </header>

    <!-- Contenuto principale -->
    <main class="max-w-md mx-auto flex-1 px-4 py-6">
      <div class="flex flex-col items-center text-center gap-6">
        <!-- Logo -->
        <n-image
          :src="logoUrl"
          alt="Logo locale"
          width="140"
          height="140"
          class="rounded-full shadow-lg"
          preview-disabled
        />

        <!-- Info principali -->
        <div>
          <h1 class="text-2xl font-bold text-gray-800 mb-1">
            {{ nomeLocale }}
          </h1>
          <p class="text-gray-600">{{ indirizzo }}</p>
          <p class="text-gray-600">{{ telefono }}</p>
          <p class="text-gray-600">{{ orari }}</p>
        </div>

        <!-- Descrizione -->
        <p class="text-gray-700 leading-relaxed px-3">
          {{ descrizione }}
        </p>

        <!-- Social -->
        <div class="flex flex-wrap justify-center gap-3">
          <n-button
            v-for="(link, key) in social"
            :key="key"
            type="warning"
            ghost
            size="large"
            round
            @click="openLink(link)"
          >
            <template #icon>
              <n-icon>
                <component :is="icons[key]" />
              </n-icon>
            </template>
            <span class="capitalize">{{ key }}</span>
          </n-button>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="sticky bottom-0 bg-[#27272a] border-t border-black/10">
      <div
        class="max-w-md w-full mx-auto px-4 py-3 text-center text-gray-400 text-xs"
      >
        Neosfera Lounge • Segui le nostre serate 🎶
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { Instagram, Facebook, Music, Globe } from "lucide-vue-next";

const router = useRouter();

// Dati fittizi (potrai sostituirli da backend o Directus)
const logoUrl = "/assets/logo.png";
const nomeLocale = "Neosfera Lounge";
const indirizzo = "Via Roma 21, Padova (PD)";
const telefono = "+39 347 123 4567";
const orari = "Aperto dalle 17:00 alle 02:00";
const descrizione =
  "Cocktail bar moderno con atmosfera artistica, musica dal vivo e serate a tema. Prenota il tuo tavolo e scopri un’esperienza diversa ogni notte.";

const social = {
  instagram: "https://instagram.com/neosfera_lounge",
  facebook: "https://facebook.com/neosfera",
  tiktok: "https://tiktok.com/@neosfera",
  sito: "https://neosfera.it",
};

const icons = {
  instagram: Instagram,
  facebook: Facebook,
  tiktok: Music,
  sito: Globe,
};

function goBack() {
  router.back();
}

function openLink(url) {
  window.open(url, "_blank");
}
</script>

<style scoped>
.n-button {
  min-width: 130px;
  justify-content: center;
}
</style>
