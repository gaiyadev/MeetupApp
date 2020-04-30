<template>
  <v-row>
    <v-col cols="12">
      <v-card class="primary mb-4" v-for="meetup in meetups" :key="meetup.id">
        <v-img :src="meetup.src" height="194" width="400"></v-img>

        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="headline mb-1 white--text">{{ meetup.title}}</v-list-item-title>
            <v-list-item-subtitle class="white--text">
              {{ meetup.date }}
              <br />Greyhound divisely hello coldly fonwderfully
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text :to="'/meetups/' + meetup.id">
            <v-icon>mdi-chevron-right</v-icon>View it
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  computed: {
    meetups() {
      return this.$store.getters.loadedMeetups;
    }
  }
};
</script>