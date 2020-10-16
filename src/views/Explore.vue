<template>
  <v-card flat class="explore">
    <h1 class="pa-5">EXPLORE</h1>
    <p
      class="white-back"
    >Here is a list of all the proposed and pending tasks submitted to the RECON COVID-19 challenge.</p>
    <v-row>
      <v-col cols="8">
        <v-row class="white-back ml-1">
          <v-col>
            <v-select label="Filter Complexity" :items="complexityTypes" v-model="complexityFilter"></v-select>
          </v-col>
          <v-col>
            <v-select label="Filter Priority" :items="priorityTypes" v-model="priorityFilter"></v-select>
          </v-col>
          <v-col v-if="token">
            <v-switch v-model="favoriteSwitch" label="Favorite Only"></v-switch>
          </v-col>
        </v-row>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="2" v-if="token">
        <div>
          <StandAloneBtn
            v-if="token"
            text="Create New Task"
            @click="updatePopup({type: 'CreateIssue', data: '' })"
            style="text-transform: uppercase"
          />
        </div>
        <!-- <v-btn @click="updatePopup({type: 'CreateIssue', data: '' })">Create new task</v-btn> -->
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row>
      <v-col v-for="(task, i) in filteredData" :key="i" sm="12" lg="4" md="6" xl="4" cols="12">
        <v-card class="mx-2 pr-2">
          <v-row>
            <v-col cols="8">
              <v-card-title>
                <a :href="task.url" target="_blank" title="Link to GitHub issue.">{{task.title}}</a>
              </v-card-title>
              <!-- <v-card-subtitle v-text="task.description" style="white-space: pre"></v-card-subtitle> -->
            </v-col>
            <v-col cols="4">
              <div v-if="token">
                <v-btn icon :disabled="task.disabled" title="Follow task." @click="follow(task, i)">
                  <v-icon v-if="task.status" style="color: red;">mdi-star</v-icon>
                  <v-icon v-else style="color: grey;">mdi-star</v-icon>
                </v-btn>
              </div>
              <ProgressBar
                label="Priority"
                :title="task.priority"
                :width="priorityBar[task.priority].width"
                :color="priorityBar[task.priority].color"
              />
              <ProgressBar
                label="Complexity"
                :title="task.complexity"
                :width="complexityBar[task.complexity].width"
                :color="complexityBar[task.complexity].color"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col v-if="token">
              <v-btn
                icon
                :disabled="task.disabled"
                @click="vote(task,i, task.vote > 0 ? 'none' : 'up')"
                title="Increase this task's priority."
              >
                <v-icon v-if="task.vote > 0" style="color: green;">mdi-thumb-up</v-icon>
                <v-icon v-else style="color: grey;">mdi-thumb-up</v-icon>
              </v-btn>
              <v-btn
                icon
                :disabled="task.disabled"
                @click="vote(task,i, task.vote < 0 ? 'none' : 'down')"
                title="Decrease this task's priority."
              >
                <v-icon v-if="task.vote < 0" style="color: red;">mdi-thumb-down</v-icon>
                <v-icon v-else style="color: grey;">mdi-thumb-down</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <p
                class="text-left pa-2"
                v-if="details[i]"
                style="white-space: pre-wrap;"
              >{{task.description}}</p>
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
// import ToolBarBtn from "@/components/ToolBarBtn";
import StandAloneBtn from "@/components/StandAloneBtn";
import ProgressBar from "@/components/ProgressBar";
export default {
  name: "explore",
  props: ["token", "user", "openForm"],
  components: { StandAloneBtn, ProgressBar },
  data() {
    return {
      tasks: [],
      details: [],
      priorityFilter: "",
      complexityFilter: "",
      favoriteSwitch: false,
      priorityTypes: [
        { text: "None", value: "" },
        { text: "Low", value: "Priority Low" },
        {
          text: "Medium",
          value: "Priority Medium"
        },
        { text: "High", value: "Priority High" }
      ],
      priorityBar: {
        "Priority Low": { width: "33%", color: "#91bfdb" },
        "Priority Medium": { width: "66%", color: "#ffffbf" },
        "Priority High": { width: "100%", color: "#fc8d59" }
      },
      complexityTypes: [
        { text: "None", value: "" },
        { text: "Low", value: "Complexity Low" },
        {
          text: "Medium",
          value: "Complexity Medium"
        },
        { text: "High", value: "Complexity High" }
      ],
      complexityBar: {
        "Complexity Low": { width: "33%", color: "#91bfdb" },
        "Complexity Medium": { width: "66%", color: "#ffffbf" },
        "Complexity High": { width: "100%", color: "#fc8d59" }
      }
    };
  },
  computed: {
    filteredData() {
      let dta = this.tasks;

      if (this.favoriteSwitch) {
        dta = dta.filter(d => d.status);
      }

      if (this.priorityFilter) {
        dta = dta.filter(d => d.priority == this.priorityFilter);
      }

      if (this.complexityFilter) {
        dta = dta.filter(d => d.complexity == this.complexityFilter);
      }

      return dta;
    }
  },
  methods: {
    vote(data, index, vote) {
      let qry = `${process.env.VUE_APP_API}/vote?vote=${vote}&issue_id=${
        data.id
      }&username=${this.user}`;

      data.disabled = true;

      this.$set(this.tasks, index, data);

      let that = this;

      let score_card = {
        up: 5,
        down: -5,
        none: 0
      };

      axios
        .get(qry)
        .then(function(res) {
          console.log("successful vote", res);
          data.disabled = false;
          data.vote = score_card[vote];
          that.$set(that.tasks, index, data);
        })
        .catch(function(err) {
          console.log(err);
          data.disabled = false;
          that.$set(that.tasks, index, data);
        });
    },
    follow(data, index) {
      let qry = `${
        process.env.VUE_APP_API
      }/follow?status=${!data.status}&username=${this.user}&issue_id=${
        data.id
      }`;

      data.disabled = true;
      this.$set(this.tasks, index, data);

      let that = this;

      axios
        .get(qry) // replace with put once figured out
        .then(function(res) {
          console.log("success", res);
          data.disabled = false;
          data.status = !data.status;
          that.$set(that.tasks, index, data);
        })
        .catch(function(err) {
          console.log(err);
          data.disabled = false;
          that.$set(that.tasks, index, data);
        });
    },
    getTasks(user) {
      let qry = `${process.env.VUE_APP_API}/tasks`;
      if (user) {
        qry = qry + `?user=${user}`;
      }

      // "https://api.github.com/repos/BenjaminOrtizUlloa/ExploreGitAPI/issues?per_page=100";

      let self = this;
      console.log(self);

      axios
        .get(qry, { headers: { Accept: "application/vnd.github.v3+json" } })
        .then(function(res) {
          console.log(res.data);
          self.tasks = res.data;
          // self.tasks = self.parseIssues(res.data);
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
        let id = x.id;
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
          id: id,
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
    if (token) {
      this.getTasks(this.user);
    } else {
      this.getTasks();
    }

    if (this.openForm) {
      this.updatePopup({ type: "CreateIssue", data: "" });
    }
    // if (token) {
    //   this.getTasks(token);
    // }
  }
};
</script>

