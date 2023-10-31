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

                <div v-if="isUserAuthenticated">
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
                        <button class="font-bold bg-black text-white py-2 px-4 rounded hover:bg-white hover:text-black">
                            Tus Subastas
                        </button>
                    </nuxt-link>

                    <button
                        class="font-bold bg-black text-white py-2 px-4 rounded hover:bg-white hover:text-black"
                        @click="logout"
                    >
                        Cerrar sesión
                    </button>

                    <nuxt-link to="/user/perfil">
                        <button class="font-bold bg-black text-white py-2 px-4 rounded hover:bg-white hover:text-black">
                            <i class="fas fa-user fa-lg"></i>
                        </button>
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

export default {
    methods: {
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
        }
    },
    computed: {
        isUserAuthenticated() {
            return this.$store.state.isAuthenticated;
        }
    }
}
</script>
  
<style scoped>
/* Add any extra styling here */
</style>

  