<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Edit Time</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Edit Time</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-time-picker
                  class="ml-7 mt-2 mb-10"
                  v-model="timePicker"
                  :disabled="disabled"
                  :readonly="readonly"
                  :landscape="landscape"
                  :ampm-in-title="ampmInTitle"
                  :use-seconds="useSeconds"
                  :format="format"
                  :full-width="fullWidth"
                  :no-title="noTitle"
                  :scrollable="scrollable"
                ></v-time-picker>
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
    timePicker: null,
    disabled: false,
    readonly: false,
    landscape: false,
    ampmInTitle: false,
    useSeconds: false,
    format: "ampm",
    fullWidth: false,
    noTitle: false,
    scrollable: false
  }),
  methods: {
    saveChanges() {
      this.$store
        .dispatch("updateMeetUpData", {
          id: this.meetup.id,
          time: this.timePicker
        })
        .then(() => {
          this.$toast.success("Time Updated succesfully");
        })
        .catch(error => {
          console.log(error);
        });
      this.dialog = false;
    }
  }
};
</script>

<style scoped>
.card {
  padding: 10px, 30px;
}
</style>
