<template>
  <div class="signin">
    <h1>Log in</h1>
    <auth-form parent="signin">
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
    </auth-form>
    <span>
      First time here?
      <v-btn router to="/signup">Create an account</v-btn>
    </span>
  </div>
</template>

<script>
import AuthForm from '../components/AuthForm/AuthForm'
export default {
  name: 'Login',
  components: {
    AuthForm
  }
}
</script>
