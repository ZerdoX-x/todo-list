<template>
  <v-overlay :value="loading" class="page-loader text-center">
    <v-progress-circular indeterminate size="64"></v-progress-circular>
  </v-overlay>
</template>

<script>
export default {
  name: 'Loader',
  data: () => ({ loading: false }),
  mounted() {
    console.log(this)
  },
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    }
  }
}
</script>
