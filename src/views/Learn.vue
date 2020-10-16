<template>
  <v-card flat class="learn" tabindex="0">
    <!-- <v-img :src="require('../assets/Placeholder.png')" class="my-3" contain height="200"/> -->
    <h1 class="pa-5">LEARN</h1>
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="8">
        <h2 class="text-left mx-3 white-back">Learn how to submit a request</h2>
        <p class="text-left mx-3 white-back">
          To submit a request you will need to log into the platform using
          <a
            href="https://github.com/"
            target="_blank"
          >GitHub</a> credentials. GitHub is a platform to share and develop code which enables the COVID-19 challenge platform to identify and gather the different developmental requests. If you do not have a GitHub account, you will need to create one
          <a
            href="https://github.com/join"
            target="_blank"
          >here</a>
        </p>
        <p class="text-left mx-3 white-back">Accepted requests include:</p>
        <ul class="text-left mx-3 white-back">
          <li>A modification of an existing function</li>
          <li>Suggestions for a new package</li>
          <li>Request for a new function/functionality in an existing package</li>
          <li>
            A new
            <i>Rmarkdown</i> analysis template
          </li>
          <li>
            An
            <i>ad hoc</i> function, not necessarily inside an existing package
          </li>
          <li>Training resources (practicals, lectures, videos, ...)</li>
          <li>Code reviews for existing code</li>
          <li>Testing existing features</li>
        </ul>
        <br>
        <p
          class="text-left mx-3 white-back"
        >Currently, request need to be directly related to the response to COVID-19</p>
        <p class="text-left mx-3 white-back">
          Once you have logged in and have a request that falls into the list above, all you need to do is fill in the
          <a
            @click="exploreOrLogin({name: 'explore', params: { openForm: 'testTrue' }
        })"
          >following form</a>
        </p>
        <p class="text-left mx-3 white-back">
          The request (which we call "task") will then populate your
          <a
            @click="exploreOrLogin({name: 'mytasks'})"
          >"My Tasks" page</a>
        </p>.
        <p class="text-left mx-3 white-back">
          Before your request populates the actual
          <a
            @click="exploreOrLogin({name: 'explore'})"
          >pool of tasks</a>, it will have to be validated by a member of the platform's advisory panel. Our advisory panel is constituted of expert epidemiologists, statisticians and modellers who have a high level knowledge and vision of the current situation. They will make sure that your request falls in the scope of the platform and may re-evaluate some of the elements you have filled in such as the level of priority or the concerned package.
        </p>
        <p
          class="text-left mx-3 white-back"
        >Once the task is validated you will be notified by email with an invitation from GitHub to the concerned package repository. You will receive another email with a description of the task you created, this email contains a link to the atual issue that was created in your name ("View it on GitHub"). It's in this space that you will be able to communicate with the person(s) taking care of your task, this does not require any specific knowledge of git or GitHub.</p>
        <p class="text-left mx-3 white-back">
          You can access all of the information regarding your tasks (validation process status, link to github, etc) at any time in your
          <a
            @click="exploreOrLogin({name: 'mytasks'})"
          >“my tasks” page</a>.
        </p>
        <p class="text-left mx-3 white-back">
          Feel free to
          <a href="mailto:mj.rolland@gmail.com">contact us</a> if you have any questions regarding the creation and resolution of tasks.
        </p>
        <h2 class="text-left mx-3 white-back">Learn how to solve a task</h2>
        <p class="text-left mx-3 white-back">
          We are assuming that if you wish to help take care of one of the platform’s tasks you are familiar with GitHub and it’s issue system. If you are not and wish to know more we recommend you read
          <a
            href="https://guides.github.com/features/issues/"
          >this resource</a>.
        </p>

        <p class="text-left mx-3 white-back">
          All validated tasks (see previous section for more info on the validation process) are ranked in the
          <a
            @click="exploreOrLogin({name: 'explore'})"
          >explore page</a> by order of priority. This order is determined by an initial label of priority set by the advisory panel of experts and is subsequently adjusted through user up and downvoting of tasks.
        </p>
        <p
          class="text-left mx-3 white-back"
        >Once there is a task you feel you can solve, jump in the challenge and please help!</p>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-card>
</template>
<script>
export default {
  name: "learn",
  props: ["token"],
  data() {
    return {
      git_login_url: process.env.VUE_APP_GIT_LOGIN
    };
  },
  methods: {
    exploreOrLogin(newRoute) {
      if (this.token) {
        this.$router.push(newRoute);
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
