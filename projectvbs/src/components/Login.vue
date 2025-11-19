<template>
  <div class="login-container">
    <h2>Login</h2>

    <form @submit.prevent="handleLogin" class="login-form">
      <label>Email:</label>
      <input type="email" v-model="email" required />

      <label>Password:</label>
      <input type="password" v-model="password" required />

      <button type="submit">Login</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      error: ''
    };
  },
  methods: {
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
.login-container {
  max-width: 400px;
  margin: 100px auto;
  padding: 30px;
  background: #1f1f1f;
  color: #f0f0f0;
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(0, 255, 200, 0.2);
  text-align: center;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

input {
  padding: 10px;
  border: none;
  border-radius: 6px;
  outline: none;
}

button {
  padding: 10px;
  background-color: #00ffcc;
  color: #000;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background-color: #00ccaa;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
