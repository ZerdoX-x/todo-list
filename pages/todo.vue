<template>
  <div class="home">
    <v-text-field
      v-model.lazy="textFieldValue"
      outlined
      label="Create task"
      @keyup.enter="addTask"
    />
    <v-select
      v-model="filterValue"
      :items="['All', 'Completed', 'Uncompleted']"
    >
    </v-select>
    <client-only>
      <todo-list
        v-if="filteredTodoList.length"
        :todo-list="filteredTodoList"
        :is-filtered="filterValue !== 'All'"
        @remove-task="removeTask"
      />
      <div v-else>
        <span v-if="filterValue === 'Completed'">
          No Completed Tasks!
        </span>
        <span v-else-if="filterValue === 'Uncompleted'">
          No Uncompleted Tasks. Create new one!
        </span>
        <span v-else>
          No Todo Tasks. Create new one!
        </span>
      </div>
    </client-only>
  </div>
</template>

<script>
import TodoList from '../components/TodoList/TodoList.vue'

export default {
  name: 'Todo',
  components: {
    TodoList
  },
  data() {
    return {
      textFieldValue: '',
      filterValue: 'All',
      todoList: []
    }
  },
  computed: {
    filteredTodoList() {
      let todoList = this.todoList
      switch (this.filterValue) {
        case 'Completed':
          todoList = this.todoList.filter((task) => task.isCompleted)
          break
        case 'Uncompleted':
          todoList = this.todoList.filter((task) => !task.isCompleted)
          break
      }
      return todoList
    }
  },
  watch: {
    todoList: {
      deep: true,
      handler(todoList) {
        if (todoList.length)
          localStorage.setItem('todoList', JSON.stringify(todoList))
        else localStorage.setItem('todoList', JSON.stringify([]))
      }
    },
    filterValue(filterValue) {
      localStorage.setItem('filterValue', filterValue)
    }
  },
  beforeMount() {
    // sync todoList with localStorage
    const todoList = localStorage.getItem('todoList')
    if (todoList) this.todoList = JSON.parse(todoList)
    else localStorage.setItem('todoList', JSON.stringify(this.todoList))

    // sync filterValue with localStorage
    const filterValue = localStorage.getItem('filterValue')
    if (filterValue) this.filterValue = filterValue
    else localStorage.setItem('filterValue', this.filterValue)
  },
  methods: {
    addTask() {
      const textFieldValue = this.textFieldValue.trim()
      if (!textFieldValue) return
      this.todoList.push({
        text: textFieldValue,
        id: this.todoList.length,
        isCompleted: false
      })
      this.textFieldValue = ''
    },
    removeTask(id) {
      this.todoList = this.todoList.filter((task) => task.id !== id)
      this.matchTasksIdWithIndex()
    },
    matchTasksIdWithIndex() {
      this.todoList.forEach((value, index) => {
        value.id = index
      })
    }
  }
}
</script>
