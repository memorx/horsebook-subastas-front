<!-- Please remove this file from your project -->
<template>
  <div class="containerGeneral">
    <!-- <div class="content"> -->
    <div class="rightSide">
      <div class="limiter">
        <div class="logo">
          <img src="../public/image_la_silla.png" alt="logo" />
        </div>
        <div class="title">
          <h1 class="sesion">Iniciar sesión</h1>
          <p class="horsebook">Ingresa tus datos para entrar a HorseBook</p>
        </div>
        <div class="wrapperInputs">
          <div class="containerInput">
            <span class="titleInput">Email</span>
            <input class="styleInput" type="email" placeholder="Ingresar email" />
          </div>
          <div class="containerInput">
            <span class="titleInput">Contraseña</span>
            <input class="styleInput" type="email" placeholder="Ingresar contraseña" />
          </div>
        </div>
        <div class="containerButton">
          <button class="buttonCta">Ingresar</button>
          <div class="helps">
            <div class="Recordarme">
              <input type="checkbox" />
              <span>Recordarme</span>
            </div>
            <span class="OlvideMiContra">Olvide mi contraseña</span>
          </div>
        </div>
      </div>
    </div>
    <div class="leftSide">
      <img src="../public/image_horsebook_login.png" alt="logo-login" width="820" height="822" />
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
  width: 100%;
  gap: 10px;
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
</style>
<script>
export default {
  name: "NuxtTutorial",
};
</script>
