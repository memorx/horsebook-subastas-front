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
        <h1 class="text-4xl font-medium text-black">Verifica tu cuenta</h1>
        <p class="font-normal text-base text-neutral-600 pt-2">Ingresa el código que te hemos enviado a tu correo
        </p>
      </div>
      <form
        class="w-full mt-2 space-y-4"
        @submit.prevent=handleSubmit
      >
        <div class="flex flex-col w-full gap-6">
          <div class="flex items-center">
            <div class="grid grid-cols-6 gap-9">
              <input
                type="text"
                maxlength="1"
                class="border border-gray-300 rounded-md h-16 w-12 text-2xl text-center focus:outline-none focus:ring focus:border-blue-300"
                @keyup="focusNext($event, 1)"
                @paste="pasteText($event, 1)"
              />
              <input
                type="text"
                maxlength="1"
                class="border border-gray-300 rounded-md h-16 w-12 text-2xl text-center focus:outline-none focus:ring focus:border-blue-300"
                @keyup="focusNext($event, 2)"
                @paste="pasteText($event, 2)"
              />
              <input
                type="text"
                maxlength="1"
                class="border border-gray-300 rounded-md h-16 w-12 text-2xl text-center focus:outline-none focus:ring focus:border-blue-300"
                @keyup="focusNext($event, 3)"
                @paste="pasteText($event, 3)"
              />
              <input
                type="text"
                maxlength="1"
                class="border border-gray-300 rounded-md h-16 w-12 text-2xl text-center focus:outline-none focus:ring focus:border-blue-300"
                @keyup="focusNext($event, 4)"
                @paste="pasteText($event, 4)"
              />
              <input
                type="text"
                maxlength="1"
                class="border border-gray-300 rounded-md h-16 w-12 text-2xl text-center focus:outline-none focus:ring focus:border-blue-300"
                @keyup="focusNext($event, 5)"
                @paste="pasteText($event, 5)"
              />
              <input
                type="text"
                maxlength="1"
                class="border border-gray-300 rounded-md h-16 w-12 text-2xl text-center focus:outline-none focus:ring focus:border-blue-300"
                @keyup="focusNext($event, 6)"
                @paste="pasteText($event, 6)"
              />
            </div>
          </div>
          <div class="flex items-center">
            <button
              type="submit"
              class="hidden md:block py-3 px-5 mr-3 rounded-md bg-black text-white"
            >
              Verificar código
            </button>
            <p class="font-normal text-base text-neutral-600">¿No recibiste el código?
              <button
                type="button"
                @click=reSendCode
                class="font-medium text-base text-black"
              >Reenviar código</button>
            </p>
          </div>
        </div>
        <button
          type="submit"
          class="md:hidden mx-5 py-2 px-4 bg-black text-white rounded-lg border border-black border-solid font-aeonik font-medium text-base"
        >
          Verificar código
        </button>
      </form>
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
      form: {
        code: ['', '', '', '', '', '']
      },
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
    async reSendCode() {
      this.loading = true
      const url = this.$config.baseURL + "/users/re-send-email/";
      // const token = "Token " + process.env.TOKEN;
      const token = "Token 0119158e9e647cc58e9c895fa08316b2a5b03df4"
      const headers = {
        Authorization: token,
      };
      const body = {
        "email": this.singUpData.email
      }
      await this.$axios.$post(url, body, { headers })
        .then((response) => {
          // console.log(response);
          this.$toast.success("El codigo ha sido enviado nuevamente, porfavor revise su correo");
          this.loading = false
        })
        .catch((error) => {
          this.loading = false
          if (error.response && error.response.data && error.response.data.error && error.response.data.error[0] == 'El usuario ya ha sido activado') {
            this.$toast.error("El usuario ya se encuentra activado");
            this.$router.push('/auth/login/')
          } else {
            this.$toast.error("Lo sentimos, ha ocurrido un error");
          }
          console.error(error.response.data);
        });
    },
    handleSubmit() {
      // Check the data
      const verification_code = this.form.code.join("")
      const data = {
        "email": this.singUpData.email,
        "verification_code": verification_code
      }
      // call the request to create App User
      this.verificationCode(data);
    },
    async verificationCode(data) {
      this.loading = true
      const url = this.$config.baseURL + "/users/verification-code/";
      // const token = "Token " + process.env.TOKEN;
      const token = "Token 0119158e9e647cc58e9c895fa08316b2a5b03df4"
      const headers = {
        Authorization: token,
      };
      const body = data
      await this.$axios.$post(url, body, { headers })
        .then((response) => {
          console.log(response);
          this.$toast.success("Su cuenta ha sido activada");
          this.$router.push('/auth/login/')
          this.loading = false
        })
        .catch((error) => {
          this.loading = false
          if (error.response && error.response.data && error.response.data.error && error.response.data.error[0] == 'El usuario ya ha sido activado') {
            this.$toast.error("El usuario ya se encuentra activado");
            this.$router.push('/auth/login/')
          } else {
            this.$toast.error("Lo sentimos, ha ocurrido un error");
          }
          console.error(error.response.data);
        });
    }
  }
}
</script>

