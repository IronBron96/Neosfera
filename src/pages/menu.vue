<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col">
    <!-- Header -->
    <header class="bg-[#27272a] sticky top-0 z-50 shadow-sm">
      <div class="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        <n-button circle quaternary @click="goBack">
          <template #icon>
            <n-icon :size="20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
                color="white"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </n-icon>
          </template>
        </n-button>

        <h2 class="text-white font-semibold text-lg">Menu del Bar</h2>

        <n-button circle quaternary>
          <template #icon>
            <n-icon :size="20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
                color="white"
              >
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="12" cy="5" r="1"></circle>
                <circle cx="12" cy="19" r="1"></circle>
              </svg>
            </n-icon>
          </template>
        </n-button>
      </div>
    </header>

    <!-- Contenuto principale -->
    <main class="max-w-md mx-auto flex-1 px-4 py-4">
      <div class="space-y-6">
        <!-- Categorie -->
        <div v-for="cat in menu" :key="cat.id" class="space-y-3">
          <div class="flex items-center gap-2">
            <n-icon color="#f59e0b" :size="22">
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
            <h3 class="text-gray-800 font-semibold text-lg">{{ cat.name }}</h3>
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
                <img :src="item.image" alt="" class="w-20 h-20 rounded-xl object-cover" />
                <h4 class="font-bold text-gray-800 text-sm">{{ item.name }}</h4>
                <p class="text-xs text-gray-500">€ {{ item.price.toFixed(2) }}</p>
              </div>
            </n-card>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="sticky bottom-10 bg-[#27272a] border-t border-black/10">
      <div class="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        <div>
          <p class="text-gray-300 text-sm">
            Totale:
            <span class="font-semibold text-white">€ {{ total.toFixed(2) }}</span>
          </p>
        </div>
        <n-button type="warning" round size="large" @click="checkout" :disabled="cart.length === 0">
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
    </footer>
  </div>
</template>

<script setup>
  import {ref, computed} from 'vue'
  import {useRouter} from 'vue-router'
  import {useMessage} from 'naive-ui'

  const router = useRouter()
  const message = useMessage()

  const menu = ref([
    {
      id: 1,
      name: 'Caffetteria',
      items: [
        {
          id: 'c1',
          name: 'Espresso',
          price: 1.2,
          image:
            'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&h=200&fit=crop',
        },
        {
          id: 'c2',
          name: 'Cappuccino',
          price: 1.8,
          image:
            'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=200&h=200&fit=crop',
        },
        {
          id: 'c3',
          name: 'Latte Macchiato',
          price: 2.0,
          image:
            'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=200&h=200&fit=crop',
        },
        {
          id: 'c4',
          name: 'Caffè Americano',
          price: 1.5,
          image:
            'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&h=200&fit=crop',
        },
      ],
    },
    {
      id: 2,
      name: 'Dolci & Snack',
      items: [
        {
          id: 'd1',
          name: 'Cornetto',
          price: 1.3,
          image:
            'https://images.unsplash.com/photo-1629385701021-93c2d1b3127e?w=200&h=200&fit=crop',
        },
        {
          id: 'd2',
          name: 'Tiramisù',
          price: 3.5,
          image:
            'https://images.unsplash.com/photo-1617196039897-e8f8ff8bd3ef?w=200&h=200&fit=crop',
        },
        {
          id: 'd3',
          name: 'Muffin al Cioccolato',
          price: 2.0,
          image:
            'https://images.unsplash.com/photo-1629441452145-f8fcd64a6dfd?w=200&h=200&fit=crop',
        },
        {
          id: 'd4',
          name: 'Biscotti Artigianali',
          price: 1.5,
          image:
            'https://images.unsplash.com/photo-1606813902911-0d0d2179ec1e?w=200&h=200&fit=crop',
        },
      ],
    },
  ])

  const cart = ref([])

  const total = computed(() => cart.value.reduce((sum, item) => sum + item.price, 0))

  function addToCart(item) {
    cart.value.push(item)
    message.success(`${item.name} aggiunto al carrello!`)
  }

  function checkout() {
    if (cart.value.length === 0) return
    message.success(`Ordine confermato! Totale: €${total.value.toFixed(2)}`)
    cart.value = []
  }

  function goBack() {
    router.back() // torna alla dashboard
  }
</script>

<style scoped>
  .n-card {
    border-radius: 1rem;
    background: #fff;
  }
</style>
