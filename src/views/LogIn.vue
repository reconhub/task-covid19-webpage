<template>
  <v-container>
    <h2>{{token}}</h2>
  </v-container>
</template>

<script>
// import axios from "axios";
// https://andreybleme.com/2018-02-24/oauth-github-web-flow-cors-problem/
export default {
  name: "LogIn",
  props: ["token"],
  data() {
    return {};
  },
  mounted() {
    console.log("token: ", this.token);
    // console.log(this.$route.query);
    // let aToken = this.$route.query.access_token;
    let aToken = this.token;
    console.log(aToken);
    // localStorage.setItem("RECON_GitHub_Token", aToken);

    this.$emit("getToken", aToken);
    this.$router.push({ name: "explore", params: { token: aToken } });
  }
};
</script>
