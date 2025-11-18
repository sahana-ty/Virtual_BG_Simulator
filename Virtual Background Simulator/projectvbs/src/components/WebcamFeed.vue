<template>
  <div class="webcam-container">
    <!-- Background Layer -->
    <div class="virtual-background" :style="backgroundStyle"></div>

    <!-- Webcam Video Layer -->
    <video ref="video" autoplay muted playsinline class="webcam-video" />
  </div>
</template>

<script>
export default {
  name: 'WebcamFeed',
  props: [
    'selectedBackground',
    'brightness',
    'blur',
    'contrast',
    'saturation',
    'grayscale'
  ],
  computed: {
    backgroundStyle() {
      return {
        backgroundImage: `url(${this.selectedBackground})`,
        filter: `
          brightness(${this.brightness})
          blur(${this.blur}px)
          contrast(${this.contrast})
          saturate(${this.saturation})
          grayscale(${this.grayscale})
        `
      };
    }
  },
  mounted() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        this.$refs.video.srcObject = stream;
      })
      .catch((err) => {
        console.error("Webcam access error:", err);
      });
  }
};
</script>

<style scoped>
.webcam-container {
  position: relative;
  width: 100%;
  max-width: 800px;
  aspect-ratio: 4 / 3;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 12px;
  background-color: #000;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
}

/* Background image */
.virtual-background {
  position: absolute;
  inset: 0;
  z-index: 1;
  background-size: cover;
  background-position: center;
  transition: filter 0.4s ease-in-out, background-image 0.6s ease-in-out;
}

/* Webcam video on top of background */
.webcam-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 2;
  opacity: 0.8;
  mix-blend-mode: darken; /* Blend nicely */
}
</style>
