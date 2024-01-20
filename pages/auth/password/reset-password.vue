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
        <p class="font-normal text-base text-neutral-600 pt-2">{{ $t('login.confirmPassword') }}</p>
      </div>
      <form
        class="w-full mt-2 space-y-4"
        @submit.prevent=validatePasswords
      >
        <div class="flex flex-col w-full mb-4">
          <label
            for="passwordOne"
            class="text-black-600 font-medium"
          >
            Contraseña
          </label>
          <input
            v-model="passwordOne"
            required
            type="password"
            name="passwordOne"
            id="passwordOne"
            class="mt-1 rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            :placeholder="$t('login.password')"
          >
        </div>
        <div class="place-items-end">
          <label
            for="passwordOne"
            class="text-black-600 font-medium"
          >
            {{ lenghterrorMessage }}
          </label>
        </div>
        <div class="flex flex-col w-full mb-4">
          <label
            for="passwordTwo"
            class="titleInput font-medium text-base text-black"
          >
            {{ $t('login.confirmNewPassword') }}
          </label>
          <input
            v-model="passwordTwo"
            required
            type="password"
            name="passwordOne"
            id="passwordOne"
            class="mt-1 rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            :placeholder="$t('login.confirmNewPassword')"
          >
          <div class="place-items-end">
            <label
              for="passwordTwo"
              class="block text-sm font-medium text-red-800"
            >
              {{ errorMessage }}
            </label>
          </div>
        </div>
        <div class="mb-4 text-right">
          <button
            type="submit"
            :disabled="disableButton"
            class="py-3 px-5 rounded-md bg-black text-white"
          >
            {{ $t('general.change') }}
          </button>
        </div>
        <div class="text-gray-800 text-center text-xl font-semibold py-4">
          {{ message }}
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
      this.$router.push({ path: this.localePath('/') })
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
              this.$router.push(this.localePath("/"));
            } catch (error) {
              this.message = this.$t('login.wrongEmail');
            }
          } else {
            this.errorMessage = this.$t('login.passwordsError')
          }
        } else {
          this.errorMessage = this.$t('login.passwordValidation')
        }
      } else {
        this.lenghterrorMessage = this.$t('login.passwordValidation')
      }
    }
  },
  validations: {
    passwordOne: {
    }
  }
}
</script>
