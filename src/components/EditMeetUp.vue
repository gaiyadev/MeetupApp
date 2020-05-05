<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn large fab color="primary" dark v-on="on">
          <v-icon>mdi-marker</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Edit Meetup</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="title"
                  name="title"
                  prepend-icon="fas fa-location-arrow"
                  label="Title"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="location"
                  name="location"
                  prepend-icon="fas fa-location-arrow"
                  :counter="10"
                  label="Location"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  prepend-icon="fas fa-info"
                  v-model="description"
                  name="description"
                  :counter="100"
                  multiline
                  label="Description"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn large color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn large class="primary" text @click="saveChanges">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: ["meetup"],
  data: () => ({
    dialog: false,
    title: "",
    location: "",
    description: ""
  }),
  methods: {
    saveChanges() {
      if (
        this.title.trim() === "" ||
        this.location.trim() === "" ||
        this.description.trim() === ""
      ) {
        return false;
      }
      this.$store.dispatch("updateMeetUpData", {
        id: this.meetup.id,
        title: this.title,
        location: this.location,
        description: this.description
      });
      this.dialog = false;
    }
  },
  created() {
    (this.title = this.meetup.title),
      (this.location = this.meetup.location),
      (this.description = this.meetup.description);
  }
};
</script>

<style scoped>
.card {
  padding: 10px, 30px;
}
</style>
