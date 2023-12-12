<template>
    <div class="flex flex-col items-center justify-between font-roboto w-full min-h-screen ">

        <!-- Buttons for Login and Register -->
        <div class="flex flex-col justify-between items-center w-full p-4">
            <div class="flex flex-row justify-between items-center w-full">
                <ReusableButton :buttonText="$t('topBar.logIn')"
                    buttonClass="text-xs md:text-xs lg:text-xs uppercase lg:px-4 md:px-4 bg-custom-gold w-full"
                    containerClass="w-1/2" :onClick="navigateToLogin" />
                <!-- here goes the langues flag-->
            </div>

            <!-- Margin space -->
            <div class="my-8"></div>

            <!-- Navigation Links -->
            <nav class="flex flex-col justify-center  w-full px-4">
                <ul class="flex flex-col space-y-8 uppercase">
                    <li>
                        <nuxt-link :class="activePageClass('/')" to="/" @click.native="closeMenu">
                            {{ $t('topBar.home') }}
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link :class="activePageClass('/bids')" to="/bids" @click.native="closeMenu">
                            {{ $t('topBar.bids') }}
                        </nuxt-link>
                    </li>
                    <li>
                        <button v-if="this.$route.path === '/'"
                            :class="[activePageClass('/contact'), 'uppercase font-roboto']" @click="handleScrollIntoContact">
                            {{ $t('topBar.contact') }}
                        </button>
                        <nuxt-link v-if="this.$route.path !== '/'" :class="activePageClass('/contact')" to="/contact"
                            @click.native="closeMenu">{{
                                $t('topBar.contact') }}</nuxt-link>
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
                <a href="https://instagram.com" target="_blank" class="text-white hover:text-gray-300">
                    <i class="fab fa-instagram fa-2x"></i>
                </a>
                <a href="https://facebook.com" target="_blank" class="text-white hover:text-gray-300">
                    <i class="fab fa-facebook fa-2x"></i>
                </a>
                <a href="https://youtube.com" target="_blank" class="text-white hover:text-gray-300">
                    <i class="fab fa-youtube fa-2x"></i>
                </a>
            </div>
        </div>

    </div>
</template>

<script>
import ReusableButton from '~/components/ReusableButton.vue';
export default {
    components: {
        ReusableButton
    },
    computed: {
        activePageClass() {
            return (route) => {
                return this.$route.path === route ? 'text-custom-gold' : this.$store.state.textColorTopBar ?  `text-white lg:${this.$store.state.textColorTopBar}` : 'text-white';
            }
        },
    },
    methods: {
        navigateToLogin() {
            this.$emit('handle-close-menu')
            this.$router.push('/auth/login')
        },
        handleScrollIntoContact() {
            this.$emit('handle-close-menu')
            this.$store.dispatch('scrollIntoContact', true)
        },
        closeMenu() {
            this.$emit('handle-close-menu');
        },
    }
};
</script>
