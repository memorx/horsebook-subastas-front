<template>
  <div v-if="status" class="inline">
    <div
      v-if="(status == 'COMING') & (bidStatus == 'PREBID')"
      class="bg-yellow-400 text-white rounded-full px-5 text-sm h-5 text-center w-38 whitespace-nowrap"
    >
      PRE OFERTA
    </div>
    <div
      v-if="status == 'BIDDING'"
      class="text-white rounded-full px-5 text-sm h-5 bg-green-400 text-center w-38 blink whitespace-nowrap"
    >
      EN VIVO
    </div>
    <div
      v-if="status == 'CLOSED'"
      class="text-white rounded-full px-5 text-sm h-5 bg-red-400 text-center w-38 whitespace-nowrap"
    >
      CERRADA
    </div>
    <div
      v-if="(status == 'COMING') & (bidStatus == 'CLOSED PREBID')"
      class="text-white rounded-full px-5 text-sm h-5 bg-[#B8BB2A] text-center w-38 whitespace-nowrap"
    >
      PRE OFERTA CERRADA
    </div>
    <div
      v-if="
        (status == 'COMING') & (bidStatus == 'COMING' || bidStatus == 'BIDDING')
      "
      class="text-white rounded-full px-5 text-sm h-5 bg-gray-500 text-center w-38 whitespace-nowrap"
    >
      EN ESPERA
    </div>
  </div>
</template>
<script>
export default {
  name: "StatusLabel",
  components: {},
  props: {
    status: {
      type: [String],
      required: true
    },
    bidStatus: {
      type: [String],
      required: true
    }
  },
  mounted() {
    console.log(`Bid: ${this.bidStatus} Horse: ${this.status}`)
  }
}
</script>
