<template>
  <div class="p-5 bg-zinc-200" style="height: 100%">
    <Loading
      v-if="loading"
      class="fixed w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
    />
    <div>
      <div class="text-center my-5">
        <p class="text-2xl md:text-4xl font-bold">
          {{ $t('auction.title') }}
        </p>
      </div>
      <div>
        <div
          v-for="item in currentAuctions"
          :key="item.id"
          class="bg-white rounded-lg"
        >
          <NuxtLink
            :to="localePath('/user/detalles/' + item.id)"
            @click.prevent="goToDetails(item.id)"
            class="flex flex-col md:flex-row mb-10"
          >
            <img
              v-if="item.image"
              :src="item.image"
              alt="foto_portada"
              class="w-full md:w-1/2 object-cover md:rounded-l-lg"
              style="height: 400px"
              loading="lazy"
            />
            <div
              class="w-full md:w-1/2 bg-gray-300 h-[400px] flex justify-center items-center md:rounded-l-lg"
              v-else
            >
              <img
                class="m-auto opacity-70"
                src="../../public/image_la_silla.png"
                alt="Default Horse"
              />
            </div>
            <div class="w-full md:w-1/2 flex flex-col justify-between">
              <div class="p-5">
                <div class="flex items-center">
                  <span class="text-4xl font-bold mr-2">
                    {{ $t('auction.auction') }}
                  </span>
                  <statusBid :status="item.status" />
                </div>
                <p class="text-sm font-medium text-slate-500">
                  {{ $t('auction.auctionDate') }}:
                  <span class="font-normal">{{
                    new Date(item.start_bid).toLocaleString()
                  }}</span>
                </p>
                <div class="border-b border-gray-300 my-3"></div>
                <p class="mb-5">
                  {{ item.notes !== "null" ? item.notes : "" }}
                </p>
                <div class="text-center mt-auto">
                  <NuxtLink
                    :to="localePath('/user/detalles/' + item.id)"
                    @click.prevent="goToDetails(item.id)"
                  >
                    <button class="bg-black py-3 px-5 text-white rounded-lg">
                      {{ $t('auction.enterTheAuction')}}
                    </button>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </NuxtLink>
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
import statusBid from "../../components/bid/statusBid.vue"

export default {
  components: { Loading, statusBid },
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
    this.$root.$on('update-auctions', this.updateAuction)
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
          response.data.results.map((auction) => {
              if (
                ["PREBID", "BIDDING", "COMING", "CLOSED PREBID", "CLOSED"].includes(
                  auction.status
                )
              ) {
                this.currentAuctions.push(auction)
              } else {
                this.nextAuctions.push(auction)
              }

          })

          this.loading = false
        })
        .catch((error) => {
          this.loading = false
        })
    },

    goToDetails(id) {
      this.$router.push(this.localePath(`/user/detalles/${id}`))
    },

    updateAuction() {
      this.nextAuctions = []
      this.currentAuctions = []
      setTimeout(() => {
        this.getAuctions()
      }, 1000);
      /*
        const key = this.currentAuctions.findIndex( auction => auctionUpdated.auction_id === auction.id );
        if (key >= 0){
          this.currentAuctions[key].status = auctionUpdated.status
          if(auctionUpdated.status === 'CLOSED') {
              this.currentAuctions.results.splice(key, 1)
          }
        }
      */
    }

  }
}
</script>
