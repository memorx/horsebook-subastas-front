<template>
  <div v-if="images.length > 0" class="gallery">
    <div class="flex flex-wrap justify-center">
      <div v-for="(image, index) in images" :key="index" class="m-2">
        <img
          :src="image"
          alt="Gallery Image"
          class="rounded shadow-lg w-30 h-20 object-cover"
        />
      </div>
    </div>
    <div class="flex items-center justify-center my-5 space-x-2">
      <button
        class="text-black border-2 border-black px-4 py-2 rounded-md hover:bg-gray-900 hover:text-white duration-100"
        style="height: 40px"
        @click="downloadImage"
      >
        Descargar
      </button>
    </div>
  </div>
  <div v-else>
    <h1 class="text-gray-500">No hay imagenes de Xray disponibles</h1>
  </div>
</template>

<script>
import JSZip from "jszip"
import { saveAs } from "file-saver"

export default {
  name: "xRayGallery",
  props: {
    images: Array
  },
  methods: {
    async downloadImage() {
      const zip = new JSZip()

      const imagePromises = this.images.map(async (imageUrl, index) => {
        const response = await fetch(imageUrl)
        const blob = await response.blob()
        zip.file(`xray${index + 1}.jpg`, blob) // Assuming the images are in jpg format
      })

      // Wait for all images to be fetched and added to the zip
      await Promise.all(imagePromises)

      // Generate the zip and trigger the download
      const zipBlob = await zip.generateAsync({ type: "blob" })
      saveAs(zipBlob, "xrayImages.zip")
    }
  }
}
</script>

<style scoped>
/* Any additional styles you'd like to add */
</style>
