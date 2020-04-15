<template>
  <v-card class="Settings-AppearanceTheme">
    <v-card-subtitle>
      Switch between dark/light themes
    </v-card-subtitle>
    <v-switch
      v-model="theme"
      class="px-6 pb-5 mt-0"
      :label="
        `Theme: ${theme ? 'dark' : 'light'}.
        Default theme: ${
          $store.state.settings.defaultSettings.theme === 'dark'
            ? 'dark'
            : 'light'
        }`
      "
    />
  </v-card>
</template>

<script>
export default {
  name: 'AppearanceTheme',
  computed: {
    theme: {
      get() {
        return this.$store.state.settings.settings.theme === 'dark'
      },
      set(isDark) {
        this.$store.commit('settings/toggleTheme', isDark ? 'dark' : 'light')
      }
    }
  }
}
</script>
