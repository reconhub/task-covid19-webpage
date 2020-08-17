<template>
  <v-card flat class="repos">
    <v-img :src="require('../assets/Placeholder.png')" class="my-3" contain height="200"/>
    <h2>Repos</h2>
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum quam libero magnam molestiae iure et impedit alias vitae facilis. Sapiente nemo animi expedita pariatur libero rerum, ea culpa illum necessitatibus!</p>
    <v-btn @click="makeRepo">Click me</v-btn>
    <v-row>
      <v-col v-for="(repo, i) in repos" :key="i" sm="12" lg="4" md="6" xl="4" cols="12">
        <v-card class="mx-2 px-2">
          <v-row>
            <v-col cols="8">
              <v-card-title>
                <a :href="repo.html_url" target="_blank">{{repo.name}}</a>
              </v-card-title>
              <v-card-subtitle v-text="repo.description"></v-card-subtitle>
            </v-col>
            <v-col cols="4">
              <p style="border: 1px solid black">
                <b>Updated on:</b>
                <br>
                <i>{{repo.updated_at.match(/^\d{4}-\d{2}-\d{2}/g)[0]}}</i>
              </p>
              <v-spacer></v-spacer>
              <p>
                <b>Created on:</b>
                <br>
                <i>{{repo.created_at.match(/^\d{4}-\d{2}-\d{2}/g)[0]}}</i>
              </p>
              <v-spacer></v-spacer>
              <v-btn v-if="issue_list[i].length" @click="closeIssue(i)">Close</v-btn>
              <v-btn v-else @click="getIssue(repo, i)">
                Check
                <br>issues
              </v-btn>
            </v-col>
          </v-row>
          <v-row v-if="issue_list[i].length" class="mx-2">
            <v-simple-table style="width: 100% ">
              <template v-slot:default>
                <tbody>
                  <tr v-if="issue_list[i][0] == 'None'">
                    <p>
                      <b>This repo has no pending issues.</b>
                    </p>
                  </tr>
                  <tr v-else v-for="(issue, j) in issue_list[i]" :key="j">
                    <td>
                      <a :href="issue.html_url" target="_blank">
                        <b>{{issue.title}}</b>
                      </a>
                      <p v-if="issue.labels.length">
                        Labels:
                        <span v-for="(label, k) in issue.labels" :key="k">
                          &nbsp;{{label.name}}&nbsp;
                          <span v-if="k != issue.labels.length -1">|</span>
                        </span>
                      </p>
                      <!-- <p>{{issue.body}}</p>     -->
                    </td>
                  </tr>
                  <tr v-if="token">
                    <td>
                      <v-btn @click="updatePopup({type: 'CreateIssue', data: repo})">Add Issue</v-btn>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-row>
        </v-card>
      </v-col>
    </v-row>`
  </v-card>
</template>
<script>
import axios from "axios";
export default {
  name: "Repos",
  props: ["token"],
  data() {
    return {
      repos: [],
      issue_list: [],
      page: 1
    };
  },
  methods: {
    updatePopup(dta) {
      this.$emit("updatePopup", dta);
    },
    makeRepo() {
      let qry = `https://api.github.com/orgs/RECON-Mirror/repos`;
      let bdy = {
        name: "test-repo",
        description: "Here is a test description for the test-repo"
      };
      let token = sessionStorage.getItem("RECON_GitHub_Token");

      axios
        .post(qry, bdy, {
          headers: {
            Accept: "application/vnd.github.v3+json",
            Authorization: `token ${token}`
          }
        })
        .then(function(res) {
          console.log("success");
          console.log(res);
        })
        .catch(function(err) {
          console.log(JSON.stringify(err));
          alert(err);
          console.log(err);
        });
    },

    getRepos() {
      let self = this;
      let size = 100;
      let qry = `https://api.github.com/orgs/${"reconhub"}/repos?sort=updated&per_page=${size}&page=${
        this.page
      }`;
      console.log(qry);
      axios
        .get(qry, { headers: { Accept: "application/vnd.github.v3+json" } })
        .then(function(res) {
          self.repos = self.repos.concat(res.data);

          if (res.data.length >= size) {
            self.page += 1;
            self.getRepos(self.page);
          } else {
            self.issue_list = self.repos.map(() => []);
          }
        })
        .catch(function(err) {
          console.log(JSON.stringify(err));
          alert(err);
          console.log(err);
        });
    },
    getIssue(repo_info, i) {
      let owner = repo_info.owner.login;
      let repo = repo_info.name;
      let qry = `https://api.github.com/repos/${owner}/${repo}/issues`;
      let self = this;
      axios
        .get(qry, { headers: { Accept: "application/vnd.github.v3+json" } })
        .then(function(res) {
          console.log(res);
          //   self.issue_list[i] = res.data;

          if (res.data.length) {
            self.$set(self.issue_list, i, res.data);
          } else {
            self.$set(self.issue_list, i, ["None"]);
          }
        })
        .catch(function(err) {
          console.log(JSON.stringify(err));
          alert(err);
          console.log(err);
        });
    },
    closeIssue(i) {
      this.$set(this.issue_list, i, []);
    }
  },
  mounted() {
    this.getRepos();
  }
};
</script>
