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
    }
};
</script>
