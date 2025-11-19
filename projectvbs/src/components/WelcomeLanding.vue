<template>
  <div class="auth-page">
    <div class="auth-card">
      <h2 class="form-title">{{ isSignup ? 'Sign Up' : 'Login' }}</h2>

      <form @submit.prevent="isSignup ? handleSignup() : handleLogin()">
        <transition name="fade">
          <div v-if="isSignup" class="input-group">
            <label for="name">Name</label>
            <input type="text" id="name" v-model="name" placeholder="Enter your name" required />
          </div>
        </transition>

        <div class="input-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" placeholder="Enter your email" required />
        </div>

        <div class="input-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" placeholder="Enter your password" required />
        </div>

        <button type="submit" class="primary-btn">
          {{ isSignup ? 'Create Account' : 'Login' }}
        </button>

        <p v-if="error" class="error-text">{{ error }}</p>
        <p v-if="success" class="success-text">{{ success }}</p>
      </form>

      <button class="toggle-link" @click="toggleForm">
        {{ isSignup ? 'Already have an account? Login' : "Don't have an account? Sign up" }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WelcomeLanding',
  data() {
    return {
      isSignup: true,
      name: '',
      email: '',
      password: '',
      error: '',
      success: ''
    };
  },
  methods: {
    toggleForm() {
      this.error = '';
      this.success = '';
      this.isSignup = !this.isSignup;
    },
    handleSignup() {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.find(user => user.email === this.email)) {
        this.error = 'Email already registered.';
        this.success = '';
        return;
      }

      users.push({
        name: this.name,
        email: this.email,
        password: this.password
      });
      localStorage.setItem('users', JSON.stringify(users));
      this.isSignup = false;
      this.success = 'Account created! Please log in.';
      this.error = '';
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
        this.success = '';
      }
    }
  }
};
</script>

<style scoped>
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: radial-gradient(circle, #101010 0%, #1e1e1e 100%);
  padding: 20px;
}

.auth-card {
  width: 100%;
  max-width: 420px;
  background: #2a2a2a;
  padding: 35px 30px;
  border-radius: 16px;
  box-shadow: 0 0 18px rgba(0, 255, 200, 0.25);
  color: #fff;
  transition: all 0.3s ease-in-out;
}

.form-title {
  margin-bottom: 25px;
  font-size: 26px;
  color: #00ffcc;
  text-align: center;
}

.input-group {
  margin-bottom: 18px;
}

label {
  display: block;
  font-size: 14px;
  margin-bottom: 6px;
  color: #ccc;
}

input {
  width: 100%;
  padding: 10px 12px;
  border: none;
  border-radius: 6px;
  background: #444;
  color: #fff;
  font-size: 14px;
  outline: none;
  transition: background 0.2s ease;
}

input:focus {
  background: #555;
}

.primary-btn {
  width: 100%;
  padding: 12px;
  background-color: #00ffcc;
  color: #000;
  font-weight: bold;
  font-size: 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.2s ease;
}

.primary-btn:hover {
  background-color: #00ccaa;
}

.toggle-link {
  margin-top: 20px;
  display: block;
  background: transparent;
  border: none;
  color: #00ffcc;
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
}

.error-text {
  margin-top: 10px;
  color: #ff5c5c;
  font-size: 13px;
  text-align: center;
}

.success-text {
  margin-top: 10px;
  color: #00ff88;
  font-size: 13px;
  text-align: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
