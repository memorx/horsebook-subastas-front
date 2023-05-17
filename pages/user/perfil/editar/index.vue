<template>
  <div class="container">
    <div class="sideBar bg-gray-200 border-r border-gray-300">
      <div class="content">
        <div class="nav">
          <div class="frame1">
            <img src="../../../../public/image_la_silla.png" alt="logo" width="90" height="92">
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
              </div>
            </div>
          </div>
        </div>
        <div class="footer"></div>
      </div>
    </div>
    <div class="containerEdit">
      <div class="mainn">
        <div class="mainTitle">
          <p class="editProfile">Editar perfil</p>
          <p class="editProfileSubtitle">Edita tu perfil y tus datos personales</p>
        </div>
        <div class="buttonAcomodatee">
          <button class="buttonEditContainerr">
            <p class="buttonEditt">Cancelar</p>
          </button>
        </div>
        <div class="buttonAcomodate">
          <button class="buttonEditContainer" @click=updateProfile>
            <p class="buttonEdit">Guardar</p>
          </button>
        </div>
      </div>
      <div class="main">
        <p class="generalDates">Nombre (s)</p>
        <input class="inputs" placeholder="Nombre (s)" />
        <p class="generalDates">Apellido paterno</p>
        <input class="inputs" placeholder="Apellido paterno" />
        <p class="generalDates">Apellido materno</p>
        <input class="inputs" placeholder="Apellido materno" />
        <p class="generalDates">Fecha de nacimiento</p>
        <input class="inputs" placeholder="Fecha de nacimiento" />
        <p class="generalDates">Nacionalidad</p>
        <input class="inputs" placeholder="Nacionalidad" />
        <p class="generalDates">Teléfono</p>
        <input class="inputs" placeholder="Teléfono" />
        <p class="generalDates"># de pasaporte o ID</p>
        <input class="inputs" placeholder="# de pasaporte o ID" />
        <p class="generalDates">Pais</p>
        <input class="inputs" placeholder="Pais" />
        <p class="generalDates">Estado</p>
        <input class="inputs" placeholder="Estado" />
        <p class="generalDates">Ciudad</p>
        <input class="inputs" placeholder="Ciudad" />
        <p class="generalDates">Calle</p>
        <input class="inputs" placeholder="Calle" />
        <p class="generalDates">Número exterior</p>
        <input class="inputs" placeholder="Número exterior" />
        <p class="generalDates">Número interior</p>
        <input class="inputs" placeholder="Número interior" />
        <p class="generalDates">C.P</p>
        <input class="inputs" placeholder="C.P" />
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
  font-family: 'Montserrat' "sans serif";
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
  font-family: 'Montserrat' "sans serif";
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
  font-family: 'Montserrat' "sans serif";
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
  font-family: 'Montserrat' "sans serif";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #475467;
  padding-top: 5px;
  padding-left: 30px;
}

.editProfile {
  font-family: 'Montserrat' "sans serif";
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
import { env } from 'process';
import JWTDecode from 'jwt-decode';
import Loading from '../../../../components/shared/Loading.vue';
export default {
  data() {
    return {
      loading: false,
      loggedInUser: null,
      email: []
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
      console.log(url, "coimollega");
      const decoded = JWTDecode(this.$cookies.get('access_token'))
      console.log(decoded, "decoded")
      if (decoded) {
        const headers = {
          Authorization: `Token ${decoded.token}`,
        };
        console.log(headers, "Headers")
        const email = this.$store.state.user.email
        const name = document.querySelector('input[placeholder="Nombre (s)"]').value;
        const fathers_surname = document.querySelector('input[placeholder="Apellido paterno"]').value;
        const mothers_maiden_name = document.querySelector('input[placeholder="Apellido materno"]').value;
        const identification_document = document.querySelector('input[placeholder="# de pasaporte o ID"]').value;
        const country = document.querySelector('input[placeholder="Pais"]').value;
        const state = document.querySelector('input[placeholder="Estado"]').value;
        const municipalitie = document.querySelector('input[placeholder="Ciudad"]').value;
        const phone = document.querySelector('input[placeholder="Teléfono"]').value;
        const birth_date = document.querySelector('input[placeholder="Fecha de nacimiento"]').value;
        const nationality = document.querySelector('input[placeholder="Nacionalidad"]').value;
        const street = document.querySelector('input[placeholder="Calle"]').value;
        const outdoor_number = document.querySelector('input[placeholder="Número exterior"]').value;
        const interior_number = document.querySelector('input[placeholder="Número interior"]').value;
        const zip_code = document.querySelector('input[placeholder="C.P"]').value;
        const body = {
          email,
          name,
          fathers_surname,
          mothers_maiden_name,
          identification_document,
          country,
          state,
          municipalitie,
          phone,
          birth_date,
          nationality,
          street,
          outdoor_number,
          interior_number,
          zip_code
        };
        console.log(body, "BODY")
        await this.$axios
          .put(url, body, { headers })
          .then((response) => {
            console.log(response, "USERS");
            this.$router.push('/user/perfil')

          },
          )
          .catch((error) => {
            console.log(error, "ERROR");
            this.loading = false;
          });
      }
    },
  }
}

</script>
