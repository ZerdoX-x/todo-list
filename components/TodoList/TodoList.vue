<template>
  <v-list>
    <todo-list-task
      v-for="task of filteredTodoList"
      :key="task.id"
      :task="task"
    />
  </v-list>
</template>

<script>
import { mapGetters } from 'vuex'
import TodoListTask from './-Task/TodoList-Task'

export default {
  name: 'TodoList',
  components: {
    TodoListTask
  },
  computed: mapGetters('todo', ['filteredTodoList'])
}
</script>
