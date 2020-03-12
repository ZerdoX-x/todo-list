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
    <client-only>
      <todo-list v-if="filteredTodoList.length" />
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
import { mapMutations, mapGetters } from 'vuex'
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
    ...mapGetters('todo', ['todoList', 'filteredTodoList']),
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
  // sync todoList & filterValue with localStorage
  beforeMount() {
    const todoList = localStorage.getItem('todoList')
    if (todoList)
      this.$store.commit('todo/updateTodoList', JSON.parse(todoList))

    const filterValue = localStorage.getItem('filterValue')
    if (filterValue) this.filterValue = filterValue
  },
  methods: mapMutations('todo', ['addTask'])
}
</script>
