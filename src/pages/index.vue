<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
    <!-- Header con avatar utente -->
    <header class="bg-[#27272a] backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div class="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        <div class="w-1/5"></div>

        <n-avatar
          round
          :size="40"
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
        />

        <div class="flex items-center gap-3">
          <n-button circle quaternary>
            <template #icon>
              <n-icon :size="20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  color="white"
                >
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
              </n-icon>
            </template>
          </n-button>

          <n-button circle quaternary>
            <template #icon>
              <n-icon :size="20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  color="white"
                >
                  <circle cx="12" cy="12" r="1"></circle>
                  <circle cx="12" cy="5" r="1"></circle>
                  <circle cx="12" cy="19" r="1"></circle>
                </svg>
              </n-icon>
            </template>
          </n-button>
        </div>
      </div>
    </header>

    <!-- Contenuto principale -->
    <main class="max-w-md mx-auto px-4 py-6 flex flex-col gap-8">
      <!-- Promozioni o Info -->
      <div
        :bordered="false"
        class="bg-gradient-to-br from-yellow-400 to-orange-500 p-2 rounded-xl"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-12 h-12 bg-gradient-to-br from-pink-400 to-red-500 rounded-xl flex items-center justify-center shrink-0"
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
            <h3 class="font-semibold text-white">Offerta del Giorno</h3>
            <p class="text-sm text-gray-200">Caffè + Cornetto a €2.50</p>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-6">
        <!-- Sezione Chat Globale -->
        <div class="mb-6 relative">
          <div class="bg-[#27272a] rounded-2xl shadow-lg p-4 mb-3 h-80">
            <div class="flex items-center gap-2 mb-3">
              <n-icon :size="20" color="#8b5cf6">
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
              <h3 class="font-semibold text-gray-200">Chat Globale</h3>
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
                    <span class="text-sm font-medium text-gray-400">{{
                      msg.username
                    }}</span>
                    <span class="text-xs text-gray-500">{{ msg.time }}</span>
                  </div>
                  <p class="text-sm text-gray-200">{{ msg.message }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="absolute -bottom-6 left-0 right-0">
            <n-button type="warning" size="large" block round @click="openChat">
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
          <!-- Menu -->
          <n-card
            :bordered="false"
            class="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-[#27272a]"
            @click="openMenu"
          >
            <div class="flex flex-col items-center gap-3">
              <div
                class="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center"
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
                <h3 class="font-bold text-gray-300">Menu</h3>
                <p class="text-sm text-gray-500">
                  Sfoglia il menu ed ordina da qui!
                </p>
              </div>
            </div>
          </n-card>

          <!-- Gioca -->
          <n-card
            :bordered="false"
            class="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-[#27272a]"
            @click="openGame"
          >
            <div class="flex flex-col items-center gap-3">
              <div
                class="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center"
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
                <h3 class="font-bold text-gray-300">Tenta la fortuna</h3>
                <p class="text-sm text-gray-500">
                  Prova a vincere un caffè o uno shot!
                </p>
              </div>
            </div>
          </n-card>
        </div>
      </div>
    </main>

    <!-- Bottom Navigation con Logo Centrale -->
    <nav
      class="fixed bottom-0 left-0 right-0 bg-[#27272a] shadow-lg border-t border-gray-200"
    >
      <div class="max-w-md mx-auto">
        <div class="flex items-center justify-around py-3 relative">
          <!-- Home -->
          <n-button
            text
            :type="currentTab === 'home' ? 'warning' : 'default'"
            @click="currentTab = 'home'"
            class="flex-1"
          >
            <template #icon>
              <n-icon :size="24">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                  ></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </n-icon>
            </template>
          </n-button>

          <!-- Ordini -->
          <n-button
            text
            :type="currentTab === 'orders' ? 'warning' : 'default'"
            @click="currentTab = 'orders'"
            class="flex-1"
          >
            <template #icon>
              <n-icon :size="24">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
                  ></path>
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                </svg>
              </n-icon>
            </template>
          </n-button>

          <!-- Logo Centrale -->
          <div class="absolute left-1/2 -translate-x-1/2 -top-8">
            <div
              class="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full shadow-lg flex items-center justify-center border-4 border-white"
            >
              <span class="text-2xl font-bold text-white">CB</span>
            </div>
          </div>

          <!-- Profilo -->
          <n-button
            text
            :type="currentTab === 'profile' ? 'warning' : 'default'"
            @click="currentTab = 'profile'"
            class="flex-1"
          >
            <template #icon>
              <n-icon :size="24">
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
            </template>
          </n-button>

          <!-- Impostazioni -->
          <n-button
            text
            :type="currentTab === 'settings' ? 'warning' : 'default'"
            @click="currentTab = 'settings'"
            class="flex-1"
          >
            <template #icon>
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
                  ></path>
                </svg>
              </n-icon>
            </template>
          </n-button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useMessage } from "naive-ui";

const message = useMessage();
const router = useRouter();
const currentTab = ref("home");

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

const openChat = () => {
  router.push("./chat");
};

const openMenu = () => {
  router.push("./menu");
};

const openGame = () => {
  router.push("./game");
};
</script>

<style scoped>
.n-card {
  border-radius: 1rem;
}
</style>
