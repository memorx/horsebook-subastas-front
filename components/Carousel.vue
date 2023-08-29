<template>
    <div
        class="relative bg-black rounded-lg overflow"
        style="width: 100%; height: 400px;"
    >
        <!-- Left Arrow -->
        <button
            @click="prevImage"
            class="font-black text-white absolute top-1/2 left-0 transform -translate-y-1/2 p-4"
        >
            ←
        </button>

        <transition
            name="fade"
            mode="out-in"
        >
            <img
                :key="currentImage"
                class="rounded-lg"
                :src="currentImage"
                alt="image"
                style="width: 100%; height: 100%;"
            >
        </transition>

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