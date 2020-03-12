<template>
  <v-list-item
    :class="{ Task_Completed: task.isCompleted }"
    :style="{ animationDuration: animationDuration + 'ms' }"
    class="TodoList-Task Task"
  >
    <span>
      {{ task.text | startsWithCapitalLetter }}
    </span>
    <v-checkbox
      v-model="checkbox"
      class="ml-auto"
      @change="checkTask([$el, task.id])"
    ></v-checkbox>
    <v-btn icon fab @click="removeTask([$el, task.id])">
      <v-icon>mdi-close-circle</v-icon>
    </v-btn>
  </v-list-item>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

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
  computed: mapGetters('todo', ['animationDuration']),
  watch: {
    task(task) {
      this.checkbox = task.isCompleted // sort all checkboxes, when task is deleted (fix)
    }
  },
  mounted() {
    this.$el.classList.add('Task_Added')
    setTimeout(() => {
      this.$el.classList.remove('Task_Added')
    }, this.animationDuration)
    // check checkbox if task is completed
    this.checkbox = this.task.isCompleted
  },
  methods: mapActions('todo', ['removeTask', 'checkTask'])
}
</script>

<style>
@import './_Completed/TodoList-Task_Completed.css';
@import './_Moved/TodoList-Task_Moved.css';
@import './_Removed/TodoList-Task_Removed.css';
@import './_New/TodoList-Task_New.css';

.Task {
  will-change: transform, opacity;
  animation-fill-mode: forwards;
  animation-name: Task_Completed_After;
}

@keyframes Task_Completed_After {
  from {
    opacity: 0.5;
  }
  to {
    opacity: 1;
  }
}
</style>
