<template>
  <div>
    <modal
      v-show="showModal"
      :amount="confirmedAmount"
      :submitForm="submitForm"
      :disableModal="disableModal"
      :status="horseStatus"
      :commission="commission"
      :taxes="taxes"
    />

    <div class="w-full h-auto flex flex-col justify-start pt-4 px-6">
        <div class="flex-grow bg-[#EDEDED] rounded-lg mb-4 h-full ">
            <div class="w full h-auto mx-6 my-4 md:my-8">
                <button
                    class="uppercase border-1 border-black px-4 py-2 flex flex-row items-center font-roboto font-bold text-[9px] md:text-lg lg:text-sm xl:text-base"
                    @click="() => this.$router.push(this.localePath(`/user/detalles/${bidId}`))"
                >
                    <span class="mr-2 w-1 md:w-3 md:mr-3 lg:w-2 lg:mr-2 xl:w-3 xl:mr-3 lg:mb-1"><img
                            src="../../public/arrow-black.png" /></span>
                            {{ $t('general.back') }}
                </button>
            </div>
            <div class="flex flex-col md:flex-row-reverse h-auto mx-6 my-4 md:my-8">
                <div class="flex justify-end md:w-1/3">
                  <div>
                    <horseStatus :status="horseStatus" :bidStatus="bidStatus" />
                  </div>
                </div>
                <h1 class="flex flex-row mt-3 md:mt-0 md:w-2/3">
                    <span class="text-base md:text-2xl lg:text-3xl xl:text-4xl font-roboto font-extrabold">
                      {{ HorseName }}
                    </span>
                    <button v-if="isUserAuthenticated" class="text-lg text-left ml-3" :class="subscribed? 'text-yellow-500' : 'text-black'">
                      <i class="icon fas fa-bell" v-on:click="() => {subscribe()}" :title="!subscribed? 'Activar notificaciones' : 'Desactivar notificaciones'"></i>
                    </button>
                </h1>
            </div>
            <div class="flex flex-col h-auto mx-6 my-4 md:my-8 relative">
                <p class="text-xs md:text-lg lg:text-xl xl:text-2xl font-roboto font-semibold lg:font-bold uppercase">
                  {{ $t('auction.lotNo') }} {{ horseData.Lot }}
                </p>
                <p class="text-xs md:text-lg lg:text-xl xl:text-2xl font-roboto font-semibold lg:font-bold uppercase">
                    Monterrey, Nuevo León</p>
            </div>
            <div class="flex flex-row justify-between pb-3 px-6">
              <button v-if="horseData.previous" @click="goToHorse(horseData.previous)" class="uppercase border-0 px-4 py-2 flex flex-row items-center font-roboto font-bold text-[9px] md:text-lg lg:text-sm xl:text-base">
                <span class="mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 25 25"><path style="fill:#232326" d="M24 12.001H2.914l5.294-5.295-.707-.707L1 12.501l6.5 6.5.707-.707-5.293-5.293H24v-1z" data-name="Left"/></svg>
                </span>
                {{ $t('general.previous') }}
              </button>
              <div v-else></div>
              <button v-if="horseData.next" @click="goToHorse(horseData.next)" class="uppercase border-0 px-4 py-2 flex flex-row items-center font-roboto font-bold text-[9px] md:text-lg lg:text-sm xl:text-base">
                {{ $t('general.next') }}
                <span class="ml-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 25 25"><path style="fill:#232326" d="m17.5 5.999-.707.707 5.293 5.293H1v1h21.086l-5.294 5.295.707.707L24 12.499l-6.5-6.5z" data-name="Right"/></svg>
                </span>
              </button>
              <div v-else></div>
            </div>
            <div class="w-full h-auto px-0 relative">
              <div class="w-full">
                <Carousel :images="horseData.images" :auto-transition="true" ref="carousel"/>
              </div>
            </div>
            <!--video, description and bid table -->
            <div class="flex flex-col md:flex-row md:w-full md:px-6 my-6">
                <div class="md:h1/2 md:w-1/2">
                  <div class="aspect-w-16 aspect-h-9 md:mr-5 mb-5 md:mb-0">
                      <Carousel :images="horseData.horseVideos" ref="carouselVideos"/>
                    </div>
                </div>
                <!--table bid-->

                <div v-if="bidStatus == 'PREBID' && horseStatus == 'PREBID'" class="md:h1/2 md:w-1/2 bg-white rounded-xl font-roboto text-center">
                  <div
                    class="text-center w-full p-5 rounded-t-md"
                    style="background-color: #b99d61"
                  >
                    <p class="text-white font-bold text-sm">{{ $t('auction.highestPrebid') }}</p>
                    <span v-if="lastOffer" class="text-white font-bold text-2xl"
                      >${{ lastOffer }} USD</span
                    >
                    <div v-else>
                      <span class="text-white font-bold text-2xl"
                        >{{ $t('auction.beTheFirstPrebid') }}</span
                      >
                      <p class="text-white font-bold text-2xl">
                        $
                        {{ parseInt(horseData.final_amount).toLocaleString("en-US") }}
                        USD
                      </p>
                    </div>
                  </div>
                  <div class="flex justify-center rounded-t-md">
                    <div class="mx-10 md:mx-0 my-10">
                      <p class="uppercase">{{ $t('cron.timeLeft')}}</p>
                      <div class="flex flex-row md:items-center">
                        <div class="mx-5">
                          <p class="text-center text-5xl mb-2 font-bold">
                            {{ bidTime.days }}
                          </p>
                          <p class="text-center text-black">{{ $t('cron.days')}}</p>
                        </div>
                        <div class="mx-5">
                          <p class="text-center text-5xl mb-2 font-bold">
                            {{ bidTime.hours }}
                          </p>
                          <p class="text-center text-black">{{ $t('cron.hours')}}</p>
                        </div>
                        <div class="mx-5">
                          <p class="text-center text-5xl mb-2 font-bold">
                            {{ bidTime.minutes }}
                          </p>
                          <p class="text-center text-black">{{ $t('cron.minutes')}}</p>
                        </div>
                        <div class="mx-5">
                          <p class="text-center text-5xl mb-2 font-bold">
                            {{ bidTime.seconds }}
                          </p>
                          <p class="text-center text-black">{{ $t('cron.seconds')}}</p>
                        </div>
                      </div>
                      <p class="text-center text-xs text-custom-gold">
                        {{ $t('bids.prebidDiscountMsg')}}
                      </p>
                      <p class="text-center text-xs text-custom-gold">
                        {{ $t('bids.prebidWinnerDiscountMsg', { 'prebidWinnerDiscount': prebidWinnerDiscount }) }}
                      </p>
                      <p class="text-center text-xs text-red-400">
                        {{ $t('bids.discountByHorseMsg')}}
                      </p>
                    </div>
                  </div>
                  <div class="px-5 mt-5">
                    <p class="text-sm font-bold uppercase">PRE{{ $t('auction.bidOnThisLot') }}</p>
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
                          type="text"
                          v-model="formattedManualInputAmount"
                          @input="handleInput"
                          @blur="assignManualInputAmount()"
                          @keydown.enter.prevent
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
                            :button-text="$t('bids.offer')"
                          />
                        </div>
                      </div>
                      <div class="lg:hidden text-center mt-5 w-full">
                        <SubmitAuthenticatedButton
                          :enable-modal="enableModal"
                          :button-text="$t('bids.offer')"
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
                        {{ $t(`backMessages.${errorMessage}`,{"lastOffer": lastOffer}) }}
                      </div>
                    </div>
                  </div>
                  <div v-if="bids.length > 0">
                    <div class="mx-5">
                      <div class="border-b border-gray-300 my-4"></div>
                      <p class="text-sm font-bold uppercase">{{ $t('bids.prebidHistory')}}</p>
                      <div class="border-b border-gray-300 my-4"></div>
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
                <div v-if="bidStatus == 'BIDDING' && horseStatus == 'BIDDING'" class="md:h1/2 md:w-1/2 bg-white rounded-xl font-roboto text-center">
                  <p class="text-black font-bold text-2xl pt-8 px-10">
                    {{ $t('auction.horseAuctionIsLive') }}
                  </p>
                  <p v-if="hasBid" class="text-center text-xs text-custom-gold">
                    {{ $t('bids.youHaveDiscountMsg') }}
                  </p>
                  <p v-if="winnerEmail == $store.state.user?.user" class="text-center text-xs text-custom-gold">
                    {{ $t('bids.youAreTheDiscountWinnerMsg', {'prebidWinnerDiscount': prebidWinnerDiscount}) }}

                  </p>
                  <p class="text-black font-bold text-xl pt-5">
                    <NuxtLink :to="localePath(`/auction/live/${bidId}`)">
                      <button class="bg-gray-500 text-white px-4 py-2 rounded-md mx-3 mb-5">
                        {{ $t('auction.goToAuction') }}
                      </button>
                    </NuxtLink>
                  </p>
                </div>
                <div v-if="horseStatus == 'CLOSED PREBID'" class="md:h1/2 md:w-1/2 bg-white rounded-xl font-roboto text-center">
                  <p class="text-black font-bold text-2xl pt-8 px-10">
                    {{ $t('auction.horseAuctionIsComming') }}
                  </p>
                  <p v-if="hasBid" class="text-center text-xs text-custom-gold">
                    {{ $t('bids.youHaveDiscountMsg') }}
                  </p>
                  <p v-if="winnerEmail == $store.state.user?.user && horseStatus == 'CLOSED PREBID'" class="text-center text-xl text-green-800 font-bold">
                    {{ $t('bids.youAreTheDPrebidWinner') }}
                  </p>
                  <p v-if="winnerEmail == $store.state.user?.user && horseStatus == 'CLOSED PREBID'" class="text-center text-xs text-custom-gold">
                    {{ $t('bids.youAreTheDiscountWinnerMsg', {'prebidWinnerDiscount': prebidWinnerDiscount}) }}
                  </p>
                  <p v-if="bidStatus == 'BIDDING'" class="text-black font-bold text-xl pt-5">
                    <NuxtLink :to="localePath(`/auction/live/${bidId}`)">
                    <button class="bg-gray-500 text-white px-4 py-2 rounded-md mx-3 mb-5">
                      {{ $t('auction.goToAuction') }}
                    </button>
                  </NuxtLink>
                  </p>
                  <div v-else class="text-black font-bold text-xl pt-5">
                    {{ $t('auction.stayTuned') }}
                  </div>
                </div>
                <div v-if="horseStatus =='COMMING' && bidStatus == 'COMMING'" class="md:h1/2 md:w-1/2 bg-white rounded-xl font-roboto text-center">

                  <p class="text-black font-bold text-2xl pt-8 px-10">
                    {{ $t('auction.horsePrebidIsComming') }}
                  </p>
                  <div class="text-center w-full px-5 pt-8">
                      <p class="font-bold text-sm">{{ $t('auction.startingPrice') }}</p>
                      <span class="font-bold text-2xl"
                        >${{ horseData.final_amount }} USD</span
                      >
                      <div class="border-b border-gray-300 my-4"></div>
                    </div>
                    <div class="w-full rounded-t-lg px-5">
                      <p class="font-bold text-sm">{{ $t('auction.prebid') }}</p>
                      <span class="font-bold text-sm"
                        >{{ $t('auction.start') }} {{ PreBidDateFormat }}</span
                      >
                    </div>
                    <div class="w-full rounded-t-lg px-5">
                      <span class="font-bold text-sm"
                        >{{ $t('auction.end') }} {{ EndPreBidDateFormat }}</span
                      >
                    </div>
                    <div class="w-full rounded-t-lg px-5">
                      <div class="border-b border-gray-300 my-4"></div>
                      <p class="font-bold text-sm uppercase">{{ $t('home.auction.liveAuction') }}</p>
                      <span class="font-bold text-sm">{{ BidDateFormat }}</span>
                    </div>
                    <div
                      v-if="isUserAuthenticated"
                      class="text-center texthidden md:block mt-1"
                    >
                      <nuxt-link :to="localePath(`/auth/sign-up`)">
                        <button
                          class="w-full bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700 duration-100 flex-grow md:flex-grow-0"
                        >
                          {{ $t('auction.registerBefore') }} {{ BidDateFormat }}
                        </button>
                      </nuxt-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
            <!-- END NEW DESIGN-->

    <div class="md:hidden mx-5">
      <select v-model="openTab"
      class="w-full rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-none focus:ring-1 focus:ring-gray-500 mb-1"
      >
          <option :value="1">{{ $t('horse.tabs.horseData')}}</option>
          <option :value="2">{{ $t('horse.tabs.pedigree')}}</option>
          <option :value="3">{{ $t('horse.tabs.xRays')}}</option>
      </select>
    </div>
    <div class="hidden md:show md:flex md:flex-row h-16 p-0 mx-5 bg-[#D9D9D9]">
      <button
        class="w-48 h-16 font-bold"
        type="button"
        v-on:click="toggleTabs(1)"
        v-bind:class="{
          'text-gray-600 bg-[#D9D9D9]': openTab !== 1,
          'w-full text-black bg-white': openTab === 1
        }"
      >
        {{ $t('horse.tabs.horseData')}}
      </button>
      <button
        class="w-48 h-16 font-bold"
        type="button"
        v-on:click="toggleTabs(2)"
        v-bind:class="{
          'text-gray-600 bg-[#D9D9D9]': openTab !== 2,
          'w-full text-black bg-white': openTab === 2
        }"
      >
        {{ $t('horse.tabs.pedigree')}}
      </button>
      <button
        class="w-48 h-16 font-bold"
        type="button"
        v-on:click="toggleTabs(3)"
        v-bind:class="{
          'text-gray-600 bg-[#D9D9D9]': openTab !== 3,
          'w-full text-black bg-white': openTab === 3
        }"
      >
        {{ $t('horse.tabs.xRays')}}
      </button>
    </div>
    <div class="flex flex-col md:flex-row -mx-4">
      <div style="flex: 7">
        <div class="flex flex-wrap">
          <div class="w-full">
            <!-- Tabs -->
            <div
              class="relative flex flex-col min-w-0 break-words w-full mb-6"
            >
              <div class="px-4 flex-auto">
                <div class="tab-content tab-space">
                  <div
                    class="mb-4 bg-white p-5 mx-5"
                    v-bind:class="{
                      hidden: openTab !== 1,
                      block: openTab === 1
                    }"
                  >
                    <p>
                      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <div class="mr-4">
                          <span class="font-bold text-gray-700">{{ $t('horse.dateOfBirth') }}:</span>
                          <span class="text-gray-600">{{ horseData.BirthDate || "NA" }}</span>
                        </div>
                        <div class="mr-4">
                          <span class="font-bold text-gray-700">{{ $t('horse.age') }}:</span>
                          <span class="text-gray-600">{{ horseData.Age || "NA" }}</span>
                          <span class="text-gray-600">{{ $t('dates.years') }}</span>
                        </div>

                        <div class="mr-4">
                          <span class="font-bold text-gray-700">{{ $t('horse.registerNo') }}:</span>
                          <span class="text-gray-600">{{
                            horseData.registerNumber || "NA"
                          }}</span>
                        </div>
                        <div class="mr-4">
                          <span class="font-bold text-gray-700">{{ $t('horse.height') }}:</span>
                          <span class="text-gray-600">{{ horseData.Height || "NA" }}</span>
                          <span class="text-gray-600">m</span>
                        </div>
                        <div class="mr-4">
                          <span class="font-bold text-gray-700">{{ $t('horse.gender') }}:</span>
                          <span class="text-gray-600">{{ horseData.Genre || "NA" }}</span>
                        </div>
                        <div class="mr-4">
                          <span class="font-bold text-gray-700">{{ $t('horse.birthLocation') }}:</span>
                          <span class="text-gray-600">{{ horseData.Hatchery || "NA" }}</span>
                        </div>
                      </div>
                    </p>
                  </div>
                  <div
                    class="mb-4 bg-white p-5 mx-5"
                    v-bind:class="{
                      hidden: openTab !== 2,
                      block: openTab === 2
                    }"
                  >
                    <Pedigree :link="horseData.Pedigree" />
                    <p v-if="horseData.horseTelex">
                      {{ $t('horse.horseTelexMsg') }}
                      <a class="text-blue-400" :href="horseData.horseTelex" target="_blank"
                        >Horse Telex</a
                      >
                    </p>

                  </div>
                  <div
                    class="mb-4 bg-white p-5 mx-5"
                    v-bind:class="{
                      hidden: openTab !== 3,
                      block: openTab === 3
                    }"
                  >
                    <p>
                      <xRayGallery :images="horseData.xRayGallery" :horse_id="horseId"/>
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
</template>
<script>
import axios from "axios"
import moment from "moment"
import xRayGallery from "../../components/bid/xRayGallery.vue"
import Pedigree from "../../components/bid/horsePedigree.vue"
import Carousel from "../../components/Carousel.vue"
import Winner from "../../components/bid/winner.vue"
import Bids from "../../components/bid/detailsBid.vue"
import SubmitAuthenticatedButton from "../../components/bid/submitAuthenticatedButton.vue"
import getUserTokenOrDefault from "../../utils/getUserTokenOrDefault"
import modal from "../../components/bid/modal.vue"
import horseStatus from "../../components/bid/horseStatus.vue"
import statusBid from "../../components/bid/statusBid.vue"
import ReconnectingWebSocket from "reconnecting-websocket"

