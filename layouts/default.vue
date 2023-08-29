<template>
    <div>
        <!-- Your TopBar Component -->
        <TopBar />

        <!-- This will be replaced by the page content -->
        <Nuxt />
    </div>
</template>
  
<script>
import TopBar from '~/components/Topbar.vue';

export default {
    components: {
        TopBar
    }
};
</script>
  