<template>
  <div class="p-5 bg-zinc-200">
    <Loading
      v-if="loading"
      class="fixed w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
    />
    <div
      class="bg-gray-400 flex items-center justify-between p-6 md:p-10 rounded-t-lg"
    >
      <p class="text-xl text-white font-bold">EDITAR PERFIL</p>
      <div class="text-center">
        <NuxtLink to="/user/perfil">
          <button class="bg-white text-black p-2 rounded-lg">
            <i class="fas fa-times mr-2 text-red-500"></i> Cancelar
          </button>
        </NuxtLink>
        <button
          @click="updateProfile"
          class="bg-white text-black p-2 rounded-lg"
        >
          <i class="fas fa-save mr-2 text-green-500"></i> Guardar
        </button>
      </div>
    </div>
    <div class="bg-white rounded-lg p-6 md:p-10 mb-4">
      <div class="grid md:grid-cols-3 grid-cols-1 gap-4 my-5">
        <div class="flex flex-col">
          <label class="text-black-600 font-medium">Nombre(s):</label>
          <input
            class="w-full rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Nombre (s)"
            v-model="name"
          />
        </div>
        <div class="flex flex-col">
          <label class="text-black-600 font-medium">Apellido paterno:</label>
          <input
            class="w-full rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Apellido paterno"
            v-model="fathers_surname"
          />
        </div>
        <div class="flex flex-col">
          <label class="text-black-600 font-medium">Apellido materno:</label>
          <input
            class="w-full rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Apellido materno"
            v-model="mothers_maiden_name"
          />
        </div>
      </div>
      <div class="grid md:grid-cols-2 grid-cols-1 gap-4 mb-5">
        <div class="flex flex-col">
          <label class="text-black-600 font-medium">Fecha de nacimiento:</label>
          <input
            class="w-full rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Fecha de nacimiento"
            type="date"
            v-model="birth_date"
          />
        </div>
        <div class="flex flex-col">
          <label class="text-black-600 font-medium">Telefono:</label>
          <div class="flex items-center">
            <div
              class="rounded-l-md px-4 py-2 border bg-gray-300 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 flex-shrink-0"
            >
              <span class="font-medium"
                >+{{ selectedDialCode || dial_code }}</span
              >
            </div>
            <input
              class="w-full rounded-r-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 flex-grow"
              placeholder="Ingresar teléfono"
              v-model="phone"
            />
          </div>
        </div>
      </div>
      <div class="border-b border-gray-300 my-4"></div>
      <div class="grid md:grid-cols-4 grid-cols-1 gap-4 mb-5">
        <div class="flex flex-col">
          <label class="text-black-600 font-medium pr-2">Nacionalidad:</label>
          <select
            v-if="nationalities.length > 0"
            v-model="selectedNationalityCode"
            class="w-full rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="" class="text-gray-500 text-center" disabled>Selecciona tu nacionalidad</option>
            <option
              v-for="nationality in nationalities"
              :key="nationality.code"
              :value="nationality.code"
            >
              {{ nationality.name }}
            </option>
          </select>
        </div>
        <div class="flex flex-col">
          <label for="country" class="text-black-600 font-medium">País:</label>
          <select
            v-if="countries.length > 0"
            v-model="selectedCountryCode"
            @change="() => { fetchStates() }"
            class="w-full rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="" class="text-gray-500 text-center" disabled>Selecciona el país</option>
            <option
              v-for="country in countries"
              :key="country.code"
              :value="country.code"
            >
              {{ country.name }}
            </option>
          </select>
          <div v-else>Loading countries...</div>
        </div>
        <div class="flex flex-col">
          <label for="state" class="text-black-600 font-medium">Estado:</label>
          <select
            v-if="states.length > 0"
            @change="() => { fetchCities() }"
            v-model="selectedStateCode"
            class="w-full rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="" class="text-gray-500 text-center" disabled>Selecciona el estado</option>
            <option v-for="state in states" :key="state.id" :value="state.id">
              {{ state.name }}
            </option>
          </select>
          <select
            v-else
            disabled
            class="w-full rounded-md px-4 py-2 border bg-gray-300 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          ></select>
        </div>
        <div class="flex flex-col">
          <label for="state" class="text-black-600 font-medium">Ciudad:</label>
          <select
            v-if="cities.length > 0"
            v-model="selectedCityCode"
            class="w-full rounded-md px-4 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="" class="text-gray-500 text-center" disabled>Selecciona la ciudad</option>
            <option v-for="city in cities" :key="city.id" :value="city.id">
              {{ city.name }}
            </option>
          </select>
          <select
            v-else
            disabled
            class="w-full rounded-md px-4 border bg-gray-300 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          ></select>
        </div>
      </div>
      <div class="grid md:grid-cols-4 grid-cols-1 gap-4 mb-5">
        <div class="flex flex-col">
          <label class="text-black-600 font-medium">Calle:</label>
          <input
            class="w-full rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Calle"
            v-model="street"
          />
        </div>
        <div class="flex flex-col">
          <label class="text-black-600 font-medium">Número exterior:</label>
          <input
            class="w-full rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Número exterior"
            v-model="outdoor_number"
          />
        </div>
        <div class="flex flex-col">
          <label class="text-black-600 font-medium">Número interior:</label>
          <input
            class="w-full rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Número interior"
            v-model="interior_number"
          />
        </div>
        <div class="flex flex-col">
          <label class="text-black-600 font-medium">C.P:</label>
          <input
            class="w-full rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="C.P"
            v-model="zip_code"
          />
        </div>
      </div>
      <div class="border-b border-gray-300 my-4"></div>
      <div class="grid md:grid-cols-2 grid-cols-1 gap-4 mb-5">
        <div class="flex flex-col">
          <label
            class="text-black-600 font-medium relative cursor-pointer text-center mx-1"
          >
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
                {{ official_document ? "Cambiar imagen" : "Escoge una imagen" }}
              </button>
            </div>
          </label>
        </div>
        <div class="flex flex-col">
          <label
            class="text-black-600 font-medium relative cursor-pointer text-center mx-1"
          >
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
                {{
                  official_document_back
                    ? "Cambiar imagen"
                    : "Escoge una imagen"
                }}
              </button>
            </div>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import JWTDecode from "jwt-decode"
