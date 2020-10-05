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
          :style="{backgroundImage: 'url(' + require('@/assets//background.png') + ')'}"
        />
      </v-main>
      <v-footer>
        <v-card
          flat
          tile
          width="100%"
          style="background-color: rgb(245, 245, 245)"
          class="text-center"
        >
          <v-card-text>
            <v-btn icon href="https://github.com/reconhub" target="_blank">
              <v-icon>fa4 fa-github fa-inverse</v-icon>
            </v-btn>
            <v-btn icon href="mailto:mj.rolland@gmail.com" target="_blank">
              <v-icon>fa4 fa-envelope fa-inverse</v-icon>
            </v-btn>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text>RECON - R Epidemics Consortium - 2020</v-card-text>
        </v-card>
      </v-footer>
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

@import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");

@font-face {
  font-family: "Sawasdee";
  src: local("Sawasdee"),
    url("~/fonts/sawasdee/Sawasdee.tff") format("truetype");
}

@font-face {
  font-family: "Sawasdee";
  src: url("~/fonts/sawasdee/Sawasdee-Bold.tff") format("truetype");
  font-weight: bold;
}

@font-face {
  font-family: "Sawasdee";
  src: url("~/fonts/sawasdee/Sawasdee-BoldOblique.tff") format("truetype");
  font-weight: bold;
  font-style: italic;
}

@font-face {
  font-family: "Sawasdee";
  src: url("~/fonts/sawasdee/Sawasdee-Oblique.tff") format("truetype");
  font-style: oblique;
}

p {
  font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 20px;
}

h1 {
  font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 800;
  font-size: 50px;
}

.white-back {
  background-color: rgba(255, 255, 255, 0.4);
}
</style>
