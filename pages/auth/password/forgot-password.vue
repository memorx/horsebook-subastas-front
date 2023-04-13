<template>
  <div class="containerGeneral">
    <!-- <div class="content"> -->
    <div class="rightSide">
      <div class="limiter">
        <div class="logo">
          <img src="../../../public/image_la_silla.png" alt="logo" width="90" height="92" />
        </div>
        <div class="title">
          <h1 class="sesion">Verifica tu cuenta</h1>
          <p class="horsebook">Ingresa el código que llego a tu correo correo@gmail.com para verificar tu cuenta</p>
        </div>
        <form class='space-y-6'>
          <div>
            <!-- <p v-for='error in errorMsg' :key='error' class='text-red-600 text-sm leading-tight text-center'>
              {{ error }}
            </p> -->
          </div>
          <div class="frame">
            <input class="rectangle1" type="text" maxlength="1" />
            <input class="rectangle2" type="text" maxlength="1" />
            <input class="rectangle3" type="text" maxlength="1" />
            <input class="rectangle4" type="text" maxlength="1" />
            <input class="rectangle5" type="text" maxlength="1" />
            <input class="rectangle6" type="text" maxlength="1" />
          </div>
          <div class="containerButton">
            <button type='submit' class="buttonCta">Verificar código</button>
            <div class="helps">

            </div>
          </div>
          <div class="signUp">
            <div class="signUpp">
              <h1 class="signUppp">¿No recibiste el código? <a href="/auth/sign-up">Reenviar código</a></h1>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="leftSide">
      <img src="../../../public/image_horsebook_login.png" alt="logo-login" width="820" height="822" />
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

.frame {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 17px;
  width: 396px;
  height: 52px;
  flex: none;
  order: 1;
  flex-grow: 0;
}

.rectangle1,
.rectangle2,
.rectangle3,
.rectangle4,
.rectangle5,
.rectangle6 {
  box-sizing: border-box;
  width: 51px;
  height: 52px;
  background: #FBFBFB;
  border: 0.5px solid #A0A0A0;
  border-radius: 8px;
  flex: none;
  flex-grow: 0;
  font-size: 20px;
  text-align: center;
}

.rectangle1:focus,
.rectangle2:focus,
.rectangle3:focus,
.rectangle4:focus,
.rectangle5:focus,
.rectangle6:focus {
  outline: none;
  border-color: #3466E2;
}

.rectangle1::placeholder,
.rectangle2::placeholder,
.rectangle3::placeholder,
.rectangle4::placeholder,
.rectangle5::placeholder,
.rectangle6::placeholder {
  color: #A0A0A0;
  font-size: 20px;
  text-align: center;
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
