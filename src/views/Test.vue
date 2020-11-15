<template>
  <v-card flat style="width: 100%">
    <v-row v-for="(req, i) in requests" :key="i">
      <v-col cols="3">
        <v-btn @click="test(req.method, i)">{{req.method}}</v-btn>
      </v-col>
      <v-col cols="8">
        <p>{{req.res}}</p>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import axios from "axios";

export default {
  name: "test",
  props: ["text", "href", "route", "icon"],
  data: () => {
    return {
      requests: [
        { method: "POST", res: "" },
        { method: "GET", res: "" },
        { method: "PUT", res: "" }
      ]
    };
  },
  methods: {
    test(method, i) {
      let that = this;

      axios({
        method: method,
        url: `${process.env.VUE_APP_API}/test`,
        data: {
          firstName: "Fred",
          lastName: "Flintstone"
        },
        headers: {
          "content-type": "multipart/form-data",
          Authorization: "yolo"
        }
      })
        .then(res => {
          let tmp = that.requests[i];

          tmp.res = JSON.stringify(res);
          that.$set(that.requests, i, tmp);
        })
        .catch(err => {
          console.log("test", err);
        });
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");
</style>

