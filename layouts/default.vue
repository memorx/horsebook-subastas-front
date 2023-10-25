<template>
    <div>
        <!-- Your TopBar Component -->
        <Topbar />

        <!-- This will be replaced by the page content -->
        <Nuxt />
        <Footer />
    </div>
</template>

<script>
import Topbar from '~/components/Topbar.vue';
import Footer from '../components/Footer.vue';

export default {
    components: {
    Topbar,
    Footer
}
};
</script>
