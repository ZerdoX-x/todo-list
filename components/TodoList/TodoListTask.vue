<template>
  <v-list-item>
    <span
      class="todo-list-task__text"
      :class="{ 'todo-list-task__text_completed': task.isCompleted }"
    >
      {{ task.text | startsWithCapitalLetter }}
    </span>
    <v-checkbox v-model="task.isCompleted" class="ml-auto"></v-checkbox>
    <v-btn icon fab @click="$emit('remove-task', task.id)">
      <v-icon>mdi-close-circle</v-icon>
    </v-btn>
  </v-list-item>
</template>

<script>
export default {
  name: 'TodoListItem',
  filters: {
    startsWithCapitalLetter(string) {
      return string.replace(string[0], string[0].toUpperCase())
    }
  },
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  watch: {
    'task.isCompleted': {
      handler(e) {
        console.log(e)
        console.log(this)
      }
    }
  }
}
</script>

<style>
.todo-list-task__text_completed {
  opacity: 1;
  will-change: opacity;
  transition: opacity 0.5s;
  position: relative;
}

.todo-list-task__text_completed {
  opacity: 0.5;
}

.todo-list-task__text_completed:after {
  content: ' ';
  position: absolute;
  top: 50%;
  left: 0;
  width: 140%;
  height: 2px;
  background: #fff;
  animation-name: strike;
  animation-duration: 0.5s;
  animation-timing-function: ease-in;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}

@keyframes strike {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
</style>
