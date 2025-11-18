<template>
  <!-- Header con avatar utente -->
  <header
    class="bg-[#a300ff] border-b-[4px] border-black shadow-[0_6px_0_rgba(0,0,0,1)] sticky top-0 z-50"
  >
    <div class="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
      <div class="flex gap-4 w-1/5">
        <!-- 🔽 Icona Back -->
        <n-button
          v-if="route.path !== '/'"
          circle
          quaternary
          @click="
            route.path !== '/games' && route.path.startsWith('/games')
              ? router.push('/games')
              : route.path === '/games'
                ? router.push('/')
                : router.back()
          "
          title="Torna alla Home"
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
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </n-icon>
          </template>
        </n-button>
        <!-- 🔽 Icona Admin Panel -->
        <n-button
          v-if="user?.role === '43f1bbc3-42bc-46d0-975f-95230268c015'"
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

      <!-- Logo Centrale Migliorato -->
      <div
        v-if="route.name !== 'customer'"
        class="absolute left-1/2 -translate-x-1/2 top-2.5 cursor-pointer z-50"
        @click="handleNextPage('customer')"
      >
        <div
          class="relative w-24 h-24 rounded-full flex items-center justify-center overflow-hidden"
        >
          <!-- bordo metà superiore viola, metà inferiore nero -->
          <div
            class="absolute inset-0 rounded-full"
            style="
              padding: 4px;
              background: conic-gradient(
                from -90deg,
                #a300ff 0deg 180deg,
                #000000 180deg 360deg
              );
            "
          >
            <!-- cerchio interno con sfondo blur -->
            <div
              class="w-full h-full rounded-full bg-gradient-to-br from-[#1a1a1acc] to-[#00000080] backdrop-blur-sm flex items-center justify-center overflow-hidden"
            >
              <img
                src="../assets/Loghi/elite bistrot logo.jpg"
                alt="Elite Bistrot Logo"
                class="w-full h-full object-cover"
              />
            </div>
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
      </div>
    </div>
  </header>
</template>
<script setup>
import { useRoute, useRouter } from "vue-router";
import { getUser } from "../lib/directus.ts";
import { logout } from "../lib/auth.ts";
import { nextPage } from "../utils/globals.js";
import { onMounted, ref } from "vue";

const route = useRoute();
const router = useRouter();
const user = ref(null);

async function handleLogout() {
  logout(); // fa già il controllo sul refresh
  router.push("/login");
}

function handleNextPage(page) {
  nextPage(page, router);
}

onMounted(async () => {
  user.value = await getUser();
});
</script>
