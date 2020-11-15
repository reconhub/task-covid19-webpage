<template>
  <div>
    <!-- <v-app-bar dark class="hidden-md-and-down" style="background-color: rgb(9, 39, 110);">
      <v-row align="end" class="px-3">
        <p style="margin-bottom: 0;">Together against COVID19</p>
        <v-spacer></v-spacer>
        <a href="https://www.repidemicsconsortium.org/">repidemicsconsortium.org</a>
      </v-row>
    </v-app-bar>-->
    <v-app-bar dark style="background-color: rgb(49,79,150);">
      <v-app-bar-nav-icon @click="$emit('toggleDrawer')" class="hidden-md-and-up"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/" aria-label="return home">
          <v-img width="250" :src="require('@/assets/recon_task_manager_logo_white.png')"/>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="hidden-sm-and-down">
        <ToolBarBtn route="about" text="about"/>
        <ToolBarBtn route="learn" text="learn"/>
        <ToolBarBtn route="explore" text="explore"/>
        <ToolBarBtn v-if="token" route="myTasks" text="My Tasks"/>
        <ToolBarBtn v-if="auth == 'admin' | auth == 'reviewer'" route="review" text="Review"/>
        <ToolBarBtn v-if="auth == 'admin'" route="adminDash" text="Admin Dashboard"/>
        <!-- <v-btn @click="$router.push('repos')">Repos</v-btn> -->
      </div>
      <v-spacer></v-spacer>
      <div class="hidden-xs-only">
        <ToolBarBtn v-if="!token" text="Log In" :href="git_login_url"/>
        <ToolBarBtn v-if="token" text="Log Out" @click="logout"/>
      </div>
      <div class="hidden-sm-and-up">
        <ToolBarBtn v-if="!token" icon="fa-sign-in" :href="git_login_url"/>
        <ToolBarBtn v-if="token" icon="fa-sign-out" @click="logout"/>
      </div>
    </v-app-bar>
  </div>
</template>
<script>
import ToolBarBtn from "@/components/ToolBarBtn";

export default {
  name: "toolbar",
  props: ["token", "auth"],
  components: { ToolBarBtn },
  data() {
    return {
      git_login_url: process.env.VUE_APP_GIT_LOGIN
    };
  },
  methods: {
    logout() {
      sessionStorage.setItem("RECON_GitHub_Token", "");
      sessionStorage.setItem("RECON_User_Auth", "");
      sessionStorage.setItem("RECON_User_Name", "");
      sessionStorage.setItem("RECON_JWT", "");
      this.$emit("updateToken");
      this.$emit("updateAuth");
      this.$emit("updateUser");
      this.$emit("updateJWT");
      this.$router.push("/");
    }
  },
  mounted() {}
};
</script>
