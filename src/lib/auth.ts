// src/lib/auth.ts
import directus from './directus'
import {readMe} from '@directus/sdk'

const TOKEN_KEY = 'directus_token'
const REFRESH_KEY = 'directus_refresh'

export async function restoreSession() {
  const token = localStorage.getItem(TOKEN_KEY)
  const refresh = localStorage.getItem(REFRESH_KEY)

  if (token) {
    await directus.setToken(token)

    try {
      await directus.request(readMe())
      return true
    } catch (e) {
      // se vuoi puoi tenere anche qui il tentativo di refresh
      if (refresh) {
        try {
          const refreshed = await directus.refresh({refresh_token: refresh})

          if (refreshed?.access_token) {
            localStorage.setItem(TOKEN_KEY, refreshed.access_token)
            await directus.setToken(refreshed.access_token)
          }
          if (refreshed?.refresh_token) {
            localStorage.setItem(REFRESH_KEY, refreshed.refresh_token)
          }

          await directus.request(readMe())
          return true
        } catch {
          console.warn('Sessione scaduta, refresh non riuscito')
        }
      }
    }
  }

  return false
}

export async function login(email: string, password: string) {
  const auth = await directus.login({email, password})

  if (auth?.access_token) {
    localStorage.setItem(TOKEN_KEY, auth.access_token)
    await directus.setToken(auth.access_token)
  }
  if (auth?.refresh_token) {
    localStorage.setItem(REFRESH_KEY, auth.refresh_token)
  }

  return auth
}

export async function logout() {
  // 🔴 niente chiamata a /auth/logout, perché il server la rifiuta
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(REFRESH_KEY)

  // opzionale: togli anche il token dal client Directus
  try {
    await directus.setToken(null)
  } catch (e) {
    // non è grave
  }
}
