<template>
   <div class="h-auto flex justify-center md:px-4 bg">
      <div class="w-11/12 flex flex-col items-center sm:space-x-4 bg-transparent">

         <!-- Main section web -->
         <div class="items-center justify-center md:grid  h-auto md:h-1/2 lg:h-screen w-full my-12 md:my-6 grid-1 md:grid-cols-2 gap-4">
            <!-- Content -->
            <div class="order-2 md:order-1 flex flex-col items-center justify-center space-y-4 w-full md:w-auto">
               <ContentTile :title="$t('home.main.title')" :paragraph="$t('home.main.paragraph')"
                  :buttonLabel="$t('home.main.button') ? $t('home.main.button') : null" @button-clicked="handleShowBids"
                  headingLevel="1" :classOverrides="{
                     container: 'flex flex-col items-center md:items-start w-full md:w-auto',
                     title: 'text-center md:text-start text-white text-xl md:text-2xl lg:text-3xl uppercase font-roboto my-2 md:my-3 lg:my-4',
                     paragraph: 'text-white mb-3 text-lg md:mb-4 lg:mb-5 md:text-base lg:text-lg text-center md:text-left',
                     button: 'bg-custom-gold text-lg md:text-base lg:text-lg uppercase text-center md:text-left mt-4 md:mt-0'
                  }" />
            </div>

            <!-- Image -->
            <button v-if="nextAuction" @click="goToAuctionDetail(nextAuction)" exact class="w-full w-max-45 mx-auto order-1 md:order-2 flex flex-col items-center justify-center space-y-4 overflow-x-hidden" :class="(nextAuction?.status == 'BIDDING') ? 'animate-blink' : ''">

                  <ContentTile :title="nextAuction?.notes ? nextAuction?.notes : ''"
                     :paragraph="(nextAuction?.status == 'BIDDING') ? $t('home.auction.liveAuction') : $t('home.auction.auctionStartIn')" :buttonLabel="null" headingLevel="2"
                     :classOverrides="{
                        container: 'flex flex-col items-center w-full',
                        title: 'text-custom-gold font-normal text-xl md:text-2xl lg:text-2xl uppercase font-roboto',
                        paragraph: 'uppercase text-white text-base md:text-sm lg:text-base',
                     }" />

                     <div class="grid grid-rows-5 grid-cols-1 gap-2 text-white cron-bg object-cover">

                        <div class="row-span-3"></div>

                        <div class="row-span-1 grid grid-cols-3 gap-0 pt-6 text-2xl">
                           <div class="text-center pl-5">{{ bidTime.days }}</div>
                           <div class="text-center">{{ bidTime.hours }}</div>
                           <div class="text-center pr-8">{{ bidTime.minutes }}</div>
                        </div>

                        <div class="row-span-1 grid grid-cols-3 gap-0 pt-5">
                           <div class="text-center pl-5">{{ $t('cron.days')}}</div>
                           <div class="text-center">{{ $t('cron.hours')}}</div>
                           <div class="text- pr-5">{{ $t('cron.minutes')}}</div>
                        </div>
                     </div>

            </button>
         </div>



         <!-- Bid -->
         <SectionTitle :titleText="$t('home.auction.title')" ref="bidSection"
            containerClass="flex flex-col items-center lg:items-start w-full md:mt-16 lg:mt-20 mt-8 md:mb-8"
            titleClass="text-white text-4xl md:text-7xl lg:text-8xl font-bold uppercase opacity-20" />

         <!-- Cards Container -->
         <div class="flex justify-center w-full h-auto mt-8">
            <div class="grid grid-cols-1 grid-rows-2 gap-12 w-11/12 h-full">
               <!-- Card 1 -->
               <div v-for="auction in otherAuctions"
                  class="bg-white flex flex-col lg:items-start lg:justify-center lg:flex-row shadow-lg rounded-xl border-2 border-custom-gold">
                  <!-- Image part -->
                  <div class="w-full lg:w-1/2 h-full flex items-center justify-center">
                     <img
                        v-if="auction.image"
                        :src="auction.image"
                        alt="foto_portada"
                        class="w-full h-full object-cover rounded-xl"
                        style="height: 400px"
                        loading="lazy"
                        />
                     <div
                     class="w-full md:w-1/2 h-[400px] flex justify-center items-center md:rounded-l-lg"
                     v-else
                        >
                        <img
                           class="m-auto opacity-70"
                           src="../public/image_la_silla.png"
                           alt="Default Horse"
                        />
                     </div>

                  </div>

                  <!-- Content part -->
                  <div class="w-full lg:w-1/2 flex items-center justify-start px-12 py-4 h-full">
                     <div class="flex flex-col w-full h-full justify-between">
                        <div class="xl:mt-6">
                           <!-- Placeholder content, replace with your content -->
                           <h2 class="font-roboto uppercase font-extrabold text-base lg:text-lg xl:text-xl flex flex-row gap-10">
                              {{ $t('home.auction.auction') }}
                              <statusBid :status="auction.status" />
                           </h2>
                           <p class="font-roboto capital font-bold text-sm lg:text-base xl:text-lg pt-2">
                              {{ auction.notes }}
                           </p>

                           <div class="py-2 lg:py-3 xl:py-4">
                              <div class="flex items-center">
                                 <img src="../public/message-icon.png" alt="lot" class="mr-2 h-3 w-3">
                                 <p class="font-roboto capital font-bold text-sm text-[#575757] uppercase">
                                    {{ auction.horses?.length }}
                                    {{ $t('home.auction.lots') }}
                                 </p>
                              </div>
                              <div class="flex items-center">
                                 <img src="../public/location-icon.png" alt="location" class="mr-2 h-3 w-3">
                                 <p class="font-roboto capital font-bold text-sm text-[#575757]">México / Monterrey</p>
                              </div>
                           </div>

                           <h3 class="font-roboto uppercase font-extrabold text-base lg:text-lg xl:text-xl">
                              {{ $t('home.auction.liveAuction') }}
                           </h3>
                           <div class="py-2 lg:py-3 xl:py-4 flex items-center">
                              <img src="../public/calendar-icon.png" alt="date" class="mr-2 h-3 w-3">
                              <p class="font-roboto capital font-bold text-sm text-[#575757] uppercase">
                                 {{ formatDate(auction.start_bid) }}
                              </p>
                           </div>

                           <h3 class="font-roboto uppercase font-extrabold text-base lg:text-lg xl:text-xl">
                              {{ $t('home.auction.prebids') }}
                           </h3>
                           <div class="py-2 lg:py-3 xl:py-4">
                              <div class="flex items-center">
                                 <img src="../public/green-calendar-icon.png" alt="start-date" class="mr-2 h-3 w-3">
                                 <p class="font-roboto capital font-bold text-sm uppercase">
                                    {{ $t('dates.start') }}:
                                    {{ formatDate(auction.start_pre_bid) }}
                                 </p>
                              </div>
                              <div class="flex items-center">
                                 <img src="../public/cancel-icon.png" alt="end-date" class="mr-2 h-3 w-3">
                                 <p class="font-roboto capital font-bold text-sm uppercase">
                                    {{ $t('dates.end') }}:
                                    {{ formatDate(auction.end_pre_bid) }}
                                 </p>
                              </div>
                           </div>
                        </div>
                        <button class="bg-black py-3 px-5 text-white rounded-lg uppercase font-bold" type="button"
                           @click="goToAuctionDetail(auction)">
                           {{ $t('home.auction.participateInTheAuction') }}
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>



         <!-- Contact -->
         <a id="contactSection" class="w-full text-right">
            <SectionTitle ref="contactSection" :titleText="$t('home.contact.title')"
               containerClass="flex flex-col items-center lg:items-start w-full md:mt-16 lg:mt-20 mt-8 md:mb-8"
               titleClass="text-white text-4xl md:text-7xl lg:text-8xl font-bold uppercase opacity-20" />
         </a>

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
               <form id="contactForm" class="w-full md:w-2/3 p-4" @submit.prevent="sendContactInfo">
                  <!-- Name input -->
                  <label for="name"
                     class="block text-white mb-1 font-roboto text-sm md:text-base lg:text-lg font-normal capitalize">{{
                        $t('home.contact.form.name') }}</label>
                  <input v-model="contactInfo.name" type="text" id="name" name="name" required autocomplete="name"
                     class="w-full p-2 mb-2 rounded bg-[#15151A] text-white font-roboto border-[#15151A]">

                  <!-- Phone input -->
                  <label for="phone"
                     class="block text-white mb-1 font-roboto text-sm md:text-base lg:text-lg font-normal capitalize">{{
                        $t('home.contact.form.phone') }}</label>
                  <input v-model="contactInfo.phone" type="tel" id="phone" name="phone" required autocomplete="tel"
                     class="w-full p-2 mb-2 rounded bg-[#15151A] text-white font-roboto border-[#15151A]">

                  <!-- Email input -->
                  <label for="email"
                     class="block text-white mb-1 font-roboto text-sm md:text-base lg:text-lg font-normal capitalize">{{
                        $t('home.contact.form.email') }}</label>
                  <input v-model="contactInfo.email" type="email" id="email" name="email" required autocomplete="email"
                     class="w-full p-2 mb-2 rounded bg-[#15151A] text-white font-roboto border-[#15151A]">

                  <!-- Message input -->
                  <label for="message"
                     class="block text-white mb-1 font-roboto text-sm md:text-base lg:text-lg font-normal capitalize">{{
                        $t('home.contact.form.message') }}</label>
                  <textarea v-model="contactInfo.message"  id="message" name="message" required rows="4" cols="50" maxlength="500"
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
import statusBid from "~/components/bid/statusBid.vue";

