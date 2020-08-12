<template>
  <v-card color="pink" flat tile>
    <v-toolbar color="grey">
      <!-- <v-avatar>
        <v-img :src="require('@/assets/logo-sticker.png')"/>
      </v-avatar>-->
      <v-toolbar-title>
        <router-link to="/">RECON</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="token" @click="$router.push({ name: 'explore'})">Explore</v-btn>
      <v-btn @click="$router.push('about')">About</v-btn>
      <v-btn>Learn</v-btn>
      <v-btn v-if="auth == 'admin'" @click="$router.push('review')">Review</v-btn>
      <v-spacer></v-spacer>
      <v-btn
        v-if="!token"
        href="https://github.com/login/oauth/authorize?scope=public_repo,user:email,write:discussion&client_id=d7b7ae0e1e00bb84d819"
      >Log in</v-btn>
      <v-btn v-if="token" @click="logout">Log Out</v-btn>
    </v-toolbar>
  </v-card>
</template>
<script>
export default {
  name: "toolbar",
  props: ["token", "auth"],
  data() {
    return {};
  },
  methods: {
    logout() {
      sessionStorage.setItem("RECON_GitHub_Token", "");
      sessionStorage.setItem("RECON_User_Auth", "");
      sessionStorage.setItem("RECON_User_Name", "");
      this.$emit("updateToken");
      this.$emit("updateAuth");
      this.$emit("updateUser");
      this.$router.push("/");
    }
  }
};
</script>