<!-- Usage:
You can use the new ReusableButton component as follows:
<ReusableButton :buttonText="$t('home.news.title')" :onClick="someFunction" />

To override default styles:
<ReusableButton :buttonText="$t('home.news.title')" buttonClass="custom-tailwind-styles" :onClick="someFunction" />

To add styles to the wrapping div:
<ReusableButton :buttonText="$t('home.news.title')" containerClass="mt-4" :onClick="someFunction" />
This component allows for flexibility in styling and functionality while keeping a default behavior if no customizations are provided.
-->
<template>
    <div :class="containerClass">
        <button :class="computedButtonClass" @click="handleClick">
            {{ buttonText }}
        </button>
    </div>
</template>

<script>
export default {
    props: {
        buttonText: {
            type: String,
            required: true
        },
        buttonClass: {
            type: String,
            default: "lg:px-12 px-6 md:px-8 py-2 bg-black text-white border-1 border-yellow-500 rounded-2xl"
        },
        containerClass: {
            type: String,
            default: ""
        },
        onClick: {
            type: Function,
            default: () => { }
        }
    },
    computed: {
        computedButtonClass() {
            return this.buttonClass;
        }
    },
    methods: {
        handleClick() {
            this.$emit('handle-click');
        }
    }
}
</script>

<style scoped>
/* Add any necessary CSS here if needed */
</style>
