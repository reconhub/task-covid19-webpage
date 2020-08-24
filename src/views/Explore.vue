<template>
  <v-card flat class="explore pa-5">
    <h2>This is an explore page</h2>
    <p>Here is a list of all the proposed and pending tasks submitted to RECON.</p>
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="4" v-if="token">
        <v-btn @click="updatePopup({type: 'CreateIssue', data: '' })">Create new task</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(task, i) in tasks" :key="i" sm="12" lg="4" md="6" xl="4" cols="12">
        <v-card class="mx-2 pr-2">
          <v-row>
            <v-col cols="8">
              <v-card-title>
                <a :href="task.url" target="_blank">{{task.title}}</a>
              </v-card-title>
              <!-- <v-card-subtitle v-text="task.description" style="white-space: pre"></v-card-subtitle> -->
            </v-col>
            <v-col cols="4">
              <div style="height: 40%">
                <p style="border: 1px solid black">
                  <i>{{task.priority}}</i>
                </p>
              </div>
              <v-spacer></v-spacer>
              <div style="height: 40%">
                <p>
                  <i>{{task.complexity}}</i>
                </p>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <p>
                Additional Tags:
                <span
                  v-for="(tag, j) in task.otherTags"
                  :key="j"
                >&nbsp; {{tag.name}}&nbsp;|</span>
              </p>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <p v-if="details[i]" style="white-space: pre-wrap">{{task.description}}</p>
              <v-btn v-if="details[i]" @click="showDetail(i, false)">Hide Details</v-btn>
              <v-btn v-else @click="showDetail(i, true)">Show Details</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import axios from "axios";
import { setTimeout } from "timers";

export default {
  name: "explore",
  props: ["token", "user"],
  data() {
    return {
      tasks: [],
      details: []
    };
  },
  methods: {
    getTasks() {
      let qry = `https://api.github.com/repos/BenjaminOrtizUlloa/ExploreGitAPI/issues`;

      // "https://api.github.com/repos/BenjaminOrtizUlloa/ExploreGitAPI/issues?per_page=100";

      let self = this;
      console.log(self);

      axios
        .get(qry, { headers: { Accept: "application/vnd.github.v3+json" } })
        .then(function(res) {
          console.log(res.data);
          self.tasks = self.parseIssues(res.data);
          self.details = self.tasks.map(() => false);
          console.log("tasks", self.tasks);
        })
        .catch(function(err) {
          console.log(JSON.stringify(err));
          alert(err);
          console.log(err);
        });
    },
    updatePopup(dta) {
      this.$emit("updatePopup", dta);
    },
    parseIssues(dta) {
      let issues = dta.map(function(x) {
        let title = x.title;
        let priority = x.labels.filter(y => y.name.match(/^Priority_/g));

        if (priority.length) {
          priority = priority[0].name.replace("_", ": ");
        } else {
          priority = "No Priority Assigned";
        }

        let complexity = x.labels.filter(y => y.name.match(/^Complexity_/g));

        if (complexity.length) {
          complexity = complexity[0].name.replace("_", ": ");
        } else {
          complexity = "No Complexity Assigned";
        }

        let otherTags = x.labels.filter(
          y => !y.name.match(/^Complexity_/g) & y.name.match(/^Priority_/g)
        );

        let description = x.body;
        let url = x.html_url;

        return {
          title: title,
          priority: priority,
          complexity: complexity,
          description: description,
          url: url,
          otherTags: otherTags
        };
      });

      return issues;
    },
    showDetail(i, bool) {
      console.log("show" + bool);
      this.$set(this.details, i, bool);
    }
  },
  mounted() {
    let token = sessionStorage.getItem("RECON_GitHub_Token");
    this.$emit("updateToken");
    this.getTasks();
    // if (token) {
    //   this.getTasks(token);
    // }
  }
};
</script>

