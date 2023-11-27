<template>
    <nav :class="['p-4 lg:from-transparent', textColor, gradientMobileColor]">
        <!-- Web Navigation -->
        <div class="hidden lg:flex container mx-auto justify-between items-center bg-transparent">
            <!-- Logo or brand -->
            <nuxt-link to="/">
                <img src="../public/image_la_silla.png" alt="logo" style="width: 40px;">
            </nuxt-link>

            <!-- Navigation items -->
            <div class="flex items-center space-x-4">

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

                    <button class="font-bold bg-black py-2 px-4 rounded hover:bg-white hover:text-black" @click="logout">
                        Cerrar sesión
                    </button>

                    <nuxt-link to="/user/perfil">
                        <div
                            class="font-bold bg-black text-white py-2 px-4 rounded hover:bg-white hover:text-black flex justify-center align-middle items-center">
                            <i class="fas fa-user fa-lg p-2"></i>
                            <p>{{ username }}</p>
                        </div>
                    </nuxt-link>
                </div>

                <div v-else>
                    <!--web/ipad Navigation items -->
                    <div class=" hidden md:flex justify-center align-middle items-center ">
                        <div class="flex space-x-3 lg:space-x-4 uppercase text-xs font-roboto">
                            <nuxt-link :class="activePageClass('/')" to="/">{{ $t('topBar.home') }}</nuxt-link>
                            <nuxt-link :class="activePageClass('/bids')" to="/bids">{{
                                $t('topBar.bids') }}</nuxt-link>
                            <!-- <nuxt-link :class="activePageClass('/us')" to="/us">{{ $t('topBar.us') }}</nuxt-link>
                            <nuxt-link :class="activePageClass('/news')" to="/news">{{ $t('topBar.news') }}</nuxt-link> -->
                            <button class="uppercase text-xs font-roboto" @click="handleScrollIntoContact">
                                {{ $t('topBar.contact') }}
                            </button>
                        </div>

                        <!-- Sign Up / Log in-->
                        <div class="flex flex-row mx-6 gap-6 w-[275px]">
                            <ReusableButton :buttonText="$t('topBar.signUp')"
                                :buttonClass="`text-xs md:text-xs lg:text-xs uppercase lg:px-4 md:px-4 w-full ${textColor}`"
                                containerClass="w-1/2" :onClick="navigateToSignUp" />

                            <ReusableButton :buttonText="$t('topBar.logIn')"
                                buttonClass="text-xs md:text-xs lg:text-xs uppercase lg:px-4 md:px-4 bg-custom-gold w-full"
                                containerClass="w-1/2" :onClick="navigateToLogin" />
                        </div>

                        <!-- Swtich Language -->
                        <!-- <nuxt-link :to="$i18n.locale === 'es' ? switchLocalePath('en') : switchLocalePath('es')"
                            class="cursor-pointer" aria-haspopup="listbox" aria-expanded="true"
                            aria-labelledby="listbox-label">
                            <span class="flex items-center">
                                <img v-if="$i18n.locale === 'en'" src="../public/flag-mex.png" alt="mexico-flag"
                                    class="mr-2 h-6 w-6 flex-shrink-0 rounded-full">
                                <img v-if="$i18n.locale === 'es'" src="../public/flag-USA.png" alt="flag-usa"
                                    class="mr-2 h-6 w-6 flex-shrink-0 rounded-full">
                            </span>
                        </nuxt-link> -->
                    </div>
                </div>
            </div>
        </div>

        <!-- Mobile Navigation -->
        <div class="lg:hidden flex container mx-auto justify-between items-center">

            <!-- Navigation items -->
            <div class="flex items-center justify-between w-full">

                <!-- Logo or brand -->
                <nuxt-link to="/">
                    <img src="../public/image_la_silla.png" alt="logo" style="width: 40px;">
                </nuxt-link>

                <div v-if="!isMobileMenuOpen">
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
                            <div
                                class="font-bold bg-black text-white py-2 px-4 rounded hover:bg-white hover:text-black flex">
                                Tus Subastas
                            </div>
                        </nuxt-link>

                        <button class="font-bold bg-black py-2 px-4 rounded hover:bg-white hover:text-black"
                            @click="logout">
                            Cerrar sesión
                        </button>

                        <nuxt-link to="/user/perfil">
                            <div
                                class="font-bold bg-black text-white py-2 px-4 rounded hover:bg-white hover:text-black flex justify-center align-middle items-center">
                                <i class="fas fa-user fa-lg p-2"></i>
                                <p>{{ username }}</p>
                            </div>
                        </nuxt-link>
                    </div>

                    <div v-else class=" flex flex-row justify-space-between">
                        <!-- Sign Up / Log in-->
                        <div class="flex flex-row mx-8 gap-6 w-auto">
                            <ReusableButton :buttonText="$t('topBar.signUp')"
                                :buttonClass="`text-xs md:text-xs lg:text-xs uppercase lg:px-4 md:px-4 w-full ${textColor}`"
                                containerClass="w-1/2" :onClick="navigateToSignUp" />

                            <ReusableButton :buttonText="$t('topBar.logIn')"
                                buttonClass="text-xs md:text-xs lg:text-xs uppercase lg:px-4 md:px-4 bg-custom-gold w-full"
                                containerClass="w-1/2" :onClick="navigateToLogin" />
                        </div>
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

export default {
    components: {
        ReusableButton
    },
    mounted() {
        this.getuserMail()
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
    data() {
        return {
            username: "",
            moveToHome: false
        }
    },
    computed: {
        isUserAuthenticated() {
            return this.$store.state.isAuthenticated;
        },
        activePageClass() {
            return (route) => {
                return this.$route.path === route ? 'text-custom-gold' : this.$store.state.textColorTopBar ? this.$store.state.textColorTopBar : 'text-white';
            }
        },
        textColor() {
            return this.$store.state.textColorTopBar ? this.$store.state.textColorTopBar : 'text-white';
        },
        gradientMobileColor() {
            return 'bg-gradient-to-b from-[#353535] to-[#000000]'
        }
    },
    methods: {
        getuserMail() {
            this.username = JSON.parse(localStorage.getItem("setUser"))?.user
        },
        activePage(route) {
            return this.$route.path === route;
        },
        navigateToSignUp() {
            this.$router.push('/auth/sign-up')
        },
        navigateToLogin() {
            this.$router.push('/auth/login')
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
        async handleScrollIntoContact() {
            if (this.$route.path !== '/') {
                await this.$router.push('/');

            }
            if (this.$route.path === '/') {
                this.$store.commit('setScrollIntoContact', true);
            } else
            {
                setTimeout(() => {
                    this.$store.commit('setScrollIntoContact', true);
                }, 1000);
            }
        },
    },
}
</script>

<style scoped>
/* Add any extra styling here */
</style>
