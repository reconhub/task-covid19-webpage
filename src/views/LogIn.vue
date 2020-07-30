<template>
  <v-container>
    <h2>{{$route.query}}</h2>
  </v-container>
</template>

<script>
// import axios from "axios";
// https://andreybleme.com/2018-02-24/oauth-github-web-flow-cors-problem/
export default {
  name: "LogIn",
  data() {
    return {};
  },
  mounted() {
    let aToken = this.$route.query.access_token;

    this.$emit("getToken", aToken);
    this.$router.push({ name: "explore", params: { token: aToken } });
  }
};
</script>
