<template>
    <div :class="containerClass" :style="computedStyles.container">
        <h2 :class="titleClass" :style="computedStyles.title">{{ titleText }}</h2>
    </div>
</template>

<script>
export default {
    props: {
        titleText: {
            type: String,
            required: true
        },
        containerClass: {
            type: String,
            default: 'w-full text-center mb-8'
        },
        titleClass: {
            type: String,
            default: 'text-white text-5xl font-bold uppercase'
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
                    color: '#333',
                }
            };
        },
        computedStyles() {
            const styles = { ...this.defaultStyles };
            if (this.styles.container) styles.container = { ...styles.container, ...this.styles.container };
            if (this.styles.title) styles.title = { ...styles.title, ...this.styles.title };
            return styles;
        }
    }
}
</script>
