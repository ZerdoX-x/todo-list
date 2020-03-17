<template>
  <v-card class="Settings-AnimationsDuration">
    <v-card-subtitle>
      Todo List Animations Duration
    </v-card-subtitle>
    <v-slider
      v-model="animationsDuration"
      :disabled="disabled"
      class="align-center px-6 pb-5"
      :max="maxAnimationsDuration"
      :min="minAnimationsDuration"
      :tick-labels="animationsDurationDefaultTickLabel"
      :step="animationsDurationSliderStep"
      tick-size="0"
      ticks="always"
      hide-details
      thumb-label
    >
      <template v-slot:prepend>
        <v-icon @click="decreaseAnimationDuration">
          mdi-minus
        </v-icon>
      </template>
      <template v-slot:append>
        <v-icon @click="increaseAnimationDuration">
          mdi-plus
        </v-icon>
      </template>
    </v-slider>
  </v-card>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'AnimationsDuration',
  data: () => ({
    animationsDurationSliderStep: 50,
    maxAnimationsDuration: 2000,
    minAnimationsDuration: 0,
    disabled: false, // not disabled by default
    everChanged: false
  }),
  computed: {
    animationsDuration: {
      get() {
        // get real value, not 0 if animations disabled (see store/settings.js 'getters/animationsDuration')
        return this.$store.getters['settings/settings'].animationsDuration
      },
      set(animationsDuration) {
        // if user tried to change animationsDuration, set 'prefersAnimations
        if (!this.everChanged) localStorage.setItem('prefersAnimations', '+')
        this.updateAnimationsDuration(animationsDuration)
      }
    },
    animationsDurationDefaultTickLabel() {
      const tickLabels = []
      const step = this.animationsDurationSliderStep
      const range = {
        from: 0,
        to: this.maxAnimationsDuration,
        *[Symbol.iterator]() {
          for (let value = this.from; value <= this.to; value += step)
            yield value
        }
      }
      for (const iteration of range) {
        if (iteration !== this.defaultSettings.animationsDuration)
          tickLabels.push(null)
        else tickLabels.push('•') // position point on a default value
      }
      return tickLabels // [... '•' ...]
    },
    ...mapGetters('settings', ['animationsEnabled', 'defaultSettings'])
  },
  // update state if switch value changes
  watch: {
    animationsEnabled(state) {
      this.disabled = !state
    }
  },
  created() {
    // disable slider if animationsEnabled: false
    this.disabled = !this.animationsEnabled
  },
  mounted() {
    // get if user ever tried to change animationsDuration
    this.everChanged = localStorage.getItem('prefersAnimations')
  },
  methods: {
    increaseAnimationDuration() {
      this.animationsDuration += this.animationsDurationSliderStep
    },
    decreaseAnimationDuration() {
      this.animationsDuration -= this.animationsDurationSliderStep
    },
    ...mapMutations('settings', ['updateAnimationsDuration'])
  }
}
</script>

<style>
.v-slider__tick-label {
  transform: translateY(-64%) translateX(-50%) !important;
  font-size: 2em;
}
</style>
