<template>
  <div id="app">
    <v-app id="inspire">
      <MenuDrawer
        v-if="drawer"
        :token="token"
        :auth="auth"
        :user="user"
        @toggleDrawer="toggleDrawer"
      />
      <v-main>
        <recon-toolbar
          :token="token"
          :auth="auth"
          :user="user"
          @updateToken="updateToken"
          @updateAuth="updateAuth"
          @updateUser="updateUser"
          @toggleDrawer="toggleDrawer"
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
          :repos="repos"
        />
      </v-main>
      <Popup
        v-if="popup.type"
        :popup="popup"
        :user="user"
        :token="token"
        :repos="repos"
        @updatePopup="updatePopup"
      />
    </v-app>
  </div>
</template>
<script>
import axios from "axios";
import ReconToolbar from "@/components/ReconToolbar";
import Popup from "@/components/Popup";
import MenuDrawer from "@/components/MenuDrawer";
export default {
  name: "app",
  components: {
    ReconToolbar,
    Popup,
    MenuDrawer
  },
  data() {
    return {
      token: "",
      auth: "",
      user: "",
      popup: { type: "" },
      repos: [],
      collaborators: [],
      page: 1,
      drawer: false
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
    },
    toggleDrawer() {
      console.log("drawer");
      this.drawer = !this.drawer;
    },
    getRepos() {
      let self = this;
      let size = 100;
      let qry = `https://api.github.com/orgs/${"reconhub"}/repos?sort=full_name&per_page=${size}&page=${
        this.page
      }`;
      console.log("app" + qry);
      axios
        .get(qry, { headers: { Accept: "application/vnd.github.v3+json" } })
        .then(function(res) {
          console.log("page", self.page);
          console.log("data", res.data);
          if (self.page == 1) {
            self.repos = res.data;
          } else {
            self.repos = self.repos.concat(res.data);
          }

          if (res.data.length >= size) {
            self.page += 1;
            self.getRepos(self.page);
          }
        })
        .catch(function(err) {
          console.log(JSON.stringify(err));
          alert(err);
          console.log(err);
        });
    }
  },
  mounted() {
    this.updateToken();
    this.updateAuth();
    this.updateUser();
    this.getRepos();
    console.log("app mounted");
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
