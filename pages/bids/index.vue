<template>
    <div class="w-full h-screen">

    </div>
</template>
<script>

export default {
    mounted() {
        this.$store.commit('setLayoutMode', 'lightMode'); // set to 'lightMode' or 'default'
        this.$store.commit('setTextColorTopBar', 'tex-black'); // set to 'text-black' or 'text-white'
    },
    beforeDestroy() {
        this.$store.commit('setLayoutMode', 'default'); // reset to default when leaving the page
        this.$store.commit('setTextColorTopBar', 'text-white'); // reset to default when leaving the page
    },
}
</script>
