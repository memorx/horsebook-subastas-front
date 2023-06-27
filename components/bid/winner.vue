<template lang="">
    <div>
        <div class="winner">
            <p :style="textStyle">{{ winnerBid ? winnerBid : 'Aun nadie subasto por este caballo' }}</p>
            <p id="win-flag" v-if="winnerBid">GANADOR</p>
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
                return 'font-size: 20px; font-weight: 500; color: gray';
            } else {
                return 'font-size: 20px; font-weight: 500';
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
<style>
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
</style>