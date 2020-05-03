<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="2"></v-col>
      <v-col cols="8">
        <v-card v-if="error">
          <alert @dismissed="onDismissed" :text="error.message"></alert>
        </v-card>
        <h2>Sign up for Meetup</h2>
        <v-form @submit.prevent="onSignup" ref="form" class="mt-4" v-model="valid" lazy-validation>
          <!-- <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required></v-text-field> -->

          <v-text-field
            v-model="email"
            outlined
            shaped
            error-count="2"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="show1 = !show1"
            outlined
            shaped
            :type="show1 ? 'text' : 'password'"
            label="Password"
            error-count="4"
            required
          ></v-text-field>
          <v-text-field
            v-model="confirmPassword"
            error-count="2"
            :rules="confirmPasswordRules"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="show2 = !show2"
            :type="show2 ? 'text' : 'password'"
            outlined
            shaped
            label="Confirm Password"
            required
          ></v-text-field>

          <v-btn
            shaped
            block
            x-large
            type="submit"
            :disabled="!valid"
            :loading="loading4"
            color="primary"
            class="mr-4"
            @click="validate"
          >
            Sign up
            <span class="custom-loader">
              <v-icon light>cached</v-icon>
            </span>
          </v-btn>
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
      v => (v && v.length >= 8) || "Password must be less than 8 characters",
      v => /(?=.*[A-Z])/.test(v) || "Must have one uppercase character",
      v => /(?=.*\d)/.test(v) || "Must have one number"
      // v => /([!@$%<>*''])/.test(v) || "Must have one special character [!@#$%]"
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
    },
    error() {
      return this.$store.getters.error;
    }, loading() {
      this.$store.getters.loading
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
    },
    onDismissed() {
      this.$store.dispatch("clearError");
      console.log("onDismissed");
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