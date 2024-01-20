<template>
  <div class="bg-zinc-200 p-5 lg:p-10">
    <Loading
      v-if="loading"
      class="fixed w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
    />
    <div
      class="h-full p-5 lg:p-10 bg-white rounded-3xl flex justify-center items-center"
    >
      <div class="w-full lg:w-1/2">
        <div class="text-center mb-10">
          <h1 class="text-4xl font-extrabold text-black">
            {{ $t('login.signUp') }}
          </h1>
        </div>
        <div class="border border-black rounded-3xl px-5 py-10">
          <form @submit.prevent="handleSubmit">
            <div class="w-full space-y-5 mb-5">
              <!-- EMAIL -->
              <div class="flex flex-col">
                <input
                  v-model="form.email"
                  type="email"
                  required
                  class="border-t-0 border-x-0 focus:ring-0"
                  :placeholder="$t('login.email')"
                />
              </div>
              <div class="flex flex-col">
                <input
                  v-model="form.password"
                  :type="passwordFieldType"
                  required
                  @input="handlePasswordInput"
                  @focus="form.isPasswordFocused = true"
                  @blur="form.isPasswordFocused = false"
                  class="border-t-0 border-x-0 focus:ring-0"
                  :placeholder="$t('login.password')"
                />
              </div>
              <div class="flex flex-col">
                <input
                  v-model="form.confirmPassword"
                  :type="passwordFieldType"
                  required
                  @input="validatePasswordMatch"
                  class="border-t-0 border-x-0 focus:ring-0"
                  :placeholder="$t('login.confirmPassword')"
                />
                <div class="text-red-500 text-sm">
                  {{ form.passwordMatchValidationMessage }}
                </div>
              </div>
              <div class="flex flex-col">
                <button
                  class="text-gray-400"
                  type="button"
                  @click="togglePasswordVisibility"
                >
                  {{ showPasswordText }}
                </button>
                <div v-if="form.isPasswordFocused" class="text-red-500 text-sm">
                  {{ form.passwordValidationMessage }}
                </div>
                <div v-if="form.isPasswordFocused" class="text-red-500 text-sm">
                  {{ form.digitValidationMessage }}
                </div>
                <div v-if="form.isPasswordFocused" class="text-red-500 text-sm">
                  {{ form.specialCharacterValidationMessage }}
                </div>
              </div>
              <div class="flex flex-col">
                <input
                  type="text"
                  v-model="form.name"
                  required
                  class="border-t-0 border-x-0 focus:ring-0"
                  :placeholder="$t('signup.name')"
                />
              </div>
              <div class="flex flex-col">
                <input
                  v-model="form.fathers_surname"
                  type="text"
                  required
                  class="border-t-0 border-x-0 focus:ring-0"
                  :placeholder="$t('signup.lastName')"
                />
              </div>
              <div class="flex flex-col">
                <select
                  required
                  v-if="form.countries.length > 0"
                  v-model="form.selectedCountry"
                  @change="updateSelectedCountryCode"
                  class="border-t-0 border-x-0 focus:ring-0"
                >
                  <option disabled value="" selected hidden>
                    {{ $t('signup.country') }}
                  </option>
                  <option
                    v-for="country in form.countries"
                    :key="country.code"
                    :value="country.name"
                  >
                    {{ country.name }}
                  </option>
                </select>
                <div v-else>Loading countries...</div>
              </div>
              <div class="flex">
                <div
                  v-if="form.selectedDialCode"
                  class="flex border-b-1 border-black items-center justify-center"
                >
                  <span>+{{ form.selectedDialCode }}</span>
                </div>
                <div class="w-full">
                  <input
                    type="text"
                    v-model="form.phone"
                    required
                    class="w-full border-t-0 border-x-0 focus:ring-0"
                    :placeholder="$t('signup.phone')"
                  />
                </div>
              </div>
              <div class="my-5">
                <div class="flex items-center">
                  <input
                    type="checkbox"
                    class="mr-2 rounded-md bg-gray-300 border-none"
                    required
                  />
                  <label class="text-gray-600">
                    {{ $t('signup.agreeConditions')  }}
                    <a
                      target="_blank"
                      href="https://horsebook-subastas-stage.s3.us-east-2.amazonaws.com/static/docs/TerminosyCondiciones.pdf"
                      class="underline"
                      >
                      {{ $t('signup.termsAndConditions')  }}
                      </a
                    >
                  </label>
                </div>
                <div class="flex items-center">
                  <input
                    type="checkbox"
                    class="mr-2 rounded-md bg-gray-300 border-none"
                    required
                  />
                  <label for="remember-me" class="text-gray-600"
                    >{{ $t('signup.agreePolicies')  }}
                    <a
                      href="https://horsebook-subastas-stage.s3.us-east-2.amazonaws.com/static/docs/AvisodePrivacidadyPoliticas.pdf"
                      target="_blank"
                      class="underline"
                      >
                        {{ $t('signup.privacyPolicies')  }}
                      </a
                    >
                  </label>
                </div>
              </div>
              <div class="text-center mb-10">
                <button
                  type="submit"
                  class="py-3 px-10 rounded-full bg-[#BFA753] text-white"
                >
                {{ $t('signup.createAccount')  }}
                </button>
              </div>
              <div class="text-center mb-10">
                <span class="text-gray-600 mb-5">
                  <nuxt-link to="/auth/login" class="font-medium"
                    >
                    {{ $t('login.login')  }}
                    </nuxt-link
                  ></span
                >
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "../../../components/shared/Loading.vue"
import axios from "axios"

