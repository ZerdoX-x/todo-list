export const state = () => ({
  animationsDuration: 500
})

export const getters = {
  animationsDuration(state) {
    return state.animationsDuration
  }
}

export const mutations = {
  updateAnimationsDuration(state, animationsDuration) {
    state.animationsDuration = animationsDuration
  }
}
