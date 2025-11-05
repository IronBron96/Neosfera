<template>
  <div class="min-h-screen flex items-center justify-center bg-neutral-900 text-neutral-100">
    <div
      class="w-full max-w-sm bg-neutral-800 rounded-xl shadow-lg p-8 flex flex-col items-center gap-6"
    >
      <h1 class="text-2xl font-semibold text-white tracking-wide">Accedi</h1>

      <form @submit.prevent="handleLogin" class="w-full flex flex-col gap-4">
        <div class="flex flex-col gap-1">
          <label for="email" class="text-sm text-neutral-400">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="nome@esempio.com"
            class="px-3 py-2 rounded-lg bg-neutral-700 text-white outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div class="flex flex-col gap-1">
          <label for="password" class="text-sm text-neutral-400">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="••••••••"
            class="px-3 py-2 rounded-lg bg-neutral-700 text-white outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="mt-2 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition font-medium text-white disabled:opacity-50"
        >
          {{ loading ? 'Accesso in corso...' : 'Entra' }}
        </button>
      </form>

      <p v-if="error" class="text-red-400 text-sm text-center">
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
