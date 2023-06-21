
<template>
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
              <button class="font-montserrat font-medium text-base leading-6 text-gray-900">
                <a href="/user/perfil" class="pl-6">Tus datos
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="footer"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NavBarAuction'
}
</script>
<style>
.sideBar {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  width: 280px;
  height: 100vh;
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
