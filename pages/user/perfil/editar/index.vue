<template>
  <div class="p-5 bg-zinc-200">
    <Loading
      v-if="loading"
      class="fixed w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
    />
    <div class="bg-white rounded-lg p-6 md:p-10 mb-4">
      <div class="text-center">
        <NuxtLink to="/user/perfil">
          <button class="bg-black text-white p-2 rounded-lg">
            <i class="fas fa-times mr-2"></i> Cancelar
          </button>
        </NuxtLink>
        <NuxtLink to="/user/perfil">
          <button
            @click="updateProfile"
            class="bg-black text-white p-2 rounded-lg"
          >
            <i class="fas fa-save mr-2"></i> Guardar
          </button>
        </NuxtLink>
      </div>
      <p class="text-xl font-bold mb-6">EDITAR PERFIL</p>
      <div class="border-b border-gray-300 mb-4"></div>
      <div class="grid md:grid-cols-2 grid-cols-1 gap-4">
        <div class="grid md:grid-cols-2 grid-cols-1 gap-2">
          <label class="text-md font-bold">Nombre(s):</label>
          <input
            class="border rounded-lg px-5 py-3 border-black"
            placeholder="Nombre (s)"
            v-model="name"
          />
          <label class="text-md font-bold">Apellido paterno:</label>
          <input
            class="border rounded-lg px-5 py-3 border-black"
            placeholder="Apellido paterno"
            v-model="fathers_surname"
          />
          <label class="text-md font-bold">Apellido materno:</label>
          <input
            class="border rounded-lg px-5 py-3 border-black"
            placeholder="Apellido materno"
            v-model="mothers_maiden_name"
          />
          <label class="text-md font-bold">Fecha de nacimiento:</label>
          <input
            class="border rounded-lg px-5 py-3 border-black"
            placeholder="Fecha de nacimiento"
            type="date"
            v-model="birth_date"
          />
        </div>
        <div class="grid md:grid-cols-2 grid-cols-1 gap-4">
          <label class="text-md font-bold">Nacionalidad:</label>
          <input
            class="border rounded-lg px-5 py-3 border-black"
            placeholder="Nacionalidad"
            v-model="nationality"
          />
          <label class="text-md font-bold">Teléfono:</label>
          <input
            class="border rounded-lg px-5 py-3 border-black"
            placeholder="Teléfono"
            v-model="phone"
          />
          <label class="text-md font-bold">Pasaporte ó Identificacion oficial:</label>
          <input
            class="border rounded-lg px-5 py-3 border-black"
            placeholder="# de pasaporte o ID"
            v-model="identification_document"
          />
          <div></div>
        </div>
      </div>
      <div class="border-b border-gray-300 my-5"></div>
      <div class="grid md:grid-cols-2 grid-cols-1 gap-4">
        <div class="grid md:grid-cols-2 grid-cols-1 gap-4">
          <label class="text-md font-bold">Pais:</label>
          <input
            class="border rounded-lg px-5 py-3 border-black"
            placeholder="Pais"
            v-model="country"
          />
          <label class="text-md font-bold">Estado:</label>
          <input
            class="border rounded-lg px-5 py-3 border-black"
            placeholder="Estado"
            v-model="state"
          />
          <label class="text-md font-bold">Ciudad:</label>
          <input
            class="border rounded-lg px-5 py-3 border-black"
            placeholder="Ciudad"
            v-model="municipalitie"
          />
          <label class="text-md font-bold">Calle:</label>
          <input
            class="border rounded-lg px-5 py-3 border-black"
            placeholder="Calle"
            v-model="street"
          />
        </div>
        <div class="grid md:grid-cols-2 grid-cols-1 gap-4">
          <label class="text-md font-bold">Número exterior:</label>
          <input
            class="border rounded-lg px-5 py-3 border-black"
            placeholder="Número exterior"
            v-model="outdoor_number"
          />
          <label class="text-md font-bold">Número interior:</label>
          <input
            class="border rounded-lg px-5 py-3 border-black"
            placeholder="Número interior"
            v-model="interior_number"
          />
          <label class="text-md font-bold">C.P:</label>
          <input
            class="border rounded-lg px-5 py-3 border-black"
            placeholder="C.P"
            v-model="zip_code"
          />
          <div></div>
        </div>
      </div>
      <div class="text-center mt-5">
        <NuxtLink to="/user/perfil">
          <button class="bg-black text-white p-2 rounded-lg">
            <i class="fas fa-times mr-2"></i> Cancelar
          </button>
        </NuxtLink>
        <NuxtLink to="/user/perfil">
          <button
            @click="updateProfile"
            class="bg-black text-white p-2 rounded-lg"
          >
            <i class="fas fa-save mr-2"></i> Guardar
          </button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import JWTDecode from 'jwt-decode';
