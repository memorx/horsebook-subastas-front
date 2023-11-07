<template>
   <div class="h-auto flex justify-center md:px-4 bg-transparent ">
      <div class="w-11/12 flex flex-col items-center sm:space-x-4">

         <!-- Main section web -->
         <div class="hidden md:grid  h-auto md:h-1/2 lg:h-screen w-full my-12 md:my-6 grid-1 md:grid-cols-2 gap-4">
            <!-- Content -->
            <div class="order-2 md:order-1 flex flex-col items-center justify-center space-y-4 w-full md:w-auto">
               <ContentTile :title="$t('home.main.title')" :paragraph="$t('home.main.paragraph')"
                  :buttonLabel="$t('home.main.button') ? $t('home.main.button') : null" @button-clicked="handleShowBids"
                  headingLevel="1" :classOverrides="{
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

         <!-- Main section mobile -->
         <div class="grid md:hidden h-auto w-full my-12 grid-1 gap-4">
            <!-- Content -->
            <div class="order-2 flex flex-col items-center justify-center space-y-4 w-full ">
               <ContentTile title="" :paragraph="$t('home.main.paragraph')"
                  :buttonLabel="$t('home.main.button') ? $t('home.main.button') : null" @button-clicked="handleShowBids"
                  headingLevel="1" :classOverrides="{
                     container: 'flex flex-col items-center w-full',
                     title: 'text-center text-white text-xl uppercase font-roboto my-2',
                     paragraph: 'text-white mb-3 text-sm text-center',
                     button: 'bg-custom-gold text-sm uppercase text-center'
                  }" />
            </div>

            <!-- Image -->
            <div class="order-1 flex flex-col items-center justify-center space-y-4">
               <h2 class="text-center text-white text-4xl uppercase font-roboto my-0">{{$t('home.main.title')}}</h2>
               <ContentTile title="Octubre 2023" paragraph="la subasta comienza en" :buttonLabel="null" headingLevel="2"
                  :classOverrides="{
                     container: 'flex flex-col items-center w-full',
                     title: 'text-custom-gold font-normal text-xl uppercase font-roboto',
                     paragraph: 'uppercase text-white text-xs',
                  }" />
               <img src="../public/conter-home.png" alt="conter"
                  class="w-1/3  h-auto object-cover" />
            </div>
         </div>

         <!-- Bid -->
         <SectionTitle :titleText="$t('home.bid.MainTitle')" ref="bidSection"
            containerClass="flex flex-col items-center lg:items-start w-full md:mt-16 lg:mt-20 mt-8 md:mb-8"
            titleClass="text-white text-4xl md:text-7xl lg:text-8xl font-bold uppercase opacity-20" />

         <!-- Cards Container -->
         <div class="flex justify-center w-full h-auto mt-8">
            <div class="grid grid-cols-1 grid-rows-2 gap-12 w-11/12 h-full">
               <!-- Card 1 -->
               <div
                  class="bg-white flex flex-col lg:items-start lg:justify-center lg:flex-row shadow-lg rounded-xl border-2 border-custom-gold">
                  <!-- Image part -->
                  <div class="w-full lg:w-1/2 h-full flex items-center justify-center">
                     <img src="../public/white-horse.png" alt="Image 1" class="w-full h-full object-cover rounded-xl">
                  </div>

                  <!-- Content part -->
                  <div class="w-full lg:w-1/2 flex items-center justify-start px-12 py-4 h-full">
                     <div class="flex flex-col w-full h-full justify-between">
                        <div class="xl:mt-6">
                           <!-- Placeholder content, replace with your content -->
                           <h2 class="font-roboto uppercase font-extrabold text-base lg:text-lg xl:text-xl">remate</h2>
                           <p class="font-roboto capital font-bold text-sm lg:text-base xl:text-lg">La Silla 1er Semana</p>

                           <div class="py-2 lg:py-3 xl:py-4">
                              <div class="flex items-center">
                                 <img src="../public/message-icon.png" alt="lot" class="mr-2 h-3 w-3">
                                 <p class="font-roboto capital font-bold text-sm text-[#575757] uppercase">0 lotes</p>
                              </div>
                              <div class="flex items-center">
                                 <img src="../public/location-icon.png" alt="location" class="mr-2 h-3 w-3">
                                 <p class="font-roboto capital font-bold text-sm text-[#575757]">México / Monterrey</p>
                              </div>
                           </div>

                           <h3 class="font-roboto uppercase font-extrabold text-base lg:text-lg xl:text-xl">remate en vivo
                           </h3>
                           <div class="py-2 lg:py-3 xl:py-4 flex items-center">
                              <img src="../public/calendar-icon.png" alt="date" class="mr-2 h-3 w-3">
                              <p class="font-roboto capital font-bold text-sm text-[#575757] uppercase">Sabado 11/11 18:00
                                 HS</p>
                           </div>

                           <h3 class="font-roboto uppercase font-extrabold text-base lg:text-lg xl:text-xl">Preofertas</h3>
                           <div class="py-2 lg:py-3 xl:py-4">
                              <div class="flex items-center">
                                 <img src="../public/green-calendar-icon.png" alt="start-date" class="mr-2 h-3 w-3">
                                 <p class="font-roboto capital font-bold text-sm uppercase">Inicio: Lunes 11/11 10:00 HS
                                 </p>
                              </div>
                              <div class="flex items-center">
                                 <img src="../public/cancel-icon.png" alt="end-date" class="mr-2 h-3 w-3">
                                 <p class="font-roboto capital font-bold text-sm uppercase">Fin: Viernes 17/11 18:00 HS</p>
                              </div>
                           </div>
                        </div>

                        <ReusableButton buttonText="participar en remate"
                           buttonClass="w-full bg-[#BDBDBD] text-white border-0 uppercase extrabold text-base lg:text-xl"
                           containerClass="w-full" :onClick="someFunction" />
                     </div>
                  </div>
               </div>

               <!-- Card 2 -->
               <div
                  class="bg-white flex flex-col lg:items-start lg:justify-center lg:flex-row shadow-lg rounded-xl border-2 border-custom-gold">
                  <!-- Image part -->
                  <div class="w-full lg:w-1/2 h-full flex items-center justify-center">
                     <img src="../public/white-horse-2.png" alt="Image 2" class="w-full h-full object-cover rounded-xl">
                  </div>

                  <!-- Content part -->
                  <div class="w-full lg:w-1/2 flex items-center justify-start px-12 py-4 h-full">
                     <div class="flex flex-col w-full h-full justify-between">
                        <div class="xl:mt-6">
                           <!-- Placeholder content, replace with your content -->
                           <h2 class="font-roboto uppercase font-extrabold text-base lg:text-lg xl:text-xl">remate</h2>
                           <p class="font-roboto capital font-bold text-sm lg:text-base xl:text-lg">La Silla 2da Semana</p>

                           <div class="py-2 lg:py-3 xl:py-4">
                              <div class="flex items-center">
                                 <img src="../public/message-icon.png" alt="lot" class="mr-2 h-3 w-3">
                                 <p class="font-roboto capital font-bold text-sm text-[#575757] uppercase">0 lotes</p>
                              </div>
                              <div class="flex items-center">
                                 <img src="../public/location-icon.png" alt="location" class="mr-2 h-3 w-3">
                                 <p class="font-roboto capital font-bold text-sm text-[#575757]">México / Monterrey</p>
                              </div>
                           </div>

                           <h3 class="font-roboto uppercase font-extrabold text-base lg:text-lg xl:text-xl">remate en vivo
                           </h3>
                           <div class="py-2 lg:py-3 xl:py-4 flex items-center">
                              <img src="../public/calendar-icon.png" alt="date" class="mr-2 h-3 w-3">
                              <p class="font-roboto capital font-bold text-sm text-[#575757] uppercase">Sabado 11/11 18:00
                                 HS</p>
                           </div>

                           <h3 class="font-roboto uppercase font-extrabold text-base lg:text-lg xl:text-xl">Preofertas</h3>
                           <div class="py-2 lg:py-3 xl:py-4">
                              <div class="flex items-center">
                                 <img src="../public/green-calendar-icon.png" alt="start-date" class="mr-2 h-3 w-3">
                                 <p class="font-roboto capital font-bold text-sm uppercase">Inicio: Lunes 11/11 10:00 HS
                                 </p>
                              </div>
                              <div class="flex items-center">
                                 <img src="../public/cancel-icon.png" alt="end-date" class="mr-2 h-3 w-3">
                                 <p class="font-roboto capital font-bold text-sm uppercase">Fin: Viernes 17/11 18:00 HS</p>
                              </div>
                           </div>
                        </div>

                        <ReusableButton buttonText="participar en remate"
                           buttonClass="w-full bg-[#BDBDBD] text-white border-0 uppercase extrabold text-base lg:text-xl"
                           containerClass="w-full" :onClick="someFunction" />
                     </div>
                  </div>
               </div>
            </div>
         </div>



         <!-- Contact -->
         <SectionTitle ref="contactSection" :titleText="$t('home.contact.title')"
            containerClass="flex flex-col items-center lg:items-start w-full md:mt-16 lg:mt-20 mt-8 md:mb-8"
            titleClass="text-white text-4xl md:text-7xl lg:text-8xl font-bold uppercase opacity-20" />

         <div class=" w-full my-2 md:my-6 grid grid-1 lg:grid-cols-2 gap-4">
            <!-- Content on the left -->
            <div class="flex flex-col items-center justify-start space-y-4 w-full">
               <ContentTile :title="$t('home.contact.subTitle')" :paragraph="$t('home.contact.paragraph')"
                  :buttonLabel="null" headingLevel="2" :classOverrides="{
                     container: 'w-full sm:w-full md:w-2/3 lg:w-full ',
                     title: 'text-white text-xl md:text-2xl lg:text-3xl uppercase font-roboto my-2 md:my-3 lg:my-4 text-center md:text-left',
                     paragraph: 'text-white mb-3 md:mb-4 lg:mb-5 text-sm md:text-base lg:text-lg text-center md:text-left',
                  }" />
            </div>

            <!-- Content on the right including the image -->
            <div class="flex flex-col items-center justify-center space-y-4">
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
                  <ReusableButton type="submit"
                     containerClass="w-full flex flex-col items-center md:w-auto md:items-start text-white"
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
   layout: 'default',
   mounted() {
      // set the background image for this page
      // this.$store.commit('setBgImage', 'home-bg.jpg');
      // set the textColor on Topbar component
      // this.$store.commit('setTextColorTopBar', 'text-black');
   },
   components: {
      ContentTile,
      SectionTitle,
      ReusableButton
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
   },
   computed: {
      gridCols() {
         // Get the square root of the number of cards to determine grid columns
         return Math.ceil(Math.sqrt(this.newsData.length));
      },
      currentLang() {
         return this.$i18n.locale;  // This assumes you're using the vue-i18n package
      },
      scrollIntoContactClicked() {
         return this.$store.state.scrollIntoContact;
      }
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
      },
      handleShowBids() {
         this.$refs.bidSection.$el.scrollIntoView({
            behavior: 'smooth'
         });
      }
   },
   watch: {
      scrollIntoContactClicked(newVal) {
         if (newVal) {
            this.$refs.contactSection.$el.scrollIntoView({
               behavior: 'smooth'
            });
            this.$store.commit('setScrollIntoContact', false);
         }
      }
   }
}
</script>

<style scoped>
/* You can add additional styles here if needed */
</style>
