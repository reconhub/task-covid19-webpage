<template>
  <div style="width: 100%">
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="8">
        <h2>Be part of the global response to COVID19</h2>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row class="text-left">
      <v-spacer></v-spacer>
      <v-col cols="8">
        <p
          class="white-back"
        >Join a community of field epidemiologists, infectious disease modellers and R programmers and contribute to improve the free and open source R tools used in the response to the COVID-19 epidemic.</p>
        <v-row class="text-center">
          <v-spacer></v-spacer>
          <v-col cols="5">
            <StandAloneBtn
              text="You are involved in the COVID-19 response and want to submit a request"
              @click="exploreOrLogin"
            />
          </v-col>
          <v-col cols="5">
            <StandAloneBtn
              text="You are a member of the R community and wish to contribute to the response to COVID-19"
              route="explore"
            />
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </div>
</template>

<script>
import StandAloneBtn from "@/components/StandAloneBtn";

export default {
  name: "explore",
  props: ["token", "user"],
  components: { StandAloneBtn },
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
  border-radius: 5px;
}

.click-div:hover {
  background-color: rgb(9, 39, 110);
}

.click-div p {
  color: white;
}
</style>

