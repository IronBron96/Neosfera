// src/lib/auth.ts
import directus from "./directus";

const TOKEN_KEY = "directus_token";
const REFRESH_KEY = "directus_refresh";
const LAST_ACTIVE_KEY = "last_active";

export function updateLastActive() {
  localStorage.setItem(LAST_ACTIVE_KEY, Date.now().toString());
}

export async function login(email: string, password: string) {
  const auth = await directus.login({ email, password });

  if (auth?.access_token) {
    localStorage.setItem(TOKEN_KEY, auth.access_token);
    localStorage.setItem(LAST_ACTIVE_KEY, Date.now().toString()); // ✅ salva ultimo accesso
    await directus.setToken(auth.access_token);
  }
  if (auth?.refresh_token)
    localStorage.setItem(REFRESH_KEY, auth.refresh_token);

  return auth;
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(LAST_ACTIVE_KEY);
  directus.setToken(null);
}
