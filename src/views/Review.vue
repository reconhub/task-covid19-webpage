<template>
  <v-card flat class="explore pt-2">
    <h2>This is a Review page</h2>
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
        <v-data-table :headers="headers" :items="pendingSubmissions" :search="search">
          <template v-slot:item.notes="{item}">
            <v-textarea @click="mycheck(item)" v-model="item.note"></v-textarea>
          </template>
          <template v-slot:item.actions="{item}">
            <v-icon small class="mr-2" @click="judgeSubmission(item, 'approved')">mdi-thumb-up</v-icon>
            <v-icon small @click="judgeSubmission(item, 'rejected')">mdi-thumb-down</v-icon>
          </template>
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
          text: "Author",
          align: "start",
          value: "author"
        },
        { text: "Title", value: "title" },
        { text: "Description", value: "body" },
        { text: "Complexity", value: "complexity" },
        { text: "Priority", value: "priority" },
        { text: "Created", value: "created_on" },
        { text: "Updated", value: "last_update" },
        { text: "Notes", value: "notes", sortable: false },
        { text: "Actions", value: "actions", sortable: false }
      ],
      pendingSubmissions: []
    };
  },
  methods: {
    getSubmissions(status) {
      let qry = `${process.env.VUE_APP_API}/issues?status=${status}`;

      let self = this;
      console.log(self);

      axios
        .get(qry)
        .then(function(res) {
          console.log("getsubmissions", res.data);
          self.pendingSubmissions = res.data;
        })
        .catch(function(err) {
          console.log(JSON.stringify(err));
          alert(err);
          console.log(err);
        });
    },
    judgeSubmission(sub, status) {
      let qry = `${process.env.VUE_APP_API}/judgeIssue?token=${
        this.token
      }&note=${sub.note}&approver=${this.user}&status=${status}&id=${sub.id}`;

      let self = this;

      axios
        .post(qry)
        .then(function(res) {
          console.log("judgeSubmission", res.data);
          self.getSubmissions("pending");
        })
        .catch(function(err) {
          console.log(JSON.stringify(err));
          alert(err);
          console.log(err);
        });
    },
    mycheck(d) {
      console.log(d);
    }
  },
  mounted() {
    this.getSubmissions("pending");
    this.$emit("updateToken");
    this.$emit("updateAuth");
    this.$emit("updateUser");
  }
};
</script>
