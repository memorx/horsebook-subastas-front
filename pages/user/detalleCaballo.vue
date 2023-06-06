<template>
  <div class="container">
    <Loading v-if="loading"
      class="fixed w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50" />
    <div class="sideBar bg-gray-200 border-r border-gray-300">
      <div class="content">
        <div class="nav">
          <div class="frame1">
            <img src="../../public/image_la_silla.png" alt="logo" width="90" height="92">
          </div>
          <div class="navigation">
            <div class="navItemBase bg-gray-800 rounded-lg">
              <div class="contentt flex items-center gap-2">
                <div class="gavel w-5 h-5"></div>
                <p class="font-montserrat font-medium text-base text-white">Tus subastas</p>
              </div>
            </div>
            <div class="framee1">
              <div class="divider"></div>
            </div>

            <div class="navItemBasee">
              <div class="contenttt flex items-center gap-2">
                <div class="description"></div>
                <p class="font-montserrat font-medium text-base leading-6 text-gray-900">Tus datos</p>
              </div>
            </div>
          </div>
        </div>
        <div class="footer"></div>
      </div>
    </div>
    <div class="main">
      <div class="breadcumbs">
        <!-- <p class="textBreadcumbs">Tus subastas / Subasta {{ item.id }} </p> -->
        <p class="textBreadcumbs">Tus subastas / Subasta 3 / Caballo</p>
      </div>
      <div class="main2">
        <img src="../../public/image_horse_details.png" width="100%" height="100%">
        <div class="title">
          <p class="styleTitle">Subasta</p>

          <!-- <p class="datesAuction">Fecha de subasta: {{ new Date(item.start_pre_bid).toLocaleString() }}</p> -->
          <p class="datesAuction">Fecha de subasta:</p>
          <div class="containerButton">
            <button class="button" @click="showModal = true">Hacer oferta</button>
          </div>
        </div>
        <!-- <div class="framee1">
          <div class="dividerr"></div>
        </div> -->
        <div class="pujas">
          <p class="titlePujas">Pujas</p>
          <p class="subtitlePujasStyle">Últimas pujas</p>
          <div class="cuadroPujas">
            <div class="tableHeaderCellName">
              <p class="titleName">Nombre</p>
              <div class="nameList">
                <p class="textNamePuja">Carlos Montes</p>
                <p class="textNamePuja">Matías Koziupa</p>
                <p class="textNamePuja">Alejandro Lopez</p>
                <p class="textNamePuja">Daniel Santiago</p>
                <p class="textNamePuja">Diana Mendez</p>
                <!-- <hr class="nameListSeparator"> -->
              </div>
            </div>
            <div class="tableHeaderCellPuja">
              <p class="titleName">Puja</p>
              <div class="pujaList">
                <p class="textPuja">$30000</p>
                <p class="textPuja">$20000</p>
                <p class="textPuja">$10050</p>
                <p class="textPuja">$10000</p>
                <p class="textPuja">$10000</p>
                <!-- <hr class="nameListSeparator"> -->
              </div>
            </div>
            <div class="tableHeaderCellDate">
              <p class="titleName">Fecha</p>
              <div class="pujaList">
                <p class="textPuja">20/4/2023</p>
                <p class="textPuja">21/4/2023</p>
                <p class="textPuja">5/3/2023</p>
                <p class="textPuja">10/3/2023</p>
                <p class="textPuja">20/3/2023</p>
                <!-- <hr class="nameListSeparator"> -->
              </div>
            </div>
          </div>
        </div>
        <div class="gallery">
          <p class="titleGallery">Galeria</p>
          <p class="subtitleGallery">Fotos y videos del caballo</p>
          <div class="imageDetails">
            <img src="../../public/horse_white.png" width="45%" height="45%" style="margin-right: 10px;">
            <img src="../../public/horse_black.png" width="45%" height="45%">
          </div>
        </div>
        <div class="transmision">
          <p class="titleTransmision">Transmision</p>
          <p class="subtitleTransmision">Mira en vivo la subasta</p>
          <div class="videoContainer">
            <iframe width="560" height="315" :src="videoUrl" frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
        </div>
      </div>
      <div class="modal modal-lg" v-if="showModal">
        <div class="modal-content">
          <h3 class="sendPuja">Enviar puja</h3>
          <p class="valorPuja">Ingresa el valor de tu puja aquí</p>
          <p class="pujar">Puja</p>
          <input class="inputPuja" placeholder="Ingrese valor" id="price" name="price" type="price">
          <div class="containerPujarButton">
            <div class="containerButtonCancelar">
              <button class="buttonCancelar" @click="showModal = false">Cancelar</button>
            </div>
            <div class="containerButtonn">
              <button class="button">Pujar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.buttonCancelar {
  font-family: 'Montserrat' "sans-serif";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  /* identical to box height, or 150% */


  /* Gray/700 */

  color: #344054;

}

