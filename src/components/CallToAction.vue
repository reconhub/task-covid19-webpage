<template>
  <div style="width: 100%">
    <v-row class='text-left'>
      <v-spacer></v-spacer>
      <v-col cols="8">
        <p class='white-back'>
          Citizen science is a critical engine for creating professional tools that are becoming the new standard in epidemic outbreak response. The problem is connecting people on the front lines and people with R language skills. The COVID-19 challenge is a direct communication channel between field agents actively working on the response to COVID-19 and the R community.
        </p>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="8">
        <h2>You can get involved in the response to COVID-19 response too!</h2>
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
          <v-col md="5" lg="5" xl="5" cols="12">
            <StandAloneBtn
              text="SUBMIT TASK"
              @click="exploreOrLogin"
              baseClr="#967831"
              hoverClr="#5c4a1e"
              title="You are involved in the COVID-19 response and want to submit a request."
            />
          </v-col>

          <v-col md="5" lg="5" xl="5" cols="12">
            <StandAloneBtn
              text="BROWSE TASKS"
              route="explore"
              baseClr="#96314f"
              hoverClr="#963136"
              title="You are a member of the R community and wish to contribute to the response to COVID-19"
            />
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
        <v-row>
          <v-col cols="1">
            <p>
              <v-icon style="color: red">fa-exclamation-triangle</v-icon>
            </p>
          </v-col>
          <v-col cols="11">
            <p>
              Note to users: this website is a trial version, please
              <a
                href="mailto:mj.rolland@gmail.com"
              >give us any feedback</a> regarding the platform's content and functionality you think may help us improve the experience!
            </p>
          </v-col>
        </v-row>
        <p>
          If you are a package developer and wish to add your package to the
          <router-link to="repos">list of partners</router-link>:
          <a href="#" @click="reposOrLogin">click here</a>.
        </p>
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
    },
    reposOrLogin() {
      if (this.token) {
        this.$router.push({
          name: "repos",
          params: { openForm: "testTrue" }
        });
      } else {
        if (
          confirm(
            "You will need to login via GithHub before you can submit your package."
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

