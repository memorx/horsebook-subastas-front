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
        <h1 class="text-4xl font-medium text-black">{{ $t('login.recoverPassword') }}</h1>
        <p class="font-normal text-base text-neutral-600 pt-2">
          {{ $t('login.recoverPasswordTxt') }}
        </p>
      </div>
      <form @submit.prevent=userResetPassword>
        <div class="flex flex-col w-full mb-4">
          <label
            for="email"
            class="text-black-600 font-medium"
          >
            {{ $t('login.email') }}
          </label>
          <input
            v-model="email"
            required
            type="email"
            name="email"
            id="email"
            class="mt-1 rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            :placeholder="$t('login.enterYourEmail')"
          >
          <div class="text-gray-800 text-center text-xl font-semibold">
            {{ message }}
          </div>
        </div>
        <div class="mb-4 text-right">
          <button
            type="submit"
            class="py-3 px-5 rounded-md bg-black text-white"
          >
            {{ $t('login.sendMail') }}
          </button>
        </div>
        <div class="w-full flex items-center">
          <nuxt-link to="/auth/login">
            <button
              type="button"
              class="justify-left font-medium text-base text-black underline"
            > {{ $t('general.back') }}
            </button>
          </nuxt-link>
        </div>
      </form>
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
        this.$router.push(this.localePath('/auth/password/forgot-password'))
        console.log(response, "RESPONSE")
      } catch (error) {
        console.log(error, "ERROR")
        this.$toast.error("Usuario no encontrado");
      }
    },

  }
}
</script>