.containerButtonCancelar {
  box-sizing: border-box;

  /* Auto layout */

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 16px;
  gap: 8px;
  margin-left: 90px;
  width: 210px;
  height: 44px;

  background: #FFFFFF;
  /* Shadow/xs */

  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
}

.containerButtonn {
  box-sizing: border-box;

  /* Auto layout */

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 16px;
  gap: 8px;
  margin-left: 60px;
  width: 210px;
  height: 44px;

  background: #171618;
  /* Shadow/xs */

  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
}

.containerPujarButton {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 30px;
}

.inputPuja {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 14px;
  gap: 8px;

  width: 100%;
  height: 5%;

  /* Base/White */

  background: #FFFFFF;
  /* Gray/300 */

  border: 1px solid #D0D5DD;
  /* Shadow/xs */

  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;
}

.pujar {
  font-family: 'Montserrat' "sans-serif";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  /* identical to box height, or 150% */
  padding-top: 10px;

  /* Gray/700 */

  color: #344054;
}

.valorPuja {
  font-family: 'Montserrat' "sans-serif";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  /* identical to box height, or 171% */


  /* Gray/600 */

  color: #475467;

}

.sendPuja {
  font-family: 'Montserrat' "sans-serif";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  /* identical to box height, or 150% */


  /* Gray/900 */

  color: #101828;
}

.modal-lg {
  width: 80%;
  height: 80%;
}

.modal {
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}

.subtitleTransmision {
  font-family: 'Montserrat' "sans-serif";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  /* identical to box height, or 150% */
  padding-left: 20px;
  /* Gray/600 */

  color: #475467;

}

.titleTransmision {
  font-family: 'Montserrat' "sans-serif";
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 38px;
  padding-left: 20px;
  /* identical to box height, or 127% */


  /* Gray/900 */

  color: #101828;

}

.transmision {
  display: flex;
  width: 100%;
  height: 100%;
  padding-top: 40px;
  flex-direction: column;
}

.imageDetails {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding-top: 30px;
  padding-left: 20px;

  background: #FFFFFF;
}

.subtitleGallery {
  font-family: 'Montserrat' "sans-serif";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  /* identical to box height, or 150% */
  /* padding-top: 40px; */
  padding-left: 20px;


  /* Gray/600 */

  color: #475467;

}

.titleGallery {
  font-family: 'Montserrat' "sans-serif";
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 38px;
  /* identical to box height, or 127% */
  padding-left: 20px;

  /* Gray/900 */

  color: #101828;

}

.gallery {
  width: 100%;
  height: 100%;
  display: flex;
  padding-top: 150px;
  flex-direction: column;
}

.textPuja {
  font-family: 'Montserrat' "sans-serif";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  /* identical to box height, or 143% */


  /* Gray/600 */

  color: #475467;
}

.pujaList {
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  /* background: #FFFFFF; */

}

.textNamePuja {
  font-family: 'Inter' "sans-serif";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
}

.nameList {
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  /* background: #FFFFFF; */

}

.nameListSeparator {
  margin-top: 12px;
  width: 100%;
  height: 1px;
  /* background-color: #EAECF0; */
}

.textNamee {
  display: flex;
  flex-direction: row;
  align-items: column;
  padding: 0px;
  /* border-bottom: 1px solid #EAECF0; */
  /* box-sizing: border-box; */
}

.tableHeaderCellDate {
  box-sizing: border-box;

  /* Auto layout */

  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 12px 24px;
  gap: 12px;
  justify-content: space-between;
  width: 181px;
  height: 44px;

  /* Base/White */

  background: #FFFFFF;
  /* Gray/200 */

  border-bottom: 1px solid #EAECF0;
}

