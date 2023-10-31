<template>
  <div class="flex-grow tool-tip-container">
    <button class="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700 duration-100 flex-grow w-full"
      v-bind:class="{ disabled: !isAuthenticated || !isAbleToBid }" type="button" @click="enableModal">
      {{ buttonText }}
    </button>
    <span v-bind:class="{ show: !isAuthenticated || !isAbleToBid }" class="tool-tip-text">
      <p>{{ hoverText }}</p>
    </span>
  </div>
</template>

<script>
import axios from "axios"
import getUserTokenOrDefault from "../../utils/getUserTokenOrDefault"
import JWTDecode from "jwt-decode"

export default {
  name: "SubmitAuthenticatedButton",
  props: {
    buttonText: { type: String },
    enableModal: { type: Function }
  },
  data() {
    return {
      hoverMessage: {
        notLoggedIn: "Inicia sesión",
        notAuthorized:
          "No estás autorizado para ofertar. Comunícate con el administrador al número: "
      },
      isAuthenticated: null,
      isAbleToBid: null,
      hoverText: "",
      userId: "",
      adminPhone: "",
    }
  },
  async created() {},
  async mounted() {
    this.updateStatusUser()
  },
  watch: {
    // watch for changes in the user state
    '$store.state.isAuthenticated': 'updateStatusUser',
    '$store.state.isUserAbleToBid': 'updateStatusUser'
  },
  methods: {
    isUserAuthenticated() {
      const userState = this.$store.state.isAuthenticated
      if (userState) {
        return userState
      } else {
        return false
      }
    },
    isUserAbleToBid(update) {
      return this.$store.state.isUserAbleToBid
    },
    getToolTipMessage(isAuthenticated, isAbleToBid, adminPhone) {
      if (!isAuthenticated) {
        return this.hoverMessage.notLoggedIn
      }

      if (!isAbleToBid) {
        return this.getNotAuthorizedUserMessage(adminPhone)
      }

      return this.hoverMessage.notLoggedIn
    },
    getNotAuthorizedUserMessage(administratorPhone) {
      return `${this.hoverMessage.notAuthorized} ${administratorPhone}`
    },
    async fetchAdministratorPhone() {
      const url = `${this.$config.baseURL}/contact/info/`
      const token = getUserTokenOrDefault()

      if (token) {
        const administratorPhone = await axios
          .get(url, {
            headers: {
              Authorization: `Token ${token}`
            }
          })
          .then((response) => {
            return response.data.app_user_profile.phone.replace("T. ", "")
          })
          .catch((error) => {
            console.error("Error retrieving administrator phone: ", error)
            return ""
          })

        return administratorPhone
      } else {
        return ""
      }
    },
    updateStatusUser() {
      // update the user data
      this.$data.isAuthenticated = this.isUserAuthenticated()
      this.$data.isAbleToBid = this.isUserAbleToBid()

      // changes the hover text
      this.$data.hoverText = this.getToolTipMessage(
        this.$data.isAuthenticated,
        this.$data.isAbleToBid,
        this.$data.adminPhone
      )
    },
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
  display: block;
  position: absolute;
  max-width: 600px;
  left: 50%;
  top: -0.25rem;
  transform: translateX(-50%) translateY(-100%);
  color: white;
  background-color: gray;
  padding: 5px 20px;
  border-radius: 7px;
  opacity: 0;
}

.tool-tip-container:hover .tool-tip-text.show {
  display: block;
  position: absolute;
  visibility: visible;
  opacity: 0.9;
}
</style>
