<template>
  <div class="background-selector">
    <h2>Select a Background</h2>

    <input type="file" accept="image/*" @change="handleUpload" class="upload-input" />

    <div class="background-options">
      <div
        v-for="(bg, index) in backgrounds"
        :key="index"
        class="bg-thumbnail"
        :style="{ backgroundImage: 'url(' + bg + ')' }"
        @click="selectBackground(bg)"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BackgroundSelector',
  data() {
    return {
      backgrounds: [
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb', // Mountain
        'https://images.unsplash.com/photo-1521295121783-8a321d551ad2', // Beach
        'https://images.unsplash.com/photo-1517511620798-cec17d428bc0', // Office
        'https://images.unsplash.com/photo-1503264116251-35a269479413', // Forest
        'https://images.unsplash.com/photo-1593642632823-8f785ba67e45', // Workspace
        require('@/assets/backgrounds/background1.jpg'),
        require('@/assets/backgrounds/background2.jpg'),
        require('@/assets/backgrounds/background3.jpg'),
        require('@/assets/backgrounds/vbg.jpg')
      ]
    };
  },
  methods: {
    selectBackground(bgUrl) {
      this.$emit('backgroundSelected', bgUrl);
    },
    handleUpload(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.backgrounds.unshift(e.target.result); // Add uploaded image
          this.selectBackground(e.target.result);    // Auto-select uploaded image
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please upload a valid image file.');
      }
    }
  }
};
</script>

<style scoped>
.background-selector {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h2 {
  color: rgb(4, 5, 5);
  margin-bottom: 10px;
}

.upload-input {
  margin-bottom: 15px;
  font-size: 14px;
  padding: 5px;
  cursor: pointer;
}

.background-options {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
}

.bg-thumbnail {
  width: 120px;
  height: 80px;
  background-size: cover;
  background-position: center;
  border: 2px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  transition: transform 0.2s, border-color 0.2s;
}

.bg-thumbnail:hover {
  transform: scale(1.05);
  border-color: rgb(11, 218, 125);
}
</style>
