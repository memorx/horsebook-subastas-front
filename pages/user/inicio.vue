<template>
  <div class="p-5 bg-black" style="height: 100%">
    <Loading
      v-if="loading"
      class="fixed w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
    />
    <div>
  <div class="text-center my-5">
    <div class="mx-auto bg-black py-3 px-5 text-white rounded-3xl flex justify-between items-center gap-4 w-fit">
      <p class="text-xl md:text-5xl font-bold uppercase bg-gradient-to-r from-[#efb810] via-[#fff3c4] via-[#efb810] via-[#fff3c4] to-[#efb810] bg-clip-text text-transparent">
        {{ $t('auction.title') }}
      </p>
    </div>
  </div>

  <div class="w-full md:px-[10%]">
    <div
      v-for="item in auctions"
      :key="item.id"
      class="bg-[#DEDCD3] rounded-3xl border-2 border-[#EFB810] mb-10"
    >
      <NuxtLink
        :to="localePath('/user/detalles/' + item.id)"
        @click.prevent="goToDetails(item.id)"
        class="flex flex-col md:flex-row"
      >
        <img
          v-if="item.image"
          :src="item.image"
          alt="foto_portada"
          class="w-full md:w-1/2 object-cover rounded-3xl shadow-xl md:m-3"
          style="height: 400px"
          loading="lazy"
        />
        <div
          class="w-full md:w-1/2 object-cover rounded-3xl shadow-xl md:m-3 bg-gray-300 h-[400px] flex justify-center items-center"
          v-else
        >
          <img
            class="m-auto opacity-70"
            src="../../public/image_la_silla.png"
            alt="Default Horse"
          />
        </div>
        <div class="w-full md:w-1/2 flex flex-col h-[400px]">
          <div class="p-5 flex flex-col h-full">
            <div class="flex items-center">
              <span class="text-4xl font-bold mr-2 uppercase">
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
            <div class="mt-auto self-end">
              <NuxtLink
                :to="localePath('/user/detalles/' + item.id)"
                @click.prevent="goToDetails(item.id)"
              >
                <button class="button-with-arrow bg-black py-3 pl-5 pr-14 text-white rounded-3xl relative flex justify-start items-center gap-4 w-fit">
                  <div class="uppercase bg-gradient-to-r from-[#efb810] via-[#fff3c4] via-[#efb810] via-[#fff3c4] to-[#efb810] bg-clip-text text-transparent font-bold">
                    {{ $t('auction.enterTheAuction')}}
                  </div>
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
      auctions: [],
      moment: moment,
      loading: false
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
      const url = `${this.$config.baseURL}${listSubastasEndpoint}?only_subasta_data=true`

      this.loading = true

      try {
        const response = await this.$axios.get(url)
        const auctionsData = response.data.results

        // Ordenamos las subastas
        this.auctions = auctionsData.sort((a, b) => {
          const order = ['BIDDING', 'CLOSED PREBID', 'PREBID', 'COMING', 'CLOSED']
          return order.indexOf(a.status) - order.indexOf(b.status)
        })
      } catch (error) {
        console.error('Error al obtener las subastas:', error)
      } finally {
        this.loading = false
      }
    },

    goToDetails(id) {
      this.$router.push(this.localePath(`/user/detalles/${id}`))
    },

    updateAuction() {
      this.auctions = []
      setTimeout(() => {
        this.getAuctions()
      }, 1000);
    },

    formatDate(date) {
      return moment(date).format('DD/MM/YYYY HH:mm')
    }
  }
}
</script>
<style>
.button-with-arrow {
  background-image: url('@/public/button-arrow.png');
  background-position: right 1rem center;
  background-repeat: no-repeat;
  background-size: 30px 30px;
}

.button-with-arrow:hover {
  background-image: url('@/public/button-arrow.png');
}
</style>