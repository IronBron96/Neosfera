<template>
  <div
    class="min-h-screen flex flex-col items-center overflow-hidden relative mt-16"
  >
    <!-- Crediti -->
    <span
      class="text-[60px] bg-[#eaeaeb]/60 border border-white/20 rounded-2xl backdrop-blur-sm px-6 w-fit mx-auto shadow-md mb-6"
      style="color: #10b981"
    >
      crediti {{ credits }}
    </span>

    <!-- Contenitore carte -->
    <div class="relative w-[270px] h-[390px]">
      <transition-group name="card" tag="div" class="absolute inset-0">
        <div
          v-for="(card, index) in cards"
          :key="card.id"
          class="absolute w-20 h-32 [perspective:800px] cursor-pointer transition-transform duration-300"
          :style="{
            transform: `translate(${positions[index].x}px, ${positions[index].y}px)`,
          }"
          @click="selectCard(index)"
        >
          <div
            class="absolute inset-0 transition-transform duration-300 [transform-style:preserve-3d]"
            :class="{ '[transform:rotateY(180deg)]': card.flipped }"
          >
            <!-- Fronte -->
            <div
              v-if="card.flipped"
              class="absolute inset-0 bg-white border-2 border-emerald-400 rounded-xl flex items-center justify-center text-emerald-600 font-bold text-xl"
            >
              {{ card.isWinner ? "⭐" : "❌" }}
            </div>

            <!-- Retro -->
            <div
              v-else
              class="absolute inset-0 bg-emerald-500 border-2 border-emerald-700 rounded-xl [transform:rotateY(180deg)] flex items-center justify-center text-3xl text-white"
            >
              🎴
            </div>
          </div>
        </div>
      </transition-group>
    </div>

    <!-- Messaggio finale -->
    <div
      v-if="resultText"
      class="absolute bottom-24 text-2xl font-semibold text-center text-emerald-700 bg-white/70 px-6 py-3 rounded-xl shadow-md backdrop-blur-sm transition-opacity duration-500"
    >
      {{ resultText }}
    </div>

    <!-- Bottone restart -->
    <button
      v-if="gameOver"
      class="absolute bottom-10 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2 rounded-xl shadow-md transition"
      @click="startGame"
    >
      Gioca ancora
    </button>
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue";

const credits = ref(3);
const cards = ref([]);
const positions = ref([]);
const gameOver = ref(false);
const resultText = ref("");
let canSelect = false;

const gridPositions = [
  { x: 0, y: 0 },
  { x: 90, y: 0 },
  { x: 180, y: 0 },
  { x: 0, y: 130 },
  { x: 90, y: 130 },
  { x: 180, y: 130 },
  { x: 0, y: 260 },
  { x: 90, y: 260 },
  { x: 180, y: 260 },
];

function startGame() {
  if (credits.value <= 0) return;

  gameOver.value = false;
  resultText.value = "";
  canSelect = false;

  const winnerIndex = Math.floor(Math.random() * 9);
  cards.value = Array.from({ length: 9 }, (_, i) => ({
    id: i + "-" + Math.random(),
    isWinner: i === winnerIndex,
    flipped: true,
  }));

  positions.value = [...gridPositions];

  setTimeout(() => {
    cards.value.forEach((c) => (c.flipped = false));

    setTimeout(() => {
      animateShuffle(15, 60, () => {
        canSelect = true;
      });
    }, 500);
  }, 2000);
}

// Shuffle veloce
function animateShuffle(times, speed = 800, callback) {
  if (times <= 0) return callback?.();

  const i = Math.floor(Math.random() * 9);
  let j = Math.floor(Math.random() * 9);
  while (j === i) j = Math.floor(Math.random() * 9);

  const temp = positions.value[i];
  positions.value[i] = positions.value[j];
  positions.value[j] = temp;

  nextTick(() => {
    setTimeout(() => {
      animateShuffle(times - 1, speed, callback);
    }, speed);
  });
}

// Ora la vittoria dipende solo dalla carta scelta
function selectCard(index) {
  if (!canSelect || gameOver.value) return;
  canSelect = false;
  credits.value--;

  cards.value[index].flipped = true;

  const isWin = cards.value[index].isWinner; // <--- solo carta vincente

  setTimeout(() => {
    resultText.value = isWin ? "🎉 Hai vinto un caffè!" : "💔 Ritenta!";
    gameOver.value = true;

    if (isWin) credits.value++;
  }, 1000);
}

startGame();
</script>

<style scoped></style>
