<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
    <!-- Contenuto principale -->
    <main class="max-w-md mx-auto px-4 py-6 flex flex-col gap-8">
      <!-- Promozioni o Info -->
      <div :bordered="false" class="bg-gradient-to-br from-yellow-400 to-orange-500 p-2 rounded-xl">
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
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </n-icon>
              <h3 class="font-semibold text-gray-200">Chat Globale</h3>
            </div>

            <div class="space-y-2 h-32 mb-3">
              <div v-for="msg in chatPreview" :key="msg.id" class="flex items-start gap-2">
                <n-avatar :size="24" round :src="msg.avatar" />
                <div class="flex-1">
                  <div class="flex items-baseline gap-2">
                    <span class="text-sm font-medium text-gray-400">{{ msg.username }}</span>
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
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
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
                    <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path>
                  </svg>
                </n-icon>
              </div>
              <div class="text-center">
                <h3 class="font-bold text-gray-300">Menu</h3>
                <p class="text-sm text-gray-500">Sfoglia il menu ed ordina da qui!</p>
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
                <p class="text-sm text-gray-500">Prova a vincere un caffè o uno shot!</p>
              </div>
            </div>
          </n-card>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
  import {ref} from 'vue'
  import {useRouter} from 'vue-router'
  import {useMessage} from 'naive-ui'

  const message = useMessage()
  const router = useRouter()
  const currentTab = ref('home')

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

  const openChat = () => {
    router.push('./chat')
  }

  const openMenu = () => {
    router.push('./menu')
  }

  const openGame = () => {
    router.push('./game')
  }

  const openCustomerPage = () => {
    router.push('./customer')
  }
</script>

<style scoped>
  .n-card {
    border-radius: 1rem;
  }
</style>
