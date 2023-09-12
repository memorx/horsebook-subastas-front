<template>
  <div class="bg-zinc-200 py-5 lg:px-20">
    <a href="/user/inicio">
      <button class="bg-gray-500 text-white px-4 py-2 rounded-md mx-3 mb-5">Atras</button>
    </a>
    <div>
      <div>
        <div
          v-if="successMessage"
          class="bg-green-100 text-green-800 p-4 mb-4 rounded-lg shadow-md"
        >
          {{ successMessage }}
        </div>
        <div
          v-if="errorMessage"
          class="bg-red-100 text-red-800 p-4 mb-4 rounded-lg shadow-md"
        >
          {{ errorMessage }}
        </div>
      </div>
      <div
        v-if="statusBid == 'BIDDING'"
        class="mb-4 bg-white p-5 mx-5 rounded-lg"
      >
        <div class="flex items-center">
          <span class="text-2xl font-bold mr-3">Subasta la Silla</span>
          <div v-if="isCurrentDate === 1">
            <span class="bg-yellow-500 text-white px-3 py-1 rounded-full">
              EN VIVO
            </span>
          </div>
          <div v-else-if="isCurrentDate === 2">
            <span class="bg-green-500 text-white px-3 py-1 rounded-full">
              EN VIVO
            </span>
          </div>
          <div v-else>
            <span class="bg-red-500 text-white px-3 py-1 rounded-full">
              CERRADA
            </span>
          </div>
        </div>
        <h4 class="text-sm">🇲🇽 Monterrey, Nuevo Leon</h4>
      </div>
      <div class="flex flex-col md:flex-row mx-5 mb-4">
        <div
          v-if="statusBid == 'BIDDING'"
          class="md:w-1/2 p-5 md:mr-2 bg-white rounded-lg"
        >
          <div class="flex flex-col md:flex-row">
            <div class="md:w-1/2 order-2 md:order-1">
              <Carousel :images="horseData.images" />
            </div>
            <div class="md:w-1/2 bg-green px-3 order-1 md:order-2">
              <p class="text-sm text-slate-500"></p>
              <h2 class="text-xl font-bold mb-2">{{ HorsenName }}</h2>
            </div>
          </div>
          <div class="border-b border-gray-300 my-4"></div>
          <div class="aspect-w-16 aspect-h-9">
            <iframe
              class="aspect-content rounded-lg"
              :src="horseData.videoUrl ? `https://www.youtube.com/embed/${liveURL}` : `https://www.youtube.com/embed/ivGNj_t6S2c`"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
        <div
          v-if="statusBid == 'PREBID'"
          class="md:w-1/2 p-5 md:mr-2 bg-white rounded-lg"
        >
          <div class="">
            <div class="w-full bg-green p-3">
              <p class="text-sm text-slate-500">Canatra x Laval</p>
              <h2 class="text-xl font-bold mb-2">{{ HorsenName }}</h2>
            </div>
            <div class="w-full">
              <Carousel :images="horseData.images" />
            </div>
          </div>
        </div>
        <div
          v-if="statusBid == 'COMING'"
          class="md:w-2/3 md:mr-2 bg-white rounded-lg"
        >
          <div>
            <div class="w-full">
              <Carousel :images="horseData.images" />
            </div>
          </div>
        </div>
        <div
          v-if="statusBid == 'BIDDING'"
          class="md:w-1/2 mt-4 md:mt-0 bg-white rounded-lg"
        >
          <div
            class="text-center w-full rounded-t-lg p-5"
            style="background-color: #b99d61;"
          >
            <p class="text-white font-bold text-sm">OFERTA MAS ALTA</p>
            <span
              v-if="lastOffer"
              class="text-white font-bold text-2xl"
            >${{ lastOffer }} USD</span>
            <span
              v-else
              class="text-white font-bold text-2xl"
            >SE EL PRIMERO EN OFERTAR</span>
            <!-- <Winner
              class="text-white"
              :bidId="bidId"
              :horseID="horseID"
            /> -->
          </div>
          <div class="px-5 mt-5">
            <p class="text-sm font-bold">OFERTAR POR ESTE LOTE</p>
            <form @submit="submitForm">
              <div class="flex items-center space-x-2">
                <button
                  class="px-4 py-2 rounded-md hover:bg-gray-300 duration-100 border-1 border-gray-600"
                  type="button"
                  @click="substractThousand"
                >-</button>
                <input
                  type="text"
                  class="border rounded-md flex-grow"
                  autofocus
                  id="amount"
                  required
                  v-model="formData.amount"
                >
                <button
                  class="px-4 py-2 rounded-md hover:bg-gray-300 duration-100 border-1 border-gray-600"
                  type="button"
                  @click="addThousand"
                >+</button>

                <div class="hidden md:block">
                  <SubmitAuthenticatedButton 
                    button-text="Ofertar"
                  />
                </div>
                
              </div>
              <div class="lg:hidden text-center mt-5 w-full">
                <SubmitAuthenticatedButton button-text="Ofertar" />
              </div>
            </form>
          </div>
          <div>
            <div class="mx-5">
              <div class="border-b border-gray-300 my-4"></div>
              <p class="text-sm font-bold">OFERTAS</p>
              <div class="border-b border-gray-300 my-4"></div>
            </div>
            <div
              class="px-4"
              style="flex: 5;"
            >
              <Bids
                ref="detailsBid"
                :bidId="bidId"
                :horseID="horseID"
                @last-offer-updated="updateLastOffer"
              />
            </div>
          </div>
        </div>
        <div
          v-if="statusBid == 'COMING'"
          class="md:w-1/3 mt-4 md:mt-0"
        >
          <div class="text-center w-full rounded-lg px-5 pt-5 bg-white mb-5">
            <div class="w-full bg-green p-3">
              <p class="text-sm text-slate-500">Canatra x Laval</p>
              <h2 class="text-xl font-bold mb-2">{{ HorsenName }}</h2>
            </div>
          </div>
          <div class="w-full rounded-lg p-5 pt-5 bg-white mt-5">
            <div class="text-center w-full px-5">
              <p class="font-bold text-sm">PRECIO INICIAL</p>
              <span class="font-bold text-2xl">${{ horseData.final_amount }} USD</span>
              <div class="border-b border-gray-300 my-4"></div>
            </div>
            <div class="w-full rounded-t-lg px-5">
              <p class="font-bold text-sm">SUBASTA EN VIVO</p>
              <span class="font-bold text-sm">{{ BidDateFormat }}</span>
              <div class="border-b border-gray-300 my-4"></div>
            </div>
            <div class="w-full rounded-t-lg px-5">
              <p class="font-bold text-sm">PRE OFERTA</p>
              <span class="font-bold text-sm">Inicia {{ PreBidDateFormat }}</span>
            </div>
            <div class="w-full rounded-t-lg px-5">
              <span class="font-bold text-sm">Termina {{ EndPreBidDateFormat }}</span>
            </div>
            <div class="text-center texthidden md:block mt-1">
              <nuxt-link to="/auth/sign-up">
                <button
                  class="w-full bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700 duration-100 flex-grow md:flex-grow-0"
                >REGISTRATE ANTES DEL {{ BidDateFormat }}</button>
              </nuxt-link>
            </div>
          </div>
        </div>
        <div
          v-if="statusBid == 'CLOSED'"
          class="w-full mt-4 md:mt-0"
        >
          <div
            class="text-center w-full rounded-t-lg p-5"
            style="background-color: #940202;"
          >
            <p class="text-white font-bold text-md">SUBASTA TERMINADA</p>
            <p class="text-white font-light text-sm">VE EL VIDEO DE LA SUBASTA</p>
          </div>
          <div class="aspect-w-16 aspect-h-9">
            <iframe
              class="aspect-content rounded-b-lg"
              :src="horseData.videoUrl ? `https://www.youtube.com/embed/${liveURL}` : `https://www.youtube.com/embed/ivGNj_t6S2c`"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
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
            <span class="text-gray-600">{{ horseData.Genre || 'NA' }}</span>
          </div>

          <div class="mr-4">
            <span class="font-bold text-gray-700">Edad:</span>
            <span class="text-gray-600">{{ horseData.Age || 'NA' }}</span>
            <span class="text-gray-600">años</span>
          </div>

          <!-- <div class="mr-4">
            <span class="font-bold text-gray-700">Fecha de Nacimiento:</span>
            <span class="text-gray-600">{{ horseData.BirthDate || 'NA' }}</span>
          </div> -->

          <div class="mr-4">
            <span class="font-bold text-gray-700">Color:</span>
            <span class="text-gray-600">{{ horseData.Color || 'NA' }}</span>
          </div>

          <div class="mr-4">
            <span class="font-bold text-gray-700">Peso:</span>
            <span class="text-gray-600">{{ horseData.Weight || 'NA' }}</span>
            <span class="text-gray-600">kg</span>
          </div>

          <div class="mr-4">
            <span class="font-bold text-gray-700">Altura:</span>
            <span class="text-gray-600">{{ horseData.Height || 'NA' }}</span>
            <span class="text-gray-600">m</span>
          </div>

          <div class="mr-4">
            <span class="font-bold text-gray-700">Ubicacion:</span>
            <span class="text-gray-600">{{ horseData.Location || 'NA' }}</span>
          </div>

          <div class="mr-4">
            <span class="font-bold text-gray-700">Criadero:</span>
            <span class="text-gray-600">{{ horseData.Hatchery || 'NA' }}</span>
          </div>

          <!-- <div class="mr-4">
            <span class="font-bold text-gray-700">No. Registro:</span>
            <span class="text-gray-600">{{ horseData.registerNumber || 'NA' }}</span>
          </div> -->
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
        style="width: 100px; height: 50px;"
        type="button"
        v-on:click="toggleTabs(4)"
        v-bind:class="{ 'text-black bg-white': openTab !== 4, 'w-full bg-black text-white': openTab === 4 }"
      >
        Video
      </button>
      <button
        class="rounded-full"
        style="width: 100px; height: 50px;"
        type="button"
        v-on:click="toggleTabs(3)"
        v-bind:class="{ 'text-black bg-white': openTab !== 3, 'w-full bg-black text-white': openTab === 3 }"
      >
        X-Ray
      </button>
    </div>
    <div class="flex flex-col md:flex-row -mx-4">
      <div style="flex: 7;">
        <div class="flex flex-wrap">
          <div class="w-full">
            <!-- Tabs -->

            <div class="relative flex flex-col min-w-0 break-words w-full mb-6 rounded">
              <div class="px-4 flex-auto">
                <div class="tab-content tab-space">
                  <div
                    class="mb-4 bg-white p-5 mx-5 rounded-lg"
                    v-bind:class="{ 'hidden': openTab !== 3, 'block': openTab === 3 }"
                  >
                    <p>
                      <xRayGallery :images="horseData.xRayGallery" />
                    </p>
                  </div>
                  <div
                    class="mb-4 bg-white p-5 mx-5 rounded-lg"
                    v-bind:class="{ 'hidden': openTab !== 4, 'block': openTab === 4 }"
                  >
                    <div class="aspect-w-16 aspect-h-9 mx-5">
                      <iframe
                        class="aspect-content rounded-lg"
                        :src="horseData.videoUrl ? `https://www.youtube.com/embed/${horseData.videoUrl}` : `https://www.youtube.com/embed/ivGNj_t6S2c`"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      ></iframe>
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
import xRayGallery from '../../components/bid/xRayGallery.vue'
import Pedigree from '../../components/bid/horsePedigree.vue'
import Carousel from '../../components/Carousel.vue'
import Winner from '../../components/bid/winner.vue'
import Bids from '../../components/bid/detailsBid.vue'
import SubmitAuthenticatedButton from '../../components/bid/submitAuthenticatedButton.vue'
import getUserTokenOrDefault from '../../utils/getUserTokenOrDefault'
import axios from 'axios'
import moment from 'moment'


