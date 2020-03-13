<template>
  <div class="login">
    <h1>Log in</h1>
    <v-form>
      <label>
        Email:
        <v-text-field
          type="email"
          placeholder="example@domain.com"
          min="6"
          max="128"
        />
      </label>
      <label>
        Password:
        <v-text-field
          type="password"
          placeholder="********"
          min="6"
          max="128"
        />
      </label>
      <v-btn type="submit">Log in</v-btn>
    </v-form>
    <span>
      First time here?
      <v-btn router to="/signup">Create an account</v-btn>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Login'
}
</script>
