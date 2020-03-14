export const state = () => ({
  settings: {
    animationsDuration: 500
  }
})

export const getters = {
  settings(state) {
    return state.settings
  },
  animationsDuration({ settings }) {
    return settings.animationsDuration
  }
}

export const mutations = {
  updateSettings(state, settings) {
    state.settings = settings
  },
  updateAnimationsDuration({ settings }, animationsDuration) {
    settings.animationsDuration = animationsDuration
  }
}