.tableHeaderCellPuja {
  box-sizing: border-box;

  /* Auto layout */

  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 12px 24px;
  gap: 12px;
  justify-content: space-between;
  width: 122px;
  height: 44px;

  /* Base/White */

  /* background: #FFFFFF; */
  /* Gray/200 */

  border-bottom: 1px solid #EAECF0;
}

.titleName {
  width: 59px;
  height: 18px;
  font-family: 'Montserrat' "sans-serif";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #475467;
}

.tableHeaderCellName {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 12px 24px;
  gap: 12px;
  justify-content: space-between;
  width: 793px;
  height: 44px;
  background: #FFFFFF;
  border-bottom: 1px solid #EAECF0;
}


.cuadroPujas {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding-top: 30px;

  /* width: 1096px; */
  /* height: 476px; */


  /* Base/White */

  background: #FFFFFF;
}

.subtitlePujas {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.subtitlePujasStyle {

  font-family: 'Montserrat' "sans-serif";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  padding-left: 20px;
  /* identical to box height, or 150% */


  /* Gray/600 */

  color: #475467;

}

.dividerr {
  width: 1160px;
  height: 1px;

  /* Gray/200 */

  background: #EAECF0;

  /* Inside auto layout */

  /* flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0; */
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

.titlePujas {
  font-family: 'Montserrat' "sans-serif";
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 38px;
  padding-left: 20px;
  /* identical to box height, or 127% */


  /* Gray/900 */

  color: #101828;

}

.pujas {
  width: 100%;
  height: 100%;
  display: flex;
  padding-top: 10px;
  flex-direction: column;
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
  /* identical to box height, or 150% */


  color: #FFFFFF;


  /* Inside auto layout */

  /* flex: none;
  order: 2;
  flex-grow: 0; */
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


  /* Inside auto layout */

  /* flex: none;
  order: 1;
  flex-grow: 0; */
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

.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 0px 48px;
  gap: 48px;

  /* width: 100%;
  height: 100%; */
  /* overflow-y: scroll; */

  /* background: #FCFCFD;
   */
  background: #FFFFFF;

  /* Inside auto layout */
  /*
  flex: none;
  order: 1;
  flex-grow: 1; */
}

.breadcumbs {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 32px;
  gap: 12px;

  width: 100%;
  height: 100%;


  /* Inside auto layout */
  /*
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0; */
}

.breadcumbsTitle {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;

  /* width: 90px;
height: 20px; */


  /* Inside auto layout */

  /* flex: none;
order: 0;
flex-grow: 0; */
}

.textBreadcumbs {

  /* width: 90px; */
  /* height: 20px; */

  font-family: 'Montserrat' "sans-serif";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  /* identical to box height, or 143% */


  /* Gray/600 */

  color: #475467;
}

.breadcumbsText {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;

  width: 67px;
  height: 20px;


  /* Inside auto layout */

  /* flex: none;
  order: 8;
  flex-grow: 0; */
}

.main2 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 0px 48px;
  gap: 48px;

  /* width: 100vh;
  height: 100vh; */

  /* Gray/25 */

  /* background: #FCFCFD; */
  background: #FFFFFF;

  /* Inside auto layout */

  /* flex: none;
order: 1;
align-self: stretch;
flex-grow: 0; */
}

.title {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;

  /* width: 1096px;
  height: 52px; */

}

.styleTitle {
  width: 632px;
  height: 38px;
  padding-left: 20px;
  font-family: 'Montserrat' "sans-serif";
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  line-height: 38px;
  /* identical to box height, or 127% */


  /* Gray/900 */

  color: #101828;
}

.datesAuction {
  width: 197px;
  height: 20px;

  font-family: 'Montserrat' "sans-serif";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  /* identical to box height, or 143% */


  /* Gray/500 */

  color: #667085;
}

.containerButton {
  box-sizing: border-box;

  /* Auto layout */

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 16px;
  gap: 8px;

  width: 154px;
  height: 40px;

  background: #171618;
  /* Shadow/xs */

  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
}

.button {
  font-family: 'Montserrat' "sans-serif";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  /* identical to box height, or 143% */


  /* Base/White */

  color: #FFFFFF;

}

.videoContainer {
  width: 100%;
  max-width: 560px;
  margin: 0 auto;
}
</style>
<script>
import Loading from '../../components/shared/Loading.vue';
export default {
  data() {
    return {
      showModal: false,
      videoUrl: 'https://www.youtube.com/embed/oqIIVOvuak0',
      // otros datos
    }
  },


}
</script>
