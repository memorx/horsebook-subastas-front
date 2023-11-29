<template>
    <div class="w-full h-auto flex flex-col justify-start pt-4 px-6">
        <div class="flex-grow bg-[#EDEDED] rounded-lg mb-4 h-[2000px] ">
            <div class="w full h-auto mx-6 my-4 md:my-8">
                <button
                    class="uppercase border-1 border-black px-4 py-2 flex flex-row items-center font-roboto font-bold text-[9px] md:text-lg lg:text-sm xl:text-base">
                    <span class="mr-2 w-1 md:w-3 md:mr-3 lg:w-2 lg:mr-2 xl:w-3 xl:mr-3 lg:mb-1"><img
                            src="../../public/arrow-black.png" /></span>Regresar
                </button>
            </div>
            <div class="w full h-auto mx-6 my-4 md:my-8 relative">
                <button
                    class="w-auto absolute bg-[#58886E] top-0 right-0 text-white text-center text-[10px] md:text-base xl:text-base px-4 py-1 rounded-xl z-10 uppercase">En
                    vivo</button>
                <h1 class="text-base md:text-2xl lg:text-3xl  xl:text-4xl font-roboto font-extrabold">
                    MANGLAR LS LA SILLA
                </h1>
                <p class="text-xs md:text-lg lg:text-xl xl:text-2xl font-roboto font-semibold lg:font-bold uppercase"># de
                    lote</p>
                <p class="text-xs md:text-lg lg:text-xl xl:text-2xl font-roboto font-semibold lg:font-bold uppercase">
                    Monterrey, Nuevo León</p>
            </div>
            <div class="w-full h-auto px-0 relative">
                <img @click="prevImage" class="absolute z-10 cursor-pointer w-5 md:w-12 lg:w-14 top-[50%]"
                    src="../../public/arrow-gray.png" />
                <img @click="nextImage"
                    class="absolute z-10 cursor-pointer w-5 md:w-12 lg:w-14 top-[50%] right-0 rotate-180"
                    src="../../public/arrow-gray.png" />
                <img :src="currentImage" alt="" class="w-full h-1/3 md:h-1/2 lg:h-screen object-cover rounded-xl">
            </div>
        </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            images: ['/brown-horse.png', '/home-bg.jpg'], // Array of image URLs
            currentIndex: 0, // Index of the currently displayed image
        }
    },
    mounted() {
        this.$store.commit('setLayoutMode', 'lightMode'); // set to 'lightMode' or 'default'
        this.$store.commit('setTextColorTopBar', 'tex-black'); // set to 'text-black' or 'text-white'
    },
    beforeDestroy() {
        this.$store.commit('setLayoutMode', 'default'); // reset to default when leaving the page
        this.$store.commit('setTextColorTopBar', 'text-white'); // reset to default when leaving the page
    },
    computed: {
        isUserAuthenticated() {
            return this.$store.state.isAuthenticated;
        },
        displayedCards() {
            return this.isUserAuthenticated ? this.cards : this.guestCards;
        },
        currentImage() {
            return this.images[this.currentIndex];
        },
    },
    methods: {
        nextImage() {
            // Increment currentIndex, loop back to 0 if at the end of the array
            this.currentIndex = (this.currentIndex + 1) % this.images.length;
        },
        prevImage() {
            // Decrement currentIndex, loop back to the end of the array if at 0
            this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        },
    }
}
</script>

