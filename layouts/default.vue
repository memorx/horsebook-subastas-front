<template>
    <div>
        <!-- Image Popup -->
<!-- <div :style="{ display: showPromoPopup ? 'block' : 'none' }" class="fixed z-30 inset-0 w-screen h-screen bg-black bg-opacity-75 flex items-center justify-center">
    <div class="relative p-4 flex items-center justify-center">
        <a href="https://www.findelmundoremates.com" target="_blank" class="block">
            <img src="/promo-agosto.jpg" alt="Subasta Online 18 Agosto" class="max-w-[90vw] max-h-[90vh] object-contain cursor-pointer hover:opacity-90 transition-opacity">
        </a>
        <button
            @click.stop="closePromoPopup"
            class="absolute top-2 right-2 bg-white text-black rounded-full w-8 h-8 flex items-center justify-center font-bold hover:bg-gray-200 z-10"
        >
            ×
        </button>
    </div>
</div> -->
        <!-- Contenedor del video y botón -->
        <div :style="{ display: showVideo ? 'block' : 'none' }" class="fixed z-30 inset-0 w-screen h-screen">
            <div :class="['w-full h-full', bgLayoutMode]">
                <video ref="videoPlayer" class="w-full h-full object-fit" autoplay muted playsinline loop>
                    <source src="/video-home.mp4" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <nuxt-link
                    to="#"
                    @click.native.prevent="closeVideo"
                    :class="[
                        'mb-12 fixed z-50 bottom-5 w-auto rounded-full text-white left-1/2 transform -translate-x-1/2',
                        'uppercase text-sm md:text-base lg:text-lg font-bold bg-black bg-opacity-50 backdrop-blur-sm',
                        'px-4 py-2 inline-block transition-all duration-300 hover:bg-opacity-70'
                    ]"
                >
                    {{ $t('home.video.button') }}
                </nuxt-link>
            </div>
        </div>

        <div :style="{ display: showVideo ? 'none' : 'block' }">
            <div :class="[`bg-contain bg-start bg-no-repeat bg-[url('/${bgImage}')] `, bgLayoutMode]">
                <!-- Your TopBar Component bg-[url('/home-bg.jpg')] -->

                <Topbar :toggleMenu="handleMenu" :isMobileMenuOpen="isMobileMenuOpen" />
                <!-- Mobile Menu Overlay -->
                <div v-if="isMobileMenuOpen" ref="mobileMenu"
                    :class="['lg:hidden fixed inset-y-0 right-0  z-50 w-2/3 bg-gradient-to-b from-[#353535] to-[#000000] bg-black']">
                    <MobileMenu @handle-close-menu="hanldeCloseMenu" />
                </div>

                <!-- This will be replaced by the page content -->
                <Nuxt />
            </div>
            <Footer @handle-close-menu="hanldeCloseMenu"/>
        </div>
        <cookie-consent />
    </div>
</template>

<script>
import Topbar from '~/components/Topbar.vue';
import Footer from '~/components/Footer.vue';
import MobileMenu from '~/components/MobileMenu.vue';
import JWTDecode from "jwt-decode"
import Cookie from "js-cookie"
import Swal from 'sweetalert2';
import CookieConsent from '~/components/CookieConsent.vue';

