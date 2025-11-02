<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col"
  >
    <!-- Header -->
    <header class="bg-[#27272a] sticky top-0 z-50 shadow-sm">
      <div class="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        <n-button circle quaternary @click="goBack">
          <template #icon>
            <n-icon :size="20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
                color="white"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </n-icon>
          </template>
        </n-button>

        <h2 class="text-white font-semibold text-lg">Ruota della Fortuna</h2>

        <n-button circle quaternary>
          <template #icon>
            <n-icon :size="20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
                color="white"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="5" r="1" />
                <circle cx="12" cy="19" r="1" />
              </svg>
            </n-icon>
          </template>
        </n-button>
      </div>
    </header>

    <!-- Corpo principale -->
    <main class="flex-1 flex flex-col items-center justify-center px-4">
      <div class="relative">
        <!-- Freccia indicatrice -->
        <div class="absolute -top-8 left-1/2 -translate-x-1/2 rotate-180 z-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="text-amber-500"
          >
            <polygon points="12,0 16,8 8,8" />
          </svg>
        </div>

        <!-- Ruota -->
        <div
          class="w-64 h-64 rounded-full border-8 border-amber-400 shadow-xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center ease-out"
        >
          <div
            class="absolute inset-0 flex items-center justify-center"
            :style="{
              transform: `rotate(${rotation}deg)`,
              transition: 'transform 5s ease-out',
            }"
          >
            <!-- SVG della ruota -->
            <svg viewBox="0 0 100 100" class="w-full h-full rounded-full">
              <g
                v-for="(slice, index) in slices"
                :key="index"
                :transform="`rotate(${index * 45} 50 50)`"
              >
                <!-- Settore -->
                <path
                  d="M50 50 L50 0 A50 50 0 0 1 85.36 14.64 Z"
                  :fill="index % 2 === 0 ? '#fbbf24' : '#f59e0b'"
                />

                <!-- Arco di guida per il testo -->
                <defs>
                  <path
                    :id="`arc-${index}`"
                    d="M 37.754 20.436 A 32 32 0 0 1 62.246 20.436"
                    fill="none"
                  />
                </defs>

                <!-- Testo della fetta -->
                <text
                  fill="#27272a"
                  font-size="6"
                  font-weight="bold"
                  style="user-select: none"
                >
                  <textPath
                    :href="`#arc-${index}`"
                    startOffset="50%"
                    text-anchor="middle"
                  >
                    {{ slice }}
                  </textPath>
                </text>
              </g>

              <!-- centro ruota -->
              <circle cx="50" cy="50" r="8" fill="#27272a" />
            </svg>
          </div>

          <!-- Bottone centrale -->
          <button
            class="absolute z-20 bg-[#27272a] text-white font-semibold rounded-full shadow-lg active:scale-95 transition"
            :disabled="isSpinning"
            @click="spin"
          >
            {{ isSpinning ? "..." : "Gira!" }}
          </button>
        </div>
      </div>

      <!-- Area risultato con altezza fissa -->
      <div class="mt-6 h-16 flex items-center justify-center">
        <p
          :class="resultText ? 'opacity-100' : 'opacity-0'"
          class="text-lg font-semibold text-gray-800 text-center transition-opacity duration-300"
        >
          {{ resultText || "Placeholder" }}
        </p>
      </div>

      <p class="mt-2 text-sm text-gray-500 text-center">
        Hai provato {{ attempts }} {{ attempts === 1 ? "volta" : "volte" }}.
      </p>
    </main>

    <!-- Footer -->
    <footer class="sticky bottom-0 bg-[#27272a] border-t border-black/10">
      <div class="max-w-md mx-auto px-4 py-3 text-center text-gray-400 text-xs">
        Buona fortuna 🍀 • Probabilità di vincita 5%
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useMessage } from "naive-ui";

const router = useRouter();
const message = useMessage();

const rotation = ref(0);
const isSpinning = ref(false);
const attempts = ref(0);
const resultText = ref("");
const slices = [
  "Caffè",
  "Nulla",
  "Nulla",
  "Nulla",
  "Shot",
  "Nulla",
  "Nulla",
  "Nulla",
];

function goBack() {
  router.push("/bar");
}

function spin() {
  if (isSpinning.value) return;

  isSpinning.value = true;
  resultText.value = "";
  attempts.value++;

  const randomExtraSpin = Math.floor(Math.random() * 360);
  const newRotation = rotation.value + 720 + randomExtraSpin;
  rotation.value = newRotation;

  setTimeout(() => {
    const win = Math.random() < 0.05;
    if (win) {
      resultText.value = "🎉 Complimenti! Hai vinto un premio!";
    } else {
      resultText.value = "😅 Non questa volta... riprova!";
    }
    isSpinning.value = false;
  }, 5000);
}
</script>

<style scoped>
button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
