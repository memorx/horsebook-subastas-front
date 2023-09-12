<template>
    <div class="flex-grow tool-tip-container">
        <button
            class="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700 duration-100 flex-grow w-full"
            v-bind:class="{ disabled: isNotAuthenticated }"
            type="submit"
        >{{ buttonText }}</button>
        <span 
            class="tool-tip-text"
            v-bind:class="{ show: isNotAuthenticated }"
        >
            <p>{{ hoverText }}</p>
        </span>
    </div>

</template>

<script>
export default {
    name: "SubmitAuthenticatedButton",
    props: {
        buttonText: { type: String },
    },
    data() {
        return {
            hoverMessage: {
                notLoggedIn: "Inicia sesión para ofertar",
                notAuthorized: "No estás autorizado para ofertar. Comunícate con administrador",
            },
            isNotAuthenticated: !this.isUserAuthenticated() || !this.isUserAbleToBid(),
            hoverText: ''
        }
    },
    created() {
        if (!this.isUserAuthenticated()) {
            this.hoverText = this.hoverMessage.notLoggedIn;
        }

        if(!this.isUserAbleToBid()){
            this.hoverText = this.hoverMessage.notAuthorized
        }

        const isUserLoggedIn = localStorage.getItem('setUser');
        if (!isUserLoggedIn) {
            this.hoverText = this.hoverMessage.notLoggedIn;
        }
    },
    methods: {
        isUserAuthenticated() {
            const userState = this.$store.state.isAuthenticated;
            if(userState){
                return userState;
            }
            else {
                return false
            }
        },
        isUserAbleToBid() {
            return this.$store.state.isUserAbleToBid
        }
    }
}
</script>

<style>

.disabled {
    pointer-events: none;
    opacity: 0.3;
    cursor: not-allowed;
}

.tool-tip-container {
    position: relative;
    cursor: pointer;
}

.tool-tip-text {
    display: none;
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
    display: block;
    top: -130%;
    visibility: visible;
    opacity: 0.9;
}

</style>