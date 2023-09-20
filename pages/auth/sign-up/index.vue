<template>
  <div class="flex bg-zinc-200">
    <Loading
      v-if="loading"
      class="fixed w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
    />
    <div class="w-1/2 hidden md:block">
      <img
        src="../../../public/horse_white.png"
        alt="logo"
        class="w-full object-cover"
        style="height: 100vh;"
      />
    </div>
    <div class="lg:w-1/2 w-full lg:mx-auto px-5 bg-white">
      <div
        class="my-3"
        v-if="formStep == true"
      >
        <button
          type="button"
          @click="toggleFormStep"
          class="py-2 px-5 bg-gray-300 rounded-lg"
        >← Atras</button>
      </div>
      <div
        v-if="formStep == false"
        class="my-3"
      >
        <h1 class="text-4xl font-medium text-black">Crea tu cuenta</h1>
      </div>
      <form @submit.prevent=handleSubmit>
        <div class="flex flex-col w-full gap-6">
          <!-- EMAIL -->
          <div class="flex flex-col w-full mb-3">
            <label
              for="email"
              class="text-black-600 font-medium"
            >Email</label>
            <input
              v-model="form.email"
              type="email"
              required
              class="rounded-md px-4 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Ingresar email"
            />
          </div>
          <!-- Password Field -->
          <div class="flex mb-3">
            <div class="flex flex-col w-1/2 pr-2">
              <label
                for="password"
                class="text-black-600 font-medium"
              >Contraseña</label>
              <input
                v-model="form.password"
                type="password"
                required
                @input="handlePasswordInput"
                @focus="form.isPasswordFocused = true"
                @blur="form.isPasswordFocused = false"
                class=" rounded-md px-4 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Ingresar contraseña"
              />
              <div
                v-if="form.isPasswordFocused"
                class="text-red-500 text-sm"
              >{{ form.passwordValidationMessage }}</div>
              <div
                v-if="form.isPasswordFocused"
                class="text-red-500 text-sm"
              >{{ form.digitValidationMessage }}</div>
              <div
                v-if="form.isPasswordFocused"
                class="text-red-500 text-sm"
              >{{ form.specialCharacterValidationMessage }}</div>
            </div>

            <!-- Confirm Password Field -->
            <div class="flex flex-col w-1/2 mb-3">
              <label
                for="confirmPassword"
                class="text-black-600 font-medium"
              >Confirmar contraseña</label>
              <input
                v-model="form.confirmPassword"
                type="password"
                required
                @input="validatePasswordMatch"
                class="rounded-md px-4 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Confirmar contraseña"
              />
              <div class="text-red-500 text-sm">{{ form.passwordMatchValidationMessage }}</div>
            </div>
          </div>
          <!-- Nombre -->
          <div class="flex flex-col w-full mb-3">
            <label
              for="name"
              class="text-black-600 font-medium"
            >Nombres</label>
            <input
              v-model="form.name"
              required
              class="rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Ingresar nombres"
            />
          </div>
          <!-- Apellidos -->
          <div class="flex space-x-4 w-full mb-3">
            <!-- Apellido Paterno Input -->
            <div class="flex flex-col w-1/2">
              <label
                for="fathers_surname"
                class="text-black-600 font-medium"
              >Apellido Paterno</label>
              <input
                v-model="form.fathers_surname"
                required
                class="rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Ingresar apellido paterno"
              />
            </div>

            <!-- Apellido Materno Input -->
            <div class="flex flex-col w-1/2">
              <label
                for="mothers_maiden_name"
                class="text-black-600 font-medium"
              >Apellido Materno</label>
              <input
                v-model="form.mothers_maiden_name"
                required
                class="rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Ingresar apellido materno"
              />
            </div>
          </div>
          <!-- País y Estado Input -->
          <div class="flex w-full space-x-4 ">
            <div class="flex flex-col w-1/2">
              <div>
                <label
                  for="country"
                  class="text-black-600 font-medium"
                >País</label>
                <select
                  required
                  v-if="form.countries.length > 0"
                  v-model="form.selectedCountry"
                  @change="updateSelectedCountryCode"
                  class="w-full rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
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
            </div>
            <!-- Estado Input -->
            <div class="flex flex-col w-1/2">
              <label
                for="state"
                class="text-black-600 font-medium"
              >Estado</label>
              <select
                required
                v-if="form.states.length > 0"
                @change="updateSelectedStateCode"
                v-model="form.selectedState"
                class="w-full rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option
                  v-for="state in form.states"
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
            </div>
          </div>
          <!-- Ciudad Input -->
          <div class="flex flex-col w-full mb-3">
            <label
              for="state"
              class="text-black-600 font-medium"
            >Ciudad</label>
            <select
              required
              v-if="form.cities.length > 0"
              v-model="form.selectedCity"
              @change="updateSelectedCityCode"
              class="w-full rounded-md px-4 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option
                v-for="city in form.cities"
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
          </div>
          <!-- Calle -->
          <div class="flex flex-col w-full mb-3">
            <label
              for="name"
              class="text-black-600 font-medium"
            >Calle</label>
            <input
              v-model="form.street"
              required
              class="rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Ingresar calle"
            />
          </div>
          <div class="flex w-full space-x-2 ">
            <div class="flex flex-col w-1/3">
              <!-- Num. Exterior -->
              <label
                for="name"
                class="text-black-600 font-medium"
              >Num. Exterior</label>
              <input
                v-model="form.outdoor_number"
                required
                class="rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Ingresar num exterior"
              />
            </div>
            <!-- Num. Interior -->
            <div class="flex flex-col w-1/3">
              <label
                for="name"
                class="text-black-600 font-medium"
              >Num. Interior</label>
              <input
                v-model="form.indoor_number"
                class="rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Ingresar num interior"
              />
            </div>
            <div class="flex flex-col w-1/3">
              <label
                for="name"
                class="text-black-600 font-medium"
              >Codigo Postal</label>
              <input
                v-model="form.zip_code"
                required
                class="rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Ingresar codigo postal"
              />
            </div>
          </div>
          <!-- Cellphone Input -->
          <div class="flex flex-col w-full mb-5">
            <label
              for="phone"
              class="text-black-600 font-medium"
            >Teléfono</label>
            <div class="flex space-x-0 w-full">
              <div
                class="rounded-l-md px-4 py-2 border bg-gray-300 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              ><span class="font-medium">+{{ form.selectedDialCode }}</span></div>
              <input
                v-model="form.phone"
                required
                class="w-full rounded-r-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Ingresar teléfono"
              />
            </div>
          </div>
          <div class="flex">
            <!-- ID Enfrente -->
            <div class="flex w-1/2 flex-col">
              <label
                for="fileInput"
                class="text-black-600 font-medium relative cursor-pointer text-center mx-1"
              >
                <span class="block mb-2">Documento de identidad Enfrente</span>
                <div class="flex items-center">
                  <input
                    id="fileInput"
                    name="fileFront"
                    required
                    type="file"
                    ref="fileInput"
                    @change="handleFileChange"
                    accept="image/*"
                    class="w-full rounded-l-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    @click="$refs.fileInput.click()"
                  >
                    <i
                      class="fas fa-upload rounded-r-md px-4 py-3 text-blue-500 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    </i>
                  </button>
                </div>
              </label>
            </div>
            <!-- ID Atras -->
            <div class="flex flex-col w-1/2">
              <label
                for="fileInputBack"
                class="text-black-600 font-medium relative cursor-pointer text-center mx-1"
              >
                <span class="block mb-2">Documento de identidad Atras</span>
                <div class="flex items-center">
                  <input
                    id="fileInputBack"
                    name="fileBack"
                    required
                    type="file"
                    ref="fileInputBack"
                    @change="handleFileChangeBack"
                    accept="image/*"
                    class="w-full rounded-l-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    @click="$refs.fileInputBack.click()"
                  >
                    <i
                      class="fas fa-upload rounded-r-md px-4 py-3 text-blue-500 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    </i>
                  </button>
                </div>
              </label>
            </div>
          </div>
          <!-- Referencias -->
          <div class="flex flex-col w-full my-5">
            <div class="flex flex-col w-full">
              <!-- Nombre completo Referencia 1 -->
              <p class="text-2xl font-medium">Referencia 1:</p>
              <label
                for="name"
                class="text-black-600 font-medium"
              >Nombres</label>
              <input
                v-model="form.reference1.name"
                required
                class="mt-1 rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Ingresar nombre completo"
              />
            </div>
            <!-- Ocupacion Referencia 1 -->
            <div class="flex space-x-4 w-full">
              <div class="flex flex-col w-1/2">
                <label
                  for="name"
                  class="text-black-600 font-medium"
                >Ocupación</label>
                <input
                  v-model="form.reference1.occupation"
                  required
                  class="mt-1 rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Ingresar ocupación"
                />
              </div>
              <!-- Numero de telefono Referencia 1 -->
              <div class="flex flex-col w-1/2">
                <label
                  for="phone"
                  class="text-black-600 font-medium"
                >Teléfono</label>
                <input
                  v-model="form.reference1.phone"
                  required
                  class="mt-1 rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Ingresar teléfono"
                />
              </div>
            </div>
            <div class="flex flex-col w-full mt-5">
              <p class="text-2xl font-medium">Referencia 2:</p>
              <!-- Nombre completo Referencia 2 -->
              <label
                for="name"
                class="text-black-600 font-medium"
              >Nombres</label>
              <input
                v-model="form.reference2.name"
                required
                class="mt-1 rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Ingresar nombre completo"
              />
            </div>
            <!-- Ocupacion Referencia 2 -->
            <div class="flex space-x-4 w-full">
              <div class="flex flex-col w-1/2">
                <label
                  for="name"
                  class="text-black-600 font-medium"
                >Ocupación</label>
                <input
                  v-model="form.reference2.occupation"
                  required
                  class="mt-1 rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Ingresar ocupación"
                />
              </div>
              <!-- Numero de telefono Referencia 2 -->
              <div class="flex flex-col w-1/2">
                <label
                  for="phone"
                  class="text-black-600 font-medium"
                >Teléfono</label>
                <input
                  v-model="form.reference2.phone"
                  required
                  class="mt-1 rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Ingresar teléfono"
                />
              </div>
            </div>
          </div>
          <!-- Terminos y condiciones y Politicas de Privacidad -->
          <div class="my-5">
            <div class="flex items-center">
              <input
                type="checkbox"
                class="mr-2"
                required
              >
              <label class="text-gray-600">
                Al continuar estoy de acuerdo con los
                <button
                  target="_blank"
                  class="underline"
                >Terminos y Condiciones</button> de La Silla.
              </label>
            </div>
            <div class="flex items-center">
              <input
                type="checkbox"
                id="remember-me"
                name="remember-me"
                class="mr-2"
                required
              >
              <label
                for="remember-me"
                class="text-gray-600"
              >Al continuar estoy de acuerdo con la
                <button
                  target="_blank"
                  class="underline"
                >Politica de Privacidad</button> de La Silla.
              </label>
            </div>
          </div>
          <!-- Botone de Crear Cuenta -->
          <div class="flex flex-col w-full">
            <button
              type="submit"
              class="py-2 px-5 mb-5 bg-black text-white rounded-lg"
            >Crear
              cuenta</button>
            <span class="text-gray-600 mb-5">¿Ya tienes cuenta? <nuxt-link
                to="/auth/login"
                class="font-medium text-base text-black hover:text-blue-500"
              >Inicia sesión</nuxt-link></span>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Loading from '../../../components/shared/Loading.vue';
