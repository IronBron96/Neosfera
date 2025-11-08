<template>
  <div
    class="min-h-screen flex flex-col items-center bg-gray-100 relative overflow-hidden pt-16"
  >
    <!-- Crediti -->
    <span
      class="text-[60px] bg-[#eaeaeb]/60 border border-white/20 rounded-2xl backdrop-blur-sm px-6 w-fit mx-auto shadow-md mb-6"
      style="color: #10b981"
    >
      crediti {{ credits }}
    </span>

    <!-- Livello corrente -->
    <div class="flex gap-12 perspective-[1000px]">
      <div
        v-for="(door, i) in [0, 1]"
        :key="i"
        class="door w-32 h-48 rounded-lg shadow-lg flex items-center justify-center cursor-pointer transform-origin-left transition-transform duration-700"
        :class="{
          'open-left': i === 0 && doorOpen && chosenDoor === 0,
          'open-right': i === 1 && doorOpen && chosenDoor === 1,
          'door-left': i === 0,
          'door-right': i === 1,
          disabled: gameOver || win || credits === 0,
        }"
        @click="chooseDoor(i)"
      >
        🚪
      </div>
    </div>

    <!-- Messaggio -->
    <div
      v-if="credits === 0 && !win"
      class="mt-10 text-2xl font-semibold text-red-500 animate-fade"
    >
      🚫 Hai esaurito i crediti!
    </div>

    <div
      v-else-if="message"
      class="mt-10 text-2xl font-semibold text-gray-700 animate-fade"
    >
      {{ message }}
    </div>

    <!-- Restart -->
    <button
      :disabled="credits === 0"
      v-if="gameOver || win"
      class="mt-8 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
      @click="startGame"
    >
      Gioca ancora
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const credits = ref(3); // crediti iniziali
const level = ref(1);
const maxLevel = 4;
const message = ref("");
const gameOver = ref(false);
const win = ref(false);
const chosenDoor = ref(null);
const doorOpen = ref(false);

let correctDoor = Math.floor(Math.random() * 2);

function startGame() {
  if (credits.value <= 0) return; // non permette di giocare senza crediti

  level.value = 1;
  gameOver.value = false;
  win.value = false;
  message.value = "";
  chosenDoor.value = null;
  doorOpen.value = false;
  correctDoor = Math.floor(Math.random() * 2);
}

function chooseDoor(index) {
  if (gameOver.value || win.value || doorOpen.value || credits.value === 0)
    return;

  chosenDoor.value = index;
  doorOpen.value = true; // inizia animazione apertura

  setTimeout(() => {
    if (index === correctDoor) {
      if (level.value === maxLevel) {
        win.value = true;
        credits.value--; // scala solo alla vittoria
        message.value = "🎉 Hai vinto! Complimenti!";
      } else {
        level.value++;
        message.value = "✅ Porta corretta! Vai avanti...";
        chosenDoor.value = null;
        doorOpen.value = false;
        correctDoor = Math.floor(Math.random() * 2);
      }
    } else {
      gameOver.value = true;
      credits.value--; // scala solo al game over
      message.value = "💀 Game Over!";
    }
  }, 700); // coincide con durata animazione
}

// start automatico
startGame();

onMounted(() => {
  document.body.style.overflow = "hidden";
});

onUnmounted(() => {
  document.body.style.overflow = "";
});
</script>

<style scoped>
.door-left {
  transform-origin: left center;
  background-color: #2563eb; /* blu */
}

.door-right {
  transform-origin: right center;
  background-color: #dc2626; /* rosso */
}

/* Apertura porte */
.open-left {
  transform: rotateY(-90deg);
}
.open-right {
  transform: rotateY(90deg);
}

.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

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
