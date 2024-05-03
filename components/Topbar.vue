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
                    <a @click="goToCurrenAuction()" v-if="idCurrenBid"
                    :class="['hover:text-red-600 group flex items-center px-2 py-2 font-bold rounded-md gap-2 cursor-pointer']">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                        class="bi bi-people mr-3 flex-shrink-0 h-6 w-6 text-indigo-300" viewBox="0 0 16 16">
                        <circle cx="8" cy="8" r="7.5" stroke="red" :class="{ 'fill-pulse': idCurrenBid != 0 }" stroke-width="1"
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
                            <!-- <nuxt-link :class="activePageClass('/news')" :to="localePath('/news')">{{ $t('topBar.news') }}</nuxt-link>
                            -->
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
                    <a @click="goToCurrenAuction()" v-if="idCurrenBid"
                    :class="['hover:text-red-600 group flex items-center px-2 py-2 font-bold rounded-md gap-2 cursor-pointer']">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                        class="bi bi-people mr-3 flex-shrink-0 h-6 w-6 text-indigo-300" viewBox="0 0 16 16">
                        <circle cx="8" cy="8" r="7.5" stroke="red" :class="{ 'fill-pulse': idCurrenBid != 0 }" stroke-width="1"
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
    </nav>
</template>

<script>
import Cookies from "js-cookie";
import ReusableButton from "~/components/ReusableButton.vue";
import ReconnectingWebSocket from 'reconnecting-websocket';

export default {
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
            idCurrenBid: 0,
            socket: null, // Socket para auction
            isIntentionalReconnectAuction: false,
            moveToHome: false,
            windowWidth: process.client ? window.innerWidth : 0,
            isDropdownOpen: false,
        }
    },
    mounted () {
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
            console.log('user', user)
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
            this.closeAuctionSocket();
        },
        async closeAuctionSocket() {
            this.isIntentionalReconnectAuction = true;
            if (this.socket) {
                this.socket.close();
            }
            this.isIntentionalReconnectAuction = false;

        },
        async startSocket() {
            // WebSocket for auction
            const auctionUrl = `${this.$config.baseURLWS}/auctions`;

            this.auctionSocket = new ReconnectingWebSocket(auctionUrl);

            this.auctionSocket.addEventListener('open', (event) => {
                //console.log('Conexión abierta:', event);
            });

            this.auctionSocket.addEventListener('message', (event) => {
                const message = JSON.parse(event.data);
                if (message.error) {
                    console.log(message.error);
                }
                if (message?.auction?.id) {
                    this.$data.idCurrenBid = message.auction.id
                }
                if (message?.status?.auction_id) {
                    this.$data.idCurrenBid
                    if(message.status.auction_id === this.$data.idCurrenBid &&
                        message.status.status != 'BIDDING'
                    ) {
                        this.$data.idCurrenBid = 0
                    }

                    if(message.status.status === 'BIDDING') {
                        this.$data.idCurrenBid = message.status.auction_id
                    }

                    this.$root.$emit('update-auctions', message.status)
                }

            });

            this.auctionSocket.addEventListener('close', (event) => {
                console.log('Conexión cerrada auction socket:', event);
            });

            this.auctionSocket.addEventListener('error', (error) => {
                console.error('Error de conexión auction socket:', error);
            });

        },
        async goToCurrenAuction() {

            if (this.idCurrenBid) {
                let path = `/auction/live/${this.idCurrenBid}`
                this.$router.push({ path: this.localePath(path) })
            }
        },

        toggleDropdown() {
            this.isDropdownOpen = !this.isDropdownOpen;
        },
        getFlag(locale) {
            return require(`~/public/flag-${locale}.png`)
        }
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
