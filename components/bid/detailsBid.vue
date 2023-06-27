<template>
    <div class="cont-detailsBid">
        <div class="details-bid">
            <div class="cont-titleBid">
                <div class="title-bid">
                    <p style="font-size: 30px; font-weight:600">Ofertas</p>
                    <p style="color: #667085;">Últimas ofertas</p>
                </div>
                <div class="winner">
                    <p style="font-size:20px; font-weight:500 ">Carlos Montes</p>
                    <p id="win-flag">GANADOR</p>
                </div>
            </div>
        </div>
        <div class="cont-tableBid">
            <table class="table-bid " :key="tableKey">
                <thead class="th-tableBid">
                    <th class="columns-8">Nombre</th>
                    <th class="columns-1">Oferta</th>
                    <th class="columns-1">Fecha</th>
                </thead>

                <tr v-for="(bid, index,) in detailsBid" :key="bid.id">
                    <td>{{ bid.user_profile.name
                        + ' ' + bid.user_profile.fathers_surname
                        + ' ' + bid.user_profile.mothers_maiden_name }} </td>
                    <td>${{ formatAmount(bid.amount) }}</td>
                    <td>{{ formatDate(bid.bid_date) }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
//import Loading from '../../../components/shared/Loading.vue';
import JWTDecode from "jwt-decode"
import axios from 'axios'
import moment from 'moment'



export default {
    name: 'Bids',
    components: {
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
            detailsBid: {},
            parameters: {
                subasta_id: '',
                horse_id: '',
            },
            loading: false,
            tableKey: 0,
            test: 3,
        }
    },
    computed: {
        setUser() {
            return this.$store.state.user;
        },
    },
    mounted() {

        setInterval(() => {
            this.getDetailsBid(this.bidId, this.horseID);
        }, 1000);
    },
    watch: {
        horseID(newValue) {
            this.getDetailsBid(this.bidId, newValue);
        },
        statusProps(newValue) {
            if (newValue) {
                this.getDetailsBid(this.bidId, this.horseID);
            }
        },
    },
    methods: {
        formatAmount(amount) {
            return parseFloat(amount).toLocaleString('es-ES');
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
            //this.loading = true
            await axios.get(url, {
                params: this.parameters,
                headers: {
                    Authorization: `Token ${decoded.token}`
                }
            })
                .then(response => {
                    this.detailsBid = response.data
                    this.lastOffer = this.detailsBid[0].amount
                    const formattedLastOffer = parseFloat(this.lastOffer).toLocaleString('es-ES');
                    this.$emit('last-offer-updated', formattedLastOffer);
                    //this.loading = false
                })
                .catch(error => {
                    console.error(error);

                    //this.loading = false
                });
        },
    },

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
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.2);
    margin-top: 15px;
    margin-right: 25px;
    margin-bottom: 45px;
    padding: 15px;
    height: 400px;
    overflow: auto;

}

.table-bid {
    width: 100%;
}

.th-tableBid {
    position: sticky;
    top: 0;
    background-color: black;
    color: white;
    z-index: 1;
}

.table-bid th,
.table-bid td {
    border-bottom: 1px solid #ccc;
    text-align: left;
    padding: 8px;
}
</style>