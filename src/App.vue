<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" absolute>
      <v-list nav class="py-30">
        <v-list-item v-for="item in menuItems" :key="item.title" router :to="item.link">
          <v-icon>{{ item.icon }}</v-icon>
          <v-list-item-content>{{ item.title }}</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" class="py-70">
      <!-- <v-toolbar> -->
      <v-app-bar-nav-icon @click.stop="drawer=!drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link id="logo" to="/" class="text-uppercase">Meet-Up</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn text v-for="item in menuItems" :key="item.title" router :to=" item.link ">
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
      <!-- </v-toolbar> -->
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",

  components: {},

  data() {
    return {
      drawer: false,
      menuItems: [
        { title: "View ", icon: "dashboard", link: "/" },
        { title: "View Neetup", icon: "dashboard", link: "/about" },
        { title: "Organize meetup", icon: "mdi-open-in-new", link: "/" },
        { title: "profile", icon: "mdi-open-in-new", link: "/profile" },
        { title: "sign in", icon: "home", link: "/login" },
        { title: "sign up", icon: "mdi-open-in-new", link: "/register" }
      ]
    };
    //
  },
  methods: {}
};
</script>
<style scoped>
#logo {
  color: white;
  text-decoration: none;
}
</style>