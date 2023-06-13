<template>
  <div class="container">
    <Loading v-if="loading"
      class="fixed w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50" />
    <NavBarProfile />

    <div class="containerEdit">
      <div class="mainn">
        <div class="mainTitle">
          <p class="editProfile font-montserrat">Editar perfil</p>
          <p class="editProfileSubtitle font-montserrat">Edita tu perfil y tus datos personales</p>
        </div>
        <div class="buttonAcomodatee">
          <a href="/user/perfil" class="buttonEditContainerr">
            <p class="buttonEditt font-montserrat">Cancelar</p>
          </a>
        </div>
        <div class="buttonAcomodate">
          <a href="/user/perfil" class="buttonEditContainer" @click=updateProfile>
            <p class="buttonEdit font-montserrat">Guardar</p>
          </a>
        </div>
      </div>
      <div class="main">
        <p class="generalDates font-montserrat">Nombre (s)</p>
        <input class="inputs" placeholder="Nombre (s)" v-model="name" />
        <p class="generalDates font-montserrat">Apellido paterno</p>
        <input class="inputs" placeholder="Apellido paterno" v-model="fathers_surname" />
        <p class="generalDates font-montserrat">Apellido materno</p>
        <input class="inputs" placeholder="Apellido materno" v-model="mothers_maiden_name" />
        <p class="generalDates font-montserrat">Fecha de nacimiento</p>
        <input class="inputs" placeholder="Fecha de nacimiento" v-model="birth_date" />
        <p class="generalDates font-montserrat">Nacionalidad</p>
        <input class="inputs" placeholder="Nacionalidad" v-model="nationality" />
        <p class="generalDates font-montserrat">Teléfono</p>
        <input class="inputs" placeholder="Teléfono" v-model="phone" />
        <p class="generalDates font-montserrat"># de pasaporte o ID</p>
        <input class="inputs" placeholder="# de pasaporte o ID" v-model="identification_document" />
        <p class="generalDates font-montserrat">Pais</p>
        <input class="inputs" placeholder="Pais" v-model="country" />
        <p class="generalDates font-montserrat">Estado</p>
        <input class="inputs" placeholder="Estado" v-model="state" />
        <p class="generalDates font-montserrat">Ciudad</p>
        <input class="inputs" placeholder="Ciudad" v-model="municipalitie" />
        <p class="generalDates font-montserrat">Calle</p>
        <input class="inputs" placeholder="Calle" v-model="street" />
        <p class="generalDates font-montserrat">Número exterior</p>
        <input class="inputs" placeholder="Número exterior" v-model="outdoor_number" />
        <p class="generalDates font-montserrat">Número interior</p>
        <input class="inputs" placeholder="Número interior" v-model="interior_number" />
        <p class="generalDates font-montserrat">C.P</p>
        <input class="inputs" placeholder="C.P" v-model="zip_code" />
      </div>
    </div>
  </div>
</template>
<style>
.inputs {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 14px;
  margin-left: 220px;
  gap: 8px;
  width: 512px;
  height: 44px;
  background: #FFFFFF;
  border: 1px solid #D0D5DD;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;
}

.generalDates {
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 5px;
  color: #344054;
  padding-top: 70px;
  padding-left: 30px;
}

.main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.buttonEditContainerr {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 0px;
  gap: 8px;
  width: 117px;
  height: 40px;
  background: #ffffff;
  border: 1px solid #D0D5DD;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
}

.buttonEditt {
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #344054;
}

