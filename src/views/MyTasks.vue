<template>
  <v-card flat class="explore">
    <h1 class="pa-5">MY SUBMITTED TASKS</h1>
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
            <a v-if="item.status == 'approved'" :href="item.url">{{item.title}}</a>
            <p v-else-if="item.status == 'pending validation'">
              <v-icon
                style="color: blue; cursor: pointer"
                @click="updatePopup({type: 'EditTask', data: item })"
              >fa-edit</v-icon>
              {{item.title}}
            </p>
            <p v-else>{{item.title}}</p>
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
  props: ["token", "user", "jwt"],
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
        // { text: "Created", value: "created_on" },
        { text: "Notes", value: "note" }
        // { text: "Updated", value: "last_update" }
      ],
      submissions: []
    };
  },
  methods: {
    updatePopup(dta) {
      this.$emit("updatePopup", dta);
    },
    getSubmissions() {
      let qry = `${process.env.VUE_APP_API}/issue/${this.user}`;
      let self = this;

      axios
        .get(qry, {
          headers: {
            Authorization: self.jwt
            //"content-type": "multipart/form-data"
          }
        })
        .then(function(res) {
          //console.log("getsubmissions", res.data);
          self.submissions = res.data;
        })
        .catch(function(err) {
          //console.log(JSON.stringify(err));
          alert(err);
          console.log(err);
        });
    }
  },
  beforeCreate() {
    //console.log("beforecreate");
    this.$emit("updateToken");
    this.$emit("updateAuth");
    this.$emit("updateUser");
  },
  mounted() {
    //console.log("now get subm");
    this.getSubmissions();
  }
};
</script>
