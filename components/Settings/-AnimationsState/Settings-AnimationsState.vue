<template>
  <v-card>
    <v-card-subtitle>Disable/Enable All Animations On Pages</v-card-subtitle>
    <v-switch
      :input-value="settings.animationsEnabled"
      class="px-6 pb-5 mt-0"
      :label="label"
      @change="toggleAnimationsState"
    />
  </v-card>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  computed: {
    ...mapState('settings', ['settings', 'defaultSettings']),
    label() {
      return `Animations: ${this.settings.animationsEnabled ? 'on' : 'off'}.
        Default value: ${this.defaultSettings.animationsEnabled ? 'on' : 'off'}`
    }
  },
  watch: {
    'settings.animationsEnabled'(enabled) {
      if (!enabled) this.$root.$el.classList.add('App_NoTransition')
      else this.$root.$el.classList.remove('App_NoTransition')
    }
  },
  methods: mapMutations('settings', ['toggleAnimationsState'])
}
</script>
