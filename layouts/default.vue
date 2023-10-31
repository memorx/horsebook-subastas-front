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

export default {
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
};
</script>
