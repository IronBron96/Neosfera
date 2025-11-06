<template>
  <component :is="layoutComponent" />
</template>

<script setup>
  import {useRoute} from 'vue-router'
  import DefaultLayout from './layouts/DefaultLayout.vue'
  import {computed} from 'vue'

  const route = useRoute()
  const layoutComponent = computed(() =>
    route.meta.layout === 'none' ? 'router-view' : DefaultLayout
  )
</script>
