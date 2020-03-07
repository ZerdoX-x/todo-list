<template>
  <v-form :class="parent + '__auth-form'">
    <slot></slot>
  </v-form>
</template>

<script>
export default {
  name: 'AuthForm',
  props: {
    parent: {
      type: String,
      required: true
    }
  }
}
</script>
