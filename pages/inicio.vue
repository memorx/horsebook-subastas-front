<template>
  <h1>Bienvenido a HorseBook</h1>
</template>
<style>
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

  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;

  width: 280px;
  height: 822px;

  /* Gray/50 */

  background: #F9FAFB;
  /* Gray/200 */

  border-right: 1px solid #EAECF0;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0px;

  width: 280px;
  height: 822px;


  /* Inside auto layout */

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 1
}

.nav {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 32px 0px 0px;
  gap: 84px;

  width: 280px;
  height: 505px;


  /* Inside auto layout */

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
}

.footer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 16px 32px;
  gap: 24px;

  width: 280px;
  height: 72px;


  /* Inside auto layout */

  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
}
</style>
