<template>
  <n-config-provider :theme-overrides="themeOverrides" :theme="null">
    <div class="min-h-screen bg-dark">
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
    primaryColor: "#EF8354",
    primaryColorHover: "#F0753F",
    primaryColorPressed: "#C64B1E",
    primaryColorSuppl: "#EF8354",
    baseColor: "#FFFCF2",
    textColorBase: "#252422",
  },
  Button: {
    textColorPrimary: "#FFFCF2",
    colorPrimary: "#EF8354",
    colorHoverPrimary: "#F0753F",
    colorPressedPrimary: "#C64B1E",
    colorFocusPrimary: "#EF8354",
    colorSuccess: "#2D3142",
    colorHoverSuccess: "#3F4451",
    colorPressedSuccess: "#1C1E26",
    colorFocusSuccess: "#2D3142",
    borderSuccess: "1px solid #BFC0C0",
    borderPressedSuccess: "1px solid #888A8A",
    borderHoverSuccess: "1px solid #5C6066",
    borderFocusSuccess: "1px solid #2D3142",
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
  --primary-color: #eb5e28 !important;
  --primary-color-hover: #f0753f !important;
  --primary-color-pressed: #c64b1e !important;
}

.n-button--primary {
  background-color: var(--primary-color) !important;
  border-color: var(--primary-color) !important;
  color: #fff !important;
}
</style>
