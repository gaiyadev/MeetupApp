<template>
  <v-container fluid>
    <v-row class="text-center">
      <v-col cols="12">
        <v-btn large to="/meetups" class="primary">Explore Meetups</v-btn>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <v-btn large to="/organize" class="info">Organize Meetups</v-btn>
      </v-col>
    </v-row>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card-text class="px-0">
          <v-carousel>
            <v-carousel-item
              v-for="(item,i) in items"
              :key="i"
              :src="item.src"
              reverse-transition="fade-transition"
              transition="fade-transition"
            ></v-carousel-item>
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
      items: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg"
        }
      ]
    };
  }
};
</script>