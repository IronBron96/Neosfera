<template>
  <div class="min-h-screen flex items-center justify-center bg-[#6d00c1] p-6">
    <!-- CARD -->
    <div
      class="w-full max-w-sm bg-white border border-black rounded-2xl shadow-[6px_6px_0_0_#000] p-8 flex flex-col items-center gap-6"
    >
      <!-- TITOLO -->
      <h1 class="text-3xl font-extrabold text-black tracking-wide">
        <span
          class="px-4 py-1 bg-[#00e85f] border border-black rounded-full shadow-[4px_4px_0_0_#000]"
        >
          Accedi
        </span>
      </h1>

      <!-- FORM -->
      <form @submit.prevent="handleLogin" class="w-full flex flex-col gap-5">
        <!-- EMAIL -->
        <div class="flex flex-col gap-1">
          <label for="email" class="text-xs font-bold uppercase tracking-wide text-gray-600">
            Email
          </label>

          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="nome@esempio.com"
            class="px-4 py-2 bg-white border border-black rounded-xl shadow-[3px_3px_0_0_#000] focus:shadow-[5px_5px_0_0_#000] outline-none transition-all"
            required
          />
        </div>

        <!-- PASSWORD -->
        <div class="flex flex-col gap-1">
          <label for="password" class="text-xs font-bold uppercase tracking-wide text-gray-600">
            Password
          </label>

          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="••••••••"
            class="px-4 py-2 bg-white border border-black rounded-xl shadow-[3px_3px_0_0_#000] focus:shadow-[5px_5px_0_0_#000] outline-none transition-all"
            required
          />
        </div>

        <!-- BOTTONE ENTRA -->
        <button
          type="submit"
          :disabled="loading"
          class="mt-2 w-full h-12 bg-black text-white font-bold rounded-full shadow-[4px_4px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] active:shadow-[2px_2px_0_0_#000] disabled:opacity-50 disabled:shadow-none transition-all"
        >
          {{ loading ? 'Accesso in corso...' : 'Entra' }}
        </button>
      </form>

      <!-- ERRORE -->
      <p v-if="error" class="text-red-600 text-sm font-semibold text-center mt-2">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script setup>
  import {ref} from 'vue'
  import {useRouter} from 'vue-router'
  import directus from '../lib/directus'

  const router = useRouter()
  const email = ref('')
  const password = ref('')
  const error = ref('')
  const loading = ref(false)

  async function handleLogin() {
    error.value = ''
    loading.value = true
    try {
      // 👇 QUI la differenza: passo un oggetto
      const res = await directus.login({
        email: email.value,
        password: password.value,
      })

      // alcune versioni dell'SDK mettono il token in res.access_token
      if (res?.access_token) {
        localStorage.setItem('directus_token', res.access_token)
        localStorage.setItem('directus_refresh', res.refresh_token)
        router.push('/')
      } else {
        // se non c'è access_token, lo chiediamo al client
        const token = await directus.getToken?.()
        if (token) {
          localStorage.setItem('directus_token', token)
          router.push('/')
        } else {
          throw new Error('Login fallito')
        }
      }
    } catch (err) {
      console.error(err)
      error.value = 'Credenziali non valide o Directus non raggiungibile'
    } finally {
      loading.value = false
    }
  }
</script>
