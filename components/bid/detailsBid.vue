<template>
  <div>
    <template>
      <div class="cont-tableBid mx-auto px-2 my-5">
        <div class="overflow-x-auto">
          <table class="min-w-full" :key="tableKey">
            <thead>
              <tr>
                <th v-if="!privateInformation" class="table-header capitalize">{{ $t('bids.name') }}</th>
                <th class="table-header capitalize">{{ $t('bids.nationality') }}</th>
                <th class="table-header capitalize">{{ $t('bids.bid') }}</th>
                <th class="table-header capitalize">{{ $t('bids.date') }}</th>
              </tr>
            </thead>
            <tbody style="font-size: 13px">
              <tr v-if="index < 20" v-for="(bid, index) in bids" :key="bid?.id">
                <td v-if="!privateInformation" class="table-cell border-y text-center">
                  {{ parsedName(bid) }}
                  <span v-if="index === 0" class="winner-badge">🏆 {{ $t('bids.winner') }}</span>
                </td>
                <td class="table-cell border-y text-center">
                  {{ bid?.user_profile.country }}
                </td>
                <td class="table-cell border-y text-center">
                  ${{ formatAmount(bid?.amount) }}
                </td>
                <td class="table-cell border-y text-center">
                  {{ formatDate(bid?.bid_date) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Winner from "../../components/bid/winner.vue"
import moment from "moment"

export default {
  name: "Bids",
  components: {
    Winner
  },
  props: {
    bidId: {
      type: String,
      required: true
    },
    horseID: {
      type: [String, Number],
      required: true
    },
    bids: {},
    hasBid:{
      type: Boolean,
    },
    privateInformation: {
      type: Boolean,
    }
  },
  data() {
    return {
      name: "",
      amount: null,
      bidDate: "",
      lastOffer: "",
      detailsBid: [],
      parameters: {
        subasta_id: "",
        horse_id: ""
      },
      loading: false,
      tableKey: 0,
      test: 3,
      showNextBids: false,
      nextBidIndex: 1
    }
  },
  computed: {
    visibleBids() {
      if (!Array.isArray(this.$props.bids)) {
        console.error(
          "Unexpected data format for detailsBid:",
          this.$props.bids
        )
        return []
      }

      if (this.showNextBids) {
        return this.$props.bids.slice(0, this.nextBidIndex + 1)
      }
      return this.$props.bids.slice(0, 1)
    },
    parsedName() {
      return (bid) => {
        if (this.hasBid && bid){
          const specialValues = [
            'On-site offer',
            'On Call Offer',
            '(On-site offer)',
            '(On Call Offer)']
          let fsurname = bid.user_profile?.fathers_surname
          if (specialValues.includes(fsurname)) {
            bid.user_profile.fathers_surname = this.$t(`backMessages.${fsurname}`)
          }
          return (bid?.user_profile?.name ?? "") + " " + bid?.user_profile?.fathers_surname
        }

        return "- -"
      }
    }
  },
  mounted() {
    const lastOffer = this.$props.bids[0]?.amount
    const formattedLastOffer = parseInt(lastOffer).toLocaleString("en-US")
    this.$emit("last-offer-updated", formattedLastOffer)
  },
  methods: {
    formatAmount(amount) {
      return parseInt(amount).toLocaleString("en-US")
    },
    formatDate(date) {
      return moment(date).format("YY/MM/DD HH:mm")
    },
    toggleNextBids() {
      this.showNextBids = !this.showNextBids
      if (this.showNextBids) {
        this.nextBidIndex = this.$props.bids.length - 1
      } else {
        this.nextBidIndex = 1
      }
    }
  }
}
</script>

<style scoped>
.winner-badge {
  display: inline-block;
  margin-left: 5px;
  padding: 2px 5px;
  background-color: #ffd700;
  color: #000;
  border-radius: 3px;
  font-size: 0.8em;
}
</style>
