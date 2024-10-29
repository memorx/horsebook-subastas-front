<template>
   <div>
      <div class="bg-banner-container">
         <div class="bg-banner">
            <!-- <img src="../public/Banner-promo-Subasta 2024.jpg" alt="logo" class="w-100"> -->
            <!--
            <p class="text-gold-100 text-3xl md:text-6xl md:text-7xl font-bold uppercase">
               {{ $t('home.auction.auction') }}
            </p>
            <p class="text-gold-100 text-xl md:text-4xl md:text-5xl font-bold uppercase">
               STUDBOOK LA SILLA
            </p>
            <p class="text-gold-100 text-2xl md:text-5xl md:text-6xl font-bold uppercase">
               NOV. 2024
            </p>
            <div class="flex items-center">
               <img src="../public/image_la_silla.png" alt="logo" class="w-20 h-20 md:w-36 md:h-36 md:w-48 md:h-48">
               <p class="text-red-600 text-3xl md:text-6xl md:text-7xl font-medium uppercase text-center ml-8"
                  style="white-space: pre-line">{{ $t('home.youngHorses') }}</p>
            </div> -->
         </div>
      </div>
      <div class="h-auto flex justify-center w-full">
         <div class="w-full flex flex-col items-center bg-transparent">
            <!-- Main section web -->
            <div
               class="px-1 md:px-[10%] items-center justify-center md:grid  h-auto md:h-screen w-full my-12 md:my-6 grid-1 md:grid-cols-2 gap-4">
               <!-- Content -->
               <div class="order-2 md:order-1 flex flex-col items-center justify-center space-y-4 w-full md:w-auto">
                  <ContentTile :title="$t('home.main.title')" :paragraph="$t('home.main.paragraph')"
                     :paragraph2="$t('home.main.paragraph2')"
                     :buttonLabel="$t('home.main.button') ? $t('home.main.button') : null"
                     @button-clicked="handleShowBids" headingLevel="1" :classOverrides="{
               container: 'flex flex-col items-center md:items-start w-full md:w-auto',
               title: 'text-center md:text-start text-white text-xl md:text-2xl md:text-3xl uppercase font-roboto my-2 md:my-3 md:my-4',
               paragraph: 'text-white mb-3 text-lg md:mb-4 md:mb-5 md:text-base md:text-lg text-center md:text-left',
               button: 'bg-custom-gold text-lg md:text-base md:text-lg uppercase text-center md:text-left mt-4 md:mt-0'
            }" />
               </div>

               <!-- Image -->
               <button v-if="nextAuction" @click="goToAuctionDetail(nextAuction)" exact
                  class="w-full w-max-45 mx-auto order-1 md:order-2 flex flex-col items-center justify-center space-y-4 overflow-x-hidden"
                  :class="(nextAuction?.status == 'BIDDING') ? 'animate-blink' : ''">

                  <ContentTile :title="nextAuction?.notes ? nextAuction?.notes : ''"
                     :paragraph="(nextAuction?.status == 'BIDDING') ? $t('home.auction.liveAuction') : $t('home.auction.auctionStartIn')"
                     :buttonLabel="null" headingLevel="2" :classOverrides="{
               container: 'flex flex-col items-center w-full',
               title: 'text-custom-gold font-normal text-xl md:text-2xl md:text-2xl uppercase font-roboto',
               paragraph: 'uppercase text-white text-base md:text-sm md:text-base',
            }" />
                  <div v-if="nextAuction?.status == 'BIDDING'" class="text-white live-bg object-cover flex flex-col justify-end h-full">
                     <div class="text-center text-black font-bold pb-5 pl-0 pr-12 text-xl uppercase">
                        {{ $t('home.auction.goToLiveAuction') }}
                     </div>
                  </div>
                  <div v-else class="cron-bg object-cover flex flex-col justify-end h-full text-white">
                    <div class="grid grid-cols-3 gap-0 text-2xl mb-6">
                      <div class="text-center font-bold">{{ bidTime.days }}</div>
                      <div class="text-center font-bold">{{ bidTime.hours }}</div>
                      <div class="text-center font-bold">{{ bidTime.minutes }}</div>
                    </div>

                    <div class="grid grid-cols-3 gap-0 mb-4 uppercase font-semibold">
                      <div class="text-center text-sm pl-4">{{ $t('cron.days') }}</div>
                      <div class="text-center text-sm pr-1">{{ $t('cron.hours') }}</div>
                      <div class="text-center text-sm pr-3">{{ $t('cron.minutes') }}</div>
                    </div>
                  </div>
               </button>
            </div>



            <!-- Bid -->

            <SectionTitle :titleText="$t('home.auction.title')" ref="bidSection"
               containerClass="md:px-[5%] flex flex-col items-center md:items-start w-full md:mt-16 md:mt-20 mt-8 md:mb-8"
               titleClass="text-white text-4xl md:text-7xl md:text-8xl font-bold uppercase opacity-20" />

            <!-- Cards Container -->
            <div class="flex justify-center w-full h-auto mt-8 bg-black px-4 md:px-0">
               <div class="flex flex-col h-full w-full max-w-[2000px]">
                  <div v-for="(auction, index) in auctions" :key="auction.id"
                     :class="[
                        'flex flex-col md:items-start md:justify-center shadow-lg bg-transparent mb-16 h-[750px] md:h-[650px]',
                        index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                     ]"
                  >
                     <div class="w-full md:w-1/2 md:h-[550px] h-full flex items-center justify-center relative">
                        <div :class="[
                           'absolute h-full w-full md:w-[70%] textured-gradient',
                           index % 2 === 0 ? 'left-0' : 'right-0'
                        ]"></div>
                        <div
                           v-if="auction.image"
                           :class="[
                              'h-[250px] px-5 md:px-0 md:w-[80%] md:h-[80%] absolute rounded-3xl z-10',
                              index % 2 === 0 ? 'md:translate-x-24' : 'md:-translate-x-24'
                           ]"
                        >
                           <img
                              :src="auction.image"
                              alt="foto_portada"
                              class="w-full h-full object-cover rounded-3xl shadow-xl"
                              loading="lazy"
                           />
                        </div>
                        <div
                           v-else
                           :class="[
                              'h-[250px] w-[350px] px-5 md:px-0 md:w-[80%] md:h-[80%] rounded-3xl flex justify-center items-center md:rounded-3xl absolute z-10 bg-slate-200',
                              index % 2 === 0 ? 'md:translate-x-24' : 'md:-translate-x-24'
                           ]"
                        >
                           <img
                              class="m-auto opacity-70"
                              src="../public/image_la_silla.png"
                              alt="Default Horse"
                           />
                        </div>
                     </div>

                     <div :class="[
                        'w-full md:w-1/2 flex items-center justify-start px-2 md:px-12 py-4 h-[550px]',
                        index % 2 === 0 ? 'md:pl-20 md:pr-28' : 'md:pl-48'
                     ]">
                        <div class="flex flex-col w-full h-full justify-center text-white space-y-6">
                           <div class="space-y-6">
                              <h2 class="font-roboto uppercase font-extrabold text-base md:text-lg xl:text-xl flex flex-row gap-10">
                                 {{ $t('home.auction.auction') }}
                                 <statusBid :status="auction.status" />
                              </h2>

                              <p class="font-roboto capital font-bold text-sm md:text-base xl:text-lg">
                                 {{ auction.notes }}
                              </p>

                              <div class="py-2 md:py-3 xl:py-4">
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

                              <div class="space-y-2">
                                 <h3 class="font-roboto uppercase font-extrabold text-base md:text-lg xl:text-xl">
                                    {{ $t('home.auction.liveAuction') }}
                                 </h3>
                                 <div class="flex items-center">
                                    <img src="../public/calendar-icon.png" alt="date" class="mr-2 h-3 w-3">
                                    <p class="font-roboto capital font-bold text-sm text-[#575757] uppercase">
                                       {{ formatDate(auction.start_bid) }}
                                    </p>
                                 </div>
                              </div>

                              <div class="space-y-2">
                                 <h3 class="font-roboto uppercase font-extrabold text-base md:text-lg xl:text-xl">
                                    {{ $t('home.auction.prebids') }}
                                 </h3>
                                 <div class="space-y-1">
                                    <div class="flex items-center">
                                       <img src="../public/green-calendar-icon.png" alt="start-date" class="mr-2 h-3 w-3">
                                       <p class="font-roboto capital font-bold text-sm uppercase">
                                          {{ $t('dates.start') }}: {{ formatDate(auction.start_pre_bid) }}
                                       </p>
                                    </div>
                                    <div class="flex items-center">
                                       <img src="../public/cancel-icon.png" alt="end-date" class="mr-2 h-3 w-3">
                                       <p class="font-roboto capital font-bold text-sm uppercase">
                                          {{ $t('dates.end') }}: {{ formatDate(auction.end_pre_bid) }}
                                       </p>
                                    </div>
                                 </div>
                              </div>
                           </div>

                           <button
                              class="bg-black py-3 px-5 text-white rounded-3xl uppercase font-bold metalic-button mt-6 w-[70%]"
                              type="button"
                              @click="goToAuctionDetail(auction)"
                           >
                              {{ $t('home.auction.participateInTheAuction') }}
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>



            <!-- Contact -->
            <div class="px-1 md:px-[5%]">
               <a id="contactSection" class="w-full text-right">
                  <SectionTitle ref="contactSection" :titleText="$t('home.contact.title')"
                     containerClass="flex flex-col items-center md:items-start w-full md:mt-16 md:mt-20 mt-8 md:mb-8"
                     titleClass="text-white text-4xl md:text-7xl md:text-8xl font-bold uppercase opacity-20" />
               </a>

               <div class="w-full my-2 md:my-6 grid grid-1 md:grid-cols-2 gap-4">
                  <!-- Content on the left -->
                  <div class="flex flex-col items-center justify-start space-y-4 w-full">
                     <ContentTile :title="$t('home.contact.subTitle')" :paragraph="$t('home.contact.paragraph')"
                        :buttonLabel="null" headingLevel="2" :classOverrides="{
                  container: 'w-full sm:w-full md:w-2/3 md:w-full ',
                  title: 'text-white text-xl md:text-2xl md:text-3xl uppercase font-roboto my-2 md:my-3 md:my-4 text-center md:text-left',
                  paragraph: 'text-white mb-3 md:mb-4 md:mb-5 text-sm md:text-base md:text-lg text-center md:text-left',
               }" />
                  </div>

                  <div class="flex flex-col items-center justify-center space-y-4">
                     <!-- Form starts here -->
                     <form id="contactForm" class="w-full md:w-2/3 p-4" @submit.prevent="sendContactInfo">
                        <!-- Name input -->
                        <label for="name"
                           class="block text-white mb-1 font-roboto text-sm md:text-base md:text-lg font-normal capitalize">{{
                  $t('home.contact.form.name') }}</label>
                        <input v-model="contactInfo.name" type="text" id="name" name="name" required autocomplete="name"
                           class="w-full p-2 mb-2 rounded bg-[#15151A] text-white font-roboto border-[#15151A]">

                        <!-- Phone input -->
                        <label for="phone"
                           class="block text-white mb-1 font-roboto text-sm md:text-base md:text-lg font-normal capitalize">{{
                  $t('home.contact.form.phone') }}</label>
                        <input v-model="contactInfo.phone" type="tel" id="phone" name="phone" required autocomplete="tel"
                           class="w-full p-2 mb-2 rounded bg-[#15151A] text-white font-roboto border-[#15151A]">

                        <!-- Email input -->
                        <label for="email"
                           class="block text-white mb-1 font-roboto text-sm md:text-base md:text-lg font-normal capitalize">{{
                  $t('home.contact.form.email') }}</label>
                        <input v-model="contactInfo.email" type="email" id="email" name="email" required
                           autocomplete="email"
                           class="w-full p-2 mb-2 rounded bg-[#15151A] text-white font-roboto border-[#15151A]">

                        <!-- Message input -->
                        <label for="message"
                           class="block text-white mb-1 font-roboto text-sm md:text-base md:text-lg font-normal capitalize">{{
                  $t('home.contact.form.message') }}</label>
                        <textarea v-model="contactInfo.message" id="message" name="message" required rows="4" cols="50"
                           maxlength="500"
                           class="w-full p-2 mb-4 rounded bg-[#15151A] text-white font-roboto border-[#15151A]"></textarea>

                        <!-- Submit button -->
                        <ReusableButton type="submit"
                           containerClass="w-full flex flex-col items-center md:w-auto md:items-start text-white"
                           buttonClass="uppercase text-sm md:text-base md:text-l "
                           :buttonText="$t('home.contact.button')" />
                     </form>
                  </div>
               </div>
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
import { detectIncognito } from "detectincognitojs";

