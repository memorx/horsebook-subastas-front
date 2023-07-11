<template>
  <div class="container">
    <Loading v-if="loading"
      class="fixed w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50" />
    <NavBarAuction />
    <div class="main">
      <div class="title">
        <p class="textttt font-aeonik">Bienvenido a HorseBook {{ setUser?.email || " " }}</p>
      </div>
      <div class="sectionheaderr">
        <p class="textSub font-aeonik">Próximas subastas disponibles</p>
        <div class="contentttttt" v-for="item in email" :key="item.id">
          <img v-if="item.image" :src="item.image" alt="logo" class="auction-image">
          <img v-else src="../../public/image_subasta.png" alt="logo" class="auction-image">
          <div class="contentttttttt">
            <div class="headingText">
              <p class="author font-aeonik">Fecha de subasta: {{ new Date(item.start_bid).toLocaleString() }}</p>
              <NuxtLink :to="'/user/detalles/' + item.id" @click.prevent="goToDetails(item.id)">
                <p class="headingRegister font-aeonik">Colección 2023</p>
              </NuxtLink>
              <p class="supportingText font-aeonik">{{ item.notes }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="framee1">
        <div class="dividerr"></div>
      </div>
      <div v-if="setUser" class="sectionheaderr">
        <p class="textSub font-aeonik">Subastas en las que estas registrado</p>
        <div class="contentttttt" v-for="item in register" :key="item.id">
          <img src="../../public/image_subasta.png" alt="logo" width="90%" height="100%">
          <div class="contentttttttt">
            <div class="headingText">
              <p class="author font-aeonik">Fecha de subasta: {{ new Date(item.start_bid).toLocaleString() }}</p>
              <p class="headingRegister font-aeonik">Colección 2023</p>
              <p class="supportingText font-aeonik">{{ item.notes }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div></template>
<style>
.auction-image {
  width: 986px;
  /* Increase the width */
  height: 272px;
  /* Increase the height */
  object-fit: cover;
  /* Crop or scale the image to fit the dimensions */
}

.title {
  display: flex;
  align-items: center;
  padding-top: 35px;
  gap: 48px;
  margin-left: 75px;
  width: 100%;
  height: 100%;
}

.containerRegister {
  width: 100vh;
  height: 100vh;
}

.containerRegisterTitle {
  width: 100vh;
  height: 100vh;
}

.container {
  display: flex;
  padding: 0px;
  width: 100%;
  height: 100%
}

.dashboard {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  position: absolute;
  width: 1440px;
  height: 2538px;
  left: 0px;
  top: 78px;
  background: #FCFCFD;
}

.sideBar {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  width: 280px;
  height: 70vh;
  background: #F9FAFB;
  border-right: 1px solid #EAECF0;
}

.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;

  width: 100%;
  height: 100%;
  background: #FCFCFD;

}

.sectionheader {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px;
  gap: 24px;

}

.containerr {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px 32px;
  gap: 24px;
}

.pageHeader {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px;
  gap: 20px;

  width: 1096px;
  height: 64px;

}

.contentttt {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 16px;

  width: 1096px;
  height: 64px;

}

.avatar {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 20px;

  width: 1096px;
  height: 64px;

}

.avatarr {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 38px;
  margin-top: -10px;

  width: 64px;
  height: 64px;

  border-radius: 200px;

}

.texttt {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 4px;

  width: 1012px;
  height: 38px;

}

.textttt {
  width: 100%;
  height: 100%;

  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  line-height: 38px;

  color: #101828;

}

.sectionn {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 24px;

  height: 90vh;

}

.containerrr {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 32px;
  gap: 24px;

}

.sectionheaderr {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 20px;

  width: 100%;
  height: 100%;

}

.contenttttt {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;

  width: 1096px;
  height: 28px;

}

.textNextSub {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px;
  gap: 4px;

  width: 1096px;
  height: 28px;

}

.textSub {
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  padding-left: 40px;
  line-height: 28px;
  color: #101828;
}

.contentttttt {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 40px;
  gap: 32px;

}

.sectionnnn {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 20px;
  width: 1096px;
  height: 28px;
}

.posts {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 24px;
  width: 1096px;
  height: 432px;
}

.contenttttttt {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 24px;
}

.blog {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 18px;
  width: 1096px;
  height: 432px;
}

.imagee {
  width: 1096px;
  height: 302px;
}

.contentttttttt {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 24px;
  width: 1096px;
  height: 112px;
}

.headingText {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  width: 1096px;
  height: 112px;
}

.author {
  width: 1096px;
  height: 20px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #A8A8A8;
}

.headingIcon {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;
  width: 1096px;
  height: 28px;
}

.headingg {
  width: 189px;
  height: 28px;
  font-family: 'Aeonik';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 28px;
  color: #101828;
}

.iconWrap {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 4px 0px 0px;
  width: 24px;
  height: 28px;
}

.arrow {
  width: 24px;
  height: 24px;
}

.iconn {
  position: absolute;
  left: 29.17%;
  right: 29.17%;
  top: 29.17%;
  bottom: 29.17%;
  border: 2px solid #101828;
}

.supportingText {
  width: 100vh;
  height: 100vh;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #475467;
}

.frameee1 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px 0px 0px;
  gap: 8px;
  width: 1160px;
  height: 9px;
}