.buttonAcomodatee {
  padding-right: 10px;
  padding-top: 40px;
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

.mainn {
  display: flex;
  /* flex-direction: column; */
  width: 100%;
  height: 100%;
  background: #F9F9F9;
}

.mainTitle {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  background: #F9F9F9;
}

.editProfileSubtitle {
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #475467;
  padding-top: 5px;
  padding-left: 30px;
}

.editProfile {
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
  color: #101828;
  padding-top: 30px;
  padding-left: 30px;
}

.containerEdit {
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
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
import Loading from '../../../../components/shared/Loading.vue';
import NavBarProfile from "../../../../components/NavBar/NavBarProfile.vue"

export default {
  components: { Loading, NavBarProfile },
  data() {
    return {
      loading: false,
      loggedInUser: null,
      email: [],
      profile: null,
      name: '',
      fathers_surname: '',
      mothers_maiden_name: '',
      identification_document: '',
      country: '',
      state: '',
      municipalitie: '',
      phone: '',
      birth_date: '',
      nationality: '',
      street: '',
      outdoor_number: '',
      interior_number: '',
      zip_code: '',
    }
  },
  computed: {
    setUser() {
      return this.$store.state.user;
    },
  },
  methods: {
    async updateProfile() {
      this.email = [];
      const url = `${this.$config.baseURL}/users/update-user-profile/?pre_register=true&email=${this.$store.state.user.email}`;
      const decoded = JWTDecode(this.$cookies.get('access_token'));

      if (decoded) {
        const headers = {
          Authorization: `Token ${decoded.token}`,
        };

        const email = this.$store.state.user.email;
        const profileData = {
          email,
          name: this.name || this.profile.name,
          fathers_surname: this.fathers_surname || this.profile.fathers_surname,
          mothers_maiden_name: this.mothers_maiden_name || this.profile.mothers_maiden_name,
          identification_document: this.identification_document || this.profile.identification_document,
          country: this.country || this.profile.country,
          state: this.state || this.profile.state,
          municipalitie: this.municipalitie || this.profile.municipalitie,
          phone: this.phone || this.profile.phone,
          birth_date: this.birth_date || this.profile.birth_date,
          nationality: this.nationality || this.profile.nationality,
          street: this.street || this.profile.street,
          outdoor_number: this.outdoor_number || this.profile.outdoor_number,
          interior_number: this.interior_number || this.profile.interior_number,
          zip_code: this.zip_code || this.profile.zip_code
        };

        console.log(profileData, "BODY");

        try {
          const response = await this.$axios.put(url, profileData, { headers });
          console.log(response, "USERS");
          this.$router.push('/user/perfil');
        } catch (error) {
          console.log(error, "ERROR");
          this.loading = false;
        }
      }
    },
  },
  mounted() {
    const decoded = JWTDecode(this.$cookies.get('access_token'));

    if (decoded) {
      const token = "7992136a01a768227f14718e20efe5fa077a0db9"; // Replace with your token value
      const headers = {
        Authorization: `Token ${decoded.token}`,
      };

      const email = this.$store.state.user.email;
      const url = `${this.$config.baseURL}/users/list-app-users/?pre_register=true&email=${email}`;

      this.loading = true;

      this.$axios.get(url, { headers })
        .then(response => {
          console.log(response, "USERS");
          this.email = response.data.app_user_profile;
          this.profile = response.data.app_user_profile; // Almacenar los datos del perfil en la variable "profile"
          this.loading = false;

          // Asignar los valores actuales del perfil a las variables del componente
          this.name = this.profile.name;
          this.fathers_surname = this.profile.fathers_surname;
          this.mothers_maiden_name = this.profile.mothers_maiden_name;
          this.identification_document = this.profile.identification_document;
          this.country = this.profile.country;
          this.state = this.profile.state;
          this.municipalitie = this.profile.municipalitie;
          this.phone = this.profile.phone;
          this.birth_date = this.profile.birth_date;
          this.nationality = this.profile.nationality;
          this.street = this.profile.street;
          this.outdoor_number = this.profile.outdoor_number;
          this.interior_number = this.profile.interior_number;
          this.zip_code = this.profile.zip_code;
        })
        .catch(error => {
          console.log(error, "ERROR");
          this.loading = false;
        });
    }
  },
  components: {
    Loading,
  },
}
</script>
