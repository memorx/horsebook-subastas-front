<template>
  <div>
    <template v-if="setUser">
      <div class="cont-tableBid mx-auto px-2 my-5">
        <div class="overflow-x-auto">
          <table
            class="min-w-full"
            :key="tableKey"
          >
            <thead>
              <tr>
                <th class="table-header">Nombre</th>
                <th class="table-header">Nacionalidad</th>
                <th class="table-header">Oferta</th>
                <th class="table-header">Fecha</th>
              </tr>
            </thead>
            <tbody style="font-size: 13px;">
              <tr
                v-for="(bid, index) in visibleBids"
                :key="bid.id"
              >
                <td class="table-cell border-y text-center">
                  {{
                    bid.user_profile.name +
                    ' ' +
                    bid.user_profile.fathers_surname
                  }}
                </td>
                <td class="table-cell border-y text-center">{{ bid.user_profile.country }}</td>
                <td class="table-cell border-y text-center">${{ formatAmount(bid.amount) }}</td>
                <td class="table-cell border-y text-center">{{ formatDate(bid.bid_date) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex justify-center">
          <div class="flex items-center my-3">
            <button
              @click="toggleNextBids"
              class="bg-black text-white px-4 py-2 rounded-md px-4"
            >{{ showNextBids ? 'Mostrar solo ultima oferta' : 'Mostrar todas las ofertas' }}
            </button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
//import Loading from '../../../components/shared/Loading.vue';
import Winner from '../../components/bid/winner.vue'
import JWTDecode from "jwt-decode"
import axios from 'axios'
import moment from 'moment'
import getUserTokenOrDefault from '../../utils/getUserTokenOrDefault';



export default {
  name: 'Bids',
  components: {
    Winner,
  },
  props: {
    bidId: {
      type: String,
      required: true
    },
    horseID: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      name: '',
      amount: null,
      bidDate: '',
      lastOffer: '',
      detailsBid: [],
      parameters: {
        subasta_id: '',
        horse_id: '',
      },
      loading: false,
      tableKey: 0,
      test: 3,
      showNextBids: false,
      nextBidIndex: 1,
    }
  },
  computed: {
    setUser() {
      return this.$store.state.user;
    },
    visibleBids() {
      if (!Array.isArray(this.detailsBid)) {
        console.error("Unexpected data format for detailsBid:", this.detailsBid);
        return [];
      }

      if (this.showNextBids) {
        return this.detailsBid.slice(0, this.nextBidIndex + 1);
      }
      return this.detailsBid.slice(0, 1); // Only display the first bid
    }

  },
  mounted() {
    setInterval(() => {
      this.getDetailsBid(this.bidId, this.horseID);
    }, 1000);
  },
  methods: {
    formatAmount(amount) {
      return parseInt(amount).toLocaleString('en-US');
    },
    formatDate(date) {
      return moment(date).format('YY/MM/DD HH:mm');
    },
    async getDetailsBid(bid, horse) {
      const getLastBidsEndpoint = `/subastas/get-last-bids/`
      const url = `${this.$config.baseURL}${getLastBidsEndpoint}`
      const token = getUserTokenOrDefault()
      this.parameters.subasta_id = bid
      this.parameters.horse_id = horse
      this.tableKey++;
      await axios.get(url, {
        params: this.parameters,
        headers: {
          Authorization: `Token ${token}`
        }
      })
        .then(response => {
          this.detailsBid = response.data
          this.lastOffer = this.detailsBid[0].amount
          const formattedLastOffer = parseInt(this.lastOffer).toLocaleString('en-US');
          this.$emit('last-offer-updated', formattedLastOffer);
        })
        .catch(error => {
          console.error(error);
        });
    },
    toggleNextBids() {
      this.showNextBids = !this.showNextBids;
      if (this.showNextBids) {
        this.nextBidIndex = this.detailsBid.length - 1;
      } else {
        this.nextBidIndex = 1;
      }
    },
  },
}
</script>
