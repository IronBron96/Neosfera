<template>
  <div class="w-full flex flex-col items-center justify-center py-8 px-4">
    <!-- TITOLO / TESTO -->
    <div
      class="inline-block text-center mb-16 px-4 py-3 bg-[#EFFF00] border border-black rounded-full shadow-[4px_4px_0_0_#000]"
    >
      <h2 class="text-5xl font-extrabold text-black">1 bustina omaggio!</h2>
    </div>

    <!-- CONTAINER BUSTINA + CARTE -->
    <div
      class="relative pack-container max-w-[260px] w-full h-[320px]"
      :class="{'pack-container--open': isOpen}"
    >
      <!-- Carte -->
      <div
        v-for="(card, index) in cards"
        :key="card.seed"
        class="pack-card"
        :class="{'pack-card--active': activeCardIndex === index}"
        :style="{'--index': index}"
        @click.stop="setActiveCard(index)"
      >
        <div class="pack-card-inner">
          <!-- retro / bordo -->
          <div class="pack-card-frame">
            <n-image
              :src="card.dataUrl"
              alt="Avatar figurina"
              width="100"
              height="100"
              class="rounded-2xl border border-black bg-white"
              preview-disabled
            />
          </div>
        </div>
      </div>

      <!-- Bustina -->
      <img
        v-if="!isOpen"
        src="../assets/Cards/pack-closed.png"
        alt="Bustina chiusa"
        class="pack-image pack-image--closed"
      />
      <img
        v-else
        src="../assets/Cards/pack-open.png"
        alt="Bustina aperta"
        class="pack-image pack-image--open"
      />
    </div>

    <!-- PULSANTE APRI / NUOVA BUSTINA -->
    <div class="mt-6 flex gap-3">
      <n-button
        type="primary"
        strong
        round
        class="!bg-[#EFFF00] !text-black !font-bold !border-2 !border-black !rounded-full !px-4 !h-11 shadow-[6px_6px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] active:shadow-[2px_2px_0_0_#000]"
        @click="handleOpen"
      >
        {{ isOpen ? 'Nuova bustina' : 'Apri bustina' }}
      </n-button>
    </div>
  </div>
</template>

<script setup>
  import {ref} from 'vue'
  import {createAvatar} from '@dicebear/core'
  import {avataaars} from '@dicebear/collection'

  const isOpen = ref(false)

  // indice della carta in primo piano (null = nessuna)
  const activeCardIndex = ref(null)

  // 5 carte del “pacchetto”
  const cards = ref([])

  function makeAvatarDataUrl(seed) {
    const svg = createAvatar(avataaars, {
      seed,
      size: 120,
      backgroundColor: [],
      accessoriesChance: 80,
      accessoriesProbability: 80,
    }).toString()

    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
  }

  function generateNewPack() {
    const newCards = []

    for (let i = 0; i < 5; i++) {
      const seed = 'pack-' + Math.random().toString(36).substring(2, 8) + '-' + i.toString()

      newCards.push({
        seed,
        dataUrl: makeAvatarDataUrl(seed),
      })
    }

    cards.value = newCards
    activeCardIndex.value = null
  }

  /**
   * - se la bustina è chiusa → apre (usando le carte già generate)
   * - se è già aperta → genera un nuovo pack e la richiude
   *   (l’utente dovrà ricliccare per aprirla)
   */
  function handleOpen() {
    if (!isOpen.value) {
      if (!cards.value.length) {
        generateNewPack()
      }
      isOpen.value = true
    } else {
      generateNewPack()
      isOpen.value = false
    }
  }

  // click su una carta: porta in primo piano / chiude
  function setActiveCard(index) {
    if (activeCardIndex.value === index) {
      activeCardIndex.value = null
    } else {
      activeCardIndex.value = index
    }
  }

  generateNewPack()
</script>

<style scoped>
  .pack-container {
    position: relative;
    margin: 0 auto;
  }

  /* Immagine bustina */
  .pack-image {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 310px;
    height: auto;
    transform: translateX(-50%);
    image-rendering: auto;
    transition: transform 0.3s ease;
    filter: drop-shadow(6px 6px 0 #000);
    z-index: 1;
  }

  .pack-image--closed {
    transform: translateX(-50%) translateY(0);
  }

  .pack-container--open .pack-image--open {
    transform: translateX(-50%) translateY(8px) rotate(-4deg);
  }

  /* Carte */
  .pack-card {
    position: absolute;
    /* punto base: dentro la bustina, verso la metà superiore */
    bottom: 170px; /* <--- più vicino alla busta */
    left: 50%;
    width: 120px;
    height: 160px;
    transform: translateX(-50%) translateY(60px) scale(0.4);
    opacity: 0;
    pointer-events: none;
    z-index: 2;
    cursor: pointer;
    transition:
      transform 0.25s ease,
      box-shadow 0.25s ease;
  }

  /* quando la bustina è aperta, le carte diventano cliccabili */
  .pack-container--open .pack-card {
    pointer-events: auto;
  }

  /* Animazione: escono dritte dalla bocca della bustina,
     poi si aprono a ventaglio e si distanziano */
  .pack-container--open .pack-card {
    animation: card-pop 0.6s forwards;
    animation-delay: calc(var(--index) * 0.12s);
  }

  .pack-card-inner {
    width: 100%;
    height: 100%;
    border-radius: 20px;
    background: #ffffff;
    border: 4px solid #000000;
    box-shadow: 6px 6px 0 #000000;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .pack-card-frame {
    width: 100px;
    height: 130px;
    border-radius: 18px;
    background: #f5f5f5;
    border: 3px solid #000;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Carta “in primo piano” */
  .pack-card--active {
    transform: translateX(-50%) translateY(60px) scale(1.5) rotate(0deg) !important;
    z-index: 5;
    box-shadow: 10px 10px 0 #000000;
  }

  /* Keyframes:
     - 0%: molto bassa e piccola, dentro/alla bocca della bustina
     - 40%: si alza dritta sopra la bustina
     - 100%: si apre a ventaglio e si distanzia lateralmente
  */
  @keyframes card-pop {
    0% {
      transform: translateX(-50%) translateY(60px) scale(0.4) rotate(0deg);
      opacity: 0;
    }
    40% {
      transform: translateX(-50%) translateY(0px) scale(0.7) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateX(calc(-50% + (var(--index) - 2) * 80px)) translateY(-40px) scale(1)
        rotate(calc(-12deg + var(--index) * 6deg));
      opacity: 1;
    }
  }
</style>
