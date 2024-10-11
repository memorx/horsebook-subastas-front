<template>
    <div class="relative bg-black rounded-lg overflow" style="padding-bottom: 62.5%;"
        :class="{ 'enlarged-image': isImageEnlarged }">

        <iframe v-if="currentImage !== null && typeof currentImage === 'object'"
            class="rounded-lg absolute inset-0 w-full h-full object-cover" :src="currentImage.video_url
        ? `https://www.youtube.com/embed/${extractYouTubeId(currentImage.video_url)}?rel=0`
        : `https://www.youtube.com/embed/ivGNj_t6S2c`
        " frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
        </iframe>
        <img v-else-if="currentImage" :key="currentImage"
            class="rounded-lg absolute inset-0 w-full h-full object-cover" :src="currentImage" alt="image"
            loading="lazy" @click="toggleEnlargeImage(currentImage)">
        <div class="flex absolute inset-0 flex-grow lg:mx-0 bg-gray-500 justify-center items-center rounded-lg"
            v-else>
            <img class="opacity-90 h-1/2" src="../public/image_la_silla.png" alt="Default Horse" />
        </div>

        <!-- Left Arrow -->
        <button @click="manualNavigate('prev')"
            class="z-100 font-black text-white absolute top-1/2 left-0 transform -translate-y-1/2 p-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
        </button>
        <!-- Right Arrow -->
        <button @click="manualNavigate('next')"
            class="z-101 font-black text-white absolute top-1/2 right-0 transform -translate-y-1/2 p-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
        </button>
    </div>
</template>

<script>
import { extractYouTubeId } from '~/utils/youtubeUtils'

export default {
    name: 'Carousel',
    props: {
        images: {
            type: Array,
            default: () => []
        },
        autoTransition: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            currentImageIndex: 0,
            enlargedImageIndex: null,
            isMobile: false
        }
    },
    mounted() {
        this.startCarousel();
    },
    beforeDestroy() {
        clearInterval(this.imageInterval);
    },
    methods: {
        extractYouTubeId,
        startCarousel() {
            clearInterval(this.imageInterval)
            this.currentImageIndex = 0
            if (this.autoTransition)
                this.startInterval()
        },
        startInterval() {
            this.imageInterval = setInterval(() => {
                this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
            }, 7000);
        },
        stopInterval() {
            if (this.imageInterval) {
                clearInterval(this.imageInterval);
                this.imageInterval = null;
            }
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
        },
        checkMobile() {
            return window.innerWidth <= 768
        },
        toggleEnlargeImage(clickedImage) {
            if (clickedImage !== undefined) {
                if (this.enlargedImageIndex === null || this.enlargedImageIndex !== this.currentImageIndex) {
                    this.enlargedImageIndex = this.currentImageIndex;
                    clearInterval(this.imageInterval);
                } else {
                    this.enlargedImageIndex = null;
                    clearInterval(this.imageInterval);
                    if (this.autoTransition) this.startInterval();
                }
            }
        },
        closeEnlargeImage() {
            this.enlargedImageIndex = null
            this.startInterval()
        },
        manualNavigate(direction) {
            this.stopInterval();
            if (direction === 'prev') {
                this.prevImage();
            } else {
                this.nextImage();
            }
        }
    },
    computed: {
        currentImage() {
            return this.images[this.currentImageIndex];
        },
        isImageEnlarged() {
            return this.enlargedImageIndex !== null;
        }
    }
}
</script>

<style scoped>
.enlarged-image {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    object-fit: contain;
    z-index: 9998;
}
</style>