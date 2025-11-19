<template>
  <n-config-provider :theme-overrides="themeOverrides" :theme="null">
    <div
      class="min-h-screen bg-[#5c06af] bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.3)_0%,rgba(0,0,0,0)_60%)]"
    >
      <HeaderSection />
      <main>
        <n-message-provider>
          <n-dialog-provider>
            <n-notification-provider>
              <router-view />
            </n-notification-provider>
          </n-dialog-provider>
        </n-message-provider>
      </main>
      <FooterSection />
    </div>
  </n-config-provider>
</template>

<script setup>
import { NConfigProvider } from "naive-ui";
import HeaderSection from "../components/HeaderSection.vue";
import FooterSection from "../components/FooterSection.vue";

const themeOverrides = {
  common: {
    primaryColor: "#00e85f",
    primaryColorHover: "#00e85f",
    primaryColorPressed: "#00e85f",
    primaryColorSuppl: "#00e85f",
    baseColor: "#FFFCF2",
    textColorBase: "#252422",
  },
  Button: {
    textColorPrimary: "#000",
    textColor: "#000",
    colorPrimary: "#00e85f",
    colorHoverPrimary: "#00e85f",
    colorPressedPrimary: "#00e85f",
    colorFocusPrimary: "#00e85f",
    colorSuccess: "#efff00",
    colorHoverSuccess: "#efff00",
    colorPressedSuccess: "#efff00",
    colorFocusSuccess: "#efff00",
  },
};
</script>

<style scoped>
main {
  min-height: calc(
    100vh - 200px
  ); /* regola in base all’altezza header/footer */
}

:root {
  --primary-color: #00e85f !important;
  --primary-color-hover: #00e85f !important;
  --primary-color-pressed: #00e85f !important;
}

.n-button--primary {
  background-color: var(--primary-color) !important;
  border-color: var(--primary-color) !important;
  color: #fff !important;
}
</style>
