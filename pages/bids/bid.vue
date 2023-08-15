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
            <!-- Imagen de Caballo -->
            <div
              class="h-full rounded-lg bg-gray-300 mb-4"
              style="box-shadow: 0px 1px 2px 1px rgba(0, 0, 0, 0.2);"
            >
              <img
                style=""
                class="w-full h-full object-cover cont-horseImg"
                src="../../public/horse_white.png"
                alt="Product Image"
              >
            </div>

          </div>
          <!-- Info de Subasta -->
          <div
            class="px-4"
            style="flex: 4;"
          >
            <h2 class="text-2xl font-bold mb-2">{{ HorsenName }}</h2>
            <!-- Info de Estatus de Subasta -->
            <p
              class="statusOffer"
              v-if="isCurrentDate === 1"
              style="color: green; font-weight: 600; width: 50%;"
            >PRE OFERTA ABIERTA
            </p>
            <p
              class="statusOffer"
              v-else-if="isCurrentDate === 2"
              style="color: green; font-weight: 600; width: 50px;"
            >OFERTA ABIERTA
            </p>
            <p
              class="statusOfferClose"
              v-else
              style="color: red; font-weight: 600;"
            >OFERTA CERRADA</p>
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
              <div class="flex items-center">
                <input
                  type="number"
                  class="border rounded-md flex-grow"
                  :placeholder="`Ejemplo: $${(Number(lastOffer.replace('.', '')) + 1000).toLocaleString('de-DE')} USD`"
                  autofocus
                  :min="0"
                  id="amount"
                  :value="formattedAmount"
                  @input="handleAmountInput"
                  required
                >
                <button
                  class="border border-black bg-transparent text-black ml-2 px-4 py-2 rounded focus:outline-none hover:bg-gray-200"
                  type="submit"
                >-</button><button
                  class="border border-black bg-transparent text-black ml-2 px-4 py-2 rounded focus:outline-none hover:bg-gray-200"
                  type="submit"
                >+</button>
                <button
                  class="border border-black bg-transparent text-black ml-2 px-4 py-2 rounded focus:outline-none hover:bg-gray-200"
                  type="submit"
                >Ofertar</button>
              </div>
              <!-- <div class="flex items-center my-5">
                <button
                  class="border border-black bg-transparent text-black px-4 py-2 rounded focus:outline-none hover:bg-gray-200"
                  style="width: 100%; height: 50px;"
                  type="submit"
                >Ofertar</button>
              </div> -->
              <div class="flex items-center my-5">
                <button
                  class="bg-black text-white px-4 py-2 rounded-md hover:bg-grey-100 duration-100"
                  style="width: 100%; height: 50px;"
                  type="submit"
                >Ofertar Sugerida (${{ lastOffer }} USD)</button>
              </div>
            </form>
          </div>
        </div>
        <div class="border-b border-gray-300 my-4"></div>
        <div class="flex flex-col md:flex-row -mx-4">
          <div
            class="px-4"
            style="flex: 7;"
          >
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
                  <div class="px-4 py-5 flex-auto">
                    <div class="tab-content tab-space">
                      <div v-bind:class="{ 'hidden': openTab !== 1, 'block': openTab === 1 }">
                        <ul>
                          <div class="flex flex-col md:flex-row -mx-4">
                            <div
                              class="px-4"
                              style="flex: 4;"
                            >
                              <h2>Peso</h2>
                              <p>153kg</p>
                            </div>
                            <div
                              class="px-4"
                              style="flex: 4;"
                            >
                              <h3>Peso</h3>
                              <p>153kg</p>
                            </div>
                            <div
                              class="px-4"
                              style="flex: 4;"
                            >
                              <h3>Peso</h3>
                              <p>153kg</p>
                            </div>
                          </div>
                        </ul>
                      </div>
                      <div v-bind:class="{ 'hidden': openTab !== 2, 'block': openTab === 2 }">
                        <p>
                        <ul>
                          <li>Nombre: Pancho</li>
                          <li>Peso: 300kg</li>
                          <li>Rancho: Mamulique</li>
                          <li>Raza: Pegaso</li>
                        </ul>
                        </p>
                      </div>
                      <div v-bind:class="{ 'hidden': openTab !== 3, 'block': openTab === 3 }">
                        <p>
                        <ul>
                          <li>Nombre: Pancho</li>
                          <li>Peso: 300kg</li>
                          <li>Rancho: Mamulique</li>
                          <li>Raza: Pegaso</li>
                        </ul>
                        </p>
                      </div>
                      <div v-bind:class="{ 'hidden': openTab !== 4, 'block': openTab === 4 }">
                        <p>
                        <ul>
                          <li>Nombre: Pancho</li>
                          <li>Peso: 300kg</li>
                          <li>Rancho: Mamulique</li>
                          <li>Raza: Pegaso</li>
                        </ul>
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
import SimpleCarousel from "vue2-simple-carousel";
import Winner from '../../components/bid/winner.vue'
import Bids from '../../components/bid/detailsBid.vue'
import MakeOffer from '../../components/bid/makeOffer.vue'
import axios from 'axios'
import JWTDecode from "jwt-decode"
import moment from 'moment'


export default {
  components: {
    Bids,
    MakeOffer,
    Winner,
    SimpleCarousel,
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
  computed: {
    formattedAmount() {
      const amount = parseInt(this.formData.amount, 10);
      return isNaN(amount) ? '' : amount.toLocaleString('en-US').replace(/,/g, '.'); // Format with dots as thousands separators
    },
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
  },
  methods: {
    toggleTabs: function (tabNumber) {
      this.openTab = tabNumber
    },
    handleAmountInput(event) {
      const value = event.target.value.replace(/\D/g, ''); // Keep only digit characters
      this.formData.amount = value; // Update formData.amount with the numeric value
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
        }
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
      const submittedAmount = parseInt(this.formData.amount);
      const lastOfferNumber = parseInt(this.lastOffer.replace(/\./g, ''));
      // console.log(submittedAmount, lastOfferNumber, this.lastOffer)
      if (submittedAmount - lastOfferNumber > 10000 && !this.largeBidConfirmed) {
        if (window.confirm('Estas a punto de ofertar una diferencia de mas de $10.000, estas seguro?')) {
          this.largeBidConfirmed = true;
          this.submitForm(event);
          return;
        } else {
          return;
        }
      }

      this.largeBidConfirmed = false;

      const PostBidEndpoint = '/subastas/bid/';
      const url = `${this.$config.baseURL}${PostBidEndpoint}`;
      const decoded = JWTDecode(this.$cookies.get("access_token"));
      this.formData.horse_id = String(this.horseID);
      this.formData.amount = submittedAmount;
      this.formData.subasta_id = this.bidId;
      this.formData.email = this.setUser.email;
      //status offer
      this.formData.pre_bid = this.statusOffer(this.BidDate);

      axios.post(url, this.formData, {
        headers: {
          Authorization: `Token ${decoded.token}`,
        },
      })
        .then((response) => {
          this.successMessage = 'Oferta enviada correctamente';
          this.errorMessage = '';
          this.$emit('form-submitted');
          this.formData.amount = ''; // Clear the input value
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
          this.formData.amount = '';
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
</style>
