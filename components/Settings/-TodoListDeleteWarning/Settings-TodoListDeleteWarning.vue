<template>
  <v-card>
    <v-card-subtitle>
      Disable/Enable Warning About Deleting Set Of Tasks
    </v-card-subtitle>
    <v-switch
      :input-value="settings.deleteWarning"
      class="px-6 pb-5 mt-0"
      :label="label"
      @change="toggleDeleteWarningState"
    />
  </v-card>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState('settings', ['settings', 'defaultSettings']),
    label() {
      return `Warning: ${this.settings.deleteWarning ? 'on' : 'off'}.
        Default value: ${this.defaultSettings.deleteWarning ? 'on' : 'off'}`
    }
  },
  methods: mapMutations('settings', ['toggleDeleteWarningState'])
}
</script>
