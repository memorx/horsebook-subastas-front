<template>
  <div class="flex-grow tool-tip-container">
    <button
      class="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700 duration-100 flex-grow w-full mb-3"
      :class="{ 'opacity-30 cursor-not-allowed': !isAuthenticated || !isAbleToBid }"
      type="button"
      @click="handleClick"
      :disabled="!isAuthenticated || !isAbleToBid"
    >
      {{ buttonText }}
    </button>
    <span :class="{ show: !isAuthenticated || !isAbleToBid }" class="hidden md:visible tool-tip-text">
      <p>{{ hoverText }}</p>
    </span>
    <div v-if="!isAuthenticated || !isAbleToBid" class="md:hidden pb-5">
      <NuxtLink :to="localePath('/auth/login')" class="font-bold border-1 border-gray-500 px-3 py-2">
        {{ hoverText }}
      </NuxtLink>
    </div>
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
        notLoggedIn: this.$t('auction.notLoggedInMsg'),
        notAuthorized: this.$t('auction.notAuthorizedMsg')
      },
      isAuthenticated: false,
      isAbleToBid: false,
      hoverText: "",
      userId: "",
      adminPhone: "",
    }
  },
  async mounted() {
    await this.initializeComponent()
  },
  watch: {
    '$store.state.isAuthenticated': 'updateStatusUser',
    '$store.state.isUserAbleToBid': 'updateStatusUser'
  },
  methods: {
    async initializeComponent() {
      this.adminPhone = await this.fetchAdministratorPhone()
      this.updateStatusUser()
    },
    handleClick() {
      if (this.isAuthenticated && this.isAbleToBid) {
        this.enableModal()
      } else {
        console.log('Button is disabled')
      }
    },
    isUserAuthenticated() {
      return !!this.$store.state.isAuthenticated
    },
    isUserAbleToBid() {
      return !!this.$store.state.isUserAbleToBid
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
        try {
          const response = await axios.get(url, {
            headers: { Authorization: `Token ${token}` }
          })
          return response.data.app_user_profile.phone.replace("T. ", "")
        } catch (error) {
          console.error("Error retrieving administrator phone: ", error)
          return ""
        }
      }
      return ""
    },
    updateStatusUser() {
      this.isAuthenticated = this.isUserAuthenticated()
      this.isAbleToBid = this.isUserAbleToBid()
      this.hoverText = this.getToolTipMessage(
        this.isAuthenticated,
        this.isAbleToBid,
        this.adminPhone
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
  display: none;
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
