<template>
  <div>
    <Loading
        v-if="loading"
        class="fixed w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
      />
    <div v-if="bidStatus == 'BIDDING' && loading == false" class="bg-zinc-200 py-5 lg:px-5 md:px-3">
      <modal
        v-show="showModal"
        :amount="manualInputAmount ? manualInputAmount : inputAmount"
        :submitForm="submitForm"
        :disableModal="disableModal"
        :status="horseStatus"
      />

      <NuxtLink :to="`/`">
        <button class="bg-gray-500 text-white px-4 py-2 rounded-md mx-3 mb-5">
          ← Inicio
        </button>
      </NuxtLink>
      <div class="flex flex-wrap">
        <!-- First Column -->
        <div class="w-full sm:w-1/2 md:flex md:flex-col">
          <div v-if="videoUrl" class="w-full md:flex md:flex-col">
            <div class="mb-4 sm:mb-0 p-0 mx-5 pb-5">
            <iframe
              class="aspect-content rounded-lg h-96 w-full"
              :src="`https://www.youtube.com/embed/${extractYouTubeId(videoUrl)}`"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
            </div>
            <transition name="fade">
              <div v-if="horseID" class="fade">
                <div class="mb-4 sm:mb-0 p-0 mx-5 flex flex-col">
                  <h2 class="text-xl font-bold">
                    Galería de: {{ HorsenName }}
                  </h2>
                  <div>
                    <div class="w-full">
                      <Carousel :images="horseData.images" />
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>

        </div>
        <!-- Second Column -->
        <div class="w-full sm:w-1/2 md:flex md:flex-col">
          <!-- First Row in the second column -->
          <div class="mb-4 bg-white p-5 mx-5 rounded-lg">
            <div class="flex items-center">
              <h2 class="text-2xl font-bold mb-1 mr-3">Subasta</h2>
              <statusBid :status="bidStatus" />
            </div>
            <h4 class="text-sm mb-4">
              🇲🇽 Monterrey, Nuevo Leon
              <span class="text-xl font-bold mb-2 mr-1 ml-4">{{
                item.horses.length
              }}</span>
              <span>{{ item.horses.length == 1 ? "Caballo" : "Caballos" }}</span>
            </h4>
            <transition name="fade">
              <div v-if="horseID" class="fade text-lg font-bold flex flex-col md:flex-row">
                Caballo en subasta: <span class="text-2xl text-red-500">{{ HorsenName }}</span>
              </div>
            </transition>
          </div>
          <!-- Second Row in the second column -->
          <div class="bg-white mx-5 rounded-lg md:flex-grow">
            <transition name="fade">
              <div v-if="!horseID" class="fade p-8">
                  <h2 v-if="yourAreTheWinner" class="font-bold text-4xl mx-auto text-center text-green-700 pb-6">
                      FELICIDADES HAS GANADO LA SUBASTA DE <span class="text-black"> {{ wonHorse }} </span> POR ${{ lastOffer }} USD
                  </h2>
                  <h2 v-if="!yourAreTheWinner && horseStatus == 'CLOSED'" class="font-bold text-4xl mx-auto text-center text-red-700 pb-6">
                    <span class="text-black">{{ winnerName }} </span> HA GANADO LA SUBASTA DE <span class="text-black"> {{ wonHorse }} </span> POR ${{ lastOffer }} USD
                  </h2>
                  <h2 class="font-bold text-3xl mx-auto text-center text-yellow-600">
                      QUÉDATE CON NOSOTROS SEGUIMOS CON LA SUBASTA EN VIVO
                  </h2>
              </div>


              <div v-else class="w-full flex-col mt-4 md:mt-0 bg-white rounded-lg">
                <div
                  class="text-center w-full rounded-t-lg p-5"
                  style="background-color: #b99d61"
                >
                  <p class="text-white font-bold text-sm">OFERTA MÁS ALTA</p>
                  <span v-if="lastOffer" class="text-white font-bold text-2xl"
                    >${{ lastOffer }} USD</span
                  >
                  <span v-else class="text-white font-bold text-2xl"
                    >SE EL PRIMERO EN OFERTAR</span
                  >
                </div>
                <div class="px-5 mt-5">
                  <p class="text-sm font-bold">OFERTAR POR ESTE LOTE</p>
                  <form @submit="submitForm">
                    <div class="flex items-center space-x-2 mb-5">
                      <button
                        class="px-4 py-2 rounded-md hover:bg-gray-300 duration-100 border-1 border-gray-600"
                        type="button"
                        @click="substractThousand"
                      >
                        -
                      </button>
                      <p
                        @click="showManualInputAmount()"
                        v-show="!showInput"
                        class="border border-black rounded-md flex-grow w-1/4 h-10 flex items-center justify-center"
                      >
                        {{ inputAmount }}
                      </p>
                      <input
                        ref="manualInputAmount"
                        v-show="showInput"
                        name="amountInput"
                        type="number"
                        v-model="manualInputAmount"
                        @blur="assignManualInputAmount()"
                        class="border rounded-md flex-grow w-1/4"
                      />
                      <button
                        class="px-4 py-2 rounded-md hover:bg-gray-300 duration-100 border-1 border-gray-600"
                        type="button"
                        @click="addThousand"
                      >
                        +
                      </button>

                      <div class="hidden lg:block">
                        <SubmitAuthenticatedButton
                          :enable-modal="enableModal"
                          button-text="Ofertar"
                        />
                      </div>
                    </div>
                    <div class="lg:hidden text-center mt-5 w-full">
                      <SubmitAuthenticatedButton
                        :enable-modal="enableModal"
                        button-text="Ofertar"
                      />
                    </div>
                  </form>
                  <div>
                    <div
                      v-if="successMessage"
                      class="bg-green-100 text-green-800 p-4 my-4 rounded-lg shadow-md"
                    >
                      {{ successMessage }}
                    </div>
                    <div
                      v-if="errorMessage"
                      class="bg-red-100 text-red-800 p-4 my-4 rounded-lg shadow-md"
                    >
                      {{ errorMessage }}
                    </div>
                  </div>
                </div>
                <div v-if="bids.length > 0">
                  <div class="mx-5">
                    <div class="border-b border-gray-300 my-4"></div>
                    <p class="text-sm font-bold">OFERTAS</p>
                  </div>
                  <div class="px-4" style="flex: 5">
                    <Bids
                      ref="detailsBid"
                      :bidId="bidId"
                      :horseID="horseID"
                      :bids="this.bids"
                      :hasBid="this.hasBid"
                    />
                  </div>
                </div>
              </div>
            </transition>
  <!-- TERMINA-->
          </div>
        </div>
      </div>
      <transition name="fade">
        <div v-if="horseID" class="fade flex flex-col">
          <div class="mt-4 bg-white p-5 mx-5 rounded-lg">
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div class="mr-4">
                <span class="font-bold text-gray-700">Fecha de nacimiento:</span>
                <span class="text-gray-600">{{ horseData.birthDate || "NA" }}</span>
              </div>
              <div class="mr-4">
                <span class="font-bold text-gray-700">Edad:</span>
                <span class="text-gray-600">{{ horseData.Age || "NA" }}</span>
                <span class="text-gray-600">años</span>
              </div>

              <div class="mr-4">
                <span class="font-bold text-gray-700">No. Registro:</span>
                <span class="text-gray-600">{{
                  horseData.registerNumber || "NA"
                }}</span>
              </div>
              <div class="mr-4">
                <span class="font-bold text-gray-700">Alzada:</span>
                <span class="text-gray-600">{{ horseData.Height || "NA" }}</span>
                <span class="text-gray-600">m</span>
              </div>
              <div class="mr-4">
                <span class="font-bold text-gray-700">Genero:</span>
                <span class="text-gray-600">{{ horseData.Genre || "NA" }}</span>
              </div>
              <div class="mr-4">
                <span class="font-bold text-gray-700">Criadero:</span>
                <span class="text-gray-600">{{ horseData.Hatchery || "NA" }}</span>
              </div>
            </div>
          </div>
          <div class="mt-4 bg-white p-5 mx-5 rounded-lg">
            <div class="mb-4">
              <span class="text-2xl font-bold">Pedigree</span>
            </div>
            <Pedigree :link="horseData.Pedigree" />
            <p v-if="horseData.horseTelex">
              Revisa los datos en
              <a class="text-blue-400" :href="horseData.horseTelex" target="_blank"
                >Horse Telex</a
              >
            </p>
          </div>
          <div class="mt-4 flex flex-col md:flex-row -mx-4">
            <div style="flex: 7">
            <div class="flex flex-wrap">
              <div class="w-full">
                <!-- Tabs -->

                <div
                  class="relative flex flex-col min-w-0 break-words w-full mb-6 rounded"
                >
                  <div class="px-4 flex-auto">
                    <div class="tab-content tab-space">
                      <div
                        class="mb-4 bg-white p-5 mx-5 rounded-lg"
                      >
                        <div class="mb-4">
                          <span class="text-2xl font-bold">Rayos X</span>
                        </div>
                        <p>
                          <xRayGallery :images="horseData.xRayGallery" />
                        </p>
                      </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>

    </div>
    <div v-else-if="bidStatus == 'CLOSED'" class="flex md:flex-col m-1 md:m-20 gap-4">
      <h2 class="font-bold text-3xl mx-auto text-center text-yellow-600 md:w-[600px]">
          LA SUBASTA HA TERMINADO, GRACIAS POR TU PREFERENCIA, ESPERA NOTICIAS DE NOSOTROS PARA LA SIGUIENTE.
      </h2>
      <NuxtLink :to="`/`" class="w-44 mx-auto">
        <button class="bg-gray-500 text-white px-4 py-2 rounded-md mb-5 w-44">
          ← Inicio
        </button>
      </NuxtLink>
    </div>
    <div v-else-if="bidStatus != ''" class="flex md:flex-col m-1 md:m-20 gap-4">
      <h2 class="font-bold text-3xl mx-auto text-center text-red-600 md:w-[600px]">
          LA SUBASTA NO ESTÁ DISPONIBLE
      </h2>
      <NuxtLink :to="`/`" class="w-44 mx-auto">
        <button class="bg-gray-500 text-white px-4 py-2 rounded-md mb-5 w-44">
          ← Inicio
        </button>
      </NuxtLink>
    </div>

  </div>
