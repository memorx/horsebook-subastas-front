<template>
    <footer :class="['p-6', backgroundColor, textColor]">
        <div class="hidden lg:grid container mx-auto grid-cols-4 gap-8">

            <!-- 1. Logo -->
            <div>
                <nuxt-link to="/">
                    <img src="../public/image_la_silla.png" alt="logo" style="width: 60px;">
                </nuxt-link>
            </div>

            <!-- 2. Navigation Links -->
            <div>
                <h3 :class="classTittleSection">{{ $t('footer.navigate') }}</h3>
                <ul class="font-roboto capitalize">
                    <li><nuxt-link :class="activePageClass('/')" to="/">{{ $t('topBar.home') }}</nuxt-link></li>
                    <li><nuxt-link :class="activePageClass('/bids')" to="/bids">{{ $t('topBar.bids') }}</nuxt-link></li>
                    <li><nuxt-link :class="activePageClass('/us')" to="/us">{{ $t('topBar.us') }}</nuxt-link></li>
                    <li><nuxt-link :class="activePageClass('/news')" to="/news">{{ $t('topBar.news') }}</nuxt-link></li>
                    <li><nuxt-link :class="activePageClass('/contact')" to="/contact">{{ $t('topBar.contact') }}</nuxt-link>
                    </li>
                </ul>
            </div>

            <!-- 3. Contact Us + Policies -->
            <div>
                <h3 :class="classTittleSection">Contact Us</h3>
                <div class="font-robotom capitalize">
                    <p>123 Main St, City, Country</p>
                    <p>{{ $t('footer.email') }}: <span class="normal-case">lasilla@hipicolasilla.com</span></p>
                    <p>{{ $t('footer.phone') }}: +52 81 81550100</p>
                </div>

                <h3 :class="[classTittleSection, 'mt-6']">Policies</h3>
                <ul>
                    <li><nuxt-link to="/terms">Terms & Conditions</nuxt-link></li>
                    <li><nuxt-link to="/privacy">Privacy Policy</nuxt-link></li>
                </ul>
            </div>

            <!-- 4. Follow Us + Social Icons -->
            <div>
                <h3 :class="classTittleSection">Follow Us</h3>
                <div class="flex space-x-4">
                    <i class="fab fa-instagram fa-2x"></i>
                    <i class="fab fa-facebook fa-2x"></i>
                    <i class="fab fa-youtube fa-2x"></i>
                </div>
            </div>

        </div>
    </footer>
</template>

<script>
export default {
    props:{
        layoutMode: {
            type: String,
            default: 'default'
        }
    },
    computed: {
        backgroundColor() {
            return this.layoutMode === 'lightMode' ? 'bg-light-mode' : 'bg-black';
        },
        textColor() {
            return this.layoutMode === 'lightMode' ? 'text-black' : 'text-white';
        },
        activePageClass() {
            return (route) => {
                return this.$route.path === route ? 'text-custom-gold' : this.layoutMode === 'lightMode' ? 'text-black' : 'text-white';
            }
        },
        classTittleSection() {
            return "font-roboto font-bold mb-3 capitalize"
        }
    },
    methods: {
        activePage(route) {
            return this.$route.path === route;
        }
    }
}
</script>

<style scoped>
/* Add any extra styling for the footer here */
</style>
