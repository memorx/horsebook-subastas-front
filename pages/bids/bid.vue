<template>
  <div class="bg-zinc-200 py-5 lg:px-20">
    <modal
      v-show="showModal"
      :amount="formData?.amount"
      :submitForm="submitForm"
      :disableModal="disableModal"
      :status="horseStatus"
    />
    <NuxtLink :to="`/user/detalles/${bidId}`">
      <button class="bg-gray-500 text-white px-4 py-2 rounded-md mx-3 mb-5">
        Atras
      </button>
    </NuxtLink>
    <div>
      <div class="mb-4 bg-white p-5 mx-5 rounded-lg">
        <div class="flex items-center">
          <span class="text-2xl font-bold mr-3">Subasta la Silla</span>
          <div>
            <statusBid :status="bidStatus" />
          </div>
        </div>
        <h4 class="text-sm">🇲🇽 Monterrey, Nuevo Leon</h4>
      </div>
      <div class="flex mx-5 mb-4">
        <!-- BIDDING -->
        <div
          v-if="bidStatus == 'BIDDING' && horseStatus == 'COMING'"
          class="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
        >
          <div class="md:mr-2 bg-white rounded-lg">
            <div>
              <div class="w-full">
                <Carousel :images="horseData.images" />
              </div>
            </div>
          </div>
          <div class="mt-4 md:mt-0 flex-col">
            <div class="flex-row w-full rounded-lg p-5 bg-white">
              <div class="flex w-full bg-green p-3 text-center">
                <span class="mr-1 text-xl font-bold mb-2">{{
                  HorsenName
                }}</span>
                <div>
                  <horseStatus :status="horseStatus" :bid-status="bidStatus" />
                </div>
              </div>
              <div v-if="winner" class="text-center w-full px-5">
                <p class="font-bold text-sm">GANADOR PRE OFERTA</p>
                <p class="font-bold text-sm">
                  {{
                    `${winner.name} ${winner.fathers_surname}` ||
                    winner.fathers_surname
                  }}
                </p>
                <p>Por la cantidad de</p>
                <span class="font-bold text-2xl"
                  >${{ horseData.final_amount }} USD</span
                >
                <div class="border-b border-gray-300 my-4"></div>
              </div>
              <div class="w-full rounded-t-lg px-5">
                <p class="font-bold text-sm">SUBASTA EN VIVO</p>
                <span class="font-bold text-sm">{{ BidDateFormat }}</span>
                <div class="border-b border-gray-300 my-4"></div>
              </div>
              <div class="w-full rounded-t-lg px-5">
                <p class="font-bold text-sm">PRE OFERTA</p>
                <span class="font-bold text-sm"
                  >Inicia {{ PreBidDateFormat }}</span
                >
              </div>
              <div class="w-full rounded-t-lg px-5">
                <span class="font-bold text-sm"
                  >Termina {{ EndPreBidDateFormat }}</span
                >
              </div>
              <div
                v-if="isUserAuthenticated"
                class="text-center texthidden md:block mt-1"
              >
                <nuxt-link to="/auth/sign-up">
                  <button
                    class="w-full bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700 duration-100 flex-grow md:flex-grow-0"
                  >
                    REGISTRATE ANTES DEL {{ BidDateFormat }}
                  </button>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
        <div
          class="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
          v-if="horseStatus == 'BIDDING'"
        >
          <div class="w-full grid grid-row-2 gap-2 p-5 bg-white rounded-lg">
            <div class="grid grid-row-2">
              <div class="flex bg-green px-3">
                <span class="mr-1 text-xl font-bold mb-2">{{
                  HorsenName
                }}</span>
                <div>
                  <horseStatus :status="horseStatus" :bidStatus="bidStatus" />
                </div>
              </div>
              <div>
                <Carousel :images="horseData.images" />
              </div>
            </div>
            <div class="border-b border-gray-300 my-4"></div>
            <div class="aspect-w-16 aspect-h-9">
              <iframe
                class="aspect-content rounded-lg"
                :src="
                  horseData.videoUrl
                    ? `https://www.youtube.com/embed/${liveURL}`
                    : `https://www.youtube.com/embed/ivGNj_t6S2c`
                "
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </div>
          <div class="w-full flex-col mt-4 md:mt-0 bg-white rounded-lg">
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
                  <input
                    type="text"
                    class="border rounded-md flex-grow w-1/4"
                    autofocus
                    id="amount"
                    required
                    v-model="formData.amount"
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
                <div class="border-b border-gray-300 my-4"></div>
              </div>
              <div class="px-4" style="flex: 5">
                <Bids
                  ref="detailsBid"
                  :bidId="bidId"
                  :horseID="horseID"
                  :bids="this.$data.bids"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- PRE BID -->
        <div
          class="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
          v-if="bidStatus == 'PREBID'"
        >
          <div class="w-full p-5 md:mr-2 bg-white rounded-lg">
            <div class="grid grid-row-2">
              <div class="flex w-full bg-green p-3">
                <span class="mr-1 text-xl font-bold mb-2">{{
                  HorsenName
                }}</span>
                <div>
                  <horseStatus :status="horseStatus" :bidStatus="bidStatus" />
                </div>
              </div>
              <div class="w-full">
                <Carousel :images="horseData.images" />
              </div>
            </div>
          </div>
          <div class="w-full flex-col mt-4 md:mt-0 bg-white rounded-lg">
            <div
              class="text-center w-full rounded-t-lg p-5"
              style="background-color: #b99d61"
            >
              <p class="text-white font-bold text-sm">PRE OFERTA MAS ALTA</p>
              <span v-if="lastOffer" class="text-white font-bold text-2xl"
                >${{ lastOffer }} USD</span
              >
              <div v-else>
                <span class="text-white font-bold text-2xl"
                  >SE EL PRIMERO EN PRE OFERTAR MAS DE</span
                >
                <p class="text-white font-bold text-2xl">
                  $
                  {{ parseInt(horseData.final_amount).toLocaleString("en-US") }}
                  USD
                </p>
              </div>
            </div>
            <div class="px-5 mt-5">
              <p class="text-sm font-bold">PRE OFERTAR POR ESTE LOTE</p>
              <form @submit="submitForm">
                <div class="flex items-center space-x-2">
                  <button
                    class="px-4 py-2 rounded-md hover:bg-gray-300 duration-100 border-1 border-gray-600"
                    type="button"
                    @click="substractThousand"
                  >
                    -
                  </button>
                  <input
                    type="text"
                    class="border rounded-md flex-grow"
                    autofocus
                    id="amount"
                    required
                    v-model="formData.amount"
                  />
                  <button
                    class="px-4 py-2 rounded-md hover:bg-gray-300 duration-100 border-1 border-gray-600"
                    type="button"
                    @click="addThousand"
                  >
                    +
                  </button>

                  <div class="hidden md:block">
                    <SubmitAuthenticatedButton
                      :enable-modal="enableModal"
                      button-text="Pre Ofertar"
                    />
                  </div>
                </div>
                <div class="lg:hidden text-center mt-5 w-full">
                  <SubmitAuthenticatedButton
                    :enable-modal="enableModal"
                    button-text="Pre Ofertar"
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
                <p class="text-sm font-bold">HISTORIAL DE PRE OFERTAS</p>
                <div class="border-b border-gray-300 my-4"></div>
              </div>
              <div class="px-4" style="flex: 5">
                <Bids
                  ref="detailsBid"
                  :bidId="bidId"
                  :horseID="horseID"
                  :bids="this.$data.bids"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- COMING -->
        <div
          class="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
          v-if="bidStatus == 'COMING'"
        >
          <div class="md:mr-2 bg-white rounded-lg">
            <div>
              <div class="w-full">
                <Carousel :images="horseData.images" />
              </div>
            </div>
          </div>
          <div class="mt-4 md:mt-0 flex-col">
            <div class="flex-row w-full rounded-lg p-5 bg-white">
              <div class="flex w-full bg-green p-3 text-center">
                <span class="mr-1 text-xl font-bold mb-2">{{
                  HorsenName
                }}</span>
                <div>
                  <horseStatus :status="horseStatus" :bid-status="bidStatus" />
                </div>
              </div>
              <div class="text-center w-full px-5">
                <p class="font-bold text-sm">PRECIO INICIAL</p>
                <span class="font-bold text-2xl"
                  >${{ horseData.final_amount }} USD</span
                >
                <div class="border-b border-gray-300 my-4"></div>
              </div>
              <div class="w-full rounded-t-lg px-5">
                <p class="font-bold text-sm">SUBASTA EN VIVO</p>
                <span class="font-bold text-sm">{{ BidDateFormat }}</span>
                <div class="border-b border-gray-300 my-4"></div>
              </div>
              <div class="w-full rounded-t-lg px-5">
                <p class="font-bold text-sm">PRE OFERTA</p>
                <span class="font-bold text-sm"
                  >Inicia {{ PreBidDateFormat }}</span
                >
              </div>
              <div class="w-full rounded-t-lg px-5">
                <span class="font-bold text-sm"
                  >Termina {{ EndPreBidDateFormat }}</span
                >
              </div>
              <div
                v-if="isUserAuthenticated"
                class="text-center texthidden md:block mt-1"
              >
                <nuxt-link to="/auth/sign-up">
                  <button
                    class="w-full bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700 duration-100 flex-grow md:flex-grow-0"
                  >
                    REGISTRATE ANTES DEL {{ BidDateFormat }}
                  </button>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
        <!-- CLOSED OR CLOSED PREBID-->
        <div
          class="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
          v-if="horseStatus == 'CLOSED' || bidStatus == 'CLOSED PREBID'"
        >
          <div class="w-full grid grid-row-2 gap-2 p-5 bg-white rounded-lg">
            <div class="grid grid-cols-2">
              <div class="order-2 md:order-1">
                <Carousel :images="horseData.images" />
              </div>
              <div class="bg-green px-3 order-1 md:order-2">
                <div>
                  <horseStatus :status="horseStatus" :bidStatus="bidStatus" />
                </div>
                <span class="mr-1 text-xl font-bold mb-2">{{
                  HorsenName
                }}</span>
              </div>
            </div>
            <div class="border-b border-gray-300 my-4"></div>
            <div class="aspect-w-16 aspect-h-9">
              <iframe
                class="aspect-content rounded-lg"
                :src="
                  horseData.videoUrl
                    ? `https://www.youtube.com/embed/${liveURL}`
                    : `https://www.youtube.com/embed/ivGNj_t6S2c`
                "
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </div>
          <div
            v-if="winner"
            class="w-full flex-col mt-4 md:mt-0 bg-white rounded-lg"
          >
            <div
              class="text-center w-full rounded-t-lg p-5"
              style="background-color: #b99d61"
            >
              <p class="text-white font-bold text-2xl">GANADOR</p>
              <p class="text-white font-bold text-xl">
                {{ winner.name || winner.fathers_surname }}
              </p>
            </div>
            <div class="px-5 mt-5">
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
            <div>
              <div class="mx-5">
                <p class="text-sm font-bold">HISTORIAL DE OFERTAS</p>
                <div class="border-b border-gray-300 my-4"></div>
              </div>
              <div class="px-4" style="flex: 5">
                <Bids
                  ref="detailsBid"
                  :bidId="bidId"
                  :horseID="horseID"
                  :bids="this.$data.bids"
                />
              </div>
            </div>
          </div>
          <div
            v-else
            class="w-full flex-col mt-4 md:mt-0 bg-white rounded-lg text-center"
          >
            <p class="text-black font-bold text-2xl">
              LA SUBASTA ESTÁ POR COMENZAR
            </p>
            <p class="text-black font-bold text-xl">Quédate al pendiente</p>
          </div>
        </div>
      </div>
      <div class="mb-4 bg-white p-5 mx-5 rounded-lg">
        <div class="mb-4">
          <span class="text-2xl font-bold">Estadisticas</span>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div class="mr-4">
            <span class="font-bold text-gray-700">Genero:</span>
            <span class="text-gray-600">{{ horseData.Genre || "NA" }}</span>
          </div>

          <div class="mr-4">
            <span class="font-bold text-gray-700">Edad:</span>
            <span class="text-gray-600">{{ horseData.Age || "NA" }}</span>
            <span class="text-gray-600">años</span>
          </div>
          <div class="mr-4">
            <span class="font-bold text-gray-700">Color:</span>
            <span class="text-gray-600">{{ horseData.Color || "NA" }}</span>
          </div>

          <div class="mr-4">
            <span class="font-bold text-gray-700">Peso:</span>
            <span class="text-gray-600">{{ horseData.Weight || "NA" }}</span>
            <span class="text-gray-600">kg</span>
          </div>

          <div class="mr-4">
            <span class="font-bold text-gray-700">Altura:</span>
            <span class="text-gray-600">{{ horseData.Height || "NA" }}</span>
            <span class="text-gray-600">m</span>
          </div>

          <div class="mr-4">
            <span class="font-bold text-gray-700">Ubicacion:</span>
            <span class="text-gray-600">{{ horseData.Location || "NA" }}</span>
          </div>

          <div class="mr-4">
            <span class="font-bold text-gray-700">Criadero:</span>
            <span class="text-gray-600">{{ horseData.Hatchery || "NA" }}</span>
          </div>
        </div>
      </div>
      <div class="mb-4 bg-white p-5 mx-5 rounded-lg">
        <div class="mb-4">
          <span class="text-2xl font-bold">Pedigree</span>
        </div>
        <Pedigree :link="horseData.Pedigree" />
      </div>
    </div>
    <div class="mb-4 p-5 rounded-lg">
      <button
        class="rounded-full"
        style="width: 100px; height: 50px"
        type="button"
        v-on:click="toggleTabs(4)"
        v-bind:class="{
          'text-black bg-white': openTab !== 4,
          'w-full bg-black text-white': openTab === 4
        }"
      >
        Video
      </button>
      <button
        class="rounded-full"
        style="width: 100px; height: 50px"
        type="button"
        v-on:click="toggleTabs(3)"
        v-bind:class="{
          'text-black bg-white': openTab !== 3,
          'w-full bg-black text-white': openTab === 3
        }"
      >
        X-Ray
      </button>
    </div>
    <div class="flex flex-col md:flex-row -mx-4">
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
                    v-bind:class="{
                      hidden: openTab !== 3,
                      block: openTab === 3
                    }"
                  >
                    <p>
                      <xRayGallery :images="horseData.xRayGallery" />
                    </p>
                  </div>
                  <div
                    class="mb-4 bg-white p-5 mx-5 rounded-lg"
                    v-bind:class="{
                      hidden: openTab !== 4,
                      block: openTab === 4
                    }"
                  >
                    <div class="aspect-w-16 aspect-h-9 mx-5">
                      <iframe
                        v-if="horseData.videoUrl"
                        class="aspect-content rounded-lg"
                        :src="
                          horseData.videoUrl
                            ? `https://www.youtube.com/embed/${horseData.videoUrl}`
                            : `https://www.youtube.com/embed/ivGNj_t6S2c`
                        "
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      ></iframe>
                      <h1 v-else>No hay video disponible</h1>
                    </div>
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
        final_amount: ""
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
      formData: {
        subasta_id: "",
        horse_id: "",
        amount: "",
        pre_bid: false
      },
      openTab: 4,
      largeBidConfirmed: false,
      successMessage: "",
      errorMessage: "",
      OfferStatus: null,
      showModal: false,
      genders: "",
      genreMapping: {
        null: "",
        0: "Macho Completo",
        1: "Hembra",
        2: "Macho Castrado",
        3: "Semental",
        4: "Nano",
        5: "Yegua Madre",
        6: "Portadora"
      },
      socket: null,
      bids: [],
      preBids: [],
      errorMessage: "",
      winner: "",
      isIntentionalReconnectBid: false,
      isIntentionalReconnectAuction: false
    }
  },
  computed: {
    setUser() {
      return this.$store.state.user
    },
    bidId() {
      return this.$route.query.id
    },
    horseId() {
      return this.$route.query.horseId
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
    console.log("al salir cierra los sockets", this.bidSocket)
    this.intentionalCloseSockets()
  },
  async mounted() {
    this.fetchGenres()
    this.init()
    this.startAuctionSocket()
  },
  methods: {
    async intentionalCloseSockets() {
      console.log("Cierre intencional de los sockets")
      this.closeBidSocket()
      this.closeAuctionSocket()
    },
    async closeBidSocket() {
      console.log("Close Bid Socket")
      this.isIntentionalReconnectBid = true
      if (this.socket) {
        this.socket.close()
      }
      this.isIntentionalReconnectBid = false
    },
    async closeAuctionSocket() {
      console.log("Close Auction Socket")
      this.isIntentionalReconnectAuction = true
      if (this.auctionSocket) {
        this.auctionSocket.close()
      }
      this.isIntentionalReconnectAuction = false
    },
    async init() {
      await this.fetchData()
      this.startBidSocket()
    },
    enableModal() {
      this.showModal = true
    },
    disableModal() {
      this.showModal = false
    },
    async startBidSocket() {
      if (
        this.$data.socket &&
        this.$data.socket.readyState === WebSocket.OPEN
      ) {
        this.$data.socket.close()
      }
      const url = `${this.$config.baseURLWS}/bids/${this.bidId}/horses/${this.horseId}`
      this.$data.socket = new ReconnectingWebSocket(url)
      const mountedThis = this
      this.socket.addEventListener("message", (event) => {
        const message = JSON.parse(event.data)
        if (message.error) {
          mountedThis.errorMessage = message.error
          setTimeout(() => {
            mountedThis.errorMessage = ""
          }, 6000)
          return
        }
        if (message.bids) {
          mountedThis.winner = message.bids[0]?.user_profile
          mountedThis.$data.bids = message.bids
        }

        if (message.prebids && message.prebids.length > 0) {
          mountedThis.winner = message.prebids[0].user_profile
          mountedThis.$data.bids = message.prebids
        }

        if (message.bid) {
          if (mountedThis.$data.bids.length > 20) {
            mountedThis.$data.bids.pop()
          }
          mountedThis.$data.bids.unshift(message.bid)
        }

        if (mountedThis.$data.bids.length > 0) {
          mountedThis.$data.lastOffer = parseInt(
            mountedThis.$data.bids[0]?.amount
          ).toLocaleString("en-US")
          let currentValue = parseInt(
            mountedThis.formData?.amount.replace(",", "")
          )
          if (currentValue >= 30000) {
            mountedThis.$data.formData.amount = (
              parseInt(mountedThis.$data.bids[0]?.amount) + 500
            ).toLocaleString("en-US")
          } else {
            mountedThis.$data.formData.amount = (
              parseInt(mountedThis.$data.bids[0]?.amount) + 1000
            ).toLocaleString("en-US")
          }
        } else if (mountedThis.horseData.final_amount) {
          mountedThis.$data.formData.amount = parseInt(
            mountedThis.horseData.final_amount,
            10
          ).toLocaleString("en-US")
        } else {
          mountedThis.$data.formData.amount = (1000).toLocaleString("en-US")
        }
      })
      this.$data.socket.addEventListener("close", (event) => {
        if (event.code === 1006) {
          mountedThis.startBidSocket()
        }
      })
    },
    async startAuctionSocket() {
      const mountedThis = this
      if (
        this.$data.auctionSocket &&
        this.$data.auctionSocket.readyState === WebSocket.OPEN
      ) {
        this.$data.auctionSocket.close()
      }
      const url = `${this.$config.baseURLWS}/auction/${this.bidId}`
      this.$data.auctionSocket = new ReconnectingWebSocket(url)
      this.$data.auctionSocket.addEventListener("message", (event) => {
        const message = JSON.parse(event.data)
        if (message.error) {
          mountedThis.socketError = message.error
          return
        }
        if (message.horses && message.horses.length > 0) {
          message.horses.forEach((horse) => {
            if (horse.id == mountedThis.horseId) {
              mountedThis.$data.horseStatus = horse.status
            }
          })
        }

        if (message.horse) {
          mountedThis.horseId
          if (message.horse.id == mountedThis.horseId) {
            mountedThis.$data.horseStatus = message.horse.status
            const nextHorse = message.horse.next
            if (mountedThis.$data.horseStatus == "CLOSED")
              mountedThis.$toast.success(
                "La subasta de este caballo ha sido finalizada"
              )
            if (nextHorse) {
              mountedThis.$router
                .replace({
                  query: { id: mountedThis.bidId, horseId: nextHorse }
                })
                .then(() => {
                  mountedThis.init()
                })
            }
          }
        }
      })
      this.$data.socket.addEventListener("close", (event) => {
        if (event.code === 1006) {
          mountedThis.startBidSocket()
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
      let currentValue = parseInt(this.formData?.amount.replace(",", ""))
      if (currentValue >= 30000) {
        currentValue += 500
      } else {
        currentValue += 1000
      }
      this.formData.amount = currentValue.toLocaleString("en-US")
    },
    substractThousand() {
      let currentValue = parseInt(this.formData?.amount?.replace(",", ""))
      if (currentValue >= 30000) {
        currentValue -= 500
      } else {
        currentValue -= 1000
      }
      this.formData.amount = currentValue.toLocaleString("en-US")
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
          this.HorsenName = horse.external_data.name
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
      const user = JSON.parse(localStorage.getItem("setUser"))
      this.$data.socket.send(
        JSON.stringify({
          bid_info: {
            amount: submittedAmount
          },
          sender: {
            email: user.user
          }
        })
      )
    }
  }
}
</script>
