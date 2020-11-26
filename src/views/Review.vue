<template>
  <v-card flat class="review">
    <h1 class="pa-5">REVIEW</h1>
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
          <template v-slot:item.title="{item}">
            <v-icon
              style="color: blue; cursor: pointer"
              @click="updatePopup({type: 'EditTask', data: item })"
            >fa-edit</v-icon>
            <v-icon
              style="color: blue; cursor: pointer"
              @click="updatePopup({type: 'ShowTask', data: item})"
            >fa-eye</v-icon>
            {{item.title}}
          </template>
          <template v-slot:item.complexity="{item}">
            <v-select v-model="item.complexity" :items="complexityTypes" style="width: 120px;"></v-select>
          </template>
          <template v-slot:item.priority="{item}">
            <v-select v-model="item.priority" :items="priorityTypes" style="width: 100px;"></v-select>
          </template>
          <template v-slot:item.repo="{item}">
            <v-select v-model=" item.repo" :items="repoLabels" style="width: 125px;"></v-select>
          </template>
          <template v-slot:item.notes="{item}">
            <v-textarea @click="mycheck(item)" v-model="item.note" style="width: 250px;"></v-textarea>
          </template>
          <template v-slot:item.actions="{item}">
            <v-icon small class="mr-2" @click="judgeSubmission(item, 'approved')">mdi-thumb-up</v-icon>
            <v-icon small @click="judgeSubmission(item, 'rejected')">mdi-thumb-down</v-icon>
          </template>
        </v-data-table>
        <v-spacer></v-spacer>
      </v-row>
      <v-row>
        <v-spacer></v-spacer>
        <v-data-table :headers="headersPkg" :items="pendingSuggestedPkg">
          <template v-slot:item.actions="{item}">
            <v-icon small class="mr-2" @click="judgeSuggestedPkg(item, 'approved')">mdi-thumb-up</v-icon>
            <v-icon small @click="judgeSuggestedPkg(item, 'rejected')">mdi-thumb-down</v-icon>
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
  props: ["token", "user", "repos", "jwt"],
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
        // { text: "Description", value: "body" },
        { text: "Complexity", value: "complexity" },
        { text: "Priority", value: "priority" },
        { text: "Repo", value: "repo" },
        // { text: "Created", value: "created_on" },
        // { text: "Updated", value: "last_update" },
        { text: "Notes", value: "notes", sortable: false },
        { text: "Actions", value: "actions", sortable: false }
      ],
      headersPkg: [
        { text: "Organization", value: "org" },
        { text: "Repository", value: "repo" },
        { text: "Point of Contct", value: "poc" },
        { text: "Updated", value: "last_update" },
        { text: "Actions", value: "actions", sortable: false }
      ],
      pendingSubmissions: [],
      pendingSuggestedPkg: [],
      priorityTypes: [
        { text: "Low", value: "Priority_Low" },
        {
          text: "Medium",
          value: "Priority_Medium"
        },
        { text: "High", value: "Priority_High" }
      ],
      complexityTypes: [
        {
          text: "Low",
          value: "Complexity_Low"
        },
        {
          text: "Medium",
          value: "Complexity_Medium"
        },
        {
          text: "High",
          value: "Complexity_High"
        }
      ],
      repoLabels: ["Do not know"]
    };
  },
  methods: {
    getSubmissions(status) {
      let qry = `${process.env.VUE_APP_API}/issue?status=${status}`;

      let self = this;

      axios
        .get(qry, {
          headers: {
            //"content-type": "multipart/form-data",
            Authorization: self.jwt
          }
        })
        .then(function(res) {
          self.pendingSubmissions = res.data;
        })
        .catch(function(err) {
          alert(err);
          console.log(err);
        });
    },
    getSuggestedPkg(status) {
      let qry = `${process.env.VUE_APP_API}/pkgs?status=${status}`;

      let self = this;

      axios
        .get(qry)
        .then(function(res) {
          self.pendingSuggestedPkg = res.data;
        })
        .catch(function(err) {
          alert(err);
          console.log(err);
        });
    },
    judgeSuggestedPkg(sub, status) {
      let qry = `${process.env.VUE_APP_API}/pkgs`;
      let self = this;

      axios
        .put(
          qry,
          { status: status, id: sub.id },
          {
            headers: {
              //"content-type": "multipart/form-data",
              Authorization: self.jwt
            }
          }
        )
        .then(function(res) {
          self.getSuggestedPkg("pending validation");
        })
        .catch(function(err) {
          alert(err);
          console.log(err);
        });
    },
    judgeSubmission(sub, status) {
      if (sub.complexity == "unknown") {
        alert("Complexity cannot be blank/unknown");
        return null;
      }
      if (sub.priority == "unknown") {
        alert("Priority cannot be blank/unknown");
        return null;
      }

      let self = this;

      axios
        .put(
          `${process.env.VUE_APP_API}/issue`,
          {
            note: sub.note,
            status: status,
            id: sub.id,
            complexity: sub.complexity,
            priority: sub.priority,
            repo: sub.repo
          },
          {
            headers: {
              //"content-type": "multipart/form-data",
              Authorization: self.jwt
            }
          }
        )
        .then(function(res) {
          //console.log("judgeSubmission", res.data);
          self.getSubmissions("pending validation");
        })
        .catch(function(err) {
          //console.log(JSON.stringify(err));
          alert(err);
          console.log(err);
        });
    },
    mycheck(d) {
      console.log(d);
    },
    updatePopup(dta) {
      this.$emit("updatePopup", dta);
    }
  },
  mounted() {
    this.getSubmissions("pending validation");
    this.getSuggestedPkg("pending validation");
    this.$emit("updateToken");
    this.$emit("updateAuth");
    this.$emit("updateUser");
    this.repoLabels = this.repoLabels.concat(
      this.repos.map(d => d.org + "/" + d.repo)
    );
  }
};
</script>
