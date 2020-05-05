<template>
  <v-container fluid>
    <v-row class="text-center">
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h5 class="primary--text">{{ meetup.title }}</h5>
            <template v-if="createdCreator">
              <v-spacer></v-spacer>
              <editMeetupDialog :meetup="meetup"></editMeetupDialog>
            </template>
          </v-card-title>
          <v-img :src="meetup.src" height="334"></v-img>
          <v-card-text>
            <h3 class="info--text">
              {{ meetup.date }} at {{ meetup.time }} ait
              {{ meetup.location }}
            </h3>
            <template v-if="createdCreator">
              <v-spacer></v-spacer>
              <editDateDialog :meetup="meetup"></editDateDialog>
            </template>
            <v-spacer></v-spacer>
            <p>{{meetup.description }}</p>
          </v-card-text>
          <template v-if="createdCreator">
            <v-spacer></v-spacer>
            <editTimeDialog :meetup="meetup"></editTimeDialog>
          </template>
          <v-card-actions>
            <v-btn class="primary" large to="/register">
              <v-icon>mdi-chevron-right</v-icon>Register
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  props: ["id"],
  computed: {
    meetup() {
      return this.$store.getters.loadedMeetup(this.id);
    },
    isUserAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    createdCreator() {
      if (!this.isUserAuthenticated) {
        return false;
      }
      return this.$store.getters.user.id === this.meetup.createdBy;
    }
  },
  created() {
    setInterval(() => {
      this.$store.dispatch("loadedMeetups");
    }, 30000);
  }
};
</script>
