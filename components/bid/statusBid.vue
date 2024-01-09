<template>
  <div v-if="status" class="inline">
    <div
      v-if="status == 'COMING'"
      class="bg-[#A8A29E] text-white rounded-xl px-5 py-2 text-sm text-center w-38 whitespace-nowrap"    >
      EN ESPERA
    </div>
    <div
      v-if="status == 'PREBID'"
      class="bg-yellow-400 text-black-sys-500 rounded-xl px-5 py-2 text-sm text-center w-38 whitespace-nowrap text-white"
    >
      PRE OFERTA
    </div>
    <div
      v-if="status == 'CLOSED PREBID'"
      class="bg-[#B8BB2A] text-white rounded-xl px-5 py-2 text-sm text-center w-auto whitespace-nowrap"
    >
      PRE OFERTA CERRADA
    </div>
    <div
      v-if="status == 'BIDDING'"
      class="text-white rounded-xl px-5 py-2 text-sm bg-green-400 text-center w-38 blink whitespace-nowrap"
    >
      EN VIVO
    </div>
    <div
      v-if="status == 'CLOSED'"
      class="text-white rounded-xl px-5 py-2 text-sm bg-red-400 text-center w-38 whitespace-nowrap"
    >
      CERRADA
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
    }
  }
}
</script>
