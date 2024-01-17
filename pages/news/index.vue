<template>
    <div class="w-full h-auto flex flex-col justify-start p-0">
        <div class="w-10/12 mx-auto mt-6 mb-3">
            <SectionTitle :titleText="$t('home.news.title')" ref="newsSection"
                containerClass="flex flex-col items-center lg:items-start w-full md:mt-16 lg:mt-20 mt-8 md:mb-8"
            titleClass="text-white text-4xl md:text-7xl lg:text-8xl font-bold uppercase opacity-20" />
        </div>
        <div class="w-full py-5 md:py-12 bg-[#F4F4F4]">
            <div class="flex-grow w-full md:w-10/12 mx-auto">
                <!-- Cards Container -->
                <div class="w-full h-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 p-4">
                    <!-- Dynamic Cards -->
                    <div v-for="item in news" :key="item.id" class="h-[200px] md:h-[500px] w-full relative bg-white shadow-2xl">
                        <!-- Card content -->
                        <div class="w-full h-1/2 flex items-center justify-center">
                            <img :src="item.image1" alt="horse"
                                class="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity">
                        </div>
                        <div class="h-1/2 w-full md:w-full font-roboto p-1 md:p-3 flex flex-col justify-between">
                            <div class="mb-auto w-full bg-white font-roboto flex flex-col mt-0 md:mt-3">
                                <div>
                                    <h3 class="font-roboto text-left uppercase text-[10px] md:text-xl xl:text-xl font-bold">{{ item.title }}</h3>
                                    <p class="font-roboto text-left text-[7px] md:text-sm xl:text-lg overflow-hidden">
                                        {{ item.previous_text }}
                                    </p>
                                </div>
                            </div>
                            <div class="mt-auto w-full flex items-left p-0">
                                <NuxtLink :to="localePath(`/news/${item.id}`)"  class="uppercase flex flex-row items-left font-roboto font-bold text-[9px] md:text-lg lg:text-sm xl:text-base">
                                    {{ $t('home.news.buttonViewMore') }}
                                    <span class="mr-2 w-1 md:w-3 md:mr-3 lg:w-2 lg:mr-2 xl:w-3 xl:mr-3 lg:mb-1">
                                        &#8594;
                                    </span>
                                </NuxtLink>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>

export default {
    data() {
        return {
            news: []
        }
    },
    mounted() {
        this.fetchNews()
        this.$store.commit('setLayoutMode', 'default'); // set to 'lightMode' or 'default'
        this.$store.commit('setTextColorTopBar', 'text-white'); // set to 'text-black' or 'text-white'
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
        }
    },
    methods: {
        async fetchNews() {
            this.news = []
            const url = `${this.$config.baseURL}/post/`
            this.loading = true
            await this.$axios
                .get(url, {
                    headers: {
                    'Content-Type': 'multipart/form-data',
                    },
                })
                .then((response) => {
                return (this.news = response.data), (this.loading = false)
                })
                .catch((error) => {
                this.loading = false;
                })
        },

    }
}
</script>
