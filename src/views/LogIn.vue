<template>
  <v-card flat class="login">
    <v-img :src="require('@/assets/rlogo-loader_250.gif')" class="my-3" contain height="200"/>
    <p>Authorizing...</p>
  </v-card>
</template>

<script>
import axios from "axios";
// https://andreybleme.com/2018-02-24/oauth-github-web-flow-cors-problem/
export default {
  name: "LogIn",
  props: ["token"],
  data() {
    return {};
  },
  methods: {
    getUser(token) {
      let qry = "https://api.github.com/user";

      let self = this;

      axios
        .get(qry, { headers: { Authorization: `token ${token}` } })
        .then(function(res) {
          console.log("getUser", res.data);
          self.getAuthorization(res.data.login, token);
        })
        .catch(function(err) {
          console.log(JSON.stringify(err));
          alert(err);
          self.setToken("");
          self.$router.push("/");
        });
    },
    getAuthorization(username, token) {
      let qry = `${
        process.env.VUE_APP_API
      }/auth?user=${username}&token=${token}`;

      let self = this;

      axios
        .get(qry)
        .then(function(res) {
          console.log("getAuthorization", res.data);
          self.setAuth(res.data.type);
          self.setUser(res.data.user);
          self.setJWT(res.data.jwt);
          self.$router.push({ name: "explore" });
        })
        .catch(function(err) {
          console.log(JSON.stringify(err));
          alert(err);
          self.setToken("");
          self.$router.push("/");
        });
    },
    setToken(tkn) {
      sessionStorage.setItem("RECON_GitHub_Token", tkn);
      this.$emit("updateToken");
    },
    setAuth(auth) {
      sessionStorage.setItem("RECON_User_Auth", auth);
      this.$emit("updateAuth");
    },
    setUser(user) {
      sessionStorage.setItem("RECON_User_Name", user);
      this.$emit("updateUser");
    },
    setJWT(jwt) {
      sessionStorage.setItem("RECON_JWT", jwt);
      this.$emit("updateJWT");
    }
  },
  mounted() {
    let tkn = this.token;
    console.log("in login token", tkn);
    this.setToken(tkn);
    this.getUser(tkn);
  }
};
</script>
