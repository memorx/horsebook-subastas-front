<template>
  <div class="container">
    <Loading v-if="loading"
      class="fixed w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50" />
    <NavBarProfile />
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
      </div>
      <div class="main">
        <p class="generalDates font-montserrat">Datos generales</p>
        <div v-if="1 > 0" class="containerGeneralDates">
          <p class="name font-montserrat">Nombre (s)</p>
          <p class="nameStyle font-montserrat">{{ email.name }}</p>
          <p class="lastNameMother font-montserrat">Apellido materno</p>
          <p class="nameStyle font-montserrat">{{ email.mothers_maiden_name }}</p>
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

      <div class="pt-20">
        <div class="w-full h-[1px] bg-[#EAECF0]"></div>
      </div>
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
      <div class="pt-20">
        <div class="w-full h-[1px] bg-[#EAECF0]"></div>
      </div>
      <div class="main3">
        <p class="generalDates font-montserrat">Seguridad</p>
        <div class="containerGeneralDatesSecurity">
          <p class="name font-montserrat">Contraseña</p>
          <p class="nameStyle font-montserrat">******</p>
        </div>
        <div class="pl-[350px] pt-[140px]">
          <button @click="clearUserData"
            class="box-border flex flex-row justify-center items-center gap-2 w-[178px] h-10 border shadow-[0px_1px_2px_rgba(16,24,40,0.05)] px-0 py-2.5 border-solid border-[#171618] bg-[#171618]">
            <p class="not-italic font-semibold text-sm leading-5 text-white font-montserrat">Cambiar contraseña</p>
          </button>
        </div>
      </div>
      <div class="pt-20">
        <div class="w-full h-[1px] bg-[#EAECF0]"></div>
      </div>
      <div class="w-full h-full flex">
        <p class="not-italic font-semibold text-base leading-6 text-gray-900 pt-32 pl-8 font-montserrat">Histórico</p>
        <div class="pt-[180px] pl-[40px] ">
          <div class="border border-[#EAECF0]">
            <p class="ml-6 font-montserrat not-italic font-semibold leading-7 text-[#101828]">Historial de subastas
            </p>
            <div class="pt-4">
              <div class="w-full h-[1px] bg-[#EAECF0]"></div>
            </div>
            <div class="pt-[40px] ml-6 w-full flex flex-row">
              <div class="box-border flex flex-row items-start isolate border p-0 rounded-lg border-[#D0D5DD] filterr">
                <button
                  :class="['flex flex-row justify-center items-center gap-2 w-[100px] h-10 text-[#1D2939] px-4 py-2.5 border-r-[#D0D5DD] border font-montserrat', { 'bg-white': selectedStatus !== 'all', 'bg-[#D0D5DD]': selectedStatus === 'all' }]"
                  @click="selectedStatus = 'all'">
                  <p class="not-italic font-semibold text-sm leading-5 text-[#1D2939] font-montserrat">Todas</p>
                </button>
                <button
                  :class="['flex flex-row justify-center items-center gap-2 w-[95px] h-10 px-4 py-2.5 border-r-[#D0D5DD] border font-montserrat', { 'bg-white': selectedStatus !== 'won', 'bg-[#D0D5DD]': selectedStatus === 'won' }]"
                  @click="selectedStatus = 'won'">
                  <p :class="['not-italic font-medium text-sm leading-5 text-[#344054] font-montserrat', { 'text-[#1D2939] font-semibold': selectedStatus === 'won' }]"
                    @click="selectedStatus = 'won'">Ganadas</p>
                </button>
                <button
                  :class="['flex flex-row justify-center items-center gap-2 w-[95px] h-10 px-4 py-2.5 border-r-[#D0D5DD] border font-montserrat', { 'bg-white': selectedStatus !== 'lost', 'bg-[#D0D5DD]': selectedStatus === 'lost' }]"
                  @click="selectedStatus = 'lost'">
                  <p class="not-italic font-medium text-sm leading-5 text-[#344054] font-montserrat">Perdidas</p>
                </button>
              </div>
            </div>
            <table class="bg-white mt-12 ml-6  ">
              <thead>
                <th class="not-italic font-semibold text-sm leading-[18px] text-[#475467] font-montserrat py-4 px-8">
                  <div class="flex">Subasta</div>
                </th>
                <th class="not-italic font-semibold text-sm leading-[18px] text-[#475467] font-montserrat px-16 py-4">
                  <div class="flex">Caballo</div>
                </th>
                <th class="not-italic font-semibold text-sm leading-[18px] text-[#475467] font-montserrat px-16 py-4">
                  <div class="flex">Fecha</div>
                </th>
                <th class="not-italic font-semibold text-sm leading-[18px] text-[#475467] font-montserrat px-16 py-4">
                  <div class="flex">Total</div>
                </th>
                <th class="not-italic font-semibold text-sm leading-[18px] text-[#475467] font-montserrat px-16 py-4">
                  <div class="flex">Estado</div>
                </th>
              </thead>
              <tbody>
                <tr v-for="    record     in     filteredRecords    " :key="record.bid_date">
                  <td
                    class="not-italic font-semibold text-sm leading-5 text-[#101828] font-montserrat align-top px-8 py-4">
                    <div class="flex">
                      Subasta {{ record.subasta.id }}
                    </div>
                  </td>
                  <td
                    class="not-italic font-semibold text-sm leading-5 text-[#101828] font-montserrat align-top px-16 py-4">
                    <div class="flex">
                      {{ record.horse.external_data.name }}
                    </div>
                  </td>
                  <td
                    class="not-italic font-semibold text-sm leading-5 text-[#101828] font-montserrat align-top px-16 py-4">
                    <div class="flex">
                      {{ new Date(record.bid_date).toLocaleString() }}
                    </div>
                  </td>
                  <td
                    class="not-italic font-semibold text-sm leading-5 text-[#101828] font-montserrat align-top px-16 py-4">
                    <div class="flex">
                      ${{ record.highest_bid }}
                    </div>
                  </td>
                  <td class="not-italic font-semibold text-sm leading-5 font-montserrat align-top px-16 py-4"
                    :style="{ color: record.status === 'won' ? '#027A48' : (record.status === 'lost' ? '#B42318' : '') }">
                    <div class="flex">
                      {{ record.status === 'won' ? 'Ganada' : (record.status === 'lost' ? 'Perdida' : '') }}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.filterr {
  filter: drop-shadow(0px 1px 2px rgba(16, 24, 40, 0.05));
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
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #FFFFFF;
}

