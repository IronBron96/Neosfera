<template>
  <div class="flex flex-col">
    <!-- Contenuto principale -->
    <main class="max-w-md mx-auto px-6 pt-12 flex flex-col gap-4">
      <!-- Promozioni o Info -->
      <div :bordered="false" class="bg-light p-2 rounded-xl">
        <div class="flex items-center gap-3">
          <div
            class="w-12 h-12 bg-gradient-to-br from-[#ccc617] to-[#c44222c9] rounded-xl flex items-center justify-center shadow-lg"
          >
            <n-icon :size="24" color="white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"
                ></path>
                <line x1="7" y1="7" x2="7.01" y2="7"></line>
              </svg>
            </n-icon>
          </div>
          <div class="flex-1">
            <h3 class="font-bold text-xl text-grayish">Offerta del Giorno</h3>
            <p class="text-sm text-grayish">Caffè + Cornetto a €2.50</p>
          </div>
        </div>
      </div>

      <div class="flex flex-col">
        <!-- Sezione Chat Globale -->
        <div class="mb-6 relative">
          <div class="bg-lightNavi rounded-2xl shadow-lg p-4 mb-3 h-60">
            <div class="flex items-center gap-2 mb-3">
              <n-icon :size="20" color="#2D3142">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                  ></path>
                </svg>
              </n-icon>
              <h3 class="font-semibold text-light">Chat Globale</h3>
            </div>

            <div class="space-y-2 h-32 mb-3">
              <div
                v-for="msg in chatPreview"
                :key="msg.id"
                class="flex items-start gap-2"
              >
                <n-avatar :size="24" round :src="msg.avatar" />
                <div class="flex-1">
                  <div class="flex items-baseline gap-2">
                    <span class="text-sm font-semibold text-beige">{{
                      msg.username
                    }}</span>
                    <span class="text-xs text-navi">{{ msg.time }}</span>
                  </div>
                  <p class="text-sm text-gray-200">{{ msg.message }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="absolute -bottom-1 left-0 right-0 m-auto w-max">
            <n-button
              type="success"
              size="large"
              round
              @click="handleNextPage('chat')"
            >
              <template #icon>
                <n-icon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                    ></path>
                  </svg>
                </n-icon>
              </template>
              Entra in Chat
            </n-button>
          </div>
        </div>

        <!-- Sezione Azioni Principali -->
        <div class="grid grid-cols-2 gap-4">
          <!-- Gioca -->
          <n-card
            :bordered="false"
            class="cursor-pointer rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-beige h-[150px]"
            @click="handleNextPage('game')"
          >
            <div class="flex flex-col items-center">
              <div
                class="w-16 h-16 bg-gradient-to-br from-[#103d6a] to-[#581452] rounded-2xl flex items-center justify-center shadow-lg"
              >
                <n-icon :size="32" color="white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <!-- Cerchio esterno -->
                    <circle cx="12" cy="12" r="10" />
                    <!-- Linee divisorie -->
                    <line x1="12" y1="2" x2="12" y2="12" />
                    <line x1="12" y1="12" x2="21" y2="12" />
                    <line x1="12" y1="12" x2="3" y2="12" />
                    <line x1="12" y1="12" x2="17" y2="7" />
                    <line x1="12" y1="12" x2="7" y2="17" />
                    <!-- Indicatore / freccia in alto -->
                    <polygon points="11,1 13,1 12,4" fill="currentColor" />
                    <!-- Cerchio centrale -->
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                </n-icon>
              </div>
              <div class="text-center">
                <h3 class="font-extrabold text-[35px] text-[#68275b]">Gioca</h3>
              </div>
            </div>
          </n-card>

          <!-- Menu -->
          <n-card
            :bordered="false"
            class="cursor-pointer rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-beige h-[150px]"
            @click="handleNextPage('menu')"
          >
            <div class="flex flex-col items-center relative h-[130px]">
              <div
                class="w-16 h-16 bg-gradient-to-br from-[#103d6a] to-[#581414] rounded-2xl flex items-center justify-center shadow-lg"
              >
                <n-icon :size="32" color="white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
                    <path d="M7 2v20"></path>
                    <path
                      d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"
                    ></path>
                  </svg>
                </n-icon>
              </div>
              <div class="text-center">
                <span class="font-extrabold text-[35px] text-[#68272b]"
                  >Menu</span
                >
              </div>
            </div>
          </n-card>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { nextPage } from "../utils/globals.js";

const router = useRouter();

const chatPreview = ref([
  {
    id: 1,
    username: "Marco",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop",
    message: "Il caffè oggi è fantastico! ☕",
    time: "10:30",
  },
  {
    id: 2,
    username: "Sofia",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop",
    message: "Qualcuno sa se hanno ancora i croissant?",
    time: "10:32",
  },
  {
    id: 3,
    username: "Luca",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop",
    message: "Consiglio il tiramisù! 🍰",
    time: "10:35",
  },
]);

function handleNextPage(page) {
  nextPage(page, router);
}
</script>
