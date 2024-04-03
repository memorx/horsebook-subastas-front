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
    bids: {}
  },
  mounted() {
    if (this.$props.bids.length > 0) {
      this.$data.winnerBid = this.$props.bids[0].user_profile.name
    }

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
  }

}
</script>
