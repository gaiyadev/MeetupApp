<template>
  <v-container fluid>
    <v-row class="text-center">
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h5 class="primary--text">{{ meetup.title }}</h5>
          </v-card-title>
          <v-img :src="meetup.src" height="334"></v-img>
          <v-card-text>
            <h3 class="info--text">
              {{ meetup.date }} by {{ meetup.time }} ait
              {{ meetup.location }}
            </h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id harum
              consectetur temporibus voluptate eos possimus dolorem deserunt sed
              dolore magnam, ratione quaerat iure, consequuntur ipsum nemo
              explicabo ipsa quas quisquam.
            </p>
          </v-card-text>
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
    }
  }
};
</script>
