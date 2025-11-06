// src/lib/directus.ts
import {createDirectus, rest, authentication, readMe} from '@directus/sdk'

const directus = createDirectus('https://directus-thomas.webcloud.cloud/')
  .with(rest())
  .with(authentication('json'))

export default directus

export async function useUser() {
  const token = localStorage.getItem('directus_token')
  if (!token) return null

  await directus.setToken(token)
  try {
    return await directus.request(readMe())
  } catch {
    return null
  }
}
