<template>
  <v-card flat class="explore pt-2">
    <h2>This is an explore page</h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat voluptates, porro tempora animi architecto at mollitia, fugit aperiam sunt doloribus tenetur impedit voluptatibus pariatur, assumenda numquam beatae asperiores nulla explicabo.</p>
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="4" v-if="token">
        <v-btn @click="toggleForm">{{formText}}</v-btn>
      </v-col>
    </v-row>
    <v-card v-if="showForm" class="mx-2 px-10 py-5">
      <v-text-field label="Task Title" v-model="formInfo.title" placeholder="Enter title..."></v-text-field>
      <v-text-field
        label="Task Description"
        v-model="formInfo.description"
        placeholder="Enter description..."
      ></v-text-field>
      <v-select label="Task priority" v-model="formInfo.priority" :items="priorityTypes"></v-select>
      <v-select label="Task Difficulty" v-model="formInfo.difficulty" :items="difficultyTypes"></v-select>
      <v-btn @click="submitForm(token)">Submit</v-btn>
    </v-card>
    <v-row>
      <v-col v-for="(task, i) in tasks" :key="i" cols="4" style>
        <v-card class="mx-2 pr-2">
          <v-row>
            <v-col cols="8">
              <v-card-title>
                <a :href="task.url" target="_blank">{{task.title}}</a>
              </v-card-title>
              <v-card-subtitle v-text="task.description"></v-card-subtitle>
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
                  <i>{{task.difficulty}}</i>
                </p>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <p>
                Tags:
                <span v-for="(tag, j) in task.otherTags" :key="j">&nbsp; {{tag.name}}&nbsp;|</span>
              </p>
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
      showForm: false,
      priorityTypes: ["Low", "Medium", "High", "Urgent"],
      difficultyTypes: ["Beginner", "Intermediate", "Hard", "Admin-only"],
      formInfo: {
        title: "",
        priority: "",
        difficulty: "",
        description: ""
      },
      formText: "Create new task"
    };
  },
  methods: {
    getTasks(token) {
      let qry =
        "https://api.github.com/repos/BenjaminOrtizUlloa/ExploreGitAPI/issues?per_page=100";

      let self = this;
      console.log(self);

      axios
        .get(qry, { headers: { Authorization: `token ${token}` } })
        .then(function(res) {
          console.log(res.data);
          self.tasks = self.parseIssues(res.data);
          console.log("tasks", self.tasks);
        })
        .catch(function(err) {
          console.log(JSON.stringify(err));
          alert(err);
          console.log(err);
        });
    },
    toggleForm() {
      this.showForm = !this.showForm;
      if (this.showForm) {
        this.formText = "X";
      } else {
        this.formText = "Create new task";
      }
    },
    submitForm(token) {
      console.log("inside submit form");
      let self = this;
      let qry = `${process.env.VUE_APP_API}/submitIssue?author=${
        self.user
      }&difficulty=${self.formInfo.difficulty}&priority=${
        self.formInfo.priority
      }&body=${self.formInfo.description}&title=${self.formInfo.title}`;
      // "https://api.github.com/repos/BenjaminOrtizUlloa/ExploreGitAPI/issues";
      axios
        .post(
          qry
          // {
          //   title: self.formInfo.title,
          //   body: self.formInfo.description,
          //   labels: [self.formInfo.priority, self.formInfo.difficulty]
          // },
          // { headers: { Authorization: `token ${token}` } }
        )
        .then(function(res) {
          console.log("success", res);
          self.toggleForm();
          self.formInfo.title = "";
          self.formInfo.priority = "";
          self.formInfo.difficulty = "";
          self.formInfo.description = "";
          alert(
            "Thank you for submitting your task. It is waiting for admin approval."
          );
          // setTimeout(function() {
          //   self.getTasks();
          // }, 1000);
        })
        .catch(function(err) {
          alert(err);
          console.log(err);
        });
    },
    parseIssues(dta) {
      let issues = dta.map(function(x) {
        let title = x.title;
        let priority = x.labels.filter(y => y.description == "Priority");

        if (priority.length) {
          priority = priority[0].name;
        } else {
          priority = "No Priority Assigned";
        }

        let difficulty = x.labels.filter(y => y.description == "Difficulty");

        if (difficulty.length) {
          difficulty = difficulty[0].name;
        } else {
          difficulty = "No Difficulty Assigned";
        }

        let otherTags = x.labels.filter(
          y => (y.description != "Difficulty") & (y.description != "Priority")
        );

        let description = x.body;
        let url = x.html_url;

        return {
          title: title,
          priority: priority,
          difficulty: difficulty,
          description: description,
          url: url,
          otherTags: otherTags
        };
      });

      return issues;
    }
  },
  mounted() {
    let token = sessionStorage.getItem("RECON_GitHub_Token");
    this.$emit("updateToken");
    if (token) {
      this.getTasks(token);
    }
  }
};
</script>

