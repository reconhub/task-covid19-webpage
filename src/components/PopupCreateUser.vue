<template>
  <v-card color="white" shaped rounded raised elevation-24 class="rounded-xl pa-4">
    <v-card-title>Add new user.</v-card-title>
    <v-card-text>
      <p>Please enter the GitHub handle and the role of the user you would like to add.</p>
      <v-row>
        <v-spacer></v-spacer>
        <v-col>
          <v-text-field label="GitHub Handle" v-model="newUser" :rules="[rules.required]"></v-text-field>
        </v-col>
        <v-col>
          <v-select :items="roles" v-model="newRole" label="Set role to:" :rules="[rules.required]"></v-select>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
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
      newRole: "user",
      newUser: "",
      rules: {
        required: value => !!value || "Required."
      }
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

      let qry = `https://api.github.com/users/${this.newUser}`;
      let qry2 = `${process.env.VUE_APP_API}/addAuth?token=${this.token}&user=${
        this.user
      }&login=${this.newUser}&type=${this.newRole}`;

      axios
        .get(qry, { headers: { Accept: "application/vnd.github.v3+json" } })
        .then(function(res) {
          console.log("success", res);
          console.log(qry2);
          axios
            .post(qry2)
            .then(function(res) {
              alert(res.data);
              self.close();
            })
            .catch(function(err) {
              alert(err);
            });
        })
        .catch(function(err) {
          alert(
            "There was an error with this request. Perhaps the username is invalid."
          );
          console.log(err);
        });
    }
  },
  mounted() {
    console.log("inside popup", this.popup);
    this.newRole = this.popup.data.type;
  }
};
</script>