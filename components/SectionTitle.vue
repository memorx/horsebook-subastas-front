<!--
USAGE INSTRUCTIONS FOR `SectionTitle` COMPONENT:

1. **Using the component with default styles and classes**:
Simply provide the title text.
Example:
<SectionTitle :titleText="'Sample Title'" />

2. **Overriding default Tailwind classes**:
Provide `containerClass` and `titleClass` to apply custom Tailwind styles.
Example:
<SectionTitle
    :titleText="'Styled Title'"
    containerClass="bg-blue-500 p-4"
    titleClass="text-red-600 text-3xl font-medium"
/>

3. **Combining default and custom Tailwind classes**:
Combine default and custom classes to achieve the desired design.
Example:
<SectionTitle
    :titleText="'Combined Title'"
    containerClass="w-full bg-blue-300 p-4"
    titleClass="text-white text-5xl font-bold uppercase hover:text-red-600"
/>

This component provides flexibility in styling using Tailwind CSS.
-->

<template>
    <div :class="computedContainerClass">
        <h2 :class="computedTitleClass">{{ titleText }}</h2>
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
        }
    },
    computed: {
        computedContainerClass() {
            return this.containerClass;
        },
        computedTitleClass() {
            return this.titleClass;
        }
    }
}
</script>

<style scoped>
/* Add any necessary CSS here if needed, although the goal is to primarily use Tailwind */
</style>
