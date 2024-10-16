<template>
  <div v-if="!consentGiven">
    <p>Este sitio utiliza cookies para mejorar tu experiencia. ¿Aceptas el uso de cookies?</p>
    <button @click="acceptCookies" class="bg-custom-gold hover:bg-gold-100 text-black font-bold py-2 px-4 rounded">
      Aceptar
    </button>
    <button @click="rejectCookies" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">
      Rechazar
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      consentGiven: false
    }
  },
  mounted() {
    this.consentGiven = localStorage.getItem('cookieConsent') === 'true'
  },
  methods: {
    acceptCookies() {
      this.consentGiven = true
      localStorage.setItem('cookieConsent', 'true')
      this.$emit('consent', true)
    },
    rejectCookies() {
      this.consentGiven = true
      localStorage.setItem('cookieConsent', 'false')
      this.$emit('consent', false)
    }
  }
}
</script>
