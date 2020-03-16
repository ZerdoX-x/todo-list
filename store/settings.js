export const state = () => ({
  settings: {
    animationsDuration: 500,
    animationsEnabled: true,
    deleteWarning: true,
    theme: 'dark'
  },
  defaultSettings: Object.freeze({
    animationsDuration: 500,
    animationsEnabled: true,
    deleteWarning: true,
    theme: 'dark'
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
  },
  deleteWarning({ settings }) {
    return settings.deleteWarning
  },
  theme({ settings }) {
    return settings.theme
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
  },
  toggleDeleteWarningState({ settings }, deleteWarningState) {
    settings.deleteWarning = deleteWarningState
  },
  toggleTheme({ settings }, theme) {
    settings.theme = theme
  }
}
