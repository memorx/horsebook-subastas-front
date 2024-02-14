<template>
    <footer :class="['p-10', backgroundColor, textColor, borderColor]">
        <!--Web footer-->
        <div class="hidden lg:grid container mx-auto grid-cols-4 gap-8">

            <!-- 1. Logo -->
            <div>
                <nuxt-link :to="localePath('/')">
                    <img src="../public/image_la_silla.png" alt="logo" style="width: 60px;">
                    <p class="text-xs">© 2023 STUDBOOK LA SILLA. A.C.</p>
                </nuxt-link>
            </div>

            <!-- 2. Navigation Links -->
            <div>
                <h3 :class="classTittleSection">{{ $t('footer.navigate') }}</h3>
                <ul class="font-roboto capitalize">
                    <li><nuxt-link :class="activePageClass('/')" :to="localePath('/')">{{ $t('topBar.home') }}</nuxt-link></li>
                    <li><nuxt-link :class="activePageClass('/user/inicio')" :to="localePath('/user/inicio')">{{ $t('topBar.bids') }}</nuxt-link></li>
                    <li>
                        <button
                            class="capitalize"
                           @click="handleScrollIntoContact">
                            {{ $t('topBar.contact') }}
                        </button>
                    </li>
                    <li>
                        <nuxt-link :class="activePageClass('/auth/sign-up')" :to="localePath('/auth/sign-up')">
                            {{ $t('topBar.signUp') }}
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link :class="activePageClass('/auth/login')" :to="localePath('/auth/login')">
                            {{ $t('topBar.logIn') }}
                        </nuxt-link>
                    </li>
                </ul>
            </div>

            <!-- 3. Contact Us -->
            <div>
                <h3 :class="classTittleSection">
                    {{ $t('topBar.contact') }}
                </h3>
                <div class="font-robotom capitalize">
                    <p><span class="normal-case">{{ contactInfo.email }}</span></p>
                    <p>{{ contactInfo?.app_user_profile?.phone }}</p>
                </div>

                <!-- <h3 :class="[classTittleSection, 'mt-6']">Policies</h3>
                <ul>
                    <li><nuxt-link to=/terms">Terms & Conditions</nuxt-link></li>
                    <li><nuxt-link to="/privacy">Privacy Policy</nuxt-link></li>
                </ul> -->
            </div>

            <!-- 4. Follow Us + Social Icons -->
            <div>
                <h3 :class="classTittleSection">
                    {{ $t('footer.followUs') }}
                </h3>
                <div class="flex space-x-4">
                    <a target="blank" href="https://www.instagram.com/clubhipicolasilla">
                        <i class="fab fa-instagram fa-2x"></i>
                    </a>
                    <a target="blank" href="https://www.facebook.com/clubhipicolasilla">
                        <i class="fab fa-facebook fa-2x"></i>
                    </a>
                    <a target="blank" href="https://www.youtube.com/@clubhipicolasilla6195">
                        <i class="fab fa-youtube fa-2x"></i>
                    </a>
                </div>
            </div>

        </div>
        <!--Mobile footer-->
        <div class="lg:hidden flex flex-wrap justify-between  px-4">
            <!-- Logo -->
            <div class="w-full mb-6 text-center">
                <nuxt-link :to="localePath('/')">
                    <img src="../public/image_la_silla.png" alt="logo" class="mx-auto" style="width: 60px;">
                    <p class="text-xs">© 2023 STUDBOOK LA SILLA. A.C.</p>
                </nuxt-link>
            </div>

            <!-- Navigation Links -->
            <div class="w-1/2 mb-6">
                <h3 :class="classTittleSection">{{ $t('footer.navigate') }}</h3>
                <ul class="font-roboto capitalize">
                    <li><nuxt-link :class="activePageClass('/')" :to="localePath('/')">{{ $t('topBar.home') }}</nuxt-link></li>
                    <li><nuxt-link :class="activePageClass('/user/inicio')" :to="localePath('/user/inicio')">{{ $t('topBar.bids') }}</nuxt-link></li>
                    <li>
                        <button
                            class="capitalize"
                           @click="handleScrollIntoContact">
                            {{ $t('topBar.contact') }}
                        </button>
                    </li>
                    <li>
                        <nuxt-link :class="activePageClass('/auth/sign-up')" :to="localePath('/auth/sign-up')">
                            {{ $t('topBar.signUp') }}
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link :class="activePageClass('/auth/login')" :to="localePath('/auth/login')">
                            {{ $t('topBar.logIn') }}
                        </nuxt-link>
                    </li>
                </ul>
            </div>

            <!-- Contact Us -->
            <div class="w-1/2 mb-6">
                <h3 :class="classTittleSection">
                    {{ $t('topBar.contact') }}
                </h3>
                <div class="font-roboto capitalize">
                    <p><span class="normal-case">{{ contactInfo.email }}</span></p>
                    <p>{{ contactInfo?.app_user_profile?.phone }}</p>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    data() {
        return {
            contactInfo: [],
        }
    },
    computed: {
        backgroundColor() {
            return this.$store.state.layoutMode === 'lightMode' ? 'bg-light-mode' : 'bg-black';
        },
        textColor() {
            return  this.$store.state.textColorTopBar ? this.$store.state.textColorTopBar : 'text-white';
        },
        activePageClass() {
            return (route) => {
                return this.$route.path === route ? 'text-custom-gold' : this.textColor ;
            }
        },
        classTittleSection() {
            return "font-roboto font-bold mb-3 capitalize"
        },
        borderColor() {
            return this.$store.state.layoutMode === 'lightMode' ? 'border-custom-gold border-t' : '';
        }
    },
    mounted() {
        this.getContactInfo()
    },
    methods: {
        activePage(route) {
            return this.$route.path === route;
        },
        handleScrollIntoContact() {
            this.$emit('handle-close-menu')
            if (this.$route.path === '/') {
                this.$store.commit('setScrollIntoContact', true);
            } else {
                this.$router.push(this.localePath('/'))
                setTimeout(() => {
                    this.$store.commit('setScrollIntoContact', true);
                }, 1000);
            }
        },
        async getContactInfo() {
            this.contactInfo = []
            const url = `${this.$config.baseURL}/contact/info/`


            this.loading = true;
            await this.$axios
            .get(url)
            .then((response) => {
                this.contactInfo = { ...response.data }
                this.loading = false
            })
            .catch((error) => {
                this.loading = false
            });

        },
    }
}
</script>

<style scoped>
/* Add any extra styling for the footer here */
</style>
