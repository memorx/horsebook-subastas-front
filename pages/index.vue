<template>
   <div class="h-auto bg-black flex justify-center px-4 sm:px-0">
      <div class="w-11/12 flex flex-col items-center sm:space-x-4">
         <!-- ContentTile Component -->
         <div
            class="w-full flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4 my-12 md:my-6">
            <div class="w-4/5 md:w-2/5 flex flex-col space-y-4 md:space-y-0">
               <ContentTile
                  :title="$t('home.main.title')"
                  :paragraph="$t('home.main.paragraph')"
                  :buttonLabel="$t('home.main.button') ? $t('home.main.button') : null"
                  @button-clicked="handleButtonClick(1)"
                  headingLevel="1"
                  :classOverrides="{
                     title: 'text-white text-xl',
                     paragraph: 'text-white ',
                     button: 'bg-yellow-300 rounded'  // This assumes that `#D9D957` is approximately equivalent to `bg-yellow-300` in Tailwind's colors
                  }"
               />
            </div>

            <div class="w-4/5 md:w-2/5 flex flex-col space-y-4 md:space-y-0">
               <ContentTile
                  :title="$t('home.main.title')"
                  :paragraph="$t('home.main.paragraph')"
                  :buttonLabel="$t('home.main.button') ? $t('home.main.button') : null"
                  @button-clicked="handleButtonClick(1)"
                  headingLevel="1"
                  :classOverrides="{
                     title: 'text-white text-xl',
                     paragraph: 'text-white ',
                     button: 'bg-yellow-300 rounded'  // This assumes that `#D9D957` is approximately equivalent to `bg-yellow-300` in Tailwind's colors
                  }"
               />
            </div>
         </div>

         <SectionTitle :titleText="$t('home.news.title')" containerClass="w-full my-0 mb-8"
            titleClass="text-white text-4xl md:text-7xl lg:text-8xl font-bold uppercase" />

         <!-- next component here -->
         <!-- <div class="w-full h-screen flex flex-row">
            <div class="w-1/2 h-full flex flex-col">
               <div class="w-full h-2/3">
                  <div class="w-3/4 h-full bg-yellow-500 ">

                  </div>
               </div>
               <ContentTile
                  :title="$t('home.main.title')"
                  :paragraph="$t('home.main.paragraph')"
                  headingLevel="2" :styles="{
                     container: {padding: '0 0 0 0'},
                     title: { color: 'white' },
                     paragraph: { color: 'white' },
                  }" />
            </div>
            <div class="w-1/2 h-full flex flex-col items-start justify-start">
               <div class="w-full h-2/3">
                  <div class="w-3/4 h-full bg-yellow-500 ">
                  </div>
               </div>
               <ContentTile
                  :title="$t('home.main.title')"
                  :paragraph="$t('home.main.paragraph')"
                  headingLevel="2" :styles="{
                     container: {padding: '0 0 0 0'},
                     title: { color: 'white' },
                     paragraph: { color: 'white' },
                  }" />
            </div>
         </div> -->
         <!-- Replaced Grid -->
         <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 h-screen lg:h-[900px] w-full">
            <div class=" p-4 flex flex-col items-start justify-center">
               <div class="w-full h-2/3 flex ">
                  <div class="lg:w-2/3 w-1/2 h-full border-yellow-500 border-1 rounded-tl-xl rounded-br-xl">
                  </div>
               </div>
               <ContentTile
                  :title="$t('home.main.title')"
                  :paragraph="$t('home.main.paragraph')"
                  :buttonLabel="null"
                  headingLevel="2"
                  :classOverrides="{
                     container: 'p-0 w-2/3',
                     title: 'text-white text-base',
                     paragraph: 'text-white',
                  }"
               />
            </div>
            <div class=" p-4 flex flex-col items-start justify-center">
               <div class="w-full h-2/3 flex ">
                  <div class="lg:w-2/3 w-1/2 h-full border-yellow-500 border-1 rounded-tl-xl rounded-br-xl">
                  </div>
               </div>
               <ContentTile
                  :title="$t('home.main.title')"
                  :paragraph="$t('home.main.paragraph')"
                  :buttonLabel="null"
                  headingLevel="2"
                  :classOverrides="{
                     container: 'p-0 w-2/3',
                     title: 'text-white text-base',
                     paragraph: 'text-white',
                  }"
               />
            </div>
            <div class=" p-4 flex flex-col items-start justify-center">
               <div class="w-full h-2/3 flex ">
                  <div class="lg:w-2/3 w-1/2 h-full border-yellow-500 border-1 rounded-tl-xl rounded-br-xl">
                  </div>
               </div>
               <ContentTile
                  :title="$t('home.main.title')"
                  :paragraph="$t('home.main.paragraph')"
                  :buttonLabel="null"
                  headingLevel="2"
                  :classOverrides="{
                     container: 'p-0 w-2/3',
                     title: 'text-white text-base',
                     paragraph: 'text-white',
                  }"
               />
            </div>
            <!-- <div class="bg-gray-300 p-4 flex flex-col items-start justify-center">Item 4</div> -->
         </div>
         <!-- end of replaced grid -->


         <SectionTitle :titleText="$t('home.news.title')" containerClass="w-full my-0 mb-8"
            titleClass="text-white text-4xl md:text-7xl lg:text-8xl font-bold uppercase" />

         <SectionTitle :titleText="$t('home.news.title')" containerClass="w-full my-0 mb-8"
            titleClass="text-white text-4xl md:text-7xl lg:text-8xl font-bold uppercase" />
      </div>
   </div>
</template>

<script>
import ContentTile from '~/components/ContentTile.vue';
import SectionTitle from '~/components/SectionTitle.vue';

export default {
   components: {
      ContentTile,
      SectionTitle
   },
   methods: {
      handleButtonClick(index) {
         // Handle button click event. For demonstration:
         alert(`Button clicked on tile: ${index}`);
      }
   }
}
</script>

<style scoped>
.h-400px {
   height: 400px;
}

/* You can add additional styles here if needed */
</style>