export default {
    beforeMount() {
        this.showVideo = this.shouldShowVideo();
    },
    async mounted() {
        await this.getUserInfo()
        this.checkAndInitializeWebSocket();
        if (!window.WebSocket) {
            this.$swal.fire({
                title: 'Actualiza tu navegador',
                text: "Para disfrutar al máximo de nuestro sitio web y acceder a todas sus funciones, te recomendamos que actualices tu navegador web.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Entendido'
            });
        }
        // show welcome modal if the video has been played
        if (this.showWelcomeModal && this.showVideo) {
            this.showWelcomeModalMethod();
        }
    },
    destroyed() {
        // Remove the click event listener when the component is destroyed
        document.removeEventListener('click', this.handleClickOutside);
    },
    watch: {
        '$store.state.isAuthenticated': 'checkAndInitializeWebSocket',
        '$store.state.user': 'checkAndInitializeWebSocket',
        '$store.state.isUserAbleToBid': 'displayToast'
    },
    components: {
        Topbar,
        Footer,
        MobileMenu,
        CookieConsent
    },
    data() {
        return {
            showVideo: false,
            // showPromoPopup:true,
            isMobileMenuOpen: false,
            showWelcomeModal: !Cookie.get('videoPlayed')
        }
    },
    computed: {
        bgImage() {
            return this.$store.state.bgImage;
        },
        bgLayoutMode() {
            return this.$store.state.layoutMode === 'lightMode' ? 'bg-light-mode' : 'bg-black';
        }
    },
    methods: {
        showWelcomeModalMethod() {
            Swal.fire({
                title: this.$t('home.video.title'),
                text: '',
                confirmButtonText: this.$t('general.close'),
                confirmButtonColor: '#3085d6',
                allowOutsideClick: false,
            }).then((result) => {
                this.handleWelcomeModalClose();
            })
        },
        handleWelcomeModalClose() {
            this.showWelcomeModal = false;
            this.playVideoWithSound();
        },
        handleWelcomeModalClose() {
            this.showWelcomeModal = false;
            this.playVideoWithSound();
            console.log('Closing welcome modal');
        },
        playVideoWithSound() {
            console.log('Playing video with sound');
            if (this.showVideo) {
                const videoPlayer = this.$refs.videoPlayer;
                videoPlayer.muted = false;
                videoPlayer.play();
                console.log('Playing video with sound');
            }
        },
        checkAndInitializeWebSocket() {
            console.log('Checking and initializing websocket');
            if (this.$store.state.isAuthenticated && this.$store.state.user.id) {
                this.$store.dispatch('initializeWebSocketUserStatus');
            }
        },
        displayToast() {
            if (this.$store.state.websocket && this.$store.state.showToast) {
                if (this.$store.state.isUserAbleToBid) {
                    this.$toast.success(this.$t('bids.aprrovedToOffer'));
                } else {
                    this.$toast.error(this.$t('bids.rejectedToOffer'));
                }
            }
        },
        async getUserInfo() {
            if (!this.$cookies.get("access_token")) return
            const decoded = JWTDecode(this.$cookies.get("access_token"))
            const url = `${this.$config.baseURL}/users/list-app-users/?email=${decoded.email}`

            if (decoded.token) {
                const headers = {
                    Authorization: `Token ${decoded.token}`
                }
                const response = await this.$axios.get(url, { headers })

                //Check if the cookie needs to update
                if (response.data.app_user_profile.bid !== decoded.isAbleToBid) {
                    console.log("Updating user bid status on the cookie");
                    //before updating the cookie
                    const HMACSHA256 = (stringToSign, secret) => {
                        const crypto = require("crypto")
                        return crypto
                            .createHmac("sha256", secret)
                            .update(stringToSign)
                            .digest("base64")
                    }
                    const header = {
                        alg: "HS256",
                        typ: "JWT"
                    }
                    const encodedHeaders = btoa(JSON.stringify(header))
                    const claims = {
                        email: response.data.email,
                        token: decoded.token,
                        id: `${response.data.id}`,
                        isAbleToBid: response.data.app_user_profile.bid || false
                    }
                    const encodedPlayload = btoa(JSON.stringify(claims))
                    const signature = HMACSHA256(
                        `${encodedHeaders}.${encodedPlayload}`,
                        "mysecret"
                    )
                    const encodedSignature = btoa(signature)
                    const jwt = `${encodedHeaders}.${encodedPlayload}.${encodedSignature}`
                    Cookie.set("access_token", jwt, { expires: 1 })
                    // update the store
                    this.$store.commit("authenticate", true)
                    this.$store.commit("setUser", {
                        email: response.data.email,
                        token: decoded.token,
                        id: `${response.data.id}`,
                    })
                    this.$store.commit(
                        "setIsUserAbleToBid",
                        response.data.app_user_profile.bid
                    )
                }
            }
        },
        closeVideo() {
            console.log('Cerrando video');
            this.showVideo = false;

            if (this.$refs.videoPlayer) {
                this.$refs.videoPlayer.pause();
                this.$refs.videoPlayer.currentTime = 0;
            }

            Cookie.set('videoPlayed', '1', { expires: 365 });

            console.log('Estado de videoPlayed:', Cookie.get('videoPlayed'));
        },
        playVideo() {
            this.$refs.videoPlayer.play();
        },
        handleMenu() {
            this.isMobileMenuOpen = !this.isMobileMenuOpen;

            // Ensure that we add/remove event listener after the DOM has been updated
            this.$nextTick(() => {
                if (this.isMobileMenuOpen) {
                    document.addEventListener('click', this.handleClickOutside, true);
                } else {
                    document.removeEventListener('click', this.handleClickOutside, true);
                }
            });
        },
        handleClickOutside(event) {
            // Check if mobileMenu exists and if the click is outside of it
            if (this.isMobileMenuOpen && this.$refs.mobileMenu && !this.$refs.mobileMenu.contains(event.target)) {
                this.isMobileMenuOpen = false;
                document.removeEventListener('click', this.handleClickOutside, true);
            }
        },
        hanldeCloseMenu() {
            this.isMobileMenuOpen = false;
        },
        //closePromoPopup() {
           // this.showPromoPopup = false;
        //},
        shouldShowVideo() {
            //const videoPlayed = Cookie.get('videoPlayed');
            return false;//videoPlayed === undefined || parseInt(videoPlayed) !== 1;
        },
    },
};

</script>

<style scoped>
.invisible {
    visibility: hidden;
}
.opacity-0 {
    opacity: 0;
}
</style>
