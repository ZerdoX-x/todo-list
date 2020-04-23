<template>
  <v-list-item
    :class="{ Task_Completed: task.isCompleted }"
    :style="{
      animationDuration: settings.animationsDuration + 'ms',
      transitionDuration: settings.animationsDuration + 'ms',
      background: $vuetify.theme.dark ? '#1e1e1e' : '#f1f1f1'
    }"
    class="TodoList-Task Task"
  >
    <v-text-field
      v-if="edit.is"
      v-model="edit.value"
      class="mr-3"
      @keyup.enter="saveTask(task.id)"
    />
    <span v-else>
      {{ task.text | startsWithCapitalLetter }}
    </span>
    <v-btn
      class="ml-auto"
      icon
      fab
      @click="edit.is ? saveTask(task.id) : editTask(task.text)"
    >
      <v-icon>mdi-{{ edit.is ? 'content-save' : 'pencil' }}</v-icon>
    </v-btn>
    <v-checkbox v-model="checkbox" @change="checkTask(task.id)" />
    <v-btn :disabled="edit.is" icon fab @click="removeTask(task.id)">
      <v-icon>mdi-close-circle</v-icon>
    </v-btn>
  </v-list-item>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Task',
  filters: {
    startsWithCapitalLetter: (string) =>
      string ? string.replace(string[0], string[0].toUpperCase()) : ''
  },
  props: {
    task: { type: Object, required: true }
  },
  data: () => ({
    checkbox: false,
    edit: { is: false, value: '' }
  }),
  computed: {
    ...mapState('todo', ['filterValue']),
    ...mapState('settings', ['settings'])
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
    }, this.settings.animationsDuration)
  },
  methods: {
    removeTask(id) {
      this.$el.classList.add('Task_Removed')
      setTimeout(() => {
        this.$store.dispatch('todo/removeTask', id)
        this.$el.classList.remove('Task_Removed')
      }, this.settings.animationsDuration)
    },
    checkTask(index) {
      if (this.filterValue === 'All')
        // do not animate checking/moving if filterValue is 'All'
        return this.$store.commit('todo/checkTask', index)
      this.$el.classList.add('Task_Moved')
      setTimeout(() => {
        this.$store.commit('todo/checkTask', index)
        this.$el.classList.remove('Task_Moved')
      }, this.settings.animationsDuration)
    },
    editTask(text) {
      this.edit.value = text ? text.replace(text[0], text[0].toUpperCase()) : ''
      this.edit.is = true
    },
    saveTask(index) {
      this.$store.commit('todo/editTask', [index, this.edit.value])
      this.edit.is = false
    }
  }
}
</script>

<style>
.Task {
  will-change: transform, opacity;
  animation-fill-mode: forwards;
}

.Task.Task_Completed {
  opacity: 0.5;
}

.Task.Task_Moved {
  animation-name: Task_Moved;
}

@keyframes Task_Moved {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100vw);
  }
}

.Task.Task_New {
  animation-name: Task_New;
}

@keyframes Task_New {
  from {
    transform: translateX(-100vw);
  }
  to {
    transform: translateX(0);
  }
}

.Task.Task_Removed {
  animation-name: Task_Removed;
}

@keyframes Task_Removed {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100vw);
  }
}
</style>
