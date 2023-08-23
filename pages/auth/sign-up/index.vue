<template>
  <div class="flex containerGeneral h-full bg-white">
    <Loading
      v-if="loading"
      class="fixed w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
    />
    <div class="flex items-center justify-center flex-1 rightSide">
      <div class="flex flex-col items-center w-4/5 limiter">
        <div class="logo mt-8">
          <img
            src="../../../public/image_la_silla.png"
            alt="logo"
          />
        </div>
        <div class="flex flex-col items-center w-full mt-8 title">
          <h1 class="sesion font-medium text-4xl text-black">Crear Cuenta</h1>
          <p class="horsebook font-normal text-base text-neutral-600">Ingresa tus datos para entrar a HorseBook
          </p>
        </div>
        <form
          class="w-full mt-12 space-y-6"
          @submit.prevent=handleSubmit
        >
          <div class="flex flex-col w-full gap-6">
            <div class="flex flex-col w-full ">
              <label
                for="name"
                class="titleInput font-medium text-base text-black"
              >Nombres</label>
              <input
                v-model="form.name"
                required
                class="styleInput w-full h-14 px-6 bg-white border border-neutral-300 rounded-lg"
                placeholder="Ingresar nombres"
              />
            </div>
            <div class="flex flex-col w-full">
              <label
                for="fathers_surname"
                class="titleInput font-medium text-base text-black"
              >Apellido
                Paterno</label>
              <input
                v-model="form.fathers_surname"
                required
                class="styleInput w-full h-14 px-6 bg-white border border-neutral-300 rounded-lg"
                placeholder="Ingresar apellido paterno"
              />
            </div>
            <div class="flex flex-col w-full">
              <label
                for="mothers_maiden_name"
                class="titleInput font-medium text-base text-black"
              >Apellido
                Materno</label>
              <input
                v-model="form.mothers_maiden_name"
                required
                class="styleInput w-full h-14 px-6 bg-white border border-neutral-300 rounded-lg"
                placeholder="Ingresar apellido materno"
              />
            </div>
            <div class="flex flex-col w-full">
              <label
                for="identification_document"
                class="titleInput font-medium text-base text-black"
              >Documento de
                identidad (ID/Pasaporte)</label>
              <input
                v-model="form.identification_document"
                type="number"
                required
                class="styleInput w-full h-14 px-6 bg-white border border-neutral-300 rounded-lg"
                placeholder="Ingresar número de documento o pasaporte"
                style="-webkit-appearance: none; -moz-appearance: textfield; appearance: none;"
              />
            </div>

            <div class="flex flex-col w-full ">
              <label
                for="country"
                class="titleInput font-medium text-base text-black"
              >País</label>
              <input
                v-model="form.country"
                @input="autocompleteCountry"
                @keydown.delete="clearInputOnDelete"
                @keydown="onCountryKeyDown"
                required
                class="styleInput w-full h-14 px-6 bg-white border border-neutral-300 rounded-lg"
                placeholder="Ingresar país"
              />
            </div>
            <div class="flex flex-col w-full ">
              <label
                for="state"
                class="titleInput font-medium text-base text-black"
              >Estado</label>
              <input
                v-if="normalizeString(form.country) !== 'mexico'"
                v-model.lazy="form.state"
                required
                class="styleInput w-full h-14 px-6 bg-white border border-neutral-300 rounded-lg"
                placeholder="Ingresar estado"
              />
              <select
                v-else
                v-model="form.state"
                required
                class="styleInput w-full h-14 px-6 bg-white border border-neutral-300 rounded-lg"
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
            <div class="flex flex-col w-full ">
              <label
                for="municipalitie"
                required
                class="titleInput font-medium text-base text-black"
              >Ciudad</label>
              <input
                v-if="normalizeString(form.country) !== 'mexico'"
                v-model.lazy="form.municipalitie"
                required
                class="styleInput w-full h-14 px-6 bg-white border border-neutral-300 rounded-lg"
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

            <div class="flex flex-col w-full ">
              <label
                for="phone"
                class="titleInput font-medium text-base text-black"
              >Teléfono</label>
              <input
                v-model="form.phone"
                required
                class="styleInput w-full h-14 px-6 bg-white border border-neutral-300 rounded-lg"
                placeholder="Ingresar teléfono"
              />
            </div>
            <div class="flex flex-col w-full ">
              <label
                for="email"
                class="titleInput font-medium text-base text-black"
              >Email</label>
              <input
                v-model="form.email"
                type="email"
                required
                class="styleInput w-full h-14 px-6 bg-white border border-neutral-300 rounded-lg"
                placeholder="Ingresar email"
              />
            </div>
            <div class="flex flex-col w-full ">
              <label
                for="password"
                class="titleInput font-medium text-base text-black"
              >Contraseña</label>
              <input
                v-model="form.password"
                type="password"
                required
                @input="handlePasswordInput"
                @focus="isPasswordFocused = true"
                @blur="isPasswordFocused = false"
                class="styleInput w-full h-14 px-6 bg-white border border-neutral-300 rounded-lg"
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
            <div class="flex flex-col w-full ">
              <label
                for="confirmPassword"
                class="titleInput font-medium text-base text-black"
              >Confirmar
                contraseña</label>
              <input
                v-model="form.confirmPassword"
                type="password"
                required
                @input="validatePasswordMatch"
                class="styleInput w-full h-14 px-6 bg-white border border-neutral-300 rounded-lg"
                placeholder="Confirmar contraseña"
              />
              <div class="text-red-500 text-sm">{{ passwordMatchValidationMessage }}</div>
            </div>
          </div>
          <div class="flex flex-col w-full mt-6 containerButton">
            <button
              type="submit"
              class="buttonCta py-2 px-4 bg-black text-white rounded-lg"
            >Crear
              cuenta</button>
          </div>
          <div class="flex justify-center w-full mt-6 pb-2 signUp">
            <div class="flex flex-col items-center signUpp">
              <p class="signUppp font-normal text-base text-neutral-600">¿Ya tienes cuenta? <nuxt-link
                  to="/auth/login"
                  class="font-medium text-base text-black"
                >Inicia sesión</nuxt-link></p>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="lg:flex hidden flex-1 leftSide ">
      <img
        src="../../../public/horse_black.png"
        alt="logo-login"
        class="w-full object-cover"
        style="height: 100vh;"
      />
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
<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
  /* Firefox */
}
</style>
