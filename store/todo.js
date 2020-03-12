export const state = () => ({
  todoList: [],
  filterValue: 'All',
  animationDuration: 500
})

export const getters = {
  todoList(state) {
    return state.todoList
  },
  filterValue(state) {
    return state.filterValue
  },
  filteredTodoList(state) {
    switch (state.filterValue) {
      case 'Completed':
        return state.todoList.filter((task) => task.isCompleted)
      case 'Uncompleted':
        return state.todoList.filter((task) => !task.isCompleted)
      case 'All':
      default:
        return state.todoList
    }
  },
  animationDuration(state) {
    return state.animationDuration
  }
}

export const mutations = {
  updateTodoList(state, todoList) {
    state.todoList = todoList
  },
  updateFilterValue(state, filterValue) {
    state.filterValue = filterValue
  },
  animationDuration(state, animationDuration) {
    state.animationDuration = animationDuration
  },
  addTask(state, textField) {
    const value = textField.value.trim()
    if (!value) return
    state.todoList.push({
      text: value,
      id: state.todoList.length,
      isCompleted: false
    })
    textField.value = ''
  },
  removeTask(state, id) {
    state.todoList = state.todoList.filter((task) => task.id !== id)
  },
  checkTask({ todoList }, index) {
    const task = todoList[index]
    task.isCompleted = !task.isCompleted
  },
  matchTasksIdWithIndex({ todoList }) {
    todoList.forEach((value, index) => (value.id = index))
  }
}

export const actions = {
  removeTask({ commit, state }, [$el, id]) {
    $el.classList.add('Task_Removed')
    setTimeout(() => {
      $el.classList.remove('Task_Removed')
      commit('removeTask', id)
      commit('matchTasksIdWithIndex')
    }, state.animationDuration)
  },
  checkTask({ commit, state }, [$el, index]) {
    if (state.filterValue === 'All') return commit('checkTask', index)
    $el.classList.add('Task_Moved')
    setTimeout(() => {
      commit('checkTask', index)
      $el.classList.remove('Task_Moved')
    }, state.animationDuration)
  }
}
