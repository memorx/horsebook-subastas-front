<template>
    <div class="relative bg-black rounded-lg overflow" style="padding-bottom: 62.5%;"
        :class="{ 'enlarged-image': isImageEnlarged }">

        <transition name="fade" mode="out-in">
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

        </transition>

        <!-- Left Arrow -->
        <button @click="prevImage"
            class="z-100 font-black text-white absolute top-1/2 left-0 transform -translate-y-1/2 p-4">
            <svg width="40px" height="40px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
                fill="#000000">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <title>chevron-left-circle</title>
                    <desc>Created with Sketch Beta.</desc>
                    <defs> </defs>
                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
                        <g id="Icon-Set-Filled" sketch:type="MSLayerGroup"
                            transform="translate(-570.000000, -1037.000000)" fill="#000000">
                            <path
                                d="M590.535,1060.12 C590.926,1060.51 590.926,1061.14 590.535,1061.54 C590.145,1061.93 589.512,1061.93 589.121,1061.54 L581.465,1053.88 C581.225,1053.64 581.15,1053.31 581.205,1053 C581.15,1052.69 581.225,1052.36 581.465,1052.12 L589.121,1044.46 C589.512,1044.07 590.145,1044.07 590.535,1044.46 C590.926,1044.86 590.926,1045.49 590.535,1045.88 L583.414,1053 L590.535,1060.12 L590.535,1060.12 Z M586,1037 C577.163,1037 570,1044.16 570,1053 C570,1061.84 577.163,1069 586,1069 C594.837,1069 602,1061.84 602,1053 C602,1044.16 594.837,1037 586,1037 L586,1037 Z"
                                id="chevron-left-circle" sketch:type="MSShapeGroup"> </path>
                        </g>
                    </g>
                </g>
            </svg>
        </button>
        <!-- Right Arrow -->
        <button @click="nextImage"
            class="z-101 font-black text-white absolute top-1/2 right-0 transform -translate-y-1/2 p-4">
            <svg width="40px" height="40px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
                fill="#000000">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <title>chevron-right-circle</title>
                    <desc>Created with Sketch Beta.</desc>
                    <defs> </defs>
                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
                        <g id="Icon-Set-Filled" sketch:type="MSLayerGroup"
                            transform="translate(-102.000000, -1089.000000)" fill="#000000">
                            <path
                                d="M122.536,1105.88 L114.879,1113.54 C114.488,1113.93 113.855,1113.93 113.464,1113.54 C113.074,1113.14 113.074,1112.51 113.464,1112.12 L120.586,1105 L113.464,1097.88 C113.074,1097.49 113.074,1096.86 113.464,1096.46 C113.855,1096.07 114.488,1096.07 114.879,1096.46 L122.536,1104.12 C122.775,1104.36 122.85,1104.69 122.795,1105 C122.85,1105.31 122.775,1105.64 122.536,1105.88 L122.536,1105.88 Z M118,1089 C109.164,1089 102,1096.16 102,1105 C102,1113.84 109.164,1121 118,1121 C126.836,1121 134,1113.84 134,1105 C134,1096.16 126.836,1089 118,1089 L118,1089 Z"
                                id="chevron-right-circle" sketch:type="MSShapeGroup"> </path>
                        </g>
                    </g>
                </g>
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
            console.log('inicia interval')
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