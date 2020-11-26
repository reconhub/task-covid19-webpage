<template>
  <v-card
    color="white"
    shaped
    rounded
    raised
    elevation-24
    class="rounded-xl pa-4"
    style="overflow-y: scroll;"
    max-height="600px"
  >
    <v-card-title v-if="task">
      <p v-if="task.url">
        <a :href="task.url" target="_blank">{{task.title}}</a>
      </p>
      <p v-else>{{task.title}}</p>
    </v-card-title>
    <v-card-text v-if="task" class="text-left">
      <v-row>
        <v-col>
          <p style="white-space: pre-wrap;">{{task.body}}</p>
        </v-col>
      </v-row>
      <v-row v-for="(desc, i) in descriptors" :key="i">
        <v-col cols="3" class="my-0 py-0">
          <b>
            <p>{{desc.label}}</p>
          </b>
        </v-col>
        <v-col cols="9" class="my-0 py-0">
          <p>{{task[desc.key]}}</p>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="close">Close</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: "PopupShowTask",
  props: ["popup", "token", "user", "jwt", "repos"],
  data() {
    return {
      descriptors: [
        { label: "Impact:", key: "impact" },
        { label: "Suggested Repo:", key: "repo" },
        { label: "Complexity:", key: "complexity" },
        { label: "Priority:", key: "priority" },
        { label: "Admin Notes:", key: "note" }
      ],
      task: null
    };
  },
  methods: {
    close() {
      console.log("popup", this.popup);
      this.$emit("updatePopup", { type: "" });
    }
  },
  mounted() {
    this.task = Object.assign({}, this.popup.data);
    this.task.complexity = this.task.complexity.replace("_", " ");
    this.task.priority = this.task.priority.replace("_", " ");
  }
};
</script>