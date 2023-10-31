<template>
    <div>
        <!-- Your TopBar Component -->
        <Topbar />

        <!-- This will be replaced by the page content -->
        <Nuxt />
    </div>
</template>

<script>
import Topbar from '~/components/Topbar.vue';
import JWTDecode from "jwt-decode"
import Cookie from "js-cookie"

export default {
    async mounted() {
        await this.getUserInfo()
        this.checkAndInitializeWebSocket();
    },
    watch: {
        '$store.state.isAuthenticated': 'checkAndInitializeWebSocket',
        '$store.state.user': 'checkAndInitializeWebSocket',
        '$store.state.isUserAbleToBid': 'displayToast'
    },
    components: {
        Topbar
    },
    mounted() {
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
    },
    methods: {
        checkAndInitializeWebSocket() {
            console.log('Checking and initializing websocket');
            if (this.$store.state.isAuthenticated && this.$store.state.user.id) {
                this.$store.dispatch('initializeWebSocketUserStatus');
            }
        },
        displayToast() {
            if (this.$store.state.websocket) {
                if (this.$store.state.isUserAbleToBid) {
                    this.$toast.success('¡Has sido aprobado para ofertar!');
                } else {
                    this.$toast.error('¡Has sido rechazado para ofertar!');
                }
            }
        },
        async getUserInfo() {
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
        }
    },

};
</script>
