<template>
  <v-card class="Settings-AnimationsDuration">
    <v-card-subtitle>
      Todo List Animations Duration
    </v-card-subtitle>
    <v-slider
      v-model="animationsDuration"
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
export default {
  name: 'AnimationsDuration',
  data() {
    return {
      animationsDurationSliderStep: 50,
      maxAnimationsDuration: 3000,
      minAnimationsDuration: 0
    }
  },
  computed: {
    animationsDuration: {
      get() {
        return this.$store.getters['settings/animationsDuration']
      },
      set(animationsDuration) {
        if (!localStorage.getItem('prefersAnimations'))
          localStorage.setItem('prefersAnimations', '+')
        return this.$store.commit(
          'settings/updateAnimationsDuration',
          animationsDuration
        )
      }
    },
    animationsDurationDefaultTickLabel() {
      const ticks = []
      const range = {
        from: 0,
        to: this.maxAnimationsDuration / this.animationsDurationSliderStep,
        *[Symbol.iterator]() {
          for (let value = this.from; value <= this.to; value++) yield value
        }
      }
      for (const iteration of range) {
        if (iteration * this.animationsDurationSliderStep !== 500)
          ticks.push(null)
        else ticks.push('•')
      }
      return ticks
    }
  },
  methods: {
    increaseAnimationDuration() {
      this.animationsDuration += this.animationsDurationSliderStep
    },
    decreaseAnimationDuration() {
      this.animationsDuration -= this.animationsDurationSliderStep
    }
  }
}
</script>

<style>
.v-slider__tick-label {
  transform: translateY(-64%) translateX(-50%) !important;
  font-size: 2em;
}
</style>
