<template>
  <div class="flex containerGeneral h-full bg-white">
    <div class="flex items-center justify-center flex-1 rightSide">
      <div class="flex flex-col items-center w-4/5 limiter">
        <div class="logo">
          <img src="../../public/image_la_silla.png" alt="logo"/>
        </div>
        <div class="flex flex-col items-center w-full mt-8 title">
          <h1 class="sesion font-medium text-4xl text-black">Crear Cuenta</h1>
          <p class="horsebook font-normal text-base text-neutral-600">Ingresa tus datos para entrar a HorseBook</p>
        </div>
        <form class="w-full mt-12 space-y-6">
          <div class="flex flex-col w-full gap-6">
            <div class="flex flex-col w-full ">
              <label for="email" class="titleInput font-medium text-base text-black">Nombres</label>
              <input class="styleInput w-full h-14 px-6 bg-white border border-neutral-300 rounded-lg"
                placeholder="Ingresar nombre" />
            </div>
            <div class="flex flex-col w-full">
              <label for="password" class="titleInput font-medium text-base text-black">Apellidos</label>
              <input class="styleInput w-full h-14 px-6 bg-white border border-neutral-300 rounded-lg"
                placeholder="Ingresar apellidos" />
            </div>
            <div class="flex flex-col w-full ">
              <label for="pasaporte" class="titleInput font-medium text-base text-black">Pasaporte / ID</label>
              <input class="styleInput w-full h-14 px-6 bg-white border border-neutral-300 rounded-lg"
                placeholder="Ingresar # de pasaporte / ID" />
            </div>
            <div class="flex flex-col w-full ">
              <label for="pais" class="titleInput font-medium text-base text-black">País</label>
              <input class="styleInput w-full h-14 px-6 bg-white border border-neutral-300 rounded-lg"
                placeholder="Seleccionar país" />
            </div>
            <div class="flex flex-col w-full ">
              <label for="ciudad" class="titleInput font-medium text-base text-black">Ciudad</label>
              <select class="styleInput w-full h-14 px-6 bg-white border border-neutral-300 rounded-lg" id="ciudad">
                <option value="">Seleccionar ciudad</option>
                <!-- Add city options here, but that depends on the selected country -->
              </select>
            </div>
            <div class="flex flex-col w-full ">
              <label for="ciudad" class="titleInput font-medium text-base text-black">Teléfono</label>
              <input class="styleInput w-full h-14 px-6 bg-white border border-neutral-300 rounded-lg"
                placeholder="Ingresar teléfono" />
            </div>
            <div class="flex flex-col w-full ">
              <label for="email" class="titleInput font-medium text-base text-black">Email</label>
              <input class="styleInput w-full h-14 px-6 bg-white border border-neutral-300 rounded-lg"
                placeholder="Ingresar email" />
            </div>
            <div class="flex flex-col w-full ">
              <label for="password" class="titleInput font-medium text-base text-black">Contraseña</label>
              <input class="styleInput w-full h-14 px-6 bg-white border border-neutral-300 rounded-lg"
                placeholder="Ingresar contraseña" />
            </div>
            <div class="flex flex-col w-full ">
              <label for="confirmar contraseña" class="titleInput font-medium text-base text-black">Confirmar
                contraseña</label>
              <input class="styleInput w-full h-14 px-6 bg-white border border-neutral-300 rounded-lg"
                placeholder="Confirmar contraseña" />
            </div>
          </div>
          <div class="flex flex-col w-full mt-6 containerButton">
            <button type="submit" class="buttonCta py-2 px-4 bg-black text-white rounded-lg">Crear cuenta</button>
          </div>
          <div class="flex justify-center w-full mt-6 pb-2 signUp">
            <div class="flex flex-col items-center signUpp">
              <p class="signUppp font-normal text-base text-neutral-600">¿Ya tienes cuenta? <nuxt-link to="/auth/login"
    class="font-medium text-base text-black">Inicia sesión</nuxt-link></p>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="lg:flex hidden flex-1 leftSide ">
      <img src="../../public/image_horsebook_login.png" alt="logo-login" class="w-full h-full object-cover" />
    </div>
  </div>
</template>