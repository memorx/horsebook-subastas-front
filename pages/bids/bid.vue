<template>
  <div>
    <div class="bg-gray-100 py-8">
      <div class="alert-cont">
        <div
          v-if="successMessage"
          class="alert alert-success"
        >
          {{ successMessage }}
        </div>
        <div
          v-if="errorMessage"
          class="alert alert-danger"
        >
          {{ errorMessage }}
        </div>
      </div>
      <a href="/user/inicio">
        <button class="bg-gray-500 text-white px-4 py-2 rounded-md mx-3 mb-5">Atras</button>
      </a>
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row -mx-4">
          <div
            class="px-4"
            style="flex: 6;"
          >
            <Carousel />
          </div>
          <!-- Info de Subasta -->
          <div
            class="px-4"
            style="flex: 4;"
          >
            <h2 class="text-2xl font-bold mb-2">{{ HorsenName }}</h2>
            <!-- Info de Estatus de Subasta -->
            <div v-if="isCurrentDate === 1">
              <span
                class="statusOffer"
                style="font-weight: 600; width: 50%;"
              >PRE OFERTA ABIERTA
              </span>
              <span class="bg-yellow-500 text-white px-3 py-1 rounded-full">
                EN VIVO
              </span>
            </div>
            <div v-else-if="isCurrentDate === 2">
              <span
                class="statusOffer"
                style="font-weight: 600; width: 50%;"
              >OFERTA ABIERTA
              </span>
              <span class="bg-green-500 text-white px-3 py-1 rounded-full">
                EN VIVO
              </span>
            </div>
            <div v-else>
              <span
                class="statusOfferClose"
                style="font-weight: 600; width: 50%;"
              >OFERTA ABIERTA
              </span>
              <span class="bg-red-500 text-white px-3 py-1 rounded-full">
                CERRADA
              </span>
            </div>
            <div class="border-b border-gray-300 my-4"></div>

            <!-- Fechas de Subasta -->
            <div
              v-if="isCurrentDate === 1 || isCurrentDate > 1"
              style="color: #667085;"
            >
              <p id="">Termino de Pre-Oferta:</p>
              <p
                id="date"
                style="font-family: 16px; font-weight: bold;"
              >{{ EndPreBidDateFormat }}</p>
            </div>
            <div
              v-else
              style="color: #667085;"
            >
              <p id="">Fecha de Pre-Oferta:</p>
              <p
                id="date"
                style="font-family: 16px; font-weight: bold;"
              >{{ PreBidDateFormat }}</p>
            </div>
            <div class="offer-date">
              <div
                v-if="isCurrentDate === 2 || isCurrentDate > 2"
                style="color: #667085;"
              >
                <p id="">Termino de subasta:</p>
                <p
                  id="date"
                  style="font-family: 16px; font-weight: bold;"
                >{{ EndBidDateFormat }}</p>
              </div>
              <div
                v-else
                style="color: #667085;"
              >
                <p id="">Fecha de subasta:</p>
                <p
                  id="date"
                  style="font-family: 16px; font-weight: bold;"
                >{{ BidDateFormat }}</p>
              </div>
            </div>
            <!-- Descripcion de Oferta -->
            <div class="border-b border-gray-300 my-4"></div>
            <Winner
              class=""
              :bidId="bidId"
              :horseID="horseID"
            />
            <div class="flex mb-4">
              <div class="mr-4">
                <span class="font-bold text-gray-700">Ultima Oferta:</span>
                <span class="text-gray-600">${{ lastOffer }}</span>
                <span class="text-gray-600">USD</span>
              </div>
            </div>
            <!-- Input para ofertar -->
            <form @submit="submitForm">
              <div class="flex items-center input-container my-5 space-x-2">
                <button
                  class="px-4 py-2 rounded-md hover:bg-gray-300 duration-100 border-1 border-gray-600"
                  type="button"
                  @click="substractThousand"
                >-</button>
                <span class="dollar-symbol">$</span>
                <input
                  type="text"
                  class="border rounded-md flex-grow custom-input"
                  autofocus
                  id="amount"
                  required
                  v-model="formData.amount"
                >
                <span class="usd-symbol">USD</span>
                <button
                  class="px-4 py-2 rounded-md hover:bg-gray-300 duration-100 border-1 border-gray-600"
                  type="button"
                  @click="addThousand"
                >+</button>
              </div>
              <div class="flex items-center my-5 space-x-2">
                <button
                  class="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700 duration-100 flex-grow"
                  style="height: 50px;"
                  type="submit"
                >Ofertar</button>
              </div>
            </form>
          </div>
        </div>
        <div class="border-b border-gray-300 my-4"></div>
        <div class="flex flex-col md:flex-row -mx-4">
          <div style="flex: 7;">
            <div class="flex flex-wrap">
              <div class="w-full">
                <!-- Tabs -->
                <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
                  <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                    <button
                      type="button"
                      class="text-xs font-bold uppercase px-5 py-3 rounded"
                      v-on:click="toggleTabs(1)"
                      v-bind:class="{ 'text-black bg-transparent': openTab !== 1, 'w-full bg-black text-white': openTab === 1 }"
                    >
                      Descripcion
                    </button>
                  </li>
                  <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                    <button
                      type="button"
                      class="text-xs font-bold uppercase px-5 py-3 rounded"
                      v-on:click="toggleTabs(2)"
                      v-bind:class="{ 'text-black bg-transparent': openTab !== 2, 'w-full bg-black text-white': openTab === 2 }"
                    >
                      Pedigree
                    </button>
                  </li>
                  <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                    <button
                      type="button"
                      class="text-xs font-bold uppercase px-5 py-3 rounded"
                      v-on:click="toggleTabs(3)"
                      v-bind:class="{ 'text-black bg-transparent': openTab !== 3, 'w-full bg-black text-white': openTab === 3 }"
                    >
                      X-Ray
                    </button>
                  </li>
                  <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                    <button
                      type="button"
                      class="text-xs font-bold uppercase px-5 py-3 rounded"
                      v-on:click="toggleTabs(4)"
                      v-bind:class="{ 'text-black bg-transparent': openTab !== 4, 'w-full bg-black text-white': openTab === 4 }"
                    >
                      Video
                    </button>
                  </li>
                </ul>
                <div class="relative flex flex-col min-w-0 break-words w-full mb-6 rounded">
                  <div class="px-4 flex-auto">
                    <div class="tab-content tab-space">
                      <!-- Description Tab -->
                      <div v-bind:class="{ 'hidden': openTab !== 1, 'block': openTab === 1 }">
                        <div class="mr-4">
                          <span class="font-bold text-gray-700">Sexo:</span>
                          <span class="text-gray-600">{{ horseData.Genre || 'NA' }}</span>
                          <br>
                          <span class="font-bold text-gray-700">Fecha de Nacimiento:</span>
                          <span class="text-gray-600">{{ horseData.BirthDate || 'NA' }}</span>
                          <br>
                          <span class="font-bold text-gray-700">Color:</span>
                          <span class="text-gray-600">{{ horseData.Color || 'NA' }}</span>
                          <br>
                          <span class="font-bold text-gray-700">Peso:</span>
                          <span class="text-gray-600">{{ horseData.Weight || 'NA' }}</span>
                          <span class="text-gray-600">kg</span>
                          <br>
                          <span class="font-bold text-gray-700">Altura:</span>
                          <span class="text-gray-600">{{ horseData.Height || 'NA' }}</span>
                          <span class="text-gray-600">m</span>
                          <br>
                          <span class="font-bold text-gray-700">Ubicacion:</span>
                          <span class="text-gray-600">{{ horseData.Location || 'NA' }}</span>
                          <br>
                          <span class="font-bold text-gray-700">Criadero:</span>
                          <span class="text-gray-600">{{ horseData.Hatchery || 'NA' }}</span>
                          <br>
                          <span class="font-bold text-gray-700">No. Registro:</span>
                          <span class="text-gray-600">{{ horseData.registerNumber || 'NA' }}</span>
                          <br>
                          <span class="font-bold text-gray-700">Edad:</span>
                          <span class="text-gray-600">{{ horseData.Age || 'NA' }}</span>
                          <span class="text-gray-600">años</span>
                        </div>
                      </div>
                      <!-- Pedigree Tab -->
                      <div v-bind:class="{ 'hidden': openTab !== 2, 'block': openTab === 2 }">
                        <div class="pedigreeTab bg-white py-5 px-5">
                          <Pedigree :link="horseData.Pedigree" />
                        </div>
                      </div>
                      <div v-bind:class="{ 'hidden': openTab !== 3, 'block': openTab === 3 }">
                        <p>
                          <!-- <img
                            src="@/public/1000_F_572792968_HTMtcUHQbWfHld1FAXVIKtWl3X2XUPjt.jpg"
                            style="height: 100%; width: 100%;"
                          > -->
                          <button
                            type="button"
                            class="w-full bg-black text-white text-xs font-bold uppercase px-5 py-3 rounded"
                          >Descargar X-Ray</button>
                        </p>
                      </div>
                      <div v-bind:class="{ 'hidden': openTab !== 4, 'block': openTab === 4 }">
                        <p>
                          Video no disponible por el momento
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
        <div class="border-b border-gray-300 my-4"></div>
      </div>

    </div>
  </div>
