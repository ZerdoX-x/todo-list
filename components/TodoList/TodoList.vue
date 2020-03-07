<template>
  <v-list>
    <todo-list-task
      v-for="task of todoList"
      :key="task.key"
      :task="task"
      @remove-task="removeTodoListTask"
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
    }
  },
  data() {
    return {
      test: 0
    }
  },
  methods: {
    removeTodoListTask(id) {
      this.$emit('remove-task', id)
    }
  }
}
</script>
