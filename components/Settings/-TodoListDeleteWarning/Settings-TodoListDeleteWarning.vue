<template>
  <v-card class="Settings-AnimationsDuration">
    <v-card-subtitle>
      Disable/Enable Warning About Deleting Set Of Tasks
    </v-card-subtitle>
    <v-switch
      v-model="checkbox"
      class="px-6 pb-5 mt-0"
      :label="
        `Warning: ${checkbox ? 'on' : 'off'}.
        Default value: ${defaultSettings.deleteWarning ? 'on' : 'off'}`
      "
      @change="toggleDeleteWarningState"
    />
  </v-card>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'TodoListDeleteWarning',
  data: () => ({ checkbox: false }),
  computed: mapGetters('settings', ['deleteWarning', 'defaultSettings']),
  watch: {
    checkbox(enabled) {
      this.toggleDeleteWarningState(enabled)
    }
  },
  mounted() {
    this.checkbox = this.deleteWarning
  },
  methods: mapMutations('settings', ['toggleDeleteWarningState'])
}
</script>
