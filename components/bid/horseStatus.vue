<template>
  <div v-if="status" class="inline">
    <div
      v-if="status == 'PREBID'"
      class="bg-yellow-400 text-white rounded-xl px-5 py-2 text-sm text-center w-38 whitespace-nowrap uppercase"
    >
      {{ $t('auction.statuses.PREBID') }}

    </div>
    <div
      v-if="status == 'BIDDING'"
      class="text-white rounded-xl px-5 py-2 text-sm bg-green-400 text-center w-38 blink whitespace-nowrap uppercase"
    >
    {{ $t('auction.statuses.LIVE') }}
    </div>
    <div
      v-if="status == 'CLOSED'"
      class="text-white rounded-xl px-5 py-2 text-sm bg-red-400 text-center w-38 whitespace-nowrap uppercase"
    >
    {{ $t('auction.statuses.CLOSED') }}
    </div>
    <div
      v-if="status == 'CLOSED PREBID'"
      class="text-white rounded-xl px-5 py-2 text-xs md:text-sm bg-[#B8BB2A] text-center w-38 md:whitespace-nowrap uppercase"
    >
    {{ $t('auction.statuses.CLOSED PREBID') }}
    </div>
    <div
      v-if="status == 'COMING'"
      class="text-white rounded-xl px-5 py-2 text-sm bg-gray-500 text-center w-38 whitespace-nowrap uppercase"
    >
    {{ $t('auction.statuses.COMING') }}
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
