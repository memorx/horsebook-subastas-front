<template>
  <div class="flex h-screen">
    <Loading
      v-if="loading"
      class="fixed w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
    />
    <div class="w-1/2 hidden md:block">
      <img
        src="../../../../public/horse_white.png"
        alt="logo"
        class="w-full object-cover"
        style="height: 100vh;"
      />
    </div>
    <div class="md:w-1/2 md:mx-auto mt-10 p-8 bg-white">
      <div class="mb-6">
        <h1 class="text-4xl font-medium text-black">{{ $t('signup.verifyYourAccount') }}</h1>
        <p class="font-normal text-base text-neutral-600 pt-2">
          {{ $t('signup.verifyAccountInstruction') }}
        </p>
      </div>
      <div>
        <p class="font-normal text-base text-neutral-600">¿
          {{ $t('signup.emailNotReceived') }}
          <button
            type="button"
            @click=reSendEmail
            class="font-medium text-base text-black"
          >{{ $t('signup.resendVerifyAccountEmail') }}</button>
        </p>
      </div>

    </div>
  </div>
</template>

<script>
import Loading from '../../../../components/shared/Loading.vue';
export default {

  components: { Loading },
  computed: {
    singUpData() {
      return this.$store.state.singUpData;
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    // This funtion is to pass next input when the user is insert keyup
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
      if (pastedData && pastedData.length === 6) {
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
    async reSendEmail() {
      this.loading = true
      const url = this.$config.baseURL + "/users/re-send-email/";
      const headers = {

      };
      const body = {
        "email": this.singUpData.email,
      }
      await this.$axios.$post(url, body, { headers })
        .then((response) => {
          // console.log(response);
          this.$toast.success(this.$t('signup.verificationEmailSendMsg'));
          this.loading = false
        })
        .catch((error) => {
          this.loading = false
          if (error.response && error.response.data && error.response.data.error && error.response.data.error[0] == 'El usuario ya ha sido activado') {
            this.$toast.error(this.$t('signup.userHasBeenActivated'));
            this.$router.push(this.localePath('/auth/login/'))
          } else {
            this.$toast.error(this.$t('general.errorMsg'));
          }
          console.error(error.response.data);
        });
    },
  }
}
</script>
