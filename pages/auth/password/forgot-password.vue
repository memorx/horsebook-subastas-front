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
    <div class="md:w-1/2 md:mx-auto p-8 bg-white">
      <div class="mb-6">
        <h1 class="text-4xl font-medium text-black">
          {{ $t('login.verifyYourAccount') }}
        </h1>
        <p class="font-normal text-base text-neutral-600 pt-2">
          {{ $t('login.verifyYourAccountTxt') }}
          {{ setUser?.email || 'correo@gmail.com' }}
        </p>
      </div>
      <form
        class="w-full mt-2 space-y-4"
        @submit.prevent="handleSubmit"
      >
        <div class="flex flex-col w-full gap-6">
          <div class="flex items-center">
            <div class="grid grid-cols-5 gap-9">
              <input
                type="text"
                maxlength="1"
                class="border border-gray-300 rounded-md h-16 w-12 text-2xl text-center focus:outline-none focus:ring focus:border-blue-300"
                @input="validateInput($event, 0)"
                @keyup="focusNext($event, 1)"
                @paste="pasteText($event, 1)"
              />
              <input
                type="text"
                maxlength="1"
                class="border border-gray-300 rounded-md h-16 w-12 text-2xl text-center focus:outline-none focus:ring focus:border-blue-300"
                @input="validateInput($event, 1)"
                @keyup="focusNext($event, 2)"
                @paste="pasteText($event, 2)"
              />
              <input
                type="text"
                maxlength="1"
                class="border border-gray-300 rounded-md h-16 w-12 text-2xl text-center focus:outline-none focus:ring focus:border-blue-300"
                @input="validateInput($event, 2)"
                @keyup="focusNext($event, 3)"
                @paste="pasteText($event, 3)"
              />
              <input
                type="text"
                maxlength="1"
                class="border border-gray-300 rounded-md h-16 w-12 text-2xl text-center focus:outline-none focus:ring focus:border-blue-300"
                @input="validateInput($event, 3)"
                @keyup="focusNext($event, 4)"
                @paste="pasteText($event, 4)"
              />
              <input
                type="text"
                maxlength="1"
                class="border border-gray-300 rounded-md h-16 w-12 text-2xl text-center focus:outline-none focus:ring focus:border-blue-300"
                @input="validateInput($event, 4)"
                @keyup="focusNext($event, 5)"
                @paste="pasteText($event, 5)"
              />
            </div>
          </div>
          <div class="w-full flex items-center">
            <button
              type="submit"
              class="hidden md:block py-3 px-5 mr-3 rounded-md bg-black text-white"
            >
              {{ $t('login.verifyCode') }}
            </button>
            <p class="font-normal text-base text-neutral-600">
              {{ $t('login.codeNotReceived') }}
              <button
                type="button"
                @click=reSendCode
                class="font-medium text-base text-black"
              >
                {{ $t('login.resendCode') }}
              </button>
            </p>
          </div>
          <button
            type="submit"
            class="md:hidden mx-5 py-2 px-4 bg-black text-white rounded-lg border border-black border-solid font-aeonik font-medium text-base"
          >
            {{ $t('login.verifyCode') }}
          </button>
          <div class="w-full flex items-center">
            <nuxt-link :to="localePath('/auth/password/send-email')">
              <button
                type="button"
                class="justify-left font-medium text-base text-black underline"
              >
                {{ $t('general.back') }}
              </button>
            </nuxt-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Loading from '../../../components/shared/Loading.vue';
export default {
  data() {
    return {
      loading: false,
      form: {
        code: ['', '', '', '', '']
      },
    }
  },
  computed: {
    setUser() {
      return this.$store.state.user;
    },
  },
  methods: {
    focusNext(event, index) {
      const value = event.target.value;
      const inputs = event.target.parentNode.querySelectorAll('input');
      if (value.length === 1) {
        // set the value of the current input to the corresponding index of the form.code array
        this.form.code[index - 1] = value;
        if (inputs[index]) {
          inputs[index].focus();
        }
      } else if (event.keyCode === 8 && index !== 1) {
        if (inputs[index - 2]) {
          inputs[index - 2].focus();
        }
      }
    },
    // this funtion is to paste the code - ctr v
    pasteText(event, index) {
      event.preventDefault();
      const clipboardData = event.clipboardData || window.clipboardData;
      const pastedData = clipboardData.getData('text');
      const inputs = event.target.parentNode.querySelectorAll('input');
      if (pastedData && pastedData.length === 5) {
        for (let i = 0; i < pastedData.length; i++) {
          // set the value of the current input to the corresponding index of the form.code array
          inputs[i].value = pastedData[i];
          this.form.code[i] = pastedData[i];
          if (inputs[i + 1]) {
            inputs[i + 1].focus();
          }
        }
      }
    },
    validateInput(event, index) {
      const value = event.target.value;
      if (!/^\d$/.test(value)) {
        event.target.value = '';
        this.form.code[index] = '';
      } else {
        this.form.code[index] = value;
      }
    },
    async reSendCode() {
      if (!this.setUser || !this.setUser?.email) {
        this.$toast.error(this.$t('login.emailMissing'));
        this.$router.push(this.localePath('/auth/password/send-email'));
        return;
      }
      this.loading = true;
      const url = this.$config.baseURL + "/users/re-send-email/";
      const body = {
        "email": this.setUser.email
      };
      await this.$axios.$post(url, body, {})
        .then((response) => {
          this.$toast.success(this.$t('login.resendCodeNotice'));
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
          this.$toast.error(this.$t('login.errorMsg'));
        });
    },
    handleSubmit() {
      if (!this.setUser || !this.setUser?.email) {
        this.$toast.error(this.$t('login.emailMissingReload'));
        this.$router.push(this.localePath('/auth/password/send-email'));
        return;
      }
      const verification_code = this.form.code.join("")
      const data = {
        "email": this.setUser.email,
        "code": verification_code
      }
      // console.log(data, "DATA")
      // call the request to create App User
      this.verificationCode(data);
    },
    async verificationCode(data) {
      this.loading = true;
      const url = this.$config.baseURL + "/users/password-code-verification/";
      const body = data;
      await this.$axios.$post(url, body)
        .then((response) => {
          this.$toast.success(this.$t('login.codeVerified'));
          this.$router.push(this.localePath('/auth/password/reset-password'));
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
          this.$toast.error(this.$t('login.codeError'));
          this.$toast.warn(this.$t('login.checkCodeOrRequestNew'));
        });
    }

  }
}
</script>
