<template>
  <div class="p-5 bg-zinc-200" style="height: 100%">
    <Loading
      v-if="loading"
      class="fixed w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
    />
    <div>
      <div class="text-center my-5">
        <p class="text-2xl md:text-4xl font-bold">
          Bienvenido {{ setUser?.user || "Invitado" }}
        </p>
      </div>
      <div>
        <div
          v-for="item in currentAuctions"
          :key="item.id"
          class="bg-white rounded-lg flex flex-col md:flex-row mb-10"
        >
          <img
            src="../../public/image_subasta.png"
            alt="logo"
            class="w-full md:w-1/2 object-cover md:rounded-l-lg"
            style="height: 400px"
            loading="lazy"
          />
          <div class="w-full md:w-1/2 flex flex-col justify-between">
            <div class="p-5">
              <p class="text-4xl font-bold">Subasta</p>
              <p class="text-sm font-medium text-slate-500">
                Fecha de subasta:
                <span class="font-normal">{{
                  new Date(item.start_bid).toLocaleString()
                }}</span>
              </p>
              <div class="border-b border-gray-300 my-3"></div>
              <p class="mb-5">{{ item.notes !== "null" ? item.notes : "" }}</p>
              <div class="text-center mt-auto">
                <NuxtLink
                  :to="'/user/detalles/' + item.id"
                  @click.prevent="goToDetails(item.id)"
                >
                  <button class="bg-black py-3 px-5 text-white rounded-lg">
                    Ingresar a Subasta
                  </button>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookie from "js-cookie"
import axios from "axios"
import moment from "moment"
import Loading from "../../components/shared/Loading.vue"

export default {
  components: { Loading },
  computed: {
    setUser() {
      return this.$store.state.user
    }
  },
  data() {
    return {
      nextAuctions: [],
      currentAuctions: [],
      register: [],
      moment: moment,
      loading: ""
    }
  },
  async created() {
    if (this.setUser) {
      this.$store.commit("authenticate", true)
      // await this.registerAuctions()
    }
  },
  mounted() {
    this.getAuctions()
  },
  methods: {
    async getAuctions() {
      const listSubastasEndpoint = "/subastas/list-subastas/"
      const currentDate = new Date()
      const url = `${this.$config.baseURL}${listSubastasEndpoint}?only_subasta_data=true`
      //I want to stop to make a hardcode and do it using logic
      this.loading = true
      await this.$axios
        .get(url)
        .then((response) => {
          response.data.map((auction) => {
            if (auction.status != "CLOSED") {
              if (["PREBID", "BIDDING"].includes(auction.status)) {
                this.currentAuctions.push(auction)
              } else {
                this.nextAuctions.push(auction)
              }
            }
          })

          this.loading = false
        })
        .catch((error) => {
          this.loading = false
        })
    },
    // async registerAuctions() {
    //   this.register = []
    //   const currentDate = new Date().toISOString().slice(0, 10);
    //   const url = `${this.$config.baseURL}/subastas/get-registered-subastas/?email=${this.$store.state.user.email}&start_date=${currentDate}`;
    //   console.log(url)
    //   const decoded = JWTDecode(this.$cookies.get("access_token"))
    //   //I want to stop to make a hardcode and do it using logic
    //   if (decoded) {
    //     const token = "4fd2e979427a259cc56c18cad449cec5aefaed0d"; // Replace with your token value
    //     const headers = {
    //       Authorization: `Token ${decoded.token}`,
    //     };
    //     this.loading = true;
    //     await this.$axios
    //       .get(url, { headers })
    //       .then((response) => {
    //         this.register = response.data.subastas;
    //         console.log('test' + this.register)
    //         this.loading = false;
    //       })
    //       .catch((error) => {
    //         console.log(error)
    //       });
    //   }
    // },
    goToDetails(id) {
      this.$router.push(`/user/detalles/${id}`)
    }
  }
}
</script>
