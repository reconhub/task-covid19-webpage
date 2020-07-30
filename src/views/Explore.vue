<template>
  <v-card flat class="explore pt-2">
    <h2>This is an explore page</h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat voluptates, porro tempora animi architecto at mollitia, fugit aperiam sunt doloribus tenetur impedit voluptatibus pariatur, assumenda numquam beatae asperiores nulla explicabo.</p>
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="4">
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
      <v-btn @click="submitForm">Submit</v-btn>
    </v-card>
    <v-row>
      <v-col v-for="(task, i) in tasks" :key="i" cols="4" style>
        <v-card class="mx-2 pr-2">
          <v-row>
            <v-col cols="8">
              <v-card-title>
                <a href="#">{{task.title}}</a>
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
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import axios from "axios";

export default {
  name: "explore",
  props: ["token"],
  data() {
    return {
      // tasks: [
      //   {
      //     title: "Task1",
      //     priority: "High",
      //     label: "Beginner",
      //     description:
      //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, eaque."
      //   },
      //   {
      //     title: "Task2",
      //     priority: "Medium",
      //     label: "Beginner",
      //     description:
      //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, eaque."
      //   },
      //   {
      //     title: "Task3",
      //     priority: "Low",
      //     label: "Beginner",
      //     description:
      //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, eaque."
      //   },
      //   {
      //     title: "Task4",
      //     priority: "High",
      //     label: "Beginner",
      //     description:
      //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, eaque."
      //   },
      //   {
      //     title: "Task5",
      //     priority: "High",
      //     label: "Beginner",
      //     description:
      //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, eaque."
      //   },
      //   {
      //     title: "Task6",
      //     priority: "High",
      //     label: "Beginner",
      //     description:
      //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, eaque."
      //   }
      // ],
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
    getTasks() {
      let qry =
        "https://api.github.com/repos/BenjaminOrtizUlloa/ExploreGitAPI/issues?per_page=100";

      let self = this;
      console.log(self);

      axios
        .get(qry, { headers: { Authorization: `token ${self.token}` } })
        .then(function(res) {
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
    submitForm() {
      let self = this;
      let qry =
        "https://api.github.com/repos/BenjaminOrtizUlloa/ExploreGitAPI/issues";
      axios
        .post(
          qry,
          {
            title: self.formInfo.title,
            body: self.formInfo.description,
            labels: [self.formInfo.priority, self.formInfo.difficulty]
          },
          { headers: { Authorization: `token ${self.token}` } }
        )
        .then(function(res) {
          console.log("success", res);
          self.toggleForm();
          self.formInfo.title = "";
          self.formInfo.priority = "";
          self.formInfo.difficulty = "";
          self.formInfo.description = "";
        })
        .catch(function(err) {
          alert(err);
          console.log(err);
        });
    },
    parseIssues(dta) {
      let issues = dta.map(function(x) {
        let title = x.title;
        let priority = x.labels.filter(y => y.description == "Priority")[0]
          .name;
        let difficulty = x.labels.filter(y => y.description == "Difficulty")[0]
          .name;
        let description = x.body;

        return {
          title: title,
          priority: priority,
          difficulty: difficulty,
          description: description
        };
      });

      return issues;
    }
  },
  mounted() {
    this.getTasks();
  }
};
</script>

