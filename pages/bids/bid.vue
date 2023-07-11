<template>
  <div class="cont-bid">
    <NavBarAuction />
    <div class="cont-context">
      <div class="cont-horseImg">
      </div>
      <div class="data-bid">
        <p style="font-size: 30px; font-weight: 400;">{{ HorsenName }}</p>
        <p v-if="isCurrentDate" style="color: green; font-weight: 600; padding-top: 16px;">OFERTA ABIERTA</p>
        <p v-else style="color: red; font-weight: 600; padding-top: 16px;">OFERTA CERRADA</p>
        <div class="preOffer-date">
          <div v-if="this.statusPreBid" style="color: #667085;">
            <p id="">Termino de Pre-Oferta:</p>
            <p id="date" style="font-family: 16px; font-weight: bold;">{{ EndPreBidDateFormat }}</p>
          </div>
          <div v-else style="color: #667085;">
            <p id="">Fecha de Pre-Oferta:</p>
            <p id="date" style="font-family: 16px; font-weight: bold;">{{ PreBidDateFormat }}</p>
          </div>
        </div>
        <div class="offer-date">
          <div v-if="this.statusBid" style="color: #667085;">
            <p id="">Termino de subasta:</p>
            <p id="date" style="font-family: 16px; font-weight: bold;">{{ EndBidDateFormat }}</p>
          </div>
          <div v-else style="color: #667085;">
            <p id="">Fecha de subasta:</p>
            <p id="date" style="font-family: 16px; font-weight: bold;">{{ BidDateFormat }}</p>
          </div>
        </div>
        <MakeOffer :bidId="bidId" :horseID="horseID" :EndPreBidDate="EndPreBidDate" :lastOffer="lastOffer"
          @form-submitted="handleFormSubmitted" />
      </div>
      <hr>
      <Bids ref="detailsBid" :bidId="bidId" :horseID="horseID" @last-offer-updated="updateLastOffer" />
    </div>
  </div>
</template>
<script>

import Bids from '../../components/bid/detailsBid.vue'
import MakeOffer from '../../components/bid/makeOffer.vue'
import axios from 'axios'
import JWTDecode from "jwt-decode"
import moment from 'moment'


export default {
  components: {
    Bids,
    MakeOffer,
  },
  data() {
    return {
      HorsenName: '',
      lastOffer: '',
      horseID: '',
      PreBidDate: '',
      EndPreBidDate: '',
      PreBidDateFormat: '',
      EndPreBidDateFormat: '',
      statusPreBid: false,
      BidDate: '',
      EndBidDate: '',
      BidDateFormat: '',
      EndBidDateFormat: '',
      statusBid: false,
      apiImg: 'https://storage.googleapis.com/horsebook/',
    }
  },
  computed: {
    setUser() {
      return this.$store.state.user;
    },
    bidId() {
      return this.$route.query.id;
    },
    horsePositionList() {
      return this.$route.query.horsePositionList;
    },
    isCurrentDate() {
      const CurrentDate = new Date()
      const bidDate = new Date(this.BidDate)
      const endBidDate = new Date(this.EndBidDate)
      const preBidDate = new Date(this.PreBidDate)
      const EndPreBidDate = new Date(this.EndPreBidDate)
      this.statusPreBid = CurrentDate >= preBidDate && CurrentDate <= EndPreBidDate
      this.statusBid = CurrentDate >= bidDate && CurrentDate <= endBidDate
      let statusFinal = this.statusPreBid || this.statusBid
      return statusFinal
    },
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    formatted(date) {
      const dateformat = moment(date).format('DD/MM/YYYY')
      return dateformat
    },
    handleFormSubmitted() {
      this.$refs.detailsBid.getDetailsBid(this.bidId, this.horseID);
    },
    updateLastOffer(offer) {
      this.lastOffer = offer;
    },
    fetchData() {

      const listSubastasEndpoint = `/subastas/list-subastas/?id=${this.bidId}`
      const url = `${this.$config.baseURL}${listSubastasEndpoint}`
      const decoded = JWTDecode(this.$cookies.get("access_token"))
      axios.get(url, {
        headers: {
          Authorization: `Token ${decoded.token}`
        }
      })
        .then(response => {
          const horse = response.data
          //name
          this.HorsenName = horse.horses[this.horsePositionList].external_data.name
          //horse ID
          this.horseID = horse.horses[this.horsePositionList].external_data.id
          //prebid date
          this.PreBidDate = horse.start_pre_bid
          this.EndPreBidDate = horse.end_pre_bid
          this.PreBidDateFormat = this.formatted(horse.start_pre_bid)
          this.EndPreBidDateFormat = this.formatted(horse.end_pre_bid)
          //bid date
          this.BidDate = horse.start_bid
          this.EndBidDate = horse.end_bid
          this.BidDateFormat = this.formatted(horse.start_bid)
          this.EndBidDateFormat = this.formatted(horse.end_bid)

        })
        .catch(error => {
          console.error(error);
        });
    },
  },

}
</script>
<style>
.cont-bid {
  display: flex;
  font-family: Arial, Helvetica, sans-serif;
}

.cont-context {
  display: flex;
  flex-direction: column;
  padding-top: 25px;
  width: 100vw;
  min-width: 970px;
}

.cont-horseImg {
  width: 100%;
  height: 300px;
  overflow: hidden;
  background-image: url('../../public/horse_white.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center -150px;

}

.img-horse {
  width: 100%;
  height: auto;
}

/*-- BID DATA --*/

.data-bid {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  font-size: 14px;
  padding-top: 15px;
  padding-bottom: 75px;
}
</style>
