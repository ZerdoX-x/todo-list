export const state = () => ({
  settings: {
    animationsDuration: 500,
    animationsEnabled: true
  },
  defaultSettings: Object.freeze({
    animationsDuration: 500,
    animationsEnabled: true
  })
})

export const getters = {
  settings(state) {
    return state.settings
  },
  defaultSettings(state) {
    return state.defaultSettings
  },
  animationsDuration({ settings }) {
    if (!settings.animationsEnabled) return 0
    return settings.animationsDuration
  },
  animationsEnabled({ settings }) {
    return settings.animationsEnabled
  }
}

export const mutations = {
  updateSettings(state, settings) {
    state.settings = settings
  },
  updateAnimationsDuration({ settings }, animationsDuration) {
    settings.animationsDuration = animationsDuration
  },
  toggleAnimationsState({ settings }, animationsState) {
    settings.animationsEnabled = animationsState
  }
}
