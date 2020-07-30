<template>
  <div id="app">
    <v-app id="inspire">
      <recon-toolbar :token="token" @getToken="getToken"/>
      <keep-alive>
        <router-view @getToken="getToken"/>
      </keep-alive>
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
      token: ""
    };
  },
  methods: {
    getToken(token) {
      this.token = token;
    }
  },
  mounted() {
    let token = localStorage.getItem("RECON_GitHub_Token");
    console.log("mountedToken", token);
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
