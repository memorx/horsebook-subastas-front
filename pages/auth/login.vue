<!--  -->
<template>
  <div class="flex h-screen">
    <div class="w-1/2 hidden md:block">
      <img
        src="../../public/horse_white.png"
        alt="logo"
        class="w-full object-cover"
        style="height: 100vh;"
      />
    </div>
    <div class="md:w-1/2 md:mx-auto mt-10 p-8 bg-white">
      <div class="mb-6">
        <h1 class="text-4xl font-medium text-black">Iniciar sesión</h1>
      </div>
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
        <div class="w-full space-y-5">
          <div class="flex flex-col">
            <label
              for="email"
              class="text-black-600 font-medium"
            >Correo</label>
            <input
              class="mt-1 rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Ingresar"
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              v-model="login.email"
              @focus="errorMsg = ''"
            >
          </div>
          <div class="flex flex-col">
            <label
              for="password"
              class="text-black-600 font-medium"
            >Contraseña</label>
            <input
              class="mt-1 rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Ingresar contraseña"
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              v-model="login.password"
              @focus="errorMsg = ''"
            >
          </div>
        </div>
        <div class="mb-4 text-right">
          <span>¿Olvidaste tu contraseña?
            <nuxt-link
              to="/auth/password/send-email"
              class="underline"
            >Recuperar</nuxt-link>
          </span>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              type="checkbox"
              id="remember-me"
              name="remember-me"
              class="mr-2"
            >
            <label
              for="remember-me"
              class="text-gray-600"
            >Recordarme</label>
          </div>
          <button
            type="submit"
            class="py-3 px-5 rounded-md bg-black text-white"
          >Iniciar Sesion</button>
        </div>
        <span class="text-gray-600">¿No tienes cuenta? <nuxt-link
            to="/auth/sign-up"
            class="font-medium text-base text-black hover:text-blue-500"
          >Resgístrate ahora</nuxt-link>
        </span>
        <div class="w-full text-center mt-5">
          <nuxt-link
            to="/landingPage"
            class="font-medium text-base text-black hover:text-blue-500"
          >Ingresar a subastas</nuxt-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

import { env } from 'process';
import Cookie from 'js-cookie'
import axios from 'axios'
export default {
  layout: 'auth',
  // authenticated: false,
  data() {
    return {
      login: {
        email: '',
        password: ''
      },
      errorMsg: ''
    }
  },

  methods: {
    async userLogin() {
      // Login the user
      const url = this.$config.baseURL + '/users/login-app/'
      const headers = {
        // Authorization: "Token 0119158e9e647cc58e9c895fa08316b2a5b03df4",
        // Authorization: "Token " + process.env.TOKEN,
      };
      const formData = new FormData()
      formData.append('email', this.login.email)
      formData.append('password', this.login.password)
      await this.$axios.$post(url, formData, { headers })
        .then((response) => {
          if (response.token) {
            const HMACSHA256 = (stringToSign, secret) => {
              const crypto = require('crypto')
              return crypto.createHmac('sha256', secret).update(stringToSign).digest('base64')
            }
            const header = {
              "alg": "HS256",
              "typ": "JWT"
            }
            const encodedHeaders = btoa(JSON.stringify(header))
            const claims = {
              "email": this.login.email,
              "token": response.token,
              "isAbleToBid": response.data.app_user_profile.bid || false
            }
            const encodedPlayload = btoa(JSON.stringify(claims))
            const signature = HMACSHA256(`${encodedHeaders}.${encodedPlayload}`, "mysecret")
            const encodedSignature = btoa(signature)
            const jwt = `${encodedHeaders}.${encodedPlayload}.${encodedSignature}`
            // Set JWT to the cookie
            Cookie.set("access_token", jwt)

            this.$store.commit('authenticate', true);

            // Set the user information in the store
            this.$store.commit('setUser', {
              email: this.login.email,
              token: response.token,
            })
            this.$store.commit('setIsUserAbleToBid', response.data.app_user_profile.bid)
            console.log(this.$store, "STORE")

            // Redirect to the home page
            this.$router.push('/landingPage')
          }
        })
        .catch((error) => {
          console.log(error.response.data)
          if (error.response.status === 400) {
            this.$toast.error(error.response.data.detail)
          } else if (error.response.status === 401) {
            this.$toast.error(error.response.data.detail)
            this.$toast.error(error.response.data.message)
          }
        })
    },
  }
}
</script>
