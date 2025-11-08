<template>
  <!-- Transizione della Navbar -->
  <transition
    enter-active-class="transition transform duration-500"
    enter-from-class="translate-y-20 opacity-0"
    enter-to-class="translate-y-0 opacity-100"
  >
    <nav
      v-if="ready"
      class="fixed bottom-2 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-[#1e1e1f]/90 backdrop-blur-md rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.4)] border border-[#ffffff1a] z-50"
    >
      <div class="relative flex items-center gap-2 justify-around py-3 px-2">
        <!-- Menu -->
        <n-button
          :type="currentTab === 'menu' ? 'primary' : 'default'"
          @click="handleNextPage('menu')"
          class="flex-1 flex justify-center"
        >
          <n-icon :size="35">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
              />
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
            </svg>
          </n-icon>
        </n-button>

        <!-- Home -->
        <n-button
          :type="currentTab === '' ? 'primary' : 'default'"
          @click="handleNextPage('')"
          class="flex-1 flex justify-center"
        >
          <n-icon :size="30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </n-icon>
        </n-button>

        <!-- Profilo -->
        <n-button
          :type="currentTab === 'userProfile' ? 'primary' : 'default'"
          @click="handleNextPage('userProfile')"
          class="flex-1 flex justify-center"
        >
          <n-icon :size="40">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </n-icon>
        </n-button>

        <!-- Impostazioni -->
        <n-button
          :type="currentTab === 'games' ? 'primary' : 'default'"
          @click="handleNextPage('games')"
          class="flex-1 flex justify-center"
        >
          <n-icon :size="24">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="12" cy="12" r="3"></circle>
              <path
                d="M12 1v6m0 6v6m5.2-14.8L13.5 7.9m-3 3-3.7 3.7m8.8 0L12 11m0 0L8.3 7.3M23 12h-6m-6 0H1"
              />
            </svg>
          </n-icon>
        </n-button>
      </div>
    </nav>
  </transition>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { nextPage } from "../utils/globals.js";

const router = useRouter();
const route = useRoute();

// Stato della tab corrente
const currentTab = ref(null);
// Stato per mostrare la navbar solo quando il router è pronto
const ready = ref(false);

// Funzione di navigazione
function handleNextPage(page) {
  currentTab.value = page;
  nextPage(page, router);
}

// All'avvio aspetta che il router sia pronto, poi mostra la navbar
onMounted(async () => {
  await router.isReady();
  ready.value = true;
  const parts = route.path.split("/").filter(Boolean); // divide e rimuove eventuali stringhe vuote
  currentTab.value = parts[0] || ""; // prende solo la prima parte, es. "games"
});

// Aggiorna la tab attiva quando cambia la route
watch(
  () => route.path,
  (newPath) => {
    if (ready.value) {
      const parts = newPath.split("/").filter(Boolean);
      currentTab.value = parts[0] || "";
    }
  }
);
</script>
