<template>
    <nav :class="['p-4 lg:from-transparent', textColor, gradientMobileColor]">
        <!-- Web Navigation -->
        <div class="hidden lg:flex container mx-auto justify-between items-center bg-transparent" >
            <!-- Logo or brand -->
            <nuxt-link :to="localePath('/')">
                <img src="../public/image_la_silla.png" alt="logo" style="width: 140px;">
            </nuxt-link>

            <!-- Navigation items -->
            <div class="flex items-center space-x-4">
                <div class="flex justify-right">
                    <a @click="goToCurrenAuction()" v-if="currentAuctionId"
                    :class="['hover:text-red-600 group flex items-center px-2 py-2 font-bold rounded-md gap-2 cursor-pointer']">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                        class="bi bi-people mr-3 flex-shrink-0 h-6 w-6 text-indigo-300" viewBox="0 0 16 16">
                        <circle cx="8" cy="8" r="7.5" stroke="red" :class="{ 'fill-pulse': currentAuctionId != 0 }" stroke-width="1"
                        fill="none" />
                    </svg>
                        {{ $t('topBar.liveAuction') }}
                    </a>
                </div>
                <div>
                    <!--web/ipad Navigation items -->
                    <div class=" hidden md:flex justify-center align-middle items-center ">
                        <div class="flex space-x-3 lg:space-x-4 uppercase text-xs font-roboto">
                            <nuxt-link :class="activePageClass('/')" :to="localePath('/')">{{ $t('topBar.home') }}</nuxt-link>
                            <nuxt-link :class="activePageClass('/user/inicio')" :to="localePath('/user/inicio')"> {{
                                $t('topBar.bids') }}</nuxt-link>
                            <!-- <nuxt-link :class="activePageClass('/us')" to="/us">{{ $t('topBar.us') }}</nuxt-link> -->
                            <!-- <nuxt-link :class="activePageClass('/news')" :to="localePath('/news')">{{ $t('topBar.news') }}</nuxt-link> -->
                            <button class="uppercase text-xs font-roboto" @click="handleScrollIntoContact">
                                {{ $t('topBar.contact') }}
                            </button>
                        </div>

                        <!-- Sign Up / Log in-->
                        <div v-if="!isUserAuthenticated" class="flex flex-row mx-6 gap-6 w-[275px]">
                            <ReusableButton :buttonText="$t('topBar.signUp')"
                                :buttonClass="`text-xs md:text-xs lg:text-xs uppercase lg:px-4 md:px-4 w-full ${textColor}`"
                                containerClass="w-1/2" :onClick="navigateToSignUp" />

                            <ReusableButton :buttonText="$t('topBar.logIn')"
                                buttonClass="text-xs md:text-xs lg:text-xs uppercase lg:px-4 md:px-4 bg-custom-gold w-full"
                                containerClass="w-1/2" :onClick="navigateToLogin" />
                        </div>
                        <div v-else class="flex flex-row mx-6 gap-6 w-[275px]">
                            <ReusableButton :buttonText="$t('topBar.profile')"
                                :buttonClass="`text-xs md:text-xs lg:text-xs uppercase lg:px-4 md:px-4 w-full ${textColor}`"
                                containerClass="w-1/2" :onClick="navigateToProfile" />
                            <ReusableButton :buttonText="$t('topBar.logout')"
                                buttonClass="text-xs md:text-xs lg:text-xs uppercase lg:px-4 md:px-4 bg-custom-gold w-full"
                                containerClass="w-1/2" :onClick="logout" />
                        </div>
                        <div class="relative w-16">
                            <button @click="toggleDropdown" aria-haspopup="listbox" :aria-expanded="isDropdownOpen.toString()" aria-labelledby="listbox-label">
                            <span class="flex items-center">
                                <img :src="currentFlag" :alt="currentLocale" class="mr-2 h-4 w-auto">
                            </span>
                            </button>
                            <div v-if="isDropdownOpen" @click="toggleDropdown" class="absolute top-full left-0 mt-1 w-full bg-white border rounded shadow-lg">
                                <nuxt-link v-if="locale!=currentLocale" v-for="(locale, index) in locales" :key="index" :to="switchLocalePath(locale)" @click="isDropdownOpen=false" class="block px-4 py-2 hover:bg-gray-100 flex items-center space-x-2">
                                    <img :src="getFlag(locale)" :alt="locale" class="mr-2 h-4 w-auto">
                                </nuxt-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Mobile Navigation -->
        <div class="lg:hidden flex container mx-auto justify-between items-center ">

            <!-- Navigation items -->
            <div class="flex items-center justify-between w-full">

                <!-- Logo or brand -->
                <nuxt-link :to="localePath('/')">
                    <img src="../public/image_la_silla.png" alt="logo" style="width: 40px;">
                </nuxt-link>

                <div v-if="!isMobileMenuOpen">
                    <div class="flex justify-right">
                    <a @click="goToCurrenAuction()" v-if="currentAuctionId"
                    :class="['hover:text-red-600 group flex items-center px-2 py-2 font-bold rounded-md gap-2 cursor-pointer']">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                        class="bi bi-people mr-3 flex-shrink-0 h-6 w-6 text-indigo-300" viewBox="0 0 16 16">
                        <circle cx="8" cy="8" r="7.5" stroke="red" :class="{ 'fill-pulse': currentAuctionId != 0 }" stroke-width="1"
                        fill="none" />
                    </svg>
                        {{ $t('topBar.liveAuction') }}
                    </a>
                </div>
                </div>

                <button v-if="!isMobileMenuOpen" @click="toggleMenu">
                    <img src="../public/menu.png" alt="menu" class="h-6 w-9">
                </button>
            </div>
        </div>
        <!--
        <client-only>
            <DraggableHorseList
                v-if="shouldShowDraggableBubbles"
                :bidId="currentAuctionId"
                :horses="auctionHorses"
                :currentHorseId="currentHorseId"
                :apiImg="apiImg"
                @horse-status-changed="updateAuctionData"
            />
        </client-only>
        -->
    </nav>