import Loading from "../../../../components/shared/Loading.vue"
import Swal from "sweetalert2"
import axios from "axios"
import getUserTokenOrDefault from "../../../../utils/getUserTokenOrDefault.js"

export default {
  components: { Loading },
  data() {
    return {
      loading: false,
      loggedInUser: null,
      email: [],
      profile: null,
      name: "",
      fathers_surname: "",
      mothers_maiden_name: "",
      identification_document: "",
      official_document: "",
      official_document_back: "",
      country: "",
      state: "",
      municipalitie: "",
      phone: "",
      birth_date: "",
      nationality: "",
      street: "",
      outdoor_number: "",
      interior_number: "",
      zip_code: "",
      selectedCountry: "",
      selectedCountryCode: "",
      selectedCity: "",
      selectedCityCode: "",
      cities: [],
      countries: [],
      states: [],
      nationalities: [],
      selectedDialCode: "",
      selectedState: "",
      selectedStateCode: "",
      selectedDialCode: "",
      selectedNationality: "",
      selectedNationalityCode: "",
      dial_code: ""
    }
  },
  computed: {
    setUser() {
      return this.$store.state.user
    }
  },
  methods: {
    handleFileChange(event) {
      const selectedFile = event.target.files[0]
      this.official_document = selectedFile
      this.$refs.fileInput.value = ""
    },
    handleFileChangeBack(event) {
      const selectedFile = event.target.files[0]
      this.official_document_back = selectedFile
      this.$refs.fileInput.value = ""
    },
    fetchCountries() {
      const endpoint = "/countries"
      const url = `${this.$config.baseURL}${endpoint}`
      axios
        .get(url)
        .then((response) => {
          const countries = response.data
          this.countries = countries
        })
        .catch((error) => {
          console.error(error)
        })
    },
    fetchNationalities() {
      const endpoint = "/nationalities"
      const url = `${this.$config.baseURL}${endpoint}`
      axios
        .get(url)
        .then((response) => {
          const nationalities = response.data
          this.nationalities = nationalities
        })
        .catch((error) => {
          console.error(error)
        })
    },
    async fetchStates() {
      const endpoint = "/states"
      const url = `${this.$config.baseURL}${endpoint}`
      const code = this.selectedCountryCode
      axios
        .get(url, {
          params: {
            country: code
          }
        })
        .then((response) => {
          const states = response.data
          this.states = states
        })
        .catch((error) => {
          console
        })
    },
    async fetchCities() {
      const endpoint = "/cities"
      const url = `${this.$config.baseURL}${endpoint}`
      const code = this.selectedStateCode
      axios
        .get(url, {
          params: {
            state: code
          }
        })
        .then((response) => {
          const cities = response.data
          this.cities = cities
        })
        .catch((error) => {
          console
        })
    },
    async updateProfile() {
      this.email = []
      let formData = new FormData()
      const url = `${this.$config.baseURL}/users/update-user-profile/?email=${this.$store.state.user.user}`
      const decoded = JWTDecode(this.$cookies.get("access_token"))
      const formattedBirthDate = new Date(this.birth_date)
        .toISOString()
        .split("T")[0]
      if (decoded) {
        const headers = {
          Authorization: `Token ${decoded.token}`
        }
        const email = this.$store.state.user.email
        formData.append("name", this.name || this.profile.name)
        formData.append(
          "fathers_surname",
          this.fathers_surname || this.profile.fathers_surname
        )
        formData.append(
          "mothers_maiden_name",
          this.mothers_maiden_name || this.profile.mothers_maiden_name
        )
        formData.append("phone", this.phone || this.profile.phone)
        formData.append(
          "birth_date",
          formattedBirthDate || this.profile.birth_date
        )
        formData.append("street", this.street || this.profile.street)
        formData.append(
          "outdoor_number",
          this.outdoor_number || this.profile.outdoor_number
        )
        formData.append(
          "interior_number",
          this.interior_number || this.profile.interior_number
        )
        formData.append("zip_code", this.zip_code || this.profile.zip_code)

        if (this.selectedNationalityCode) {
          formData.append("nationality", this.selectedNationalityCode)
        }

        if (this.selectedCountryCode) {
          formData.append("country", this.selectedCountryCode)
        }

        if (this.selectedStateCode) {
          formData.append("state", this.selectedStateCode)
        }

        if (this.selectedCityCode) {
          formData.append("municipalitie", this.selectedCityCode)
        }

        if (this.official_document instanceof File) {
          formData.append("official_document", this.official_document)
        }
        if (this.official_document_back instanceof File) {
          formData.append("official_document_back", this.official_document_back)
        }
        try {
          const response = await this.$axios.put(url, formData, { headers })
          this.$router.push(this.localePath("/user/perfil"))
        } catch (error) {
          console.log(error, "ERROR")
          this.loading = false
        }
      }
    },
    validateUser() {
      if (!this.$store.state.user) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Debes iniciar sesión para poder ver tus datos, se te redirigirá al inicio"
        }).then(() => {
          window.location.href = "/auth/login"
        })
      }
    }
  },
  mounted() {
    this.fetchNationalities()
    this.fetchCountries()
    this.validateUser()
    const decoded = JWTDecode(this.$cookies.get("access_token"))
    const token = getUserTokenOrDefault()

    if (decoded) {
      const headers = {
        Authorization: `Token ${token}`
      }

      const email = decoded.email
      const url = `${this.$config.baseURL}/users/me`

      this.loading = true

      this.$axios
        .get(url, { headers })
        .then((response) => {
          this.email = response.data.app_user_profile
          this.profile = response.data.app_user_profile // Almacenar los datos del perfil en la variable "profile"
          this.loading = false
          // Asignar los valores actuales del perfil a las variables del componente
          this.name = this.profile.name || null
          this.fathers_surname = this.profile.fathers_surname || null
          this.mothers_maiden_name = this.profile.mothers_maiden_name || null
          this.official_document = this.profile.official_document || null
          this.official_document_back =
            this.profile.official_document_back || null
          this.country = this.profile.country ? this.profile.country.name : null
          if (this.country){
            this.selectedCountryCode = this.profile.country.code
            this.fetchStates()
          }
          this.dial_code = this.profile.country
            ? this.profile.country.dial_code
            : null
          this.state = this.profile.state ? this.profile.state.name : null
          if (this.state) {
            this.selectedStateCode =this.profile.state.id
            this.fetchCities()
          }
          this.municipalitie = this.profile.municipalitie
            ? this.profile.municipalitie.name
            : null
          if (this.municipalitie)
            this.selectedCityCode = this.profile.municipalitie.id
          this.phone = this.profile.phone || null
          this.birth_date = this.profile.birth_date || null
          this.nationality = this.selectedNationality = this.profile.nationality
            ? this.profile.nationality.name
            : null
          if (this.nationality) {
            this.selectedNationalityCode = this.profile.nationality.code
          }
          this.street = this.profile.street || null
          this.outdoor_number = this.profile.outdoor_number || null
          this.interior_number = this.profile.interior_number || null
          this.zip_code = this.profile.zip_code || null
        })
        .catch((error) => {
          console.error(error)
          this.loading = false
        })
    }
  },
  components: {
    Loading
  }
}
</script>
