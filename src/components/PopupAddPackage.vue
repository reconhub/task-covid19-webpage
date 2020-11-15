<template>
  <v-card color="white" shaped rounded raised elevation-24 class="rounded-xl pa-4">
    <v-card-title>Suggest a package.</v-card-title>
    <v-card-text>
      <p>Please suggest a package to add to the RECON family.</p>
      <p>
        https://github.com/
        <b>organization</b> /
        <i>package</i>
      </p>
      <v-row>
        <v-spacer></v-spacer>
        <v-col>
          <v-text-field label="GitHub organization:" v-model="org" :rules="[rules.required]"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field label="Organization's package:" v-model="pkg" :rules="[rules.required]"></v-text-field>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
      <v-row>
        <v-spacer></v-spacer>
        <v-col>
          <v-text-field
            label="Point of contact's Github handle"
            v-model="poc"
            :rules="[rules.required]"
          ></v-text-field>
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
  name: "PopupAddPackage",
  props: ["popup", "token", "user", "jwt"],
  data() {
    return {
      org: "",
      pkg: "",
      poc: "",
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

      let qry = `https://api.github.com/users/${this.poc}`;

      let qry2 = `${process.env.VUE_APP_API}/pkgs`;

      axios
        .get(qry, { headers: { Accept: "application/vnd.github.v3+json" } })
        .then(function(res) {
          axios
            .post(
              qry2,
              { poc: self.poc, org: self.org, pkg: self.pkg },
              {
                headers: {
                  "content-type": "multipart/form-data",
                  Authorization: self.jwt
                }
              }
            )
            .then(function(res) {
              alert(
                "Thank you for suggesting this package to RECON. The suggestion will be reviewed by our team."
              );
              self.close();
            })
            .catch(function(err) {
              alert(err);
            });
        })
        .catch(function(err) {
          alert(
            "There was an error with this request. Perhaps the point of contact is invalid."
          );
          console.log(err);
        });
    }
  },
  mounted() {
    console.log("inside popup", this.popup);
  }
};
</script>