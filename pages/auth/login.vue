<!--  -->
<template>
  <div class="flex containerGeneral h-full bg-white">
    <div class="flex items-center justify-center flex-1 rightSide">
      <div class="flex flex-col items-center w-4/5 limiter">
        <div class="text-center">
          <img
            src="../../public/image_la_silla.png"
            alt="logo"
            class="w-20 h-20 mt-4 ml-4 lg:ml-0 lg:mr-4 float-right lg:float-none lg:inline-block"
          >
          <h1 class="text-3xl font-medium text-black mt-4">Iniciar sesión</h1>
          <p class="text-gray-600 mt-2">Ingresa tus datos para entrar a HorseBook</p>
        </div>
        <form
          class="w-full space-y-6"
          @submit.prevent="userLogin"
        >
          <div class="space-y-2">
            <p
              v-for="error in errorMsg"
              :key="error"
              class="text-red-600 text-sm leading-tight text-center"
            >
              {{ error }}
            </p>
          </div>
          <div class="w-full space-y-4">
            <div class="flex flex-col">
              <label
                for="email"
                class="text-black-600 font-medium"
              >Email</label>
              <input
                class="mt-1 rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Ingresar email"
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
          <div class="flex justify-between items-center">
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
            <nuxt-link
              to="/auth/password/send-email"
              class="text-gray-600 cursor-pointer"
            >Olvidé
              mi
              contraseña</nuxt-link>
          </div>
          <button
            type="submit"
            class="w-full py-3 rounded-md bg-black text-white font-medium hover:bg-black-600 focus:outline-none focus:bg-black-600 transition duration-150 ease-in-out"
          >Ingresar</button>
          <div class="text-center mt-4">
            <span class="text-gray-600">¿No tienes cuenta?</span>
            <nuxt-link
              to="/auth/sign-up"
              class="font-medium text-base text-black"
            >Resgístrate ahora</nuxt-link>
          </div>
          <div class="text-center mt-4">
            <nuxt-link
              to="/landingPage"
              class="font-medium text-base text-black"
            >Ingresar a subastas</nuxt-link>
          </div>
        </form>
      </div>
    </div>
    <div class="lg:flex hidden flex-1 leftSide ">
      <img
        src="../../public/horse_black.png"
        alt="logo-login"
        class="w-full object-cover"
        style="height: 100vh;"
      />
    </div>
  </div>
</template>
<style scoped>
.containerGeneral {
  display: flex;
  width: 100%;
  height: 100%;
  background: white;
}

/* @font-face {
  font-family: 'Aeonik';
  src: url('/fonts/Aeonik-Regular.ttf') format('truetype');
} */
.rightSide {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-basis: 43%;
}

.limiter {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 35px;
  width: 60%;
}



.title {
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 10px;
  width: 397px;
}


.sesion {

  margin: 0;
  font-family: 'Aeonik', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 34px;
  line-height: 42px;
  /* identical to box height, or 124% */


  color: #000000;
}

.horsebook {
  margin: 0;
  font-family: 'Aeonik', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  /* identical to box height */

  text-align: center;

  /* Neutral / 60 */

  color: #939094;
}

.wrapperInputs {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 397px;
}


.styleInput {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 15px 22px;
  gap: 8px;
  width: 398px;
  height: 54px;
  background: #FFFFFF;
  border: 1.5px solid #E0E0E0;
  border-radius: 8px;
  /* flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0; */
}


.containerInput {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.titleInput {
  font-family: 'Aeonik', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;

}

.containerInput input {
  width: 398px;
  height: 54px;

  background: #FFFFFF;
  border: 1.5px solid #E0E0E0;
  border-radius: 8px;
}


.containerButton {
  display: flex;
  flex-direction: column;
  /* width: 100%; */
  gap: 10px;
  width: 397px;
}

.buttonCta {
  background-color: black;
  height: 40px;
  color: white;
  width: 100%;
}

.helps {
  display: flex;
  justify-content: space-between;
}

.leftSide {
  flex-basis: 57%;
  /* background: (image.png); */
}

.Recordarme {
  display: flex;
  align-items: center;
  color: #787579;
}

.Recordarme label {
  margin-left: 8px;
  color: #787579;
}

.Recordarme input[type="checkbox"] {
  color: #787579;
}

.Recordarme span {
  font-family: 'Aeonik', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  /* identical to box height, or 143% */

  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.1px;

  /* Neutral / 50  */

  color: #787579;
}

.OlvideMiContra {
  color: #1F2A44;
  display: flex;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  margin-left: 20px;
  /* o la cantidad de espacio que desees */
  font-family: 'Aeonik', sans-serif;
}

.signUp {
  display: flex;
  justify-content: center;

}

.signUpp {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 12px;
}

.signUppp {
  font-family: 'Aeonik', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  /* identical to box height */


  text-align: center;

  /* Neutral / 60 */

  color: #939094;


}

.signUppp a {
  color: rgb(0, 0, 0);
  /* text-decoration: underline; */

}
</style>
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
        Authorization: "Token 0119158e9e647cc58e9c895fa08316b2a5b03df4",
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
              "token": response.token
            }
            const encodedPlayload = btoa(JSON.stringify(claims))
            const signature = HMACSHA256(`${encodedHeaders}.${encodedPlayload}`, "mysecret")
            const encodedSignature = btoa(signature)
            const jwt = `${encodedHeaders}.${encodedPlayload}.${encodedSignature}`
            // Set JWT to the cookie
            Cookie.set("access_token", jwt)

            // Set the user information in the store
            this.$store.commit('setUser', { email: this.login.email, token: response.token })
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
