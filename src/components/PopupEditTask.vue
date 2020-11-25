<template>
  <v-card color="white" shaped rounded raised elevation-24 class="rounded-xl pa-4">
    <v-card-title>PLACEHOLDER</v-card-title>
    <v-card-text v-if="task">
      <v-row>
        <v-col cols="6">
          <v-row>
            <v-col>
              <p>
                <b>Use text content to describe the task. Short and clear descriptions are most likely to generate interest.</b>
              </p>
              <v-text-field
                label="Task Title"
                v-model="task.title"
                hint="A concise, informative title"
                :rules="[rules.required]"
              ></v-text-field>
              <v-textarea
                label="Task Description"
                v-model="task.body"
                rows="2"
                hint="A clear overview of the task which provides context, identifies key problems and specifies the work to be done, with itemized by deliverables"
                :rules="[rules.required]"
              ></v-textarea>
              <v-text-field
                label="Impact"
                v-model="task.impact"
                hint="A quick explanation of how addressing this task will help improving COVID-19 analytics"
                :rules="[rules.required]"
              ></v-text-field>
              <!-- <v-text-field
                label="Timeline"
                v-model="formInfo.timeline"
                hint="A proposed timeline for the work."
                :rules="[rules.required]"
              ></v-text-field>-->
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row>
            <v-col>
              <p>
                <b>Use available labels to reflect the nature of the task. In particular, for rating the complexity and the priority of the task.</b>
              </p>
              <v-select
                label="Task Complexity"
                v-model="task.complexity"
                :items="complexityTypes"
                :rules="[rules.required]"
              ></v-select>
              <v-select
                label="Task priority"
                v-model="task.priority"
                :items="priorityTypes"
                :rules="[rules.required]"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <p>
                <b>Suggest task to specific github repo</b>
              </p>
              <v-select width="100%" v-model="task.repo" :items="repoLabels" label="Suggested Repo"></v-select>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="submitForm(task)">Submit</v-btn>
      <v-btn @click="close">Close</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>
<script>
import axios from "axios";
export default {
  name: "PopupEditTask",
  props: ["popup", "token", "user", "jwt", "repos"],
  data() {
    return {
      task: null,
      priorityTypes: [
        // { text: "Do Not Know", value: "unknown" },
        { text: "Low - Useful for COVID19 analytics", value: "Priority_Low" },
        {
          text: "Medium - Essential for COVID19 analytics",
          value: "Priority_Medium"
        },
        { text: "High - Urgent for COVID19 analytics", value: "Priority_High" }
      ],
      complexityTypes: [
        // { text: "Do Not Know", value: "unknown" },
        {
          text: "Low - Can be completed by 1 person in a few hours",
          value: "Complexity_Low"
        },
        {
          text: "Medium - Can be completed by 1 person in a few (<5) days",
          value: "Complexity_Medium"
        },
        {
          text:
            "High - Requires multiple people and/or specialists to complete",
          value: "Complexity_High"
        }
      ],
      repoLabels: ["Do not know"],
      rules: {
        required: value => !!value || "Required."
      }
    };
  },
  methods: {
    close() {
      console.log("popup", this.popup);
      this.$emit("updatePopup", { type: "" });
    },
    submitForm(sub) {
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
          `${process.env.VUE_APP_API}/issue/${this.user}`,
          {
            title: sub.title,
            body: sub.body,
            impact: sub.impact,
            complexity: sub.complexity,
            priority: sub.priority,
            repo: sub.repo,
            id: sub.id
          },
          {
            headers: {
              //"content-type": "multipart/form-data",
              Authorization: self.jwt
            }
          }
        )
        .then(function(res) {
          alert("The task was successfully edited.");
          self.close();
        })
        .catch(function(err) {
          //console.log(JSON.stringify(err));
          alert(err);
          console.log(err);
        });
    }
  },
  mounted() {
    this.repoLabels = this.repoLabels.concat(
      this.repos.map(d => d.org + "/" + d.repo)
    );

    this.task = Object.assign({}, this.popup.data);

    this.newRole = this.popup.data.type;
  }
};
</script>