export default {
  components: {
    xRayGallery,
    Pedigree,
    Bids,
    Winner,
    Carousel,
    SubmitAuthenticatedButton,
    modal,
    horseStatus,
    statusBid
  },
  data() {
    return {
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
        Lot: "",
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
        horseTelex: "",
        next: null,
        previous: null,
        horseVideos: [],
      },
      bidStatus: "",
      liveURL: "",
      HorseName: "",
      lastOffer: "",
      intial_pre_bid_amount: "",
      horseId: "",
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
      formData: {
        subasta_id: "",
        horse_id: "",
        amount: "",
        pre_bid: false
      },
      openTab: 1,
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
      isIntentionalReconnectBid: false,
      isIntentionalReconnectAuction: false,
      isEditingAmount: false,
      firstUpdateAmount: true,
      inputAmount: "",
      formattedManualInputAmount: "",
      horseExternalId: "",
      winnerEmail: "",
      hasBid: false,
      subscribed:false,
      prebidWinnerDiscount: 5,
      commission: 0,
      taxes: 0,
      confirmedAmount: "",
    }
  },
  computed: {
    isUserAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
    setUser() {
      return this.$store.state.user
    },
    bidId() {
      return this.$route.query.id
    },
    horsePositionList() {
      return this.$route.query.horsePositionList
    },
    isCurrentDate() {
      const CurrentDate = new Date()
      const bidDate = new Date(this.BidDate)
      const endBidDate = new Date(this.EndBidDate)
      const preBidDate = new Date(this.PreBidDate)
      const EndPreBidDate = new Date(this.EndPreBidDate)
      if (CurrentDate >= preBidDate && CurrentDate <= EndPreBidDate) {
        return 1
      }
      if (CurrentDate >= bidDate && CurrentDate <= endBidDate) {
        return 2
      }
      if (CurrentDate >= bidDate) {
        return 3
      }
      return 0
    }
  },
  beforeDestroy() {
    this.finalize()
    this.$store.commit('setLayoutMode', 'default'); // reset to default when leaving the page
    this.$store.commit('setTextColorTopBar', 'text-white'); // reset to default when leaving the page
  },
  async mounted() {
    this.horseId = this.$route.query.horseId
    this.initilize()
  },
  methods: {
    async finalize() {
      clearInterval(this.timer)
      this.intentionalCloseSockets()
      this.$confetti.stop()
    },
    async initilize() {
      this.fetchGenres()
      this.init()
      this.startAuctionSocket()
      this.$store.commit('setLayoutMode', 'lightMode'); // set to 'lightMode' or 'default'
      this.$store.commit('setTextColorTopBar', 'text-black'); // set to 'text-black' or 'text-white'
      let subscribedEndpoint = "/horse/notifications/?horse=" + this.horseId
        let url = `${this.$config.baseURL}${subscribedEndpoint}`
        const token = getUserTokenOrDefault()

        await axios
          .get(url, {
            headers: {
              Authorization: `Token ${token}`
            },
          }).then((response) => { this.subscribed = true }).catch((error) => { })
    },

    async winnerConfetti() {
      await this.fetchWinner()
      if (this.horseStatus == "CLOSED" || this.horseStatus == "CLOSED PREBID") {
        if (this.winnerEmail == this.$store.state.user?.user) {
          this.$confetti.start()
          setTimeout(() => {
            this.$confetti.stop()
          }, 8000)
        }
      }
    },
    showManualInputAmount() {
      console.log('manual input activado')
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
    calculateCountdown() {
      if(!this.EndPreBidDate)
       return
      const now = new Date()
      const targetDate = new Date(this.EndPreBidDate)
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
    async intentionalCloseSockets() {
      this.closeBidSocket()
      this.closeAuctionSocket()
    },
    async closeBidSocket() {
      this.isIntentionalReconnectBid = true
      if (this.socket) {
        this.socket.close()
      }
      this.isIntentionalReconnectBid = false
    },
    async closeAuctionSocket() {
      this.isIntentionalReconnectAuction = true
      if (this.auctionSocket) {
        this.auctionSocket.close()
      }
      this.isIntentionalReconnectAuction = false
    },
    async init() {
      await this.fetchData()
      this.winnerConfetti()
      this.startBidSocket()
    },
    enableModal() {
      this.showModal = true
      if(this.manualInputAmount){
        this.confirmedAmount = this.manualInputAmount
      } else {
        this.confirmedAmount = this.inputAmount
      }
    },
    disableModal() {
      this.showModal = false
    },
    async startBidSocket() {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.socket.close()
      }
      const token = getUserTokenOrDefault()
      const url = `${this.$config.baseURLWS}/bids/${this.bidId}/horses/${this.horseId}/?token=${token}`
      this.socket = new ReconnectingWebSocket(url)
      this.socket.addEventListener("message", (event) => {
        const message = JSON.parse(event.data)
        if (message.error) {
          let msg = message.error
          msg = msg.replace(/\./, '')
          msg = msg.replace(/\d*\.?\d* USD/, 'lastOffer USD')
          this.errorMessage = msg

          setTimeout(() => {
            this.errorMessage = ""
          }, 6000)
          return
        }

        if (message.auction) {
          this.bidStatus = message.auction.status
        }

        if (message.bids) {
          this.bids = message.bids
        }

        if (message.has_bid) {
          this.hasBid = message.has_bid
        }

        if (message.prebids && message.prebids.length > 0) {
          this.bids = message.prebids
        }

        if (message.bid) {
          if (this.bids.length > 20) {
            this.bids.pop()
          }
          this.bids.unshift(message.bid)
        }

        if(message.delete) {
          const idToDelete = message.delete.id
          const key = this.bids.findIndex(bid => bid.id === idToDelete)
          if(key !== -1) {
            this.bids.splice(key, 1)
          }
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
            this.formData?.amount.replace(/,/g, "")
          )
          if (!this.isEditingAmount) {
            let InputValue = parseInt(this.inputAmount.replace(/,/g, ""))
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
          } else {
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
            this.horseData.final_amount,
            10
          ).toLocaleString("en-US")
          if (!this.isEditingAmount) {
            this.inputAmount = (parseInt(
              this.horseData.final_amount,
              10
            ) + 1000).toLocaleString("en-US")
          }
        } else {
          this.formData.amount = (1000).toLocaleString("en-US")
          this.inputAmount = (1000).toLocaleString("en-US")

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
      if (
        this.auctionSocket &&
        this.auctionSocket.readyState === WebSocket.OPEN
      ) {
        this.auctionSocket.close()
      }
      const url = `${this.$config.baseURLWS}/auction/${this.bidId}`
      this.auctionSocket = new ReconnectingWebSocket(url)
      this.auctionSocket.addEventListener("message", (event) => {
        const message = JSON.parse(event.data)
        if (message.error) {
          this.socketError = message.error
          return
        }
        if (message.horses && message.horses.length > 0) {
          message.horses.forEach((horse) => {
            if (horse.id == this.horseId) {
              this.horseStatus = horse.status
            }
          })
        }

        if (message.horse) {
          this.horseId
          if (message.horse.id == this.horseId) {
            this.horseStatus = message.horse.status
            const nextHorse = message.horse.next
            if (this.horseStatus == "CLOSED") {
              this.$toast.success(
                this.$t('auction.horseAuctionIsEnded')
              )
            }
            this.winnerConfetti()

            if (this.horseStatus == "BIDDING") {
              this.$confetti.stop()
            }

            if (nextHorse) {
              this.$router
                .replace({
                  query: { id: this.bidId, horseId: nextHorse }
                })
                .then(() => {
                  this.init()
                })
            }
          }
        }

        if (message.prebid) {
          if (message.prebid.horse.id == this.horseId) {
            const now = new Date()
            this.EndPreBidDate = new Date(message.prebid.horse.end_pre_bid)
            this.calculateCountdown()
          }
        }

        if (message.auction) {
          this.bidStatus = message.auction.status;
        }
      })
      this.auctionSocket.addEventListener("close", (event) => {
        if (event.code === 1006) {
          this.startBidSocket()
        }
      })
    },
    setInitialAmount() {
      if (this.formData?.amount) {
        this.formData.amount = this.horseData.final_amount
          ? this.horseData.final_amount
          : 0
      } else {
        const initialAmount = 1000
        this.formData.amount = initialAmount.toLocaleString("en-US")
      }
    },
    fetchHorseImages() {
      axios
        .get(this.$config.baseLaSilla + `/horses/${this.horseID}/images`)
        .then((response) => {
          const images = response.data.map((imageObj) => imageObj.url)
          this.horseData.images = images
          this.$refs.carousel.startCarousel()

        })
        .catch((error) => {
          console.error(error)
        })
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
      // let currentValue = parseInt(this.formData?.amount.replace(/,/g, ""))
      let currentValue = parseInt(this.inputAmount.replace(/,/g, ""))
      if (currentValue >= 30000) {
        currentValue += 500
      } else {
        currentValue += 1000
      }
      this.inputAmount = currentValue.toLocaleString("en-US")
    },
    substractThousand() {
      let currentValue = parseInt(this.inputAmount.replace(/,/g, ""))
      if (currentValue >= 30000) {
        currentValue -= 500
      } else {
        currentValue -= 1000
      }
      this.inputAmount = currentValue.toLocaleString("en-US")
    },
    parseFetchedAmount(value) {
      let lastOfferInt = parseInt(value?.replace(/,/g, ""))
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
      const dateformat = date ? moment(date).format("DD/MM/YYYY") : ""
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
        horse_id: this.horseId,
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

    async loadVideos(){
      console.log('load videos')
      const url = `${this.$config.baseURL}/horse-video?horse=${this.horseId}`

      this.loading = true
      await this.$axios
        .get(url, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
        .then((response) => {
          this.horseData.horseVideos = response.data
          this.$refs.carouselVideos.startCarousel()
          this.loading = false
        })
        .catch((error) => {
          this.loading = false;
        })
    },

    async fetchData() {
      let listSubastasEndpoint = `/horse/${this.horseId}/info`
      let url = `${this.$config.baseURL}${listSubastasEndpoint}`
      const token = getUserTokenOrDefault()
      await axios
        .get(url, {
          // headers: {
          //   Authorization: `Token ${token}`
          // }
        })
        .then((response) => {
          const horse = response.data
          //name
          this.HorseName = horse.external_data.name
          this.horseData.Lot = horse.local_data.lot
          //horse ID
          this.horseID = horse.external_data.id
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
          this.horseData.horseTelex = horse.local_data.horsetelex_url
          this.EndPreBidDate = horse.local_data.end_pre_bid
          this.horseData.next = horse.local_data.next
          this.horseData.previous = horse.local_data.previous
          this.loadVideos()
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
          this.PreBidDateFormat = this.formatted(auction.start_pre_bid)
          this.EndPreBidDateFormat = this.formatted(auction.end_pre_bid)
          //bid date
          this.BidDate = auction.start_bid
          this.EndBidDate = auction.end_bid
          this.BidDateFormat = this.formatted(auction.start_bid)
          this.EndBidDateFormat = this.formatted(auction.end_bid)
          this.bidStatus = auction.status
          this.timer = setInterval(this.calculateCountdown, 1000)
          this.prebidWinnerDiscount = auction.prebid_winner_discount
          this.commission = auction.commission
          this.taxes = auction.taxes
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
      const confirmedAmount = parseInt(this.confirmedAmount.replace(/,/g, ""))
      const user = JSON.parse(localStorage.getItem("setUser"))
      this.socket.send(
        JSON.stringify({
          bid_info: {
            amount: confirmedAmount
          },
          sender: {
            email: user.user
          }
        })
      )
      this.manualInputAmount = ""
      this.formattedManualInputAmount = ""
    },

    async subscribe() {
      let subscribeEndpoint = "/horse/notifications/?horse=" + this.horseId
      let url = `${this.$config.baseURL}${subscribeEndpoint}`
      const token = getUserTokenOrDefault()

      if(this.subscribed) {
        await axios.delete(url, { headers: { Authorization: `Token ${token}` },
          }).then((response) => { this.subscribed = false }).catch((error) => { })
      } else {
        await axios.post(url, [], { headers: { Authorization: `Token ${token}`},
          }).then((response) => { this.subscribed = true }).catch((error) => { })
      }
    },

    formatNumber(value) {
      return value.toLocaleString("en-US", { maximumFractionDigits: 0 })
    },

    handleInput(event) {
      console.log(event.target.value)
      const inputValue = event.target.value.replace(/[^0-9,]/g, "")
      console.log("inputValue",inputValue)
      const value = parseFloat(inputValue.replace(/,/g, ""))
      console.log('value',value)
      if (isNaN(value)) {
        this.manualInputAmount = ""
        this.formattedManualInputAmount = ""
      } else {
        this.manualInputAmount = String(value)
        this.formattedManualInputAmount = this.formatNumber(value)
      }
      console.log('this.manualInputAmount',this.manualInputAmount)
      console.log('this.formattedManualInputAmount',this.formattedManualInputAmount)
    },

    goToHorse(id) {
      let path = `/bids/bid/?id=${this.bidId}&horsePositionList=${id}&horseId=${id}`
      this.$router.push({ path: this.localePath(path) })
      this.horseId = id.toString()
      this.finalize()

      setTimeout(() => {
        this.initilize()
      }, 1000)
    },
  }
}
</script>
