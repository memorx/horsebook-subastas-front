<template>
  <div class="bg-zinc-200 py-5 lg:px-5 md:px-3">
    <modal
      v-show="showModal"
      :amount="manualInputAmount ? manualInputAmount : inputAmount"
      :submitForm="submitForm"
      :disableModal="disableModal"
      :status="horseStatus"
    />
    <Loading
      v-if="loading"
      class="fixed w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
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
          <div v-if="horseID">
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

          <div v-if="horseID" class="text-lg font-bold flex flex-col md:flex-row">
            Caballo en subasta: <span class="text-2xl text-red-500">{{ HorsenName }}</span>
            <NuxtLink :to="`/bids/bid/?id=${bidId}&horsePositionList=0&horseId=${horseID}`" class="font-normal mt-1 ml-3">
              Ver Detalles
            </NuxtLink>

          </div>
        </div>
        <!-- Second Row in the second column -->
        <div class="bg-white mx-5 rounded-lg md:flex-grow">

          <div v-if="!horseID" class="p-8">
              <h2 class="font-bold text-3xl mx-auto text-center">
                  QUÉDATE CON NOSOTROS SEGUIMOS CON LA SUBASTA EN VIVO
              </h2>
          </div>
          <div v-else class="w-full flex-col mt-4 md:mt-0 bg-white rounded-lg">
            <div
              class="text-center w-full rounded-t-lg p-5"
              style="background-color: #b99d61"
            >
              <p class="text-white font-bold text-sm">OFERTA MAS ALTA</p>
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
                <div class="flex items-center space-x-2">
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
                />
              </div>
            </div>
          </div>



