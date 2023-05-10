<template>
  <div class="container">
    <div class="sideBar bg-gray-200 border-r border-gray-300">
      <Loading v-if="loading"
        class="fixed w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50" />
      <div class="content">
        <div class="nav">
          <div class="frame1">
            <img src="../../../public/image_la_silla.png" alt="logo" width="90" height="92">
          </div>
          <div class="navigation">
            <div class="navItemBase bg-gray-800 rounded-lg">
              <div class="contentt flex items-center gap-2">
                <div class="gavel w-5 h-5"></div>
                <p class="font-montserrat font-medium text-base text-white">Tus subastas</p>
              </div>
            </div>
            <div class="framee1">
              <div class="divider"></div>
            </div>

            <div class="navItemBasee">
              <div class="contenttt flex items-center gap-2">
                <div class="description"></div>
                <p class="font-montserrat font-medium text-base leading-6 text-gray-900">Tus datos</p>
              </div>
            </div>
          </div>
        </div>
        <div class="footer"></div>
      </div>
    </div>
    <div class="main">
      <div class="breadcumbs">
        <p class="textBreadcumbs">Tus subastas / Subasta {{ item.id }} </p>
      </div>
      <div class="main2">
        <img src="../../../public/image_detail_horse.png" width="100%" height="100%">
        <div class="title">
          <p class="styleTitle">Subasta</p>
          <p class="datesAuction">Fecha de pre-oferta: {{ new Date(item.start_pre_bid).toLocaleString() }}</p>
          <p class="datesAuction">Fecha de subasta: {{ new Date(item.start_pre_bid).toLocaleString() }}</p>
          <!-- <p class="dateAuction">DD/MM/YY</p>
                                                                                                                                                                                                                                                                                                    <p class="dateAuction">DD/MM/YY</p> -->

        </div>
        <!-- <div class="dividerr"></div> -->
        <div class="auctions">
          <li class="li" v-for="horse in item.horses" :key="horse.id">
            <img src="../../../public/horse_example.png">
            <p class="nameHorse">{{ horse.external_data.alt_name }}</p>
            <p class="prizeHorse">Precio inicial: {{ horse.local_data.initial_pre_bid_amount }} USD</p>
            <!-- <button class="buttonDetails" v-on:click="showHorseDetails(horse)"> -->
            <button class="buttonDetails">
              <NuxtLink to="../detalleCaballo">
                <p class="seeDetails">Ver detalles</p>
              </NuxtLink>
            </button>
            <div v-if="horse.showDetails">
              <p>Details: {{ horse.external_data.alt_name }}</p>
              <!-- Add more details here -->
            </div>
          </li>
        </div>
      </div>
    </div>
  </div>
</template>
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

  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;

  width: 280px;
  height: 70vh;

  /* Gray/50 */

  background: #F9FAFB;
  /* Gray/200 */

  border-right: 1px solid #EAECF0;

  /* Inside auto layout */

  /* flex: none;
  order: 0;
  flex-grow: 0; */
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0px;

  width: 280px;
  height: 822px;


  /* Inside auto layout */

  /* flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 1 */
}

.nav {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 32px 0px 0px;
  gap: 84px;

  width: 280px;
  height: 505px;


  /* Inside auto layout */

  /* flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0; */
}

.frame1 {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px 20px;
  gap: 8px;

  width: 280px;
  height: 92px;


  /* Inside auto layout */
  /*
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0; */
}

.logo {
  width: 90px;
  height: 92px;

  /* background: url(logo.png); */

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
}

.search {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 24px;

  display: none;
  width: 279px;
  height: 44px;


  /* Inside auto layout */

  flex: none;
  order: 1;
  flex-grow: 0;
}

.navigation {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 16px;
  gap: 16px;

  width: 280px;
  height: 297px;


  /* Inside auto layout */

  flex: none;
  order: 2;
  align-self: stretch;
  flex-grow: 0;
}

.navItemBase {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  gap: 8px;

  width: 248px;
  height: 48px;

  background: #141313;
  border-radius: 10px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
}

.contentt {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 12px;

  width: 224px;
  height: 24px;


  /* Inside auto layout */

  /* flex: none;
  order: 0;
  flex-grow: 1; */
}

.gavel {
  width: 20px;
  height: 20px;


  /* Inside auto layout */

  /* flex: none;
  order: 1;
  flex-grow: 0; */

}

.text {
  width: 104px;
  height: 24px;

  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  /* identical to box height, or 150% */


  color: #FFFFFF;


  /* Inside auto layout */

  /* flex: none;
  order: 2;
  flex-grow: 0; */
}

.framee1 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px 0px 0px;
  gap: 8px;

  width: 248px;
  height: 9px;


  /* Inside auto layout */
  /*
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0; */
}

