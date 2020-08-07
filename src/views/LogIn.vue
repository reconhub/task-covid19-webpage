<template>
  <v-container></v-container>
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
    let aToken = this.token;

    localStorage.setItem("RECON_GitHub_Token", aToken);

    this.$emit("getToken", aToken);
    this.$router.push({ name: "explore", params: { token: aToken } });
  }
};
</script>
