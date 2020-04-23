<template>
  <v-card>
    <v-card-subtitle>Todo List Animations Duration</v-card-subtitle>
    <v-slider
      :value="settings.animationsDuration"
      :disabled="!settings.animationsEnabled"
      class="slider align-center px-6 pb-5"
      :max="max"
      :min="min"
      :tick-labels="defaultTickLabel"
      :step="step"
      tick-size="0"
      ticks="always"
      thumb-label
      hide-details
      @input="sliderHandler"
    >
      <template v-slot:prepend>
        <v-icon @click="decreaseAnimationDuration">mdi-minus</v-icon>
      </template>
      <template v-slot:append>
        <v-icon @click="increaseAnimationDuration">mdi-plus</v-icon>
      </template>
    </v-slider>
  </v-card>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data: () => ({
    step: 50,
    max: 2000,
    min: 0,
    disabled: false,
    everChanged: false
  }),
  computed: {
    ...mapState('settings', ['settings', 'defaultSettings']),
    defaultTickLabel() {
      const tickLabels = []
      const { min, max, step } = this
      const range = {
        *[Symbol.iterator]() {
          for (let value = min; value <= max; value += step) yield value
        }
      }
      for (const iteration of range) {
        if (iteration !== this.defaultSettings.animationsDuration)
          tickLabels.push(null)
        else tickLabels.push('•') // position point on a default value
      }
      return tickLabels // [... '•' ...]
    }
  },
  mounted() {
    this.everChanged = localStorage.getItem('prefersAnimations') // get if user ever tried to change animationsDuration
  },
  methods: {
    ...mapMutations('settings', ['updateAnimationsDuration']),
    sliderHandler(animationsDuration) {
      if (!this.everChanged) localStorage.setItem('prefersAnimations', '+')
      this.updateAnimationsDuration(animationsDuration)
    },
    increaseAnimationDuration() {
      this.animationsDuration += this.step
    },
    decreaseAnimationDuration() {
      this.animationsDuration -= this.step
    }
  }
}
</script>

<style scoped>
.slider >>> .v-slider__tick-label {
  transform: translateY(-64%) translateX(-50%) !important;
  font-size: 2em;
}
</style>
