<template>
  <v-list-item
    :class="{ Task_Completed: task.isCompleted }"
    :style="{
      animationDuration: animationsDuration + 'ms',
      transitionDuration: animationsDuration + 'ms'
    }"
    class="TodoList-Task Task"
  >
    <span>
      {{ task.text | startsWithCapitalLetter }}
    </span>
    <v-checkbox
      v-model="checkbox"
      class="ml-auto"
      @change="checkTask(task.id)"
    ></v-checkbox>
    <v-btn icon fab @click="removeTask(task.id)">
      <v-icon>mdi-close-circle</v-icon>
    </v-btn>
  </v-list-item>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TodoListTask',
  filters: {
    startsWithCapitalLetter(string) {
      return string.replace(string[0], string[0].toUpperCase())
    }
  },
  props: {
    task: { type: Object, required: true }
  },
  data() {
    return { checkbox: false }
  },
  computed: {
    ...mapGetters('todo', ['filterValue']),
    ...mapGetters('settings', ['animationsDuration'])
  },
  watch: {
    task(task) {
      this.checkbox = task.isCompleted // sort all checkboxes, when task is deleted (fix)
    }
  },
  mounted() {
    this.checkbox = this.task.isCompleted // check checkbox if task is completed
    if (!this.task.isNew) return // animate if task is new
    this.$el.classList.add('Task_New')
    setTimeout(() => {
      this.$el.classList.remove('Task_New')
    }, this.animationsDuration)
  },
  methods: {
    removeTask(id) {
      this.$el.classList.add('Task_Removed')
      setTimeout(() => {
        this.$store.dispatch('todo/removeTask', id)
        this.$el.classList.remove('Task_Removed')
      }, this.animationsDuration)
    },
    checkTask(index) {
      if (this.filterValue === 'All')
        // do not animate checking/moving if filterValue is 'All'
        return this.$store.commit('todo/checkTask', index)
      this.$el.classList.add('Task_Moved')
      setTimeout(() => {
        this.$store.commit('todo/checkTask', index)
        this.$el.classList.remove('Task_Moved')
      }, this.animationsDuration)
    }
  }
}
</script>

<style>
@import './_Completed/TodoList-Task_Completed.css';
@import './_Moved/TodoList-Task_Moved.css';
@import './_New/TodoList-Task_New.css';
@import './_Removed/TodoList-Task_Removed.css';

.Task {
  will-change: transform, opacity;
  background: #1e1e1e;
}
</style>
