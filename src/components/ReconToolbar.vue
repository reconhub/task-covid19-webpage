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
      <v-btn @click="$router.push('repos')">Repos</v-btn>
      <v-btn @click="$router.push('about')">About</v-btn>
      <v-btn v-if="token" @click="$router.push({ name: 'explore'})">Explore</v-btn>
      <v-btn>Learn</v-btn>
      <v-btn v-if="auth == 'admin'" @click="$router.push('review')">Review</v-btn>
      <v-spacer></v-spacer>
      <v-btn v-if="!token" :href="git_login_url">Log in</v-btn>
      <v-btn v-if="token" @click="logout">Log Out</v-btn>
    </v-toolbar>
  </v-card>
</template>
<script>
export default {
  name: "toolbar",
  props: ["token", "auth"],
  data() {
    return {
      git_login_url: ""
    };
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
  },
  mounted() {
    console.log("process env", process.env.VUE_APP_GIT_LOGIN);
    this.git_login_url = process.env.VUE_APP_GIT_LOGIN;
  }
};
</script>