<template>
  <div class="w-full h-full">
    <!-- Schermata di selezione giochi -->
    <div
      v-if="!selectedGame"
      class="flex flex-col mt-12 items-center min-h-screen p-6"
    >
      <h1 class="text-4xl font-bold mb-10">Scegli un gioco</h1>

      <div
        class="grid gap-2 w-full max-w-5xl sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <div
          v-for="(game, name) in games"
          :key="name"
          class="flex gap-4 cursor-pointer bg-[#27272a] text-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all p-3 items-center"
          @click="selectGame(name)"
        >
          <div
            class="w-12 h-12 bg-gradient-to-br from-[#192b388a] to-[#3819198a] rounded-2xl flex items-center justify-center shadow-lg"
          >
            <n-icon :size="40" color="white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <path d="M9 9h.01" />
                <path d="M15 9h.01" />
              </svg>
            </n-icon>
          </div>
          <div>
            <h2 class="text-xl font-semibold mb-2">{{ formatName(name) }}</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { nextPage } from "../utils/globals.js";
import { useRouter } from "vue-router";

const router = useRouter();
// 🔍 Importa dinamicamente tutti i componenti di gioco
const modules = import.meta.glob("../pages/games/*.vue", { eager: true });

// Crea un oggetto { "luckyWheel": component, ... }
const games = Object.fromEntries(
  Object.entries(modules).map(([path, mod]) => {
    const name = path.split("/").pop().replace(".vue", "");
    return [name, mod.default];
  })
);

const selectedGame = ref(null);

function selectGame(name) {
  nextPage(`games/${name}`, router);
}

function exitGame() {
  selectedGame.value = null;
}

const selectedGameComponent = computed(() =>
  selectedGame.value ? games[selectedGame.value] : null
);

function formatName(name) {
  switch (name) {
    case "luckyWheel":
      return "Ruota della Fortuna";
    case "cards":
      return "Gioco delle Carte";
    case "doors":
      return "Scegli la Porta";
    case "slotMachine":
      return "Slot Machine";
    case "numbers":
      return "Indovina il numero";
  }
  return name
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (c) => c.toUpperCase())
    .trim();
}

onMounted(() => {
  document.body.style.overflow = "hidden";
});
</script>
