<template>
  <div class="signup-container">
    <h2>Create Account</h2>
    <form @submit.prevent="handleSignup">
      <label>Name:</label>
      <input type="text" v-model="name" required />

      <label>Email:</label>
      <input type="email" v-model="email" required />

      <label>Password:</label>
      <input type="password" v-model="password" required />

      <button type="submit">Sign Up</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
export default {
  name: 'UserSignup',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      error: ''
    };
  },
  methods: {
    handleSignup() {
      const users = JSON.parse(localStorage.getItem('users') || '[]');

      // check for existing email
      if (users.find(user => user.email === this.email)) {
        this.error = 'Email already registered.';
        return;
      }

      // store new user
      users.push({
        name: this.name,
        email: this.email,
        password: this.password,
      });

      localStorage.setItem('users', JSON.stringify(users));

      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.signup-container {
  max-width: 400px;
  margin: 100px auto;
  padding: 30px;
  background: #1f1f1f;
  color: #f0f0f0;
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(0, 255, 200, 0.2);
  text-align: center;
}

input {
  padding: 10px;
  border: none;
  border-radius: 6px;
  outline: none;
  margin-bottom: 15px;
  width: 100%;
}

button {
  padding: 10px;
  background-color: #00ffcc;
  color: #000;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  width: 100%;
}

button:hover {
  background-color: #00ccaa;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
