<template>
  <div id="app">
    <div id="nav">
      <div class="content-grid content-grid--light">
        <v-app id="inspire">
          <v-card class="mx-auto4 overflow-hidden" height="100%">
            <v-app-bar color="deep-black" dark>
              <v-app-bar-nav-icon @click="drawer = true">MENU</v-app-bar-nav-icon>
              <v-toolbar-title>
                <div class="logo">
                  <a title="logo" href="/">
                    <img src="@/assets/img/Star-Wars-Logo.png" alt="texto descriptivo" />
                  </a>
                </div>
              </v-toolbar-title>
              <back />
            </v-app-bar>

            <router-view />

            <v-navigation-drawer v-model="drawer" absolute temporary>
              <v-list nav dense>
                <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
                  <v-list-item>
                    <v-list-item-title>
                      <router-link to="/">Home</router-link>
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>
                      <router-link to="/pages/1">Characters</router-link>
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>
                      <router-link to="/films/page=1">Films</router-link>
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>
                      <router-link to="/species/page=1">Species</router-link>
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>
                      <router-link to="/login/">Chat</router-link>
                    </v-list-item-title>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-navigation-drawer>
          </v-card>
        </v-app>
      </div>
    </div>
  </div>
</template>
<script>
import back from "./components/ButtonBack";
export default {
  components: { back },
  data() {
    return {
      drawer: false,
      group: []
    };
  }
};
</script>

<style>
.container {
  margin: auto !important;
}
.v-application .d-block {
  display: flex !important;
}
/* navbar */
.v-navigation-drawer {
  /* background-image: url("https://vignette.wikia.nocookie.net/mortal-kombat-fanon/images/3/36/Kr.png/revision/latest?cb=20171221013049&path-prefix=es"); */
  background-repeat: no-repeat;
  background-image: url("https://i.pinimg.com/564x/be/a7/84/bea7847ca4422abf083fa846da6d5f5b.jpg");
  /* background-size: contain;
  background-attachment: fixed;
  background-position: unset; */
  background-position: top;
  background-size: cover;
}
.v-list-item__title i {
  color: darkred !important;
}

.mx-auto4 {
  background-color: #202020 !important;
  font-family: "Aldrich", sans-serif;
}
.v-application a {
  color: white !important;
  font-size: small;
}
.v-item-group {
  padding-top: 10px !important;
}
.logo img {
  width: 60px;
  padding-top: 15px;
}
/* toolbar */
.v-toolbar__content {
  background: darkred !important;
}
.d-flex {
  justify-content: center !important;
}
/* search */
.buscar {
  margin-left: 10px !important;
  font-weight: bolder;
  color: black;

  padding-top: 6px;
}
/* pages */

/* button */
.arrows-div {
  width: 0px !important;
}
/* species */
.v-card__title {
  display: flex !important;
  justify-content: center !important;
}
a {
  text-decoration: none;
}
.arrows-div {
  width: 1000px;
  margin: 0 auto;
  padding-top: 70px;
}
.button {
  position: relative;
  margin: 0;
  padding-left: 14px;
  padding-top: 5px;
  color: #ffffff;
  font-size: 20px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
}
.button::after {
  content: "";
  position: absolute;
  top: 2.5px;
  width: 0;
  height: 0;
}
.button:hover {
  color: #9fd4e2;
}

/* .next {
  margin-right: 40px;
} */

.next:hover::after {
  color: #9fd4e2;
}

.prev {
  margin-left: 80px;
}
.prev::after {
  left: -22px;
  height: 5px;
  top: 2px;
  border-color: transparent #232c39 transparent transparent;
  border-width: 12px;
}
.prev:hover::after {
  color: #9fd4e2;
}

.current {
  background-color: #262f3d;
  color: #9cd3e1;

  text-decoration: none;
  font-size: 20px;
}

.back-td {
  width: 250px;
  text-align: left;
}
.prev-td {
  width: 250px;
  text-align: right;
}
.paging-td {
  width: 500px;
  text-align: center;
}
@keyframes dash {
  to {
    stroke-dashoffset: 136;
  }
}

.loading {
  font-size: 5px;
  animation: blink 0.9s ease-in-out infinite;
}
.loader {
  display: flex !important;
  justify-content: center !important;
}
@keyframes blink {
  50% {
    opacity: 0;
  }
}

/* search */
#searchform {
  display: inline;
  font-size: 1em;
  border-radius: 8em;
  border: 0.1em solid rgba(218, 208, 190, 1);
  box-shadow: 0 0 0.3em rgba(60, 60, 60, 0.4);
  padding: 0.3em;
  background: white;
}
#s {
  transition: all 0.2s ease-out;
  width: 1px;
  border-radius: 0;
  box-shadow: none;
  outline: none;
  padding: 0;
  margin: 0;
  border: 0;
  background-color: transparent;
  opacity: 0;
}
#s:focus {
  width: 8em;
  opacity: 1;
}
label {
  padding-top: 10px;
  padding-left: 1px;
  display: inline-block;
  margin-top: 0.3em;
  color: rgba(218, 208, 190, 1);
  text-shadow: 0 0 0.1em rgba(60, 60, 60, 0.3);
  position: relative;
  left: 0.1em;
}
/* button only back */
.my-2 {
  margin: auto !important;
  margin-right: unset !important;
}
</style>