import axios from 'axios'

export default {
  components: { Loading },
  computed: {
    selectedStateMunicipios() {
      const selectedState = this.estadosMunicipios.find(
        (estado) => estado.nombre === this.form.state
      );
      return selectedState ? selectedState.municipios : [];
    },
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
        official_document_back: '',
        official_document: '',
        selectedCountry: "",
        selectedCountryCode: "",
        selectedCity: '',
        selectedCityCode: '',
        cities: [],
        countries: [],
        states: [],
        selectedDialCode: '',
        selectedState: '',
        selectedStateCode: '',
        municipalitie: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
        passwordValidationMessage: '',
        digitValidationMessage: '',
        specialCharacterValidationMessage: '',
        isPasswordFocused: false,
        passwordMatchValidationMessage: '',
        reference1: {
          name: '',
          phone: '',
          occupation: '',
        },
        reference2: {
          name: '',
          phone: '',
          occupation: '',
        },
        zip_code: '',
        outdoor_number: '',
        indoor_number: '',
        street: '',
      },
    };
  },
  mounted() {
    this.fetchCountries()
  },
  methods: {
    updateSelectedCountryCode() {
      const selectedCountryObject = this.form.countries.find(
        (country) => country.name === this.form.selectedCountry
      );
      if (selectedCountryObject) {
        this.form.selectedCountryCode = selectedCountryObject.code
        this.form.selectedDialCode = selectedCountryObject.dial_code
        this.fetchStates()
      } else {
        this.form.selectedCountryCode = ''
        this.form.selectedDialCode = ''
      }
    },
    updateSelectedStateCode() {
      const selectedStateObject = this.form.states.find(
        (state) => state.name === this.form.selectedState
      );
      if (selectedStateObject) {
        this.form.selectedStateCode = selectedStateObject.id;
        this.fetchCities()
      } else {
        this.form.selectedStateCode = "";
      }
    },
    updateSelectedCityCode() {
      const selectedCityObject = this.form.cities.find(
        (city) => city.name === this.form.selectedCity
      );
      if (selectedCityObject) {
        this.form.selectedCityCode = selectedCityObject.id;
      } else {
        this.form.selectedCityCode = "";
      }
    },
    handleFileChange(event) {
      const selectedFile = event.target.files[0];
      this.form.official_document = selectedFile;
    },
    handleFileChangeBack(event) {
      const selectedFile = event.target.files[0];
      this.form.official_document_back = selectedFile;
    },
    handlePasswordInput() {
      this.validatePassword();
    },
    validatePasswordMatch() {
      const password = this.form.password;
      const confirmPassword = this.form.confirmPassword;
      this.form.passwordMatchValidationMessage = password === confirmPassword ? '' : 'Las contraseñas deben ser iguales.';
    },
    validatePassword() {
      const password = this.form.password;
      const isLengthValid = password.length >= 8;
      const hasDigit = /\d/.test(password);
      const hasSpecialCharacter = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);
      this.form.passwordValidationMessage = isLengthValid ? '' : 'La contraseña debe tener al menos 8 caracteres.';
      this.form.digitValidationMessage = hasDigit ? '' : 'La contraseña debe contener al menos un dígito.';
      this.form.specialCharacterValidationMessage = hasSpecialCharacter ? '' : 'La contraseña debe contener al menos un carácter especial.';
    },
    handleSubmit() {
      if (this.form.password !== this.form.confirmPassword) {
        this.$toast.error("Las contraseñas no coinciden");
        return;
      }
      const passwordPattern = /^(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;
      const username = this.form.email.split("@")[0];
      const password = this.form.password;
      const isValidPassword = !password.includes(username) &&
        !password.includes(this.form.name) &&
        !password.includes(this.form.fathers_surname) &&
        !password.includes(this.form.mothers_maiden_name) &&
        password.length >= 8 &&
        password !== "password" &&
        password !== "123456" &&
        passwordPattern.test(password) &&
        this.form.password === this.form.confirmPassword;
      if (!isValidPassword) {
        this.$toast.error("La contraseña debe tener al menos 8 caracteres,<br>contener al menos un dígito,<br>un carácter especial,<br>no puede incluir parte de los atributos del usuario,<br>ni ser una contraseña común o fácilmente adivinable.");
        return;
      }
      this.signUp(this.form);
    },
    normalizeString(input) {
      return input
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
    },
    autocompleteCountry() {
      const normalizedCountry = this.normalizeString(this.form.country);
      if (normalizedCountry === "mexico" || normalizedCountry === "mex" || normalizedCountry === "méxico") {
        this.form.country = "México";
      }
    },
    onCountryKeyDown(event) {
      if (this.form.country === "México" && event.key !== "Backspace" && event.key !== "Delete") {
        event.preventDefault();
      }
    },
    clearInputOnDelete(event) {
      if (event.key === 'Delete' || event.key === 'Backspace') {
        this.form.country = '';
      }
    },
    async signUp(data) {
      this.loading = true
      const url = this.$config.baseURL + "/users/create-user/";
      const headers = {
      };
      let formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("name", data.name);
      formData.append("mothers_maiden_name", data.mothers_maiden_name);
      formData.append("fathers_surname", data.fathers_surname);
      formData.append("country", data.selectedCountryCode);
      formData.append("state", data.selectedStateCode);
      formData.append("municipalitie", data.selectedCityCode);
      formData.append("phone", data.phone);
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
        formData.append("official_document", data.official_document);
      }
      if (data.official_document_back) {
        formData.append("official_document_back", data.official_document_back);
      }
      console.log(formData)
      await this.$axios.$post(url, formData, { headers })
        .then((response) => {
          this.loading = false
          let data = response
          delete data.password
          this.$store.commit('setSingUpData', data)
          this.$router.push('/auth/sign-up/confirm-account')
        })
        .catch((error) => {
          this.loading = false
          if (error.response && error.response.data && error.response.data.email) {
            this.$toast.error("Una cuenta con este mail ya existe");
          }
          else {
            this.$toast.error("Lo sentimos, ha ocurrido un error");
          }
          console.error(error);
        });
    },
    fetchCountries() {
      const endpoint = '/countries';
      const url = `${this.$config.baseURL}${endpoint}`;
      axios
        .get(url)
        .then(response => {
          const countries = response.data;
          this.form.countries = countries;
        })
        .catch(error => {
          console.error(error);
        });
    },
    async fetchStates() {
      const endpoint = '/states'
      const url = `${this.$config.baseURL}${endpoint}`
      const code = this.form.selectedCountryCode
      axios.get(url, {
        params: {
          country: code
        },
      })
        .then(response => {
          const states = response.data
          this.form.states = states
        })
        .catch(error => {
          console.log(error)
        })
    },
    async fetchCities() {
      const endpoint = '/cities'
      const url = `${this.$config.baseURL}${endpoint}`
      const code = this.form.selectedStateCode
      axios.get(url, {
        params: {
          state: code
        },
      })
        .then(response => {
          const cities = response.data
          this.form.cities = cities
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style>
input::file-selector-button {
  display: none;
}
</style>