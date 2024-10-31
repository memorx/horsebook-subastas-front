<template>
  <div>
    <Loading
        v-if="loading"
        class="fixed w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
      />
    <div v-if="bidStatus == 'BIDDING' && loading == false" class="bg-zinc-200 py-5 lg:px-5 md:px-3">
      <modal
        v-show="showModal"
        :amount="confirmedAmount"
        :submitForm="submitForm"
        :disableModal="disableModal"
        :status="horseStatus"
        :commission="commission"
        :taxes="taxes"
        :prebidWinner="prebidWinner?.email && prebidWinner?.email === this.$store.state.user?.user"
        :prebidWinnerDiscount="prebidWinnerDiscount"
        :hasPreBid="hasPreBid"
      />
      <NuxtLink :to="localePath('/')">
        <button
          class="uppercase border-1 ml-2 mb-3 border-black px-4 py-2 flex flex-row items-center font-roboto font-bold text-[9px] md:text-lg lg:text-sm xl:text-base">
            <span
              class="mr-2 w-1 md:w-3 md:mr-3 lg:w-2 lg:mr-2 xl:w-3 xl:mr-3 lg:mb-1">
              <img src="../../../public/arrow-black.png" /></span>
              {{ $t('general.home') }}
        </button>
      </NuxtLink>
      <div class="flex flex-wrap">
        <!-- First Column -->
        <div class="w-full sm:w-1/2 md:flex md:flex-col">
          <div class="w-full md:flex md:flex-col">
            <div class="mb-4 sm:mb-0 p-0 mx-5 pb-5">

            <!--
            <iframe
              class="aspect-content rounded-lg h-96 w-full"
              :src="`https://www.youtube.com/embed/${extractYouTubeId(videoUrl)}?rel=0`"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
            -->
            </div>
            <transition name="fade">
              <div v-if="horseID" class="fade">
                <div class="mb-4 sm:mb-0 p-0 mx-5 flex flex-col">
                  <h2 class="text-xl font-bold">
                    {{ HorseName }}
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
              <h2 class="text-2xl font-bold mb-1 mr-3 uppercase">
                {{ $t('auction.auction') }}
              </h2>
              <statusBid :status="bidStatus" />
            </div>
            <h4 class="text-sm mb-4">
              🇲🇽 Monterrey, Nuevo Leon
              <span class="text-xl font-bold mb-2 mr-1 ml-4">{{
                item.horses.length
              }}</span>
              <span>{{ $t('auction.' + (item.horses.length == 1 ? "horse" : "horses")) }}</span>
            </h4>
            <transition name="fade">
              <div v-if="horseID" class="fade text-lg font-bold flex flex-col">
                <div class="text-center uppercase mr-2">{{  $t('auction.horseBeingAuctioned') }}: </div>
                <NuxtLink :to="`/bids/bid?id=${bidId}&horsePositionList=0&horseId=${horseID}&from=auction`" class="mb-2">
                  <div class="mx-auto bg-black py-3 px-5 text-white rounded-3xl flex justify-between items-center gap-4 w-fit">
                    <p class="text-lg md:text-xl font-bold uppercase bg-gradient-to-r from-[#efb810] via-[#fff3c4] via-[#efb810] via-[#fff3c4] to-[#efb810] bg-clip-text text-transparent">
                      {{ HorseName }}
                    </p>
                  </div>
                </NuxtLink>
              </div>
            </transition>
          </div>
          <!-- Second Row in the second column -->
          <div class="bg-white mx-5 rounded-lg md:flex-grow">
            <transition name="fade">
              <div v-if="!horseID" class="fade p-8">
                  <h2 v-if="yourAreTheWinner" class="font-bold text-4xl mx-auto text-center text-green-700 pb-6">
                      {{ $t('auction.winnerCongratsMsg',{ 'wonHorse': wonHorse,  'lastOffer': lastOffer}) }}
                  </h2>
                  <h2 v-if="!yourAreTheWinner && horseStatus == 'CLOSED'" class="font-bold text-4xl mx-auto text-center text-red-700 pb-6">
                    {{ $t('auction.winnerMsg',{'winnerName': winnerName, 'wonHorse': wonHorse, 'lastOffer': lastOffer}) }}
                  </h2>
                  <h2 class="font-bold text-3xl mx-auto text-center text-yellow-600">
                      {{ $t('auction.stayWithUsMsg') }}
                  </h2>
                  <table v-if="!horseID && item?.horses?.length" class="w-full leading-normal pt-5">
                    <thead>
                        <tr>
                            <th colspan="2"
                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                {{ $t('auction.horses') }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="horse in item.horses" :key="horse.id" v-if="horse.local_data.show">
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <div class="flex flex-col md:flex-row items-center md:items-center">
                                    <div class="w-16 h-16 flex-shrink-0">
                                        <img v-if="horse.external_data.image_path" class="w-full h-full rounded-full"
                                        :src="apiImg + horse.external_data.image_path"
                                            alt="" />
                                        <svg class="w-full h-full rounded-full" v-else xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" version="1.1" style="shape-rendering:geometricPrecision;text-rendering:geometricPrecision;image-rendering:optimizeQuality;" viewBox="0 0 230 166.25" x="0px" y="0px" fill-rule="evenodd" clip-rule="evenodd">
                                        <circle cx="115" cy="100" r="140" fill="#d1d1d1" />
                                            <defs><style type="text/css">
                                            .fil0 {fill:black }
                                        </style></defs><g><path class="fil0" d="M201 7c-4,2 -7,5 -11,8 0,0 -2,8 -4,11 0,1 2,2 2,2 2,-3 13,-11 13,-21z"/><path class="fil0" d="M169 21c-12,0 -16,-12 -30,-15 -18,0 -34,23 -56,-6 16,37 45,8 56,27 -17,-14 -44,13 -74,-1 20,18 29,4 48,11 0,0 -13,-1 -24,1 -24,4 -38,-1 -49,-24 4,15 11,26 25,31 -44,0 -22,-40 -53,-41 21,6 13,36 33,48 -33,-3 -15,-24 -45,-32 23,7 11,35 37,53 6,4 0,12 4,21 4,9 39,7 48,-2 10,-8 -18,-13 -23,-21 -4,-9 -4,-22 12,-21 25,0 33,16 58,6 -8,1 -18,-3 -19,-8 -3,-4 0,-8 6,-4 7,6 24,4 24,4 -27,-17 14,-8 19,-7 -6,-11 11,-10 16,-11 0,0 -9,6 -11,12 13,-3 24,22 27,15 13,10 22,58 -7,19 4,18 42,35 27,46 0,0 0,0 -1,1 0,0 0,0 0,0l0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0c2,1 5,0 6,-2 1,-7 0,-14 -3,-19 4,4 5,9 4,15 2,0 2,-3 3,-5 4,-6 3,-10 0,-16 -6,-10 -23,-31 -24,-42 0,-8 -2,-6 -5,-11 -5,-7 -2,-9 -14,-17 5,-7 9,-27 6,-26 -4,2 -15,16 -21,21zm28 29c1,1 1,3 0,4 0,0 1,0 1,-1 0,4 -3,3 -4,2 0,1 6,2 5,-1 0,0 1,0 2,0 -1,0 -2,-1 -2,-2 0,0 -1,0 -1,0 1,0 2,-1 2,-1 -2,0 -2,0 -3,-1zm-5 3c0,-2 0,-3 1,-3 0,0 -1,0 -2,0 2,-2 6,-2 7,-1 0,0 0,0 0,0 -1,0 -1,0 -1,0 0,0 0,0 0,0 2,1 3,0 4,0 0,0 -2,0 -2,0 0,0 0,0 -1,-1 -2,0 -4,0 -5,0 0,0 0,0 0,0 0,0 -1,0 -1,0 0,0 0,0 1,0 -1,0 -2,0 -2,0 0,0 1,1 1,1 -1,0 -2,0 -2,-1 0,1 0,1 0,1 -1,0 -1,0 -2,-2 0,2 2,4 3,3 0,1 0,2 1,3zm-3 -50c0,2 0,10 -3,16 0,1 -5,2 -5,2 0,0 5,-7 8,-18zm37 96c-1,2 -1,6 -1,8 1,3 1,1 1,1 1,0 1,0 1,0 1,-2 1,-4 0,-6 0,-1 0,-1 -1,-1 -1,0 0,-1 0,-2z"/><path class="fil0" d="M153 90c-17,-7 -43,46 -45,42 0,-22 20,-47 51,-66 -20,24 24,38 29,16 0,0 2,10 2,15 1,5 14,13 14,13 2,2 2,6 5,8 0,0 -2,-3 -2,-8 3,8 9,9 9,11 0,2 -2,3 -3,3 -1,0 -6,1 -8,-2 -1,0 -4,-7 -4,-7 -6,3 -14,-14 -18,-16 -6,-3 -24,0 -30,-9z"/></g></svg>
                                    </div>
                                    <div class="w-full mt-4 text-center md:ml-3 md:text-left">
                                        <p class="text-center font-bold">{{ horse.external_data.name }}</p>
                                    </div>
                                </div>
                            </td>
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <div class="flex flex-col mt-2">
                                  <horseStatus
                                    :status="horse.local_data.status"
                                    :bid-status="bidStatus"
                                  />
                                  <div class="flex text-center mx-auto mt-2">
                                      <div v-if="horse.local_data.status == 'COMING' || horse.local_data.status == 'CLOSED PREBID'"
                                          class="text-black">
                                          {{ formattedFinalAmount(horse.local_data.final_amount) }}
                                      </div>
                                      <div v-if="horse.local_data.status == 'BIDDING' || horse.local_data.status == 'PREBID'"
                                          class="text-black font-bold blink center">
                                          {{ formattedFinalAmount(horse.local_data.final_amount) }}
                                      </div>
                                      <div v-if="horse.local_data.status == 'CLOSED'"
                                          class="text-gray-800">
                                          {{ formattedFinalAmount(horse.local_data.final_amount) }}
                                      </div>
                                  </div>
                                  <Link :href="`/bids/bid/?from=auction&id=${bidId}&horsePositionList=${horse.id}&horseId=${horse.local_data.id}`" class="mx-auto mt-4 bg-black hover:bg-gray-950 text-white font-normal py-2 px-4 rounded-md">
                                      Ver detalles
                                  </Link>
                              </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
              </div>



              <div v-else class="w-full flex-col mt-4 md:mt-0 bg-white rounded-lg">
                <div
                  class="text-center w-full rounded-t-lg p-5 bg-gradient-to-r from-[#efb810] via-[#fff3c4] via-[#efb810] via-[#fff3c4] to-[#efb810]"

                >
                  <p class="text-black font-bold text-sm uppercase">
                    {{ $t('auction.highestOffer') }}
                  </p>
                  <span v-if="lastOffer" class="text-black font-bold text-2xl"
                    >${{ lastOffer }} USD</span
                  >
                  <span v-else class="text-black font-bold text-2xl uppercase">
                    {{ $t('auction.beTheFirst') }}
                  </span>
                </div>
                <div class="px-5 mt-5">
                  <p class="text-sm font-bold uppercase">
                    {{ $t('auction.bidOnThisLot') }}
                  </p>
                  <form @submit="submitForm" v-if="isUserAuthenticated && isUserAbleToBid">
                    <div class="flex items-center space-x-2 mb-1">
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
                        @click="addThousand()"
                      >
                        +
                      </button>

                      <div class="hidden lg:block pt-2">
                        <SubmitAuthenticatedButton
                          :enable-modal="enableModal"
                          :button-text="$t('bids.offer')"
                        />
                      </div>
                    </div>
                    <div class="lg:hidden text-center mt-5 w-full h-24 md:h-auto">
                      <SubmitAuthenticatedButton
                        :enable-modal="enableModal"
                        :button-text="$t('bids.offer')"
                      />
                    </div>
                  </form>
                  <div v-else-if="!isUserAuthenticated" class="py-5 text-center w-full">
                    <nuxt-link :to="loginPath" class="text-blue-500 font-bold" >
                      {{ $t('auction.notLoggedInMsg') }}
                    </nuxt-link>
                  </div>
                  <div v-else-if="!isUserAbleToBid" class="my-5 py-5 text-center w-full text-red-600 border-1 border-dashed border-red-700">
                    {{ $t('auction.notAuthorizedMsg') }} {{ adminPhone?.replace(/\s/gi, '') }}
                  </div>
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
                <div>
                  <p v-if="hasPreBid" class="text-center text-xs text-custom-gold">
                    {{ $t('bids.youHaveDiscountMsg') }}
                  </p>
                </div>
                <div v-if="prebidWinner?.email && prebidWinner?.email === this.$store.state.user?.user" class="mb-2">
                  <p class="text-center text-lg text-green-900 font-bold">
                    {{ $t('bids.youAreTheDPrebidWinner') }}
                  </p>
                  <p class="text-center text-lg text-green-900">
                    {{ $t('bids.prebidWinnerDiscountMsg', { 'prebidWinnerDiscount': prebidWinnerDiscount }) }}
                  </p>
                  <p class="text-center text-base text-red-600">
                    {{ $t('bids.discountByHorseMsg')}}
                  </p>
                </div>
                <div v-else-if="prebidWinner?.country">
                  <p class="text-center text-lg text-black uppercase font-bold">
                    {{ $t('auction.preBidWinnerMsg', { 'winnerName': prebidWinner.country.name }) }}
                  </p>
                </div>
                <div v-if="bids && bids.length > 0 && bids[0].user_profile.email === this.$store.state.user?.user" class="flex flex-row font-bold text-green-800 items-center justify-center" >
                  🏆 {{ $t(`bids.yourAreWinningAuction`) }}
                </div>
                <div v-if="bids.length > 0">
                  <div class="mx-5">
                    <div class="border-b border-gray-300 my-4"></div>
                    <p class="text-sm font-bold uppercase"> {{ $t('auction.bids') }} </p>
                  </div>
                  <div class="px-4" style="flex: 5">
                    <Bids
                      ref="detailsBid"
                      :bidId="bidId"
                      :horseID="horseID"
                      :bids="this.bids"
                      :hasBid="this.hasBid"
                      :privateInformation="this.privateInformation"
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
              <div v-if="horseData.BirthDate" class="mr-4">
                <span class="font-bold text-gray-700">{{ $t('horse.dateOfBirth') }}:</span>
                <span class="text-gray-600">{{ horseData.BirthDate || "NA" }}</span>
              </div>
              <div v-if="horseData.Age" class="mr-4">
                <span class="font-bold text-gray-700">{{ $t('horse.age') }}:</span>
                <span class="text-gray-600">{{ horseData.Age || "NA" }}</span>
                <span class="text-gray-600">{{ $t('dates.years') }}</span>
              </div>

              <div v-if="horseData.registerNumber" class="mr-4">
                <span class="font-bold text-gray-700">{{ $t('horse.registerNo') }}:</span>
                <span class="text-gray-600">{{
                  horseData.registerNumber || "NA"
                }}</span>
              </div>
              <div v-if="horseData.Height" class="mr-4">
                <span class="font-bold text-gray-700">{{ $t('horse.height') }}:</span>
                <span class="text-gray-600">{{ horseData.Height || "NA" }}</span>
                <span class="text-gray-600">m</span>
              </div>
              <div v-if="horseData.Genre" class="mr-4">
                <span class="font-bold text-gray-700">{{ $t('horse.gender') }}:</span>
                <span class="text-gray-600">{{ horseData.Genre || "NA" }}</span>
              </div>
              <div v-if="horseData.Hatchery" class="mr-4">
                <span class="font-bold text-gray-700">{{ $t('horse.birthLocation') }}:</span>
                <span class="text-gray-600">{{ horseData.Hatchery || "NA" }}</span>
              </div>
            </div>
          </div>
          <div class="mt-4 bg-white p-5 mx-5 rounded-lg">
            <div class="mb-4">
              <span class="text-2xl font-bold">{{ $t('horse.tabs.pedigree') }}</span>
            </div>
            <Pedigree :link="horseData.Pedigree" />
            <p v-if="horseData.horseTelex">
              {{ $t('horse.horseTelexMsg') }}
              <a class="text-blue-400" :href="horseData.horseTelex" target="_blank"
                >Horse Telex</a
              >
            </p>
          </div>
          <div class="mt-4 flex flex-col md:flex-row">
            <div style="flex: 7">
            <div class="flex flex-wrap">
              <div class="w-full">
                <!-- Tabs -->

                <div
                  class="relative flex flex-col min-w-0 break-words w-full mb-6 rounded"
                >
                  <div class="flex-auto">
                    <div class="tab-content tab-space">
                      <div
                        class="mb-4 bg-white p-5 mx-5 rounded-lg"
                      >
                        <div class="mb-4">
                          <span class="text-2xl font-bold">{{ $t('horse.tabs.xRays') }}</span>
                        </div>
                        <p>
                          <xRayGallery :images="horseData.xRayGallery" :horse_id="horseID" :horse_name="HorseName"/>
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
    <div v-else-if="bidStatus == 'CLOSED'" class="flex flex-col m-1 md:m-20 gap-4 mt-3">
      <h2 class="font-bold text-3xl mx-auto text-center text-yellow-600 md:w-[600px]">
          {{ $t('auction.auctionEndMsg')}}
      </h2>
      <NuxtLink :to="`/`" class="mx-auto">
        <button
          class="uppercase border-1 border-black ml-2 mb-3 px-4 py-2 flex flex-row items-center font-roboto font-bold text-[9px] md:text-lg lg:text-sm xl:text-base bg-white">
            <span
              class="mr-2 w-1 md:w-3 md:mr-3 lg:w-2 lg:mr-2 xl:w-3 xl:mr-3 lg:mb-1">
              <img src="../../../public/arrow-black.png" /></span>
              {{ $t('general.home') }}
        </button>
      </NuxtLink>
    </div>
    <div v-else-if="bidStatus != ''" class="flex md:flex-col m-1 md:m-20 gap-4">
      <h2 class="font-bold text-3xl mx-auto text-center text-red-600 md:w-[600px]">
          {{ $t('auction.noAvailableMsg') }}
      </h2>
      <NuxtLink :to="`/`">
        <button
          class="uppercase border-1 ml-2 mb-3 border-black px-4 py-2 flex flex-row items-center font-roboto font-bold text-[9px] md:text-lg lg:text-sm xl:text-base">
            <span
              class="mr-2 w-1 md:w-3 md:mr-3 lg:w-2 lg:mr-2 xl:w-3 xl:mr-3 lg:mb-1">
              <img src="../../../public/arrow-black.png" /></span>
              {{ $t('general.home') }}
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
import Swal from 'sweetalert2'
import { extractYouTubeId } from '~/utils/youtubeUtils'
import DraggableHorseList from '~/components/bid/draggableHorseList.vue'

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
    DraggableHorseList,
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
      bidStatus: "",
      bidImage: "",
      videoUrl: "",
      socket: null,
      auctionSocket: null,
      lastOffer: "",
      showInput: false,
      manualInputAmount: "",
      formattedManualInputAmount: "",
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
      HorseName: "",
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
        0: "Yegua", //"Potranca"
        1: "Yegua", //"Vacía",
        2: "Yegua", //"Gestante",
        3: "Yegua", //"Portadora",
        4: "Yegua", //"Donadora",
        5: "Yegua", //"Nana",
        6: "Macho", //"Potro",
        7: "Macho", //"Entero",
        8: "Macho", //"Semental",
        9: "Macho", //"Semental aprobado",
        10: "Macho Castrado", //"Castrado",
        11: "Macho", //"Nano"
      },
      socket: null,
      bids: [],
      preBids: [],
      errorMessage: "",
      winner: {},
      winnerName: "",
      prebidWinner: {},
      isEditingAmount: false,
      inputAmount: "",
      wonHorse: "",
      yourAreTheWinner: false,
      hasBid: false,
      hasPreBid: false,
      commission: 0,
      taxes: 0,
      confirmedAmount: "",
      prebidWinnerDiscount: 0,
      privateInformation: true,
      increments: [],
      incrementHistory: [],
      adminPhone: "",
    }
  },
  computed: {
    isUserAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
    isUserAbleToBid() {
      return this.$store.state.isUserAbleToBid;
    },
    loginPath() {
      const currentPath = this.$route.fullPath;
      return this.localePath(`/auth/login?redirect=${encodeURIComponent(currentPath)}`);
    }
  },
  async created() {
    this.adminPhone = await this.fetchAdministratorPhone()
    const auctionId = this.$route.params.id
    this.bidId = auctionId
    await this.getDetailsAuction()
    await this.loadIncrements()
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
    if (this.$confetti && typeof this.$confetti.stop === 'function') {
      this.$confetti.stop()
    } else {
      console.warn('Confetti plugin not available or stop method not found')
    }
  },

  methods: {

    async winnerConfetti() {
      await this.fetchWinner()
      this.wonHorse = this.HorseName

      if (this.winnerEmail == this.$store.state.user?.user && this.winnerEmail && this.$store.state.user?.user) {
        this.$confetti.start()
        this.yourAreTheWinner = true
        setTimeout(() => {
            this.$confetti.stop()
          }, 8000)
      } else {
        this.yourAreTheWinner = false
        let winnerName = this.winner.name + ' ' + this.winner.fathers_surname
        if(winnerName === 'IN PERSON') {
          this.winnerName = this.$t('bids.IN PERSON')
        } else if(this.winner.name == 'Call') {
          this.winnerName = this.$t('bids.Call')
        } else {
          this.winnerName = this.winner.name
        }
      }
    },

    showManualInputAmount() {
      let baseIncrement = this.getIncrement()
      this.manualInputAmount = String(baseIncrement)
      this.formattedManualInputAmount = this.formatNumber(baseIncrement)

      this.showInput = true
      this.$nextTick(() => {
        this.$refs.manualInputAmount.focus()
        this.$refs.manualInputAmount.select()
      })
    },

    assignManualInputAmount() {
      if(!this.validateManualAmount())
        return

      this.showInput = false
      if (this.inputAmount <= this.manualInputAmount){
        this.amountBase = this.manualInputAmount
      }

    },

    validateIncrement(currentValue, amount) {
      //// console.log('validateIncrement', currentValue, amount)
      if(currentValue < amount) {
        currentValue = this.addIncrement(currentValue)
        return this.validateIncrement(currentValue, amount)
      } else {
          return currentValue
      }

    },

    addIncrement(currentValue) {
      let incrementAmount = this.calculateIncrement(currentValue)
      return currentValue + incrementAmount
    },

    validateManualAmount() {
      let lastOffer = parseInt(this.lastOffer.replace(/,/g, ""))
      let manualInputAmount = parseInt(this.manualInputAmount.replace(/,/g, ""))

      if (!manualInputAmount)
        return false

      let minAmount = this.addIncrement(lastOffer)
      if (manualInputAmount >= minAmount) {
        return true
      } else {
        Swal.fire({
          title: this.$t('bids.incrementValidationErrorTitle'),
          text: this.$t('bids.incrementValidationError', { "suggestedAmount": '$'+this.formatNumber(minAmount) }),
          icon: 'error',
          showCancelButton: true,
          confirmButtonText: this.$t('general.yes'),
          cancelButtonText: this.$t('general.cancel')
        }).then((result) => {
          this.showInput = false
          if (result.isConfirmed) {
            this.manualInputAmount = String(minAmount)
            this.formattedManualInputAmount = this.formatNumber(minAmount)
            this.enableModal()
          } else {
            this.resetAmounts()
          }
        })
        return false
      }
    },

    resetAmounts() {
      let baseIncrement = this.getIncrement()
      this.inputAmount = this.formatNumber(baseIncrement)
      this.manualInputAmount = ""
      this.formattedManualInputAmount = ""
      this.incrementHistory = []
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
      if(this.manualInputAmount){
        this.confirmedAmount = this.manualInputAmount
      } else {
        this.confirmedAmount = this.inputAmount
      }
    },

    disableModal() {
      this.showModal = false
      this.resetAmounts()
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

          let msg = message.error
          msg = msg.replace(/\./, '')
          msg = msg.replace(/\d*\.?\d* USD/, 'lastOffer USD')
          this.errorMessage = msg

          setTimeout(() => {
            this.errorMessage = ""
          }, 6000)
          return
        }
        if (message.bids) {
          this.bids = message.bids.slice(0, 20)
        }

        if (message.has_bid) {
          this.hasBid = message.has_bid
        }

        if (message.has_prebid) {
          this.hasPreBid = message.has_prebid
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

          this.inputAmount = this.getIncrement().toLocaleString("en-US")


        } else {
          if (this.horseData.final_amount != "") {

            this.lastOffer = parseInt(
              this.horseData.final_amount
            ).toLocaleString("en-US")

            this.formData.amount = this.getIncrement().toLocaleString("en-US")

            this.inputAmount = this.getIncrement().toLocaleString("en-US")

            if (!this.isEditingAmount) {

              this.inputAmount = this.getIncrement().toLocaleString("en-US")
            }

          } else {
            this.formData.amount = (1000).toLocaleString("en-US")
            this.inputAmount = (1000).toLocaleString("en-US")

        }
      }

        // after made the first update, don't trigger again if the user is focus on the input
        if (this.firstUpdateAmount) {
          this.firstUpdateAmount = false
          this.isEditingAmount = true
        }
      })

    },

    async startAuctionSocket() {
      const url = `${this.$config.baseURLWS}/auction/${this.bidId}`;
      this.auctionSocket = new ReconnectingWebSocket(url);

      this.auctionSocket.addEventListener("message", (event) => {
        const message = JSON.parse(event.data);
        if (message.error) {
          this.socketError = message.error;
          return;
        }

        if (message.horses && message.horses.length > 0 && this.item && this.item.horses) {
          this.item.horses = this.item.horses.map(horse => {
            const updatedHorse = message.horses.find(h => h.id === horse.local_data.id);
            if (updatedHorse) {
              return {
                ...horse,
                local_data: {
                  ...horse.local_data,
                  status: updatedHorse.status,
                  final_amount: updatedHorse.final_amount
                }
              };
            }
            return horse;
          });

          if (Array.isArray(this.item.horses)) {
            this.item.horses.forEach((horse, key) => {
              const curHorse = message.horses.find(item => item.status === 'BIDDING');
              if (curHorse && curHorse.id !== this.horseID) {
                this.horseID = curHorse.id;
                if (this.$confetti && typeof this.$confetti.stop === 'function') {
                  this.$confetti.stop();
                } else {
                  console.warn('Plugin de confeti no disponible o método stop no encontrado');
                }
                this.wonHorse = "";
                this.winner = "";
                this.prebidWinner = {};
                this.closeBidSocket();
                this.fetchData();
                this.fetchprebidWinner();
              }
            });
          }
        }

        if (message.horse) {
          const horse = message.horse;

          if (this.item && this.item.horses) {
            this.item.horses = this.item.horses.map(h => {
              if (h.local_data.id === horse.id) {
                return {
                  ...h,
                  local_data: {
                    ...h.local_data,
                    status: horse.status,
                    final_amount: horse.final_amount
                  }
                };
              }
              return h;
            });
          }

          if (horse.id === this.horseID && horse.status === 'CLOSED') {
            // El caballo actual se ha cerrado, restablecer horseID y cerrar el socket.
            this.horseStatus = 'CLOSED';
            this.winnerConfetti();
            this.horseID = null;
            this.closeBidSocket();
          } else if (horse.id !== this.horseID && horse.status === 'BIDDING') {
            // El caballo actual está en proceso de subasta, actualizar horseID, fetch data y reiniciar el socket.
            this.horseID = horse.id;
            if (this.$confetti && typeof this.$confetti.stop === 'function') {
              this.$confetti.stop();
            } else {
              console.warn('Plugin de confeti no disponible o método stop no encontrado');
            }
            this.wonHorse = "";
            this.winner = {};
            this.firstUpdateAmount = true;
            this.isEditingAmount = false;
            this.hasBid = false;
            this.hasPreBid = false;
            this.closeBidSocket();
            this.fetchData();
          }
        }

        if (message.auction) {
          this.bidStatus = message.auction.status;
        }

        this.fetchprebidWinner();
        this.fetchWinner();
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
          this.commission = response.data.commission
          this.taxes = response.data.taxes
          this.prebidWinnerDiscount = response.data.prebid_winner_discount
          this.privateInformation = response.data.private_information

        })
        .catch((error) => {
          // console.log(error)
          this.loading = false
        })
    },

    showHorseDetails(horse) {
      this.$set(horse, "showDetails", !horse.showDetails)
    },

    extractYouTubeId,
    getIncrement() {
      let lastOffer = parseInt(this.lastOffer.replace(/,/g, ""))
      let incrementAmount = this.calculateIncrement(lastOffer)
      return incrementAmount + lastOffer
    },

    addThousand() {
      let currentValue = parseInt(this.inputAmount.replace(/,/g, ""))
      let incrementAmount = this.calculateIncrement(currentValue)
      currentValue += incrementAmount
      this.incrementHistory.push(currentValue)
      this.inputAmount = currentValue.toLocaleString("en-US")
    },

    substractThousand() {
      let amount
      if (this.incrementHistory.length === 0) {
        amount = this.getIncrement()
      } else {
        let currentValue = parseInt(this.inputAmount.replace(/,/g, ""))
        amount = this.incrementHistory.pop()
        if(currentValue === amount)
          amount = this.incrementHistory.pop()
      }
      this.inputAmount = amount.toLocaleString("en-US")
    },

    toggleTabs: function (tabNumber) {
      this.openTab = tabNumber
    },

    calculateAge() {
      const today = moment()
      const birthDate = moment(this.birthDate)
      const yearsDiff = today.year() - birthDate.year()

      return yearsDiff ? yearsDiff : 1
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
        pre_bid: this.horseStatus === "CLOSED" ? false : true
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

    async fetchprebidWinner() {
      let winnerEndpoint = "/subastas/prebid-winner/"
      let url = `${this.$config.baseURL}${winnerEndpoint}`

      let params = {
        subasta_id: this.bidId,
        horse_id: this.horseID,
        pre_bid: true
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
          this.prebidWinner = response.data.user_profile
        })
        .catch((error) => {
          // Handle errors
          console.error("Error fetching prebid winner:", error)
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
            this.HorseName = horse.external_data.name
            //horse ID
            this.externalHorseID = horse.external_data.id
            this.horseIDForm = horse.local_data.id
            //horse Description
            //genre
            this.horseData.Genre =
              this.genreMapping[horse.external_data.classification_sex] || ""
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
            // console.log('se abre de nuevo el socket')
      }catch(e) {
        // console.log(e)
      }
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

    async loadIncrements(){

      if(!this.bidId) return

      const url = `${this.$config.baseURL}/amount-limit-increment?auction=${this.bidId}`
      this.loading = true
      await this.$axios
          .get(url, {
              headers: {
                  'Content-Type': 'multipart/form-data',
              }
          })
          .then((response) => {
              this.increments = response.data.sort((a, b) => a.limit - b.limit)
              this.loading = false
          })
          .catch((error) => {
              this.loading = false
          })
    },

    formatNumber(value) {
      return value.toLocaleString("en-US", { maximumFractionDigits: 0 })
    },

    calculateIncrement(currentValue) {
      for (let i = 0; i < this.increments.length; i++) {
        if (currentValue < this.increments[i].limit) {
          return this.increments[i].increment
        }
      }
      return (this.increments.length > 0 ? this.increments[this.increments.length - 1].increment : 1000)
    },


    handleInput(event) {
      const inputValue = event.target.value.replace(/[^0-9,]/g, "")
      const value = parseFloat(inputValue.replace(/,/g, ""))

      if (isNaN(value)) {
        this.manualInputAmount = ""
        this.formattedManualInputAmount = ""
      } else {
        this.manualInputAmount = String(value)
        this.formattedManualInputAmount = this.formatNumber(value)
      }
    },
    goToDetail(horse, index) {
      let path = `/bids/bid/?from=auction&id=${this.bidId}&horsePositionList=${index}&horseId=${horse.local_data.id}`
      this.$router.push({ path: this.localePath(path) })
    },

    formattedFinalAmount(value) {
        if (typeof value === 'number' || (typeof value === 'string' && !isNaN(value))) {
        // Convierte el valor a un número
        const numericValue = parseFloat(value);

        if (!isNaN(numericValue)) {
          // Formatea el valor numérico como moneda sin decimales
          return numericValue.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }) + ' USD';
        }
      }

      return '';
    },

    async fetchAdministratorPhone() {
      const url = `${this.$config.baseURL}/contact/info/`
      const token = getUserTokenOrDefault()

      if (token) {
        try {
          const response = await axios.get(url, {
            headers: { Authorization: `Token ${token}` }
          })
          return response.data.app_user_profile.phone.replace("T. ", "")
        } catch (error) {
          console.error("Error retrieving administrator phone: ", error)
          return ""
        }
      }
      return ""
    },

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