.divider {
  width: 248px;
  height: 1px;

  /* Gray/200 */

  background: #EAECF0;

  /* Inside auto layout */

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
}

.navItemBasee {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  gap: 8px;

  width: 248px;
  height: 40px;

  border-radius: 6px;

  /* Inside auto layout */

  /* flex: none;
  order: 2;
  align-self: stretch;
  flex-grow: 0; */
}

.contenttt {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 12px;

  width: 224px;
  height: 24px;


  /* Inside auto layout */

  /* flex: none;
  order: 0;
  flex-grow: 1; */
}

.description {
  width: 24px;
  height: 24px;


  /* Inside auto layout */

  /* flex: none;
  order: 1;
  flex-grow: 0; */
}

.textt {
  width: 24px;
  height: 24px;


  /* Inside auto layout */

  /* flex: none;
  order: 1;
  flex-grow: 0; */
}

.footer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 16px 32px;
  gap: 24px;

  width: 280px;
  height: 72px;


  /* Inside auto layout */

  /* flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0; */
}

.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 0px 48px;
  gap: 48px;

  /* width: 100%;
  height: 100%; */
  /* overflow-y: scroll; */

  background: #FCFCFD;

  /* Inside auto layout */
  /*
  flex: none;
  order: 1;
  flex-grow: 1; */
}

.breadcumbs {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 32px;
  gap: 12px;

  width: 100%;
  height: 100%;


  /* Inside auto layout */
  /*
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0; */
}

.breadcumbsTitle {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;

  /* width: 90px;
height: 20px; */


  /* Inside auto layout */

  /* flex: none;
order: 0;
flex-grow: 0; */
}

.textBreadcumbs {

  /* width: 90px; */
  /* height: 20px; */

  font-family: 'Montserrat' "sans-serif";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  /* identical to box height, or 143% */


  /* Gray/600 */

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


  /* Inside auto layout */

  /* flex: none;
  order: 8;
  flex-grow: 0; */
}

.main2 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 0px 48px;
  gap: 48px;

  /* width: 100vh;
  height: 100vh; */

  /* Gray/25 */

  background: #FCFCFD;

  /* Inside auto layout */

  /* flex: none;
order: 1;
align-self: stretch;
flex-grow: 0; */
}

.title {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;

  /* width: 1096px;
  height: 52px; */

}

.styleTitle {
  width: 632px;
  height: 38px;
  padding-left: 20px;
  font-family: 'Montserrat' "sans-serif";
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  line-height: 38px;
  /* identical to box height, or 127% */


  /* Gray/900 */

  color: #101828;
}

.datesAuction {
  width: 197px;
  height: 20px;

  font-family: 'Montserrat' "sans-serif";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  /* identical to box height, or 143% */


  /* Gray/500 */

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
  /* identical to box height, or 150% */


  /* Gray/700 */

  color: #344054;


  /* Inside auto layout */

  /* flex: none;
  order: 0;
  flex-grow: 0; */
}

.dividerr {
  width: 1096px;
  height: 1px;

  /* Gray/200 */

  background: #EAECF0;

  /* Inside auto layout */

  /* flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0; */
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
  font-family: 'Montserrat' "sans-serif";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  /* identical to box height, or 150% */


  /* Gray/900 */

  color: #101828;
}

.prizeHorse {
  margin-top: 5px;
  padding-left: 10px;
  font-family: 'Montserrat' "sans-serif";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  /* identical to box height, or 156% */


  /* Gray/900 */

  color: #101828;
}

.buttonDetails {
  box-sizing: border-box;

  /* Auto layout */
  margin-top: 30px;
  /* margin-left: 17px; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 16px;
  gap: 8px;

  width: 322.67px;
  height: 40px;

  background: #171618;
  /* Shadow/xs */

  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);

}

.seeDetails {
  font-family: 'Montserrat' "sans-serif";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  /* identical to box height, or 125% */


  /* Base/White */

  color: #FFFFFF;

}
</style>

<script>
import goToDetails from '@/pages/user/inicioo.vue';
import jwt_decode from 'jwt-decode';
import Loading from '../../../components/shared/Loading.vue';
import moment from 'moment';

export default {
  components: { Loading },
  data() {
    return {
      item: {},
      loading: false,
      moment: moment
    }
  },
  async created() {
    const itemId = this.$route.params.id
    await this.getDetailsAuction(itemId)
    console.log(itemId)
  },
  methods: {

    async getDetailsAuction(itemId) {
      const url = this.$config.baseURL + `/subastas/list-subastas/?id=${itemId}`
      const decoded = jwt_decode(this.$cookies.get("access_token"))
      console.log(decoded, "decoded")
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
