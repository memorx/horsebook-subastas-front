<template>
    <div>
        <div id="google_translate_element" class="w-full overflow-x-hidden"></div>
        <!-- Parent div with black background -->
       <!--  <div v-if="showVideo" :class="['fixed z-30 inset-0 w-screen h-screen', bgLayoutMode]">
            <video ref="videoPlayer" class="w-full h-full object-fit" autoplay muted playsinline loop>
                <source src="/video-home.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <ReusableButton containerClass="mb-12 fixed z-50 bottom-5 w-auto text-white left-1/2 transform -translate-x-1/2"
                buttonClass="uppercase text-sm md:text-base lg:text-lg" :onClick="closeVideo"
                :buttonText="$t('home.video.button')" />
        </div> -->

        <div>
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
    </div>
</template>

<script>
import Topbar from '~/components/Topbar.vue';
import Footer from '~/components/Footer.vue';
import MobileMenu from '~/components/MobileMenu.vue';
import JWTDecode from "jwt-decode"
import Cookie from "js-cookie"
import Swal from 'sweetalert2';

export default {
    beforeMount() {
        this.showVideo = false
        /*
        if (!Cookie.get('videoPlayed')) {
            this.showVideo = true;
        } else {
            this.showVideo = false;
        }
        */
    },
    async mounted() {
        /* comment google translate option
        window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement({
            pageLanguage: 'es', // Idioma predeterminado
            includedLanguages: 'es,fr,de', // Idiomas disponibles
            layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL,
            autoDisplay: false
            }, 'google_translate_element');
        };

        // Cargar el script del widget de Google Translate
        const script = document.createElement('script');
        script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.head.appendChild(script);
        */
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
        MobileMenu
    },
    data() {
        return {
            showVideo: true,
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
            if (this.$store.state.websocket) {
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
                    Cookie.set("access_token", jwt)
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
            this.showVideo = false; // hides the video and close button
            this.$refs.videoPlayer.pause(); // stops the video playback

            // Set the cookie to remember the video has been played
            Cookie.set('videoPlayed', 'true', { expires: 365 }); // set it to expire in 365 days. Adjust as needed.
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
        }
    },
};

</script>
<style>
#google_translate_element {
    width: 100%; /* Ancho máximo para que no sobrepase la pantalla */
    margin: 0 auto; /* Centrar el widget horizontalmente */
    overflow-x: hidden; /* Ocultar cualquier desbordamiento horizontal */
}
#google_translate_element .goog-te-gadget {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
}

#google_translate_element .goog-te-gadget select {
    margin-right: 10px;
}

#google_translate_element .goog-te-gadget a {
    display: flex;
    align-items: center;
    white-space: nowrap;
    margin-left: 10px;
}

#google_translate_element .goog-te-gadget a img {
    margin-right: 5px;
}

.skiptranslate {
    display: none;

}
</style>