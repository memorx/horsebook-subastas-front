<template>
  <div class="container">
    <Loading v-if="loading"
      class="fixed w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50" />
    <div class="sideBar bg-gray-200 border-r border-gray-300">

      <div class="content">
        <div class="nav">
          <div class="frame1">
            <img src="../../../public/image_la_silla.png" alt="logo" width="90" height="92">
          </div>
          <div class="navigation">
            <div class="gavel w-5 h-5"></div>
            <button>
              <a href="/user/inicioo">
                <p class="font-montserrat font-medium text-base leading-6 text-gray-900 pl-4">Tus subastas</p>
              </a>
            </button>
            <div class="framee1">
              <div class="divider"></div>
            </div>

            <div class="navItemBasee">
              <div class="contenttt flex items-center gap-2">
                <div class="description"></div>
                <div class="navItemBase bg-gray-800 rounded-lg">
                  <div class="contentt flex items-center gap-2">
                    <p class="font-montserrat font-medium text-base text-white pl-2">Tus datos</p>
                  </div>
                </div>
                <!-- <p class="font-montserrat font-medium text-base leading-6 text-gray-900">Tus datos</p> -->
              </div>
            </div>
          </div>
        </div>
        <div class="footer"></div>
      </div>
    </div>
    <div class="containerAll">
      <div class="mainn">
        <div class="mainTitle">
          <p class="title font-montserrat">{{ email.name }}</p>
          <p class="titleEmail font-montserrat">{{ email.email }}</p>
        </div>
        <div class="buttonAcomodate">
          <button class="buttonEditContainer">
            <a href="/user/perfil/editar">
              <p class="buttonEdit font-montserrat">Editar perfil</p>
            </a>
          </button>
        </div>
        <!-- <p>Editar perfil</p> -->
      </div>
      <div class="main">
        <p class="generalDates font-montserrat">Datos generales</p>
        <div v-if="1 > 0" class="containerGeneralDates">
          <p class="name font-montserrat">Nombre (s)</p>
          <p class="nameStyle font-montserrat">{{ email.name }}</p>
          <p class="lastNameMother font-montserrat">Apellido materno</p>
          <p class="nameStyle font-montserrat">Del valle</p>
          <p class="celphone font-montserrat">Teléfono</p>
          <p class="nameStyle font-montserrat">{{ email.phone }}</p>
          <p class="date font-montserrat">Fecha de nacimiento</p>
          <p class="nameStyle font-montserrat">{{ email.birth_date }}</p>
        </div>
        <div class="containerGeneralDatess">
          <p class="lastNameFather font-montserrat">Apellido paterno</p>
          <p class="lastNameFatherStyle font-montserrat">{{ email.fathers_surname
          }}</p>
          <p class="country font-montserrat">Nacionalidad</p>
          <p class="lastNameFatherStyle font-montserrat">{{ email.nationality }}</p>
          <p class="email font-montserrat">Email</p>
          <p class="lastNameFatherStyle font-montserrat">{{ email.email }}</p>
          <p class="id font-montserrat">Pasaporte / ID</p>
          <p class="lastNameFatherStyle font-montserrat">{{ email.identification_document }}</p>
        </div>
      </div>
      <!-- <div class="framee1">
        <div class="dividerr"></div>
      </div> -->
      <div class="main2">
        <p class="generalDates font-montserrat">Datos de domicilio</p>
        <div class="containerGeneralDatesHouse">
          <p class="name font-montserrat">Pais</p>
          <p class="nameStyle font-montserrat">{{ email.country }}</p>
          <p class="lastNameMother font-montserrat">Ciudad</p>
          <p class="nameStyle font-montserrat">{{ email.state }}</p>
          <p class="celphone font-montserrat">Número exterior</p>
          <p class="nameStyle font-montserrat">{{ email.outdoor_number }}</p>
          <p class="date font-montserrat">CP</p>
          <p class="nameStyle font-montserrat">{{ email.zip_code }}</p>
        </div>
        <div class="containerGeneralDatessHouse">
          <p class="lastNameFather font-montserrat">Estado</p>
          <p class="lastNameFatherStyle font-montserrat">{{ email.municipalitie }}</p>
          <p class="country font-montserrat">Calle</p>
          <p class="lastNameFatherStyle font-montserrat">{{ email.street }}</p>
          <p class="email font-montserrat">Número interior</p>
          <p class="lastNameFatherStyle font-montserrat">{{ email.interior_number }}</p>
        </div>
      </div>
      <div class="main3">
        <p class="generalDates font-montserrat">Seguridad</p>
        <div class="containerGeneralDatesSecurity">
          <p class="name font-montserrat">Contraseña</p>
          <p class="nameStyle font-montserrat">******</p>
        </div>
      </div>
      <div class="w-full h-full flex">
        <p class="not-italic font-semibold text-base leading-6 text-gray-900 pt-32 pl-8 font-montserrat">Histórico</p>
        <div class="pt-[180px]">
          <table class="bg-white p-2 p-12">
            <thead class="space-x-20">
              <tr class="space-x-20">
                <th class="not-italic font-semibold text-sm leading-[18px] text-[#475467] font-montserrat px-4 py-2">id
                </th>
                <th class="not-italic font-semibold text-sm leading-[18px] text-[#475467] font-montserrat px-4 py-2">
                  highest_bid
                </th>
                <th class="not-italic font-semibold text-sm leading-[18px] text-[#475467] font-montserrat px-4 py-2">
                  bid_date
                </th>
                <th class="not-italic font-semibold text-sm leading-[18px] text-[#475467] font-montserrat px-4 py-2">
                  status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="record in info.records" :key="record.bid_date" class="space-x-20">
                <td class="not-italic font-semibold text-sm leading-5 text-[#101828] font-montserrat align-top">
                  Subasta {{ record.horse.id }}
                </td>
                <td class="not-italic font-semibold text-sm leading-5 text-[#101828] font-montserrat align-top">
                  {{ record.highest_bid }}
                </td>
                <td class="not-italic font-semibold text-sm leading-5 text-[#101828] font-montserrat align-top">
                  {{ new Date(record.bid_date).toLocaleString() }}
                </td>
                <td class="not-italic font-semibold text-sm leading-5 text-[#101828] font-montserrat align-top">
                  {{ record.status }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.letterMonserrat {
  font-family: "Montserrat" "sans serif";
}

.buttonAcomodate {
  padding-top: 40px;
}

.buttonEditContainer {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 0px;
  gap: 8px;
  width: 117px;
  height: 40px;
  background: #171618;
  border: 1px solid #171618;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
}

.buttonEdit {
  font-family: 'Montserrat' "sans serif";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #FFFFFF;
}

.lastNameFatherStyle {

  font-family: 'Montserrat' "sans serif";
  font-style: normal;
  font-size: 16px;
  font-weight: 500px;
  line-height: 24px;
  color: #344054;
  padding-left: 90px;
}

.nameStyle {
  font-family: 'Montserrat' "sans serif";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  padding-left: 90px;
  /* identical to box height, or 150% */


  /* Gray/700 */

  color: #344054;
}

.mainTitle {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  background: #F9F9F9;
}

.titleEmail {
  font-family: 'Montserrat' "sans-serif";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #475467;
  padding-left: 30px;
  padding-top: 10px;
}

.title {
  font-family: 'Montserrat' "sans-serif";
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 38px;
  padding-left: 30px;
  padding-top: 10px;
}

.mainn {
  display: flex;
  width: 100%;
  height: 100%;
  background: #F9F9F9;
}

.containerGeneralDatesHistory {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding-left: 68px;
}

.containerGeneralDatesSecurity {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding-left: 60px;
}

.containerGeneralDatesHouse {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}

.containerGeneralDatessHouse {
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  align-items: flex-start;
  padding-left: 185px;
}

.main4 {
  display: flex;
  width: 100%;
  height: 100%;
}

.main3 {
  display: flex;
  width: 100%;
  height: 100%;
}

.containerAll {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.main2 {
  display: flex;
  height: 100%;
  width: 100%;
}

.framee1 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px 0px 0px;
  gap: 8px;
  width: 100vh;
  height: 9px;
}

.dividerr {
  padding-top: 100%;
  width: 100;
  height: 1px;
  background: #EAECF0;
}

.id {
  font-family: 'Montserrat' "sans-serif";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #667085;
  padding-top: 52px;
  padding-left: 90px;
}

.email {
  font-family: 'Montserrat' "sans-serif";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #667085;
  padding-top: 52px;
  padding-left: 90px;
}

.country {
  font-family: 'Montserrat' "sans-serif";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #667085;
  padding-top: 52px;
  padding-left: 90px;
}

.lastNameFather {
  font-family: 'Montserrat' "sans-serif";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #667085;
  padding-top: 142px;
  padding-left: 90px;
}

.containerGeneralDatess {
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  align-items: flex-start;
  padding-left: 158px;
}

.date {
  font-family: 'Montserrat' "sans-serif";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #667085;
  padding-top: 52px;
  padding-left: 90px;
}

.celphone {
  font-family: 'Montserrat' "sans-serif";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #667085;
  padding-top: 52px;
  padding-left: 90px;
}

.lastNameMother {
  font-family: 'Montserrat' "sans-serif";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #667085;
  padding-top: 52px;
  padding-left: 90px;
}

.name {
  font-family: 'Montserrat' "sans-serif";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #667085;
  padding-top: 142px;
  padding-left: 90px;
}

.containerGeneralDates {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding-left: 15px;
  /* padding: 0px; */
}

.generalDates {
  font-family: 'Montserrat' "sans-serif";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #101828;
  padding-top: 140px;
  padding-left: 30px;
}

.main {
  width: 100%;
  height: 100%;
  display: flex;
}

.title {
  display: flex;
  align-items: center;
  padding-top: 35px;
  gap: 48px;

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

.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0px;
  width: 280px;
  height: 822px;
}

.nav {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 32px 0px 0px;
  gap: 84px;
  width: 280px;
  height: 505px;
}

.frame1 {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px 20px;
  gap: 8px;
  width: 280px;
  height: 92px;
}

.logo {
  width: 90px;
  height: 92px;

  /* background: url(logo.png); */

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
}

.search {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 24px;

  display: none;
  width: 279px;
  height: 44px;


  /* Inside auto layout */

  flex: none;
  order: 1;
  flex-grow: 0;
}

.navigation {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 16px;
  gap: 16px;
  width: 280px;
  height: 297px;
}

.navItemBase {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  gap: 8px;
  width: 248px;
  height: 48px;
  background: #141313;
  border-radius: 10px;
}

.contentt {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 12px;
  width: 224px;
  height: 24px;
}

.gavel {
  width: 20px;
  height: 20px;
}

.text {
  width: 104px;
  height: 24px;

  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #FFFFFF;
}

.framee1 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px 0px 0px;
  gap: 8px;
  width: 100vh;
  height: 9px;
}

