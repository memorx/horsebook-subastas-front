#I only create this file because I am trying to pass my styles to Tailwind CSS. When I finished that I will delete this file.
<template>
  <div class="flex p-0 w-full h-full">
    <Loading v-if="loading"
      class="fixed w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50" />
    <div class="box-border flex flex-row items-start p-0 w-280 h-70vh bg-gray-100 border-r border-gray-300">
      <div class="flex flex-col justify-between items-start p-0 w-280 h-822">
        <div class="flex flex-col items-start pt-32 gap-84 w-280 h-505">
          <div class="flex flex-row items-start px-20 gap-8 w-280 h-92">
            <img src="../../public/image_la_silla.png" alt="logo" width="90" height="92">
          </div>
          <div class="flex flex-col items-start p-4 gap-4 w-80 h-96">
            <div class="flex flex-row items-center p-2 gap-2 w-62 h-12 bg-gray-900 rounded-lg">
              <div class="flex flex-row items-center gap-12 w-224 h-24">
                <div class="w-20 h-20"></div>
                <p class="font-montserrat font-medium text-base text-white pr-2">Tus subastas</p>
              </div>
            </div>
            <div class="flex flex-col items-start pt-8 gap-8 w-screen h-9">
              <div class="w-248 h-1 bg-gray-300"></div>
            </div>

            <div class="flex flex-row items-center px-12 py-8 gap-8 w-248 h-40 rounded-6">
              <div class="flex flex-row items-center p-0 gap-12 w-224 h-24">
                <div class="w-24 h-24"></div>
                <p class="font-montserrat font-medium text-base leading-6 text-gray-900 pr-2">Tus datos
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col items-start p-0 md:p-16 pb-32 gap-24 w-280 h-72"></div>
      </div>
    </div>
  </div>
</template>
<script>
import Loading from '../../components/shared/Loading.vue';
export default {
  components: { Loading },
}
</script>
