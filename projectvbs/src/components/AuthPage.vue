<template>
  <div class="auth-container">
    <h2>{{ isSignup ? 'Create Account' : 'Login' }}</h2>

    <form @submit.prevent="isSignup ? handleSignup() : handleLogin()">
      <div v-if="isSignup">
        <label>Name:</label>
        <input type="text" v-model="name" required />
      </div>

      <label>Email:</label>
      <input type="email" v-model="email" required />

      <label>Password:</label>
      <input type="password" v-model="password" required />

      <button type="submit">{{ isSignup ? 'Sign Up' : 'Login' }}</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>

    <button class="toggle-button" @click="toggleForm">
      {{ isSignup ? 'Already have an account? Login' : 'Don\'t have an account? Sign up' }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'AuthPage',
  data() {
    return {
      isSignup: true,
      name: '',
      email: '',
      password: '',
      error: ''
    };
  },
  methods: {
    toggleForm() {
      this.error = '';
      this.isSignup = !this.isSignup;
    },
    handleSignup() {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.find(user => user.email === this.email)) {
        this.error = 'Email already registered.';
        return;
      }

      users.push({
        name: this.name,
        email: this.email,
        password: this.password
      });
      localStorage.setItem('users', JSON.stringify(users));
      this.isSignup = false;
      this.error = 'Account created! Please log in.';
    },
    handleLogin() {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const found = users.find(user => user.email === this.email && user.password === this.password);
      if (found) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', found.email);
        this.$router.push('/home');
      } else {
        this.error = 'Invalid email or password.';
      }
    }
  }
};
</script>

<style scoped>
.auth-container {
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
  margin-top: 10px;
}

button:hover {
  background-color: #00ccaa;
}

.toggle-button {
  background-color: transparent;
  color: #00ffcc;
  text-decoration: underline;
  font-size: 14px;
  margin-top: 15px;
  width: auto;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
