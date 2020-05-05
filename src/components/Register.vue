<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Register</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline primary--text">Register</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="name" label="Full name*" required></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field label="Email*" v-model="email" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Location*" v-model="location" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn large class="primary" text @click="onRegister">Register</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: ["meetupId"],
  data: () => ({
    dialog: false,
    name: "",
    email: "",
    location: ""
  }),
  methods: {
    onRegister() {
      if (
        this.name.trim() === "" ||
        this.email.trim() === "" ||
        this.location.trim() === ""
      ) {
        return false;
      }
      this.$store
        .dispatch("registerForMeetups", {
          name: this.name,
          email: this.email,
          location: this.location
        })
        .then(() => {
          this.$toast.success("Register successfully succesfully");
        })
        .catch(error => {
          console.log(error);
        });
      this.dialog = false;
    }
  }
};
</script>