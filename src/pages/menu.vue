<template>
  <div class="min-h-screen flex flex-col">
    <!-- Contenuto principale -->
    <main class="max-w-md mx-auto flex-1 px-4 pt-16 pb-28">
      <div class="space-y-6">
        <span class="text-3xl font-bold text-light mb-6">Il nostro menù</span>
        <!-- Categorie -->
        <div v-for="cat in menu" :key="cat.id" class="space-y-3">
          <div class="flex items-center gap-2">
            <n-icon color="#EF8354" :size="22">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path d="M4 6h16M4 10h16M10 14h10M4 18h10" />
              </svg>
            </n-icon>
            <h3 class="text-beige font-semibold text-lg">{{ cat.name }}</h3>
          </div>

          <!-- Prodotti -->
          <div class="grid grid-cols-2 gap-4">
            <n-card
              v-for="item in cat.items"
              :key="item.id"
              :bordered="false"
              class="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              @click="addToCart(item)"
            >
              <div class="flex flex-col items-center text-center gap-2">
                <img
                  :src="item.image"
                  alt=""
                  class="w-20 h-20 rounded-xl object-cover"
                />
                <div>
                  <h4 class="font-bold text-navi text-sm">{{ item.name }}</h4>
                  <p class="text-xs text-gray-500">
                    € {{ item.price.toFixed(2) }}
                  </p>
                </div>
              </div>
            </n-card>
          </div>
        </div>
      </div>
    </main>

    <!-- Carrello -->
    <div
      class="sticky bottom-20 bg-lightDark border-t border-black/10 rounded-2xl mx-auto"
    >
      <div class="mx-auto px-4 py-3 flex items-center justify-between gap-8">
        <div>
          <p class="text-gray-300 text-sm">
            Totale:
            <span class="font-semibold text-white"
              >€ {{ total.toFixed(2) }}</span
            >
          </p>
        </div>
        <n-button
          type="primary"
          round
          size="large"
          @click="checkout"
          :disabled="cart.length === 0"
        >
          <template #icon>
            <n-icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <circle cx="8" cy="21" r="1"></circle>
                <circle cx="19" cy="21" r="1"></circle>
                <path
                  d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"
                ></path>
              </svg>
            </n-icon>
          </template>
          Ordina
        </n-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useMessage } from "naive-ui";
import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";

const router = useRouter();
const message = useMessage();

const menu = ref([]);

const cart = ref([]);

const total = computed(() =>
  cart.value.reduce((sum, item) => sum + item.price, 0)
);

function addToCart(item) {
  cart.value.push(item);
  message.success(`${item.name} aggiunto al carrello!`);
}

function checkout() {
  if (cart.value.length === 0) return;
  message.success(`Ordine confermato! Totale: €${total.value.toFixed(2)}`);
  cart.value = [];
}

function goBack() {
  router.back(); // torna alla dashboard
}

onMounted(async () => {
  try {
    const categories = await directus.request(
      readItems("ns_categories", {
        fields: ["id", "name", "sort", "ns_products.ns_products_id.*"],
        sort: ["sort"],
      })
    );

    console.log(categories);

    // Mappiamo i dati nella struttura desiderata
    menu.value = categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      items: cat.ns_products.map((p) => ({
        id: p.ns_products_id.id,
        name: p.ns_products_id.name,
        price: parseFloat(p.ns_products_id.price),
        description: p.ns_products_id.description,
        image: p.ns_products_id.img_url || "https://via.placeholder.com/200", // placeholder se mancante
      })),
    }));
  } catch (error) {
    console.error("Errore nel caricamento del menù:", error);
  }
});
</script>

<style scoped>
.n-card {
  border-radius: 1rem;
  background: #fff;
}
</style>
