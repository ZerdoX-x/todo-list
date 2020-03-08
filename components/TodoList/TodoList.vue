<template>
  <v-list>
    <todo-list-task
      v-for="task of todoList"
      :key="task.id"
      :task="task"
      :is-filtered="isFiltered"
      @remove-task="removeTask"
    />
  </v-list>
</template>

<script>
import TodoListTask from './TodoListTask'
export default {
  name: 'TodoList',
  components: {
    TodoListTask
  },
  props: {
    todoList: {
      type: Array,
      required: true
    },
    isFiltered: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    removeTask(id) {
      this.$emit('remove-task', id)
    }
  }
}
</script>
