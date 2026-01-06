<template>
  <div v-if="images.length > 0" class="gallery">
    <div class="flex flex-wrap justify-center">
      <div v-for="(image, index) in images" :key="index" class="m-2 relative">
        <div v-if="!loadedImages[index]" class="absolute inset-0 bg-gray-200 animate-pulse rounded w-30 h-20"></div>
        <img
          :src="image"
          :data-src="image"
          alt="Gallery Image"
          loading="lazy"
          class="rounded shadow-lg w-30 h-20 object-cover transition-opacity duration-300"
          :class="{ 'opacity-0': !loadedImages[index], 'opacity-100': loadedImages[index] }"
          @load="onImageLoad(index)"
          @error="onImageError(index)"
        />
      </div>
    </div>
    <div v-if="isUserAuthenticated" class="flex items-center justify-center my-5 space-x-2">
      <button
        class="text-black border-2 border-black px-4 py-2 rounded-md hover:bg-gray-900 hover:text-white duration-100 capitalize"
        style="height: 40px"
        @click="downloadImage"
      >
        {{ $t('general.download') }}
      </button>
    </div>
  </div>
  <div v-else>
    <h1 class="text-gray-700">{{ $t('horse.xRaysNoImagesMsg')}}</h1>
  </div>
</template>

<script>
import axios from 'axios'
import JWTDecode from "jwt-decode"
import { saveAs } from "file-saver"

export default {
  name: "xRayGallery",
  props: {
    images: Array,
    horse_id: [String, Number],
    horse_name: String
  },
  data() {
    return {
      loadedImages: {}
    }
  },
  computed: {
    isUserAuthenticated() {
        return this.$store.state.isAuthenticated;
    },
  },
  watch: {
    images: {
      immediate: true,
      handler(newImages) {
        // Reset loadedImages when images change
        this.loadedImages = {}
      }
    }
  },
  methods: {
    onImageLoad(index) {
      this.$set(this.loadedImages, index, true)
    },
    onImageError(index) {
      // Mark as loaded even on error to remove the placeholder
      this.$set(this.loadedImages, index, true)
    },
    async downloadImage() {
      // Generate the zip and trigger the download
      const decoded = JWTDecode(this.$cookies.get("access_token"))
      const url = `${this.$config.baseURL}/xray/download/`
      axios.get(url, {
        responseType: 'blob',
        params: {
          horse_id: this.horse_id
        }, headers: {
          Authorization: `Token ${decoded.token}`
        }}).then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          const filename = this.horse_name + '_xrays.zip'
          link.setAttribute('download', filename);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }).catch((error) => {
          // console.log(error)
        })
    }
  }
}
</script>

<style scoped>
/* Any additional styles you'd like to add */
</style>
