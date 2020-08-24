<template>
  <v-card color="white" shaped rounded raised elevation-24 class="rounded-xl pa-4">
    <v-card-title>{{popup.data.username}} [{{popup.data.type}}]</v-card-title>
    <v-card-text>
      <v-select :items="roles" v-model="newRole" label="Change role to:"></v-select>
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
      roles: ["admin", "reviewer", "user"],
      newRole: ""
    };
  },
  methods: {
    close() {
      this.$emit("updatePopup", { type: "" });
    },
    submitForm() {
      console.log("inside submit form");
      console.log("newpopup", this.popup.data);
      let self = this;

      let qry = `${process.env.VUE_APP_API}/editAuth?token=${
        this.token
      }&admin=${this.user}&user=${this.popup.data.username}&type=${
        this.newRole
      }`;

      console.log(qry);
      axios
        .post(qry)
        .then(function(res) {
          console.log("success", res);
          alert(`${self.popup.data.username}'s role was updated.`);

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
    this.newRole = this.popup.data.type;
  }
};
</script>