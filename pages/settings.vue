<template>
  <div class="settings">
    <h1>Settings</h1>
    <v-card class="my-2">
      <v-card-subtitle>Animations</v-card-subtitle>
      <v-divider />
      <animations-duration />
      <animations-state />
    </v-card>
    <v-card class="my-2">
      <v-card-subtitle>Todo List</v-card-subtitle>
      <v-divider />
      <todo-list-delete-warning />
    </v-card>
    <v-card class="my-2">
      <v-card-subtitle>Appearance</v-card-subtitle>
      <v-divider />
      <appearance-theme />
      <appearance-mini-variant />
    </v-card>
  </div>
</template>

<script>
import AnimationsDuration from '../components/Settings/-AnimationsDuration/Settings-AnimationsDuration'
import AnimationsState from '../components/Settings/-AnimationsState/Settings-AnimationsState'
import TodoListDeleteWarning from '../components/Settings/-TodoListDeleteWarning/Settings-TodoListDeleteWarning'
import AppearanceTheme from '../components/Settings/-AppearanceTheme/Settings-AppearanceTheme'
import AppearanceMiniVariant from '../components/Settings/-AppearanceMiniVariant/Settings-AppearanceMiniVariant'

export default {
  name: 'Settings',
  transitions: 'page',
  components: {
    AnimationsDuration,
    AnimationsState,
    TodoListDeleteWarning,
    AppearanceTheme,
    AppearanceMiniVariant
  }
}
</script>
