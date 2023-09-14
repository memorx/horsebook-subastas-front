<template>
  <div class="p-5 bg-zinc-200">
    <Loading
      v-if="loading"
      class="fixed w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
    />
    <div>
      <div class="bg-gray-400 flex items-center justify-between p-6 md:p-10 rounded-t-lg">
        <p class="text-xl text-white font-bold">DATOS GENERALES</p>
        <NuxtLink to="/user/perfil/editar">
          <button class="bg-white text-black p-2 rounded-lg">
            <i class="fas fa-pencil-alt mr-2 text-blue-500"></i> Editar
          </button>
        </NuxtLink>
      </div>
      <div class="bg-white rounded-b-lg p-6 md:p-10 mb-5">
        <div class="grid md:grid-cols-2 grid-cols-1 gap-4 my-5">
          <div class="flex flex-col">
            <p class="text-md font-bold mb-5">Nombre(s): <span class="font-medium">{{ email?.name }}</span></p>
            <p class="text-md font-bold mb-5">Apellido paterno: <span class="font-medium">{{ email.fathers_surname
            }}</span>
            </p>
            <p class="text-md font-bold mb-5">Apellido materno: <span class="font-medium">{{ email.mothers_maiden_name
            }}</span></p>
            <p class="text-md font-bold mb-5">Fecha de nacimiento: <span class="font-medium">{{ email.birth_date }}</span>
            </p>
            <p class="text-md font-bold mb-5">Email: <span class="font-medium">{{ email.email }}</span></p>
            <p class="text-md font-bold mb-5">Teléfono: <span class="font-medium">{{ email.phone }}</span></p>
            <p class="text-md font-bold mb-5">Nacionalidad: <span class="font-medium">{{ selectedNationality }}</span>
            </p>
          </div>
          <div class="flex flex-col">
            <p class="text-md font-bold mb-5">Pais: <span class="font-medium">{{ selectedCountry }}</span></p>
            <p class="text-md font-bold mb-5">Estado: <span class="font-medium">{{ selectedState }}</span></p>
            <p class="text-md font-bold mb-5">Ciudad: <span class="font-medium">{{ selectedCity }}</span>
            </p>
            <p class="text-md font-bold mb-5">Calle: <span class="font-medium">{{ email.street }}</span></p>
            <p class="text-md font-bold mb-5">Número exterior: <span class="font-medium">{{ email.outdoor_number }}</span>
            </p>
            <p class="text-md font-bold mb-5">Número interior: <span class="font-medium">{{ email.interior_number
            }}</span>
            <p class="text-md font-bold mb-5">CP: <span class="font-medium">{{ email.zip_code }}</span></p>
            </p>
          </div>
          <p
            v-if="email.official_document"
            class="text-md font-bold mb-5"
          >Identificacion Oficial Enfrente: <span>
              <img
                class="rounded-lg"
                :src="email.official_document"
                alt="official_document"
              >
            </span>
          </p>
          <p
            v-else
            class="text-md font-bold mb-5"
          >Identificacion Oficial Enfrente: <span class="font-medium">No existe un documento cargado</span>
          </p>
          <p
            v-if="email.official_document_back"
            class="text-md font-bold mb-5"
          >Identificacion Oficial Atras: <span>
              <img
                class="rounded-lg"
                :src="email.official_document_back"
                alt="official_document"
              >
            </span>
          </p>
          <p
            v-else
            class="text-md font-bold mb-5"
          >Identificacion Oficial Atras: <span class="font-medium">No existe un documento cargado</span>
          </p>
        </div>
      </div>
    </div>
    <div class="bg-gray-400 flex items-center justify-between p-6 md:p-10 rounded-t-lg">
      <p class="text-xl text-white font-bold">SEGURIDAD</p>
      <NuxtLink to="/user/perfil/editar">
        <button
          @click="clearUserData"
          class="bg-white text-black p-2 rounded-lg"
        >
          <i class="fas fa-pencil-alt mr-2 text-blue-500"></i> Cambiar contraseña
        </button>
      </NuxtLink>
    </div>
    <div class="bg-white rounded-b-lg p-6 md:p-10 mb-5">
      <p class="text-md font-bold mb-5">Contraseña: <span class="font-light">**********</span></p>
    </div>
    <div class="bg-gray-400 flex items-center justify-between p-6 md:p-10 rounded-t-lg">
      <p class="text-xl text-white font-bold">Historial de Subastas</p>
      <div>
        <button
          :class="selectedStatus == 'all' ? 'bg-white text-black py-1 px-8 rounded-lg font-bold' : 'bg-gray-400 text-white py-1 px-8 rounded-lg'"
          @click="selectedStatus = 'all'"
        >
          Todas
        </button>
        <button
          :class="selectedStatus == 'won' ? 'bg-white text-black py-1 px-8 rounded-lg font-bold' : 'bg-gray-400 text-white py-1 px-8 rounded-lg'"
          @click="selectedStatus = 'won'"
        >
          Ganadas
        </button>
        <button
          :class="selectedStatus == 'lost' ? 'bg-white text-black py-1 px-8 rounded-lg font-bold' : 'bg-gray-400 text-white py-1 px-8 rounded-lg'"
          @click="selectedStatus = 'lost'"
        >
          Perdidas
        </button>
      </div>
    </div>
    <div class="bg-white rounded-b-lg p-6 md:p-10 mb-5">
      <div class="overflow-x-auto rounded-lg">
        <table class="min-w-full rounded-lg bg-gray-300">
          <thead>
            <tr class="bg-gray-700 text-white">
              <th class="table-header">Subasta</th>
              <th class="table-header">Caballo</th>
              <th class="table-header">Fecha</th>
              <th class="table-header">Total</th>
              <th class="table-header">Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="record in filteredRecords"
              :key="record.bid_date"
            >
              <td class="table-cell border-y text-center text-sm font-bold">{{ record.subasta.id }}</td>
              <td class="table-cell border-y text-center text-sm">{{ record.horse.external_data.name }}</td>
              <td class="table-cell border-y text-center text-sm">{{ new Date(record.bid_date).toLocaleString() }}</td>
              <td class="table-cell border-y text-center text-sm font-bold">$ {{ record.highest_bid }} USD</td>
              <td
                class="table-cell border-y text-center"
                :style="{ color: record.status === 'won' ? '#027A48' : (record.status === 'lost' ? '#B42318' : '') }"
              >
                {{ record.status === 'won' ? 'Ganada' : (record.status === 'lost' ? 'Perdida' : '') }}
              </td>
            </tr>
          </tbody>
        </table>
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
          text: 'Debes iniciar sesión para poder ver tus datos, se te redirigirá al inicio'
        }).then(() => {
          window.location.href = '/auth/login';
        });
      }
    },
    async getInfo() {
      this.email = [];
      const token = getUserTokenOrDefault()
      const decoded = JWTDecode(this.$cookies.get("access_token"));
      const url = `${this.$config.baseURL}/users/list-app-users/?email=${decoded.email}`;
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
        title: '¿Estás seguro que deseas cambiar tu contraseña?',
        text: 'Se te redirigirá hacia el inicio',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'Cancelar'
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
