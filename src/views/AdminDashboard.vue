<template>
  <v-card flat class="adminDash">
    <h1 class="pa-5">ADMIN DASHBOARD</h1>
    <ul>
      <li>
        <b>Admin:</b>
        <i>Can add new reviewers and admins. Can approve tasks. Can submit new tasks.</i>
      </li>
      <li>
        <b>Reviewer:</b>
        <i>Can approve tasks. Can submit new tasks.</i>
      </li>
      <li>
        <b>User:</b>
        <i>[default] Can submit new tasks. Is automatically created when an admin or reviewer approves their task.</i>
      </li>
      <li>
        <b>Nothing:</b>
        <i>Explicitly told not to collaborate.</i>
      </li>
    </ul>
    <v-col>
      <v-row>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
      </v-row>
      <v-row>
        <v-spacer></v-spacer>
        <v-data-table :headers="headers" :items="authorizations" :search="search">
          <template v-slot:item.actions="{item}">
            <v-btn @click="updatePopup({type: 'EditUser', data: item})">Edit</v-btn>
          </template>
        </v-data-table>
        <v-spacer></v-spacer>
      </v-row>
      <br>
      <br>
      <v-row>
        <v-spacer></v-spacer>
        <v-col cols="8">
          <p>
            By default, anyone with a GitHub account has the role of
            <b>user</b>. Any other role needs to be explicitly given. If you do not see an
            <b>admin</b> or
            <b>reviewer</b> in the table above, then you can explicitly add that person by clicking the following button.
          </p>
          <v-btn @click="updatePopup({type: 'CreateUser', data: {}})">Add New User</v-btn>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-col>
  </v-card>
</template>
<script>
import axios from "axios";
import { setTimeout } from "timers";

export default {
  name: "adminDash",
  props: ["token", "user", "popup", "jwt"],
  data() {
    return {
      search: "",
      headers: [
        {
          text: "User",
          align: "start",
          value: "username"
        },
        { text: "Type", value: "type" },
        { text: "Approver", value: "approver" },
        { text: "Created", value: "created_on" },
        { text: "Updated", value: "last_update" },
        { text: "", value: "actions" }
      ],
      authorizations: []
    };
  },
  methods: {
    updatePopup(dta) {
      this.$emit("updatePopup", dta);
    },
    getAuthorizations() {
      let qry = `${process.env.VUE_APP_API}/auth`;

      let self = this;

      axios
        .get(qry, {
          headers: {
            //"content-type": "multipart/form-data",
            Authorization: self.jwt
          }
        })
        .then(function(res) {
          self.authorizations = res.data;
        })
        .catch(function(err) {
          console.log(JSON.stringify(err));
          alert(err);
          console.log(err);
        });
    }
  },
  watch: {
    popup: function(newVal) {
      if (!newVal.type) {
        this.getAuthorizations();
      }
    }
  },
  mounted() {
    this.getAuthorizations();
    this.$emit("updateToken");
    this.$emit("updateAuth");
    this.$emit("updateUser");
  }
};
</script>
