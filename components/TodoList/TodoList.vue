<template>
  <client-only>
    <v-list
      v-if="filteredTodoList.length"
      class="TodoList"
      :style="{ animationDuration: settings.animationsDuration + 'ms' }"
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
import { mapState, mapGetters } from 'vuex'
import Task from './-Task/TodoList-Task'

export default {
  components: { Task },
  computed: {
    ...mapState(['todo', ['filterValue']]),
    ...mapGetters('todo', ['filteredTodoList']),
    ...mapState('settings', ['settings'])
  }
}
</script>

<style>
.TodoList {
  animation-fill-mode: forwards;
  background-color: transparent !important;
}

.TodoList_Removed {
  animation-name: TodoList_Removed;
}

@keyframes TodoList_Removed {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100vw);
  }
}
</style>
