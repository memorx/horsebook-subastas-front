<template>
  <div class="bg-zinc-200 py-5 lg:px-20 px-5">
    <Loading
      v-if="loading"
      class="fixed w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
    />
    <div class="w full h-auto my-4">
      <button
        class="uppercase border-1 border-black px-4 py-2 flex flex-row items-center font-roboto font-bold text-[9px] md:text-lg lg:text-sm xl:text-base"
        @click="() => this.$router.push(localePath('/user/inicio'))"
      >
        <span
          class="mr-2 w-1 md:w-3 md:mr-3 lg:w-2 lg:mr-2 xl:w-3 xl:mr-3 lg:mb-1"
          ><img src="../../../public/arrow-black.png" /></span
        > {{ $t('auction.auctionListButton') }}
      </button>
    </div>
    <div class="flex flex-wrap lg:space-x-3">
      <!-- First Column -->
      <div class="flex flex-wrap w-full lg:w-1/2">
        <div v-if="bidImage" class="w-full">
          <img
            :src="bidImage"
            alt="logo"
            class="flex-1 flex-grow hidden md:block w-full max-w-full object-cover rounded-lg md:flex-grow"
          />
        </div>
        <div
          class="flex-1 flex-grow lg:mx-0 bg-gray-400 flex justify-center items-center rounded-tl-3xl rounded-br-3xl"
          v-else
        >
          <img
            class="opacity-70 m-auto h-2/3"
            src="../../../public/image_la_silla.png"
            alt="Default Horse"
          />
        </div>
      </div>
      <!-- Second Column -->
      <div class="lg:px-0 lg:flex-1 w-full lg:w-1/2">
        <!-- First Row in the second column -->
        <div class="mb-4 bg-white p-5 rounded-lg">
          <div class="flex items-center">
            <h2 class="text-2xl font-bold mb-1 pr-3">{{ $t('auction.auction') }}</h2>
            <statusBid :status="bidStatus" />
          </div>
          <span class="text-xl font-bold mb-2">{{ item.horses.length }}</span>
          <span>{{ $t('auction.' + (item.horses.length == 1 ? "horse" : "horses")) }}</span>
        </div>
        <!-- Second Row in the second column -->
        <div v-if="!loading" class="bg-white p-5 rounded-lg md:flex-grow">
          <!-- PREOFERTA -->
          <h1
            v-if="bidStatus == 'COMING'"
            class="text-center text-sm font-bold"
          >
            {{ $t('auction.preOfferStartMsg')  }}
          </h1>
          <h1
            v-if="bidStatus == 'PREBID'"
            class="text-center text-sm font-bold"
          >
            {{ $t('auction.preOfferStartedMsg')  }},
          </h1>
          <h1
            v-if="bidStatus == 'CLOSED PREBID'"
            class="text-center text-sm font-bold"
          >
            {{ $t('auction.prebidIsEnded') }}
          </h1>
          <div
            v-if="loading == false && countdownPre == true && !counterIsZero(preBidTime)"
            class="flex justify-center"
          >
            <div class="mx-10 my-10">
              <div
                v-if="countdownPre == true || loading == true"
                class="flex flex-row md:items-center"
              >
                <div class="mx-5">
                  <p class="text-center text-2xl md:text-5xl mb-2 font-bold">
                    {{ preBidTime.days }}
                  </p>
                  <p class="text-center text-sm md:text-xl text-slate-500">{{ $t('cron.days') }}</p>
                </div>
                <div class="mx-5">
                  <p class="text-center text-2xl md:text-5xl mb-2 font-bold">
                    {{ preBidTime.hours }}
                  </p>
                  <p class="text-center text-sm md:text-xl text-slate-500">{{ $t('cron.hours') }}</p>
                </div>
                <div class="mx-5">
                  <p class="text-center text-2xl md:text-5xl mb-2 font-bold">
                    {{ preBidTime.minutes }}
                  </p>
                  <p class="text-center text-sm md:text-xl text-slate-500">{{ $t('cron.minutes') }}</p>
                </div>
                <div class="mx-5">
                  <p class="text-center text-2xl md:text-5xl mb-2 font-bold">
                    {{ preBidTime.seconds }}
                  </p>
                  <p class="text-center text-sm md:text-xl text-slate-500">{{ $t('cron.seconds') }}</p>
                </div>
              </div>
            </div>
          </div>
          <!-- SUBASTA -->
          <h1
            v-if="bidStatus == 'CLOSED'"
            class="text-center text-sm font-bold"
          >
            {{ $t('auction.auctionEndedMsg') }}
          </h1>
          <h1
            v-if="bidStatus != 'BIDDING' && bidStatus != 'CLOSED'"
            class="text-center text-sm font-bold"
          >
            {{ $t('auction.auctionWillBeLivetMsg') }}
          </h1>
          <h1
            v-if="bidStatus == 'BIDDING'"
            class="text-center text-sm font-bold"
          >
            {{ $t('auction.auctionLivetMsg') }}
          </h1>
          <div
            v-if="loading == false && countdownSubasta == true"
            class="flex justify-center"
          >
            <div class="mx-10 md:mx-0 my-10">
              <div
                v-if="countdownSubasta == true && !counterIsZero(bidTime)"
                class="flex flex-row md:items-center"
              >
                <div class="mx-5">
                  <p class="text-center text-2xl md:text-5xl mb-2 font-bold">
                    {{ bidTime.days }}
                  </p>
                  <p class="text-center text-sm md:text-xl text-slate-500">
                    {{ $t('cron.days') }}
                  </p>
                </div>
                <div class="mx-5">
                  <p class="text-center text-2xl md:text-5xl mb-2 font-bold">
                    {{ bidTime.hours }}
                  </p>
                  <p class="text-center text-sm md:text-xl text-slate-500">
                    {{ $t('cron.hours') }}
                  </p>
                </div>
                <div class="mx-5">
                  <p class="text-center text-2xl md:text-5xl mb-2 font-bold">
                    {{ bidTime.minutes }}
                  </p>
                  <p class="text-center text-sm md:text-xl text-slate-500">
                    {{ $t('cron.minutes') }}
                  </p>
                </div>
                <div class="mx-5">
                  <p class="text-center text-2xl md:text-5xl mb-2 font-bold">
                    {{ bidTime.seconds }}
                  </p>
                  <p class="text-center text-sm md:text-xl text-slate-500">
                    {{ $t('cron.seconds') }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 lg:grid-cols-3 gap-3 my-5">
      <!-- Dynamic Cards -->
      <div
        v-for="(horse, index) in item.horses"
        :key="horse.id"
        class="mb-5 flex flex-wrap flex-grow hover:cursor-pointer"
        @click="goToDetail(horse, index)"
      >
        <!-- Card content -->
        <div class="relative bg-white rounded-tl-3xl w-full">
          <div class="absolute z-30 m-2">
            <horseStatus
              :status="horse.local_data.status"
              :bid-status="bidStatus"
            />
          </div>
          <img
            v-if="horse.external_data.image_path_thumbnail"
            :src="`${apiImg}${horse.external_data.image_path_thumbnail}`"
            class="w-full flex-1 object-cover rounded-tl-3xl rounded-br-3xl hover:brightness-110 transition-opacity h-40 lg:h-80"
          />
          <div
            v-else
            class="flex justify-center items-center bg-gray-400 w-full h-40 lg:h-80 rounded-tl-3xl rounded-br-3xl"
          >
            <img
              class="m-auto opacity-70 h-1/2"
              src="../../../public/image_la_silla.png"
              alt="Default Horse"
            />
          </div>
        </div>
        <div class="w-full">
          <div
            class="py-5 flex flex-wrap w-full bg-white font-roboto justify-center items-center space-y-4"
          >
            <div class="w-full">
              <h3
                class="text-center text-md md:text-xl xl:text-2xl font-extrabold"
              >
                {{ horse.external_data.name }}
              </h3>
              <p
                v-if="isUserAuthenticated"
                class="text-center text-xs md:text-lg xl:text-xl"
              >
                <span class="font-bold">
                  {{ $t('auction.lot') }}: </span> {{ horse.local_data.lot }}
              </p>
            </div>
            <div class="w-full">
              <p
                v-if="
                  amountStringToInt(
                    horse.local_data.initial_pre_bid_amount,
                    horse.local_data.final_amount
                  )
                "
                class="text-xs lg:text-xl font-bold text-center"
              >
                {{ $t('auction.bestOffer') }}:
              </p>
              <p v-else class="text-xs lg:text-xl font-bold text-center">
                {{ $t('auction.startingPrice') }}:
              </p>
              <p class="text-xs lg:text-xl font-bold text-center">
                $ {{ parseFloat(horse.local_data.final_amount.replace(/,/g, "")).toLocaleString('en-US', { maximumFractionDigits: 0 }) }} USD
              </p>
              <p class="">
                <div class="my-2">
                  <div
                    v-if="horse.local_data.status == 'PREBID'  && loading == false && typeof horse.countdown === 'object' && !counterIsZero(horse.countdown)"
                    class="flex flex-row mx-auto w-fit gap-3"
                  >
                    <div class="md:mx-3">
                      <p class="text-center text-2xl mb-0 md:mb-1 font-bold">
                        {{ horse.countdown.days }}
                      </p>
                      <p class="text-center text-sm md:text-xl text-slate-500 text-xs">
                        <span class="hidden md:block">
                          {{ $t('cron.days') }}
                        </span>
                        <span class="md:hidden">
                          D
                        </span>
                      </p>
                    </div>
                    <div class="md:mx-3">
                      <p class="text-center text-2xl mb-0 md:mb-1 font-bold">
                        {{ horse.countdown.hours }}
                      </p>
                      <p class="text-center text-sm md:text-xl text-slate-500 text-xs">
                        <span class="hidden md:block">
                          {{ $t('cron.hours') }}
                        </span>
                        <span class="md:hidden">
                          H
                        </span>
                      </p>
                    </div>
                    <div class="md:mx-3">
                      <p class="text-center text-2xl mb-0 md:mb-1 font-bold">
                        {{ horse.countdown.minutes }}
                      </p>
                      <p class="text-center text-sm md:text-xl text-slate-500 text-xs">
                        <span class="hidden md:block">
                          {{ $t('cron.minutes') }}
                        </span>
                        <span class="md:hidden">
                          M
                        </span>
                      </p>
                    </div>
                    <div class="md:mx-3">
                      <p class="text-center text-2xl mb-0 md:mb-1 font-bold">
                        {{ horse.countdown.seconds }}
                      </p>
                      <p class="text-center text-sm md:text-xl text-slate-500 text-xs">
                        <span class="hidden md:block">
                          {{ $t('cron.seconds') }}
                        </span>
                        <span class="md:hidden">
                          S
                        </span>
                      </p>
                    </div>
                  </div>
                  <div class="mx-auto w-fit text-center text-sm" v-if="horse.local_data.status == 'PREBID' && loading == false && typeof horse.countdown === 'object' && !counterIsZero(horse.countdown)">
                    {{ $t('horse.prebidTimeLeft') }}
                  </div>
                </div>
              </p>
            </div>
          </div>
          <div
            class="w-full h-1/5 bg-black text-white flex items-center justify-center opacity-90 hover:opacity-100 transition-opacity"
          >
            <a
              :href="localePath(`/bids/bid/?id=${id}&horsePositionList=${index}&horseId=${horse.local_data.id}`)"
              rel="noopener noreferrer"
              class="w-full h-1/5 bg-black text-white flex items-center justify-center opacity-90 hover:opacity-100 transition-opacity"
            >
              <span class="w-full h-full uppercase transition duration-300 transform scale-100 hover:scale-105 text-xs md:text-xl xl:text-xl flex items-center justify-center">
                {{ $t('auction.enter') }}
              </span>
            </a>
          </div>
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
import ReconnectingWebSocket from "reconnecting-websocket"

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
      countdownSubasta: false,
      countdownPre: false,
      bidStatus: "",
      bidImage: "",
      apiImg: "https://storage.googleapis.com/horsebook/",
    }
  },
  async created() {
    const itemId = this.$route.params.id
    this.id = itemId
    await this.getDetailsAuction(this.id)
    this.startAuctionSocket()
  },
  mounted() {
    // Update the countdown every second
  },
  beforeDestroy() {
    // Clear the timer when the component is destroyed
    clearInterval(this.timer)
    clearInterval(this.timer2)
    clearInterval(this.timer3)
  },
  computed: {

    isUserAuthenticated() {
      return this.$store.state.isAuthenticated
    },
    displayedCards() {
      return this.isUserAuthenticated ? this.cards : this.guestCards
    }
  },
  methods: {
    async startAuctionSocket() {
      const mountedThis = this
      if (
        this.auctionSocket &&
        this.auctionSocket.readyState === WebSocket.OPEN
      ) {
        this.auctionSocket.close()
      }

      const url = `${this.$config.baseURLWS}/auction/${this.$route.params.id}`
      this.auctionSocket = new ReconnectingWebSocket(url)

      this.auctionSocket.addEventListener("message", (event) => {
        const message = JSON.parse(event.data)
        // console.log('message auction socket', message)
        if (message.error) {
          this.socketError = message.error
          return
        }

        if (message.auction) {
          // console.log('trae un auction')
          this.bidStatus = message.auction.status
        }

        if (message.horses && message.horses.length > 0) {
          this.item.horses.forEach((horse, key) => {
            const matchingHorse = message.horses.find(
              (item) => item.id === horse.local_data.id
            )
            if (matchingHorse) {
              this.item.horses[key].local_data.status = matchingHorse.status
              if (matchingHorse.bids && matchingHorse.bids.length > 0) {
                const latestBid = matchingHorse.bids[0]
                this.item.horses[key].local_data.final_amount = latestBid.amount.toFixed(2)
              }
            }
          })
        }

        if(message.bid){
          // console.log('trae un bid y acutaliza final amount')
          const key = this.item.horses.findIndex(
            (horse) => message.bid.horse === horse.local_data.id
          )
          if (key >= 0)
            this.item.horses[key].local_data.final_amount = message.bid.amount.toFixed(2)
        }

        if (message.horse) {
          // console.log('trae un horse y busca su status')
          const key = this.item.horses.findIndex(
            (horse) => message.horse.id === horse.local_data.id
          )
          if (key >= 0)
            this.item.horses[key].local_data.status = message.horse.status
        }

        if (message.prebid) {
          if (message.prebid.horse?.id) {
            const now = new Date()

            const key = this.item.horses.findIndex(
              (horse) => message.prebid.horse.id === horse.local_data.id
            )
            if (key >= 0)
              this.item.horses[key].local_data.end_pre_bid = message.prebid.horse.end_pre_bid

            this.calculateCountdownPerHorse()

          }

        }


      })


      this.auctionSocket.addEventListener("close", (event) => {
        if (event.code === 1006) {
          mountedThis.startBidSocket()
        }
      })
    },
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

    counterIsZero(countdown) {
      return countdown.days === 0 && countdown.hours === 0 && countdown.minutes === 0 && countdown.seconds === 0
    },

    calculateCountdownPerHorse() {
      this.item.horses.forEach(horse => {


        const now = new Date()
        const targetDate = new Date(horse.local_data.end_pre_bid)

        const utcOffset = targetDate.getTimezoneOffset()
        const targetUTC = new Date(targetDate.getTime() + (utcOffset * 60 * 1000))

        const utcOffsetNow = now.getTimezoneOffset()
        const nowUTC = new Date(now.getTime() + (utcOffsetNow * 60 * 1000))

        const timeDifference = targetUTC - nowUTC

        let days = 0
        let hours = 0
        let minutes = 0
        let seconds = 0

        if (timeDifference <= 0) {
          horse.countdownSubasta = false
        } else {
          days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
          hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
          minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
          seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)
        }

        horse.countdown = {
          days: days,
          hours: hours,
          minutes: minutes,
          seconds: seconds
        }
      })
    },

    calculateCountdown() {
      const targetDate = new Date(this.item.start_bid)
      const now = new Date()

      const utcOffset = targetDate.getTimezoneOffset()
      const targetUTC = new Date(targetDate.getTime() + (utcOffset * 60 * 1000))

      const utcOffsetNow = now.getTimezoneOffset()
      const nowUTC = new Date(now.getTime() + (utcOffsetNow * 60 * 1000))

      const timeDifference = targetUTC - nowUTC

      if (timeDifference <= 0) {
        this.countdownSubasta = false
        clearInterval(this.timer)
      } else {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)

        this.bidTime.days = days
        this.bidTime.hours = hours
        this.bidTime.minutes = minutes
        this.bidTime.seconds = seconds
      }

    },

    calculatePreBidCountdown() {

      const targetDate = new Date(this.item.start_pre_bid)
      const now = new Date()

      const utcOffset = targetDate.getTimezoneOffset()
      const targetUTC = new Date(targetDate.getTime() + (utcOffset * 60 * 1000))

      const utcOffsetNow = now.getTimezoneOffset()
      const nowUTC = new Date(now.getTime() + (utcOffsetNow * 60 * 1000))

      const timeDifference = targetUTC - nowUTC

      if (timeDifference <= 0) {
        this.countdownPre = false
        clearInterval(this.timer2)
      } else {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
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
      console.warn('loading = true', this.loading)

      await this.$axios
        .get(url)
        .then((response) => {
          this.item.start_bid = response.data.start_bid
          this.item.start_pre_bid = response.data.start_pre_bid
          this.item.horses = response.data.horses
          this.bidStatus = response.data.status
          this.bidImage = response.data.image
          this.horseData.imagesID = response.data.horses.map(
            (horse) => horse.local_data.horse_id
          )
          this.fetchImagesForAllHorses()
          this.loading = false
          if(this.bidStatus == 'COMING') {
            this.countdownPre = true
          }
          if(['CLOSED PREBID', 'PREBID', 'COMING'].includes(this.bidStatus)) {
            this.countdownSubasta = true
          }
          this.timer = setInterval(this.calculateCountdown, 1000)
          this.timer2 = setInterval(this.calculatePreBidCountdown, 1000)
          this.timer3 = setInterval(this.calculateCountdownPerHorse, 1000)
        })
        .catch((error) => {
          // console.log(error)
          this.loading = false
        })
    },
    showHorseDetails(horse) {
      this.$set(horse, "showDetails", !horse.showDetails)
    },
    goToDetail(horse, index) {
      let path = `/bids/bid/?id=${this.id}&horsePositionList=${index}&horseId=${horse.local_data.id}`
      this.$router.push({ path: this.localePath(path) })
    }
  }
}
</script>
