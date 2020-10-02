<template>
  <v-card flat class="explore">
    <h1 class="pa-5">My Submitted Tasks</h1>
    <v-col>
      <v-row>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
      </v-row>
      <v-row>
        <v-spacer></v-spacer>
        <v-data-table :headers="headers" :items="submissions" :search="search">
          <template v-slot:item.title="{item}">
            <a :href="item.url">{{item.title}}</a>
          </template>
          <!-- <template v-slot:item.actions="{item}">
            <v-icon small class="mr-2" @click="judgeSubmission(item, 'approved')">mdi-thumb-up</v-icon>
            <v-icon small @click="judgeSubmission(item, 'rejected')">mdi-thumb-down</v-icon>
          </template>-->
        </v-data-table>
        <v-spacer></v-spacer>
      </v-row>
    </v-col>
  </v-card>
</template>
<script>
import axios from "axios";
import { setTimeout } from "timers";

export default {
  name: "review",
  props: ["token", "user"],
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Repo",
          align: "start",
          value: "repo"
        },
        { text: "Title", value: "title" },
        { text: "Description", value: "body" },
        { text: "Complexity", value: "complexity" },
        { text: "Priority", value: "priority" },
        { text: "Status", value: "status" },
        { text: "Created", value: "created_on" },
        { text: "Notes", value: "note" },
        { text: "Updated", value: "last_update" }
      ],
      submissions: []
    };
  },
  methods: {
    getSubmissions() {
      let qry = `${process.env.VUE_APP_API}/myIssues?user=${this.user}`;
      console.log(qry);
      let self = this;
      console.log(self);

      axios
        .get(qry)
        .then(function(res) {
          console.log("getsubmissions", res.data);
          self.submissions = res.data;
        })
        .catch(function(err) {
          console.log(JSON.stringify(err));
          alert(err);
          console.log(err);
        });
    }
  },
  beforeCreate() {
    console.log("beforecreate");
    this.$emit("updateToken");
    this.$emit("updateAuth");
    this.$emit("updateUser");
  },
  mounted() {
    console.log("now get subm");
    this.getSubmissions();
  }
};
</script>
