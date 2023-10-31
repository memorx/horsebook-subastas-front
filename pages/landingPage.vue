<template>
  <div
    class="bg-zinc-200"
    style="height: 100%;"
  >
    <div>
      <div class="relative w-full text-center">
        <img
          src="../public/image_landing.png"
          alt="logo"
          class="w-full h-[90vh] object-cover"
        />
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div>
            <p class="font-bold text-6xl text-white">
              La calidad se hereda
            </p>
            <p class="font-light text-2xl text-white">
              Calidad respaldada por sus resultados internacionales
            </p>
            <div class="flex flex-col sm:flex-row justify-center space-x-0 sm:space-x-6 mt-6">
              <nuxt-link
                v-if="!isUserAuthenticated"
                to="auth/sign-up/"
                class="button-black mb-2 sm:mb-0"
              >
                <button class="bg-black text-white px-5 py-3 rounded-lg font-medium">
                  REGÍSTRATE
                </button>
              </nuxt-link>
              <nuxt-link
                to="user/inicio"
                class="button-white"
              >
                <button class="bg-black text-white px-5 py-3 rounded-lg font-medium">
                  ÚLTIMA SUBASTA
                </button>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full my-5 text-center">
      <p class="font-medium text-4xl leading-tight text-center">Subasta Online</p>
      <div v-if="nextAuction">
        <p class="text-center text-md font-bold">{{ countdown }}</p>
      </div>
      <div v-else>
        <h1 class="text-center text-md font-bold">No hay subastas próximas</h1>
      </div>
      <img
        class="rounded-lg mx-auto my-5 object-cover"
        style="height: 400px;"
        src="../public/image_landing_2.png"
        alt="logo"
      />
      <div class="flex justify-center items-center">
        <nuxt-link to="/user/inicio/">
          <button class="bg-black text-white px-5 py-3 rounded-lg">
            CONOCER MÁS
          </button>
        </nuxt-link>
      </div>
    </div>
    <div class="w-full my-5 py-5 text-center bg-white">
      <p class="font-medium text-4xl leading-tight text-center">Noticias</p>
      <p class="text-xl text-center">Seccion de Noticias</p>
      <div class="md:px-20">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni vitae harum ex impedit eveniet ea maxime laborum
        amet veniam suscipit. Repellat similique inventore iste eveniet maxime, libero id itaque non!
      </div>
      <div class="flex justify-center items-center my-5">
        <nuxt-link to="auth/sign-up/"><button class="bg-black text-white px-5 py-3 rounded-lg">
            Leer mas
          </button>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      subastas: [],
      nextAuction: null,
      countdown: "",
      loading: false,
    };
  },
  created() {
    this.fetchSubastas();
    this.updateCountdown();
  },
  computed: {
    isUserAuthenticated() {
      return this.$store.state.isAuthenticated;
    }
  },
  methods: {
    async fetchSubastas() {
      this.email = [];
      const listSubastasEndpoint = "/subastas/list-subastas/";
      const currentDate = new Date().toISOString().slice(0, 10);
      const url = `${this.$config.baseURL}${listSubastasEndpoint}?start_date=${currentDate}&only_subasta_data=true`;
      this.loading = true;
      try {
        const response = await this.$axios.get(url);
        this.subastas = response.data; // Assign the response data to this.subastas
        this.loading = false;
      } catch (error) {
        console.log(error, "ERRORR");
        this.loading = false;
      }
    },
    updateCountdown() {
      setInterval(() => {
        if (this.subastas.length === 0) {
          return;
        }

        const now = new Date().getTime();
        let closestTime = Infinity;
        let closestIndex = -1;

        for (let i = 0; i < this.subastas.length; i++) {
          const startBidTime = new Date(this.subastas[i].start_bid).getTime();
          const timeDifference = startBidTime - now;
          if (timeDifference > 0 && timeDifference < closestTime) {
            closestTime = timeDifference;
            closestIndex = i;
          }
        }

        if (closestIndex !== -1) {
          this.nextAuction = this.subastas[closestIndex];
          this.updateCountdownText(closestTime);
        } else {
          this.nextAuction = null;
        }
      }, 1000);
    },
    updateCountdownText(timeDifference) {
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

      this.countdown = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    },
  }
}
</script>