<template>
  <v-container fluid>
    <v-row class="text-center">
      <v-col cols="12">
        <v-btn large to="/meetups" class="primary" left>Explore Meetups</v-btn>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <v-btn large to="/organize" class="info">Organize Meetups</v-btn>
      </v-col>
    </v-row>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card-text class="px-0">
          <v-carousel>
            <v-carousel-item
              v-for="item in meetups"
              :key="item.id"
              :src="item.src"
              reverse-transition="fade-transition"
              transition="fade-transition"
            >
              <div class="title text-uppercase">{{ item.title }}</div>
            </v-carousel-item>
          </v-carousel>
        </v-card-text>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      meetups: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
          id: "rgrgrththththththt",
          title: "Meet ups in Ghana"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
          id: "fbnmhmj,,k.,k.k",
          title: "Meet ups in Nigeria"
        }
      ]
    };
  }
};
</script>

<style scoped>
.title {
  position: absolute;
  top: 367px;
  left: 700px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #ffffff;
  padding: 20px;
}
</style>