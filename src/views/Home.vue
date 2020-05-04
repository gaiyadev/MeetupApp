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
        <v-progress-circular :size="70" v-if="loading" :width="7" color="primary" indeterminate></v-progress-circular>
        <v-card-text class="px-0" v-if="!loading">
          <v-carousel style="cursor: pointer;">
            <v-carousel-item
              v-for="item in meetups"
              :key="item.id"
              :src="item.src"
              reverse-transition="fade-transition"
              transition="fade-transition"
              @click="OnLoadMeetup(item.id)"
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
  computed: {
    meetups() {
      return this.$store.getters.featureMeetups;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    OnLoadMeetup(id) {
      this.$router.push("/meetups/" + id);
    }
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
.v-progress-circular {
  margin-left: 670px;
  margin-top: 10%;
}
</style>