.divider {
  width: 248px;
  height: 1px;
  background: #EAECF0;
}

.navItemBasee {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  gap: 8px;
  width: 248px;
  height: 40px;
  border-radius: 6px;
}

.contenttt {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  margin: -25px;
  padding-right: 20px;
  gap: 12px;
  width: 224px;
  height: 24px;
}

.description {
  width: 24px;
  height: 24px;

}

.textt {
  width: 24px;
  height: 24px;

}

.footer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 16px 32px;
  gap: 24px;

  width: 280px;
  height: 72px;
}
</style>
<script>
import JWTDecode from 'jwt-decode';
import Loading from '../../../components/shared/Loading.vue';
import moment from 'moment';

export default {
  components: { Loading },
  data() {
    return {
      loading: false,
      loggedInUser: null,
      email: [],
      info: [],
      profile: null
    }
  },
  mounted() {
    this.getInfo();
    this.getAuctionsRecord();
  },
  computed: {
    setUser() {
      return this.$store.state.user;
    },
  },
  methods: {
    async getInfo() {
      this.email = [];
      const url = `${this.$config.baseURL}/users/list-app-users/?pre_register=true&email=${this.$store.state.user.email}`;
      const decoded = JWTDecode(this.$cookies.get('access_token'));

      if (decoded) {
        const token = "7992136a01a768227f14718e20efe5fa077a0db9"; // Replace with your token value
        const headers = {
          Authorization: `Token ${decoded.token}`,
        };

        this.loading = true;

        try {
          const response = await this.$axios.get(url, { headers });
          console.log(response, "USERS");
          this.email = response.data.app_user_profile;
          this.profile = response.data.app_user_profile; // Almacenar los datos del perfil en la variable "profile"
          this.loading = false;
        } catch (error) {
          console.log(error);
          this.loading = false;
        }
      }
    },
    async getAuctionsRecord() {
      this.info = [];
      const url = `${this.$config.baseURL}/subastas/get-auction-records?email=${this.$store.state.user.email}`
      const decoded = JWTDecode(this.$cookies.get("access_token"));
      if (decoded) {
        const headers = {
          Authorization: `Token ${decoded.token}`,
        }
        this.loading = true;
        try {
          const info = await this.$axios.get(url, { headers });
          console.log(info, "RESPONSE AUCTIONS RECORDS")
          console.log(info.data, "RESPONSE.DATA AUCTIONS RECORDS")
          console.log(info.data.records, "RESPONSE.DATA.RECORDS AUCTIONS RECORDS")
          this.info = info.data
          console.log(info, "INFO")
          this.loading = false;

        } catch (error) {
          this.loading = false;
          console.log(error, "ERROR AUCTIONS RECORDS")
        }
      }
    }
  }
}
</script>
