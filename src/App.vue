<template>
  <div id="app">
    <v-app id="inspire">
      <recon-toolbar/>
      <keep-alive>
        <router-view/>
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
  methods: {
    authenticate: function(provider) {
      console.log(provider, this.$auth);
      this.$auth.authenticate(provider).then(function(x) {
        console.log("inside auth", x);
        // Execute application logic after successful social authentication
      });
    }
  }
};
</script>
https://github.com/login/oauth/authorize?response_type=code&client_id=&redirect_uri=http://localhost:8080/auth/callback&scope=user:email
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
