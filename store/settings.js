export const state = () => ({
  settings: {
    animationsDuration: 500,
    animationsEnabled: true,
    deleteWarning: true,
    theme: 'dark',
    miniVariant: false
  },
  defaultSettings: Object.freeze({
    animationsDuration: 500,
    animationsEnabled: true,
    deleteWarning: true,
    theme: 'dark',
    miniVariant: false
  })
})

export const getters = {
  animationsDuration({ settings }) {
    return !settings.animationsEnabled ? 0 : settings.animationsDuration // if animations disabled return 0
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
  },
  toggleMiniVariant({ settings }, miniVariant) {
    settings.miniVariant = miniVariant
  }
}
