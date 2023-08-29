<template>
  <div class="bg-zinc-200 py-5 px-20">
    <Loading
      v-if="loading"
      class="fixed w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
    />
    <div class="flex">
      <!-- First Column -->
      <div class="w-1/2">
        <img
          src="../../../public/image_detail_horse.png"
          alt="logo"
          class="w-full object-cover rounded-lg"
          style="height: 500px;"
        />
      </div>

      <!-- Second Column -->
      <div class="w-1/2">
        <!-- First Row in the second column -->
        <div class="mb-4 bg-white p-5 mx-5 rounded-lg">
          <h2 class="text-2xl font-bold mb-1">Subasta la Silla</h2>
          <h4 class="text-sm mb-4">🇲🇽 Monterrey, Nuevo Leon</h4>
          <span class="text-xl font-bold mb-2 mr-1">4</span>
          <span>Caballos</span>
        </div>

        <!-- Second Row in the second column -->
        <div class="mb-4 bg-white p-5 mx-5 rounded-lg">
          <h1 class="text-center text-sm font-bold mb-5">LA PRE OFERTA COMIENZA EN</h1>
          <div class="flex justify-center">
            <div class="mx-10">
              <p class="text-center text-5xl mb-2 font-bold">{{ preBidTime.days }}</p>
              <p class="text-center text-slate-500">Days</p>
            </div>
            <div class="mx-10">
              <p class="text-center text-5xl mb-2 font-bold">{{ preBidTime.hours }}</p>
              <p class="text-center text-slate-500">Hours</p>
            </div>
            <div class="mx-10">
              <p class="text-center text-5xl mb-2 font-bold">{{ preBidTime.minutes }}</p>
              <p class="text-center text-slate-500">Minutes</p>
            </div>
            <div class="mx-10">
              <p class="text-center text-5xl mb-2 font-bold">{{ preBidTime.seconds }}</p>
              <p class="text-center text-slate-500">Seconds</p>
            </div>
          </div>
          <br>
          <h1 class="text-center text-sm font-bold mb-5">LA SUBASTA EN VIVO COMIENZA EN</h1>
          <div class="flex justify-center">
            <div class="mx-10">
              <p class="text-center text-5xl mb-2 font-bold">{{ bidTime.days }}</p>
              <p class="text-center text-slate-500">Days</p>
            </div>
            <div class="mx-10">
              <p class="text-center text-5xl mb-2 font-bold">{{ bidTime.hours }}</p>
              <p class="text-center text-slate-500">Hours</p>
            </div>
            <div class="mx-10">
              <p class="text-center text-5xl mb-2 font-bold">{{ bidTime.minutes }}</p>
              <p class="text-center text-slate-500">Minutes</p>
            </div>
            <div class="mx-10">
              <p class="text-center text-5xl mb-2 font-bold">{{ bidTime.seconds }}</p>
              <p class="text-center text-slate-500">Seconds</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h1 class="text-4xl font-semibold my-6">Caballos a subastar</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        <!-- Repeat this section for each list item (horse) -->
        <div
          class="bg-white rounded-lg shadow-md"
          v-for="(horse, index) in item.horses"
          :key="horse.id"
        >
          <NuxtLink
            class="buttonDetails"
            :to="`/bids/bid?id=${id}&horsePositionList=${index}`"
          >
            <img
              src="../../../public/horse_example.png"
              class="w-full object-cover rounded-t-lg"
              style="height: 300px;"
            >
            <p class="text-sm  my-4 mx-6 text-slate-500">Canatra x Laval</p>
            <p class="text-xl font-bold my-2 mx-6">{{ horse.external_data.name }}</p>
            <p class="text-sm  my-2 mx-6 text-slate-500">2018</p>
            <div class="border-b border-gray-300 my-4 mx-5"></div>
            <p class="text-sm font-bold text-center my-2 mx-3">Precio inicial</p>
            <p class="text-lg font-bold text-center mt-2 mb-3 mx-3">$ {{ horse.local_data.initial_pre_bid_amount ?
              horse.local_data.initial_pre_bid_amount : '15,000' }} USD</p>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import jwt_decode from 'jwt-decode';
import Loading from '../../../components/shared/Loading.vue';
import NavBarAuction from "../../../components/NavBar/NavBarAuction.vue"

export default {
  components: { Loading, NavBarAuction },
  data() {
    return {
      bidTime: {
        days: '',
        hours: '',
        minutes: '',
        seconds: '',
      },
      preBidTime: {
        days: '',
        hours: '',
        minutes: '',
        seconds: '',
      },
      item: {
        horses: '',
        start_bid: '',
        start_pre_bid: '',
      },
      id: '',
      loading: false,
      countdownSubasta: 'Calculando cuenta regresiva...',
      countdownPre: 'Calculando cuenta regresiva...',
    }
  },
  async created() {
    const itemId = this.$route.params.id
    this.id = itemId
    await this.getDetailsAuction(itemId)
    console.log(itemId)
  },
  mounted() {
    // Update the countdown every second
    this.timer = setInterval(this.calculateCountdown, 1000);
    this.timer2 = setInterval(this.calculateCountdownPre, 1000);
  },
  beforeDestroy() {
    // Clear the timer when the component is destroyed
    clearInterval(this.timer);
    clearInterval(this.timer2);
  },
  methods: {
    calculateCountdown() {
      const now = new Date();
      const targetDate = new Date(this.item.start_bid);
      const timeDifference = targetDate - now;

      if (timeDifference <= 0) {
        this.countdownSubasta = 'La Subasta ha terminado';
        clearInterval(this.timer);
      } else {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        this.bidTime.days = days
        this.bidTime.hours = hours
        this.bidTime.minutes = minutes
        this.bidTime.seconds = seconds
      }
    },
    calculateCountdownPre() {
      const now = new Date();
      const targetDate = new Date(this.item.start_pre_bid);
      const timeDifference = targetDate - now;

      if (timeDifference <= 0) {
        this.countdownPre = 'La Pre Oferta ha terminado';
        clearInterval(this.timer2);
      } else {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        this.preBidTime.days = days
        this.preBidTime.hours = hours
        this.preBidTime.minutes = minutes
        this.preBidTime.seconds = seconds
      }
    },
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
        this.$store.commit('authenticate', true);
      }
      await this.$axios
        .get(url, { headers })
        .then((response) => {
          console.log(response.data, "RESPONSE.DATA")
          this.item.start_bid = response.data.start_bid
          this.item.start_pre_bid = response.data.start_pre_bid
          this.item.horses = response.data.horses
          this.calculateCountdown()
          this.calculateCountdownPre()
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