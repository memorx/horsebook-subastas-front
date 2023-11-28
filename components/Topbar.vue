<template>
    <nav class="bg-black p-4 text-white">
        <div class="container mx-auto flex justify-between items-center">
            <!-- Logo or brand -->
            <nuxt-link to="/landingPage">
                <img
                    src="../public/image_la_silla.png"
                    alt="logo"
                    style="width: 40px;"
                >
            </nuxt-link>

            <!-- Navigation items -->
            <div class="flex items-center space-x-4">
                <div class="flex justify-right">
                    <a @click="goToCurrenAuction()" v-if="idCurrenBid"
                    class="text-white hover:text-red-600 group flex items-center px-2 py-2 font-bold rounded-md gap-2 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                        class="bi bi-people mr-3 flex-shrink-0 h-6 w-6 text-indigo-300" viewBox="0 0 16 16">
                        <circle cx="8" cy="8" r="7.5" stroke="red" :class="{ 'fill-pulse': idCurrenBid != 0 }" stroke-width="1"
                        fill="none" />
                    </svg>
                    Subasta En Vivo
                    </a>
                </div>
                <div v-if="isUserAuthenticated" class="flex justify-center align-middle items-center">
                    <!-- <nuxt-link
                        :to="$i18n.locale === 'es' ? switchLocalePath('en') : switchLocalePath('es')"
                        class="cursor-pointer"
                        aria-haspopup="listbox"
                        aria-expanded="true"
                        aria-labelledby="listbox-label"
                    >
                        <span class="flex items-center">
                        <img v-if="$i18n.locale === 'en'" src="../public/flag-mex.png" alt="mexico-flag" class="mr-2 h-6 w-6 flex-shrink-0 rounded-full">
                        <img v-if="$i18n.locale === 'es'" src="../public/flag-USA.png" alt="flag-usa" class="mr-2 h-6 w-6 flex-shrink-0 rounded-full">
                        <span v-if="$i18n.locale === 'es'">{{ $t("SwitchLanguage.spanish") }}</span>
                        <span v-if="$i18n.locale === 'en'">{{ $t("SwitchLanguage.english") }}</span>
                        </span>
                    </nuxt-link> -->


                    <nuxt-link to="/user/inicio">
                        <div class="font-bold bg-black text-white py-2 px-4 rounded hover:bg-white hover:text-black flex">
                            Tus Subastas
                        </div>
                    </nuxt-link>

                    <button
                        class="font-bold bg-black text-white py-2 px-4 rounded hover:bg-white hover:text-black"
                        @click="logout"
                    >
                        Cerrar sesión
                    </button>
                    <nuxt-link to="/user/perfil">
                        <div class="font-bold bg-black text-white py-2 px-4 rounded hover:bg-white hover:text-black flex justify-center align-middle items-center">
                            <i class="fas fa-user fa-lg p-2"></i>
                        </div>
                    </nuxt-link>

                </div>

                <div v-else class="flex justify-center align-middle items-center">
                    <!-- <nuxt-link
                        :to="$i18n.locale === 'es' ? switchLocalePath('en') : switchLocalePath('es')"
                        class="cursor-pointer"
                        aria-haspopup="listbox"
                        aria-expanded="true"
                        aria-labelledby="listbox-label"
                    >
                        <span class="flex items-center">
                        <img v-if="$i18n.locale === 'en'" src="../public/flag-mex.png" alt="mexico-flag" class="mr-2 h-6 w-6 flex-shrink-0 rounded-full">
                        <img v-if="$i18n.locale === 'es'" src="../public/flag-USA.png" alt="flag-usa" class="mr-2 h-6 w-6 flex-shrink-0 rounded-full">
                        <span v-if="$i18n.locale === 'es'">{{ $t("SwitchLanguage.spanish") }}</span>
                        <span v-if="$i18n.locale === 'en'">{{ $t("SwitchLanguage.english") }}</span>
                        </span>
                    </nuxt-link> -->
                    <button
                        @click="login"
                        class="font-bold bg-black text-white py-2 px-4 rounded hover:bg-white hover:text-black"
                    >
                        Iniciar sesión
                    </button>
                    <nuxt-link to="/auth/sign-up">
                        <button
                            @click="login"
                            class="font-bold bg-black text-white py-2 px-4 rounded hover:bg-white hover:text-black"
                        >
                            Regístrate
                        </button>
                    </nuxt-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import Cookies from "js-cookie";
import ReconnectingWebSocket from 'reconnecting-websocket';

export default {
    data () {
        return {
            username: "",
            idCurrenBid: 0,
            socket: null, // Socket para auction
            isIntentionalReconnectAuction: false,
        }
    },
    mounted () {
        this.getuserMail();
        this.intentionalCloseSockets();
        this.startSocket();
    },
    beforeDestroy() {
        this.intentionalCloseSockets();
    },
    methods: {
        getuserMail() {
            this.username = JSON.parse(localStorage.getItem("setUser"))?.user
        },
        login() {
            this.$router.push('/auth/login')
        },
        logout() {
            this.$store.commit('authenticate', false);
            this.$store.commit('clearUserData');
            this.$store.commit("closeWebSocket");
            Cookies.remove('access_token');
            localStorage.removeItem("setUser");
            this.$router.push('/')
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
                console.log('Conexión abierta:', event);
            });

            this.auctionSocket.addEventListener('message', (event) => {
                const message = JSON.parse(event.data);
                if (message.error) {
                    console.log(message.error);
                }
                if (message.auction?.id) {
                    this.$data.idCurrenBid = message.auction.id
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

            if(this.idCurrenBid) {
                let path = `/auction/live/${this.idCurrenBid}`
                this.$router.push({ path: path })
            }
        },
    },
    computed: {
        isUserAuthenticated() {
            return this.$store.state.isAuthenticated;
        }
    }
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
