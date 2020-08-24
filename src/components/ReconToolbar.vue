<template>
  <v-card flat tile>
    <v-toolbar>
      <v-row align="end" class="px-3">
        <p>Together against COVID19</p>
        <v-spacer></v-spacer>
        <a href="https://www.repidemicsconsortium.org/">repidemicsconsortium.org</a>
      </v-row>
    </v-toolbar>
    <v-toolbar>
      <v-toolbar-title>
        <v-avatar>
          <v-img :src="require('@/assets/logo-sticker.png')"/>
        </v-avatar>
        <router-link to="/">RECON</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-btn @click="$router.push('repos')">Repos</v-btn> -->
      <v-btn @click="$router.push('about')">About</v-btn>
      <v-btn>Learn</v-btn>
      <v-btn v-if="token" @click="$router.push('myTasks')">My Tasks</v-btn>
      <v-btn @click="$router.push({ name: 'explore'})">Explore</v-btn>
      <v-btn v-if="auth == 'admin' | auth == 'reviewer'" @click="$router.push('review')">Review</v-btn>
      <v-btn v-if="auth == 'admin'" @click="$router.push('adminDash')">Admin Dashboard</v-btn>
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
    this.git_login_url = process.env.VUE_APP_GIT_LOGIN;
  }
};
</script>