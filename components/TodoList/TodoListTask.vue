<template>
  <v-list-item class="task">
    <span
      class="task__text"
      :class="{ task_completed__text: task.isCompleted }"
    >
      {{ task.text | startsWithCapitalLetter }}
    </span>
    <v-checkbox
      v-model="isCompleted"
      class="ml-auto"
      @change="moveTask"
    ></v-checkbox>
    <v-btn icon fab @click="removeTask($event, task.id)">
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
    },
    isFiltered: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      isCompleted: null,
      delay: 500
    }
  },
  watch: {
    task: {
      deep: true,
      handler(e) {
        // sort checkboxes
        this.isCompleted = e.isCompleted
      }
    }
  },
  mounted() {
    // check checkbox if task is completed
    this.isCompleted = this.task.isCompleted
  },
  methods: {
    removeTask({ target }, id) {
      setTimeout(() => {
        this.$emit('remove-task', id)
        this.$el.classList.remove('task_removed')
        target.checked = false
      }, this.delay)
      this.$el.classList.add('task_removed')
    },
    moveTask() {
      // animate & remove if list is filtered else remove
      if (this.isFiltered) {
        setTimeout(() => {
          this.task.isCompleted = !this.task.isCompleted
          this.$el.classList.remove('task_moved')
        }, this.delay)
        this.$el.classList.add('task_moved')
      } else this.task.isCompleted = !this.task.isCompleted
    }
  }
}
</script>

<style>
.task__text {
  opacity: 1;
  will-change: opacity;
  transition: opacity 0.5s;
}

.task_completed__text {
  opacity: 0.5;
}

.task {
  will-change: transform, opacity;
}

.task_removed,
.task_moved {
  opacity: 0;
  transition: transform 0.5s, opacity 0.5s;
}
.task_removed {
  transform: translateX(-100vw);
}

.task_moved {
  transform: translateX(100vw);
}
</style>
