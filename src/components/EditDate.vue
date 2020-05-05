<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Edit Date</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Edit Date</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-date-picker
                  style="width: 100%"
                  class="px-2 mt-2"
                  v-model="datePicker"
                  :landscape="landscape"
                  :readonly="readonly"
                  :disabled="disabled"
                ></v-date-picker>
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
    disabled: false,
    readonly: false,
    landscape: false,
    datePicker: new Date().toISOString().substr(0, 10)
  }),
  methods: {
    saveChanges() {
      // let newDate = new Date(this.meetup.date);
      // const newDay = new Date(this.datePicker).getUTCDate();
      // const newMonth = new Date(this.datePicker).getMonth();
      // const newYear = new Date(this.datePicker).getUTCFullYear();
      // newDate.setUTCDate(newDay);
      // newDate.setUTCMonth(newMonth);
      // newDate.setUTCFullYear(newYear);

      this.$store.dispatch("updateMeetUpData", {
        id: this.meetup.id,
        date: this.datePicker
      });
      this.dialog = false;
    }
  },
  created() {
    // this.datePicker = new Date(this.meetup.date);
  }
};
</script>

<style scoped>
.card {
  padding: 10px, 30px;
}
</style>
