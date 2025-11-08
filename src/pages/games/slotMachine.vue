<template>
  <div class="min-h-screen flex flex-col items-center pt-16">
    <!-- Crediti -->
    <span
      class="text-[60px] bg-[#eaeaeb]/60 border border-white/20 rounded-2xl backdrop-blur-sm px-6 w-fit mx-auto shadow-md mb-6"
      style="color: #f59e0b"
    >
      crediti {{ credits }}
    </span>

    <!-- Slot machine -->
    <div class="flex gap-6 mb-6">
      <div
        v-for="(symbol, i) in currentSymbols"
        :key="i"
        class="w-20 h-20 bg-white rounded-xl flex items-center justify-center text-3xl font-bold shadow-md select-none"
      >
        {{ symbol }}
      </div>
    </div>

    <!-- Pulsante Gira/Ferma -->
    <button
      :disabled="credits === 0 || gameOver || win"
      class="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed mb-6"
      @click="handleButton"
    >
      {{ spinning ? "Ferma Rullo" : "Gira" }}
    </button>

    <!-- Messaggio -->
    <div
      v-if="message"
      class="text-2xl font-semibold text-white drop-shadow-lg animate-fade mb-6"
    >
      {{ message }}
    </div>

    <!-- Gioca ancora -->
    <button
      v-if="gameOver || win"
      :disabled="credits === 0"
      class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
      @click="startGame"
    >
      Gioca ancora
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const credits = ref(3);
const symbols = [
  "🍒",
  "🍋",
  "🔔",
  "⭐",
  "🍉",
  "🥭",
  "🍇",
  "🍍",
  "🍎",
  "🍏",
  "🍌",
  "🍑",
];
const currentSymbols = ref(["❓", "❓", "❓"]);

const spinning = ref(false);
const stopped = ref([false, false, false]);
const stopIndex = ref(0);
const message = ref("");
const gameOver = ref(false);
const win = ref(false);

let spinInterval;
let forcedWin = false;

function startGame() {
  if (credits.value <= 0) return;

  currentSymbols.value = ["❓", "❓", "❓"];
  spinning.value = false;
  stopped.value = [false, false, false];
  stopIndex.value = 0;
  message.value = "";
  gameOver.value = false;
  win.value = false;

  forcedWin = Math.random() < 0.05; // 5% probabilità di vincita
}

function startSpin() {
  if (credits.value === 0) return;

  spinning.value = true;
  stopped.value = [false, false, false];
  stopIndex.value = 0;
  message.value = "";

  spinInterval = setInterval(() => {
    currentSymbols.value = currentSymbols.value.map((s, i) =>
      !stopped.value[i]
        ? symbols[Math.floor(Math.random() * symbols.length)]
        : s
    );
  }, 100);
}

function handleButton() {
  if (!spinning.value) {
    startSpin();
    return;
  }

  // Ferma il rullo corrente
  stopReel(stopIndex.value);
}

function stopReel(index) {
  if (stopped.value[index] || credits.value === 0) return;

  stopped.value[index] = true;

  if (forcedWin) {
    // Tutti i rulli fermano lo stesso simbolo
    const chosen = symbols[Math.floor(Math.random() * symbols.length)];
    currentSymbols.value[index] = chosen;
  } else {
    currentSymbols.value[index] =
      symbols[Math.floor(Math.random() * symbols.length)];
  }

  // Se il secondo rullo fermato è diverso dal primo, fine immediata
  if (index === 1 && currentSymbols.value[1] !== currentSymbols.value[0]) {
    endGame(false);
    return;
  }

  stopIndex.value++;

  // Se tutti fermi
  if (stopped.value.every((s) => s)) {
    // Controllo vincita solo se non era stato interrotto dal secondo
    const allSame = currentSymbols.value.every(
      (s) => s === currentSymbols.value[0]
    );
    endGame(allSame);
  }
}

function endGame(isWin) {
  clearInterval(spinInterval);
  spinning.value = false;
  win.value = isWin;
  gameOver.value = !isWin;

  if (isWin) {
    message.value = "🎉 Hai vinto!";
  } else {
    message.value = "💔 Ritenta!";
  }

  credits.value = Math.max(credits.value - 1, 0);
}

// Start automatico
startGame();

onMounted(() => {
  document.body.style.overflow = "hidden";
});

onUnmounted(() => {
  document.body.style.overflow = "";
});
</script>

<style scoped>
.animate-fade {
  animation: fadeIn 0.5s ease forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
