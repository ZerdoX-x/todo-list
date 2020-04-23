<template>
  <v-card>
    <v-card-subtitle>Switch between dark/light themes</v-card-subtitle>
    <v-switch
      :input-value="settings.theme === 'dark'"
      class="px-6 pb-5 mt-0"
      :label="label"
      @change="switchHandler"
    />
  </v-card>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState('settings', ['settings', 'defaultSettings']),
    label() {
      return `Theme: ${this.settings.theme}.
              Default theme: ${this.defaultSettings.theme}`
    }
  },
  methods: {
    ...mapMutations('settings', ['toggleTheme']),
    switchHandler(checked) {
      this.toggleTheme(checked ? 'dark' : 'light')
    }
  }
}
</script>
