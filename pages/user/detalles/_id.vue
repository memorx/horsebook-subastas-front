<template>
  <div class="bg-zinc-200 py-5 lg:px-20 md:px-3">
    <Loading
      v-if="loading"
      class="fixed w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
    />
    <NuxtLink :to="`/user/inicio/`">
      <button class="bg-gray-500 text-white px-4 py-2 rounded-md mx-3 mb-5">
        Atras
      </button>
    </NuxtLink>
    <div class="flex flex-wrap">
      <!-- First Column -->
      <div class="w-full sm:w-1/2 md:flex md:flex-col">
        <img
          src="../../../public/image_detail_horse.png"
          alt="logo"
          class="hidden md:block w-full max-w-full object-cover rounded-lg md:flex-grow"
        />
      </div>
      <!-- Second Column -->
      <div class="w-full sm:w-1/2 md:flex md:flex-col">
        <!-- First Row in the second column -->
        <div class="mb-4 bg-white p-5 mx-5 rounded-lg">
          <div class="flex items-center">
            <h2 class="text-2xl font-bold mb-1 mr-3">Subasta</h2>
            <statusBid :status="bidStatus" />
          </div>
          <h4 class="text-sm mb-4">🇲🇽 Monterrey, Nuevo Leon</h4>
          <span class="text-xl font-bold mb-2 mr-1">{{
            item.horses.length
          }}</span>
          <span>{{ item.horses.length == 1 ? "Caballo" : "Caballos" }}</span>
        </div>
        <!-- Second Row in the second column -->
        <div class="bg-white p-5 mx-5 rounded-lg md:flex-grow">
          <!-- PREOFERTA -->
          <h1
            v-if="bidStatus == 'COMING'"
            class="text-center text-sm font-bold"
          >
            LA PRE OFERTA COMIENZA EN
          </h1>
          <h1
            v-if="bidStatus == 'PREBID'"
            class="text-center text-sm font-bold"
          >
            LA PRE OFERTA HA COMENZADO,
          </h1>
          <h1
            v-if="bidStatus == 'CLOSED PREBID'"
            class="text-center text-sm font-bold"
          >
            LA PRE OFERTA HA TERMINADO Y
          </h1>
          <div
            v-if="loading == false && countdownPre == true"
            class="flex justify-center"
          >
            <div class="mx-10 my-10">
              <div
                v-if="countdownPre == true || loading == true"
                class="md:flex md:items-center"
              >
                <div class="mx-5">
                  <p class="text-center text-5xl mb-2 font-bold">
                    {{ preBidTime.days }}
                  </p>
                  <p class="text-center text-slate-500">Días</p>
                </div>
                <div class="mx-5">
                  <p class="text-center text-5xl mb-2 font-bold">
                    {{ preBidTime.hours }}
                  </p>
                  <p class="text-center text-slate-500">Horas</p>
                </div>
                <div class="mx-5">
                  <p class="text-center text-5xl mb-2 font-bold">
                    {{ preBidTime.minutes }}
                  </p>
                  <p class="text-center text-slate-500">Minutos</p>
                </div>
                <div class="mx-5">
                  <p class="text-center text-5xl mb-2 font-bold">
                    {{ preBidTime.seconds }}
                  </p>
                  <p class="text-center text-slate-500">Segundos</p>
                </div>
              </div>
            </div>
          </div>
          <!-- SUBASTA -->
          <h1
            v-if="bidStatus == 'CLOSED'"
            class="text-center text-sm font-bold"
          >
            LA SUBASTA HA TERMINADO
          </h1>
          <h1
            v-if="bidStatus != 'BIDDING'"
            class="text-center text-sm font-bold"
          >
            LA SUBASTA ESTARA EN VIVO EN
          </h1>
          <h1
            v-if="bidStatus == 'BIDDING'"
            class="text-center text-sm font-bold"
          >
            LA SUBASTA ESTA EN VIVO
          </h1>
          <div
            v-if="loading == false && countdownSubasta == true"
            class="flex justify-center"
          >
            <div class="mx-10 md:mx-0 my-10">
              <div
                v-if="countdownSubasta == true || loading == true"
                class="md:flex md:items-center"
              >
                <div class="mx-5">
                  <p class="text-center text-5xl mb-2 font-bold">
                    {{ bidTime.days }}
                  </p>
                  <p class="text-center text-slate-500">Días</p>
                </div>
                <div class="mx-5">
                  <p class="text-center text-5xl mb-2 font-bold">
                    {{ bidTime.hours }}
                  </p>
                  <p class="text-center text-slate-500">Horas</p>
                </div>
                <div class="mx-5">
                  <p class="text-center text-5xl mb-2 font-bold">
                    {{ bidTime.minutes }}
                  </p>
                  <p class="text-center text-slate-500">Minutos</p>
                </div>
                <div class="mx-5">
                  <p class="text-center text-5xl mb-2 font-bold">
                    {{ bidTime.seconds }}
                  </p>
                  <p class="text-center text-slate-500">Segundos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center md:text-left">
      <h1 class="text-4xl font-semibold my-6">Caballos a subastar</h1>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4"
      >
        <div
          class="mx-5 md:mx-0 bg-white rounded-lg shadow-md"
          v-for="(horse, index) in item.horses"
          :key="horse.id"
        >
          <NuxtLink
            class="buttonDetails"
            :to="`/bids/bid?id=${id}&horsePositionList=${index}&horseId=${horse.local_data.id}`"
          >
            <div class="px-1 py-1">
              <horseStatus
                :status="horse.local_data.status"
                :bid-status="bidStatus"
              />
            </div>
            <img
              v-if="getImageUrl(horse.local_data.horse_id)"
              :src="getImageUrl(horse.local_data.horse_id)"
              class="w-full object-cover"
              style="height: 40vh"
            />
            <div
              class="bg-gray-200 h-[40vh] flex justify-center items-center"
              v-else
            >
              <img
                class="m-auto opacity-70"
                src="../../../public/image_la_silla.png"
                alt="Default Horse"
              />
            </div>

            <p class="text-xl font-bold my-2 mx-6">
              {{ horse.external_data.name }}
            </p>
            <p class="text-md font-medium mx-6 text-gray-500">
              Lote {{ horse.local_data.lot }}
            </p>
            <div class="border-b border-gray-300 my-4 mx-5"></div>
            <p
              v-if="
                amountStringToInt(
                  horse.local_data.initial_pre_bid_amount,
                  horse.local_data.final_amount
                )
              "
              class="text-sm font-bold text-center my-2 mx-3"
            >
              Mejor Oferta
            </p>
            <p v-else class="text-sm font-bold text-center my-2 mx-3">
              Precio Inicial
            </p>
            <p class="text-lg font-bold text-center mt-2 mb-3 mx-3">
              $ {{ horse.local_data.final_amount }} USD
            </p>
            <div class="flex justify-center">
              <button
                class="bg-black rounded-lg px-4 py-2 text-white text-center mb-3 hover:bg-gray-800"
              >
                Ingresar
              </button>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import Loading from "../../../components/shared/Loading.vue"
