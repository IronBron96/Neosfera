<template>
  <div class="h-full">
    <main class="max-w-md mx-auto flex-1 px-4 pt-12 pb-24">
      <!-- CARD PROFILO -->
      <div
        class="bg-white border border-black rounded-2xl shadow-[6px_6px_0_0_#000] px-6 py-6 text-center flex flex-col items-center gap-6"
      >
        <!-- Nickname + titolo -->
        <div class="flex flex-col items-center gap-2">
          <span class="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">
            Il tuo profilo
          </span>
          <h1 class="text-4xl font-extrabold text-black leading-tight">
            <span
              class="inline-block px-4 py-1 bg-[#EFFF00] border border-black rounded-full shadow-[4px_4px_0_0_#000]"
            >
              {{ nickname }}
            </span>
          </h1>
        </div>

        <!-- Avatar -->
        <div
          class="relative mt-2 w-[150px] h-[150px] rounded-full border border-black bg-black flex items-center justify-center"
        >
          <n-image
            :src="avatarDataUrl"
            alt="Avatar utente"
            width="130"
            height="130"
            class="rounded-full border border-black bg-white"
            preview-disabled
          />
        </div>

        <!-- Pulsanti avatar -->
        <div class="flex items-center justify-center gap-3">
          <!-- apre modale -->
          <n-button
            type="primary"
            strong
            secondary
            round
            class="!bg-[#EFFF00] !text-black !font-bold !border-2 !border-black !rounded-full !px-3 !h-10 shrink-0 max-w-full shadow-[4px_4px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] active:shadow-[2px_2px_0_0_#000]"
            @click="showAvatarModal = true"
          >
            Cambia avatar
          </n-button>

          <!-- random -->
          <n-button
            type="primary"
            quaternary
            circle
            class="!bg-black !text-white !font-bold !border-2 !border-black !h-10 shrink-0 shadow-[4px_4px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] active:shadow-[2px_2px_0_0_#000]"
            @click="generateRandomAvatar"
            title="Avatar casuale"
          >
            <template #icon>🎲</template>
            Random
          </n-button>
        </div>

        <!-- Pulsante nickname -->
        <div class="mt-2 w-full">
          <n-button
            type="primary"
            strong
            secondary
            round
            block
            class="!bg-[#00e85f] !text-black !font-bold !rounded-full !h-11 shadow-[4px_4px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] active:shadow-[2px_2px_0_0_#000]"
            @click="changeNickname"
          >
            Cambia nickname
          </n-button>
        </div>
      </div>
    </main>

    <!-- MODALE SCELTA AVATAR -->
    <n-modal v-model:show="showAvatarModal">
      <n-card
        style="max-width: 520px; width: 100%"
        title="Scegli un avatar"
        :bordered="false"
        size="large"
        role="dialog"
        aria-modal="true"
        class="border border-black rounded-2xl shadow-[6px_6px_0_0_#000]"
      >
        <div class="max-h-72 overflow-y-auto grid grid-cols-3 gap-4 pt-2 pb-1">
          <button
            v-for="seed in presetSeeds"
            :key="seed"
            type="button"
            class="flex flex-col items-center gap-2 p-2 rounded-2xl border border-black bg-white shadow-[3px_3px_0_0_#000] hover:shadow-[5px_5px_0_0_#000] active:shadow-[2px_2px_0_0_#000] transition-shadow"
            @click="selectPresetAvatar(seed)"
          >
            <n-image
              :src="makeAvatarDataUrl(seed)"
              width="80"
              height="80"
              class="rounded-full border border-black bg-white"
              preview-disabled
            />
            <span class="text-xs text-gray-600 font-medium truncate max-w-[80px]">
              {{ seed }}
            </span>
          </button>
        </div>

        <template #footer>
          <div class="flex justify-end gap-2">
            <n-button
              circle
              class="!border-2 !border-black !rounded-full shadow-[3px_3px_0_0_#000] hover:shadow-[4px_4px_0_0_#000] active:shadow-[2px_2px_0_0_#000]"
              @click="showAvatarModal = false"
            >
              Chiudi
            </n-button>
          </div>
        </template>
      </n-card>
    </n-modal>
  </div>
