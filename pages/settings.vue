<template>
  <div class="settings">
    <h1>Settings</h1>
    <animations-duration></animations-duration>
  </div>
</template>

<script>
import AnimationsDuration from '../components/Settings/-AnimationsDuration/Settings-AnimationsDuration'
export default {
  name: 'Settings',
  components: {
    AnimationsDuration
  },
  computed: {
    settings() {
      return this.$store.getters['settings/settings']
    }
  },
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
