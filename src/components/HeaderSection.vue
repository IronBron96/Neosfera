<template>
  <!-- Header con avatar utente -->
  <header class="bg-[#27272a] backdrop-blur-sm shadow-sm sticky top-0 z-50">
    <div class="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
      <div class="w-1/5">
        <!-- 🔽 Icona logout -->
        <n-button circle quaternary @click="handleLogout" title="Esci">
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
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </n-icon>
          </template>
        </n-button>
        <!-- 🔽 Icona Admin Panel -->
        <n-button
          v-if="user?.role === 'admin'"
          circle
          quaternary
          @click="router.push('/adminPanel')"
          title="Pannello Amministrazione"
        >
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
                <rect x="3" y="3" width="7" height="7" rx="1"></rect>
                <rect x="14" y="3" width="7" height="7" rx="1"></rect>
                <rect x="14" y="14" width="7" height="7" rx="1"></rect>
                <rect x="3" y="14" width="7" height="7" rx="1"></rect>
              </svg>
            </n-icon>
          </template>
        </n-button>
      </div>

      <!-- Logo Centrale -->
      <div
        v-if="route.name !== 'customer'"
        class="absolute left-1/2 -translate-x-1/2 top-1"
        @click="handleNextPage('customer')"
      >
        <div
          class="w-24 h-24 bg-gradient-to-br from-[#192b388a] to-[#3819198a] rounded-full shadow-lg flex items-center justify-center border-4 overflow-hidden"
        >
          <div class="w-[%] h-[%] rounded-full overflow-hidden">
            <img src="../assets/Loghi/elite bistrot logo.jpg" alt="logo elite bistrot" srcset="" />
          </div>
        </div>
      </div>

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
</template>
<script setup>
  import {useUser} from '../lib/directus.ts'
  import {logout} from '../lib/auth.ts'
  import {nextPage} from '../utils/globals.js'

  const route = useRoute()
  const router = useRouter()
  const user = useUser()

  async function handleLogout() {
    await logout() // fa già il controllo sul refresh
    router.push('/login')
  }

  function handleNextPage(page) {
    nextPage(page, router)
  }
</script>