import Loading from '../../../../components/shared/Loading.vue';
import Swal from 'sweetalert2';

export default {
  components: { Loading },
  data() {
    return {
      loading: false,
      loggedInUser: null,
      email: [],
      profile: null,
      name: '',
      fathers_surname: '',
      mothers_maiden_name: '',
      identification_document: '',
      country: '',
      state: '',
      municipalitie: '',
      phone: '',
      birth_date: '',
      nationality: '',
      street: '',
      outdoor_number: '',
      interior_number: '',
      zip_code: '',
    }
  },
  computed: {
    setUser() {
      return this.$store.state.user;
    },
  },
  methods: {
    async updateProfile() {
      this.email = [];
      const url = `${this.$config.baseURL}/users/update-user-profile/?email=${this.$store.state.user.email}`;
      const decoded = JWTDecode(this.$cookies.get('access_token'));
      const formattedBirthDate = new Date(this.birth_date).toISOString().split('T')[0];
      if (decoded) {
        const headers = {
          Authorization: `Token ${decoded.token}`,
        };

        const email = this.$store.state.user.email;
        const profileData = {
          email,
          name: this.name || this.profile.name,
          fathers_surname: this.fathers_surname || this.profile.fathers_surname,
          mothers_maiden_name: this.mothers_maiden_name || this.profile.mothers_maiden_name,
          identification_document: this.identification_document || this.profile.identification_document,
          country: this.country || this.profile.country,
          state: this.state || this.profile.state,
          municipalitie: this.municipalitie || this.profile.municipalitie,
          phone: this.phone || this.profile.phone,
          birth_date: formattedBirthDate || this.profile.birth_date,
          nationality: this.nationality || this.profile.nationality,
          street: this.street || this.profile.street,
          outdoor_number: this.outdoor_number || this.profile.outdoor_number,
          interior_number: this.interior_number || this.profile.interior_number,
          zip_code: this.zip_code || this.profile.zip_code
        };

        console.log(profileData, "BODY");

        try {
          const response = await this.$axios.put(url, profileData, { headers });
          console.log(response, "USERS");
          this.$router.push('/user/perfil');
        } catch (error) {
          console.log(error, "ERROR");
          this.loading = false;
        }
      }
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
  },
  mounted() {
    this.validateUser();
    const decoded = JWTDecode(this.$cookies.get('access_token'));

    if (decoded) {
      const token = "7992136a01a768227f14718e20efe5fa077a0db9"; // Replace with your token value
      const headers = {
        Authorization: `Token ${decoded.token}`,
      };

      const email = this.$store.state.user.email;
      const url = `${this.$config.baseURL}/users/list-app-users/?email=${email}`;

      this.loading = true;

      this.$axios.get(url, { headers })
        .then(response => {
          console.log(response, "USERS");
          this.email = response.data.app_user_profile;
          this.profile = response.data.app_user_profile; // Almacenar los datos del perfil en la variable "profile"
          this.loading = false;

          // Asignar los valores actuales del perfil a las variables del componente
          this.name = this.profile.name;
          this.fathers_surname = this.profile.fathers_surname;
          this.mothers_maiden_name = this.profile.mothers_maiden_name;
          this.identification_document = this.profile.identification_document;
          this.country = this.profile.country;
          this.state = this.profile.state;
          this.municipalitie = this.profile.municipalitie;
          this.phone = this.profile.phone;
          this.birth_date = this.profile.birth_date;
          this.nationality = this.profile.nationality;
          this.street = this.profile.street;
          this.outdoor_number = this.profile.outdoor_number;
          this.interior_number = this.profile.interior_number;
          this.zip_code = this.profile.zip_code;
        })
        .catch(error => {
          console.log(error, "ERROR");
          this.loading = false;
        });
    }
  },
  components: {
    Loading,
  },
}
</script>
