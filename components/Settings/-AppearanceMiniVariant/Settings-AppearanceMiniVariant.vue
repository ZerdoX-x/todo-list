<template>
  <v-card class="Settings-AppearanceMiniVariant">
    <v-card-subtitle>
      Disable/enable condensed drawer
    </v-card-subtitle>
    <v-switch
      v-model="miniVariant"
      class="px-6 pb-5 mt-0"
      :label="
        `Condensed: ${miniVariant}.
        Default value: ${$store.state.settings.defaultSettings.miniVariant}`
      "
    />
  </v-card>
</template>

<script>
export default {
  name: 'AppearanceMiniVariant',
  computed: {
    miniVariant: {
      get() {
        return this.$store.state.settings.settings.miniVariant
      },
      set(miniVariant) {
        this.$store.commit('settings/toggleMiniVariant', miniVariant)
      }
    }
  }
}
</script>
