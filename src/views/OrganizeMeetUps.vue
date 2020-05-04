<template>
  <v-container>
    <v-row wrap>
      <v-col cols="2"></v-col>
      <v-col cols="8">
        <v-card class="card py-6 px-6">
          <v-card-title class="primary--text text-uppercase">
            <h3>Organze meetup</h3>
          </v-card-title>
          <v-form ref="form" @submit.prevent="onCreateMeetup" v-model="valid" lazy-validation>
            <v-text-field
              v-model="title"
              prepend-icon="fas fa-location-arrow"
              :counter="10"
              :rules="titleRules"
              label="Title"
              required
            ></v-text-field>
            <v-text-field
              v-model="location"
              prepend-icon="fas fa-location-arrow"
              :counter="10"
              :rules="nameRules"
              label="Location"
              required
            ></v-text-field>
            <v-textarea
              prepend-icon="fas fa-info"
              v-model="description"
              :counter="100"
              :rules="descriptionRules"
              multiline
              label="Description"
              required
            ></v-textarea>
            <v-text-field
              prepend-icon="far fa-images"
              v-model="src"
              :counter="10000"
              :rules="imageURLRules"
              label="ImageURL"
              required
            ></v-text-field>
            <img :src="src" alt height="200" />
            <br />
            <v-date-picker
              class="px-2 mt-2"
              v-model="datePicker"
              :landscape="landscape"
              :full-width="fullWidth"
              :readonly="readonly"
              :disabled="disabled"
            ></v-date-picker>
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
            <br />
            <v-btn
              type="submit"
              :disabled="!valid"
              color="success"
              class="mr-4 danger--text"
              @click="validate"
            >Create Meetup</v-btn>

            <v-btn color="error" class="mr-4" @click="reset">Reset Form</v-btn>

            <v-btn color="warning" @click="resetValidation">Reset Validation</v-btn>
          </v-form>
        </v-card>
      </v-col>
      <v-col cols="2"></v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    timePicker: null,
    disabled: false,
    readonly: false,
    landscape: false,
    ampmInTitle: false,
    useSeconds: false,
    format: "ampm",
    fullWidth: false,
    noTitle: false,
    scrollable: false,
    datePicker: new Date().toISOString().substr(0, 10),
    valid: true,
    title: "",
    titleRules: [
      v => !!v || "Title is required",
      v => (v && v.length <= 10) || "Title must be less than 10 characters"
    ],
    location: "",
    nameRules: [
      v => !!v || "Location is required",
      v => (v && v.length <= 10) || "Location must be less than 10 characters"
    ],
    description: "",
    descriptionRules: [
      v => !!v || "Description is required",
      v =>
        (v && v.length >= 5) || "Description must be greater than 5 characters",
      v =>
        (v && v.length <= 100) || "Description must be less than 50 characters"
    ],
    src: "",
    imageURLRules: [
      v => !!v || "ImageURL is required",
      v => (v && v.length >= 5) || "ImageURL must be greater than 5 characters",
      v => (v && v.length <= 10000) || "Image must be less than 50 characters"
    ]
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    enableEvents() {
      console.log("added");
    },
    onCreateMeetup() {
      const meetupData = {
        title: this.title,
        location: this.location,
        src: this.src,
        description: this.description,
        date: this.datePicker,
        time: this.timePicker
      };
      this.$store.dispatch("createMeetup", meetupData);
      this.$router.push("/meetups");
    }
  }
};
</script>

<style scoped>
.card {
  padding: 10px, 30px;
}
</style>