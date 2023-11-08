<template>
    <div>
        <div :class="`bg-contain bg-start bg-no-repeat bg-[url('/${bgImage}')] bg-light-mode`">
            <!-- Your TopBar Component -->
            <Topbar layoutMode="lightMode" />

            <!-- This will be replaced by the page content -->
            <Nuxt />
        </div>
        <Footer layoutMode="lightMode" />
    </div>
</template>

<script>
import Topbar from '~/components/Topbar.vue';
import Footer from '../components/Footer.vue';
export default {
    components: {
        Topbar,
        Footer
    },
    computed: {
        bgImage() {
            return this.$store.state.bgImage;
        }
    }
};
</script>
