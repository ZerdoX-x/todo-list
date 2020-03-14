<template>
  <client-only>
    <v-list
      v-if="filteredTodoList.length"
      style="background-color: transparent"
    >
      <task v-for="task of filteredTodoList" :key="task.id" :task="task" />
    </v-list>
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
</template>

<script>
import { mapGetters } from 'vuex'
import Task from './-Task/TodoList-Task'

export default {
  name: 'TodoList',
  components: {
    Task
  },
  computed: mapGetters('todo', ['filterValue', 'filteredTodoList'])
}
</script>
