<template>
    <div class="flex flex-col items-center justify-between font-roboto w-full min-h-screen ">

        <!-- Buttons for Login and Register -->
        <div class="flex flex-col justify-between items-center w-full p-4">
            <!-- Margin space -->
            <div class="my-8"></div>

            <!-- Navigation Links -->
            <nav class="flex flex-col justify-center  w-full px-4">
                <ul class="flex flex-col space-y-8 uppercase">
                    <li>
                        <div v-if="!isUserAuthenticated" class=" flex flex-col">
                            <!-- Sign Up / Log in-->
                            <div class="flex flex-col gap-6 w-auto">
                                <ReusableButton :buttonText="$t('topBar.signUp')"
                                    :buttonClass="`text-xs md:text-xs lg:text-xs uppercase lg:px-4 md:px-4 w-full bg-white text-black`"
                                    containerClass="" :onClick="navigateToSignUp" />

                                <ReusableButton :buttonText="$t('topBar.logIn')"
                                    buttonClass="text-xs md:text-xs lg:text-xs uppercase lg:px-4 md:px-4 bg-custom-gold w-full"
                                    containerClass="" :onClick="navigateToLogin" />
                            </div>
                        </div>
                        <div v-else class=" flex flex-col justify-space-between">
                            <div class="flex flex-col gap-6 w-auto">
                                <ReusableButton :buttonText="$t('topBar.profile')"
                                    :buttonClass="`text-xs md:text-xs lg:text-xs uppercase lg:px-4 md:px-4 w-full text-black bg-white`"
                                    containerClass="" :onClick="navigateToProfile" />
                                <ReusableButton :buttonText="$t('topBar.logout')"
                                    buttonClass="text-xs md:text-xs lg:text-xs uppercase lg:px-4 md:px-4 bg-custom-gold w-full"
                                    containerClass="" :onClick="logout" />
                            </div>
                        </div>
                    </li>
                    <li>
                        <nuxt-link :class="activePageClass('/')" :to="localePath('/')" @click.native="closeMenu">
                            {{ $t('topBar.home') }}
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link :class="activePageClass('/user/inicio')" :to="localePath('/user/inicio')" @click.native="closeMenu">
                            {{ $t('topBar.bids') }}
                        </nuxt-link>
                    </li>
                    <li>
                        <button
                            :class="[activePageClass('/contact'), 'uppercase font-roboto']" @click="handleScrollIntoContact">
                            {{ $t('topBar.contact') }}
                        </button>
                    </li>
                    <li>
                        <nuxt-link
                            :class="[activePageClass('/news'), 'uppercase font-roboto']" :to="localePath('/news')">
                            {{ $t('topBar.news') }}
                        </nuxt-link>
                    </li>
                    <li class="flex flex-row">
                        <nuxt-link v-for="(locale, index) in locales" :key="index" :to="switchLocalePath(locale)" @click="isDropdownOpen=false" class="px-4 py-2 hover:bg-gray-100 flex items-center">
                            <img :src="getFlag(locale)" :alt="locale" class="mr-2 h-4 w-auto">
                        </nuxt-link>
                    </li>

                </ul>
            </nav>
        </div>



        <!-- Margin space -->
        <div class="my-4"></div>

        <!-- Social Media Links -->
        <div class="flex flex-col p-4 w-full">
            <span class="text-white mb-2">Síguenos:</span>
            <div class="flex space-x-4">
                <a href="https://www.instagram.com/clubhipicolasilla" target="_blank" class="text-white hover:text-gray-300">
                    <i class="fab fa-instagram fa-2x"></i>
                </a>
                <a href="https://www.facebook.com/clubhipicolasilla" target="_blank" class="text-white hover:text-gray-300">
                    <i class="fab fa-facebook fa-2x"></i>
                </a>
                <a href="https://www.youtube.com/@clubhipicolasilla6195" target="_blank" class="text-white hover:text-gray-300">
                    <i class="fab fa-youtube fa-2x"></i>
                </a>
            </div>
        </div>

    </div>
</template>

<script>
import ReusableButton from '~/components/ReusableButton.vue';
import Cookies from "js-cookie";

export default {
    components: {
        ReusableButton
    },
    computed: {
        isUserAuthenticated() {
            return this.$store.state.isAuthenticated;
        },
        activePageClass() {
            return (route) => {
                return this.$route.path === route ? 'text-custom-gold' : this.$store.state.textColorTopBar ?  `text-white lg:${this.$store.state.textColorTopBar}` : 'text-white';
            }
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
        navigateToLogin() {
            this.$emit('handle-close-menu')
            this.$router.push(this.localePath('/auth/login'))
        },
        navigateToSignUp() {
            this.$router.push(this.localePath('/auth/sign-up'))
        },
        navigateToProfile() {
            this.$router.push(this.localePath('/user/perfil'))
        },
        logout() {
            this.$store.commit('authenticate', false);
            this.$store.commit('clearUserData');
            this.$store.commit("closeWebSocket");
            Cookies.remove('access_token');
            localStorage.removeItem("setUser");
            this.$router.push(this.localePath('/'))
        },
        handleScrollIntoContact() {
            this.$emit('handle-close-menu')
            if (this.$route.path === '/') {
                this.$store.commit('setScrollIntoContact', true);
            } else {
                this.$router.push(this.localePath('/'))
                setTimeout(() => {
                    this.$store.commit('setScrollIntoContact', true);
                }, 1000);
            }
        },
        closeMenu() {
            this.$emit('handle-close-menu');
        },
        getFlag(locale) {
            return require(`~/public/flag-${locale}.png`)
        }
    }
};
</script>