</template>

<script>
import axios from "axios"
import moment from "moment"
import Loading from "~/components/shared/Loading.vue"
import statusBid from "~/components/bid/statusBid.vue"
import horseStatus from "~/components/bid/horseStatus.vue"
import xRayGallery from "~/components/bid/xRayGallery.vue"
import Pedigree from "~/components/bid/horsePedigree.vue"
import Carousel from "~/components/Carousel.vue"
import Winner from "~/components/bid/winner.vue"
import Bids from "~/components/bid/detailsBid.vue"
import SubmitAuthenticatedButton from "~/components/bid/submitAuthenticatedButton.vue"
import getUserTokenOrDefault from "~/utils/getUserTokenOrDefault"
import modal from "~/components/bid/modal.vue"
import ReconnectingWebSocket from "reconnecting-websocket"

export default {
  components: {
    Loading,
    statusBid,
    horseStatus,
    xRayGallery,
    Pedigree,
    Bids,
    Winner,
    Carousel,
    SubmitAuthenticatedButton,
    modal,

   },
  data() {
    return {
      item: {
        horses: "",
        start_bid: "",
        start_pre_bid: ""
      },
      formData: {
        subasta_id: "",
        horse_id: "",
        amount: "",
        pre_bid: false
      },
      bidId: "",
      loading: false,
      countdownSubasta: true,
      countdownPre: true,
      bidStatus: "",
      bidImage: "",
      videoUrl: "",
      socket: null,
      auctionSocket: null,
      lastOffer: "",
      showInput: false,
      manualInputAmount: "",
      isSyncEnabled: true,
      bidTime: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      },
      horse: {},
      horseData: {
        imagesObject: {},
        Genre: "",
        BirthDate: "",
        Color: "",
        Weight: "",
        Height: "",
        Location: "",
        Pedigree: "",
        Age: "",
        registerNumber: "",
        Hatchery: "",
        birthDate: "",
        xRayGallery: [],
        images: [],
        videoUrl: "",
        final_amount: "",
        horseTelex: ""
      },
      liveURL: "",
      HorsenName: "",
      intial_pre_bid_amount: "",
      horseID: "",
      externalHorseID: "",
      PreBidDate: "",
      EndPreBidDate: "",
      PreBidDateFormat: "",
      EndPreBidDateFormat: "",
      statusPreBid: false,
      BidDate: "",
      EndBidDate: "",
      BidDateFormat: "",
      EndBidDateFormat: "",
      horseStatus: "",
      apiImg: "https://storage.googleapis.com/horsebook/",
      openTab: 4,
      largeBidConfirmed: false,
      successMessage: "",
      errorMessage: "",
      OfferStatus: null,
      showModal: false,
      genders: "",
      genreMapping: {
        null: "",
        0: "Potranca",
        1: "Vacía",
        2: "Gestante",
        3: "Portadora",
        4: "Donadora",
        5: "Nana",
        6: "Potro",
        7: "Entero",
        8: "Semental",
        9: "Semental aprobado",
        10: "Castrado",
        11: "Nano"
      },
      socket: null,
      bids: [],
      preBids: [],
      errorMessage: "",
      winner: "",
      winnerName: "",
      isEditingAmount: false,
      inputAmount: "",
      winnerEmail: "",
      wonHorse: "",
      yourAreTheWinner: false,
      hasBid: false,
    }
  },
  async created() {
    const auctionId = this.$route.params.id
    this.bidId = auctionId
    await this.getDetailsAuction()
    this.startAuctionSocket()
  },
  mounted() {
    // Update the countdown every second
  },
  beforeDestroy() {
    // Clear the timer when the component is destroyed
    clearInterval(this.timer)
    clearInterval(this.timer2)
    this.intentionalCloseSockets()
    this.$confetti.stop()
  },

  methods: {

    async winnerConfetti() {
      await this.fetchWinner()
      this.wonHorse = this.HorsenName

      if (this.winnerEmail == this.$store.state.user.user) {
        this.$confetti.start()
        this.yourAreTheWinner = true
        setTimeout(() => {}, 5000)
      } else {
        this.yourAreTheWinner = false
        let winnerName = this.winner.name + ' ' + this.winner.fathers_surname
        if(winnerName === 'IN PERSON') {
          this.winnerName = 'EN PERSONA'
        } else if(this.winner.name == 'Call') {
          this.winnerName = 'EN LLAMADA'
        } else {
          this.winnerName = this.winner.name
        }
      }
    },

    showManualInputAmount() {
      this.manualInputAmount = this.inputAmount
      this.showInput = true
      this.$nextTick(() => {
        this.$refs.manualInputAmount.focus()
      })
    },
    assignManualInputAmount() {
      this.showInput = false
      if (this.inputAmount <= this.manualInputAmount)
        this.amountBase = this.manualInputAmount
    },
    updateEditAmount(value) {
      this.isEditingAmount = value
    },
    removeCommas(e) {
      document.getElementById("amount").type = "number"
      this.formData.amount = this.formData.amount.replace(/,/g, "")
    },
    addCommas(e) {
      this.formData.amount = parseFloat(this.formData.amount).toLocaleString()
      document.getElementById("amount").type = "text"
    },
    updateAmount(event) {
      if (this.isSyncEnabled) {
        this.formData.amount = event.target.value
      }
    },
    disableSync() {
      this.isSyncEnabled = false
      // this.removeCommas()
    },
    enableSync() {
      this.isSyncEnabled = true
      // this.addCommas()
    },
    enableModal() {
      this.showModal = true
    },
    disableModal() {
      this.showModal = false
    },

    async intentionalCloseSockets() {
      this.closeBidSocket()
      this.closeAuctionSocket()
    },
    async closeBidSocket() {
      if (this.socket) {
        this.socket.close()
      }
    },
    async closeAuctionSocket() {
      if (this.auctionSocket) {
        this.auctionSocket.close()
      }
    },

    async startBidSocket() {
      const token = getUserTokenOrDefault()
      const url = `${this.$config.baseURLWS}/bids/${this.bidId}/horses/${this.horseID}/?token=${token}`
      this.socket = new ReconnectingWebSocket(url)
      this.socket.addEventListener("message", (event) => {
        const message = JSON.parse(event.data)
        if (message.error) {
          this.errorMessage = message.error
          setTimeout(() => {
            this.errorMessage = ""
          }, 6000)
          return
        }
        if (message.bids) {
          this.bids = message.bids
        }

        if (message.has_bid) {
          this.hasBid = message.has_bid
        }

        if (message.bid) {
          if (this.bids.length > 20) {
            this.bids.pop()
          }
          this.bids.unshift(message.bid)
        }

        // only update the initial amount if the user has not edited the input
        if (this.firstUpdateAmount) {
          this.isEditingAmount = false
        }


        if (this.bids.length > 0) {

          this.lastOffer = parseInt(
            this.bids[0]?.amount
          ).toLocaleString("en-US")


          let currentValue = parseInt(this.bids[0]?.amount)

          console.error("Revisar currentValue", currentValue);
          if (currentValue >= 30000) {
            this.inputAmount = (
              currentValue + 500
            ).toLocaleString("en-US")


          } else if(this.bids[0]?.amount) {

            this.inputAmount = (
              currentValue + 1000
            ).toLocaleString("en-US")

          }
        } else {
          if (this.horseData.final_amount != "") {

            this.formData.amount = (parseInt(
              this.horseData.final_amount,
              10
            ) + 1000).toLocaleString("en-US")

            this.lastOffer = parseInt(
              this.horseData.final_amount
            ).toLocaleString("en-US")

            if (!this.isEditingAmount) {

              this.inputAmount = (parseInt(
                this.horseData.final_amount,
                10
              ) + 1000).toLocaleString("en-US")
            }

          } else {
            this.formData.amount = (1000).toLocaleString("en-US")
            if (!this.isEditingAmount) {
              this.inputAmount = (1000).toLocaleString("en-US")
          }
        }
      }

        // after made the first update, don't trigger again if the user is focus on the input
        if (this.firstUpdateAmount) {
          this.firstUpdateAmount = false
          this.isEditingAmount = true
        }
      })
      this.socket.addEventListener("close", (event) => {
        if (event.code === 1006) {
          this.startBidSocket()
        }
      })
    },

    async startAuctionSocket() {

      const url = `${this.$config.baseURLWS}/auction/${this.bidId}`;
      this.auctionSocket = new ReconnectingWebSocket(url);

      this.auctionSocket.addEventListener("message", (event) => {
        const message = JSON.parse(event.data);
        if(message.error){
          this.socketError = message.error
          return
        }

        if (message.horses && message.horses.length > 0) {
          this.item.horses.forEach((horse, key) => {
            const curHorse = message.horses.find( item => item.status === 'BIDDING' );
            if(curHorse.id != this.horseID){
              this.horseID = curHorse.id
              this.$confetti.stop()
              this.wonHorse = ""
              this.winner = ""
              this.closeBidSocket()
              this.fetchData()
            }
          });
        }


        if (message.horse) {
          const horse = message.horse;
          if (horse.id === this.horseID && horse.status === 'CLOSED') {
            // El horse actual se ha cerrado, restablecer horseID y cerrar el socket.
            this.horseStatus = 'CLOSED'
            this.winnerConfetti()
            this.horseID = null;
            this.closeBidSocket();
          } else if (horse.status === 'BIDDING') {
            // El horse actual está en proceso de subasta, actualizar horseID, fetch data y reiniciar el socket.
            this.horseID = horse.id;
            this.$confetti.stop();
            this.wonHorse = ""
            this.winner = ""
            this.firstUpdateAmount = true
            this.isEditingAmount = false
            this.closeBidSocket();
            this.fetchData();
          }
        }

        if (message.auction) {
            this.bidStatus = message.auction.status;
        }

      });
    },

    amountStringToInt(initial, final) {
      if (parseInt(final, 10) > parseInt(initial, 10)) {
        return true
      } else {
        return false
      }
    },
    getImageUrl() {
      return this.horseData.imagesObject[this.horseID]
    },

    async fetchHorseImages() {
    try {
      const response = await this.$axios.get(`${this.$config.baseLaSilla}/horses/${this.externalHorseID}/images`);

      if (Array.isArray(response.data) && response.data.length > 0) {
        const images = response.data.map((imageObj) => imageObj.url)
        this.horseData.images = images
      } else {
        console.warn("No images found in the response for horse: ", this.externalHorseID);
      }
    } catch (error) {
      console.error(error);
    }
  },


    async getDetailsAuction() {
      const url = this.$config.baseURL + `/subastas/list-subastas/?id=${this.bidId}`
      this.loading = true

      await this.$axios
        .get(url)
        .then((response) => {
          this.item.start_bid = response.data.start_bid
          this.item.start_pre_bid = response.data.start_pre_bid
          this.item.horses = response.data.horses
          this.bidStatus = response.data.status
          this.bidImage = response.data.image
          this.videoUrl = response.data.video_url
          this.loading = false

        })
        .catch((error) => {
          console.log(error)
          this.loading = false
        })
    },

    showHorseDetails(horse) {
      this.$set(horse, "showDetails", !horse.showDetails)
    },

    extractYouTubeId(url) {
      if (url) {
        try {
          const parsedUrl = new URL(url)
          return parsedUrl.searchParams.get("v")
        } catch (error) {
          return null
        }
      } else {
        return null
      }
    },
    addThousand() {
      let currentValue = parseInt(this.inputAmount.replace(",", ""))
      if (currentValue >= 30000) {
        currentValue += 500
      } else {
        currentValue += 1000
      }
      this.inputAmount = currentValue.toLocaleString("en-US")
    },
    substractThousand() {
      let currentValue = parseInt(this.inputAmount.replace(",", ""))
      if (currentValue >= 30000) {
        currentValue -= 500
      } else {
        currentValue -= 1000
      }
      this.inputAmount = currentValue.toLocaleString("en-US")
    },

    toggleTabs: function (tabNumber) {
      this.openTab = tabNumber
    },
    calculateAge() {
      const today = moment()
      return today.diff(this.birthDate, "years")
    },
    formatted(date) {
      const dateformat = moment(date).format("DD/MM/YYYY")
      return dateformat
    },

    fetchGenres() {
      const genreEndpoint = "/horses/gender-age"
      const url = `${this.$config.baseLaSilla}${genreEndpoint}`
      axios
        .get(url)
        .then((response) => {
          this.genders = response.data.gender
        })
        .catch((error) => {
          console.error(error)
        })
    },
    async fetchWinner() {
      let winnerEndpoint = "/subastas/prebid-winner/"
      let url = `${this.$config.baseURL}${winnerEndpoint}`

      let params = {
        subasta_id: this.bidId,
        horse_id: this.horseID,
        pre_bid: this.horseStatus === "CLOSED" ? "false" : "true"
      }
      const token = getUserTokenOrDefault()

      await axios
        .get(url, {
          headers: {
            Authorization: `Token ${token}`
          },
          params: params
        })
        .then((response) => {
          this.winnerEmail = response.data.user_profile.email
          this.winner = response.data.user_profile
        })
        .catch((error) => {
          // Handle errors
          console.error("Error fetching winner:", error)
        })
    },

    async fetchData() {
      let listSubastasEndpoint = `/horse/${this.horseID}/info`
      let url = `${this.$config.baseURL}${listSubastasEndpoint}`
      const token = getUserTokenOrDefault()
      try{
        let response = await axios
          .get(url, { })
            const horse = response.data
            this.horse = horse
            //name
            this.HorsenName = horse.external_data.name
            //horse ID
            this.externalHorseID = horse.external_data.id
            this.horseIDForm = horse.local_data.id
            //horse Description
            //genre
            this.horseData.Genre =
              this.genreMapping[horse.external_data.sex] || ""
            //Birthdate
            this.horseData.BirthDate = this.formatted(
              horse.external_data.birth_date
            )
            //color
            this.horseData.Color = horse.external_data.color
            //Weight
            this.horseData.Weight = horse.external_data.weight
            //Height
            this.horseData.Height = horse.external_data.height
            //Location
            this.horseData.Location = horse.external_data.location
            //Pedigree Image
            this.horseData.Pedigree = horse.local_data.pedigree
            //No. Register
            this.horseData.registerNumber = horse.local_data.registration_no
            //Hatchery
            this.horseData.Hatchery = horse.external_data.birth_location
            const birthDateMoment = moment(this.horseData.BirthDate, "DD/MM/YYYY")
            const today = moment()
            this.horseData.Age = today.diff(birthDateMoment, "years")
            //xRays
            this.horseData.xRayGallery = horse.local_data.xrays.map(
              (xray) => xray.image
            )
            //Video URL
            this.horseData.videoUrl = this.extractYouTubeId(
              horse.local_data.video_url
            )
            // Live URL
            this.liveURL = this.extractYouTubeId(horse.video_url)
            //Horse Images
            this.fetchHorseImages()
            //Horse Age
            this.age = this.calculateAge()
            //Bid Status
            this.horseStatus = horse.local_data.status
            //Bid Initial Amout
            this.horseData.final_amount = horse.local_data.final_amount
            this.inputAmount = (
                parseInt(horse.local_data.final_amount + 1000)
              ).toLocaleString("en-US")
            this.horseData.horseTelex = horse.local_data.horsetelex_url
            this.startBidSocket()

      }catch(e) {
        console.log(e)
      }
    },

    statusOffer(BidDate) {
      const CurrentDate = new Date()
      const StartBid = new Date(BidDate)
      return CurrentDate <= StartBid
    },
    submitForm(event) {
      event.preventDefault()
      const submittedAmount = parseInt(this.formData.amount.replace(",", ""))
      if (this.manualInputAmount) {
        const submittedAmountInput = parseInt(this.manualInputAmount)
        const user = JSON.parse(localStorage.getItem("setUser"))
        this.socket.send(
          JSON.stringify({
            bid_info: {
              amount: submittedAmountInput
            },
            sender: {
              email: user.user
            }
          })
        )
        this.manualInputAmount = ""
      } else {
        const submittedAmountInput = parseInt(this.inputAmount.replace(",", ""))
        const user = JSON.parse(localStorage.getItem("setUser"))
        this.socket.send(
          JSON.stringify({
            bid_info: {
              amount: submittedAmountInput
            },
            sender: {
              email: user.user
            }
          })
        )
      }
    }

  }
}
</script>

<style scoped>
  /* styles.css */
  .fade-enter-active, .fade-leave-active {
    transition: opacity 3s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

</style>
