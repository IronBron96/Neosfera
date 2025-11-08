<template>
  <div class="min-h-screen bg-[#29272a]/20">
    <HeaderSection />
    <main>
      <n-config-provider>
        <n-message-provider>
          <n-dialog-provider>
            <n-notification-provider>
              <router-view />
            </n-notification-provider>
          </n-dialog-provider>
        </n-message-provider>
      </n-config-provider>
    </main>
    <FooterSection />
  </div>
</template>

<script setup>
import HeaderSection from "../components/HeaderSection.vue";
import FooterSection from "../components/FooterSection.vue";
</script>

<style scoped>
main {
  min-height: calc(
    100vh - 200px
  ); /* regola in base all’altezza header/footer */
}
</style>
