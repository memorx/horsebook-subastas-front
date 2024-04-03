<template>
  <div class="bg-zinc-200 p-5 lg:p-10">
    <div
      class="h-full p-5 lg:p-10 bg-white rounded-3xl flex justify-center items-center"
    >
      <div class="w-full lg:w-1/2">
        <div class="text-center mb-10">

          <h1 class="text-4xl font-extrabold text-black">{{ $t('login.login') }}</h1>
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
                  :placeholder="$t('login.email')"
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  v-model="login.email"
                  @focus="errorMsg = ''"
                />
              </div>
              <div class="flex">
                <input
                  class="border-t-0 border-x-0 focus:ring-0 w-full"
                  :placeholder="$t('login.password')"
                  id="password"
                  name="password"
                  :type="show ? 'text' : 'password'"
                  autocomplete="current-password"
                  required
                  v-model="login.password"
                  @focus="errorMsg = ''"
                />
                <span @click="()=>{show = !show}" class="h-full my-auto">
                  <svg v-if="!show" class="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                    <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
                  </svg>
                  <svg v-else class="w-6 h-6 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="m2 13.587 3.055-3.055A4.913 4.913 0 0 1 5 10a5.006 5.006 0 0 1 5-5c.178.008.356.026.532.054l1.744-1.744A8.973 8.973 0 0 0 10 3C4.612 3 0 8.336 0 10a6.49 6.49 0 0 0 2 3.587Z"/>
                    <path d="m12.7 8.714 6.007-6.007a1 1 0 1 0-1.414-1.414L11.286 7.3a2.98 2.98 0 0 0-.588-.21l-.035-.01a2.981 2.981 0 0 0-3.584 3.583c0 .012.008.022.01.033.05.204.12.401.211.59l-6.007 6.007a1 1 0 1 0 1.414 1.414L8.714 12.7c.189.091.386.162.59.211.011 0 .021.007.033.01a2.981 2.981 0 0 0 3.584-3.584c0-.012-.008-.023-.011-.035a3.05 3.05 0 0 0-.21-.588Z"/>
                    <path d="M17.821 6.593 14.964 9.45a4.952 4.952 0 0 1-5.514 5.514L7.665 16.75c.767.165 1.55.25 2.335.251 6.453 0 10-5.258 10-7 0-1.166-1.637-2.874-2.179-3.407Z"/>
                  </svg>
                </span>
              </div>
            </div>
            <div class="flex flex-wrap mb-10">
              <div class="w-1/2 items-center">
                <!--
                <input
                  type="checkbox"
                  id="remember-me"
                  name="remember-me"
                  class="mr-2"
                />
                <label for="remember-me" class="text-gray-600"
                  >Recordarme</label
                >
                -->
              </div>
              <span class="w-1/2 text-gray-400 text-right">
                <nuxt-link :to="localePath('/auth/password/send-email')">
                  {{ $t('login.forgotPassword') }}
                </nuxt-link>
              </span>
            </div>
            <div class="text-center mb-10">
              <button
                type="submit"
                class="py-3 px-10 rounded-full bg-[#BFA753] text-white uppercase"
              >
                {{ $t('login.login') }}
              </button>
            </div>
            <div class="text-center">
              <span class="text-gray-400">
                <nuxt-link :to="localePath('/auth/sign-up')" class="">{{ $t('login.signUp') }}</nuxt-link>
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
      errorMsg: "",
      show: false,
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
            this.$router.push(this.localePath("/"))
          }
        })
        .catch((error) => {
          console.log(error)
          if (error.response.status === 400) {
            const msg = error.response.data.detail
            this.$toast.error(this.$t(`backMessages.${msg}`))
          } else if (error.response.status === 401) {
            this.$toast.error(error.response.data.detail)
            this.$toast.error(error.response.data.message)
          }
        })
    }
  }
}
</script>
