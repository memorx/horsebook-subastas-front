<template>
   <div class="h-auto flex justify-center md:px-4 bg-transparent ">
      <div class="w-11/12 flex flex-col items-center sm:space-x-4">

         <!-- Main section -->
         <div class="h-auto md:h-1/2 lg:h-screen w-full my-12 md:my-6 grid grid-1 md:grid-cols-2 gap-4">
            <!-- Content -->
            <div class="order-2 md:order-1 flex flex-col items-center justify-center space-y-4 w-full md:w-auto">
               <ContentTile :title="$t('home.main.title')" :paragraph="$t('home.main.paragraph')"
                  :buttonLabel="$t('home.main.button') ? $t('home.main.button') : null"
                  @button-clicked="handleButtonClick(1)" headingLevel="1" :classOverrides="{
                     container: 'flex flex-col items-center md:items-start w-full md:w-auto',
                     title: 'text-center md:text-start text-white text-xl md:text-2xl lg:text-3xl uppercase font-roboto my-2 md:my-3 lg:my-4',
                     paragraph: 'text-white mb-3 md:mb-4 lg:mb-5 text-sm md:text-base lg:text-lg text-center md:text-left',
                     button: 'bg-custom-gold text-sm md:text-base lg:text-lg uppercase text-center md:text-left mt-4 md:mt-0'
                  }" />
            </div>

            <!-- Image -->
            <div class="order-1 md:order-2 flex flex-col items-center justify-center space-y-4">
               <ContentTile title="Octubre 2023" paragraph="la subasta comienza en" :buttonLabel="null" headingLevel="2"
                  :classOverrides="{
                     container: 'flex flex-col items-center w-full',
                     title: 'text-custom-gold font-normal text-xl md:text-2xl lg:text-2xl uppercase font-roboto',
                     paragraph: 'uppercase text-white text-xs md:text-sm lg:text-base',
                  }" />
               <img src="../public/conter-home.png" alt="conter"
                  class="w-1/3 md:w-3/6 lg:w-3/6 xl:w-2/5 h-auto object-cover" />
            </div>
         </div>

         <!-- News section -->
         <SectionTitle :titleText="$t('home.news.title')" containerClass="md:w-full my-0 mb-8"
            titleClass="text-white text-4xl md:text-7xl lg:text-8xl font-bold uppercase opacity-20" />

         <div class="w-full flex md:flex-row flex-col h-auto items-center">
            <div class="flex w-full md:w-1/2 flex-col">
               <div
                  class="p-4 flex flex-col items-start justify-center">
                  <div class="w-full relative" :style="`padding-bottom: 100%;`">
                     <!-- Aspect ratio box: Padding bottom is set to 100% to create a 1:1 ratio box -->
                     <!-- The image path would be:src="newsItem.image" -->
                     <img src="../public/example-new-card.png" alt="News Image"
                        class="absolute top-0 left-0 w-full h-full object-cover border-custom-gold border-2 rounded-tl-xl rounded-br-xl">
                  </div>
                  <ContentTile :title="newsData[0].title[currentLang]" :paragraph="newsData[0].paragraph[currentLang]"
                     :buttonLabel="null" headingLevel="2" :classOverrides="{
                        container: 'p-0 w-full mt-2',
                        title: 'text-white text-sm md:text-base lg:text-lg uppercase font-roboto',
                        paragraph: 'text-white text-sm md:text-base lg:text-lg font-roboto',
                     }" />
               </div>
               <div
                  class="p-4 flex flex-col items-start justify-center">
                  <div class="w-full relative" :style="`padding-bottom: 100%;`">
                     <!-- Aspect ratio box: Padding bottom is set to 100% to create a 1:1 ratio box -->
                     <!-- The image path would be:src="newsItem.image" -->
                     <img src="../public/example-new-card.png" alt="News Image"
                        class="absolute top-0 left-0 w-full h-full object-cover border-custom-gold border-2 rounded-tl-xl rounded-br-xl">
                  </div>
                  <ContentTile :title="newsData[1].title[currentLang]" :paragraph="newsData[1].paragraph[currentLang]"
                     :buttonLabel="null" headingLevel="2" :classOverrides="{
                        container: 'p-0 w-full mt-2',
                        title: 'text-white text-sm md:text-base lg:text-lg uppercase font-roboto',
                        paragraph: 'text-white text-sm md:text-base lg:text-lg font-roboto',
                     }" />
               </div>
            </div>
            <div class="flex w-full md:w-1/2 flex-col items-center justify-center ">
               <div
                  class="p-4 flex flex-col items-start justify-center w-full">
                  <div class="w-full relative" :style="`padding-bottom: 100%;`">
                     <!-- Aspect ratio box: Padding bottom is set to 100% to create a 1:1 ratio box -->
                     <!-- The image path would be:src="newsItem.image" -->
                     <img src="../public/example-new-card.png" alt="News Image"
                        class="absolute top-0 left-0 w-full h-full object-cover border-custom-gold border-2 rounded-tl-xl rounded-br-xl">
                  </div>
                  <ContentTile :title="newsData[2].title[currentLang]" :paragraph="newsData[2].paragraph[currentLang]"
                     :buttonLabel="null" headingLevel="2" :classOverrides="{
                        container: 'p-0 w-full mt-2',
                        title: 'text-white text-sm md:text-base lg:text-lg uppercase font-roboto',
                        paragraph: 'text-white text-sm md:text-base lg:text-lg font-roboto',
                     }" />
               </div>
            </div>
         </div>

         <ReusableButton :buttonText="$t('home.news.button')" buttonClass="text-sm md:text-base lg:text-lg uppercase"
            @handle-click="someFunction(1)" />
         <!-- end of news section -->

         <!-- US -->
         <div class="my-16 md:my-8 lg:my-0 w-full h-2/3 md:h-screen flex flex-col justify-end">
            <SectionTitle :titleText="$t('home.us.title')"
               containerClass="flex flex-col items-center md:items-start w-full my-0 md:mb-8"
               titleClass="text-white text-4xl md:text-7xl lg:text-8xl font-bold uppercase opacity-20" />
            <ContentTile :title="$t('home.us.subTitle')" :paragraph="$t('home.us.paragraph')"
               :buttonLabel="$t('home.us.title') ? $t('home.us.title') : null" @button-clicked="handleButtonClick(1)"
               headingLevel="2" :classOverrides="{
                  container: 'flex flex-col items-center w-full md:w-11/12 md:items-start ',
                  title: 'text-white text-xl md:text-2xl lg:text-3xl uppercase font-roboto my-2 md:my-3 lg:my-4 text-center md:text-left',
                  paragraph: 'text-white mb-4 md:mb-5 lg:mb-6 text-sm md:text-base lg:text-lg text-center md:text-left',
                  button: 'lg:px-12 px-8 md:px-8 py-2 bg-black text-white border-1 border-custom-gold rounded-2xl uppercase text-sm md:text-base lg:text-lg'
               }" />
         </div>


         <!-- Contact -->
         <SectionTitle :titleText="$t('home.contact.title')"
            containerClass="flex flex-col items-center md:items-start w-full md:mt-16 lg:mt-20 mt-8 md:mb-8"
            titleClass="text-white text-4xl md:text-7xl lg:text-8xl font-bold uppercase opacity-20" />

         <div class=" w-full my-2 md:my-6 grid grid-1 lg:grid-cols-2 gap-4">
            <!-- Content on the left -->
            <div class="flex flex-col justify-start space-y-4 w-full">
               <ContentTile :title="$t('home.contact.subTitle')" :paragraph="$t('home.contact.paragraph')"
                  :buttonLabel="null" headingLevel="2" :classOverrides="{
                     container: 'w-full sm:w-full md:w-2/3 lg:w-full ',
                     title: 'text-white text-xl md:text-2xl lg:text-3xl uppercase font-roboto my-2 md:my-3 lg:my-4 text-center md:text-left',
                     paragraph: 'text-white mb-3 md:mb-4 lg:mb-5 text-sm md:text-base lg:text-lg text-center md:text-left',
                  }" />
            </div>

            <!-- Content on the right including the image -->
            <div class="flex flex-col lg:items-center lg:justify-center space-y-4">
               <!-- Form starts here -->
               <form id="contactForm" class="w-full md:w-2/3 p-4" @submit.prevent="handleSubmit">
                  <!-- Name input -->
                  <label for="name"
                     class="block text-white mb-1 font-roboto text-sm md:text-base lg:text-lg font-normal capitalize">{{
                        $t('home.contact.form.name') }}</label>
                  <input type="text" id="name" name="name" required autocomplete="name"
                     class="w-full p-2 mb-2 rounded bg-[#15151A] text-white font-roboto border-[#15151A]">

                  <!-- Phone input -->
                  <label for="phone"
                     class="block text-white mb-1 font-roboto text-sm md:text-base lg:text-lg font-normal capitalize">{{
                        $t('home.contact.form.phone') }}</label>
                  <input type="tel" id="phone" name="phone" required autocomplete="tel"
                     class="w-full p-2 mb-2 rounded bg-[#15151A] text-white font-roboto border-[#15151A]">

                  <!-- Email input -->
                  <label for="email"
                     class="block text-white mb-1 font-roboto text-sm md:text-base lg:text-lg font-normal capitalize">{{
                        $t('home.contact.form.email') }}</label>
                  <input type="email" id="email" name="email" required autocomplete="email"
                     class="w-full p-2 mb-2 rounded bg-[#15151A] text-white font-roboto border-[#15151A]">

                  <!-- Message input -->
                  <label for="message"
                     class="block text-white mb-1 font-roboto text-sm md:text-base lg:text-lg font-normal capitalize">{{
                        $t('home.contact.form.message') }}</label>
                  <textarea id="message" name="message" required rows="4" cols="50" maxlength="500"
                     class="w-full p-2 mb-4 rounded bg-[#15151A] text-white font-roboto border-[#15151A]"></textarea>

                  <!-- Submit button -->
                  <ReusableButton type="submit" containerClass="w-full flex flex-col items-center md:w-auto md:items-start"
                     buttonClass="uppercase text-sm md:text-base lg:text-l " :buttonText="$t('home.contact.button')" />
               </form>
            </div>
         </div>

      </div>
   </div>
</template>

<script>
import ContentTile from '~/components/ContentTile.vue';
import SectionTitle from '~/components/SectionTitle.vue';
import ReusableButton from '~/components/ReusableButton.vue';

export default {
   mounted() {
      this.$store.commit('setBgImage', 'home-bg.jpg');
   },
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
      },
      handleSubmit() {
         // Handle form submission. For demonstration:
         alert('Form submitted');
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

<style scoped>/* You can add additional styles here if needed */</style>