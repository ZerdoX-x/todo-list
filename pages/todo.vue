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
    <v-menu transition="slide-y-transition" bottom :offset-y="true">
      <template v-slot:activator="{ on }">
        <v-btn :disabled="!todoList.length" v-on="on">
          Remove...
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in setOfTasksItems"
          :key="index"
          :disabled="item.disabled"
          @click="
            () => {
              if (!deleteWarning) return item.handler() // do not show dialog if they're disabled
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
    <todo-list /><!--keep todo-list last component (see removeAllTasks)-->
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import TodoList from '../components/TodoList/TodoList.vue'

export default {
  name: 'Todo',
  components: { TodoList },
  transitions: 'page',
  data: () => ({
    dialog: {
      show: false,
      agreeHandler: () => {}
    },
    textField: { value: '' },
    deleteWarningCheckbox: false
  }),
  computed: {
    ...mapGetters('todo', ['todoList']),
    ...mapGetters('settings', ['animationsDuration', 'deleteWarning']),
    // v-model="filterValue"
    filterValue: {
      get() {
        return this.$store.getters['todo/filterValue']
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
  beforeMount() {
    const todoList = localStorage.getItem('todoList')
    if (todoList) this.updateTodoList(JSON.parse(todoList))

    const filterValue = localStorage.getItem('filterValue')
    if (filterValue) this.filterValue = filterValue
  },
  methods: {
    removeAllTasks() {
      const todoList = this.$children[this.$children.length - 1].$el // TodoList component's element
      todoList.classList.add('TodoList_Removed')
      setTimeout(() => {
        this.$store.commit('todo/removeAllTasks')
        todoList.classList.remove('TodoList_Removed')
      }, this.animationsDuration)
    },
    removeUncompletedTasks() {
      const todoList = this.$children[this.$children.length - 1].$children[0]
        .$children // array of TodoList-Task.vue components
      todoList.forEach((value) => {
        if (!value.task.isCompleted) value.$el.classList.add('Task_Removed') // add Task_Removed for uncompleted tasks
      })
      setTimeout(() => {
        this.$store.dispatch('todo/removeUncompletedTasks')
      }, this.animationsDuration)
    },
    removeCompletedTasks() {
      const todoList = this.$children[this.$children.length - 1].$children[0]
        .$children // array of TodoList-Task.vue components
      todoList.forEach((value) => {
        if (value.task.isCompleted) value.$el.classList.add('Task_Removed') // add Task_Removed for uncompleted tasks
      })
      setTimeout(() => {
        this.$store.dispatch('todo/removeCompletedTasks')
      }, this.animationsDuration)
    },
    ...mapActions('todo', ['addTask', 'removeTask']),
    ...mapMutations('settings', ['toggleDeleteWarningState']),
    ...mapMutations('todo', ['updateTodoList', 'makeLastTaskNotNew'])
  }
}
</script>