</template>
<script>
import Pedigree from '../../components/bid/horsePedigree.vue'
import Carousel from '../../components/Carousel.vue'
import Winner from '../../components/bid/winner.vue'
import Bids from '../../components/bid/detailsBid.vue'
import MakeOffer from '../../components/bid/makeOffer.vue'
import axios from 'axios'
import JWTDecode from "jwt-decode"
import moment from 'moment'


export default {
  components: {
    Pedigree,
    Bids,
    MakeOffer,
    Winner,
    Carousel,
  },
  props: {
    bidId: {
      type: String,
      required: true
    },
    horseID: {
      type: [String, Number],
      required: true
    }
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
      },
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
      statusBid: false,
      apiImg: 'https://storage.googleapis.com/horsebook/',
      formData: {
        subasta_id: '',
        horse_id: '',
        amount: null,
        email: '',
        pre_bid: true
      },
      openTab: 1,
      rawAmount: '',
      largeBidConfirmed: false,
      successMessage: '',
      errorMessage: '',
      OfferStatus: null,
    }
  },
  created() {
    this.age = this.calculateAge();
    this.testImages()
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
    setTimeout(() => {
      this.formData.amount = this.preloadAmount();
    }, 1500);
  },
  methods: {
    testImages() {
      let id = 1
      axios.get(this.$config.baseLaSilla + `/horses/${id}/images`)
        .then(response => {
          console.log(response.data)
        })
        .catch(error => {
          console.error(error);
        });
    },
    addThousand() {
      let currentValue = parseInt(this.formData.amount.replace(',', ''));
      currentValue += 1000;
      this.formData.amount = currentValue.toLocaleString('en-US');
    },
    substractThousand() {
      let currentValue = parseInt(this.formData.amount.replace(',', ''));
      currentValue -= 1000;
      this.formData.amount = currentValue.toLocaleString('en-US');
    },
    preloadAmount() {
      let lastOfferInt = parseInt(this.lastOffer.replace(',', ''));
      lastOfferInt += 1000;
      const lastOfferStr = lastOfferInt.toLocaleString('en-US');
      return lastOfferStr;
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
    fetchData() {
      const listSubastasEndpoint = `/subastas/list-subastas/?id=${this.bidId}`
      const url = `${this.$config.baseURL}${listSubastasEndpoint}`
      const decoded = JWTDecode(this.$cookies.get("access_token"))
      axios.get(url, {
        headers: {
          Authorization: `Token ${decoded.token}`
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
          //Age
          //
          //No. Register
          this.horseData.registerNumber = horse.horses[this.horsePositionList].local_data.registration_no
          //Hatchery
          this.horseData.Hatchery = horse.horses[this.horsePositionList].external_data.birth_location
          const birthDateMoment = moment(this.horseData.BirthDate, 'DD/MM/YYYY');
          const today = moment();
          this.horseData.Age = today.diff(birthDateMoment, 'years');
        })
        .catch(error => {
          console.error('No funciona');
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
      const decoded = JWTDecode(this.$cookies.get("access_token"));
      this.formData.horse_id = String(this.horseID);
      this.formData.amount = submittedAmount;
      this.formData.subasta_id = this.bidId;
      this.formData.email = this.setUser.email;
      //status offer
      setTimeout(() => {
        this.formData.amount = this.preloadAmount();
      }, 1500);

      axios.post(url, this.formData, {
        headers: {
          Authorization: `Token ${decoded.token}`,
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

<style>
.cont-bid {
  display: flex;
  font-family: Arial, Helvetica, sans-serif;
}

.cont-context {
  display: flex;
  flex-direction: column;
  padding-top: 25px;
  width: 100vw;
  min-width: 970px;
}

.cont-horseImg {
  border-radius: 15px;
}

.img-horse {
  width: 100%;
  height: auto;
}

.data-bid {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  font-size: 14px;
  padding-top: 15px;
  padding-bottom: 75px;

  .alert {
    padding: 0.75rem 1.25rem;
    margin-bottom: 1rem;
    border: 1px solid transparent;
    border-radius: 0.25rem;
    max-width: 100%;
    position: fixed;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .alert-success {
    color: #155724;
    background-color: #d4edda;
    border-color: #c3e6cb;
  }

  .alert-danger {
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
  }
}

.pedigreeTab {
  border-radius: 15px;
  box-shadow: 0px 1px 2px 1px rgba(0, 0, 0, 0.2);
}

.input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.dollar-symbol {
  position: absolute;
  left: 50px;
  z-index: 2;
}

.custom-input {
  padding-left: 20px;
}

.usd-symbol {
  position: absolute;
  right: 65px;
  z-index: 2;
}

.alert-cont {
  z-index: 9999;
  position: relative;
}
</style>
