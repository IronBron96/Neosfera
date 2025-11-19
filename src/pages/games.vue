<template>
  <div class="min-h-screen w-full bg-[#6d00c1]">
    <!-- SCHERMATA SELEZIONE GIOCO -->
    <main v-if="!selectedGame" class="max-w-md mx-auto px-4 pt-12 pb-24">
      <div
        class="bg-white border border-black rounded-2xl shadow-[6px_6px_0_0_#000] px-6 py-6 flex flex-col items-center gap-6"
      >
        <!-- Titolo -->
        <div class="flex flex-col items-center gap-1 text-center">
          <h1 class="text-2xl font-extrabold text-black leading-tight">
            <span
              class="inline-block px-4 py-1 bg-[#EFFF00] border border-black rounded-full shadow-[4px_4px_0_0_#000]"
            >
              Scegli un gioco
            </span>
          </h1>
        </div>

        <!-- Lista giochi -->
        <div class="w-full flex flex-col gap-3">
          <button
            v-for="(game, name) in games"
            :key="name"
            type="button"
            class="w-full flex items-center gap-3 px-4 py-3 bg-black border border-black rounded-full shadow-[4px_4px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] active:shadow-[2px_2px_0_0_#000] transition-all cursor-pointer"
            @click="selectGame(name)"
          >
            <!-- Icona -->
            <div
              class="w-10 h-10 rounded-full border border-black bg-gradient-to-br from-[#EFFF00] to-[#00e85f] flex items-center justify-center shadow-[3px_3px_0_0_#000]"
            >
              <n-icon :size="22" color="black">
                <component :is="getIcon(name)" />
              </n-icon>
            </div>

            <!-- Nome gioco -->
            <span class="flex-1 text-left text-base font-extrabold text-white">
              {{ formatName(name) }}
            </span>
          </button>
        </div>
      </div>
    </main>

    <!-- GIOCO SELEZIONATO -->
    <div v-else class="h-full">
      <component :is="selectedGameComponent" />
    </div>
  </div>
</template>

<script setup>
  import {watch} from 'vue'
  import {useRouter, useRoute} from 'vue-router'

  const router = useRouter()
  const route = useRoute()

  // 🔍 Importa dinamicamente tutti i componenti di gioco
  const modules = import.meta.glob('../pages/games/*.vue', {eager: true})

  // Crea un oggetto { "luckyWheel": component, ... }
  const games = Object.fromEntries(
    Object.entries(modules).map(([path, mod]) => {
      const name = path.split('/').pop().replace('.vue', '')
      return [name, mod.default]
    })
  )

  const selectedGame = ref(null)

  function selectGame(name) {
    selectedGame.value = name
    router.push(`/games/${name}`)
  }

  function exitGame() {
    selectedGame.value = null
  }

  const selectedGameComponent = computed(() =>
    selectedGame.value ? games[selectedGame.value] : null
  )

  function formatName(name) {
    switch (name) {
      case 'luckyWheel':
        return 'Ruota della Fortuna'
      case 'cards':
        return 'Gioco delle Carte'
      case 'doors':
        return 'Scegli la Porta'
      case 'slotMachine':
        return 'Slot Machine'
      case 'numbers':
        return 'Indovina il Numero'
    }
    return name
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, c => c.toUpperCase())
      .trim()
  }

  // 🧩 Icone SVG diverse per ogni gioco
  function getIcon(name) {
    const icons = {
      luckyWheel: {
        template: `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>`,
      },
      cards: {
        template: `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <rect x="3" y="3" width="7" height="14" rx="2" ry="2" />
          <rect x="8" y="7" width="13" height="14" rx="2" ry="2" />
        </svg>`,
      },
      doors: {
        template: `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <rect x="6" y="3" width="12" height="18" rx="2" ry="2" />
          <circle cx="15" cy="12" r="1" />
        </svg>`,
      },
      slotMachine: {
        template: `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
          <path d="M8 8h8v3H8zM8 13h8v3H8z" />
          <circle cx="19" cy="8" r="2" />
        </svg>`,
      },
      numbers: {
        template: `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path d="M8 6h4l-2 12m6-12h4l-2 12" />
        </svg>`,
      },
    }

    return icons[name] || icons.luckyWheel
  }

  watch(
    () => route.path,
    path => {
      if (path === '/games') {
        selectedGame.value = null
      } else {
        const match = path.match(/\/games\/([^\/]+)/)
        if (match && games[match[1]]) {
          selectedGame.value = match[1]
        }
      }
    },
    {immediate: true}
  )
</script>
