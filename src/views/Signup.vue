<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="2"></v-col>
      <v-col cols="8">
        <h2>Sign up for Meetup</h2>
        <v-form @submit.prevent="onSignup" ref="form" v-model="valid" lazy-validation>
          <!-- <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required></v-text-field> -->

          <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="show1 = !show1"
            :type="show1 ? 'text' : 'password'"
            label="Password"
            required
          ></v-text-field>
          <v-text-field
            v-model="confirmPassword"
            :rules="confirmPasswordRules"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="show1 = !show1"
            :type="show1 ? 'text' : 'password'"
            label="Confirm Password"
            required
          ></v-text-field>

          <v-btn
            large
            type="submit"
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
          >Sign in</v-btn>
        </v-form>
      </v-col>
      <v-col cols="2"></v-col>
    </v-row>
  </v-container>
</template>


<script>
export default {
  data: () => ({
    valid: true,
    show1: false,
    show2: false,
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    password: "",
    passwordRules: [
      v => !!v || "Password is required",
      v => (v && v.length >= 8) || "Password must be less than 8 characters"
    ],
    confirmPassword: "",
    confirmPasswordRules: [
      v => !!v || "Confirm Password is required",
      v =>
        (v && v.length >= 8) ||
        "Confirm Password must be less than 8 characters"
    ]
  }),
  computed: {
    comparePassword() {
      return this.password !== this.confirmPassword
        ? "Password do not match"
        : "";
    },
    user() {
      return this.$store.getters.user;
    }
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/");
      }
    }
  },

  methods: {
    validate() {
      this.$refs.form.validate();
    },
    onSignup() {
      this.$store.dispatch("signUserUps", {
        email: this.email,
        password: this.password
      });
    }
    // reset() {
    //   this.$refs.form.reset();
    // },
    // resetValidation() {
    //   this.$refs.form.resetValidation();
    // }
  }
};
</script>