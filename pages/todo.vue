<template>
  <div class="home">
    <v-text-field
      v-model="textField.value"
      autocomplete="off"
      outlined
      class="mt-3"
      label="Create task"
      @keyup.enter="addTask(textField)"
    />
    <v-select
      v-model="filterValue"
      :items="['All', 'Completed', 'Uncompleted']"
    >
    </v-select>
    <todo-list />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TodoList from '../components/TodoList/TodoList.vue'

export default {
  name: 'Todo',
  components: { TodoList },
  data() {
    return {
      textField: { value: '' }
    }
  },
  computed: {
    ...mapGetters('todo', ['todoList', 'animationsDuration']),
    // v-model="filterValue"
    filterValue: {
      get() {
        return this.$store.getters['todo/filterValue']
      },
      set(filterValue) {
        this.$store.commit('todo/updateFilterValue', filterValue)
      }
    }
  },
  // save todoList & filterValue to localStorage
  watch: {
    todoList: {
      deep: true,
      handler(todoList) {
        localStorage.setItem('todoList', JSON.stringify(todoList))
      }
    },
    filterValue(filterValue) {
      localStorage.setItem('filterValue', filterValue)
    }
  },
  // sync todoList & filterValue with localStorage before mounting
  beforeMount() {
    const todoList = localStorage.getItem('todoList')
    if (todoList)
      this.$store.commit('todo/updateTodoList', JSON.parse(todoList))

    const filterValue = localStorage.getItem('filterValue')
    if (filterValue) this.filterValue = filterValue
  },
  methods: {
    addTask(textField) {
      this.$store.commit('todo/addTask', textField)
      setTimeout(() => {
        this.$store.commit('todo/makeLastTaskNotNew')
      }, this.animationsDuration)
    }
  }
}
</script>
