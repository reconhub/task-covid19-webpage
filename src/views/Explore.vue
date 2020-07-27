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
      <v-select label="Task Label" v-model="formInfo.label" :items="labelTypes"></v-select>
      <v-btn @click="submitForm">Submit</v-btn>
    </v-card>
    <v-row>
      <v-col v-for="(task, i) in tasks" :key="i" cols="4">
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
                  <i>{{task.label}}</i>
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
export default {
  name: "explore",
  data() {
    return {
      tasks: [
        {
          title: "Task1",
          priority: "High",
          label: "Beginner",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, eaque."
        },
        {
          title: "Task2",
          priority: "Medium",
          label: "Beginner",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, eaque."
        },
        {
          title: "Task3",
          priority: "Low",
          label: "Beginner",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, eaque."
        },
        {
          title: "Task4",
          priority: "High",
          label: "Beginner",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, eaque."
        },
        {
          title: "Task5",
          priority: "High",
          label: "Beginner",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, eaque."
        },
        {
          title: "Task6",
          priority: "High",
          label: "Beginner",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, eaque."
        }
      ],
      showForm: false,
      priorityTypes: ["Low", "Medium", "High", "Urgent"],
      labelTypes: ["Beginner", "Intermediate", "Hard", "Admin-only"],
      formInfo: {
        title: "",
        priority: "",
        label: "",
        description: ""
      },
      formText: "Create new task"
    };
  },
  methods: {
    toggleForm() {
      this.showForm = !this.showForm;
      if (this.showForm) {
        this.formText = "X";
      } else {
        this.formText = "Create new task";
      }
    },
    submitForm() {
      console.log("formInfo", this.formInfo);
      let newTask = JSON.parse(JSON.stringify(this.formInfo));
      this.tasks.push(newTask);
      this.toggleForm();
      this.formInfo.title = "";
      this.formInfo.priority = "";
      this.formInfo.label = "";
      this.formInfo.description = "";
    }
  }
};
</script>

