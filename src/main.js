import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import * as firebase from "firebase";
import alertComp from "./components/Alert.vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import editMeetupDialog from "./components/EditMeetUp.vue";
import editDateDialog from "./components/EditDate.vue";
import editTimeDialog from "./components/EditTime.vue";
import registerDialog from "./components/Register.vue";

window.Fire = new Vue();

const options = {
  // You can set your default options here
  timeout: 3500,
  draggable: true,
  closeOnClick: false
};
Vue.use(Toast, options);

Vue.config.productionTip = false;
Vue.component("alert", alertComp);
Vue.component("editMeetupDialog", editMeetupDialog);
Vue.component("editDateDialog", editDateDialog);
Vue.component("editTimeDialog", editTimeDialog);
Vue.component("registerDialog", registerDialog);


var firebaseConfig = {
  apiKey: "AIzaSyBnSST36jE2sUKGkR0A-L_9rnkWzF0E1io",
  authDomain: "meetup-app-a6a53.firebaseapp.com",
  databaseURL: "https://meetup-app-a6a53.firebaseio.com",
  projectId: "meetup-app-a6a53",
  storageBucket: "gs://meetup-app-a6a53.appspot.com",
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
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch("authSignIn", user);
      }
    });
    this.$store.dispatch("loadedMeetups");
  }

}).$mount("#app");