</template>

<script>
import Cookies from "js-cookie";
import ReusableButton from "~/components/ReusableButton.vue";
// import DraggableHorseList from "~/components/bid/draggableHorseList.vue";
import ReconnectingWebSocket from 'reconnecting-websocket';

export default {
    components: {
        // DraggableHorseList
    },
    props: {
        toggleMenu: {
            type: Function,
            required: true
        },
        isMobileMenuOpen: {
            type: Boolean,
            required: true
        }
    },
    data () {
        return {
            username: "",
            socket: null, // Socket para auction
            isIntentionalReconnectAuction: false,
            moveToHome: false,
            windowWidth: process.client ? window.innerWidth : 0,
            isDropdownOpen: false,
            currentAuctionId: null,
            auctionHorses: [],
            currentHorseId: null,
            apiImg: "https://storage.googleapis.com/horsebook/",
            showDraggableBubbles: false,
            auctionsSocket: null,
            auctionSocket: null,
            bidStatus: '',
        }
    },

    async mounted () {
        this.getuserMail();
        this.intentionalCloseSockets();
        this.startSocket();

        //  listen for resize events
        window.addEventListener('resize', this.handleResize);
        this.handleResize(); // Call it initially to set the width

        const isAuthenticated = this.$cookies.get('access_token')
        if (isAuthenticated) {
            this.$store.commit('authenticate', true)
            const user = JSON.parse(localStorage.getItem("setUser"))
            // console.log('user', user)
            this.$store.commit("setUser", {
                user: user.user,
                token: user.token,
                id: user.id
            })
            this.$store.commit("setIsUserAbleToBid", localStorage.getItem("isUserAbleToBid"))
        }
    },
    beforeDestroy() {
        this.intentionalCloseSockets();
        window.removeEventListener('resize', this.handleResize);
    },
    computed: {
        isUserAuthenticated() {
            return this.$store.state.isAuthenticated;
        },
        activePageClass() {
            return (route) => {
                return this.$route.path === route ? 'text-custom-gold' : this.textColor;
            }
        },
        isMobile() {
            return this.windowWidth <= 768; // Your mobile breakpoint
        },
        textColor() {
            return   this.isMobile ? 'text-white' : this.$store.state.textColorTopBar ? this.$store.state.textColorTopBar : 'text-white';
        },
        gradientMobileColor() {
            return 'bg-gradient-to-b from-[#353535] to-[#000000]'
        },
        locales() {
            return this.$i18n.locales.map(locale => locale.code);
        },
        currentLocale() {
            return this.$i18n.locale;
        },
        currentFlag() {
            return this.getFlag(this.currentLocale);
        },
        shouldShowDraggableBubbles() {
            return this.bidStatus === 'BIDDING' && this.auctionHorses.length > 0;
        }
    },
    methods: {
        handleResize() {
            this.windowWidth = window.innerWidth;
        },
        getuserMail() {
            this.username = JSON.parse(localStorage.getItem("setUser"))?.user
        },
        activePage(route) {
            return this.$route.path === route;
        },
        navigateToSignUp() {
            this.$router.push(this.localePath('/auth/sign-up'))
        },
        navigateToProfile() {
            this.$router.push(this.localePath('/user/perfil'))
        },
        navigateToLogin() {
            this.$router.push(this.localePath('/auth/login'))
        },
        login() {
            this.$router.push(this.localePath('/auth/login'))
        },
        logout() {
            this.$store.commit('authenticate', false);
            this.$store.commit('clearUserData');
            this.$store.commit("closeWebSocket");
            this.$store.commit("setUser", null);
            Cookies.remove('access_token');
            localStorage.removeItem("setUser");
            localStorage.removeItem("isUserAbleToBid");
            this.$router.push(this.localePath('/'))
        },
        async handleScrollIntoContact() {
            if (this.$route.path !== '/') {
                await this.$router.push(this.localePath('/'));

            }
            if (this.$route.path === '/') {
                this.$store.commit('setScrollIntoContact', true);
            } else {
                setTimeout(() => {
                    this.$store.commit('setScrollIntoContact', true);
                }, 1000);
            }
        },
        async intentionalCloseSockets() {
            this.closeauctionsSocket();
        },
        async closeauctionsSocket() {
            this.isIntentionalReconnectAuction = true;
            if (this.auctionsSocket) {
                this.auctionsSocket.close();
            }
            if (this.auctionSocket) {
                this.auctionSocket.close();
            }
            this.isIntentionalReconnectAuction = false;

        },
        async startSocket() {
            // WebSocket for auction
            const auctionUrl = `${this.$config.baseURLWS}/auctions`;

            this.auctionsSocket = new ReconnectingWebSocket(auctionUrl);

            this.auctionsSocket.addEventListener('open', (event) => {
                //// console.log('Conexión abierta:', event);
            });

            this.auctionsSocket.addEventListener('message', (event) => {


                const message = JSON.parse(event.data);
                if (message.error) {
                    // console.log(message.error);
                }

                console.warn("se abre el socket", message)

                if (message?.auction?.id) {
                    this.$data.currentAuctionId = message.auction.id
                    this.startAuctionSocket();
                }
                if (message?.status?.auction_id) {
                    this.$data.currentAuctionId
                    if(message.status.auction_id === this.$data.currentAuctionId &&
                        message.status.status != 'BIDDING'
                    ) {
                        this.$data.currentAuctionId = 0
                    }

                    if(message.status.status === 'BIDDING') {
                        this.$data.currentAuctionId = message.status.auction_id
                    }

                    this.$root.$emit('update-auctions', message.status)
                }
                console.warn("se maneja handleAuctionMessage")
                this.handleAuctionMessage(message);


            });

            this.auctionsSocket.addEventListener('close', (event) => {
                // console.log('Conexión cerrada auction socket:', event);
            });

            this.auctionsSocket.addEventListener('error', (error) => {
                console.error('Error de conexión auction socket:', error);
            });

        },

        async startAuctionSocket() {
            const url = `${this.$config.baseURLWS}/auction/${this.currentAuctionId}`;
            this.auctionSocket = new ReconnectingWebSocket(url);

            this.auctionSocket.addEventListener("message", (event) => {
                const message = JSON.parse(event.data);
                if (message.error) {
                    this.socketError = message.error;
                    return;
                }

                if (this.horses) {
                    this.horses = this.horses.map(h => {
                        if (h.local_data.id === horse.id) {
                            return {
                            ...h,
                            local_data: {
                                ...h.local_data,
                                status: horse.status,
                                final_amount: horse.final_amount
                            }
                            };
                        }
                        return h;
                    });
                }
                this.fetchAuctionDetails();
            });
            },

        async handleAuctionMessage(message) {
            // Caso 1: El mensaje contiene información de una nueva subasta
            if (message?.auction?.id) {
                this.currentAuctionId = message.auction.id;

                // Si es una nueva subasta o la subasta actual ha cambiado
                if (this.currentAuctionId !== this.currentAuctionId) {
                    this.currentAuctionId = this.currentAuctionId;
                    await this.fetchAuctionDetails();
                }
            }

            // Caso 2: El mensaje contiene información del estado de la subasta
            if (message?.status?.auction_id) {
                const newAuctionId = message.status.auction_id;
                const newStatus = message.status.status;

                if (newStatus === 'BIDDING') {
                if (this.currentAuctionId !== newAuctionId) {
                    this.currentAuctionId = newAuctionId;
                    await this.fetchAuctionDetails();
                } else {
                    // La subasta actual cambió de estado a BIDDING
                    this.showDraggableBubbles = true;
                    await this.fetchAuctionDetails();
                }
                } else if (this.currentAuctionId === newAuctionId) {
                // La subasta actual cambió a un estado que no es BIDDING
                this.showDraggableBubbles = false;
                this.currentAuctionId = null;
                this.auctionHorses = [];
                this.currentHorseId = null;
                }

                // Si el estado cambia a algo que no es BIDDING, actualizar currentAuctionId
                if (newStatus !== 'BIDDING' && this.currentAuctionId === newAuctionId) {
                this.currentAuctionId = 0;
                }

                this.$root.$emit('update-auctions', message.status);
            } else {
                await this.fetchAuctionDetails();
            }
            console.log("MESSAGE", message);
                // Actualizar la visibilidad de DraggableHorseBubbles
                this.updateDraggableBubblesVisibility();
            },

            updateDraggableBubblesVisibility() {
                this.showDraggableBubbles = this.currentAuctionId !== null && this.currentAuctionId !== 0 || auctionHorses;
            },

            async fetchAuctionDetails() {
            if (!this.currentAuctionId) return;

            const url = `${this.$config.baseURL}/subastas/list-subastas/?id=${this.currentAuctionId}`;

            try {
                const response = await this.$axios.get(url);
                const data = response.data;

                this.updateAuctionData(data);
            } catch (error) {
                console.error('Error al obtener detalles de la subasta:', error);
                this.$toast.error('Error al obtener detalles de la subasta');
            }
        },

        updateAuctionData(data) {
            this.bidStatus = data.status;
            this.bidId = data.id;
            this.auctionHorses = data.horses || [];
            this.currentHorseId = data.currentHorseId;

            // Actualizar showDraggableBubbles basado en el estado de la subasta
            this.updateDraggableBubblesVisibility();

            // Si hay caballos, establece el currentHorseId al primer caballo en BIDDING o al primero de la lista
            if (this.auctionHorses.length > 0) {
                const biddingHorse = this.auctionHorses.find(horse => horse.local_data.status === 'BIDDING');
                this.currentHorseId = biddingHorse ? biddingHorse.local_data.id : this.auctionHorses[0].local_data.id;
            }
        },


        async goToCurrenAuction() {

            if (this.currentAuctionId) {
                let path = `/auction/live/${this.currentAuctionId}`
                this.$router.push({ path: this.localePath(path) })
            }
        },

        toggleDropdown() {
            this.isDropdownOpen = !this.isDropdownOpen;
        },
        getFlag(locale) {
            return require(`~/public/flag-${locale}.png`)
        },

    },
}
</script>


<style>
.fill-pulse {
    animation: pulse 1.5s infinite;
}

@keyframes pulse {
    0% {
        fill: red;
    }

    50% {
        fill: transparent;
    }

    100% {
        fill: red;
    }
}
</style>
