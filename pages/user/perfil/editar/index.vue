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
        <button
          @click="updateProfile"
          class="bg-black text-white p-2 rounded-lg"
        >
          <i class="fas fa-save mr-2"></i> Guardar
        </button>
      </div>
      <p class="text-xl font-bold mb-6">EDITAR PERFIL</p>
      <div class="border-b border-gray-300 mb-4"></div>
      <div class="grid md:grid-cols-2 grid-cols-1 gap-4">
        <div class="grid md:grid-cols-2 grid-cols-1 gap-2">
          <label class="text-black-600 font-medium">Nombre(s):</label>
          <input
            class="w-full rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Nombre (s)"
            v-model="name"
          />
          <label class="text-black-600 font-medium">Apellido paterno:</label>
          <input
            class="w-full rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Apellido paterno"
            v-model="fathers_surname"
          />
          <label class="text-black-600 font-medium">Apellido materno:</label>
          <input
            class="w-full rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Apellido materno"
            v-model="mothers_maiden_name"
          />
          <label class="text-black-600 font-medium">Fecha de nacimiento:</label>
          <input
            class="w-full rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Fecha de nacimiento"
            type="date"
            v-model="birth_date"
          />
        </div>
        <div class="">
          <div class="w-full flex items-center mb-3">
            <label class="text-black-600 font-medium pr-2">Nacionalidad:</label>
            <!-- <input
              @change="updateSelectedNationalityCode"
              class="rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 flex-grow"
              placeholder="Nacionalidad"
              v-model="nationality"
            /> -->
            <select
              @change="updateSelectedNationalityCode"
              v-if="nationalities.length > 0 || this.nationality"
              v-model="selectedNationality"
              class="w-full rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="">{{ nationality }}</option>
              <option
                v-for="nationality in nationalities"
                :key="nationality.code"
                :value="nationality.name"
              >
                {{ nationality.name }}
              </option>
            </select>
          </div>
          <div class="w-full flex">
            <label class="text-black-600 font-medium flex-shrink-0 w-1/5">Teléfono:</label>
            <div class="flex-grow flex">
              <div
                class="rounded-l-md px-4 py-2 border bg-gray-300 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 flex-shrink-0"
              >
                <span class="font-medium">+{{ selectedDialCode || dial_code }}</span>
              </div>
              <input
                v-model="phone"
                required
                class="rounded-r-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 flex-grow"
                placeholder="Ingresar teléfono"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="flex space-x-4">
        <div class="w-1/2">
          <label class="text-black-600 font-medium relative cursor-pointer text-center mx-1">
            <span class="block mb-2">Documento de identidad Enfrente</span>
            <div class="flex items-center">
              <input
                type="file"
                ref="fileInput"
                @change="handleFileChange"
                accept="image/*"
                class="hidden"
              />
              <button
                type="button"
                class="py-2 bg-gray-200 text-gray-500 underline border-dashed border-gray-600 border-2 rounded-lg w-full h-40"
                @click="$refs.fileInput.click()"
              >
                {{ official_document ? 'Cambiar imagen' : 'Escoge una imagen' }}
              </button>
            </div>
          </label>
        </div>
        <!-- ID Atras -->
        <div class="w-1/2">
          <label class="text-black-600 font-medium relative cursor-pointer text-center mx-1">
            <span class="block mb-2">Documento de identidad Atras</span>
            <div class="flex items-center">
              <input
                type="file"
                ref="fileInputBack"
                @change="handleFileChangeBack"
                accept="image/*"
                class="hidden"
              />
              <button
                type="button"
                class="py-2 bg-gray-200 text-gray-500 underline border-dashed border-gray-600 border-2 rounded-lg w-full h-40"
                @click="$refs.fileInputBack.click()"
              >
                {{ official_document_back ? 'Cambiar imagen' : 'Escoge una imagen' }}
              </button>
            </div>
          </label>
        </div>
      </div>
      <div class="border-b border-gray-300 my-5"></div>
      <div class="grid md:grid-cols-2 grid-cols-1 gap-4">
        <div class="grid md:grid-cols-2 grid-cols-1 gap-4">
          <label
            for="country"
            class="text-black-600 font-medium"
          >País:</label>
          <select
            v-if="countries.length > 0 || this.country"
            v-model="selectedCountry"
            @change="updateSelectedCountryCode"
            class="w-full rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="">{{ this.country }}</option>
            <option
              v-for="country in countries"
              :key="country.code"
              :value="country.name"
            >
              {{ country.name }}
            </option>
          </select>
          <div v-else>Loading countries...</div>
          <label
            for="state"
            class="text-black-600 font-medium"
          >Estado:</label>
          <select
            v-if="states.length > 0 || this.state"
            @change="updateSelectedStateCode"
            v-model="selectedState"
            class="w-full rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option
              value=""
              selected
            >{{ this.state }}</option>
            <option
              v-for="state in states"
              :key="state.id"
              :value="state.name"
            >
              {{ state.name }}
            </option>
          </select>
          <select
            v-else
            disabled
            class="w-full rounded-md px-4 py-2 border bg-gray-300 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
          </select>
          <label
            for="state"
            class="text-black-600 font-medium"
          >Ciudad:</label>
          <select
            v-if="cities.length > 0 || this.municipalitie"
            @change="updateSelectedCityCode"
            v-model="selectedCity"
            class="w-full rounded-md px-4 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option
              value=""
              selected
            >{{ this.municipalitie }}</option>
            <option
              v-for="city in cities"
              :key="city.id"
              :value="city.name"
            >
              {{ city.name }}
            </option>
          </select>
          <select
            v-else
            disabled
            class="w-full rounded-md px-4 border bg-gray-300 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
          </select>
          <label class="text-black-600 font-medium">Calle:</label>
          <input
            class="w-full rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Calle"
            v-model="street"
          />
        </div>
        <div class="grid md:grid-cols-2 grid-cols-1 gap-4">
          <label class="text-black-600 font-medium">Número exterior:</label>
          <input
            class="w-full rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Número exterior"
            v-model="outdoor_number"
          />
          <label class="text-black-600 font-medium">Número interior:</label>
          <input
            class="w-full rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Número interior"
            v-model="interior_number"
          />
          <label class="text-black-600 font-medium">C.P:</label>
          <input
            class="w-full rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
        <button
          @click="updateProfile"
          class="bg-black text-white p-2 rounded-lg"
        >
          <i class="fas fa-save mr-2"></i> Guardar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import JWTDecode from 'jwt-decode';
