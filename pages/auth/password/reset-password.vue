<template>
  <div class="flex containerGeneral h-full bg-white">
    <Loading v-if="loading"
      class="fixed w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50" />
    <div class="flex items-center justify-center flex-1 rightSide">
      <div class="flex flex-col items-center w-4/5 limiter">
        <div class="logo mt-8">
          <img src="../../../public/image_la_silla.png" alt="logo" />
        </div>
        <div class="flex flex-col items-center w-full mt-8 title">
          <h1 class="sesion font-medium text-4xl text-black">Recuperar contraseña</h1>
          <p class="horsebook font-normal text-base text-neutral-600">Confirme su nueva contraseña
          </p>
        </div>
        <form class="w-full mt-12 space-y-6" @submit.prevent=validatePasswords>
          <div class="flex flex-col w-full gap-6">
            <div class="flex flex-col w-full ">
              <div>
                <label for="passwordOne" class="titleInput font-medium text-base text-black">
                  Contraseña
                </label>
              </div>
              <div class="place-items-end">
                <label for="passwordOne" class="block text-sm font-medium text-red-800">
                  {{ lenghterrorMessage }}
                </label>
              </div>
            </div>
            <input v-model="passwordOne" required type="password" name="passwordOne" id="passwordOne"
              class="styleInput p-2 w-full h-14 px-6 bg-white border border-neutral-300 rounded-lg"
              placeholder="Contraseña">

          </div>
          <div class="flex flex-col w-full gap-6">
            <div class="flex flex-col w-full ">
              <div>
                <label for="passwordTwo" class="titleInput font-medium text-base text-black">
                  Repita su contraseña
                </label>
              </div>
              <div class="place-items-end">
                <label for="passwordTwo" class="block text-sm font-medium text-red-800">
                  {{ errorMessage }}
                </label>
              </div>
            </div>
            <input v-model="passwordTwo" required type="password" name="passwordOne" id="passwordOne"
              class="styleInput p-2 w-full h-14 px-6 bg-white border border-neutral-300 rounded-lg"
              placeholder="Repita su contraseña">
          </div>
          <div class="border border-black border-solid flex flex-col w-full mt-6 overflow-visible bg-black">
            <button type="submit" :disabled="disableButton"
              class="py-2 px-4 bg-black text-white rounded-lg border border-black border-solid font-aeonik font-medium text-base">
              Restablecer contraseña
            </button>
          </div>

          <div class="text-gray-800 text-center text-xl font-semibold py-4">
            {{ message }}
          </div>
        </form>
      </div>
    </div>
    <div class="lg:flex hidden flex-1 leftSide ">
      <img src="../../../public/image_horsebook_login.png" alt="logo-login" class="w-full h-full object-cover" />
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import Loading from '../../../components/shared/Loading.vue';
export default {
  auth: false,
  data() {
    return {
      email: "",
      passwordOne: '',
      passwordTwo: '',
      errorMessage: '',
      lenghterrorMessage: '',
      disableButton: false,
      lengtherrorEmail: "",
      message: '',
    }
  },
  computed: {
    setUser() {
      return this.$store.state.user;
    },
  },
  methods: {
    redirect() {
      this.$router.push({ path: '/' })
    },
    async validatePasswords() {
      if (this.passwordOne.length >= 8) {
        this.lenghterrorMessage = ""
        if (this.passwordTwo.length >= 8) {
          if (this.passwordOne === this.passwordTwo) {
            this.errorMessage = ""
            try {
              const response = await axios.put(this.$config.baseURL + '/users/update-password/', {
                email: this.setUser.email,
                password: this.passwordOne,
              });
              this.$router.push("/");
            } catch (error) {
              this.message = "Email incorrecto";
            }
          } else {
            this.errorMessage = "Las contraseñas deben ser iguales"
          }
        } else {
          this.errorMessage = "Ingrese por lo menos 8 dígitos"
        }
      } else {
        this.lenghterrorMessage = "Ingrese por lo menos 8 dígitos"
      }
    }
  },
  validations: {
    passwordOne: {
    }
  }
}
</script>
