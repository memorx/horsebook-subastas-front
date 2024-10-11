<template>
  <div
    ref="container"
    class="fixed z-50"
    :style="{ top: `${top}px`, left: `${left}px` }"
    @mousedown="startDrag"
    @touchstart="startDrag"
  >
    <div class="bg-black bg-opacity-70 rounded-lg p-1">
      <div class="text-white text-center cursor-nesw-resize p-3" @click.stop="toggleExpand">
        <i class="fas" :class="isExpanded ? 'fa-compress-alt' : 'fa-expand-alt'"></i>
      </div>
      <div v-show="isExpanded" class="flex flex-col items-center cursor-move">
        <button @click.stop="handlePrevious" class="text-white p-1 mb-1" v-if="startIndex !== 0">
          <i class="fas fa-chevron-up"></i>
        </button>
        <div v-else class="h-9"></div>
        <div v-for="horse in visibleHorses" :key="horse.local_data.id"
          class="w-16 h-20 mb-1 relative"
        >
          <NuxtLink
            :to="getHorseLink(horse)"
            class="block w-12 h-12 rounded-full overflow-hidden cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            :class="{ 'ring-2 ring-green-500': horse.local_data.id === currentHorseId }"
          >
            <img
              v-if="horse.external_data.image_path"
              :src="apiImg + horse.external_data.image_path"
              :alt="horse.external_data.name"
              class="w-full h-full object-cover"
            >
            <HorsePlaceholderSVG v-else />
          </NuxtLink>
          <div
            v-if="horse.local_data.status === 'BIDDING'"
            class="absolute bottom-4 right-0 w-5 h-5 bg-green-500 rounded-full border-1 border-white animate-pulse z-10"
          ></div>
          <div
            v-if="horse.local_data.status === 'CLOSED PREBID'"
            class="absolute bottom-4 right-0 w-5 h-5 bg-yellow-500 rounded-full border-1 border-white z-10"
          ></div>
          <div class="absolute bottom-0 left-0 right-0 text-center text-white text-xs truncate">
            {{ horse.external_data.name }}
          </div>
        </div>
        <button @click.stop="handleNext" class="text-white p-1 mt-1" v-if="!(startIndex + 5 >= filteredHorses.length)">
          <i class="fas fa-chevron-down"></i>
        </button>
        <div v-else class="h-9"></div>
      </div>
    </div>
  </div>
</template>

<script>
import HorsePlaceholderSVG from '../HorsePlaceholderSVG.vue'
import Cookie from 'js-cookie'

export default {
  components: {
    HorsePlaceholderSVG
  },
  props: {
    bidId: {
      type: Number,
      required: true
    },
    horses: {
      type: Array,
      required: true
    },
    currentHorseId: {
      type: [String, Number],
      required: true
    },
    apiImg: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isExpanded: true,
      startIndex: 0,
      isDragging: false,
      startX: 0,
      startY: 0,
      left: 5,
      top: window.innerHeight - 600,
    }
  },
  computed: {
    sortedHorses() {
      return [...this.horses].sort((a, b) => {
        if (a.local_data.status === 'BIDDING') return -1;
        if (b.local_data.status === 'BIDDING') return 1;

        return a.local_data.lot - b.local_data.lot;
      });
    },
    filteredHorses() {
      return this.sortedHorses.filter(horse =>
        horse.local_data.show &&
        (horse.local_data.status === 'CLOSED PREBID' || horse.local_data.status === 'BIDDING')
      );
    },
    visibleHorses() {
      const endIndex = Math.min(this.startIndex + 5, this.filteredHorses.length);
      return this.filteredHorses.slice(this.startIndex, endIndex);
    }
  },
  mounted() {
    this.loadPositionFromCookie()
    document.addEventListener('mousemove', this.onDrag)
    document.addEventListener('mouseup', this.stopDrag)
    document.addEventListener('touchmove', this.onDrag)
    document.addEventListener('touchend', this.stopDrag)
    window.addEventListener('beforeunload', this.savePositionToCookie)
  },
  beforeDestroy() {
    document.removeEventListener('mousemove', this.onDrag)
    document.removeEventListener('mouseup', this.stopDrag)
    document.removeEventListener('touchmove', this.onDrag)
    document.removeEventListener('touchend', this.stopDrag)
    window.removeEventListener('beforeunload', this.savePositionToCookie)
  },
  methods: {
    handlePrevious() {
      this.startIndex = Math.max(0, this.startIndex - 1)
    },
    handleNext() {
      this.startIndex = Math.min(this.filteredHorses.length - 5, this.startIndex + 1)
    },
    toggleExpand() {
      this.isExpanded = !this.isExpanded
      this.savePositionToCookie()
    },
    startDrag(event) {
      if (event.button === 2) return
      if (event.type === 'touchstart') {
        event = event.touches[0]
      }
      this.isDragging = true
      this.startX = event.clientX - this.left
      this.startY = event.clientY - this.top
    },
    onDrag(event) {
      if (this.isDragging) {
        if (event.type === 'touchmove') {
          event = event.touches[0]
        }
        this.left = event.clientX - this.startX
        this.top = event.clientY - this.startY
      }
    },
    stopDrag() {
      this.isDragging = false
      this.savePositionToCookie()
    },
    getHorseLink(horse) {
      return `/bids/bid/?from=auction&id=${this.bidId}&horsePositionList=${horse.local_data.lot}&horseId=${horse.local_data.id}`
    },
    savePositionToCookie() {
      const position = {
        left: this.left,
        top: this.top,
        isExpanded: this.isExpanded
      }
      Cookie.set(`horseBubblePosition_${this.bidId}`, JSON.stringify(position), { expires: 7 })
    },
    loadPositionFromCookie() {
      const savedPosition = Cookie.get(`horseBubblePosition_${this.bidId}`)
      if (savedPosition) {
        const position = JSON.parse(savedPosition)
        this.left = position.left
        this.top = position.top
        this.isExpanded = position.isExpanded
      }
    },

  }
}
</script>

<style scoped>
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.cursor-move {
  cursor: move;
}
</style>