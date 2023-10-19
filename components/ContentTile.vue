<template>
    <div :style="computedStyles.container" class="p-4 w-11/12 sm:w-4/5 rounded-md">
        <component :is="`h${headingLevel}`" :style="computedStyles.title" class="text-xl sm:text-2xl font-bold">{{ title }}
        </component>
        <p :style="computedStyles.paragraph">{{ paragraph }}</p>
        <button v-if="buttonLabel" @click="buttonAction" :style="computedStyles.button"
            class="mt-4 px-4 py-2 bg-black text-white rounded-2xl">{{ buttonLabel }}</button>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },
        paragraph: {
            type: String,
            required: true
        },
        buttonLabel: {
            type: String,
            default: null
        },
        headingLevel: {
            type: [String, Number],
            default: '1',
            validator: (value) => {
                const num = Number(value);
                return num >= 1 && num <= 6;
            }
        },
        styles: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        defaultStyles() {
            return {
                container: {
                    backgroundColor: 'transparent'
                },
                title: {
                    color: '#333'
                },
                paragraph: {
                    color: '#555'
                },
                button: {
                    backgroundColor: 'black',
                    color: 'white'
                }
                // ... any other default styles you want
            };
        },
        computedStyles() {
            const styles = { ...this.defaultStyles };
            if (this.styles.container) styles.container = { ...styles.container, ...this.styles.container };
            if (this.styles.title) styles.title = { ...styles.title, ...this.styles.title };
            if (this.styles.paragraph) styles.paragraph = { ...styles.paragraph, ...this.styles.paragraph };
            if (this.styles.button) styles.button = { ...styles.button, ...this.styles.button };
            return styles;
        }
    },
    methods: {
        buttonAction() {
            this.$emit('button-clicked');
        }
    }
}
</script>

<style scoped>
/* You can add any specific styles for the ContentTile here */
</style>