.lastNameFatherStyle {

  font-style: normal;
  font-size: 16px;
  font-weight: 500px;
  line-height: 24px;
  color: #344054;
  padding-left: 90px;
}

.nameStyle {
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
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #475467;
  padding-left: 30px;
  padding-top: 10px;
}

.title {
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
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #667085;
  padding-top: 52px;
  padding-left: 90px;
}

.email {
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #667085;
  padding-top: 52px;
  padding-left: 90px;
}

.country {
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #667085;
  padding-top: 52px;
  padding-left: 90px;
}

.lastNameFather {
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
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #667085;
  padding-top: 52px;
  padding-left: 90px;
}

.celphone {

  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #667085;
  padding-top: 52px;
  padding-left: 90px;
}

.lastNameMother {

  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #667085;
  padding-top: 52px;
  padding-left: 90px;
}

.name {
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
</style>
<script>
import JWTDecode from 'jwt-decode';
import Loading from '../../../components/shared/Loading.vue';
import moment from 'moment';
import NavBarProfile from "../../../components/NavBar/NavBarProfile"
import Swal from 'sweetalert2';


export default {
  components: { Loading, NavBarProfile },
  data() {
    return {
      loading: false,
      loggedInUser: null,
      email: [],
      info: [],
      profile: null,
      selectedStatus: "all"
    }
  },
  mounted() {
    this.validateUser();
    this.getInfo();
    this.getAuctionsRecord();
  },
  computed: {
    setUser() {
      return this.$store.state.user;
    },
    filteredRecords() {
      if (this.selectedStatus === 'all') {
        return this.info.records; // Mostrar todas las subastas
      } else if (this.selectedStatus === 'won') {
        return this.info.records.filter(record => record.status === 'won'); // Mostrar subastas ganadas
      } else if (this.selectedStatus === 'lost') {
        return this.info.records.filter(record => record.status === 'lost'); // Mostrar subastas perdidas
      }
    }
  },

  methods: {
    validateUser() {
      if (!this.$store.state.user) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Debes iniciar sesión para poder ver tus datos, se te redirigirá al inicio'
        }).then(() => {
          window.location.href = '/auth/login';
        });
      }
    },
    async getInfo() {
      this.email = [];
      const url = `${this.$config.baseURL}/users/list-app-users/?email=${this.$store.state.user.email}`;
      const decoded = JWTDecode(this.$cookies.get('access_token'));

      if (decoded) {
        const token = "7992136a01a768227f14718e20efe5fa077a0db9"; // Replace with your token value
        const headers = {
          Authorization: `Token ${decoded.token}`,
        };


        this.loading = true;

        try {
          const response = await this.$axios.get(url, { headers });
          this.email = response.data.app_user_profile;
          console.log(email)
          this.profile = response.data.app_user_profile; // Almacenar los datos del perfil en la variable "profile"
          this.loading = false;
        } catch (error) {
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
        console.log(this.$store.state.user.email, "ESTADO")
        try {
          const info = await this.$axios.get(url, { headers });
          this.info = info.data
          console.log(info.data)
          this.loading = false;

        } catch (error) {
          this.loading = false;
        }
      }
    },
    clearUserData() {
      Swal.fire({
        title: '¿Estás seguro que deseas cambiar tu contraseña?',
        text: 'Se te redirigirá hacia el inicio',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.commit("clearUserData");
          window.location.href = '/auth/login';
        }
      });
    }
  }
}
</script>
