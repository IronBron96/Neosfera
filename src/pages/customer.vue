<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col">
    <!-- Contenuto principale -->
    <main class="max-w-md mx-auto flex-1 px-4 pt-6">
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

    <!-- Info bar -->
    <div
      class="sticky bottom-20 bg-[#c740fcc5] border-t border-black/10 w-[30%] rounded-2xl mx-auto"
    >
      <div class="max-w-md w-full mx-auto px-4 py-3 text-center text-white">
        Neosfera Lounge • Segui le nostre serate 🎶
      </div>
    </div>
  </div>
</template>

<script setup>
  import {useRouter} from 'vue-router'
  import {Instagram, Facebook, Music, Globe} from 'lucide-vue-next'
  import logoUrl from '@/assets/Loghi/elite bistrot logo.jpg'

  const router = useRouter()

  // Dati fittizi (potrai sostituirli da backend o Directus)
  const nomeLocale = 'Neosfera Lounge'
  const indirizzo = 'Via Roma 21, Padova (PD)'
  const telefono = '+39 347 123 4567'
  const orari = 'Aperto dalle 17:00 alle 02:00'
  const descrizione =
    'Cocktail bar moderno con atmosfera artistica, musica dal vivo e serate a tema. Prenota il tuo tavolo e scopri un’esperienza diversa ogni notte.'

  const social = {
    instagram: 'https://instagram.com/neosfera_lounge',
    facebook: 'https://facebook.com/neosfera',
    tiktok: 'https://tiktok.com/@neosfera',
    sito: 'https://neosfera.it',
  }

  const icons = {
    instagram: Instagram,
    facebook: Facebook,
    tiktok: Music,
    sito: Globe,
  }

  function goBack() {
    router.back()
  }

  function openLink(url) {
    window.open(url, '_blank')
  }
</script>

<style scoped>
  .n-button {
    min-width: 130px;
    justify-content: center;
  }
</style>
