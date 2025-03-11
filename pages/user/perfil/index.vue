<template>
  <div class="p-5 bg-black">
    <Loading
      v-if="loading"
      class="fixed w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
    />
    <div>
      <div class="bg-gradient-to-r from-[#efb810] via-[#fff3c4] via-[#efb810] via-[#fff3c4] to-[#efb810] flex items-center justify-between p-6 md:p-10 rounded-t-lg">
        <p class="text-xl text-black font-bold uppercase">{{ $t('profile.title') }}</p>
        <NuxtLink :to="localePath('/user/perfil/editar')">
          <button class="bg-white text-black p-2 rounded-lg">
            <i class="fas fa-pencil-alt mr-2 text-gold-100"></i> {{ $t('general.edit') }}
          </button>
        </NuxtLink>
      </div>
      <div class="bg-white rounded-b-lg p-6 md:p-10 mb-5">
        <div class="grid md:grid-cols-2 grid-cols-1 gap-4 my-5">
          <div class="flex flex-col">
            <p class="text-md font-bold mb-5">{{ $t('profile.name') }}: <span class="font-medium">{{ email?.name }}</span></p>
            <p class="text-md font-bold mb-5">{{ $t('profile.fathersSurname') }}: <span class="font-medium">{{ email?.fathers_surname
            }}</span>
            </p>
            <p class="text-md font-bold mb-5">{{ $t('profile.mothersMaidenName') }}: <span class="font-medium">{{ email?.mothers_maiden_name
            }}</span></p>
            <p class="text-md font-bold mb-5">{{ $t('profile.birthdate') }}: <span class="font-medium">{{ email?.birth_date }}</span>
            </p>
            <p class="text-md font-bold mb-5">{{ $t('login.email') }}: <span class="font-medium">{{ email?.email }}</span></p>
            <p class="text-md font-bold mb-5">{{ $t('signup.phone') }}: <span class="font-medium">{{ email?.phone }}</span></p>
            <p class="text-md font-bold mb-5">{{ $t('profile.nationality') }}: <span class="font-medium">{{ selectedNationality }}</span>
            </p>
          </div>
          <div class="flex flex-col">
            <p class="text-md font-bold mb-5">{{ $t('profile.country') }}: <span class="font-medium">{{ selectedCountry }}</span></p>
            <p class="text-md font-bold mb-5">{{ $t('profile.state') }}: <span class="font-medium">{{ selectedState }}</span></p>
            <p class="text-md font-bold mb-5">{{ $t('profile.city') }}: <span class="font-medium">{{ selectedCity }}</span>
            </p>
            <p class="text-md font-bold mb-5">{{ $t('profile.street') }}: <span class="font-medium">{{ email?.street }}</span></p>
            <p class="text-md font-bold mb-5">{{ $t('profile.exteriorNo') }}: <span class="font-medium">{{ email?.outdoor_number }}</span>
            </p>
            <p class="text-md font-bold mb-5">{{ $t('profile.interiorNo') }}: <span class="font-medium">{{ email?.interior_number
            }}</span>
            <p class="text-md font-bold mb-5">{{ $t('profile.zipCode') }}: <span class="font-medium">{{ email?.zip_code }}</span></p>
            </p>
          </div>
          <p
            v-if="email?.official_document"
            class="text-md font-bold mb-5"
          >{{ $t('profile.frontIdentityDoc') }}: <span>
              <img
                class="rounded-lg"
                :src="email?.official_document"
                alt="official_document"
              >
            </span>
          </p>
          <p
            v-else
            class="text-md font-bold mb-5"
          >{{ $t('profile.frontIdentityDoc') }}: <span class="font-medium">{{ $t('profile.noDocumentUploaded') }}</span>
          </p>
          <p
            v-if="email?.official_document_back"
            class="text-md font-bold mb-5"
          >{{ $t('profile.backIdentityDoc') }}: <span>
              <img
                class="rounded-lg"
                :src="email?.official_document_back"
                alt="official_document"
              >
            </span>
          </p>
          <p
            v-else
            class="text-md font-bold mb-5"
          >{{ $t('profile.backIdentityDoc') }}: <span class="font-medium">{{ $t('profile.noDocumentUploaded') }}</span>
          </p>
        </div>
      </div>
    </div>
    <!-- <div class="bg-gray-400 flex items-center justify-between p-6 md:p-10 rounded-t-lg">
      <p class="text-xl text-black font-bold">SEGURIDAD</p>
      <NuxtLink to="/user/perfil/editar">
        <button
          @click="clearUserData"
          class="bg-white text-black p-2 rounded-lg"
        >
          <i class="fas fa-pencil-alt mr-2 text-blue-500"></i> Cambiar contraseña
        </button>
      </NuxtLink>
    </div> -->
    <!-- <div class="bg-white rounded-b-lg p-6 md:p-10 mb-5">
      <p class="text-md font-bold mb-5">Contraseña: <span class="font-light">**********</span></p>
    </div> -->
    <div class="bg-gradient-to-r from-[#efb810] via-[#fff3c4] via-[#efb810] via-[#fff3c4] to-[#efb810] flex flex-col md:flex-row md:items-center md:justify-between p-4 md:p-10 rounded-t-lg space-y-4 md:space-y-0">
  <p class="text-xl text-black font-bold uppercase">{{ $t('profile.auctions.history') }}</p>

      <div class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
        <button
          :class="[
            'w-full md:w-auto py-2 md:py-1 px-8 transition-colors',
            selectedStatus == 'all'
              ? 'bg-white text-black font-bold border-2 border-black'
              : 'bg-white text-black border-2 border-custom-gold'
          ]"
          @click="selectedStatus = 'all'"
        >
          {{ $t('profile.auctions.all') }}
        </button>

        <button
          :class="[
            'w-full md:w-auto py-2 md:py-1 px-8 transition-colors',
            selectedStatus == 'won'
              ? 'bg-white text-black font-bold border-2 border-black'
              : 'bg-white text-black border-2 border-custom-gold'
          ]"
          @click="selectedStatus = 'won'"
        >
          {{ $t('profile.auctions.won') }}
        </button>

        <button
          :class="[
            'w-full md:w-auto py-2 md:py-1 px-8 transition-colors',
            selectedStatus == 'lost'
              ? 'bg-white text-black font-bold border-2 border-black'
              : 'bg-white text-black border-2 border-custom-gold'
          ]"
          @click="selectedStatus = 'lost'"
        >
          {{ $t('profile.auctions.lost') }}
        </button>
      </div>
    </div>
    <div class="bg-white rounded-b-lg p-4 md:p-10 mb-5">
  <div class="hidden md:block overflow-x-auto rounded-lg">
    <table v-if="filteredRecords?.length > 0" class="min-w-full rounded-lg bg-gray-100">
      <thead>
        <tr class="bg-[#EFB919] text-black text-sm">
          <th class="py-3 table-header uppercase">{{ $t('auction.horse') }}</th>
          <th class="table-header uppercase">{{ $t('auction.auctionDate') }}</th>
          <th class="table-header uppercase">{{ $t('auction.total') }}</th>
          <th class="table-header uppercase">{{ $t('auction.status') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="record in filteredRecords" :key="record.bid_date" class="hover:bg-gold-100 transition-colors duration-200" :title="record.subasta.id">
          <td class="py-3 table-cell border-y text-center text-sm">{{ record.horse.external_data.name }}</td>
          <td class="table-cell border-y text-center text-sm">{{ new Date(record.bid_date).toLocaleString() }}</td>
          <td class="table-cell border-y text-center text-sm font-bold">$ {{ record.highest_bid }} USD</td>
          <td class="table-cell border-y text-center"
              :style="{ color: record.status === 'won' ? '#027A48' : (record.status === 'lost' ? '#B42318' : '') }">
            {{ $t(`profile.auctions.status.${record.status}`) }}
          </td>
        </tr>
      </tbody>
    </table>

    <div v-else class="flex flex-col items-center justify-center py-16 bg-gray-100 rounded-lg">
      <div class="mb-4">
        <svg class="w-16 h-16 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
        </svg>
      </div>
      <p class="text-gray-500 text-lg font-medium">{{ $t('profile.noAuctions') }}</p>
    </div>
  </div>

  <div class="md:hidden">
    <div v-if="filteredRecords?.length > 0" class="space-y-4">
      <div v-for="record in filteredRecords"
           :key="record.bid_date"
           class="bg-gray-100 rounded-lg p-4 space-y-3">

        <div class="flex justify-between items-center">
          <span class="text-sm font-semibold text-gray-600">{{ $t('auction.horse') }}</span>
          <span class="text-sm">{{ record.horse.external_data.name }}</span>
        </div>

        <div class="flex justify-between items-center">
          <span class="text-sm font-semibold text-gray-600">{{ $t('auction.auctionDate') }}</span>
          <span class="text-sm">{{ new Date(record.bid_date).toLocaleString() }}</span>
        </div>

        <div class="flex justify-between items-center">
          <span class="text-sm font-semibold text-gray-600">{{ $t('auction.total') }}</span>
          <span class="text-sm font-bold">$ {{ record.highest_bid }} USD</span>
        </div>

        <div class="flex justify-between items-center">
          <span class="text-sm font-semibold text-gray-600">{{ $t('auction.status') }}</span>
          <span class="text-sm"
                :style="{ color: record.status === 'won' ? '#027A48' : (record.status === 'lost' ? '#B42318' : '') }">
            {{ $t(`profile.auctions.status.${record.status}`) }}
          </span>
        </div>
      </div>
    </div>

    <div v-else class="flex flex-col items-center justify-center py-12 bg-gray-100 rounded-lg">
      <div class="mb-3">
        <svg class="w-12 h-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
        </svg>
      </div>
      <p class="text-gray-500 text-base font-medium">{{ $t('profile.noAuctions') }}</p>
    </div>
  </div>
</div>

  </div>
</template>

<script>
import JWTDecode from 'jwt-decode';
import Loading from '../../../components/shared/Loading.vue';
import Swal from 'sweetalert2';
import getUserTokenOrDefault from '../../../utils/getUserTokenOrDefault';


export default {
  components: { Loading },
  data() {
    return {
      loading: false,
      loggedInUser: null,
      email: [],
      info: [],
      profile: null,
      selectedStatus: "all",
      countries: [],
      states: [],
      cities: [],
      selectedCountry: '',
      selectedState: '',
      selectedCity: '',
      selectedNationality: '',
    }
  },
  created() {
    this.getInfo();
  },
  mounted() {
    this.validateUser();
    this.getAuctionsRecord();
  },
  computed: {
    setUser() {
      return this.$store.state.user;
    },
    filteredRecords() {
      if (this.selectedStatus === 'all') {
        return this.info.records; // Mostrar todas las subastas
      } else if (this.selectedStatus === 'won') {
        return this.info.records?.filter(record => record.status === 'won'); // Mostrar subastas ganadas
      } else if (this.selectedStatus === 'lost') {
        return this.info.records?.filter(record => record.status === 'lost'); // Mostrar subastas perdidas
      }
    }
  },

  methods: {
    fetchCountries() {
      const endpoint = '/countries';
      const url = `${this.$config.baseURL}${endpoint}`;
      axios
        .get(url)
        .then(response => {
          const countries = response.data;
          this.countries = countries;
        })
        .catch(error => {
          console.error(error);
        });
    },
    async fetchStates() {
      const endpoint = '/states'
      const url = `${this.$config.baseURL}${endpoint}`
      const code = this.selectedCountryCode
      axios.get(url, {
        params: {
          country: code
        },
      })
        .then(response => {
          const states = response.data
          this.states = states
        })
        .catch(error => {
          console
        })
    },
    async fetchCities() {
      const endpoint = '/cities'
      const url = `${this.$config.baseURL}${endpoint}`
      const code = this.selectedStateCode
      axios.get(url, {
        params: {
          state: code
        },
      })
        .then(response => {
          const cities = response.data
          this.cities = cities
        })
        .catch(error => {
          console
        })
    },
    validateUser() {
      if (!this.$store.state.user) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: this.$t('profile.mustLoginMsg')
        }).then(() => {
          window.location.href = '/auth/login';
        });
      }
    },

    async getInfo() {
      this.email = [];
      const token = getUserTokenOrDefault()
      const decoded = JWTDecode(this.$cookies.get("access_token"));
      const url = `${this.$config.baseURL}/users/me`;
      if (token) {
        const headers = {
          Authorization: `Token ${token}`,
        };

        this.loading = true;

        try {
          const response = await this.$axios.get(url, { headers });
          this.email = response.data.app_user_profile;
          this.profile = response.data.app_user_profile;
          this.selectedCountry = this.email.country.name
          this.selectedState = this.email.state.name
          this.selectedCity = this.email.municipalitie.name
          this.selectedNationality = this.email.nationality.name
          this.loading = false;
        } catch (error) {
          this.loading = false;
        }
      }
    },
    async getAuctionsRecord() {
      this.info = [];
      const decoded = JWTDecode(this.$cookies.get("access_token"));
      const url = `${this.$config.baseURL}/subastas/get-auction-records?email=${decoded.email}`
      if (decoded) {
        const headers = {
          Authorization: `Token ${decoded.token}`,
        }
        this.loading = true;
        try {
          const info = await this.$axios.get(url, { headers });
          this.info = info.data
          this.loading = false;

        } catch (error) {
          this.loading = false;
        }
      }
    },
    clearUserData() {
      Swal.fire({
        title: this.$t('profile.changePasswordConfirm'),
        text: this.$t('profile.redirectToHome'),
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: this.$t('general.yes'),
        cancelButtonText: this.$t('general.cancel')
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.commit("clearUserData");
          window.location.href = '/auth/login';
        }
      });
    }
  }
}
</script>
