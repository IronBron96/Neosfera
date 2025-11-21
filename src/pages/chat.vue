<template>
  <div class="min-h-screen max-w-[450px] m-auto flex flex-col">
    <div class="flex items-center justify-center gap-3 mt-4">
      <div
        class="inline-block text-center px-4 py-1 bg-[#EFFF00] border border-black rounded-full shadow-[4px_4px_0_0_#000]"
      >
        <p class="text-2xl font-extrabold text-black leading-tight">Chat Globale</p>
        <p class="text-xs text-black">24 membri • attivi ora</p>
      </div>
    </div>

    <!-- Messaggi -->
    <main class="flex-1">
      <div class="max-w-md mx-auto px-4 py-4">
        <n-scrollbar ref="scrollRef" style="max-height: calc(100vh - 220px)">
          <div class="space-y-4">
            <!-- Separatore data -->
            <div class="flex items-center justify-center">
              <span
                class="text-[10px] uppercase tracking-widest text-gray-400 bg-[#27272a]/70 px-3 py-1 rounded-full"
              >
                {{ todayLabel }}
              </span>
            </div>

            <div
              v-for="m in messages"
              :key="m.id"
              class="flex w-full"
              :class="m.self ? 'justify-end' : 'justify-start'"
            >
              <div
                class="flex items-end gap-2 max-w-[80%]"
                :class="m.self ? 'flex-row-reverse' : 'flex-row'"
              >
                <n-avatar
                  round
                  :size="28"
                  :src="m.avatar"
                  class="border border-black rounded-full shadow-[2px_2px_0_0_#000]"
                />
                <div>
                  <div
                    class="rounded-2xl px-3 py-2 shadow-lg"
                    :class="
                      m.self
                        ? 'bg-gradient-to-br from-[#00FF7B] to-[#00C4FF] text-black rounded-br-sm'
                        : 'bg-gradient-to-br from-[#606067] to-black text-gray-100 rounded-bl-sm'
                    "
                  >
                    <p class="text-sm leading-snug break-words whitespace-pre-wrap">
                      <span v-if="m.replyTo" class="block text-xs opacity-80 italic mb-1">
                        ↪︎ {{ m.replyTo }}
                      </span>
                      {{ m.text }}
                    </p>
                  </div>
                  <div
                    class="mt-1 text-[10px]"
                    :class="m.self ? 'text-orange-700/80 text-right' : 'text-gray-400/80'"
                  >
                    {{ m.time }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </n-scrollbar>
      </div>
    </main>
    <!-- Composer -->
    <footer class="sticky bottom-0 bg-black border-t border-black/10">
      <div class="max-w-md mx-auto px-3 py-3">
        <div class="flex items-end gap-2">
          <n-button circle quaternary @click="toggleEmoji">
            <template #icon>
              <n-icon :size="20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  <line x1="9" y1="9" x2="9.01" y2="9" />
                  <line x1="15" y1="9" x2="15.01" y2="9" />
                </svg>
              </n-icon>
            </template>
          </n-button>

          <n-input
            ref="inputRef"
            v-model:value="draft"
            type="textarea"
            autosize
            :maxlength="500"
            placeholder="Scrivi un messaggio..."
            class="flex-1 rounded-2xl"
            @keydown.enter.exact.prevent="sendMessage"
          />

          <n-button type="primary" round :disabled="!canSend" @click="sendMessage">
            <template #icon>
              <n-icon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
              </n-icon>
            </template>
          </n-button>
        </div>

        <!-- Fake emoji picker -->
        <transition name="fade">
          <div
            v-if="showEmoji"
            class="mt-2 bg-[#27272a] rounded-xl p-2 grid grid-cols-8 gap-1 border border-white/5"
          >
            <button
              v-for="e in emojis"
              :key="e"
              class="text-xl leading-none py-2 hover:scale-110 transition"
              @click="appendEmoji(e)"
            >
              {{ e }}
            </button>
          </div>
        </transition>
      </div>
    </footer>
  </div>
</template>

<script setup>
  import {useRouter} from 'vue-router'

  const router = useRouter()

  const me = ref({
    id: 'me',
    name: 'Tu',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop',
  })

  const messages = ref([
    {
      id: 1,
      user: 'Marco',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
      text: 'Benvenuti nella chat del bar! ☕️',
      time: '10:20',
      self: false,
    },
    {
      id: 2,
      user: 'Sofia',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop',
      text: 'Qualcuno vuole dividere una torta? 🍰',
      time: '10:22',
      self: false,
    },
    {
      id: 3,
      user: me.value.name,
      avatar: me.value.avatar,
      text: 'Io ci sto! Quale preferite?',
      time: '10:23',
      self: true,
    },
  ])

  const draft = ref('')
  const inputRef = ref(null)
  const scrollRef = ref(null)

  const todayLabel = computed(() =>
    new Date().toLocaleDateString('it-IT', {
      weekday: 'long',
      day: '2-digit',
      month: 'short',
    })
  )
  const canSend = computed(() => draft.value.trim().length > 0)

  const showEmoji = ref(false)
  const emojis = [
    '☕️',
    '🥐',
    '🍰',
    '😄',
    '👍',
    '🔥',
    '😍',
    '🎉',
    '🤌',
    '😋',
    '💬',
    '✨',
    '🧁',
    '🍫',
    '🍪',
    '🍩',
  ]

  function goBack() {
    router.back()
  }

  function toggleEmoji() {
    showEmoji.value = !showEmoji.value
    if (showEmoji.value) inputRef.value?.focus()
  }

  function appendEmoji(e) {
    draft.value += e
    inputRef.value?.focus()
  }

  function clockNow() {
    const d = new Date()
    return d.toLocaleTimeString('it-IT', {hour: '2-digit', minute: '2-digit'})
  }

  function scrollToBottom() {
    nextTick(() => {
      scrollRef.value?.scrollTo({
        position: 'bottom',
        behavior: 'smooth',
      })
    })
  }

  function sendMessage() {
    if (!canSend.value) return
    messages.value.push({
      id: Date.now(),
      user: me.value.name,
      avatar: me.value.avatar,
      text: draft.value.trim(),
      time: clockNow(),
      self: true,
    })
    draft.value = ''
    showEmoji.value = false
    scrollToBottom()
    // simulazione risposta bot
    setTimeout(() => {
      messages.value.push({
        id: Date.now() + 1,
        user: 'Barista Bot',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop',
        text: 'Grazie per il messaggio! Vuoi vedere il menu del giorno? 📋',
        time: clockNow(),
        self: false,
      })
      scrollToBottom()
    }, 800)
  }

  nextTick(scrollToBottom)
</script>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.15s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
