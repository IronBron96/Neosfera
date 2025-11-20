// src/lib/auth.ts
import directus from './directus'
import {refresh} from '@directus/sdk'

export const TOKEN_KEY = 'directus_token'
export const REFRESH_KEY = 'directus_refresh'
export const LAST_ACTIVE_KEY = 'last_active'

export function updateLastActive() {
  localStorage.setItem(LAST_ACTIVE_KEY, Date.now().toString())
}

export async function login(email: string, password: string) {
  const auth = await directus.login({email, password})

  if (auth?.access_token) {
    localStorage.setItem(TOKEN_KEY, auth.access_token)
    updateLastActive() // salva ultimo uso
    await directus.setToken(auth.access_token)
  }

  if (auth?.refresh_token) {
    localStorage.setItem(REFRESH_KEY, auth.refresh_token)
  }

  return auth
}

export async function refreshSession() {
  const refreshToken = localStorage.getItem(REFRESH_KEY)
  if (!refreshToken) {
    throw new Error('Nessun refresh token')
  }

  // chiede a Directus un nuovo access_token + (eventuale) nuovo refresh_token
  const result = await directus.request(refresh({mode: 'json', refresh_token: refreshToken}))

  const newAccess = result?.access_token
  const newRefresh = result?.refresh_token

  if (!newAccess) {
    throw new Error('Refresh fallito: nessun access_token')
  }

  localStorage.setItem(TOKEN_KEY, newAccess)
  await directus.setToken(newAccess)

  if (newRefresh) {
    localStorage.setItem(REFRESH_KEY, newRefresh)
  }

  updateLastActive()

  return newAccess
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(REFRESH_KEY)
  localStorage.removeItem(LAST_ACTIVE_KEY)
  directus.setToken(null)
}
