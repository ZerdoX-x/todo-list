<template>
  <div class="settings">
    <h1>Settings</h1>
    <v-card class="my-2">
      <v-card-subtitle>Animations</v-card-subtitle>
      <v-divider></v-divider>
      <animations-duration></animations-duration>
      <animations-state></animations-state>
    </v-card>
    <v-card class="my-2">
      <v-card-subtitle>Todo List</v-card-subtitle>
      <v-divider></v-divider>
    </v-card>
    <v-card class="my-2">
      <v-card-subtitle>Appearance</v-card-subtitle>
      <v-divider></v-divider>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AnimationsDuration from '../components/Settings/-AnimationsDuration/Settings-AnimationsDuration'
import AnimationsState from '../components/Settings/-AnimationsState/Settings-AnimationsState'

export default {
  name: 'Settings',
  components: {
    AnimationsDuration,
    AnimationsState
  },
  computed: mapGetters('settings', ['settings', 'animationsDisabled']),
  // push settings to localStorage
  watch: {
    settings: {
      deep: true,
      handler(settings) {
        localStorage.setItem('settings', JSON.stringify(settings))
      }
    }
  }
}
</script>
