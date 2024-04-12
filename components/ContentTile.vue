<!-- Usage:
ContentTile component without any overrides (default behavior):
<ContentTile :title="'Sample Title'" :paragraph="'This is a sample paragraph.'" :buttonLabel="'Click Me'" @button-clicked="sampleMethod" />

Overriding styles with Tailwind classes:
<ContentTile :title="'Styled Title'" :paragraph="'This paragraph has been styled.'" :buttonLabel="'Styled Button'" @button-clicked="sampleMethod" :classOverrides="{ container: 'bg-blue-500', title: 'text-red-500',paragraph: 'text-yellow-500 italic', button: 'bg-green-500 hover:bg-green-700' }"
/>

ContentTile component with only a title and paragraph (no button):
<ContentTile :title="'Title Only'" :paragraph="'This is a sample paragraph without a button.'"/>
-->

<template>
    <div :class="['p-4 w-11/12 sm:w-4/5', classOverrides.container || '']">
        <component :is="`h${headingLevel}`" :class="['font-bold', classOverrides.title || '']">{{ title }}
        </component>
        <p :class="[classOverrides.paragraph || '']">{{ paragraph }}</p>
        <p v-if="paragraph2" :class="[classOverrides.paragraph || '']">{{ paragraph2 }}</p>
        <button v-if="buttonLabel" @click="buttonAction"
            :class="['px-4 py-2 bg-black text-white rounded-3xl', classOverrides.button || '']">
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
        paragraph2: {
            type: String,
            required: false
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
