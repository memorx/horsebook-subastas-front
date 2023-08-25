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
                <nuxt-link to="/user/inicio">
                    <button
                        v-if="isLoggedIn"
                        class="text-2xl font-bold bg-black text-white py-2 px-4 rounded hover:bg-white hover:text-black"
                    >Tus Subastas</button>
                </nuxt-link>
                <button
                    v-if="!isLoggedIn"
                    @click="login"
                    class="text-2xl font-bold bg-black text-white py-2 px-4 rounded hover:bg-white hover:text-black"
                >Iniciar sesion</button>
                <button
                    v-if="isLoggedIn"
                    @click="logout"
                    class="text-2xl font-bold bg-black text-white py-2 px-4 rounded hover:bg-white hover:text-black"
                >Cerrar sesion</button>
                <nuxt-link to="/auth/sign-up">
                    <button
                        v-if="!isLoggedIn"
                        @click="login"
                        class="text-2xl font-bold bg-black text-white py-2 px-4 rounded hover:bg-white hover:text-black"
                    >Registrate</button>
                </nuxt-link>
                <nuxt-link
                    to="/user/perfil"
                    v-if="isLoggedIn"
                >
                    <i class="fas fa-user fa-lg"></i>
                </nuxt-link>
            </div>
        </div>
    </nav>
</template>
  
<script>
export default {
    methods: {
        login() {
            this.$router.push('/')
        },
        logout() {
            this.$store.commit('authenticate', false);
            this.$router.push('/')
        }
    },
    computed: {
        isLoggedIn() {
            return this.$store.state.isAuthenticated;
        }
    }
}
</script>
  
<style scoped>
/* Add any extra styling here */
</style>

  