export default {
   layout: 'default',
   mounted() {
      this.init()
      this.$root.$on('update-auctions', this.updateAuction)
      // set the background image for this page
      // this.$store.commit('setBgImage', 'home-bg.jpg');
      // set the textColor on Topbar component
      // this.$store.commit('setTextColorTopBar', 'text-black');
   },
   components: {
      ContentTile,
      SectionTitle,
      ReusableButton,
      statusBid
   },
   data() {
      return {
         nextAuction: null,
         otherAuctions: [],
         bidTime: {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
         },
         contactInfo: {
            name: '',
            phone: '',
            email: '',
            message: '',
         },
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
      async init() {
         await this.getNextAuction()

      },
      async getNextAuction() {
         const listSubastasEndpoint = "/subastas/list-subastas/"
         const url = `${this.$config.baseURL}${listSubastasEndpoint}?only_subasta_data=true`
         //I want to stop to make a hardcode and do it using logic

         this.loading = true
         await this.$axios
         .get(url)
         .then((response) => {
            response.data.results.map((auction) => {

               if (auction.status != "CLOSED") {
                  if (
                     ["PREBID", "COMING", "CLOSED PREBID", "BIDDING"].includes(
                        auction.status
                     )
                  ) {
                     if(!(this.nextAuction?.status === 'BIDDING' && auction.status !== 'BIDDING')){
                        this.nextAuction = auction
                     }

                     this.otherAuctions.push(auction)
                     //console.log('next auction', this.nextAuction)
                  }
               }
               if(this.nextAuction) {
                  this.timer = setInterval(this.calculateCountdown, 1000)
               }

            })

            //console.log('otherAuctions', this.otherAuctions)

            this.loading = false
         })
         .catch((error) => {
            this.loading = false
         })
      },
      calculateCountdown() {
         if (!this.nextAuction?.start_bid) return;

         const targetDate = new Date(this.nextAuction.start_bid)
         const now = new Date()

         const utcOffset = targetDate.getTimezoneOffset()
         const targetUTC = new Date(targetDate.getTime() + (utcOffset * 60 * 1000))

         const utcOffsetNow = now.getTimezoneOffset()
         const nowUTC = new Date(now.getTime() + (utcOffsetNow * 60 * 1000))

         const timeDifference = targetUTC - nowUTC

         if (timeDifference <= 0) {
            this.countdownSubasta = false;
            clearInterval(this.timer);
         } else {
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            this.bidTime.days = days;
            this.bidTime.hours = hours;
            this.bidTime.minutes = minutes;
            this.bidTime.seconds = seconds;
         }
      },

      formatDate(dateString) {
         const daysOfWeek = [
         this.$t('dates.daysOfTheWeek.sunday'),
         this.$t('dates.daysOfTheWeek.monday'),
         this.$t('dates.daysOfTheWeek.tuesday'),
         this.$t('dates.daysOfTheWeek.wednesday'),
         this.$t('dates.daysOfTheWeek.thursday'),
         this.$t('dates.daysOfTheWeek.friday'),
         this.$t('dates.daysOfTheWeek.saturday')
      ];

      const date = new Date(dateString);
      const dayOfWeek = daysOfWeek[date.getDay()];

      const options = { month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false };
      const formattedDate = date.toLocaleString('es-ES', options);

      const [datePart, timePart] = formattedDate.split(', ');
      const [month, day] = datePart.split('/');

      return `${dayOfWeek} ${day}/${month} ${timePart} HS`;
      },

      goToAuctionDetail(auction) {
         console.log('si se hace', auction)
         const basePath = auction.status === 'BIDDING' ? '/auction/live' : '/user/detalles';
         const path = `${basePath}/${auction.id}`;
         this.$router.push({ path: this.localePath(path) });

      },

      async sendContactInfo() {
         this.loading = true
         const url = this.$config.baseURL + "/contact/send_email/";

         const body = {
            "name": this.contactInfo.name,
            "phone": this.contactInfo.phone,
            "email": this.contactInfo.email,
            "message": this.contactInfo.message,
         }
         await this.$axios.$post(url, body)
         .then((response) => {
            // console.log(response);
            this.$toast.success(this.$t('home.contact.messageHasBeenSent'));
            this.contactInfo.name = ''
            this.contactInfo.phone = ''
            this.contactInfo.email = ''
            this.contactInfo.message = ''
            this.loading = false
         })
         .catch((error) => {
            this.loading = false
            this.$toast.error(this.$t('general.errorMsg'));
            console.error(error.response.data);
         });
      },

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
      },
      scrollToContactSection() {
         this.$refs.contactSection.$el.scrollIntoView({
            behavior: 'smooth'
         });
      },

      updateAuction(auctionUpdated) {

         this.nextAuction = null
         this.otherAuctions = []
         setTimeout(() => {
            this.init()
         }, 1000)
      }
   },
   watch: {
      '$store.state.scrollIntoContact'(newValue) {
         if (newValue) {
            this.scrollToContactSection();
            this.$store.commit('setScrollIntoContact', false);
         }
      }
   },
}
</script>

<style scoped>
.cron-bg{
   background-image: url('../public/conter-home.png'); /* Reemplaza con la ruta de tu imagen de fondo */
   background-size: 330px 305px;
   background-repeat: no-repeat;
   height: 305px;
   width: 330px;
}

.bg {
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, .4), rgba(0, 0, 0, 1)), url('../public/landing-background.jpeg');
    background-size: 150%;
    background-position: center calc(0% - 10%);
    background-repeat: no-repeat;
}
@media only screen and (max-width: 1024px) {
    .bg {
      background-image: linear-gradient(to bottom, rgba(0, 0, 0, .4), rgba(0, 0, 0, 1)), url('../public/landing-bg.png');
      background-position: center top;
      background-size: 100%;
    }
}

@keyframes blink {
   0%, 50%, 100% {
      opacity: 1;
   }
   25%, 75% {
      opacity: 0;
   }
}
.animate-blink {
  animation: blink 4s infinite;
}
</style>