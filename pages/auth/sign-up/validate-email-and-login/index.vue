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
      <div v-if="verifying == true && validate == false" class="mb-6">
        <h1 class="text-4xl font-medium text-black">ESPERA UN MOMENTO</h1>
        <p class="font-normal text-base text-neutral-600 pt-2">Tu cuenta de correo está siendo verificada</p>
      </div>
      <div v-if="verifying == false && validate == true" class="mb-6">
        <h1 class="text-4xl font-medium text-black">BIENVENIDO</h1>
        <p class="font-normal text-base text-neutral-600 pt-2">Tu cuenta de correo ha sido verificada y estás iniciando sesión en la aplicación...</p>
      </div>
      <div v-if="verifying == false && validate == false" class="mb-6">
        <h1 class="text-4xl font-medium text-black">LO SENTIMOS</h1>
        <p class="font-normal text-base text-neutral-600 pt-2">Tu cuenta de correo no ha podido ser verificada.</p>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '../../../../components/shared/Loading.vue';
import Cookie from "js-cookie"

export default {

  components: { Loading },
  computed: {
    singUpData() {
      return this.$store.state.singUpData;
    },
  },
  data() {
    return {
      email: '',
      token: '',
      loading: false,
      verifying: true,
      validate: false,
      response: null,
    };
  },
  mounted() {
    this.email = this.$route.query.email;
    this.token = this.$route.query.token;
    this.verificationCode();
  },
  methods: {

    async reSendCode() {
      this.loading = true
      const url = this.$config.baseURL + "/users/re-send-email/";
      // const token = "Token " + process.env.TOKEN;
      const token = `Token ${this.$config.apiToken}`
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

    async verificationCode() {
      const url = this.$config.baseURL + "/users/validate-user-token/";
      const params = {
        'email': this.email,
        'token': this.token
      };
      let login = () => {
        this.loginApp()
      };

      await this.$axios.$get(url, { params })
        .then((response) => {
          console.log(response);
          this.$toast.success("Tu cuenta ha sido verificada");
          this.verifying = false;
          this.validate = true;
          this.response = response;
          setTimeout(login, 4000);
        })
        .catch((error) => {
          this.loading = false
          if (error.response && error.response.data && error.response.data.error && error.response.data.error[0] == 'El usuario ya ha sido activado') {
            this.verifying = false;
            this.validate = false;
          } else {
            this.verifying = false;
            this.$toast.error("Lo sentimos, ha ocurrido un error");
          }
          console.error(error.response.data);
        });
    },
    async loginApp() {
        let response = this.response;
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
              email: this.email,
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
              email: this.email,
              token: response.token,
              id: `${response.data.id}`,
            })
            this.$store.commit(
              "setIsUserAbleToBid",
              response.data.app_user_profile.bid
            )
            this.$store.dispatch('initializeWebSocketUserStatus')

            this.$router.push("/landingPage")
          }

    },
  }


}
</script>
