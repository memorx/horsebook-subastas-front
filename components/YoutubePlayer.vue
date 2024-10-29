<template>
  <div>
    <div v-if="mounted && !hidden" :class="['youtube-player', { minimized, 'center-maximized': !isAuctionLivePage }]">
      <div class="player-container">
        <div class="video-wrapper">
          <iframe
            :src="currentVideoUrl"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <div class="controls">
          <button @click="toggleMinimize">
            {{ minimized ? $t('youtubePlayer.maximize') : $t('youtubePlayer.minimize') }}
          </button>
          <button @click="closePlayer" v-if="minimized">
            {{ $t('youtubePlayer.close') }}
          </button>
        </div>
      </div>
    </div>
    <div v-else-if="hidden" class="video-tag" @click="playVideo">
      <i class="fas fa-play"></i> {{ $t('youtubePlayer.openVideo') }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'YoutubePlayer',

  props: {
    videoId: {
      type: String,
      required: true
    },
    initialMinimized: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      minimized: false,
      mounted: false,
      hidden: false,
      isPlaying: true,
      isMuted: true
    }
  },

  computed: {
    videoUrl() {
      return `https://www.youtube.com/embed/${this.videoId}?autoplay=1${this.isMuted ? '&mute=1' : ''}`
    },
    currentVideoUrl() {
      return this.isPlaying ? this.videoUrl : ''
    },
    isAuctionLivePage() {
      return this.$route.path.startsWith('/auction/live/')
    }
  },

  mounted() {
    this.minimized = this.initialMinimized
    this.mounted = true
  },

  methods: {
    toggleMinimize() {
      this.minimized = !this.minimized
    },
    closePlayer() {
      this.hidden = true
      this.isPlaying = false
      this.isMuted = true
      this.$emit('close')
    },
    playVideo() {
      this.isPlaying = true
      this.hidden = false
      this.minimized = true
      this.isMuted = false
      this.reloadVideo()
    },
    reloadVideo() {
      const iframe = this.$el.querySelector('iframe')
      if (iframe) {
        iframe.src = this.videoUrl
      }
    }
  }
}
</script>

<style scoped>
.youtube-player {
  position: fixed;
  z-index: 1000;
  transition: all 0.3s ease;
}

.youtube-player.minimized {
  bottom: 20px;
  left: 20px;
  width: 300px;
  height: 169px;
}

.youtube-player:not(.minimized) {
  top: 250px;
  left: 0;
  width: 50%;
  height: auto;
}

.youtube-player.center-maximized:not(.minimized) {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 1000px;
  height: auto;
}

@media (max-width: 1023px) {
  .youtube-player:not(.minimized) {
    top: 80px;
    left: 0;
    width: 100%;
    height: auto;
  }

  .youtube-player:not(.minimized) .video-wrapper {
    padding-top: 56.25%;
    height: 0;
  }

  .youtube-player:not(.minimized) iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .youtube-player.center-maximized:not(.minimized) {
    top: 80px;
    left: 0;
    transform: none;
    width: 100%;
    max-width: none;
  }
}

.video-tag {
  position: fixed;
  bottom: 20px;
  left: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  z-index: 1000;
  transition: background-color 0.3s ease;
}

.video-tag:hover {
  background-color: rgba(0, 0, 0, 0.9);
}

@media (min-width: 1024px) {
  .youtube-player:not(.minimized) {
    top: 250px;
    left: 0;
    width: 50%;
    height: auto;
  }

  .youtube-player:not(.minimized) .video-wrapper {
    padding-top: 56.25%;
    height: 0;
  }

  .youtube-player:not(.minimized) iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}

@media (max-width: 768px) {
  .youtube-player.minimized {
    width: 240px;
    height: 135px;
    left: 10px;
  }
}

.player-container {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
}

.video-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
}

.controls {
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  gap: 8px;
  z-index: 2;
}

button {
  padding: 4px 8px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  white-space: nowrap;
}

button:hover {
  background: rgba(0, 0, 0, 0.9);
}
</style>
