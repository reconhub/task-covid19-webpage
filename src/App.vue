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
        @updatePopup="updatePopup"
        :token="token"
        :auth="auth"
        :user="user"
        :popup="popup"
      />
      <Popup
        v-if="popup.type"
        :popup="popup"
        :user="user"
        :token="token"
        @updatePopup="updatePopup"
      />
    </v-app>
  </div>
</template>
<script>
import ReconToolbar from "@/components/ReconToolbar";
import Popup from "@/components/Popup";
export default {
  name: "app",
  components: {
    ReconToolbar,
    Popup
  },
  data() {
    return {
      token: "",
      auth: "",
      user: "",
      popup: { type: "" }
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
    },
    updatePopup(bus) {
      this.popup = bus;
    }
  },
  mounted() {
    this.updateToken();
    this.updateAuth();
    this.updateUser();
  },
  beforeUpdate() {
    this.updateToken();
    this.updateAuth();
    this.updateUser();
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
