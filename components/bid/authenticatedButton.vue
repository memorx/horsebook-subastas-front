<template>
    <div class="flex-grow tool-tip-container">
        <button
            class="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700 duration-100 flex-grow"
            v-bind:class="{ disabled: isNotAuthenticated }"
            type="submit"
        >Ofertar</button>
        <span 
            class="tool-tip-text"
            v-bind:class="{ show: isNotAuthenticated }"
        >
            <p>Usario no verificado. Comunícate con el administrador</p>
        </span>
    </div>

</template>

<script>
export default {
    name: "AuthenticatedButton",
    data() {
        return {
            isNotAuthenticated: false // this.isUserAuthenticated()
        }
    },
    methods: {
        isUserNotAuthenticated() {
            return !this.$store.state.isAuthenticated;
        },
        submitForm() {
            this.$emit('authenticatedSumbit')
        }
    }
}
</script>

<style>

.disabled {
    pointer-events: none;
    cursor: not-allowed;
    opacity: 0.3;
}

.tool-tip-container {
    position: relative;
    cursor: pointer;
}

.tool-tip-text {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    color: white;
    background-color: gray;
    white-space: nowrap;
    padding: 5px 20px;
    border-radius: 7px;
    opacity: 0;
}

.tool-tip-container:hover .tool-tip-text.show {
    top: -130%;
    visibility: visible;
    opacity: 1;
}

</style>