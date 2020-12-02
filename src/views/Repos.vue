<template>
  <v-card flat class="review">
    <h1 class="pa-5">REPOS</h1>
    <v-col>
      <v-row>
        <v-spacer></v-spacer>
        <v-col cols="8">
          <p>Below is a list of packages affiliated with RECON's task managing platform. If you would like to contribute, then please reachout to the point of contact via GitHub.</p>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
      <v-row v-if="this.jwt">
        <v-spacer></v-spacer>
        <v-col cols="8">
          <p>If you would like to suggest a package to add to to the RECON family, then please let us know .</p>
          <v-btn @click="updatePopup({type: 'AddPackage', data: '' })">Suggest a package</v-btn>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
      <v-row v-else>
        <v-spacer></v-spacer>
        <v-col cols="8">
          <p>If you would like to suggest a package to add to to the RECON family, then please login and come here to suggest a new package.</p>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
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
        <v-data-table :headers="headers" :items="showRepo" :search="search" style="font-size: 15px">
          <template v-slot:item.endPoint="{item}">
            <a :href="`https://github.com/${item.endPoint}`" target="_blank">{{item.endPoint}}</a>
          </template>
          <template v-slot:item.poc="{item}">
            <a :href="`https://github.com/${item.poc}`" target="_blank">{{item.poc}}</a>
          </template>
        </v-data-table>
        <v-spacer></v-spacer>
      </v-row>
    </v-col>
  </v-card>
</template>
<script>
export default {
  name: "repos",
  props: ["token", "user", "repos", "jwt", "openForm"],
  data() {
    return {
      search: "",
      headers: [
        { text: "Repo", value: "endPoint" },
        { text: "Point of Contact", value: "poc" }
      ]
    };
  },
  computed: {
    showRepo() {
      let adjRepo = this.repos.map(d => {
        d.endPoint = `${d.org}/${d.repo}`;
        return d;
      });
      return adjRepo;
    }
  },
  methods: {
    updatePopup(dta) {
      this.$emit("updatePopup", dta);
    }
  },
  created() {
    if (this.openForm) {
      this.updatePopup({ type: "AddPackage", data: "" });
    }
  }
};
</script>
<style>
.v-data-table > .v-data-table__wrapper > table > tbody > tr > th,
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td,
.v-data-table > .v-data-table__wrapper > table > thead > tr > th,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
  font-size: 20px !important;
}
</style>
