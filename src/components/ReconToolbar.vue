<template>
  <v-card color="pink" flat tile>
    <v-toolbar color="grey">
      <v-toolbar-title>
        <router-link to="/">RECON</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn>
        <router-link to="/explore">Explore</router-link>
      </v-btn>
      <v-btn>
        <router-link to="/about">About</router-link>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        href="https://github.com/login/oauth/authorize?scope=user:email&client_id=d7b7ae0e1e00bb84d819"
      >Log in</v-btn>
    </v-toolbar>
  </v-card>
</template>