<!-- TERMINA-->
        </div>
      </div>
    </div>
    <div>



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
      horseData: {
        imagesObject: {},
        imagesID: []
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
      auctionSocket: null,
      horseData: {
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
      bidStatus: "",
      liveURL: "",
      HorsenName: "",
      lastOffer: "",
      intial_pre_bid_amount: "",
      horseID: "",
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
      isEditingAmount: false,
      firstUpdateAmount: true,
      inputAmount: "",
      horseExternalId: "",
      winnerEmail: ""


    }
  },
  async created() {
    const auctionId = this.$route.params.id
    this.bidId = auctionId
    await this.getDetailsAuction()
    this.startAuctionSocket()
    this.startBidSocket()
  },
  mounted() {
    // Update the countdown every second
  },
  beforeDestroy() {
    // Clear the timer when the component is destroyed
    clearInterval(this.timer)
    clearInterval(this.timer2)
    this.intentionalCloseSockets()
  },

  computed: {
    shouldCallGetDetailsAuction() {
      return this.countdownSubasta === false
    },
    shouldCallGetDetailsAuctionPre() {
      return this.countdownPre === false
    }
  },
  watch: {
    shouldCallGetDetailsAuction(newValue) {
      if (newValue) {
        console.log("Updating Bid")
        setTimeout(() => {
          this.getDetailsAuction()
        }, 1000) // 500 milliseconds = 0.5 seconds
      }
    },
    shouldCallGetDetailsAuctionPre(newValue) {
      if (newValue) {
        console.log("Updating PreBid")
        setTimeout(() => {
          this.getDetailsAuction()
        }, 1000) // 500 milliseconds = 0.5 seconds
      }
    }
  },

  methods: {

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
      console.log("inputAmount", this.inputAmount)
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
      console.log("Cierre intencional de los sockets")
      this.closeBidSocket()
      this.closeAuctionSocket()
    },
    async closeBidSocket() {
      console.log("Close Bid Socket")
      if (this.socket) {
        this.socket.close()
      }
    },
    async closeAuctionSocket() {
      console.log("Close Auction Socket")
      if (this.auctionSocket) {
        this.auctionSocket.close()
      }
    },

    async startBidSocket() {

      const url = `${this.$config.baseURLWS}/bids/${this.bidId}/horses/${this.horseID}`
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
          console.log("Message Bid", message.bids[0])
          this.bids = message.bids
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
          let currentValue = parseInt(
            this.formData?.amount.replace(",", "")
          )
          if (!this.isEditingAmount) {
            let InputValue = parseInt(this.inputAmount.replace(",", ""))
          }
          if (currentValue >= 30000) {
            this.inputAmount = (
              parseInt(this.bids[0]?.amount) + 500
            ).toLocaleString("en-US")
            if (!this.isEditingAmount) {
              this.inputAmount = (
                parseInt(this.bids[0]?.amount) + 500
              ).toLocaleString("en-US")
            }
          } else if(this.bids[0]?.amount) {

            this.inputAmount = (
              parseInt(this.bids[0]?.amount) + 1000
            ).toLocaleString("en-US")
            if (!this.isEditingAmount) {
              this.inputAmount = (
                parseInt(this.bids[0]?.amount) + 1000
              ).toLocaleString("en-US")
            }
          }
        } else if (this.horseData.final_amount) {
          this.formData.amount = parseInt(
            this.horseData.final_amount + 1000,
            10
          ).toLocaleString("en-US")
          if (!this.isEditingAmount) {
            this.inputAmount = parseInt(
              this.horseData.final_amount + 1000,
              10
            ).toLocaleString("en-US")
          }
        } else {
          this.formData.amount = (1000).toLocaleString("en-US")
          if (!this.isEditingAmount) {
            this.inputAmount = (1000).toLocaleString("en-US")
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
      this.auctionSocket = new WebSocket(url);

      this.auctionSocket.addEventListener("message", (event) => {
        const message = JSON.parse(event.data);
        if(message.error){
          this.socketError = message.error
          return
        }
        console.log('MESANJE AUCTION', message)
        if (message.horses && message.horses.length > 0) {
          this.item.horses.forEach((horse, key) => {
            const curHorse = message.horses.find( item => item.status === 'BIDDING' );
            if(curHorse.id != this.horseID){
              this.horseID = curHorse.id
              this.fetchData()
              this.closeBidSocket()
              this.startBidSocket()
            }
          });
        }

        if (message.horse) {
          const horse = message.horse;

          if (horse.id === this.horseID && horse.status === 'CLOSED') {
            // El horse actual se ha cerrado, restablecer horseID y cerrar el socket.
            this.horseID = null;
            this.closeBidSocket();
          } else if (horse.status === 'BIDDING') {
            // El horse actual está en proceso de subasta, actualizar horseID, fetch data y reiniciar el socket.
            this.horseID = horse.id;
            this.fetchData();
            this.closeBidSocket();
            this.startBidSocket();
          }
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
      const response = await this.$axios.get(`${this.$config.baseLaSilla}/horses/${this.horseID}/images`);

      if (Array.isArray(response.data) && response.data.length > 0) {
        const images = response.data.map((imageObj) => imageObj.url)
        this.horseData.images = images
      } else {
        console.warn("No images found in the response for horse: ", this.horseID);
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
      console.log("adding")
      // let currentValue = parseInt(this.formData?.amount.replace(",", ""))
      let currentValue = parseInt(this.inputAmount.replace(",", ""))
      console.log(currentValue)
      if (currentValue >= 30000) {
        currentValue += 500
      } else {
        currentValue += 1000
      }
      this.inputAmount = currentValue.toLocaleString("en-US")
    },
    substractThousand() {
      console.log("substracting")
      let currentValue = parseInt(this.inputAmount.replace(",", ""))
      if (currentValue >= 30000) {
        currentValue -= 500
      } else {
        currentValue -= 1000
      }
      this.inputAmount = currentValue.toLocaleString("en-US")
    },
    parseFetchedAmount(value) {
      let lastOfferInt = parseInt(value?.replace(",", ""))
      lastOfferInt += 1000
      const lastOfferStr = lastOfferInt.toLocaleString("en-US")
      return lastOfferStr
    },
    preloadAmount() {
      const lastOffer = this.lastOffer
      const lastOfferStr = this.formData?.amount.toLocaleString("en-US")
      return lastOfferStr
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
    handleFormSubmitted() {
      this.$refs.detailsBid.getDetailsBid(this.bidId, this.horseID)
    },
    updateLastOffer(offer) {
      this.lastOffer = offer
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
          console.log("GANADOR", this.winner)
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
      await axios
        .get(url, {
        })
        .then((response) => {
          const horse = response.data
          //name
          this.HorsenName = horse.external_data.name
          //horse ID
          this.horseID = horse.external_data.id
          console.log("ID ExTERNO", this.horseID)
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
        })
        .catch((error) => {
          console.error(error)
        })

      listSubastasEndpoint = `/subastas/list-subastas/?id=${this.bidId}&only_subasta_data=true`
      url = `${this.$config.baseURL}${listSubastasEndpoint}`
      await axios
        .get(url)
        .then((response) => {
          const auction = response.data
          //TODO: get subasta info
          //prebid date
          this.PreBidDate = auction.start_pre_bid
          this.EndPreBidDate = auction.end_pre_bid
          this.PreBidDateFormat = this.formatted(auction.start_pre_bid)
          this.EndPreBidDateFormat = this.formatted(auction.end_pre_bid)
          //bid date
          this.BidDate = auction.start_bid
          this.EndBidDate = auction.end_bid
          this.BidDateFormat = this.formatted(auction.start_bid)
          this.EndBidDateFormat = this.formatted(auction.end_bid)
          this.bidStatus = auction.status
          this.timer = setInterval(this.calculateCountdown, 1000)
        })
        .catch((error) => {
          console.error(error)
        })
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
