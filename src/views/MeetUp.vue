<template>
  <v-row>
    <v-col cols="12">
      <v-card class="primary">
        <v-img src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg" height="194" width="400"></v-img>

        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="headline mb-1 white--text">My Meetups 5</v-list-item-title>
            <v-list-item-subtitle class="white--text">Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
        </v-list-item>
        <v-card-actions>
          <v-btn flat to="/meetups/:id">
            <v-icon>mdi-chevron-right</v-icon>View Meetups
          </v-btn>
          <v-btn flat class="info">Button</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>