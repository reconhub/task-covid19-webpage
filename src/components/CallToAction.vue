<template>
  <v-container>
    <h2 class="pa-5">Be part of the global response to COVID19</h2>
    <v-row class="text-center">
      <!-- <v-col cols="12" height>
        <v-img :src="require('../assets/Placeholder.png')" class="my-3" contain height="100"/>
        <v-img
          :src="require('@/assets/covid-19_challenge_logo.png')"
          class="my-3"
          contain
          height="100"
        />
      </v-col>-->
      <v-col cols="12">
        <p
          class="white-back"
        >Join a community of field epidemiologists, infectious disease modellers and R programmers and contribute to improve the free and open source R tools used in the response to the COVID-19 epidemic.</p>
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="5">
            <div class="click-div pa-3" @click="exploreOrLogin">
              <p>
                <b>You are involved in the COVID-19 response and want to submit a request</b>
              </p>
            </div>
          </v-col>
          <v-col cols="5">
            <div class="click-div pa-3" @click="$router.push('explore')">
              <p>
                <b>You are a member of the R community and wish to contribute to the response to COVID-19</b>
              </p>
            </div>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "explore",
  props: ["token", "user"],
  data() {
    return {
      git_login_url: process.env.VUE_APP_GIT_LOGIN
    };
  },
  methods: {
    exploreOrLogin() {
      if (this.token) {
        this.$router.push({
          name: "explore",
          params: { openForm: "testTrue" }
        });
      } else {
        if (
          confirm(
            "You will need to login via GitHub before you can submit a request."
          )
        ) {
          window.location.href = this.git_login_url;
        }
      }
    }
  }
};
</script>

<style>
.click-div {
  cursor: pointer;
  background-color: rgb(49, 79, 150);
  height: 100%;
  transition: background-color 1s;
  border-radius: 20px;
}

.click-div:hover {
  background-color: rgb(9, 39, 110);
}

.click-div p {
  color: white;
}
</style>

