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
                        <nuxt-link :class="activePageClass('/')" to="/" @click.native="closeMenu">
                            {{ $t('topBar.home') }}
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link :class="activePageClass('/user/inicio')" to="/user/inicio" @click.native="closeMenu">
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
                            :class="[activePageClass('/news'), 'uppercase font-roboto']" to="/news">
                            {{ $t('topBar.news') }}
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link :to="$i18n.locale === 'es' ? switchLocalePath('en') : switchLocalePath('es')"
                            class="cursor-pointer" aria-haspopup="listbox" aria-expanded="true"
                            aria-labelledby="listbox-label">
                            <span class="flex items-center">
                                <img v-if="$i18n.locale === 'en'" src="../public/flag-mex.png" alt="mexico-flag"
                                    class="mr-2 h-6 w-6 flex-shrink-0 rounded-full">
                                <img v-if="$i18n.locale === 'es'" src="../public/flag-USA.png" alt="flag-usa"
                                    class="mr-2 h-6 w-6 flex-shrink-0 rounded-full">
                            </span>
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
            this.$router.push(this.localePath('/auth/login'))
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
    }
};
</script>
