<template>
  <v-card>
    <v-card-subtitle>Disable/enable condensed drawer</v-card-subtitle>
    <v-switch
      :input-value="settings.miniVariant"
      class="px-6 pb-5 mt-0"
      :label="label"
      @change="toggleMiniVariant"
    />
  </v-card>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState('settings', ['settings', 'defaultSettings']),
    label() {
      return `Condensed: ${this.settings.miniVariant}.
              Default value: ${this.defaultSettings.miniVariant}`
    }
  },
  methods: mapMutations('settings', ['toggleMiniVariant'])
}
</script>
