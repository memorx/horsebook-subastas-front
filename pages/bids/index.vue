<template>
    <div class="w-full h-auto flex flex-col justify-start pt-4 px-6">
        <div class="flex-grow bg-[#EDEDED] rounded-lg">
            <!-- Cards Container -->
            <h2 class="p-4 font-roboto"><span class="font-bold">Invitado </span>| Regístrate  para poder ofertar en las subastas.</h2>
            <div class="w-full h-full grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                <!-- Replace with dynamic cards -->
                <div v-for="n in 6" :key="n" class="h-[350px] w-full bg-red-500 rounded">
                    Card {{ n }}
                </div>
            </div>
        </div>
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

