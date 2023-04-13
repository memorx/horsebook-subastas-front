<template>
  <div class="containerGeneral">
    <!-- <div class="content"> -->
    <div class="rightSide">
      <div class="limiter">
        <div class="logo">
          <img src="../../public/image_la_silla.png" alt="logo" width="90" height="92" />
        </div>
        <div class="title">
          <h1 class="sesion">Iniciar sesión</h1>
          <p class="horsebook">Ingresa tus datos para entrar a HorseBook</p>
        </div>
        <form class='space-y-6' @submit.prevent='userLogin'>
          <div>
            <p v-for='error in errorMsg' :key='error' class='text-red-600 text-sm leading-tight text-center'>
              {{ error }}
            </p>
          </div>
          <div class="wrapperInputs">
            <div class="containerInput">
              <label for="email" class="titleInput">Email</label>
              <input class="styleInput" placeholder="Ingresar email" id='email' name='email' type='email'
                autocomplete='email' required v-model='login.email' @focus='errorMsg = ""' />
            </div>
            <div class="containerInput">
              <label for="password" class="titleInput">Contraseña</label>
              <input class="styleInput" placeholder="Ingresar contraseña" id='password' name='password' type='password'
                autocomplete='current-password' required v-model='login.password' @focus='errorMsg = ""' />
            </div>
          </div>
          <div class="containerButton">
            <button type='submit' class="buttonCta">Ingresar</button>
            <div class="helps">
              <div class="Recordarme">
                <input type="checkbox" id="remember-me" name="remember-me">
                <label for="remember-me">Recordarme</label>
              </div>
              <a @click="resetPassword"><span class="OlvideMiContra">Olvide
                  mi contraseña</span></a>
              <!-- <a href="password/forgot-password" @click="resetPassword"><span class="OlvideMiContra">Olvide
                  mi contraseña</span></a> -->
            </div>
          </div>
          <div class="signUp">
            <div class="signUpp">
              <h1 class="signUppp">¿No tienes cuenta? <a href="/auth/sign-up">Registrate ahora</a></h1>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="leftSide">
      <img src="../../public/image_horsebook_login.png" alt="logo-login" width="820" height="822" />
    </div>
    <!-- </div> -->
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
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
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
      const token = "Token 4fd2e979427a259cc56c18cad449cec5aefaed0d"
      const headers = {
        Authorization: token,
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
            // Set the user locally
            this.$router.push('/inicio')
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
    async resetPassword() {
      const url = this.$config.baseURL + "/users/send-code-reset-password/"
      const data = {
        email: this.login.email,
        resend: false
      }
      console.log(data)
      try {
        const response = await axios.post(url, data)
        console.log(response.data, "AXIOS")
      } catch (error) {
        console.log(error.response.data)
      }
    }
  }
}
</script>

