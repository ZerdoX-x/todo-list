<template>
  <div class="signup">
    <h1>Sign up</h1>
    <v-form>
      <label>
        Name:
        <v-text-field type="text" placeholder="John Doe" min="2" max="128" />
      </label>
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
      Have an account?
      <v-btn to="/login">Log in to account</v-btn>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Signup'
}
</script>
