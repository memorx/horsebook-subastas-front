<template lang="">
    <div>
      <div class="">
        <p id="win-flag" v-if="winnerBid" :style="textStyle">Por {{ winnerBid ? winnerBid : 'Aun nadie subasto por este caballo' }} </p>
      </div>
    </div>
</template>
<script>
import axios from 'axios'
import JWTDecode from "jwt-decode"
export default {
  name: 'Winner',
  data() {
    return {
      winnerBid: "",
    }
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
  },
  mounted() {

    setInterval(() => {
      this.fetchWinner();
    }, 1000);
  },
  computed: {
    textStyle() {
      if (!this.winnerBid) {
        return 'font-size: 20px; font-weight: 300; color: gray';
      } else {
        return 'font-size: 15px; font-weight: 300';
      }
    },
  },
  methods: {

    fetchWinner() {
      const subastasEndpointWin = `/subastas/prebid-winner/?subasta_id=${this.bidId}&horse_id=${this.horseID}&pre_bid="True"`
      const urlWinner = `${this.$config.baseURL}${subastasEndpointWin}`
      const decoded = JWTDecode(this.$cookies.get("access_token"))
      axios.get(urlWinner, {
        headers: {
          Authorization: `Token ${decoded.token}`
        }
      })
        .then(response => {
          const winner = response.data
          this.winnerBid = winner.user_profile.name
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

}
</script>
