<template>
  <div>
    <div class="relative">
      <img src="../public/image_landing.png" alt="logo" class="w-full h-auto" />
      <div class="absolute top-10 right-10 flex flex-row items-center space-x-6">
        <button>
          <div
            class="flex flex-row justify-center items-center gap-2.5 w-[115px] h-11 px-5 py-[11px] border border-white">
            <a href="auth/sign-up/index.vue">
              <p class="not-italic font-medium text-sm leading-[22px] uppercase text-white letterMonserrat">Regístrate</p>
            </a>
          </div>
        </button>
        <button>
          <div
            class="flex flex-row justify-center items-center gap-2.5 w-[115px] h-11 px-5 py-[11px] bg-black border border-white">
            <a href="auth/login">
              <p class="not-italic font-normal text-sm leading-[22px] uppercase text-white letterMonserrat">Ingresar</p>
            </a>
          </div>
        </button>
      </div>
      <div class="absolute top-14 flex flex-row justify-center items-center w-full pr-8">
        <div class="flex justify-center space-x-8">
          <p class="not-italic font-medium text-xl leading-5 text-white letterMonserrat">Subasta online</p>
          <p class="not-italic font-medium text-xl leading-5 text-white letterMonserrat">Informacion</p>
          <p class="not-italic font-medium text-xl leading-5 text-white font-bold letterMonserrat">¿Como ofertar?</p>
          <p class="not-italic font-medium text-xl leading-5 text-white font-bold letterMonserrat">Contacto</p>
          <p class="not-italic font-medium text-xl leading-5 text-white font-bold letterMonserrat">Noticias</p>
        </div>
      </div>
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center">
        <p class="not-italic font-medium text-[68px] leading-[83px] text-white letterMonserrat">
          <span class="whitespace-nowrap">La calidad se hereda</span>
        </p>
        <p class="not-italic font-light text-[42px] leading-[51px] text-white letterMonserrat">
          <span class="whitespace-nowrap">Calidad respaldada por sus resultados internacionales</span>
        </p>
        <p class="not-italic font-light text-[25px] leading-[51px] text-center text-white letterMonserrat">
          <span class="whitespace-nowrap">Subasta actual: [nombre de subasta del momento]</span>
        </p>
        <div class="flex-row space-x-6 mt-6">
          <button>
            <div
              class="flex flex-row justify-center items-center gap-2.5 w-[200px] h-[62px] px-7 py-5 border border-white">
              <a href="auth/sign-up/">
                <p class="not-italic font-light text-[25px] leading-[51px] text-center text-white letterMonserrat">
                  REGÍSTRATE
                </p>
              </a>
            </div>
          </button>
          <button>
            <div
              class="flex flex-row justify-center items-center gap-2.5 w-[260px] h-[62px] px-7 py-5 bg-black border border-white">
              <p class="not-italic font-light text-[25px] leading-[51px] text-center text-white letterMonserrat">
                <a href="user/inicio">
                  <button>
                    <span class="whitespace-nowrap">VER ÚLTIMA SUBASTA</span>
                  </button>
                </a>
              </p>
            </div>
          </button>
        </div>
      </div>
      <img src="../public/image_la_silla.png" alt="logo" class="absolute top-2 left-2 flex " />
    </div>
    <div class="w-full h-full containerBackground relative mb-12">
      <p class="not-italic font-normal text-[80px] leading-[98px] text-center">Subasta Online</p>
      <p class="mt-12 not-italic font-normal text-xl leading-[30px] text-center letterMonserrat">COLECCIÓN 2023 / DATE
        COMING
        SOON</p>
      <img class="mt-12 mx-auto my-auto" src="../public/image_landing_2.png" alt="logo" />
      <div class="flex justify-center items-center mt-12">
        <button class="flex flex-row justify-center items-center gap-2.5 w-[183px] h-[62px] bg-black">
          <p class="not-italic font-medium text-lg leading-[22px] text-white">CONOCER MÁS</p>
        </button>
      </div>
    </div>
    <div class="w-full h-full relative bg-white mt-12">
      <p class="pt-4 pl-24 not-italic font-normal text-[80px] leading-[98px] text-black letterMonserrat">
        Información
      </p>

      <p class="pt-12 pl-24 pr-4 not-italic font-normal text-[25px] leading-[30px] text-black">La mejor manera de
        encontrar al equino perfecto</p>
      <!-- <img src="../../public/image_landing_3.png" class="pl-24" /> -->
      <p class="pt-8 pl-24 not-italic font-normal text-base leading-6 text-[#212121] max-w-[50%]">Somos una plataforma
        líder en el mercado que se dedica a conectar a compradores y vendedores de caballos de alta calidad en todo el
        mundo. Ya sea que esté buscando un caballo de deporte de alto rendimiento o un caballo para competencias de
        equitación, estamos para ayudarlo a encontrar la mejor opción para sus necesidades.</p>

      <div class="pt-4 pl-24">
        <button
          class="flex flex-row justify-center items-center gap-2.5 p-5 hover:blur-sm hover:brightness-50 hover:sepia hover:contrast-100 hover:hue-rotate-30 hover:invert-0 hover:opacity-5 hover:saturate-150 hover:text-orange-400 hover:text-xl disabled:w-3/12 disabled:text-[color:var(--some-color)] disabled:text-[1em] md:inset-x-1/4 md:inset-y-auto supports-[display:grid]:grid supports-[display:grid]:col-span-1 bg-black">
          <a href="auth/login">
            <p class="not-italic font-medium text-lg leading-[22px] uppercase text-white">Ingresar</p>
          </a>
        </button>
      </div>
      <p class="not-italic font-normal text-[80px] leading-[98px] text-center pt-24 ">¿Como ofertar?</p>
      <p class="pt-8 not-italic font-normal text-[25px] leading-[30px] text-center">Nuestro proceso</p>
      <div v-if="nextAuction">
        
        <p class="not-italic font-normal text-[80px] leading-[98px] text-center pt-24 ">{{ countdown }}</p>
      </div>
      <div v-else>
        <h1>No hay subastas próximas</h1>
      </div>
    </div>
  </div>
</template>
<script>
import JWTDecode from 'jwt-decode';
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
  methods: {
    async fetchSubastas() {
      this.email = [];
      const listSubastasEndpoint = "/subastas/list-subastas/";
      const currentDate = new Date().toISOString().slice(0, 10);
      const url = `${this.$config.baseURL}${listSubastasEndpoint}?start_date=${currentDate}&only_subasta_data=true`;
      const decoded = JWTDecode(this.$cookies.get("access_token"));

      if (decoded) {
        const token = decoded.token; // Use the decoded token directly
        const headers = {
          Authorization: `Token ${token}`,
        };
        this.loading = true;
        try {
          const response = await this.$axios.get(url, { headers });
          this.subastas = response.data; // Assign the response data to this.subastas
          this.loading = false;
        } catch (error) {
          console.log(error, "ERRORR");
          this.loading = false;
        }
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
<style>
.containerBackground {
  background: #f1f3f4;
}

.letterMonserrat {
  font-family: "Montserrat" "sans-serif";
}
</style>
