// src/lib/directus.ts
import { createDirectus, rest, authentication, readMe } from "@directus/sdk";
import router from "../router";
import { logout } from "./auth";

const directus = createDirectus("https://directus-thomas.webcloud.cloud/")
  .with(rest())
  .with(authentication("json"));

export default directus;

// wrapper per tutte le richieste
export async function safeRequest(fn: () => Promise<any>) {
  try {
    return await fn();
  } catch (err: any) {
    // controlla se il token è scaduto
    if (err?.errors?.[0]?.extensions?.code === "TOKEN_EXPIRED") {
      console.warn("Token scaduto, forzando logout");
      await logout();
      router.push({ name: "login" });
      throw new Error("Sessione scaduta, fai login di nuovo");
    }
    throw err;
  }
}

export async function useUser() {
  const token = localStorage.getItem("directus_token");
  if (!token) {
    router.push({ name: "login" });
    return null;
  }

  await directus.setToken(token);

  try {
    // uso safeRequest per gestire eventuale token scaduto
    return await safeRequest(() => directus.request(readMe()));
  } catch {
    return null;
  }
}

export async function getUser() {
  const u = await useUser(); // aspetta la Promise
  return u;
}
