<template>
  <div class="container">
    <div class="sideBar bg-gray-200 border-r border-gray-300">
      <Loading v-if="loading"
        class="fixed w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50" />
      <NavBarAuction />
    </div>
    <div class="main">
      <div class="breadcumbs">
        <p class="textBreadcumbs font-montserrat">Tus subastas / Subasta {{ item.id }} </p>
      </div>
      <div class="main2">
        <img src="../../../public/image_detail_horse.png" width="100%" height="100%">
        <div class="title">
          <p class="styleTitle font-montserrat">Subasta</p>
          <p class="datesAuction font-montserrat">Fecha de pre-oferta: {{ new Date(item.start_pre_bid).toLocaleString() }}
          </p>
          <p class="datesAuction font-montserrat">Fecha de subasta: {{ new Date(item.start_bid).toLocaleString() }}
          </p>
          <!-- <p class="dateAuction">DD/MM/YY</p>
                                                                                                                                                                                                                                                                                                    <p class="dateAuction">DD/MM/YY</p> -->

        </div>
        <!-- <div class="dividerr"></div> -->
        <div class="auctions">
          <li class="li" v-for="(horse, index,) in item.horses" :key="horse.id">
            <img src="../../../public/horse_example.png">
            <p class="nameHorse font-montserrat">{{ horse.external_data.name }}</p>
            <p class="prizeHorse font-montserrat">Precio inicial: {{ horse.local_data.initial_pre_bid_amount }} USD</p>
            <!-- <button class="buttonDetails" v-on:click="showHorseDetails(horse)"> -->
            <NuxtLink class="buttonDetails" :to="`/bids/bid?id=${id}&horsePositionList=${index}`">
              <p class="seeDetails font-montserrat">Ver detalles </p>
            </NuxtLink>
            <div v-if="horse.showDetails">
              <p class="font-montserrat">Detalles: {{ horse.external_data.alt_name }}</p>
              <!-- Add more details here -->
            </div>
          </li>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import goToDetails from '@/pages/user/inicio.vue';
import jwt_decode from 'jwt-decode';
import Loading from '../../../components/shared/Loading.vue';
import moment from 'moment';
import NavBarAuction from "../../../components/NavBar/NavBarAuction.vue"

export default {
  components: { Loading, NavBarAuction },
  data() {
    return {
      item: {},
      id: '',
      loading: false,
      moment: moment
    }
  },
  async created() {
    const itemId = this.$route.params.id
    this.id = itemId
    await this.getDetailsAuction(itemId)
    console.log(itemId)
  },
  methods: {
    async getDetailsAuction(itemId) {
      const url = this.$config.baseURL + `/subastas/list-subastas/?id=${itemId}`
      const decoded = jwt_decode(this.$cookies.get("access_token"))
      console.log(decoded, "decoded")
      console.log(this.$store.state.user, "ESTADO DETALLE/ID")
      let headers = {}
      if (decoded) {
        headers = {
          Authorization: `Token ${decoded.token}`,
        };
        this.loading = true
      }
      await this.$axios
        .get(url, { headers })
        .then((response) => {
          console.log(response.data, "RESPONSE.DATA")
          this.item = response.data
          this.loading = false
        })
        .catch((error) => {
          console.log(error)
          this.loading = false
        })
    },
    showHorseDetails(horse) {
      console.log("showHorseDetails method called");
      console.log(horse.external_data.alt_name);
      this.$set(horse, 'showDetails', !horse.showDetails);
    }
  }
}
</script>

<style>
.container {
  display: flex;
  padding: 0px;
  width: 100%;
  height: 100%
}

.dashboard {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  position: absolute;
  width: 1440px;
  height: 2538px;
  left: 0px;
  top: 78px;
  background: #FCFCFD;
}

.sideBar {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  width: 280px;
  height: 70vh;
  background: #F9FAFB;
  border-right: 1px solid #EAECF0;
}

.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 0px 48px;
  gap: 48px;
  background: #FCFCFD;
}

.breadcumbs {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 32px;
  gap: 12px;
  width: 100%;
  height: 100%;
}

.breadcumbsTitle {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
}

.textBreadcumbs {

  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #475467;
}

.breadcumbsText {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  width: 67px;
  height: 20px;
}

.main2 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 0px 48px;
  gap: 48px;
  background: #FCFCFD;
}

.title {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;
}

.styleTitle {
  width: 632px;
  height: 38px;
  padding-left: 20px;
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  line-height: 38px;
  color: #101828;
}

.datesAuction {
  width: 197px;
  height: 20px;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #667085;
}

.dateAuction {
  width: 90px;
  height: 2px;
  padding-top: 100px;
  padding-right: 30%;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #344054;
}

.dividerr {
  width: 1096px;
  height: 1px;
  background: #EAECF0;
}

.auctions {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.li {
  flex-basis: calc(33.33% - 10px);
  margin-bottom: 20px;
}

.nameHorse {
  margin-top: 5px;
  padding-left: 10px;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  color: #101828;
}

.prizeHorse {
  margin-top: 5px;
  padding-left: 10px;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  color: #101828;
}

.buttonDetails {
  box-sizing: border-box;
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 16px;
  gap: 8px;
  width: 322.67px;
  height: 40px;
  background: #171618;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);

}

.seeDetails {
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #FFFFFF;
}
</style>

