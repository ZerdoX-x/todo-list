<template>
  <v-card class="Settings-AppearanceTheme">
    <v-card-subtitle>
      Switch between dark/light themes
    </v-card-subtitle>
    <v-switch
      v-model="checked"
      class="px-6 pb-5 mt-0"
      :label="
        `Theme: ${checked ? 'dark' : 'light'}.
        Default theme: ${defaultSettings.theme === 'dark' ? 'dark' : 'light'}`
      "
      @change="toggleTheme(checked)"
    />
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AppearanceTheme',
  data: () => ({ checked: false }),
  computed: mapGetters('settings', ['theme', 'defaultSettings']),
  watch: {
    theme: {
      immediate: true,
      handler(theme) {
        this.checked = theme === 'dark'
      }
    }
  },
  methods: {
    toggleTheme(isDark) {
      this.$vuetify.theme.dark = isDark
      this.$store.commit('settings/toggleTheme', isDark ? 'dark' : 'light')
    }
  }
}
</script>
