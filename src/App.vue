<template>
  <v-app>
    <v-navigation-drawer v-model="drawer">
      <v-list>
        <v-list-item v-for="item in menuItems " :key="item.title" link>
          <v-icon>{{ item.icon }}</v-icon>
          <v-list-item-content>{{ item.title }}</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app>
      <!-- <v-toolbar> -->
      <v-app-bar-nav-icon @click="drawer = !drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>
      <v-toolbar-title>Meet-Up</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn text v-for="item in menuItems" :key="item.title">
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
      <!-- </v-toolbar> -->
    </v-app-bar>

    <v-content>
      <router-view></router-view>
      <HelloWorld />
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",

  components: {
    HelloWorld
  },

  data() {
    return {
      drawer: false,
      menuItems: [
        { title: "View ", icon: "dashboard" },
        { title: "View Neetup", icon: "dashboard" },
        { title: "Organize meetup", icon: "mdi-open-in-new" },
        { title: "profile", icon: "mdi-open-in-new" },
        { title: "sign up", icon: "mdi-open-in-new" },
        { title: "sign in", icon: "mdi-open-in-new" }
      ]
    };
    //
  },
  methods: {}
};
</script>
