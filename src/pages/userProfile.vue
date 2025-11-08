<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col"
  >
    <main class="max-w-md mx-auto flex-1 px-4 pt-16">
      <div class="flex flex-col items-center text-center gap-6">
        <!-- Avatar -->
        <n-image
          :src="avatarDataUrl"
          alt="Avatar utente"
          width="140"
          height="140"
          class="rounded-full shadow-lg border border-gray-200 bg-white"
          preview-disabled
        />

        <!-- Nickname -->
        <div>
          <h1 class="text-2xl font-bold text-gray-800 mb-2">
            {{ nickname }}
          </h1>
          <p class="text-gray-600">Il tuo profilo personale</p>
        </div>

        <n-button type="warning" strong secondary round @click="generateAvatar">
          Cambia avatar
        </n-button>
        <n-button type="primary" strong secondary round @click="changeNickname">
          Cambia nickname
        </n-button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { createAvatar } from "@dicebear/core";
import { avataaars } from "@dicebear/collection";

const nickname = ref("NeoUser");
const avatarDataUrl = ref("");

function generateAvatar() {
  // genera una seed casuale ogni volta
  const seed = nickname.value + Math.random().toString(36).substring(2, 8);

  const svg = createAvatar(avataaars, {
    seed,
    size: 140,
    backgroundColor: [],
    accessoriesChance: 80,
    accessoriesProbability: 80,
  }).toString();

  avatarDataUrl.value = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function changeNickname() {
  const newNickname = prompt(
    "Inserisci il tuo nuovo nickname:",
    nickname.value
  );
  if (newNickname && newNickname.trim() !== "") {
    nickname.value = newNickname.trim();
    generateAvatar();
  }
}

// genera subito il primo avatar
generateAvatar();
</script>

<style scoped>
.n-button {
  min-width: 160px;
  justify-content: center;
}
</style>