export default {
   layout: 'default',
   mounted() {
      this.init()
      this.$root.$on('update-auctions', this.updateAuction)

      detectIncognito().then((result) => {
         if (result.isPrivate)
            this.$toast.error(this.$t('general.privateModeNotice'))
      });
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
         auctions: [],
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
      currentLang() {
         return this.$i18n.locale;
      },
      scrollIntoContactClicked() {
         return this.$store.state.scrollIntoContact;
      }
   },
   methods: {
      async init() {
         await this.getAuctions()
      },
      async getAuctions() {
         const listSubastasEndpoint = "/subastas/list-subastas/"
         const url = `${this.$config.baseURL}${listSubastasEndpoint}?only_subasta_data=true`

         this.loading = true
         await this.$axios
            .get(url)
            .then((response) => {
               const auctions = response.data.results;

               const sortOrder = ['BIDDING', 'CLOSED PREBID', 'PREBID', 'COMING', 'CLOSED'];
               this.auctions = auctions.sort((a, b) => {
                  const statusComparison = sortOrder.indexOf(a.status) - sortOrder.indexOf(b.status);

                  if (statusComparison !== 0) {
                     return statusComparison;
                  }

                  return new Date(a.start_bid) - new Date(b.start_bid);
               });

               this.nextAuction = this.auctions.find(auction => auction.status === 'BIDDING') || this.auctions[0];

               if (this.nextAuction) {
                  this.timer = setInterval(this.calculateCountdown, 1000)
               }

               this.loading = false
            })
            .catch((error) => {
               this.loading = false
               console.error('Error al obtener subastas:', error);
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
         this.auctions = []
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
.cron-bg {
   background-image: url('../public/conter-home.png');
   background-size: 330px 305px;
   background-repeat: no-repeat;
   height: 305px;
   width: 330px;
}
.live-bg {
   background-image: url('../public/horse-auction-live.png');
   background-size: 330px 285px;
   background-repeat: no-repeat;
   height: 285px;
   width: 330px;
}

.bg {
   background-image:
   linear-gradient(to bottom,
         rgba(0, 0, 0, 1) 0px,
         rgba(0, 0, 0, 0) 150px,
         rgba(0, 0, 0, 0) calc(100% - 150px),
         rgba(0, 0, 0, 1) 100%),
      url('../public/landing-background.jpeg');
   background-size: 180%;
   background-position: center top;
   background-repeat: no-repeat;
   position: relative
}

@media only screen and (max-width: 1024px) {
   .bg {
      background-image:
         linear-gradient(to bottom,
         rgba(0, 0, 0, 1) 0px,
         rgba(0, 0, 0, 0) 150px,
         rgba(0, 0, 0, 0) calc(100% - 150px),
         rgba(0, 0, 0, 1) 100%),
         url('../public/landing-bg.png');
      background-position: center top;
      background-size: 100%;
      position: relative
   }
}

.bg-banner-container {
  width: 100%;
  height: 0;
  padding-top: 56.25%;
  position: relative;
  overflow: hidden;
}

.bg-banner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    linear-gradient(to right,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 0) 5%,
      rgba(0, 0, 0, 0) 95%,
      rgba(0, 0, 0, 1) 100%),
    linear-gradient(to bottom,
      rgba(0, 0, 0, 1) 0px,
      rgba(0, 0, 0, 0) 80px,
      rgba(0, 0, 0, 0) calc(100% - 80px),
      rgba(0, 0, 0, 1) 100%),
    url('../public/Banner-promo-Subasta 2024.jpg');
  background-size: contain;
  background-position: center top;
  background-repeat: no-repeat;
  background-color: black;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

@keyframes subtle-blink {
  0%, 50%, 100% { opacity: 1; }
  25%, 75% { opacity: 0.5; }
}

.animate-blink {
  animation: subtle-blink 4s ease-in-out infinite;
}

/* BANNER STYLES */
.bg2 {
   background-image: url('../public/CenizaA04I1180.jpg');
   background-size: 70%;
   background-position: 100% 0%;
   background-repeat: no-repeat;
   position: relative;
   overflow: hidden;
   position: relative;
   z-index: 1;
}

.bg2>* {
   position: relative;
   z-index: 2;
}

.bg2::before {
   content: '';
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background: linear-gradient(100deg, black 33%, transparent 40%);
   pointer-events: none;
}

.bg2::after {
   content: '';
   position: absolute;
   bottom: 0;
   left: 0;
   width: 100%;
   height: 10%;
   background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 1));
   pointer-events: none;
}

.textured-gradient {
  background-image:
    url('@/public/bg-gray-textured.png'),
    linear-gradient(to bottom, #505050, #0f0f0f);
  background-blend-mode: overlay;
  background-size: cover;
  background-position: center;
}


</style>
