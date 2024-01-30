<template>
  <div class="modal fixed inset-0 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 shadow-xl text-center">
      <h2 v-if="status == 'BIDDING'" class="text-lg font-bold">
        {{ $t('bids.bidConfirmQuestion') }}
      </h2>
      <h2 v-else class="text-lg font-bold">
        {{ $t('bids.prebidConfirmQuestion') }}
      </h2>
      <p class="text-3xl font-bold">$ {{ parseFloat(amount.replace(/,/g, "")).toLocaleString('en-US', { maximumFractionDigits: 0 }) }} USD</p>
      <h2 class="text-sm text-gray-500">$ {{ parseFloat(amount.replace(/,/g, "")).toLocaleString('en-US', { maximumFractionDigits: 0 }) }} + {{ commission }}% {{ $t('bids.commission') }}</h2>
      <h2 class="text-sm text-gray-500">
        Total: $
        {{ (parseFloat(amount.replace(/,/g, "")) * (1 + (commission/100))).toLocaleString('en-US', { maximumFractionDigits: 0 }) }}
      </h2>
      <div class="mt-4 flex justify-center">
        <button
          class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg mr-4 transition duration-300 ease-in-out"
          @click="confirm"
        >
          {{ $t('general.confirm') }}
        </button>
        <button
          class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out"
          @click="disableModal"
        >
          {{ $t('general.cancel')  }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    amount: "",
    submitForm: { type: Function },
    disableModal: { type: Function },
    status: "",
    commission: 0,
    taxes: 0,
  },
  data() {
    return {}
  },
  methods: {
    open() {
      this.showModal = true
    },
    close() {
      this.showModal = false
    },
    confirm(event) {
      this.submitForm(event)
      this.disableModal()
    }
  }
}
</script>

<style scoped>
/* Add your modal styling here */
.modal {
  background-color: rgba(128, 128, 128, 0.546);
}

.modal-content {
  background-color: #fff;
  margin: 0 auto;
  text-align: center;
  position: relative;
}

button {
  margin-top: 10px;
}
</style>
