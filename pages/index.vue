<template>
   <div class="h-auto bg-black flex justify-center px-4 sm:px-0">
      <div class="w-11/12 flex flex-col items-center sm:space-x-4">
         <!-- Main Component -->
         <div class="lg:h-screen md:h-2/3 h-1/2 w-full my-12 md:my-6 grid grid-1 md:grid-cols-2 gap-4">
            <!-- Content on the left -->
            <div class="flex flex-col justify-center space-y-4">
               <ContentTile :title="$t('home.main.title')" :paragraph="$t('home.main.paragraph')"
                  :buttonLabel="$t('home.main.button') ? $t('home.main.button') : null"
                  @button-clicked="handleButtonClick(1)" headingLevel="1" :classOverrides="{
                     title: 'text-white text-xl md:text-2xl lg:text-3xl uppercase font-roboto my-2 md:my-3 lg:my-4',
                     paragraph: 'text-white mb-3 md:mb-4 lg:mb-5 text-sm md:text-base lg:text-lg',
                     button: 'bg-custom-gold text-sm md:text-base lg:text-lg'
                  }" />
            </div>

            <!-- Content on the right including the image -->
            <div class="flex flex-col items-center justify-center space-y-4">
               <ContentTile title="Octubre 2023" paragraph="la subasta comienza en"
                  :buttonLabel="null"
                  headingLevel="2" :classOverrides="{
                     container: 'w-full flex flex-col items-center mt-4',
                     title: 'text-custom-gold font-normal text-xl md:text-2xl lg:text-2xl uppercase font-roboto',
                     paragraph: 'uppercase text-white text-xs md:text-sm lg:text-base',
                  }" />
               <img src="../public/conter-home.png" alt="conter" class="w-3/6 lg:w-3/6 xl:w-2/5 h-auto object-cover" />
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
                        <!-- The image path would be:src="newsItem.image" -->
                        <img src="../public/example-new-card.png"  alt="News Image"
                           class="absolute top-0 left-0 w-full h-full object-cover border-yellow-500 border-1 rounded-tl-xl rounded-br-xl">
                     </div>
                     <ContentTile :title="newsItem.title[currentLang]" :paragraph="newsItem.paragraph[currentLang]"  :buttonLabel="null"
                        headingLevel="2" :classOverrides="{
                           container: 'p-0 w-full mt-2',
                           title: 'text-white text-sm md:text-base lg:text-lg uppercase font-roboto',
                           paragraph: 'text-white text-sm md:text-base lg:text-lg font-roboto',
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
               image: '../public/example-new-card.png',
               title: { en: 'English Title 1', es: 'Spanish Title 1' },
               paragraph: { en: 'English content...', es: 'Spanish content...' }
            },
            {
               id: 2,
               image: '../public/example-new-card.png',
               title: { en: 'English Title 2', es: 'Spanish Title 2' },
               paragraph: { en: 'English content...', es: 'Spanish content...' }
            },
            {
               id: 3,
               image: '../public/example-new-card.png',
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