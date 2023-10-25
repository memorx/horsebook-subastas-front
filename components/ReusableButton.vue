<!-- Usage:
The ReusableButton component can be employed in various ways:

1. For basic usage with a callback function:
<ReusableButton :buttonText="$t('home.news.title')" :onClick="someFunction" />

This will execute the `someFunction` when the button is clicked. Note that you can also listen to the 'handle-click' event emitted by the component as an alternative or in addition to using the `onClick` prop.

2. To customize button styles:
<ReusableButton :buttonText="$t('home.news.title')" buttonClass="custom-tailwind-styles" :onClick="someFunction" />

The `buttonClass` prop allows for overriding or extending the default Tailwind CSS styles of the button.

3. To style the button's container/wrapping div:
<ReusableButton :buttonText="$t('home.news.title')" containerClass="mt-4" :onClick="someFunction" />

Use the `containerClass` prop to add or override styles to the button's outer container.

4. To listen to the click event using Vue's event system:
<ReusableButton :buttonText="$t('home.news.title')" @handle-click="someOtherFunction" />

This approach utilizes Vue's event system and can be used in conjunction with, or in place of, the `onClick` prop. The `someOtherFunction` will be executed when the button is clicked.

The ReusableButton component is designed for flexibility in styling and functionality while preserving a default behavior if no customizations are provided.
-->
<template>
    <div :class="containerClass">
        <button :type="type"
            :class="['lg:px-12 px-6 md:px-8 py-2 bg-black text-white border-1 border-custom-gold rounded-2xl', buttonClass || '']"
            @click="handleClick">
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
            default: ''
        },
        containerClass: {
            type: String,
            default: ""
        },
        onClick: {
            type: Function,
            default: () => { }
        },
        type: {
            type: String,
            default: "button"
        },

    },
    methods: {
        handleClick() {
            this.onClick();
            this.$emit('handle-click');
        }
    }
}
</script>

<style scoped>
/* Add any necessary CSS here if needed */
</style>
