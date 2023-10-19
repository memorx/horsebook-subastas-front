<template>
    <div :class="['p-4 w-11/12 sm:w-4/5 rounded-md', classOverrides.container || '']">
        <component :is="`h${headingLevel}`" :class="['font-bold', classOverrides.title || '']">{{ title }}
        </component>
        <p :class="[classOverrides.paragraph || '']">{{ paragraph }}</p>
        <button v-if="buttonLabel" @click="buttonAction"
            :class="['mt-4 px-4 py-2 bg-black text-white rounded-2xl', classOverrides.button || '']">
            {{ buttonLabel }}
        </button>
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
        classOverrides: {  // Updated prop
            type: Object,
            default: () => ({})
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
