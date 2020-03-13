export const state = () => ({
  todoList: [],
  filterValue: 'All'
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
  }
}

export const mutations = {
  updateTodoList(state, todoList) {
    state.todoList = todoList
  },
  updateFilterValue(state, filterValue) {
    state.filterValue = filterValue
  },
  addTask(state, textField) {
    const value = textField.value.trim()
    if (!value) return
    state.todoList.push({
      text: value,
      id: state.todoList.length,
      isCompleted: false,
      isNew: true
    })
    textField.value = ''
  },
  makeLastTaskNotNew({ todoList }) {
    todoList[todoList.length - 1].isNew = false
  },
  removeTask({ todoList }, id) {
    todoList.splice(id, 1)
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
  removeTask({ commit, state }, id) {
    commit('removeTask', id)
    commit('matchTasksIdWithIndex')
  }
}
