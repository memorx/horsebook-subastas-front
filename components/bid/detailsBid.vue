<template>
  <div class="">
    <div class="details-bid max-w-6xl">
      <div class="cont-titleBid title-bid flex justify-between">
        <div v-if="setUser">
          <p style="font-size: 30px; font-weight:600">Historial de ofertas:</p>
          <!-- <p style="color: #667085;">Últimas ofertas</p> -->
        </div>
      </div>
    </div>
    <template v-if="setUser">
      <div class="cont-tableBid mx-auto px-4 my-5">
        <div class="overflow-x-auto">
          <table
            class="table-bid min-w-full"
            :key="tableKey"
          >
            <thead class="th-tableBid">
              <tr>
                <th class="columns-1">Nombre</th>
                <th class="columns-1">Nacionalidad</th>
                <th class="columns-1">Oferta (USD)</th>
                <th class="columns-1">Fecha</th>
              </tr>
            </thead>
            <tbody style="font-size: 13px;">
              <tr
                v-for="(bid, index) in visibleBids"
                :key="bid.id"
              >
                <td>
                  {{
                    bid.user_profile.name +
                    ' ' +
                    bid.user_profile.fathers_surname +
                    ' ' +
                    bid.user_profile.mothers_maiden_name
                  }}
                </td>
                <td>{{ bid.user_profile.country }}</td>
                <td>${{ formatAmount(bid.amount) }}</td>
                <td>{{ formatDate(bid.bid_date) }}</td>
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
      if (this.showNextBids) {
        return this.detailsBid.slice(0, this.nextBidIndex + 1);
      }
      return this.detailsBid.slice(0, 1); // Only display the first bid
    },
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
      const decoded = JWTDecode(this.$cookies.get("access_token"))
      this.parameters.subasta_id = bid
      this.parameters.horse_id = horse
      this.tableKey++;
      await axios.get(url, {
        params: this.parameters,
        headers: {
          Authorization: `Token ${decoded.token}`
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

<style scoped>
/* .cont-detailsBid {
  padding-left: 25px;
} */

/* .details-bid {} */

.cont-titleBid {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.winner {
  display: flex;
  flex-direction: row;
  gap: 25px;
  padding-right: 25px;
  padding-top: 35px;
}

#win-flag {
  color: #027A48;
  border: solid #027A48;
  border-radius: 18px;
  font-size: 15px;
  padding: 5px 5px;
  text-align: center;
  font-weight: 600;
}

.cont-tableBid {
  border-radius: 15px;
  box-shadow: 0px 1px 2px 1px rgba(0, 0, 0, 0.2);
}

.table-bid {
  width: 100%;
}

.th-tableBid {
  position: sticky;
  top: 0;
  color: rgb(44, 45, 48);
  z-index: 1;
}

.table-bid th,
.table-bid td {
  border-bottom: 1px solid #ccc;
  text-align: left;
  padding: 8px;
}
</style>
