<template>
  <div class="flex flex-col">
    <!-- Contenuto principale -->
    <main class="max-w-md mx-auto px-6 pt-10 flex flex-col gap-3">
      <!-- PROMOZIONE / INFO -->
      <section
        class="relative overflow-hidden bg-[#FFFAD1] border-[4px] border-black rounded-3xl shadow-[8px_8px_0_0_#000] px-4 py-3 text-black"
      >
        <div class="flex items-start justify-between gap-3">
          <!-- Icona + titolo -->
          <div class="flex items-start gap-3">
            <div class="flex flex-col gap-1">
              <!-- Badge “promo attiva” -->
              <span
                class="inline-flex items-center gap-2 rounded-full bg-black px-2 py-0.5 text-[11px] font-black uppercase tracking-wide text-[#FFFAD1]"
              >
                <span class="h-2 w-2 rounded-full bg-[#FFEE00] animate-pulse"></span>
                Promo attiva ora
              </span>

              <h3 class="text-xl font-extrabold leading-tight">Offerta del Giorno</h3>
            </div>
          </div>

          <!-- Mini info di urgenza -->
          <div class="text-right text-[13px] font-extrabold leading-tight">
            <p class="uppercase">Solo oggi</p>
            <p class="text-[10px] text-black">Fino alle 18:00</p>
          </div>
        </div>

        <!-- Contenuto offerta -->
        <div class="flex items-baseline justify-between gap-2">
          <p class="text-base font-semibold">Caffè + Cornetto</p>

          <div
            class="inline-flex items-center gap-1 rounded-full border-[3px] border-black bg-[#FFEE00] px-2 text-sm font-black shadow-[3px_3px_0_0_#000]"
          >
            <span class="text-[11px] uppercase">a soli</span>
            <span class="text-lg">€2.50</span>
          </div>
        </div>

        <!-- Accento grafico in alto a destra -->
        <div
          class="pointer-events-none opacity-30 absolute -right-6 -top-6 h-20 w-20 rotate-12 rounded-3xl border-[4px] border-black bg-gradient-to-br from-[#FFEE00] to-[#FF8A00]"
        ></div>
      </section>

      <!-- CHAT GLOBALE PREVIEW -->
      <div class="relative mb-3">
        <div
          class="bg-white border-[3px] border-black rounded-2xl shadow-[6px_6px_0_0_#000] p-4 h-60"
        >
          <!-- Header Chat -->
          <div class="flex items-center gap-3 mb-3">
            <div
              class="w-10 h-10 border-[3px] border-black rounded-xl bg-gradient-to-br from-[#00FF7B] to-[#00C4FF] flex items-center justify-center"
            >
              <n-icon :size="20" color="black">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </n-icon>
            </div>

            <h3 class="font-extrabold text-xl text-black">Chat Globale</h3>
          </div>

          <!-- Messaggi Preview -->
          <div class="space-y-3 h-32 overflow-hidden">
            <div v-for="msg in chatPreview" :key="msg.id" class="flex items-start gap-2">
              <n-avatar :size="26" round :src="msg.avatar" />

              <div class="flex-1">
                <div class="flex items-baseline gap-2">
                  <span class="text-sm font-bold text-black">
                    {{ msg.username }}
                  </span>
                  <span class="text-xs text-gray-700">
                    {{ msg.time }}
                  </span>
                </div>
                <p class="text-sm text-black">
                  {{ msg.message }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Pulsante "Entra in Chat" -->
        <div class="absolute -bottom-3 left-0 right-0 flex justify-center">
          <n-button
            class="!bg-black !text-white !font-bold !rounded-full !border-[3px] !border-black shadow-[4px_4px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] active:shadow-[2px_2px_0_0_#000]"
            size="large"
            @click="handleNextPage('chat')"
          >
            Entra in Chat
          </n-button>
        </div>
      </div>

      <!-- CARDS AZIONI PRINCIPALI -->
      <div class="grid grid-cols-2 gap-4">
        <!-- GIOCA -->
        <n-card
          :bordered="false"
          class="cursor-pointer rounded-2xl bg-[#EFFF00] h-[150px] border-[4px] border-black shadow-[6px_6px_0_0_#000] transition-all duration-200 hover:-translate-y-1 hover:shadow-[12px_12px_0_rgba(0,0,0,1)] active:shadow-[4px_4px_0_rgba(0,0,0,1)]"
          @click="handleNextPage('games')"
        >
          <div class="flex flex-col items-center">
            <div
              class="w-20 h-20 bg-gradient-to-br from-[#FFEE00] to-[#FF9900] border-[4px] border-black rounded-2xl flex items-center justify-center shadow-[6px_6px_0_0_#000] transition-all duration-200 hover:-translate-y-1 hover:shadow-[10px_10px_0_0_#000] active:shadow-[4px_4px_0_0_#000]"
            >
              <n-icon :size="40" color="black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="6" r="1.8"></circle>
                  <path d="M12 8v6"></path>
                  <rect x="6.5" y="15.5" width="11" height="2.5" rx="0.8"></rect>
                  <path d="M4 18.5h16" stroke-linecap="round"></path>
                  <path d="M9 15.5c1-1.5 3-1.5 4 0"></path>
                </svg>
              </n-icon>
            </div>

            <h3 class="font-extrabold text-[28px] text-black">Gioca</h3>
          </div>
        </n-card>

        <!-- MENU -->
        <n-card
          :bordered="false"
          class="cursor-pointer rounded-xl bg-[#00E85F] h-[150px] border-[3px] border-black shadow-[6px_6px_0_0_#000] transition-all duration-200 hover:-translate-y-1 hover:shadow-[10px_10px_0_0_#000] active:translate-y-0 active:shadow-[4px_4px_0_0_#000]"
          @click="handleNextPage('menu')"
        >
          <div class="flex flex-col items-center">
            <div
              class="w-20 h-20 bg-gradient-to-br from-[#00FF7B] to-[#00C4FF] border-[4px] border-black rounded-2xl flex items-center justify-center shadow-[6px_6px_0_0_#000] transition-all duration-200 hover:-translate-y-1 hover:shadow-[10px_10px_0_0_#000] active:shadow-[4px_4px_0_0_#000]"
            >
              <n-icon :size="36" color="black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <!-- Forchetta -->
                  <path d="M6 2v6M10 2v6M8 2v20" />
                  <!-- Coltello -->
                  <path d="M17 2c0 5-2 8-2 12a3 3 0 0 0 3 3h1V2z" />
                </svg>
              </n-icon>
            </div>

            <span class="font-extrabold text-[28px] text-black">Menu</span>
          </div>
        </n-card>
      </div>
    </main>
  </div>
</template>

<script setup>
  import {useRouter} from 'vue-router'
  import {nextPage} from '../utils/globals.js'

  const router = useRouter()

  const chatPreview = ref([
    {
      id: 1,
      username: 'Marco',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
      message: 'Il caffè oggi è fantastico! ☕',
      time: '10:30',
    },
    {
      id: 2,
      username: 'Sofia',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop',
      message: 'Qualcuno sa se hanno ancora i croissant?',
      time: '10:32',
    },
    {
      id: 3,
      username: 'Luca',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop',
      message: 'Consiglio il tiramisù! 🍰',
      time: '10:35',
    },
  ])

  function handleNextPage(page) {
    nextPage(page, router)
  }
</script>
