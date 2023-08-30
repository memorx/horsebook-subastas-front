<template>
  <div class="p-5 bg-zinc-200">
    <Loading
      v-if="loading"
      class="fixed w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
    />
    <div>
      <div class="bg-white rounded-lg p-6 md:p-10 mb-5">
        <div class="flex items-center justify-between mb-4">
          <p class="text-xl font-bold">DATOS GENERALES</p>
          <NuxtLink to="/user/perfil/editar">
            <button class="bg-black text-white p-2 rounded-lg">
              <i class="fas fa-pencil-alt mr-2"></i> Editar
            </button>
          </NuxtLink>
        </div>
        <div class="border-b border-gray-300 mb-4"></div>
        <div class="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div>
            <p class="text-md font-bold mb-5">Nombre(s): <span class="font-medium">{{ email.name }}</span></p>
            <p class="text-md font-bold mb-5">Apellido paterno: <span class="font-medium">{{ email.fathers_surname
            }}</span>
            </p>
            <p class="text-md font-bold mb-5">Apellido materno: <span class="font-medium">{{ email.mothers_maiden_name
            }}</span></p>
            <p class="text-md font-bold mb-5">Fecha de nacimiento: <span class="font-medium">{{ email.birth_date }}</span>
            </p>
          </div>
          <div>
            <p class="text-md font-bold mb-5">Email: <span class="font-medium">{{ email.email }}</span></p>
            <p class="text-md font-bold mb-5">Teléfono: <span class="font-medium">{{ email.phone }}</span></p>
            <p class="text-md font-bold mb-5">Nacionalidad: <span class="font-medium">{{ email.nationality }}</span></p>
            <p class="text-md font-bold mb-5">Pasaporte ó Identificacion oficial: <span class="font-medium">{{
              email.identification_document }}</span></p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-lg p-6 md:p-10 mb-5">
        <div class="flex items-center justify-between mb-4">
          <p class="text-xl font-bold mb-4">DATOS DE DOMICILIO</p>
          <NuxtLink to="/user/perfil/editar">
            <button class="bg-black text-white p-2 rounded-lg">
              <i class="fas fa-pencil-alt mr-2"></i> Editar
            </button>
          </NuxtLink>
        </div>
        <div class="border-b border-gray-300 mb-4"></div>
        <div class="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div>
            <p class="text-md font-bold mb-5">Pais: <span class="font-medium">{{ email.country }}</span></p>
            <p class="text-md font-bold mb-5">Ciudad: <span class="font-medium">{{ email.state }}</span></p>
            <p class="text-md font-bold mb-5">Estado: <span class="font-medium">{{ email.municipalitie }}</span></p>
            <p class="text-md font-bold mb-5">Calle: <span class="font-medium">{{ email.street }}</span></p>
          </div>
          <div>
            <p class="text-md font-bold mb-5">Número exterior: <span class="font-medium">{{ email.outdoor_number }}</span>
            </p>
            <p class="text-md font-bold mb-5">Número interior: <span class="font-medium">{{ email.interior_number
            }}</span>
            <p class="text-md font-bold mb-5">CP: <span class="font-medium">{{ email.zip_code }}</span></p>
            </p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-lg p-6 md:p-10 mb-5">
        <p class="text-xl font-bold mb-4">SEGURIDAD</p>
        <div class="border-b border-gray-300 mb-4"></div>
        <div class="containerGeneralDatesSecurity">
          <p class="text-md font-bold mb-5">Contraseña: <span class="font-medium">**********</span></p>
        </div>
        <button
          @click="clearUserData"
          class="bg-black text-white py-3 px-5 rounded-lg"
        >
          Cambiar contraseña
        </button>
      </div>
      <div class="bg-white rounded-lg p-6 md:p-10 mb-5">
        <p class="text-xl font-bold mb-4">HISTORIAL DE SUBASTAS
        </p>
        <div class="border-b border-gray-300 mb-4"></div>
        <div class="w-full flex flex-row">
          <div class="mb-5">
            <button
              :class="selectedStatus == 'all' ? 'bg-black text-white py-1 px-8 rounded-lg' : 'bg-white text-black py-1 px-8 rounded-lg border-2'"
              @click="selectedStatus = 'all'"
            >
              Todas
            </button>
            <button
              :class="selectedStatus == 'won' ? 'bg-black text-white py-1 px-8 rounded-lg' : 'bg-white text-black py-1 px-8 rounded-lg border-2'"
              @click="selectedStatus = 'won'"
            >
              Ganadas
            </button>
            <button
              :class="selectedStatus == 'lost' ? 'bg-black text-white py-1 px-8 rounded-lg' : 'bg-white text-black py-1 px-8 rounded-lg border-2'"
              @click="selectedStatus = 'lost'"
            >
              Perdidas
            </button>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead>
              <tr>
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
                <td class="table-cell border-y text-center">{{ record.subasta.id }}</td>
                <td class="table-cell border-y text-center">{{ record.horse.external_data.name }}</td>
                <td class="table-cell border-y text-center">{{ new Date(record.bid_date).toLocaleString() }}</td>
                <td class="table-cell border-y text-center">$ {{ record.highest_bid }} USD</td>
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
  </div>
</template>

<script>
import JWTDecode from 'jwt-decode';
import Loading from '../../../components/shared/Loading.vue';
import moment from 'moment';
import NavBarProfile from "../../../components/NavBar/NavBarProfile"
import Swal from 'sweetalert2';


export default {
  components: { Loading, NavBarProfile },
  data() {
    return {
      loading: false,
      loggedInUser: null,
      email: [],
      info: [],
      profile: null,
      selectedStatus: "all"
    }
  },
  mounted() {
    this.validateUser();
    this.getInfo();
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
        return this.info.records.filter(record => record.status === 'won'); // Mostrar subastas ganadas
      } else if (this.selectedStatus === 'lost') {
        return this.info.records.filter(record => record.status === 'lost'); // Mostrar subastas perdidas
      }
    }
  },

  methods: {
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
      const url = `${this.$config.baseURL}/users/list-app-users/?email=${this.$store.state.user.email}`;
      const decoded = JWTDecode(this.$cookies.get('access_token'));

      if (decoded) {
        const token = "7992136a01a768227f14718e20efe5fa077a0db9"; // Replace with your token value
        const headers = {
          Authorization: `Token ${decoded.token}`,
        };

        this.$store.commit('authenticate', true);
        this.loading = true;

        try {
          const response = await this.$axios.get(url, { headers });
          this.email = response.data.app_user_profile;
          console.log(email)
          this.profile = response.data.app_user_profile; // Almacenar los datos del perfil en la variable "profile"
          this.loading = false;
        } catch (error) {
          this.loading = false;
        }
      }
    },
    async getAuctionsRecord() {
      this.info = [];
      const url = `${this.$config.baseURL}/subastas/get-auction-records?email=${this.$store.state.user.email}`
      const decoded = JWTDecode(this.$cookies.get("access_token"));
      if (decoded) {
        const headers = {
          Authorization: `Token ${decoded.token}`,
        }
        this.loading = true;
        console.log(this.$store.state.user.email, "ESTADO")
        try {
          const info = await this.$axios.get(url, { headers });
          this.info = info.data
          console.log(info.data)
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
