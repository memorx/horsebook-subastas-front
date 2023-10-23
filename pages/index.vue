<template>
   <div class="h-auto bg-black flex justify-center px-4 sm:px-0">
      <div class="w-11/12 flex flex-col items-center sm:space-x-4">
         <!-- Main Component -->
         <div
            class="lg:h-screen md:h-2/3 h-1/2 w-full flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4 my-12 md:my-6">
            <div class="w-full md:w-4/5 lg:w-1/2 flex flex-col space-y-4 md:space-y-0">
               <ContentTile :title="$t('home.main.title')" :paragraph="$t('home.main.paragraph')"
                  :buttonLabel="$t('home.main.button') ? $t('home.main.button') : null"
                  @button-clicked="handleButtonClick(1)" headingLevel="1" :classOverrides="{
                     title: 'text-white text-xl md:text-2xl lg:text-3xl uppercase font-roboto my-2 md:my-3 lg:my-4',
                     paragraph: 'text-white mb-3 md:mb-4 lg:mb-5 text-sm md:text-base lg:text-lg',
                     button: 'bg-custom-gold text-sm md:text-base lg:text-lg'
                  }" />
            </div>

            <div class="w-4/5 md:w-2/5 flex flex-col space-y-4 md:space-y-0">
               <ContentTile :title="$t('home.main.title')" :paragraph="$t('home.main.paragraph')"
                  :buttonLabel="$t('home.main.button') ? $t('home.main.button') : null"
                  @button-clicked="handleButtonClick(1)" headingLevel="1" :classOverrides="{
                     title: 'text-white text-xl',
                     paragraph: 'text-white ',
                     button: 'bg-custom-gold rounded'  // This assumes that `#D9D957` is approximately equivalent to `bg-custom-gold` in Tailwind's colors
                  }" />
            </div>
         </div>

         <!-- News section -->
         <SectionTitle :titleText="$t('home.news.title')" containerClass="w-full my-0 mb-8"
            titleClass="text-white text-4xl md:text-7xl lg:text-8xl font-bold uppercase opacity-20" />

         <div class="w-full flex justify-start">
            <div class="w-2/3 ">
               <div :class="`grid grid-cols-1 md:grid-cols-${gridCols} gap-4 flex w-full`">
                  <div v-for="newsItem in newsData" :key="newsItem.id"
                     class="p-4 flex flex-col items-start justify-center">
                     <div class="w-full relative" :style="`padding-bottom: 100%;`">
                        <!-- Aspect ratio box: Padding bottom is set to 100% to create a 1:1 ratio box -->
                        <img :src="newsItem.image" alt="News Image"
                           class="absolute top-0 left-0 w-full h-full object-cover border-yellow-500 border-1 rounded-tl-xl rounded-br-xl">
                     </div>
                     <ContentTile :title="newsItem.title[currentLang]" :paragraph="newsItem.paragraph[currentLang]"  :buttonLabel="null"
                        headingLevel="2" :classOverrides="{
                           container: 'p-0 w-2/3 mt-2',
                           title: 'text-white text-base',
                           paragraph: 'text-white',
                        }" />
                  </div>
               </div>
            </div>
         </div>

         <ReusableButton :buttonText="$t('home.news.button')" @handle-click="someFunction(1)" />
         <!-- end of news section -->

         <!-- US -->
         <div class="my-8 lg:my-0 w-full lg:h-screen h-1/2 flex flex-col justify-end">
            <SectionTitle :titleText="$t('home.us.title')" containerClass="w-full my-0 mb-8"
            titleClass="text-white text-4xl md:text-7xl lg:text-8xl font-bold uppercase opacity-20" />
            <ContentTile :title="$t('home.us.subTitle')" :paragraph="$t('home.us.paragraph')"
               :buttonLabel="$t('home.us.title') ? $t('home.us.title') : null"
               @button-clicked="handleButtonClick(1)" headingLevel="1" :classOverrides="{
                  title: 'text-white text-xs md:text-sm text-base uppercase',
                  paragraph: 'text-white text-xs md:text-sm text-base opacity-50 ',
                  button: 'lg:px-12 px-6 md:px-8 py-2 bg-black text-white border-1 border-yellow-500 rounded-2xl'
            }" />
         </div>



         <SectionTitle :titleText="$t('home.news.title')" containerClass="w-full my-0 mb-8"
            titleClass="text-white text-4xl md:text-7xl lg:text-8xl font-bold uppercase opacity-20" />

         <SectionTitle :titleText="$t('home.news.title')" containerClass="w-full my-0 mb-8 "
            titleClass="text-white text-4xl md:text-7xl lg:text-8xl font-bold uppercase opacity-20" />
      </div>
   </div>
</template>

<script>
import ContentTile from '~/components/ContentTile.vue';
import SectionTitle from '~/components/SectionTitle.vue';
import ReusableButton from '~/components/ReusableButton.vue';

export default {
   components: {
      ContentTile,
      SectionTitle,
      ReusableButton
   },
   computed: {
      gridCols() {
         // Get the square root of the number of cards to determine grid columns
         return Math.ceil(Math.sqrt(this.newsData.length));
      },
      currentLang() {
         return this.$i18n.locale;  // This assumes you're using the vue-i18n package
      },
   },
   methods: {
      handleButtonClick(index) {
         // Handle button click event. For demonstration:
         alert(`Button clicked on tile: ${index}`);
      },
      someFunction() {
         // Handle button click event. For demonstration:
         alert(`Reusable Button clicked `);
      }
   },
   data() {
      return {
         newsData: [ // Placeholder data
            {
               id: 1,
               image: 'path_to_image1.jpg',
               title: { en: 'English Title 1', es: 'Spanish Title 1' },
               paragraph: { en: 'English content...', es: 'Spanish content...' }
            },
            {
               id: 2,
               image: 'path_to_image2.jpg',
               title: { en: 'English Title 2', es: 'Spanish Title 2' },
               paragraph: { en: 'English content...', es: 'Spanish content...' }
            },
            {
               id: 3,
               image: 'path_to_image3.jpg',
               title: { en: 'English Title 3', es: 'Spanish Title 3' },
               paragraph: { en: 'English content...', es: 'Spanish content...' }
            }
            // ... Add as many items as required for testing
         ]
      }
   }
}
</script>

<style scoped>
/* You can add additional styles here if needed */
</style>