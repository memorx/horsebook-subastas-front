<!-- YoutubeLoader.vue -->
<template>
  <client-only>
    <youtube-player
      v-if="shouldRender"
      :video-id="videoId"
      :initial-minimized="initialMinimized"
    />
  </client-only>
</template>

<script>
import { debounce } from 'lodash'

export default {
  name: 'YoutubeLoader',

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
      shouldRender: false
    }
  },

  mounted() {
    // Crear versión debounced del método de carga
    const debouncedLoad = debounce(() => {
      this.shouldRender = true
    }, 1000)

    // Usar nextTick para asegurar que el DOM está completamente renderizado
    this.$nextTick(() => {
      // Comprobar si la página ya está cargada
      if (document.readyState === 'complete') {
        debouncedLoad()
      } else {
        // Escuchar el evento load
        window.addEventListener('load', debouncedLoad)
      }
    })

    // Limpiar
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('load', debouncedLoad)
      debouncedLoad.cancel()
    })
  }
}
</script>