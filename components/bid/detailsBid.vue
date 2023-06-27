<template>
  <div class="cont-detailsBid">
    <div class="details-bid">
      <div class="cont-titleBid">
          <div class="subCont-titleBid">
            <p style="font-size: 30px; font-weight:600">Ofertas</p>
            <p style="color: #667085;">Últimas ofertas</p>
          </div>
          <Winner/>
      </div>
    </div>
    <div class="cont-tableBid">
      <table class="table-bid ">
      </table>
    </div>
  </div>
</template>

<script>
import Winner from '../../components/bid/winner.vue'

export default {
  name: 'Bids',
  components: {
    Winner
  },
  props: {
    bidId: {
      type: String,
      required: true
    },
    horseId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      HorsenName: '',
      BidDate: '',
      BidDateFormat: '',
      PreBidDate: '',
    }
  },
  
  methods: {
    
  }

}
</script>

<style scoped>
.cont-detailsBid {
  padding-left: 25px;
}

.details-bid {
  padding-top: 45px;
}

.cont-titleBid {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.cont-tableBid {
  border-radius: 15px;
  box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.2);
  margin-top: 15px;
  margin-right: 25px;
  margin-bottom: 45px;
  padding: 15px;

}

.table-bid {
  width: 100%;
}


</style>
