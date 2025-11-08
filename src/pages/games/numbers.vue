<template>
  <div class="min-h-screen flex flex-col items-center overflow-hidden pt-16">
    <span
      class="text-[60px] bg-[#eaeaeb]/60 border border-white/20 rounded-2xl backdrop-blur-sm px-6 w-fit mx-auto shadow-md"
      style="color: #fbbf24"
    >
      crediti {{ credits }}
    </span>

    <p class="text-white text-xl mb-3 mt-3">
      Scegli un numero da 1 a {{ maxNumber }}
    </p>

    <div class="flex gap-4 flex-wrap justify-center">
      <button
        v-for="n in maxNumber"
        :key="n"
        class="w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold text-lg text-gray-800 hover:bg-emerald-400 hover:text-white transition transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="gameOver || win || credits === 0"
        @click="guessNumber(n)"
      >
        {{ n }}
      </button>
    </div>

    <div
      v-if="credits === 0 && !win"
      class="mt-10 text-2xl font-semibold text-red-400 drop-shadow-lg animate-fade"
    >
      🚫 Hai esaurito i crediti!
    </div>

    <div
      v-else-if="message"
      class="mt-10 text-2xl font-semibold text-white drop-shadow-lg animate-fade"
    >
      {{ message }}
    </div>

    <button
      :disabled="credits === 0"
      v-if="gameOver || win"
      class="mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
      @click="startGame"
    >
      Gioca ancora
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const credits = ref(3);
const maxNumber = 20;
const message = ref("");
const gameOver = ref(false);
const win = ref(false);

let winningNumber = Math.floor(Math.random() * maxNumber) + 1;

function startGame() {
  if (credits.value <= 0) return; // non permette di giocare se i crediti sono finiti

  gameOver.value = false;
  win.value = false;
  message.value = "";
  winningNumber = Math.floor(Math.random() * maxNumber) + 1;
}

function guessNumber(n) {
  if (gameOver.value || win.value || credits.value === 0) return;

  credits.value--;

  if (n === winningNumber) {
    win.value = true;
    message.value = "🎉 Complimenti! Hai indovinato!";
  } else {
    gameOver.value = true;
    message.value = `💔 Peccato! Il numero era ${winningNumber}.`;
  }
}

// start automatico
startGame();
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