import statusBid from "../../../components/bid/statusBid.vue"
import horseStatus from "../../../components/bid/horseStatus.vue"

export default {
  components: { Loading, statusBid, horseStatus },
  data() {
    return {
      bidTime: {
        days: "",
        hours: "",
        minutes: "",
        seconds: ""
      },
      preBidTime: {
        days: "",
        hours: "",
        minutes: "",
        seconds: ""
      },
      item: {
        horses: "",
        start_bid: "",
        start_pre_bid: ""
      },
      horseData: {
        imagesObject: {},
        imagesID: []
      },
      id: "",
      loading: false,
      countdownSubasta: true,
      countdownPre: true,
      bidStatus: ""
    }
  },
  async created() {
    const itemId = this.$route.params.id
    this.id = itemId
    await this.getDetailsAuction(itemId)
  },
  mounted() {
    // Update the countdown every second
  },
  beforeDestroy() {
    // Clear the timer when the component is destroyed
    clearInterval(this.timer)
    clearInterval(this.timer2)
  },
  methods: {
    amountStringToInt(initial, final) {
      if (parseInt(final, 10) > parseInt(initial, 10)) {
        return true
      } else {
        return false
      }
    },
    getImageUrl(horseID) {
      return this.horseData.imagesObject[horseID]
    },
    fetchHorseImages(horseID) {
      if (!horseID) {
        return // Exit early if horseID is not defined
      }
      axios
        .get(this.$config.baseLaSilla + `/horses/${horseID}/images`)
        .then((response) => {
          // Check if there are images in the response
          if (Array.isArray(response.data) && response.data.length > 0) {
            const imageUrl = response.data[0].url
            this.$set(this.horseData.imagesObject, horseID, imageUrl)
          } else {
            console.warn("No images found in the response for horse: ", horseID)
          }
        })
        .catch((error) => {
          console.error(error)
        })
    },

    fetchImagesForAllHorses() {
      this.horseData.imagesID.forEach((horseID) => {
        this.fetchHorseImages(horseID)
      })
    },
    calculateCountdown() {
      const now = new Date()
      const targetDate = new Date(this.item.start_bid)
      const timeDifference = targetDate - now

      if (timeDifference <= 0) {
        this.countdownSubasta = false
        clearInterval(this.timer)
      } else {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
        const hours = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        )
        const minutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        )
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)
        this.bidTime.days = days
        this.bidTime.hours = hours
        this.bidTime.minutes = minutes
        this.bidTime.seconds = seconds
      }
    },
    calculateCountdownPre() {
      const now = new Date()
      const targetDate = new Date(this.item.start_pre_bid)
      const timeDifference = targetDate - now

      if (timeDifference <= 0) {
        this.countdownPre = false
        clearInterval(this.timer2)
      } else {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
        const hours = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        )
        const minutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        )
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)
        this.preBidTime.days = days
        this.preBidTime.hours = hours
        this.preBidTime.minutes = minutes
        this.preBidTime.seconds = seconds
      }
    },
    async getDetailsAuction(itemId) {
      const url = this.$config.baseURL + `/subastas/list-subastas/?id=${itemId}`
      this.loading = true

      await this.$axios
        .get(url)
        .then((response) => {
          this.item.start_bid = response.data.start_bid
          this.item.start_pre_bid = response.data.start_pre_bid
          this.item.horses = response.data.horses
          this.bidStatus = response.data.status
          console.log(this.bidStatus)
          this.horseData.imagesID = response.data.horses.map(
            (horse) => horse.local_data.horse_id
          )
          this.fetchImagesForAllHorses()
          this.loading = false
          this.calculateCountdown()
          this.calculateCountdownPre()
          this.timer = setInterval(this.calculateCountdown, 1000)
          this.timer2 = setInterval(this.calculateCountdownPre, 1000)
        })
        .catch((error) => {
          console.log(error)
          this.loading = false
        })
    },
    showHorseDetails(horse) {
      this.$set(horse, "showDetails", !horse.showDetails)
    }
  }
}
</script>
