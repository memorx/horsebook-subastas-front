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
          <h1 class="sesion font-medium text-4xl text-black pt-2">Recuperar contraseña</h1>
          <p class="horsebook font-normal text-base text-neutral-600 pt-2">Envie un codigo a su mail
          </p>
        </div>
        <form class="w-full mt-12 space-y-6" @submit.prevent=userResetPassword>
          <div class="flex flex-col w-full gap-6">
            <div class="flex flex-col w-full ">
              <div>
                <label for="email" class="titleInput font-medium text-base text-black">
                  Email
                </label>
              </div>
            </div>
            <input v-model="email" required type="email" name="email" id="email"
              class="styleInput p-2 w-full h-14 px-6 bg-white border border-neutral-300 rounded-lg"
              placeholder="Ingrese su email">

          </div>
          <div class="border border-black border-solid flex flex-col w-full mt-6 overflow-visible bg-black">
            <button type="submit"
              class="py-2 px-4 bg-black text-white rounded-lg border border-black border-solid font-aeonik font-medium text-base">
              Enviar mail
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
      // mailIsSended: false,
      verificationCode: ""
    }
  },
  methods: {
    async userResetPassword() {
      try {
        const data = {
          email: this.email,
          resend: false
        };
        console.log(data, "DATA")
        const response = await axios.post(this.$config.baseURL + "/users/send-code-reset-password/", data, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(response, "RESPONSE")
        this.$store.commit('setUser', data);
        this.$router.push('/auth/password/forgot-password')
        console.log(response, "RESPONSE")
      } catch (error) {
        console.log(error, "ERROR")
        this.$toast.error("Usuario no encontrado");
      }
    },

  }
}
</script>
