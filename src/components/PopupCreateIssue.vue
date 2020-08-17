<template>
  <v-card color="white" shaped rounded raised elevation-24 class="rounded-xl">
    <v-card-title>Hello World</v-card-title>
    <v-card-text>
      <v-text-field label="Task Title" v-model="formInfo.title" placeholder="Enter title..."></v-text-field>
      <v-text-field
        label="Task Description"
        v-model="formInfo.description"
        placeholder="Enter description..."
      ></v-text-field>
      <v-select label="Task priority" v-model="formInfo.priority" :items="priorityTypes"></v-select>
      <v-select label="Task Difficulty" v-model="formInfo.difficulty" :items="difficultyTypes"></v-select>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="submitForm">Submit</v-btn>
      <v-btn @click="close">Close</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>
<script>
import axios from "axios";
export default {
  name: "PopupCreateIssue",
  props: ["popup", "token", "user"],
  data() {
    return {
      priorityTypes: ["Low", "Medium", "High", "Urgent"],
      difficultyTypes: ["Beginner", "Intermediate", "Hard", "Admin-only"],
      formInfo: {
        title: "",
        priority: "",
        difficulty: "",
        description: ""
      }
    };
  },
  methods: {
    close() {
      this.$emit("updatePopup", { type: "" });
    },
    submitForm() {
      console.log("inside submit form");
      let self = this;

      let qry = `${process.env.VUE_APP_API}/submitIssue?author=${
        this.user
      }&difficulty=${this.formInfo.difficulty}&priority=${
        this.formInfo.priority
      }&body=${this.formInfo.description}&title=${this.formInfo.title}&repo=${
        this.popup.data.name
      }&owner=${this.popup.data.owner.login}`;

      console.log(qry);
      axios
        .post(qry)
        .then(function(res) {
          console.log("success", res);
          self.formInfo.title = "";
          self.formInfo.priority = "";
          self.formInfo.difficulty = "";
          self.formInfo.description = "";
          alert(
            "Thank you for submitting your task. It is waiting for admin approval."
          );
          self.close();
        })
        .catch(function(err) {
          alert(err);
          console.log(err);
          self.close();
        });
    }
  },
  mounted() {
    console.log("inside popup", this.popup);
  }
};
</script>