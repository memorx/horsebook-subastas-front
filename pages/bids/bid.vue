<template>
    <div class="cont-bid">
        <NavBarAuction />
        <div class="cont-context">
            <div class="cont-horseImg">
            </div>
            <div class="data-bid">
                <p style="font-size: 30px; font-weight: 400;">{{HorsenName}}</p>
                <p v-if="isCurrentDate" style="color: green; font-weight: 600; padding-top: 16px;">OFERTA ABIERTA</p>
                <p v-else style="color: red; font-weight: 600; padding-top: 16px;">OFERTA CERRADA</p>
                <div class="preOffer-date">
                    <div v-if="this.statusPreBid" style="color: #667085;">
                        <p id="">Termino de Pre-Oferta:</p>
                        <p id="date" style="font-family: 16px; font-weight: bold;">{{EndPreBidDateFormat}}</p>
                    </div>
                    <div v-else style="color: #667085;">
                        <p id="">Fecha de Pre-Oferta:</p>
                        <p id="date" style="font-family: 16px; font-weight: bold;">{{PreBidDateFormat}}</p>
                    </div>
                </div>
                <div class="offer-date">
                    <div v-if="this.statusBid" style="color: #667085;">
                        <p id="">Termino de subasta:</p>
                        <p id="date" style="font-family: 16px; font-weight: bold;">{{EndBidDateFormat}}</p>
                    </div>
                    <div v-else style="color: #667085;">
                        <p id="">Fecha de subasta:</p>
                        <p id="date" style="font-family: 16px; font-weight: bold;">{{BidDateFormat}}</p>
                </div>
                </div>
                <button class="makeOffer">Hacer una Oferta</button>
            </div>
            <hr>
            <Bids :bidId="bidId" :horseId="horseId"  />
        </div>
    </div>
</template>
<script>

import Bids from '../../components/bid/detailsBid.vue'
import axios from 'axios'
import JWTDecode from "jwt-decode"
import moment from 'moment'

export default {
    components: {
        Bids
  },
  data() {
    return {
        HorsenName:'',
        PreBidDate:'',
        EndPreBidDate:'',
        PreBidDateFormat:'',
        EndPreBidDateFormat:'',
        statusPreBid:false,
        BidDate:'',
        EndBidDate:'',
        BidDateFormat:'',
        EndBidDateFormat:'',
        statusBid:false,
    }
  },
  computed: {
    bidId() {
        return this.$route.query.id;
    },
    horseId(){
        return this.$route.query.horseid;
    },
    isCurrentDate() {
      const CurrentDate = new Date()
      const bidDate = new Date(this.BidDate)
      const endBidDate = new Date(this.EndBidDate)
      const preBidDate= new Date(this.PreBidDate)
      const EndPreBidDate = new Date(this.EndPreBidDate)
      this.statusPreBid= CurrentDate >= preBidDate && CurrentDate <= EndPreBidDate
      this.statusBid= CurrentDate >= bidDate && CurrentDate <= endBidDate
      let statusFinal= this.statusPreBid || this.statusBid
      return statusFinal
    },
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    formatted(date){
        const dateformat = moment(date).format('DD/MM/YYYY')
        return dateformat 
    },
    fetchData() {
        
        const listSubastasEndpoint =`/subastas/list-subastas/?id=${this.bidId}` 
        const url = `${this.$config.baseURL}${listSubastasEndpoint}`
        const decoded = JWTDecode(this.$cookies.get("access_token"))

        axios.get(url,{
            headers: {
                Authorization: `Token ${decoded.token}`
            }
        })
          .then(response => {
            const horse= response.data
            //name
            this.HorsenName=horse.horses[this.horseId].external_data.name

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

.cont-bid{
    display: flex;
    font-family: Arial, Helvetica, sans-serif;
}
.cont-context{
    display: flex;
    flex-direction: column;
    padding-top: 25px;
    width: 100vw;
    min-width: 1200px;
}
.cont-horseImg{
    width: 100%;
    height: 250px;
    overflow: hidden;
    background-image: url('../../public/horse_white.png');
    background-repeat: no-repeat;
    background-size: 1400px 800px;
    background-position: -100px -160px;
}
.img-horse{
    width: 100%;
    height: auto;
}

/*-- BID DATA --*/

.data-bid{
    display: flex;
    flex-direction: row;
    justify-content:space-around;
    font-size: 14px;
    padding-top: 15px;
    padding-bottom: 75px;
}
.makeOffer{
    color: white;
    background-color: black;
    font-size: 14;
    font-weight: 600;
    padding: 10px 16px;
}
.makeOffer:hover{
    background-color: rgb(92, 90, 90);
}

    
</style>