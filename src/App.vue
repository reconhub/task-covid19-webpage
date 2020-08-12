<template>
  <div id="app">
    <v-app id="inspire">
      <recon-toolbar
        :token="token"
        :auth="auth"
        :user="user"
        @updateToken="updateToken"
        @updateAuth="updateAuth"
        @updateUser="updateUser"
      />
      <router-view
        @updateToken="updateToken"
        @updateAuth="updateAuth"
        @updateUser="updateUser"
        :token="token"
        :auth="auth"
        :user="user"
      />
    </v-app>
  </div>
</template>
<script>
import ReconToolbar from "@/components/ReconToolbar";
export default {
  name: "app",
  components: {
    ReconToolbar
  },
  data() {
    return {
      token: "",
      auth: "",
      user: ""
    };
  },
  methods: {
    updateToken() {
      this.token = sessionStorage.getItem("RECON_GitHub_Token");
    },
    updateAuth() {
      this.auth = sessionStorage.getItem("RECON_User_Auth");
    },
    updateUser() {
      this.user = sessionStorage.getItem("RECON_User_Name");
    }
  },
  mounted() {
    this.updateToken();
    this.updateAuth();
  },
  beforeUpdate() {
    this.updateToken();
    this.updateAuth();
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  background-color: lightgray;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
