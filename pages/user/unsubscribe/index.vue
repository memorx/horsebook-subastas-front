<template>
    <div class="flex h-screen">
      <Loading
        v-if="loading"
        class="fixed w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
      />

      <div class="md:w-full md:mx-auto mt-10 p-8 bg-white">
        <div class="mb-6 flex justify-center items-center">
          {{ $t('profile.unsubscribedMsg') }}
        </div>
      </div>
    </div>
  </template>

  <script>
  import Loading from '~/components/shared/Loading.vue';
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
      this.unsubscribe();
    },
    methods: {

      async unsubscribe() {
        const url = this.$config.baseURL + "/users/unsubscribe/";
        const params = {
          'email': this.email,
          'token': this.token
        };

        await this.$axios.$get(url, { params })
          .then((response) => {
            this.unsubscribed = true
          })
          .catch((error) => {
            this.loading = false
            this.unsubscribed = false
            this.$toast.error(this.$t('general.errorMsg'))
            console.error(error.response.data)
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
              Cookie.set("access_token", jwt, { expires: 1 })
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

              this.$router.push(this.localePath("/"))
            }

      },
    }


  }
  </script>
