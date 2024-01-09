<template>
    <div
        class="relative bg-black rounded-lg overflow"
        style="padding-bottom: 62.5%;"
    >

        <transition
            name="fade"
            mode="out-in"
        >
            <img
                v-if="currentImage"
                :key="currentImage"
                class="rounded-lg absolute inset-0 w-full h-full object-cover"
                :src="currentImage"
                alt="image"
                loading="lazy"
            >
            <div
                class="flex absolute inset-0 flex-grow lg:mx-0 bg-gray-500 justify-center items-center rounded-lg"
                v-else
                >
                <img
                    class="opacity-90 h-1/2"
                    src="../public/image_la_silla.png"
                    alt="Default Horse"
                />
            </div>

        </transition>
        <!-- Left Arrow -->
        <button
            @click="prevImage"
            class="font-black text-white absolute top-1/2 left-0 transform -translate-y-1/2 p-4"
        >
            ←
        </button>
        <!-- Right Arrow -->
        <button
            @click="nextImage"
            class="font-black text-white absolute top-1/2 right-0 transform -translate-y-1/2 p-4"
        >
            →
        </button>
    </div>
</template>

<script>
export default {
    name: 'Carousel',
    props: {
        images: {
            type: Array,
            default: () => [],
        }
    },
    data() {
        return {
            currentImageIndex: 0
        }
    },
    mounted() {
        this.startCarousel();
    },
    beforeDestroy() {
        clearInterval(this.imageInterval);
    },
    methods: {
        startCarousel() {
            this.imageInterval = setInterval(() => {
                this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
            }, 7000);
        },
        prevImage() {
            if (this.currentImageIndex > 0) {
                this.currentImageIndex--;
            } else {
                this.currentImageIndex = this.images.length - 1;
            }
        },
        nextImage() {
            if (this.currentImageIndex < this.images.length - 1) {
                this.currentImageIndex++;
            } else {
                this.currentImageIndex = 0;
            }
        }
    },
    computed: {
        currentImage() {
            return this.images[this.currentImageIndex];
        }
    }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 1s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active in <2.1.8 */
    {
    opacity: 0;
}
</style>