export default {
  components: {
    xRayGallery,
    Pedigree,
    Bids,
    Winner,
    Carousel,
    SubmitAuthenticatedButton
},
  data() {
    return {
      horseData: {
        Genre: '',
        BirthDate: '',
        Color: '',
        Weight: '',
        Height: '',
        Location: '',
        Pedigree: '',
        Age: '',
        registerNumber: '',
        Hatchery: '',
        birthDate: '',
        xRayGallery: [],
        images: [],
        videoUrl: '',
        final_amount: '',
      },
      liveURL: '',
      HorsenName: '',
      lastOffer: '',
      horseID: '',
      PreBidDate: '',
      EndPreBidDate: '',
      PreBidDateFormat: '',
      EndPreBidDateFormat: '',
      statusPreBid: false,
      BidDate: '',
      EndBidDate: '',
      BidDateFormat: '',
      EndBidDateFormat: '',
      statusBid: '',
      apiImg: 'https://storage.googleapis.com/horsebook/',
      formData: {
        subasta_id: '',
        horse_id: '',
        amount: '',
        pre_bid: false,
      },
      openTab: 4,
      largeBidConfirmed: false,
      successMessage: '',
      errorMessage: '',
      OfferStatus: null,
    }
  },
  computed: {
    setUser() {
      return this.$store.state.user;
    },
    bidId() {
      return this.$route.query.id;
    },
    horsePositionList() {
      return this.$route.query.horsePositionList;
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
    },
  },
  mounted() {
    this.fetchData()
    setInterval(() => {
      this.setCurrentOffer()
    }, 2000);
  },
  // async created() {
  //   if (this.formData.amount) {
  //     const fetchAmount = await this.fetchLastOffer(this.bidId, this.horseID)
  //     this.formData.amount = this.parseFetchedAmount(fetchAmount)
  //   }
  // },
  methods: {
    setInitialAmount() {
      if (this.formData.amount) {
        this.formData.amount = this.horseData.final_amount ? this.horseData.final_amount : 0
      } else {
        const initialAmount = 1000
        this.formData.amount = initialAmount.toLocaleString('en-US');
      }
    },
    fetchHorseImages() {
      axios.get(this.$config.baseLaSilla + `/horses/${this.horseID}/images`)
        .then(response => {
          const images = response.data.map(imageObj => imageObj.url)
          this.horseData.images = images
        })
        .catch(error => {
          // console.error(error);
          console.log('nel perro')
        });
    },
    extractYouTubeId(url) {
      if (url) {
        try {
          const parsedUrl = new URL(url);
          return parsedUrl.searchParams.get('v');
        } catch (error) {
          return null;
        }
      } else {
        return null;
      }
    },
    addThousand() {
      let currentValue = parseInt(this.formData.amount?.replace(',', ''));
      currentValue += 1000;
      this.formData.amount = currentValue.toLocaleString('en-US');
    },
    substractThousand() {
      let currentValue = parseInt(this.formData.amount?.replace(',', ''));
      currentValue -= 1000;
      this.formData.amount = currentValue.toLocaleString('en-US');
    },
    parseFetchedAmount(value) {
      let lastOfferInt = parseInt(value?.replace(',', ''));
      lastOfferInt += 1000;
      const lastOfferStr = lastOfferInt.toLocaleString('en-US');
      return lastOfferStr;
    },
    preloadAmount() {
      const lastOffer = this.lastOffer;
      // this.formData.amount = 1000;
      const lastOfferStr = this.formData.amount.toLocaleString('en-US');
      return lastOfferStr
      // let lastOfferInt = parseInt(this.lastOffer?.replace(',', ''));
      // lastOfferInt += 1000;
      // return lastOfferStr;
    },
    toggleTabs: function (tabNumber) {
      this.openTab = tabNumber
    },
    calculateAge() {
      const today = moment();
      return today.diff(this.birthDate, 'years');
    },
    formatted(date) {
      const dateformat = moment(date).format('DD/MM/YYYY')
      return dateformat
    },
    handleFormSubmitted() {
      this.$refs.detailsBid.getDetailsBid(this.bidId, this.horseID);
    },
    updateLastOffer(offer) {
      this.lastOffer = offer;
    },
    async setCurrentOffer() {
      const currentLastOfferInServer = await this.fetchLastOffer(this.bidId, this.horseID)
      const inputValue = this.formData.amount
      const inputValueParsed = parseInt(inputValue.replace(",", ""))
      const currentLastOfferInServerParsed = parseInt(currentLastOfferInServer.replace(",", ""))
      if (isNaN(inputValue)) {
        if (currentLastOfferInServerParsed >= inputValueParsed) {
          console.log('ParseFetchAmount')
          this.formData.amount = this.parseFetchedAmount(currentLastOfferInServer);
        } else {
          console.log('PreloadAmount')
          this.formData.amount = this.preloadAmount();
        }
      } else {
        this.formData.amount = parseInt(this.horseData.final_amount).toLocaleString('en-US');
      }
    },
    async fetchLastOffer(bid, horse) {
      const getLastBidsEndpoint = `/subastas/get-last-bids/`
      const url = `${this.$config.baseURL}${getLastBidsEndpoint}`
      const token = getUserTokenOrDefault()
      const parameters = {
        subasta_id: bid,
        horse_id: horse,
      }
      // this.tableKey++;
      let lastOffer = await axios.get(url, {
        params: parameters,
        headers: {
          Authorization: `Token ${token}`
        }
      })
        .then(response => {
          const detailsBid = response.data
          const lastOffer = detailsBid[0]?.amount || 0
          const formattedLastOffer = parseInt(lastOffer).toLocaleString('en-US');
          return formattedLastOffer
        })
        .catch(error => {
          console.error(error);
        });
      return lastOffer
    },
    async setCurrentOffer() {
      const currentLastOfferInServer = await this.fetchLastOffer(125, 1)
      const inputValue = this.formData.amount
      if (currentLastOfferInServer >= inputValue) {
        this.formData.amount = this.parseFetchedAmount(currentLastOfferInServer);
      } else {
        // this.formData.amount = this.preloadAmount();
      }
    },
    async fetchLastOffer(bid, horse) {
      const getLastBidsEndpoint = `/subastas/get-last-bids/`
      const url = `${this.$config.baseURL}${getLastBidsEndpoint}`
      const decoded = JWTDecode(this.$cookies.get("access_token"))
      const parameters = {
        subasta_id: bid,
        horse_id: horse,
      }
      // this.tableKey++;
      let lastOffer = await axios.get(url, {
        params: parameters,
        headers: {
          Authorization: `Token ${decoded.token}`
        }
      })
        .then(response => {
          const detailsBid = response.data
          const lastOffer = detailsBid[0]?.amount
          const formattedLastOffer = parseInt(lastOffer).toLocaleString('en-US');
          return formattedLastOffer
        })
        .catch(error => {
          console.error('Error Fetching', error);
        });
      return lastOffer
    },
    fetchData() {
     const listSubastasEndpoint = `/subastas/list-subastas/?id=${this.bidId}`
     const url = `${this.$config.baseURL}${listSubastasEndpoint}`
     const token = getUserTokenOrDefault()
     axios.get(url, {
       headers: {
         Authorization: `Token ${token}`
       },
     })
       .then(response => {
         const horse = response.data
         //name
         this.HorsenName = horse.horses[this.horsePositionList].external_data.name
         //horse ID
         this.horseID = horse.horses[this.horsePositionList].external_data.id
         //prebid date
         this.PreBidDate = horse.start_pre_bid
         this.EndPreBidDate = horse.end_pre_bid
         this.PreBidDateFormat = this.formatted(horse.start_pre_bid)
         this.EndPreBidDateFormat = this.formatted(horse.end_pre_bid)
         //bid date
         this.BidDate = horse.start_bid
         this.EndBidDate = horse.end_bid
         this.BidDateFormat = this.formatted(horse.start_bid)
         this.EndBidDateFormat = this.formatted(horse.end_bid)
         //horse Description
         //genre
         this.horseData.Genre = horse.horses[this.horsePositionList].external_data.sex
         //Birthdate
         this.horseData.BirthDate = this.formatted(horse.horses[this.horsePositionList].external_data.birth_date)
         //color
         this.horseData.Color = horse.horses[this.horsePositionList].external_data.color
         //Weight
         this.horseData.Weight = horse.horses[this.horsePositionList].external_data.weight
         //Height
         this.horseData.Height = horse.horses[this.horsePositionList].external_data.height
         //Location
         this.horseData.Location = horse.horses[this.horsePositionList].external_data.location
         //Pedigree Image
         this.horseData.Pedigree = horse.horses[this.horsePositionList].local_data.pedigree
         //No. Register
         this.horseData.registerNumber = horse.horses[this.horsePositionList].local_data.registration_no
         //Hatchery
         this.horseData.Hatchery = horse.horses[this.horsePositionList].external_data.birth_location
         const birthDateMoment = moment(this.horseData.BirthDate, 'DD/MM/YYYY');
         const today = moment();
         this.horseData.Age = today.diff(birthDateMoment, 'years');
         //xRays
         this.horseData.xRayGallery = horse.horses[this.horsePositionList].local_data.xrays.map(xray => xray.image)
         //Video URL
         this.horseData.videoUrl = this.extractYouTubeId(horse.horses[this.horsePositionList].local_data.video_url)
         // Live URL
         this.liveURL = this.extractYouTubeId(horse.video_url)
         //Horse Images
         this.fetchHorseImages()
         //Horse Age
         this.age = this.calculateAge();
         //Bid Status
         this.statusBid = horse.status
         //Bid Initial Amout
         this.horseData.initialAmount = horse.horses[this.horsePositionList].local_data.initial_amount
       })
       .catch(error => {
         console.error(error);
       });
    },
    statusOffer(BidDate) {
      const CurrentDate = new Date()
      const StartBid = new Date(BidDate)
      return CurrentDate <= StartBid
    },
    submitForm(event) {
      event.preventDefault();
      const submittedAmount = parseInt(this.formData.amount.replace(',', ''))
      const PostBidEndpoint = '/subastas/bid/';
      const url = `${this.$config.baseURL}${PostBidEndpoint}`;
      const token = getUserTokenOrDefault()
      this.formData.horse_id = String(this.localHorseID);
      this.formData.amount = submittedAmount;
      this.formData.subasta_id = this.bidId;

      axios.post(url, this.formData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((response) => {
          this.successMessage = 'Oferta enviada correctamente';
          this.errorMessage = '';
          this.$emit('form-submitted');
          this.formData.amount = this.preloadAmount();
          setTimeout(() => {
            this.successMessage = '';
          }, 6000);
        })
        .catch((error) => {
          this.errorMessage = 'Error al enviar la oferta';
          if (error.response && error.response.data && error.response.data.non_field_errors && error.response.data.non_field_errors.length > 0) {
            this.errorMessage = error.response.data.non_field_errors[0];
          }
          this.successMessage = '';
          setTimeout(() => {
            this.formData.amount = this.preloadAmount();
          }, 1500);
          setTimeout(() => {
            this.errorMessage = '';
            this.successMessage = '';
          }, 6000);
        });
    },
  },

}
</script>