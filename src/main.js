import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import * as firebase from 'firebase';

Vue.config.productionTip = false;

var firebaseConfig = {
  apiKey: "AIzaSyBnSST36jE2sUKGkR0A-L_9rnkWzF0E1io",
  authDomain: "meetup-app-a6a53.firebaseapp.com",
  databaseURL: "https://meetup-app-a6a53.firebaseio.com",
  projectId: "meetup-app-a6a53",
  storageBucket: "meetup-app-a6a53.appspot.com",
  messagingSenderId: "824424202389",
  appId: "1:824424202389:web:386b5288d0970329e19b9c",
  measurementId: "G-FJD29TGR8E"
};

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }
}).$mount("#app");