import Loading from '../../../../components/shared/Loading.vue';
import Swal from 'sweetalert2';
import axios from 'axios'

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
      official_document: '',
      official_document_back: '',
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
      selectedCountry: "",
      selectedCountryCode: "",
      selectedCity: '',
      selectedCityCode: '',
      cities: [],
      countries: [],
      states: [],
      nationalities: [],
      selectedDialCode: '',
      selectedState: '',
      selectedStateCode: '',
      selectedDialCode: '',
      selectedNationality: '',
      selectedNationalityCode: '',
      dial_code: '',
    }
  },
  computed: {
    setUser() {
      return this.$store.state.user;
    },
  },
  methods: {

    handleFileChange(event) {
      const selectedFile = event.target.files[0];
      this.official_document = selectedFile;
      this.$refs.fileInput.value = '';
    },
    handleFileChangeBack(event) {
      const selectedFile = event.target.files[0];
      this.official_document_back = selectedFile;
      this.$refs.fileInput.value = '';
    },
    updateSelectedCountryCode() {
      const selectedCountryObject = this.countries.find(
        (country) => country.name === this.selectedCountry
      );
      if (selectedCountryObject) {
        this.selectedCountryCode = selectedCountryObject.code
        this.selectedDialCode = selectedCountryObject.dial_code
        this.fetchStates()
      } else {
        this.selectedCountryCode = this.profile.country.code
        this.selectedDialCode = ''
      }
    },
    updateSelectedNationalityCode() {
      const selectedNationalityObject = this.nationalities.find(
        (nationality) => nationality.name === this.selectedNationality
      );
      if (selectedNationalityObject) {
        this.selectedNationalityCode = selectedNationalityObject.code;
      } else {
        this.selectedNationalityCode = this.profile.nationality.code;
      }
    },
    updateSelectedStateCode() {
      const selectedStateObject = this.states.find(
        (state) => state.name === this.selectedState
      );
      if (selectedStateObject) {
        this.selectedStateCode = selectedStateObject.id;
        this.fetchCities()
      } else {
        this.selectedStateCode = this.profile.state.id;
      }
    },
    updateSelectedCityCode() {
      const selectedCityObject = this.cities.find(
        (city) => city.name === this.selectedCity
      );
      if (selectedCityObject) {
        this.selectedCityCode = selectedCityObject.id;
      } else {
        this.selectedCityCode = this.profile.municipalitie.id;
      }
    },
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
    fetchNationalities() {
      const endpoint = '/nationalities';
      const url = `${this.$config.baseURL}${endpoint}`;
      axios
        .get(url)
        .then(response => {
          const nationalities = response.data;
          this.nationalities = nationalities
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
    async updateProfile() {
      this.email = [];
      let formData = new FormData();
      const url = `${this.$config.baseURL}/users/update-user-profile/?email=${this.$store.state.user.email}`;
      const decoded = JWTDecode(this.$cookies.get('access_token'));
      const formattedBirthDate = new Date(this.birth_date).toISOString().split('T')[0];
      if (decoded) {
        const headers = {
          Authorization: 'Token 4b1089cc8bbc1ac6c05eed6448aca3bb5711ab7b'
        };
        const email = this.$store.state.user.email;
        formData.append('name', this.name || this.profile.name)
        formData.append('fathers_surname', this.fathers_surname || this.profile.fathers_surname)
        formData.append('mothers_maiden_name', this.mothers_maiden_name || this.profile.mothers_maiden_name)
        formData.append('phone', this.phone || this.profile.phone)
        formData.append('birth_date', formattedBirthDate || this.profile.birth_date)
        formData.append('street', this.street || this.profile.street)
        formData.append('outdoor_number', this.outdoor_number || this.profile.outdoor_number)
        formData.append('interior_number', this.interior_number || this.profile.interior_number)
        formData.append('zip_code', this.zip_code || this.profile.zip_code)

        if (this.selectedNationalityCode) {
          formData.append('nationality', this.selectedNationalityCode);
        }

        if (this.selectedCountryCode) {
          formData.append('country', this.selectedCountryCode);
        }

        if (this.selectedStateCode) {
          formData.append('state', this.selectedStateCode);
        }

        if (this.selectedCityCode) {
          formData.append('municipalitie', this.selectedCityCode);
        }

        if (this.official_document instanceof File) {
          formData.append("official_document", this.official_document);
        }
        if (this.official_document_back instanceof File) {
          formData.append("official_document_back", this.official_document_back);
        }
        try {
          const response = await this.$axios.put(url, formData, { headers });
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
    this.fetchNationalities()
    this.fetchCountries()
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
          console.log(this.profile)
          // Asignar los valores actuales del perfil a las variables del componente
          this.name = this.profile.name || null;
          this.fathers_surname = this.profile.fathers_surname || null;
          this.mothers_maiden_name = this.profile.mothers_maiden_name || null;
          this.official_document = this.profile.official_document || null;
          this.official_document_back = this.profile.official_document_back || null;
          this.country = this.profile.country ? this.profile.country.name : null;
          this.dial_code = this.profile.country ? this.profile.country.dial_code : null;
          this.state = this.profile.state ? this.profile.state.name : null;
          this.municipalitie = this.profile.municipalitie ? this.profile.municipalitie.name : null;
          this.phone = this.profile.phone || null;
          this.birth_date = this.profile.birth_date || null;
          this.nationality = this.profile.nationality ? this.profile.nationality.name : null;
          this.street = this.profile.street || null;
          this.outdoor_number = this.profile.outdoor_number || null;
          this.interior_number = this.profile.interior_number || null;
          this.zip_code = this.profile.zip_code || null;
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
