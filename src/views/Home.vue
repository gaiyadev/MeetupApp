<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <h2>WELCOME TO MEETUP APP</h2>
        <HelloWorld msg="Welcome to Your Vue.js App" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  }
};
</script>
