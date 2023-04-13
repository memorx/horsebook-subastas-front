<template>
  <div class="containerGeneral">
    <!-- <div class="content"> -->
    <div class="rightSide">
      <div class="limiter">
        <div class="logo">
          <img src="../../public/image_la_silla.png" alt="logo" width="90" height="92" />
        </div>
        <div class="title">
          <h1 class="sesion">Crear Cuenta</h1>
          <p class="horsebook">Ingresa tus datos para entrar a HorseBook</p>
        </div>
        <form class='space-y-6'>
          <!-- <div>
            <p v-for='error in errorMsg' :key='error' class='text-red-600 text-sm leading-tight text-center'>
              {{ error }}
            </p>
          </div> -->
          <div class="wrapperInputs">
            <div class="containerInput">
              <label for="email" class="titleInput">Nombres</label>
              <input class="styleInput" placeholder="Ingresar nombre" />
            </div>
            <div class="containerInput">
              <label for="password" class="titleInput">Apellidos</label>
              <input class="styleInput" placeholder="Ingresar apellidos" />
            </div>
            <div class="containerInput">
              <label for="pasaporte" class="titleInput">Pasaporte / ID</label>
              <input class="styleInput" placeholder="Ingresar # de pasaporte / ID" />
            </div>
            <div class="containerInput">
              <label for="pais" class="titleInput">País</label>
              <input class="styleInput" placeholder="Seleccionar país" />
            </div>
            <div class="containerInput">
              <label for="ciudad" class="titleInput">Ciudad</label>
              <select class="styleInput" id="ciudad">
                <option value="">Seleccionar ciudad</option>
                <!-- Agrega opciones de ciudades aquí, pero que dependan del país seleccionado -->
              </select>
            </div>
            <div class="containerInput">
              <label for="ciudad" class="titleInput">Teléfono</label>
              <input class="styleInput" placeholder="Ingresar teléfono" />
            </div>
            <div class="containerInput">
              <label for="email" class="titleInput">Email</label>
              <input class="styleInput" placeholder="Ingresar email" />
            </div>
            <div class="containerInput">
              <label for="password" class="titleInput">Contraseña</label>
              <input class="styleInput" placeholder="Ingresar contraseña" />
            </div>
            <div class="containerInput">
              <label for="confirmar contraseña" class="titleInput">Confirmar contraseña</label>
              <input class="styleInput" placeholder="Confirmar contraseña" />
            </div>
          </div>
          <div class="containerButton">
            <button type='submit' class="buttonCta">Crear cuenta</button>
          </div>
          <div class="signUp">
            <div class="signUpp">
              <h1 class="signUppp">¿Ya tienes cuenta? <a href="/auth/login">Inicia sesión</a></h1>
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
