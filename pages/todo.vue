<template>
  <div class="todo">
    <v-text-field
      v-model="textField.value"
      autocomplete="off"
      outlined
      class="mt-3"
      label="Create task"
      append-icon="mdi-close-circle"
      @click:append="textField.value = ''"
      @keyup.enter="addTask(textField)"
    />
    <v-btn :disabled="!todoList.length" @click="openMenu">
      Remove...
    </v-btn>
    <v-menu
      v-model="menu.show"
      transition="slide-y-transition"
      bottom
      :position-x="menu.x"
      :position-y="menu.y"
    >
      <v-list>
        <v-list-item
          v-for="(item, index) in setOfTasksItems"
          :key="index"
          :disabled="item.disabled"
          @click="
            () => {
              if (!settings.deleteWarning) return item.handler() // do not show dialog if they're disabled
              dialog.show = true
              dialog.agreeHandler = () => {
                dialog.show = false
                if (deleteWarningCheckbox) toggleDeleteWarningState(false) // commit to store
                item.handler()
              }
            }
          "
        >
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-select
      v-model="filterValue"
      :items="['All', 'Completed', 'Uncompleted']"
    >
    </v-select>
    <v-dialog v-model="dialog.show" persistent max-width="340">
      <v-card>
        <v-card-title class="headline">Are you sure?</v-card-title>
        <v-card-text>You want to remove set of tasks</v-card-text>
        <v-card-actions>
          <v-checkbox v-model="deleteWarningCheckbox" label="Don't warn" />
          <v-spacer />
          <v-btn @click="dialog.show = false">No</v-btn>
          <v-btn @click="dialog.agreeHandler">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div v-if="loading" class="text-center">
      <v-progress-circular class="my-5 mx-auto" indeterminate />
    </div>
    <todo-list v-else /><!--keep it last component (see removeAllTasks)-->
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import TodoList from '../components/TodoList/TodoList'

export default {
  name: 'Todo',
  components: { TodoList },
  transitions: 'page',
  data: () => ({
    dialog: {
      show: false,
      agreeHandler: () => {}
    },
    menu: {
      show: false,
      x: 0,
      y: 0
    },
    textField: { value: '' },
    deleteWarningCheckbox: false
  }),
  computed: {
    ...mapState('todo', ['todoList', 'loading']),
    ...mapState('settings', ['settings']),
    // v-model="filterValue"
    filterValue: {
      get() {
        return this.$store.state.todo.filterValue
      },
      set(filterValue) {
        this.$store.commit('todo/updateFilterValue', filterValue)
      }
    },
    setOfTasksItems() {
      return [
        {
          text: 'Completed Tasks',
          handler: this.removeCompletedTasks,
          disabled: !this.todoList.filter(({ isCompleted }) => isCompleted)
            .length // if no completed tasks, disabled: true
        },
        {
          text: 'Uncompleted Tasks',
          handler: this.removeUncompletedTasks,
          disabled: !this.todoList.filter(({ isCompleted }) => !isCompleted)
            .length // if no uncompleted tasks, disabled: true
        },
        {
          text: 'All Tasks',
          handler: this.removeAllTasks,
          disabled: !this.todoList.length // if no tasks, disabled: true
        }
      ]
    }
  },
  watch: {
    todoList: {
      deep: true,
      handler(todoList) {
        // save todoList & filterValue to localStorage
        localStorage.setItem('todoList', JSON.stringify(todoList))
      }
    },
    filterValue(filterValue) {
      localStorage.setItem('filterValue', filterValue)
    }
  },
  // sync todoList & filterValue with localStorage
  mounted() {
    const todoList = localStorage.getItem('todoList')
    if (todoList) this.updateTodoList(JSON.parse(todoList))

    const filterValue = localStorage.getItem('filterValue')
    if (filterValue) this.filterValue = filterValue
    this.$store.commit('todo/stopLoading')
  },
  methods: {
    openMenu({ clientX, clientY }) {
      this.menu.x = clientX
      this.menu.y = clientY
      this.menu.show = !this.menu.show
    },
    removeAllTasks() {
      const todoList = this.$children[this.$children.length - 1].$el // TodoList component's element
      todoList.classList.add('TodoList_Removed')
      setTimeout(() => {
        this.$store.commit('todo/removeAllTasks')
        todoList.classList.remove('TodoList_Removed')
      }, this.settings.animationsDuration)
    },
    removeUncompletedTasks() {
      const todoList = this.$children[this.$children.length - 1].$children[0]
        .$children // array of TodoList-Task.vue components
      todoList.forEach((value) => {
        if (!value.task.isCompleted) value.$el.classList.add('Task_Removed') // add Task_Removed for uncompleted tasks
      })
      setTimeout(() => {
        this.$store.dispatch('todo/removeUncompletedTasks')
      }, this.settings.animationsDuration)
    },
    removeCompletedTasks() {
      const todoList = this.$children[this.$children.length - 1].$children[0]
        .$children // array of TodoList-Task.vue components
      todoList.forEach((value) => {
        if (value.task.isCompleted) value.$el.classList.add('Task_Removed') // add Task_Removed for uncompleted tasks
      })
      setTimeout(() => {
        this.$store.dispatch('todo/removeCompletedTasks')
      }, this.settings.animationsDuration)
    },
    ...mapActions('todo', ['addTask', 'removeTask']),
    ...mapMutations('settings', ['toggleDeleteWarningState']),
    ...mapMutations('todo', ['updateTodoList'])
  }
}
</script>
