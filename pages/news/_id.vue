<template>
    <div class="bg-white w-full h-auto flex flex-col justify-start" v-if="post">
        <div
            class="overflow-hidden bg-cover bg-no-repeat h-96 text-center"
            :style="{ backgroundImage: 'url(' + post.image1 + ')' }">
            <div
                class="bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
                style="background-color: rgba(0, 0, 0, 0.3)">
                <div class="flex h-full items-center justify-center text-white">
                    <h2 class="mb-4 text-4xl font-semibold">{{ post.title }}</h2>
                </div>
            </div>
        </div>
        <div class="m-16 text-justify">
            {{ post.content }}
            <Carousel :images="images" class="w-full mt-8"/>
            <div class="text-gray-600 text-xs w-full text-right pt-4">{{ post.created }}</div>
        </div>
    </div>
    <div class="bg-white w-full h-auto flex flex-col justify-start pt-4 px-6" v-else>
        No news found
    </div>
</template>
<script>
import Carousel from "~/components/Carousel.vue"

export default {
    components: {
        Carousel
    },
    data () {
        return {
            id: null,
            post: null,
            images: null,
        }
    },
    async created() {
        this.id = this.$route.params.id
        await this.fetchData()
    },
    methods: {
        async fetchData(){
            const url = this.$config.baseURL + `/post/${this.id}`

            await this.$axios
                .get(url)
                .then((response) => {
                    this.post = response.data
                    this.images = [this.post.image2, this.post.image3]
                })
                .catch((error) => { console.log(error) })
        }

    }
}
</script>
