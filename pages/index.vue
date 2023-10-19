<template>
   <div class="h-auto bg-black flex justify-center px-4 sm:px-0">
      <div class="w-11/12 flex flex-col items-center sm:space-x-4">
         <!-- ContentTile Component -->
         <div
            class="w-full flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4 my-12 md:my-6">
            <div class="w-4/5 md:w-2/5 flex flex-col space-y-4 md:space-y-0">
               <ContentTile :title="$t('home.main.title')" :paragraph="$t('home.main.paragraph')"
                  :buttonLabel="$t('home.main.button') ? $t('home.main.button') : null"
                  @button-clicked="handleButtonClick(1)" headingLevel="1" :styles="{
                     container: {},
                     title: { color: 'white' },
                     paragraph: { color: 'white' },
                     button: { backgroundColor: '#D9D957', rounded: 'rounded' }
                  }" />
            </div>

            <div class="w-4/5 md:w-2/5 flex flex-col space-y-4 md:space-y-0">
               <ContentTile :title="$t('home.main.title')" :paragraph="$t('home.main.paragraph')"
                  :buttonLabel="$t('home.main.button') ? $t('home.main.button') : null"
                  @button-clicked="handleButtonClick(1)" headingLevel="2" :styles="{
                     container: {},
                     title: { color: 'white' },
                     paragraph: { color: 'white' },
                     button: { backgroundColor: '#D9D957', rounded: 'rounded' }
                  }" />
            </div>
         </div>

         <SectionTitle :titleText="$t('home.news.title')" containerClass="w-full my-0 mb-8"
            titleClass="text-white text-4xl md:text-7xl lg:text-8xl font-bold uppercase" />

         <!-- next component here -->
         <!-- <div class="w-full h-screen bg-white flex flex-row">
            <div class="w-1/2 h-full bg-yellow-500 flex flex-col">
               <div class="w-full h-1/2 bg-red-500 "></div>
               <div class="w-full h-1/2 bg-green-500 "></div>
            </div>
            <div class="w-1/2 h-full bg-blue-500 flex flex-col justify-center items-center">
               <div class="w-full h-1/2 bg-red-500 "></div>
            </div>
         </div> -->


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