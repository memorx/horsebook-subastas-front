<template>
  <div class="bg-black">
    <modal
      v-show="showModal"
      :amount="confirmedAmount"
      :submitForm="submitForm"
      :disableModal="disableModal"
      :status="horseStatus"
      :commission="commission"
      :taxes="taxes"
    />

    <!-- Encabezado común -->
    <div class="w-full h-auto flex flex-col justify-start pt-4 px-6 text-white">
      <div class="flex-grow rounded-lg mb-4 h-full ">
        <div class="w full h-auto mx-6 my-4 md:my-8">
          <button
            class="uppercase border-1 border-white px-4 py-2 flex flex-row items-center font-roboto font-bold text-[9px] md:text-lg lg:text-sm xl:text-base"
            @click="() => backTo()"
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
            <button v-if="isUserAuthenticated" class="text-lg text-left ml-3" :class="subscribed? 'text-yellow-500' : 'text-white'">
              <i class="icon fas fa-bell" v-on:click="() => {subscribeMe()}" :title="!subscribed? 'Activar notificaciones' : 'Desactivar notificaciones'"></i>
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

        <!-- Contenido principal -->
        <div class="flex flex-col md:flex-row md:w-full my-6">
          <!-- Columna izquierda (video) -->
          <div class="md:h1/2 md:w-1/2 rounded-lg border border-white mr-5">
            <div class="aspect-w-16 md:mr-5 mb-5 md:mb-0">
              <Carousel :images="horseData.horseVideos" ref="carouselVideos"/>
            </div>
          </div>

          <!-- Columna derecha (información de la subasta) -->
          <div class="md:h1/2 md:w-1/2 bg-white rounded-xl font-roboto text-center">
            <!-- Estado: COMING -->
            <div v-if="bidStatus == 'COMING' && horseStatus == 'COMING'">
              <h1 v-if="!counterIsZero(preBidTime)" class="text-center text-sm font-bold pt-10">
                {{ $t('auction.preOfferStartMsg')  }}
              </h1>
              <div v-if="!counterIsZero(preBidTime)" class="flex justify-center">
                <div class="mx-10 my-10">
                  <div class="flex flex-row md:items-center">
                    <div class="mx-5">
                      <p class="text-center text-xl md:text-5xl mb-2 font-bold">
                        {{ preBidTime.days }}
                      </p>
                      <p class="text-center text-sm md:text-xl text-slate-500">{{ $t('cron.days') }}</p>
                    </div>
                    <div class="mx-5">
                      <p class="text-center text-xl md:text-5xl mb-2 font-bold">
                        {{ preBidTime.hours }}
                      </p>
                      <p class="text-center text-sm md:text-xl text-slate-500">{{ $t('cron.hours') }}</p>
                    </div>
                    <div class="mx-5">
                      <p class="text-center text-xl md:text-5xl mb-2 font-bold">
                        {{ preBidTime.minutes }}
                      </p>
                      <p class="text-center text-sm md:text-xl text-slate-500">{{ $t('cron.minutes') }}</p>
                    </div>
                    <div class="mx-5">
                      <p class="text-center text-xl md:text-5xl mb-2 font-bold">
                        {{ preBidTime.seconds }}
                      </p>
                      <p class="text-center text-sm md:text-xl text-slate-500">{{ $t('cron.seconds') }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Estado: PREBID -->
            <div v-if="bidStatus == 'PREBID' && horseStatus == 'PREBID'">
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
              <div class="md:flex justify-center rounded-t-md">
                <div class="mx-10 md:mx-0 my-10">
                  <p class="uppercase">{{ $t('cron.timeLeft')}}</p>
                  <div class="flex flex-row justify-center md:items-center">
                    <div class="mx-5">
                      <p class="text-center text-2xl md:text-5xl mb-2 font-bold">
                        {{ bidTime.days }}
                      </p>
                      <p class="text-center text-sm md:text-xl text-slate-500">{{ $t('cron.days')}}</p>
                    </div>
                    <div class="mx-5">
                      <p class="text-center text-2xl md:text-5xl mb-2 font-bold">
                        {{ bidTime.hours }}
                      </p>
                      <p class="text-center text-sm md:text-xl text-slate-500">{{ $t('cron.hours')}}</p>
                    </div>
                    <div class="mx-5">
                      <p class="text-center text-2xl md:text-5xl mb-2 font-bold">
                        {{ bidTime.minutes }}
                      </p>
                      <p class="text-center text-sm md:text-xl text-slate-500">{{ $t('cron.minutes')}}</p>
                    </div>
                    <div class="mx-5">
                      <p class="text-center text-2xl md:text-5xl mb-2 font-bold">
                        {{ bidTime.seconds }}
                      </p>
                      <p class="text-center text-sm md:text-xl text-slate-500">{{ $t('cron.seconds')}}</p>
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
                <form @submit="submitForm" v-if="isUserAuthenticated && isUserAbleToBid">
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
                <div v-else-if="!isUserAuthenticated" class="py-5">
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
              <div v-if="winnerEmail === this.$store.state.user?.user" class="flex flex-row font-bold text-green-800 items-center justify-center" >
                🏆
                {{ $t(`bids.yourAreWinningPreOffer`) }}
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
                    :privateInformation="this.privateInformation"
                  />
                </div>
              </div>
            </div>

            <!-- Estado: BIDDING -->
            <div v-if="bidStatus == 'BIDDING' && horseStatus == 'BIDDING'" class="py-3">
              <p class="text-black font-bold text-2xl pt-8 px-10">
                {{ $t('auction.horseAuctionIsLive') }}
              </p>
              <p v-if="hasPreBid" class="text-center text-xs text-custom-gold">
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
              <div v-if="bids.length > 0" class="px-4" style="flex: 5">
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
                    :privateInformation="this.privateInformation"
                  />
                </div>
              </div>
            </div>

            <!-- Estado: CLOSED PREBID -->
            <div v-if="horseStatus == 'CLOSED PREBID'" class="py-3">
              <p class="text-black font-bold text-2xl pt-8 px-10">
                {{ $t('auction.horseAuctionIsComming') }}
              </p>
              <p v-if="hasPreBid" class="text-center text-xs text-custom-gold">
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
              <div v-else class="flex flex-col text-black font-bold text-xl pt-5">
                {{ $t('auction.stayTuned') }}
              </div>
              <div v-if="bids.length > 0" class="px-4" style="flex: 5">
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
                    :privateInformation="this.privateInformation"
                  />
                </div>
              </div>
            </div>

            <!-- Estado: CLOSED -->
            <div v-if="horseStatus == 'CLOSED'">
              <div v-if="bidStatus == 'BIDDING'" class="flex flex-col text-black font-bold text-xl pt-5">
                {{ $t('auction.stayTuned') }}
                <NuxtLink :to="localePath(`/auction/live/${bidId}`)">
                  <button class="bg-gray-500 text-white px-4 py-2 rounded-md mx-3 mb-5">
                    {{ $t('auction.goToAuction') }}
                  </button>
                </NuxtLink>
              </div>
              <div v-if="bids.length > 0" class="px-4" style="flex: 5">
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
                    :privateInformation="this.privateInformation"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabs de información adicional -->
    <div class="md:hidden mx-5 border border-gray-300 text-black rounded-lg">
      <div class="flex">
        <button @click="openTab = 1" :class="{'bg-gray-200': openTab === 1, 'bg-gray-100': openTab !== 1}" class="rounded-tl-lg flex-1 text-xs px-2 py-5 focus:ring-gray-500 uppercase font-bold">{{ $t('horse.tabs.horseData')}}</button>
        <div class="w-px bg-gray-300"></div> <!-- Separador vertical -->
        <button @click="openTab = 2" :class="{'bg-gray-200': openTab === 2, 'bg-gray-100': openTab !== 2}" class="flex-1 text-xs px-2 py-5 focus:ring-gray-500 uppercase font-bold">{{ $t('horse.tabs.pedigree')}}</button>
        <div class="w-px bg-gray-300"></div> <!-- Separador vertical -->
        <button @click="openTab = 3" :class="{'bg-gray-200': openTab === 3, 'bg-gray-100': openTab !== 3}" class="rounded-tr-lg flex-1 text-xs px-2 py-5 focus:ring-gray-500 uppercase font-bold">{{ $t('horse.tabs.xRays')}}</button>
      </div>
    </div>

    <div class="hidden md:show md:flex md:flex-row h-16 p-0 mx-5 rounded-lg">
      <button
        class="rounded-tl-lg w-48 h-16 font-bold"
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
        class="rounded-tr-lg w-48 h-16 font-bold"
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
    <div class="flex flex-col md:flex-row">
      <div style="flex: 7">
        <div class="flex flex-wrap">
          <div class="w-full">
            <!-- Tabs -->
            <div
              class="relative flex flex-col min-w-0 break-words w-full mb-6"
            >
              <div class="flex-auto">
                <div class="tab-content tab-space">
                  <div
                    class="mb-4 bg-white p-5 mx-5 rounded-b-lg"
                    v-bind:class="{
                      hidden: openTab !== 1,
                      block: openTab === 1
                    }"
                  >
                    <p>
                      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                          <span class="text-gray-600">{{ horseData.registerNumber || "NA" }}</span>
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
                    </p>

                  </div>
                  <div
                    class="mb-4 bg-white p-5 mx-5 rounded-b-lg"
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
                    class="mb-4 bg-white p-5 mx-5 rounded-b-lg"
                    v-bind:class="{
                      hidden: openTab !== 3,
                      block: openTab === 3
                    }"
                  >
                    <p>
                      <xRayGallery :images="horseData.xRayGallery" :horse_id="horseId" :horse_name="HorseName"/>
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
import Swal from 'sweetalert2'
import { extractYouTubeId } from '~/utils/youtubeUtils'
import { EventBus } from '../../utils/eventBus'

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
      preBidTime: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      },
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
        image: ""
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
      hasPreBid: false,
      subscribed: false,
      prebidWinnerDiscount: 5,
      privateInformation: true,
      commission: 0,
      taxes: 0,
      confirmedAmount: "",
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
    fromToBack() {
      return this.$route.query.from
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
    EventBus.$off('horse-changed', this.handleHorseChange)
  },
  async mounted() {
    this.horseId = this.$route.query.horseId
    this.initilize()
    EventBus.$on('horse-changed', this.handleHorseChange)
  },
  methods: {
    handleHorseChange(horseId) {
      if (this.horseId !== horseId) {
        this.horseId = horseId
        this.init()
      } else {
        console.log('El ID del caballo no ha cambiado')
      }
    },
    async finalize() {
      clearInterval(this.timer)
      this.intentionalCloseSockets()
      this.$confetti.stop()
    },
    async initilize() {
      this.adminPhone = await this.fetchAdministratorPhone()
      this.fetchGenres()
      this.init()
      await this.loadIncrements()
      this.startAuctionSocket()
      this.$store.commit('setLayoutMode', 'default'); // set to 'lightMode' or 'default'
      this.$store.commit('setTextColorTopBar', 'text-white'); // set to 'text-black' or 'text-white'
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

    async winnerConfetti() {
      await this.fetchWinner()
      if (this.horseStatus == "CLOSED" || this.horseStatus == "CLOSED PREBID") {
        if (this.winnerEmail == this.$store.state.user?.user && this.winnerEmail && this.$store.state.user?.user) {
          this.$confetti.start()
          setTimeout(() => {
            this.$confetti.stop()
          }, 8000)
        }
      }
    },
    showManualInputAmount() {
      let baseIncrement =this.getIncrement()
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

    calculatePreBidCountdown() {

      const targetDate = new Date(this.PreBidDate)
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


    counterIsZero(countdown) {
      return countdown.days === 0 && countdown.hours === 0 && countdown.minutes === 0 && countdown.seconds === 0
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
      this.bids = []
      this.hasBid = false
      this.hasPreBid = false
      this.subscribe = false
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
      this.resetAmounts()
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

        if (message.has_bid) {
          this.hasBid = message.has_bid
        }

        if (message.has_prebid) {
          this.hasPreBid = message.has_prebid
        }

        if (message.prebids && message.prebids.length > 0) {
          this.bids = message.prebids
        }
        if(this.bidStatus == 'PREBID') {
          if (message.bid) {
            if (this.bids.length > 20) {
              this.bids.pop()
            }
            this.bids.unshift(message.bid)
          }
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

        } else if (this.horseData.final_amount) {
          this.formData.amount = parseInt(
            this.horseData.final_amount,
            10
          ).toLocaleString("en-US")

          this.lastOffer = parseInt(
            this.horseData.final_amount
          ).toLocaleString("en-US")

          this.inputAmount = this.getIncrement().toLocaleString("en-US")

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

        this.winnerConfetti()
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
    async fetchHorseImages() {
      this.horseData.images = new Array()
      await axios
        .get(this.$config.baseLaSilla + `/horses/${this.horseID}/images`)
        .then((response) => {
          if (response.data && response.data.length > 0) {
            const images = response.data.map((imageObj) => imageObj.url)
            this.horseData.images = images
            this.$refs.carousel.startCarousel()
          }

        })
        .catch((error) => {
          console.error(error)
        })
        if(this.horseData.image && this.horseData.image !== null)
          this.horseData.images.unshift(this.horseData.image)

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
        // console.log("No hay historial para retroceder.")
        amount = this.getIncrement()
      } else {
        let currentValue = parseInt(this.inputAmount.replace(/,/g, ""))
        amount = this.incrementHistory.pop()
        if(currentValue === amount)
          amount = this.incrementHistory.pop()
      }
      this.inputAmount = amount.toLocaleString("en-US")
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
      const birthDate = moment(this.birthDate)
      const yearsDiff = today.year() - birthDate.year()

      return yearsDiff ? yearsDiff : 1
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
        pre_bid: this.horseStatus === "CLOSED" ? false : true
      }
      const token = getUserTokenOrDefault()

      this.winnerEmail = ''
      this.winner = ''

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
          // console.log('actualiza winner', response.data)
        })
        .catch((error) => {
          // Handle errors
          console.error("Error fetching winner:", error)
        })
    },

    async loadVideos(){
      // console.log('load videos')
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
          this.horseData.horsetelex = horse.local_data.horsetelex_url
          this.EndPreBidDate = horse.local_data.end_pre_bid
          this.horseData.next = horse.local_data.next
          this.horseData.previous = horse.local_data.previous
          this.horseData.image = horse.external_data.image_path ? this.apiImg + horse.external_data.image_path : null
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
          this.timer = setInterval(this.calculatePreBidCountdown, 1000)
          this.prebidWinnerDiscount = auction.prebid_winner_discount
          this.privateInformation = auction.private_information
          this.commission = auction.commission
          this.taxes = auction.taxes
        })
        .catch((error) => {
          console.error(error)
        })
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

    async subscribeMe() {
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

    calculateIncrement(currentValue) {
      for (let i = 0; i < this.increments.length; i++) {
        if (currentValue < this.increments[i].limit) {
          return this.increments[i].increment;
        }
      }
      return (this.increments.length > 0 ? this.increments[this.increments.length - 1].increment : 1000);
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
      // console.log('this.manualInputAmount',this.manualInputAmount)
      // console.log('this.formattedManualInputAmount',this.formattedManualInputAmount)
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
    backTo() {
      if(!this.fromToBack) {
        return this.$router.push(this.localePath(`/user/detalles/${this.bidId}`))
      } else if(this.fromToBack == 'auction') {
        return this.$router.push(this.localePath(`/auction/live/${this.bidId}`))
      }

    },
  }
}
</script>
