<template>
  <div id="app">
    <h1>Virtual Background Simulator</h1>

    <div class="simulator-container">
      <WebcamFeed
        ref="webcamRef"
        :selectedBackground="selectedBackground"
        :brightness="brightness"
        :blur="blur"
        :contrast="contrast"
        :saturation="saturation"
        :grayscale="grayscale"
      />
      <BackgroundSelector @backgroundSelected="setBackground" />
    </div>

    <div class="slider-container" v-if="selectedBackground">
      <label>Brightness:</label>
      <input type="range" min="0.5" max="2" step="0.1" v-model.number="brightness" />
      <span>{{ brightness }}</span>

      <label>Blur:</label>
      <input type="range" min="0" max="10" step="0.5" v-model.number="blur" />
      <span>{{ blur }}px</span>

      <label>Contrast:</label>
      <input type="range" min="0.5" max="2" step="0.1" v-model.number="contrast" />
      <span>{{ contrast }}</span>

      <label>Saturation:</label>
      <input type="range" min="0" max="3" step="0.1" v-model.number="saturation" />
      <span>{{ saturation }}</span>

      <label>Grayscale:</label>
      <input type="range" min="0" max="1" step="0.1" v-model.number="grayscale" />
      <span>{{ grayscale }}</span>
    </div>

    <button class="capture-button" @click="captureFrame">📸 Capture Screenshot</button>

    <!-- 🔴 Logout Button -->
    <button class="logout-button" @click="logout">🚪 Logout</button>

    <!-- ✅ Logout Confirmation Modal -->
    <div v-if="showLogoutConfirm" class="modal-overlay">
      <div class="modal">
        <p class="modal-text">Are you sure you want to logout?</p>
        <div class="modal-actions">
          <button @click="confirmLogout" class="confirm-btn">Yes</button>
          <button @click="cancelLogout" class="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>

    <canvas ref="captureCanvas" width="640" height="480" style="display: none;"></canvas>
  </div>
</template>

<script>
import WebcamFeed from './WebcamFeed.vue';
import BackgroundSelector from './BackgroundSelector.vue';

export default {
  name: 'VirtualSimulator',
  components: {
    WebcamFeed,
    BackgroundSelector
  },
  data() {
    return {
      selectedBackground: null,
      brightness: 1.2,
      blur: 2,
      contrast: 1,
      saturation: 1,
      grayscale: 0,
      showLogoutConfirm: false
    };
  },
  methods: {
    setBackground(background) {
      this.selectedBackground = background;
    },
    captureFrame() {
      const video = this.$refs.webcamRef.$refs.video;
      const canvas = this.$refs.captureCanvas;
      const ctx = canvas.getContext('2d');

      if (this.selectedBackground) {
        const bg = new Image();
        bg.crossOrigin = 'anonymous';
        bg.src = this.selectedBackground;
        bg.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.filter = `
            brightness(${this.brightness})
            blur(${this.blur}px)
            contrast(${this.contrast})
            saturate(${this.saturation})
            grayscale(${this.grayscale})
          `;
          ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
          ctx.filter = 'none';
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const link = document.createElement('a');
          link.download = 'virtual_background_capture.png';
          link.href = canvas.toDataURL();
          link.click();
        };
      }
    },
    logout() {
      this.showLogoutConfirm = true;
    },
    confirmLogout() {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userEmail');
      this.$router.push('/login');
    },
    cancelLogout() {
      this.showLogoutConfirm = false;
    }
  }
};
</script>

<style scoped>
/* Layout */
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a, #2e2e2e);
  color: #f0f0f0;
  text-align: center;
  padding: 20px;
}

/* Header */
h1 {
  margin-bottom: 25px;
  color: #00ffcc;
}

/* Container Layouts */
.simulator-container {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
  margin-bottom: 20px;
}

.slider-container {
  margin-top: 30px;
  padding: 20px;
  background: #222;
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(0, 255, 200, 0.2);
  display: grid;
  grid-template-columns: 140px 1fr 60px;
  align-items: center;
  gap: 10px;
  max-width: 700px;
  width: 100%;
}

/* Inputs */
input[type="range"] {
  width: 100%;
  cursor: pointer;
  accent-color: #00ffcc;
}
label {
  font-weight: bold;
  color: #ddd;
}
span {
  font-weight: bold;
  color: #00ffcc;
}

/* Capture Button */
.capture-button {
  margin-top: 25px;
  padding: 10px 20px;
  background-color: #00ffcc;
  color: #000;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.capture-button:hover {
  background-color: #00ccaa;
}

/* 🔴 Logout Button */
.logout-button {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: #ff4d4d;
  color: #fff;
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.logout-button:hover {
  background-color: #e03b3b;
}

/* ✅ Logout Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(10, 10, 10, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal {
  background: #2e2e2e;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 255, 200, 0.2);
  text-align: center;
  width: 300px;
}
.modal-text {
  color: #fff;
  font-size: 16px;
  margin-bottom: 20px;
}
.modal-actions {
  display: flex;
  justify-content: space-around;
}
.confirm-btn {
  background-color: #00ffcc;
  color: #000;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-weight: bold;
  cursor: pointer;
}
.cancel-btn {
  background-color: #555;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-weight: bold;
  cursor: pointer;
}
.confirm-btn:hover {
  background-color: #00ccaa;
}
.cancel-btn:hover {
  background-color: #777;
}
</style>
