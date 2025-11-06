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
    <span
      class="absolute top-[100px] left-0 right-0 text-center text-[60px] bg-[#eaeaeb]/60 border border-white/20 rounded-2xl backdrop-blur-sm px-6 py-2 w-fit m-auto shadow-md"
      style="color: #fbbf24"
    >
      crediti {{ credits }}
    </span>

    <!-- Corpo principale -->
    <main class="flex-1 flex flex-col items-center justify-center px-4 h-full">
      <div class=""></div>
      <div class="relative">
        <!-- Freccia indicatrice -->
        <div class="absolute -top-8 left-1/2 -translate-x-1/2 z-20">
          <div
            class="w-0 h-0 border-l-[14px] border-r-[14px] border-t-[28px] border-l-transparent border-r-transparent border-t-amber-500"
          ></div>
        </div>

        <!-- Ruota -->
        <div
          class="w-64 h-64 rounded-full border-8 border-amber-400 shadow-xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center ease-out relative overflow-hidden"
        >
          <div
            class="absolute inset-0 flex items-center justify-center"
            :style="{
              transform: `rotate(${rotation}deg)`,
              transition: 'transform 5s ease-out',
            }"
          >
            <!-- SVG della ruota -->
            <svg viewBox="0 0 200 200" class="w-full h-full">
              <g v-for="(slice, index) in slices" :key="index">
                <!-- Settore -->
                <path
                  :d="getSlicePath(index)"
                  :fill="index % 2 === 0 ? '#fbbf24' : '#f59e0b'"
                  stroke="#fff"
                  stroke-width="0.5"
                />

                <!-- Testo della fetta -->
                <text
                  :x="getTextX(index)"
                  :y="getTextY(index)"
                  fill="#27272a"
                  font-size="12"
                  font-weight="bold"
                  text-anchor="middle"
                  dominant-baseline="middle"
                  :transform="`rotate(${getTextRotation(index)} ${getTextX(index)} ${getTextY(index)})`"
                  style="user-select: none"
                >
                  {{ slice }}
                </text>
              </g>

              <!-- centro ruota -->
              <circle cx="100" cy="100" r="16" fill="#27272a" />
            </svg>
          </div>

          <!-- Bottone centrale -->
          <button
            class="absolute z-20 bg-[#27272a] text-white font-semibold rounded-full shadow-lg active:scale-95 transition"
            :disabled="isSpinning || credits <= 0"
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
          {{ resultText }}
        </p>
      </div>
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useMessage } from "naive-ui";

const router = useRouter();
const message = useMessage();

const rotation = ref(0);
const isSpinning = ref(false);
const attempts = ref(0);
const credits = ref(3);
const resultText = ref("");

// Array dei premi - l'ordine è importante!
// Index 0 è in alto (sotto la freccia quando rotation = 0)
const slices = [
  "Caffè", // 0
  "Nulla", // 1
  "Nulla", // 2
  "Nulla", // 3
  "Shot", // 4
  "Nulla", // 5
  "Nulla", // 6
  "Nulla", // 7
];

function goBack() {
  router.push("/bar");
}

// Funzioni per calcolare le coordinate SVG
function getSlicePath(index) {
  const startAngle = ((index * 45 - 90) * Math.PI) / 180;
  const endAngle = (((index + 1) * 45 - 90) * Math.PI) / 180;

  const x1 = 100 + 100 * Math.cos(startAngle);
  const y1 = 100 + 100 * Math.sin(startAngle);
  const x2 = 100 + 100 * Math.cos(endAngle);
  const y2 = 100 + 100 * Math.sin(endAngle);

  return `M 100 100 L ${x1} ${y1} A 100 100 0 0 1 ${x2} ${y2} Z`;
}

function getTextX(index) {
  const angle = ((index * 45 + 22.5 - 90) * Math.PI) / 180;
  return 100 + 60 * Math.cos(angle);
}

function getTextY(index) {
  const angle = ((index * 45 + 22.5 - 90) * Math.PI) / 180;
  return 100 + 60 * Math.sin(angle);
}

function getTextRotation(index) {
  return index * 45 + 22.5;
}

function spin() {
  if (isSpinning.value || credits.value <= 0) {
    if (credits.value <= 0) {
      message.warning("Non hai abbastanza crediti!");
    }
    return;
  }

  isSpinning.value = true;
  resultText.value = "";
  attempts.value++;
  credits.value--;

  // Determina se questa volta si vince (5% di probabilità)
  const shouldWin = Math.random() < 0.05;

  const spins = 5;
  let targetAngle;

  if (shouldWin) {
    // Scegli casualmente tra Caffè (index 0) o Shot (index 4)
    const winningIndex = Math.random() < 0.5 ? 0 : 4;
    // Calcola un angolo casuale dentro quel settore (45° di ampiezza)
    const angleInSlice = Math.random() * 45;
    // L'angolo finale deve essere invertito perché la ruota gira
    targetAngle = 360 - (winningIndex * 45 + angleInSlice);
  } else {
    // Scegli casualmente tra i 6 settori "Nulla" (1,2,3,5,6,7)
    const losingIndices = [1, 2, 3, 5, 6, 7];
    const losingIndex =
      losingIndices[Math.floor(Math.random() * losingIndices.length)];
    const angleInSlice = Math.random() * 45;
    targetAngle = 360 - (losingIndex * 45 + angleInSlice);
  }

  const totalRotation = spins * 360 + targetAngle;
  rotation.value = rotation.value + totalRotation;

  setTimeout(() => {
    const finalAngle = rotation.value % 360;
    const normalizedAngle = (360 - finalAngle) % 360;
    const sliceIndex = Math.floor(normalizedAngle / 45) % 8;
    const landedOn = slices[sliceIndex];

    console.log(
      "Angolo finale:",
      finalAngle,
      "Normalizzato:",
      normalizedAngle,
      "Index:",
      sliceIndex,
      "Settore:",
      landedOn
    );

    if (landedOn === "Caffè" || landedOn === "Shot") {
      resultText.value = `🎉 Complimenti! Hai vinto un ${landedOn}!`;
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