.dividerr {
  width: 1160px;
  height: 1px;
  background: #EAECF0;
}

.sectionRegister {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 24px;
  width: 1160px;
  height: 940px;
  background: #FCFCFD;
}

.sectionHeaderRegister {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 20px;
  width: 1096px;
  height: 28px;
}

.contentRegister {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;
  width: 1096px;
  height: 28px;
}

.textRegister {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px;
  gap: 4px;
  width: 1096px;
  height: 28px;
}

.texttRegister {
  width: 1096px;
  height: 28px;
  font-family: 'Aeonik' "sans-serif";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  color: #101828;
}

.contentRegisterr {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 32px;
  width: 1096px;
  height: 432px;
}

.sectionRegisterr {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 32px;
  width: 1096px;
  height: 432px;
}

.postsRegister {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 24px;
  width: 1096px;
  height: 432px;
}

.contentRegisterrr {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 24px;
  width: 1096px;
  height: 432px;
}

.blogRegister {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 32px;
  width: 1096px;
  height: 432px;
}

.imageRegister {
  width: 1096px;
  height: 288px;
}

.contentRegisterrrr {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 24px;
  width: 1096px;
  height: 112px;

}

.headingTextRegister {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  width: 1096px;
  height: 112px;
}

.authorRegister {
  width: 1096px;
  height: 20px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #A8A8A8;
}

.headingIconRegister {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;
  width: 1096px;
  height: 28px;
}

.headingRegister {
  width: 129px;
  height: 28px;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 28px;
  color: #101828;

}

.iconWrapRegister {

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 4px 0px 0px;
  width: 24px;
  height: 28px;

}

.arrowRegister {
  width: 24px;
  height: 24px;
}

.iconRegister {
  position: absolute;
  left: 29.17%;
  right: 29.17%;
  top: 29.17%;
  bottom: 29.17%;
  border: 2px solid #101828;
}
</style>
<script>
import Cookie from 'js-cookie'
import axios from "axios"
import moment from 'moment';
import JWTDecode from "jwt-decode"
import Loading from '../../components/shared/Loading.vue';
import NavBarAuction from "../../components/NavBar/NavBarAuction.vue"


export default {
  components: { Loading, NavBarAuction },
  computed: {
    setUser() {
      return this.$store.state.user;
    },
  },
  data() {
    return {
      email: [],
      register: [],
      moment: moment
    }
  },
  async created() {
    if (this.setUser) {
      await this.registerAuctions()
    }
  },
  mounted() {
    this.getAuctions()
  },
  methods: {
    async getAuctions() {
      this.email = []
      const listSubastasEndpoint = "/subastas/list-subastas/";
      const currentDate = new Date().toISOString().slice(0, 10);
      const url = `${this.$config.baseURL}${listSubastasEndpoint}?start_date=${currentDate}&only_subasta_data=true`;
      console.log(url, "URL")
      const decoded = JWTDecode(this.$cookies.get("access_token"))
      console.log(decoded)
      //I want to stop to make a hardcode and do it using logic
      if (decoded) {
        console.log(decoded.token, "decoded.token")
        const token = "4fd2e979427a259cc56c18cad449cec5aefaed0d"; // Replace with your token value
        const headers = {
          Authorization: `Token ${decoded.token}`,
        };
        console.log(headers, "headers")
        this.loading = true;
        await this.$axios
          .get(url, { headers })
          .then((response) => {
            console.log(response, "USERS");
            for (let i = 0; i < response.data.length; i++) {
              console.log(response.data[i].start_bid);
            }
            console.log(response.data, "RESPONSE.DATA")
            this.email = response.data;
            this.loading = false;
          })
          .catch((error) => {
            console.log(error, "ERRORR");
            this.loading = false;
          });
      }
    },
    async registerAuctions() {
      this.register = []
      const url = `${this.$config.baseURL}/subastas/get-registered-subastas/?email=${this.$store.state.user.email}`;
      console.log(url, "URL")
      const decoded = JWTDecode(this.$cookies.get("access_token"))
      console.log(decoded)
      //I want to stop to make a hardcode and do it using logic
      if (decoded) {
        console.log(decoded.token, "decoded.token")
        const token = "4fd2e979427a259cc56c18cad449cec5aefaed0d"; // Replace with your token value
        const headers = {
          Authorization: `Token ${decoded.token}`,
        };
        console.log(headers, "headers")
        this.loading = true;
        await this.$axios
          .get(url, { headers })
          .then((response) => {
            console.log(response, "USERS REGISTER");
            for (let i = 0; i < response.data.length; i++) {
              console.log(response.data[i].start_bid);
            }
            this.register = response.data.subastas;
            this.loading = false;
          })
          .catch((error) => {
            console.log(error, "ERRORR");
            this.loading = false;
          });
      }
    },
    goToDetails(id) {
      this.$router.push(`/user/detalles/${id}`);
    }
  },
}

</script>
