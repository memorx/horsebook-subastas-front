<template>
  <div v-if="!consentGiven" class="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg z-[1001] max-w-sm">
    <p class="mb-4">{{ $t('cookieConsent.message') }}</p>
    <div class="flex justify-end space-x-2">
      <button @click="acceptCookies" class="bg-custom-gold hover:bg-gold-100 text-black font-bold py-2 px-4 rounded">
        {{ $t('cookieConsent.accept') }}
      </button>
      <button @click="rejectCookies" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        {{ $t('cookieConsent.reject') }}
      </button>
    </div>
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
