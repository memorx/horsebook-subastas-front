<template>
  <div class="modal fixed inset-0 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 shadow-xl text-center">
      <h2 v-if="status == 'BIDDING'" class="text-lg font-bold">
        {{ $t('bids.bidConfirmQuestion') }}
      </h2>
      <h2 v-else class="text-lg font-bold">
        {{ $t('bids.prebidConfirmQuestion') }}
      </h2>
      <p class="text-3xl font-bold">$ {{ formattedAmount }} USD</p>
      <h2 v-if="hasPreBid || prebidWinner" class="text-2xl font-bold text-gray-600">
        Total: $ {{ formattedTotal }}
      </h2>
      <div v-if="hasPreBid" class="text-xs text-green-600">
        {{ $t('bids.prebidDiscountApplied') }} 5%
      </div>
      <div v-if="prebidWinner && prebidWinnerDiscount > 0" class="text-xs text-green-600">
        {{ $t('bids.prebidWinnerDiscountApplied') }} {{ prebidWinnerDiscount }}%
      </div>
      <div class="text-xs text-gray-400">
        {{ $t('bids.priceExcludesCommission') }}
      </div>
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
    amount: {
      type: String,
      required: true
    },
    submitForm: {
      type: Function,
      required: true
    },
    disableModal: {
      type: Function,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    prebidWinner: {
      type: Boolean,
      default: false
    },
    prebidWinnerDiscount: {
      type: Number,
      default: 0
    },
    hasPreBid: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    formattedAmount() {
      return this.formatNumber(this.parseAmount(this.amount));
    },
    totalAfterAllDiscounts() {
      let total = this.parseAmount(this.amount);
      if (this.hasPreBid) {
        total *= 0.95;
      }
      if (this.prebidWinner && this.prebidWinnerDiscount > 0) {
        total *= (1 - (this.prebidWinnerDiscount / 100));
      }
      return total;
    },
    formattedTotal() {
      return this.formatNumber(this.totalAfterAllDiscounts);
    }
  },
  methods: {
    parseAmount(value) {
      return parseFloat(value.replace(/,/g, ""));
    },
    formatNumber(value) {
      return value.toLocaleString('en-US', { maximumFractionDigits: 0 });
    },
    confirm(event) {
      this.submitForm(event);
      this.disableModal();
    }
  }
}
</script>

<style scoped>
.modal {
  background-color: rgba(128, 128, 128, 0.546);
  z-index: 1001;
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