<template>
  <div class="flex h-screen">
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
    <div class="md:w-1/2 md:mx-auto mt-10 p-8 bg-white">
      <div class="mb-6">
        <h1 class="text-4xl font-medium text-black">Crea tu cuenta</h1>
      </div>
      <form
        class="w-full"
        @submit.prevent=handleSubmit
      >
        <div class="flex flex-col w-full gap-6">
          <!-- First part of form -->
          <div class="flex flex-col w-full mb-5">
            <label
              for="email"
              class="text-black-600 font-medium"
            >Email</label>
            <input
              v-model="form.email"
              type="email"
              required
              class="mt-1 rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Ingresar email"
            />
          </div>
          <div class="flex">
            <!-- Password Field -->
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
                @focus="isPasswordFocused = true"
                @blur="isPasswordFocused = false"
                class="mt-1 rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Ingresar contraseña"
              />
              <div
                v-if="isPasswordFocused"
                class="text-red-500 text-sm"
              >{{ passwordValidationMessage }}</div>
              <div
                v-if="isPasswordFocused"
                class="text-red-500 text-sm"
              >{{ digitValidationMessage }}</div>
              <div
                v-if="isPasswordFocused"
                class="text-red-500 text-sm"
              >{{ specialCharacterValidationMessage }}</div>
            </div>

            <!-- Confirm Password Field -->
            <div class="flex flex-col w-1/2 pl-2">
              <label
                for="confirmPassword"
                class="text-black-600 font-medium"
              >Confirmar contraseña</label>
              <input
                v-model="form.confirmPassword"
                type="password"
                required
                @input="validatePasswordMatch"
                class="mt-1 rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Confirmar contraseña"
              />
              <div class="text-red-500 text-sm">{{ passwordMatchValidationMessage }}</div>
            </div>
          </div>
          <!-- Second part of form -->
          <div class="flex flex-col w-full mb-5">
            <label
              for="name"
              class="text-black-600 font-medium"
            >Nombres</label>
            <input
              v-model="form.name"
              required
              class="mt-1 rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Ingresar nombres"
            />
          </div>
          <div class="flex space-x-4 w-full">
            <!-- Apellido Paterno Input -->
            <div class="flex flex-col w-1/2 mb-5">
              <label
                for="fathers_surname"
                class="text-black-600 font-medium"
              >Apellido Paterno</label>
              <input
                v-model="form.fathers_surname"
                required
                class="mt-1 rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Ingresar apellido paterno"
              />
            </div>

            <!-- Apellido Materno Input -->
            <div class="flex flex-col w-1/2 mb-5">
              <label
                for="mothers_maiden_name"
                class="text-black-600 font-medium"
              >Apellido Materno</label>
              <input
                v-model="form.mothers_maiden_name"
                required
                class="mt-1 rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Ingresar apellido materno"
              />
            </div>
          </div>
          <!-- Cellphone Input -->
          <div class="flex flex-col w-full mb-5">
            <label
              for="phone"
              class="text-black-600 font-medium"
            >Teléfono</label>
            <input
              v-model="form.phone"
              required
              class="mt-1 rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Ingresar teléfono"
            />
          </div>
          <div class="flex flex-col w-full mb-5">
            <label
              for="identification_document"
              class="text-black-600 font-medium"
            >Documento de
              identidad (ID/Pasaporte)</label>
            <input
              v-model="form.identification_document"
              type="number"
              required
              class="mt-1 rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Ingresar número de documento o pasaporte"
              style="-webkit-appearance: none; -moz-appearance: textfield; appearance: none;"
            />
          </div>

          <div class="flex space-x-4 w-full">
            <!-- País Input -->
            <div class="flex flex-col w-1/2 mb-5">
              <label
                for="country"
                class="text-black-600 font-medium"
              >País</label>
              <input
                v-model="form.country"
                @input="autocompleteCountry"
                @keydown.delete="clearInputOnDelete"
                @keydown="onCountryKeyDown"
                required
                class="mt-1 rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Ingresar país"
              />
            </div>
            <!-- Estado Input -->
            <div class="flex flex-col w-1/2 mb-5">
              <label
                for="state"
                class="text-black-600 font-medium"
              >Estado</label>
              <input
                v-if="normalizeString(form.country) !== 'mexico'"
                v-model.lazy="form.state"
                required
                class="mt-1 rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Ingresar estado"
              />
              <select
                v-else
                v-model="form.state"
                required
                class="mt-1 rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option
                  value=""
                  disabled
                >Seleccionar estado</option>
                <option
                  v-for="estado in estadosMunicipios"
                  :key="estado.id"
                  :value="estado.nombre"
                >
                  {{ estado.nombre }}
                </option>
              </select>
            </div>
          </div>
          <div class="flex flex-col w-full mb-5">
            <label
              for="municipalitie"
              required
              class="text-black-600 font-medium"
            >Ciudad</label>
            <input
              v-if="normalizeString(form.country) !== 'mexico'"
              v-model.lazy="form.municipalitie"
              required
              class="mt-1 rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Ingresar ciudad"
            />
            <select
              v-else
              v-model="form.municipalitie"
              required
              class="styleInput w-full h-14 px-6 bg-white border border-neutral-300 rounded-lg"
            >
              <option
                value=""
                disabled
              >Seleccionar ciudad</option>
              <option
                v-for="municipio in selectedStateMunicipios"
                :key="municipio.id"
                :value="municipio.nombre"
              >
                {{ municipio.nombre }}
              </option>
            </select>
          </div>
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
  async created() {
    await this.fetchEstadosMunicipios();
  },
  data() {
    return {
      step: false,
      loading: false,
      estadosMunicipios: [],
      form: {
        name: "",
        fathers_surname: "",
        mothers_maiden_name: "",
        identification_document: "",
        country: "México",
        state: "",
        // municipalitie means city to the back-end
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
      },
    };
  },
  methods: {
    nextStep() {
      console.log("Hola")
      return this.step = !this.step
    },
    handlePasswordInput() {
      this.validatePassword();
    },
    validatePasswordMatch() {
      const password = this.form.password;
      const confirmPassword = this.form.confirmPassword;
      this.passwordMatchValidationMessage = password === confirmPassword ? '' : 'Las contraseñas deben ser iguales.';
    },
    validatePassword() {
      const password = this.form.password;

      const isLengthValid = password.length >= 8;
      const hasDigit = /\d/.test(password);

      const hasSpecialCharacter = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);


      this.passwordValidationMessage = isLengthValid ? '' : 'La contraseña debe tener al menos 8 caracteres.';
      this.digitValidationMessage = hasDigit ? '' : 'La contraseña debe contener al menos un dígito.';
      this.specialCharacterValidationMessage = hasSpecialCharacter ? '' : 'La contraseña debe contener al menos un carácter especial.';
    },
    handleSubmit() {
      // Check the data
      if (this.form.password !== this.form.confirmPassword) {
        this.$toast.error("Las contraseñas no coinciden");
        return;
      }
      // Validate password strength
      const passwordPattern = /^(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;
      const username = this.form.email.split("@")[0];
      const password = this.form.password;
      // Check if password is valid
      const isValidPassword = !password.includes(username) &&
        !password.includes(this.form.name) &&
        !password.includes(this.form.fathers_surname) &&
        !password.includes(this.form.mothers_maiden_name) &&
        password.length >= 8 &&
        password !== "password" &&
        password !== "123456" &&
        passwordPattern.test(password) &&
        this.form.password === this.form.confirmPassword;
      // Display error message if password is invalid
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
      // const token = "Token " + process.env.TOKEN;
      const token = "Token 0119158e9e647cc58e9c895fa08316b2a5b03df4"
      const headers = {
        Authorization: token,
      };
      const body = {
        "email": data.email,
        "password": data.password,
        "app_user_profile": {
          "name": data.name,
          "mothers_maiden_name": data.mothers_maiden_name,
          "fathers_surname": data.fathers_surname,
          "identification_document": data.identification_document,
          "country": data.country,
          "state": data.state,
          "municipalitie": data.municipalitie,
          "phone": data.phone,
        }
      };
      await this.$axios.$post(url, body, { headers })
        .then((response) => {
          this.loading = false
          let data = response
          // even knowing the password is encrypted, We shouldn't include in our store
          delete data.password
          this.$store.commit('setSingUpData', data);
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
          console.log(error);
        });
    },
    async fetchEstadosMunicipios() {
      this.loading = true
      try {
        const url = this.$config.baseURL + "/estado-municipios-list/";
        // const token = "Token " + process.env.TOKEN;
        const token = "Token 0119158e9e647cc58e9c895fa08316b2a5b03df4"
        const response = await this.$axios.get(url, {
          headers: {
            Authorization: token,
          },
        });
        console.log('success-fetchEstadosMunicipios');
        this.estadosMunicipios = response.data;
        this.loading = false
      } catch (error) {
        console.error("Error fetching estados and municipios:", error);
        this.$toast.error("Hubo un problema al cargarla lista de estados y ciudades");
        this.loading = false
      }
    },
  }
}
</script>