</template>

<script setup>
  import {ref, onMounted} from 'vue'
  import {createAvatar} from '@dicebear/core'
  import {avataaars} from '@dicebear/collection'
  import directus, {getUser, safeRequest} from '../lib/directus'
  import {readItems, createItem, updateItem} from '@directus/sdk'

  // ancora required
  const DEFAULT_PLACE_ID = '667a894c-9a3a-4383-b334-9e4b3456dfc8'

  const nickname = ref('')
  const avatarDataUrl = ref('')
  const profileId = ref(null)
  const currentUserId = ref(null)
  const avatarSeed = ref('')

  // stato modale
  const showAvatarModal = ref(false)

  // elenco di avatar predefiniti (puoi cambiarli)
  const presetSeeds = [
    'neo-cat',
    'blue-robot',
    'sunny-girl',
    'coder-boy',
    'ninja',
    'explorer',
    'space-rider',
    'happy-user',
    'purple-owl',
    'forest-fox',
    'cyber-dog',
    'punk-panda',
    'astronaut',
    'artist',
    'fire-dragon',
    'mountain-hiker',
    'ocean-dolphin',
    'retro-hero',
    'wizard',
    'knight',
    'chef',
    'gamer',
    'samurai',
  ]

  function makeAvatarDataUrl(seed) {
    const svg = createAvatar(avataaars, {
      seed,
      size: 140,
      backgroundColor: [],
      accessoriesChance: 80,
      accessoriesProbability: 80,
    }).toString()

    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
  }

  onMounted(async () => {
    const me = await getUser()
    if (!me) return
    currentUserId.value = me.id

    // cerco il profilo
    const profiles = await safeRequest(() =>
      directus.request(
        readItems('ns_users', {
          filter: {directus_user: {_eq: me.id}},
          limit: 1,
        })
      )
    )

    let profile = profiles?.[0]

    if (!profile) {
      const seed = me.id
      profile = await safeRequest(() =>
        directus.request(
          createItem('ns_users', {
            directus_user: me.id,
            username: 'NeoUser',
            avatar_seed: seed,
            avatar_url: seed, // perché è required nel tuo schema
            places_id: DEFAULT_PLACE_ID,
          })
        )
      )
    }

    profileId.value = profile.id
    nickname.value = profile.username || 'NeoUser'
    avatarSeed.value = profile.avatar_seed || profile.avatar_url || currentUserId.value

    avatarDataUrl.value = makeAvatarDataUrl(avatarSeed.value)
  })

  // selezione da modale
  async function selectPresetAvatar(seed) {
    if (!profileId.value) return

    avatarSeed.value = seed
    avatarDataUrl.value = makeAvatarDataUrl(seed)

    await safeRequest(() =>
      directus.request(
        updateItem('ns_users', profileId.value, {
          avatar_seed: seed,
          avatar_url: seed,
        })
      )
    )

    showAvatarModal.value = false
  }

  // avatar casuale (come prima)
  async function generateRandomAvatar() {
    if (!currentUserId.value || !profileId.value) return

    const newSeed = currentUserId.value + Math.random().toString(36).substring(2, 8)
    avatarSeed.value = newSeed
    avatarDataUrl.value = makeAvatarDataUrl(newSeed)

    await safeRequest(() =>
      directus.request(
        updateItem('ns_users', profileId.value, {
          avatar_url: newSeed,
        })
      )
    )
  }

  async function changeNickname() {
    if (!profileId.value) return

    const newNickname = prompt('Inserisci il tuo nuovo nickname:', nickname.value)
    if (!newNickname || newNickname.trim() === '') return

    nickname.value = newNickname.trim()

    await safeRequest(() =>
      directus.request(
        updateItem('ns_users', profileId.value, {
          username: nickname.value,
        })
      )
    )
  }
</script>

<style scoped>
  .n-button {
    min-width: 160px;
    justify-content: center;
  }

  /* se non usi icone mdi puoi sostituire l'i con una emoji 😊 */
  .i-mdi-dice-multiple {
    display: inline-block;
    width: 1.25rem;
    height: 1.25rem;
  }
</style>
