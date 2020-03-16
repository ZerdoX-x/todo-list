<template>
  <v-card class="Settings-AnimationsDuration">
    <v-card-subtitle>
      Disable/Enable All Animations On Pages
    </v-card-subtitle>
    <v-switch
      v-model="checkbox"
      class="px-6 pb-5 mt-0"
      :label="
        `Animations: ${checkbox ? 'on' : 'off'}.
        Default value: ${defaultSettings.animationsEnabled ? 'on' : 'off'}`
      "
      @change="toggleAnimationsState"
    />
  </v-card>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'AnimationsState',
  data: () => ({ checkbox: false }),
  computed: mapGetters('settings', ['animationsEnabled', 'defaultSettings']),
  watch: {
    checkbox(enabled) {
      if (!enabled) this.$root.$el.classList.add('App_NoTransition')
      else this.$root.$el.classList.remove('App_NoTransition')
    }
  },
  mounted() {
    this.checkbox = this.animationsEnabled
  },
  methods: mapMutations('settings', ['toggleAnimationsState'])
}
</script>