export default {
  components: { Loading },
  computed: {
    selectedStateMunicipios() {
      const selectedState = this.estadosMunicipios.find(
        (estado) => estado.nombre === this.form.state
      )
      return selectedState ? selectedState.municipios : []
    }
  },
  data() {
    return {
      formStep: false,
      loading: false,
      estadosMunicipios: [],
      form: {
        name: "",
        fathers_surname: "",
        mothers_maiden_name: "",
        identification_document: "",
        official_document_back: "",
        official_document: "",
        selectedCountry: "",
        selectedCountryCode: "",
        selectedCity: "",
        selectedCityCode: "",
        cities: [],
        countries: [],
        states: [],
        selectedDialCode: "",
        selectedState: "",
        selectedStateCode: "",
        municipalitie: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
        passwordValidationMessage: "",
        digitValidationMessage: "",
        specialCharacterValidationMessage: "",
        isPasswordFocused: false,
        passwordMatchValidationMessage: "",
        reference1: {
          name: "",
          phone: "",
          occupation: ""
        },
        reference2: {
          name: "",
          phone: "",
          occupation: ""
        },
        zip_code: "",
        outdoor_number: "",
        indoor_number: "",
        street: ""
      },
      showPassword: false
    }
  },
  computed: {
    passwordFieldType() {
      return this.showPassword ? "text" : "password"
    },
    showPasswordText() {
      return this.showPassword ? this.$t('signup.hidePassword') : this.$t('signup.showPassword')
    }
  },
  mounted() {
    this.fetchCountries()
  },
  methods: {
    handlePasswordInput() {
      // Handle input logic here
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword
    },
    updateSelectedCountryCode() {
      const selectedCountryObject = this.form.countries.find(
        (country) => country.name === this.form.selectedCountry
      )
      if (selectedCountryObject) {
        this.form.selectedCountryCode = selectedCountryObject.code
        this.form.selectedDialCode = selectedCountryObject.dial_code
        this.fetchStates()
      } else {
        this.form.selectedCountryCode = ""
        this.form.selectedDialCode = ""
      }
    },
    updateSelectedStateCode() {
      const selectedStateObject = this.form.states.find(
        (state) => state.name === this.form.selectedState
      )
      if (selectedStateObject) {
        this.form.selectedStateCode = selectedStateObject.id
        this.fetchCities()
      } else {
        this.form.selectedStateCode = ""
      }
    },
    updateSelectedCityCode() {
      const selectedCityObject = this.form.cities.find(
        (city) => city.name === this.form.selectedCity
      )
      if (selectedCityObject) {
        this.form.selectedCityCode = selectedCityObject.id
      } else {
        this.form.selectedCityCode = ""
      }
    },
    handleFileChange(event) {
      const selectedFile = event.target.files[0]
      this.form.official_document = selectedFile
    },
    handleFileChangeBack(event) {
      const selectedFile = event.target.files[0]
      this.form.official_document_back = selectedFile
    },
    handlePasswordInput() {
      this.validatePassword()
    },
    validatePasswordMatch() {
      const password = this.form.password
      const confirmPassword = this.form.confirmPassword
      this.form.passwordMatchValidationMessage =
        password === confirmPassword ? "" : this.$t('login.passwordsError')
    },
    validatePassword() {
      const password = this.form.password
      const isLengthValid = password.length >= 8
      this.form.passwordValidationMessage = isLengthValid
        ? ""
        : this.$t('login.passwordsError')
    },
    handleSubmit() {
      if (this.form.password !== this.form.confirmPassword) {
        this.$toast.error(this.$t('login.passwordsError'))
        return
      }
      const passwordPattern = /^(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/
      const username = this.form.email.split("@")[0]
      const password = this.form.password
      const isValidPassword =
        password.length >= 8 &&
        passwordPattern.test(password) &&
        this.form.password === this.form.confirmPassword
      if (!isValidPassword) {
        this.$toast.error(
          this.$t('signup.passwordGuidelines', {duration: 10000})
        )
        return
      }
      this.signUp(this.form)
    },
    normalizeString(input) {
      return input
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
    },
    autocompleteCountry() {
      const normalizedCountry = this.normalizeString(this.form.country)
      if (
        normalizedCountry === "mexico" ||
        normalizedCountry === "mex" ||
        normalizedCountry === "méxico"
      ) {
        this.form.country = "México"
      }
    },
    onCountryKeyDown(event) {
      if (
        this.form.country === "México" &&
        event.key !== "Backspace" &&
        event.key !== "Delete"
      ) {
        event.preventDefault()
      }
    },
    clearInputOnDelete(event) {
      if (event.key === "Delete" || event.key === "Backspace") {
        this.form.country = ""
      }
    },
    async signUp(data) {
      this.loading = true
      const url = this.$config.baseURL + "/users/create-user/"
      const headers = {}
      let formData = new FormData()
      formData.append("email", data.email)
      formData.append("password", data.password)
      formData.append("name", data.name)
      formData.append("mothers_maiden_name", data.mothers_maiden_name)
      formData.append("fathers_surname", data.fathers_surname)
      formData.append("country", data.selectedCountryCode)
      formData.append("state", data.selectedStateCode)
      formData.append("municipalitie", data.selectedCityCode)
      formData.append("phone", data.phone)
      formData.append("reference_1_contact", data.reference1.name)
      formData.append("reference_1_occupation", data.reference1.occupation)
      formData.append("reference_1_phone", data.reference1.phone)
      formData.append("reference_2_contact", data.reference2.name)
      formData.append("reference_2_occupation", data.reference2.occupation)
      formData.append("reference_2_phone", data.reference2.phone)
      formData.append("street", data.street)
      formData.append("outdoor_number", data.outdoor_number)
      formData.append("indoor_number", data.indoor_number)
      formData.append("zip_code", data.zip_code)
      if (data.official_document) {
        formData.append("official_document", data.official_document)
      }
      if (data.official_document_back) {
        formData.append("official_document_back", data.official_document_back)
      }
      console.log(formData)
      await this.$axios
        .$post(url, formData, { headers })
        .then((response) => {
          this.loading = false
          let data = response
          delete data.password
          this.$store.commit("setSingUpData", data)
          this.$router.push(this.localePath("/auth/sign-up/confirm-account"))
        })
        .catch((error) => {
          this.loading = false
          if (
            error.response &&
            error.response.data &&
            error.response.data.email
          ) {
            this.$toast.error(this.$t('signup.accountAlreadyExist'))
          } else {
            this.$toast.error(this.$t('general.errorMsg'))
          }
          console.error(error)
        })
    },
    fetchCountries() {
      const endpoint = "/countries"
      const url = `${this.$config.baseURL}${endpoint}`
      axios
        .get(url)
        .then((response) => {
          const countries = response.data
          this.form.countries = countries
        })
        .catch((error) => {
          console.error(error)
        })
    },
    async fetchStates() {
      const endpoint = "/states"
      const url = `${this.$config.baseURL}${endpoint}`
      const code = this.form.selectedCountryCode
      axios
        .get(url, {
          params: {
            country: code
          }
        })
        .then((response) => {
          const states = response.data
          this.form.states = states
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async fetchCities() {
      const endpoint = "/cities"
      const url = `${this.$config.baseURL}${endpoint}`
      const code = this.form.selectedStateCode
      axios
        .get(url, {
          params: {
            state: code
          }
        })
        .then((response) => {
          const cities = response.data
          this.form.cities = cities
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
