<template>
  <div class="bg-zinc-200 h-[90vh] p-5 lg:p-10">
    <div
      class="h-full p-5 lg:p-10 bg-white rounded-3xl flex justify-center items-center"
    >
      <div class="w-full lg:w-1/2">
        <div class="text-center mb-10">
          <h2>LOGIN</h2>
          <h1 class="text-4xl font-extrabold text-black">Iniciar sesión</h1>
        </div>
        <div class="border border-black rounded-3xl px-5 py-10">
          <form @submit.prevent="userLogin">
            <div class="space-y-3 mb-4">
              <p
                v-for="error in errorMsg"
                :key="error"
                class="text-red-600 text-sm leading-tight text-center"
              >
                {{ error }}
              </p>
            </div>
            <div class="w-full space-y-5 mb-5">
              <div class="flex flex-col">
                <input
                  class="border-t-0 border-x-0 focus:ring-0"
                  placeholder="Correo electronico"
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  v-model="login.email"
                  @focus="errorMsg = ''"
                />
              </div>
              <div class="flex flex-col">
                <input
                  class="border-t-0 border-x-0 focus:ring-0"
                  placeholder="Contraseña"
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  required
                  v-model="login.password"
                  @focus="errorMsg = ''"
                />
              </div>
            </div>
            <div class="flex flex-wrap mb-10">
              <div class="w-1/2 items-center">
                <input
                  type="checkbox"
                  id="remember-me"
                  name="remember-me"
                  class="mr-2"
                />
                <label for="remember-me" class="text-gray-600"
                  >Recordarme</label
                >
              </div>
              <span class="w-1/2 text-gray-400 text-right">
                <nuxt-link to="/auth/password/send-email">
                  ¿Has olvidado tu contraseña?
                </nuxt-link>
              </span>
            </div>
            <div class="text-center mb-10">
              <button
                type="submit"
                class="py-3 px-10 rounded-full bg-[#BFA753] text-white"
              >
                INICIAR SESIÓN
              </button>
            </div>
            <div class="text-center">
              <span class="text-gray-400">
                <nuxt-link to="/auth/sign-up" class="">Crear cuenta</nuxt-link>
              </span>
            </div>
            <!-- <div class="w-full text-center mt-5">
              <nuxt-link to="/" class="">Ingresar a subastas</nuxt-link>
            </div> -->
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookie from "js-cookie"

export default {
  layout: "auth",
  data() {
    return {
      login: {
        email: "",
        password: ""
      },
      errorMsg: ""
    }
  },

  methods: {
    async userLogin() {
      const url = this.$config.baseURL + "/users/login-app/"
      const headers = {}
      const formData = new FormData()
      formData.append("email", this.login.email)
      formData.append("password", this.login.password)
      await this.$axios
        .$post(url, formData, { headers })
        .then((response) => {
          console.log(response)
          if (response.token) {
            const HMACSHA256 = (stringToSign, secret) => {
              const crypto = require("crypto")
              return crypto
                .createHmac("sha256", secret)
                .update(stringToSign)
                .digest("base64")
            }
            const header = {
              alg: "HS256",
              typ: "JWT"
            }
            const encodedHeaders = btoa(JSON.stringify(header))
            const claims = {
              email: this.login.email,
              token: response.token,
              id: `${response.data.id}`,
              isAbleToBid: response.data.app_user_profile.bid || false
            }
            const encodedPlayload = btoa(JSON.stringify(claims))
            const signature = HMACSHA256(
              `${encodedHeaders}.${encodedPlayload}`,
              "mysecret"
            )
            const encodedSignature = btoa(signature)
            const jwt = `${encodedHeaders}.${encodedPlayload}.${encodedSignature}`
            Cookie.set("access_token", jwt)
            this.$store.commit("authenticate", true)
            this.$store.commit("setUser", {
              email: this.login.email,
              token: response.token,
              id: `${response.data.id}`
            })
            this.$store.commit(
              "setIsUserAbleToBid",
              response.data.app_user_profile.bid
            )
            this.$router.push("/")
          }
        })
        .catch((error) => {
          console.log(error)
          if (error.response.status === 400) {
            this.$toast.error(error.response.data.detail)
          } else if (error.response.status === 401) {
            this.$toast.error(error.response.data.detail)
            this.$toast.error(error.response.data.message)
          }
        })
    }
  }
}
</script>
