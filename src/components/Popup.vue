<template>
  <v-row
    align="center"
    style="position: fixed; width: 100vw; height: 100vh; background-color: rgba(0,0,0, .5);"
  >
    <v-spacer></v-spacer>
    <v-col cols="8">
      <PopupCreateIssue
        v-if="popup.type == 'CreateIssue'"
        :popup="popup"
        :token="token"
        :user="user"
        @updatePopup="updatePopup"
      />
      <v-btn v-else @click="updatePopup({type: ''})">Close</v-btn>
    </v-col>
    <v-spacer></v-spacer>
  </v-row>
</template>
<script>
import PopupCreateIssue from "@/components/PopupCreateIssue";

export default {
  name: "popup",
  props: ["popup", "user", "token"],
  components: {
    PopupCreateIssue
  },
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
    updatePopup(bus) {
      this.$emit("updatePopup", bus);
    }
  },
  mounted() {}
};
</script>