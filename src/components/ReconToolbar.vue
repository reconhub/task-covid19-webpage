<template>
  <div>
    <v-app-bar class="hidden-md-and-down">
      <v-row align="end" class="px-3">
        <p style="margin-bottom: 0;">Together against COVID19</p>
        <v-spacer></v-spacer>
        <a href="https://www.repidemicsconsortium.org/">repidemicsconsortium.org</a>
      </v-row>
    </v-app-bar>
    <v-app-bar>
      <v-app-bar-nav-icon @click="$emit('toggleDrawer')" class="hidden-lg-and-up"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <v-avatar>
          <v-img :src="require('@/assets/logo-sticker.png')"/>
        </v-avatar>
        <router-link to="/">RECON</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="hidden-md-and-down">
        <v-btn @click="$router.push('about')">About</v-btn>
        <v-btn @click="$router.push('learn')">Learn</v-btn>
        <v-btn @click="$router.push({ name: 'explore'})">Explore</v-btn>
        <v-btn v-if="token" @click="$router.push('myTasks')">My Tasks</v-btn>
        <v-btn v-if="auth == 'admin' | auth == 'reviewer'" @click="$router.push('review')">Review</v-btn>
        <v-btn v-if="auth == 'admin'" @click="$router.push('adminDash')">Admin Dashboard</v-btn>
        <!-- <v-btn @click="$router.push('repos')">Repos</v-btn> -->
      </div>
      <v-spacer></v-spacer>
      <v-btn v-if="!token" :href="git_login_url">Log in</v-btn>
      <v-btn v-if="token" @click="logout">Log Out</v-btn>
    </v-app-bar>
  </div>
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