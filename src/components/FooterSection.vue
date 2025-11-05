<template>
  <!-- Bottom Navigation con Logo Centrale -->
  <nav class="fixed bottom-0 left-0 right-0 bg-[#27272a] shadow-lg border-t border-gray-200">
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
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
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
        <div class="absolute left-1/2 -translate-x-1/2 -top-8" @click="openCustomerPage">
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
</template>
<script setup>
  const currentTab = ref('home')
</script>
