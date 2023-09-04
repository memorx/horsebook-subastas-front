<template>
    <div>
        <!-- Your TopBar Component -->
        <TopBar />

        <!-- This will be replaced by the page content -->
        <Nuxt />
    </div>
</template>
  
<script>
import Topbar from '~/components/TopBar.vue';

export default {
    components: {
        Topbar
    }
};
</script>
  