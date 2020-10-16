<template>
  <div class="d-flex mx-3 my-0" @click="newPage" tabindex="0">
    <v-icon v-if="icon">{{icon}}</v-icon>
    <p class="px-1">{{text}}</p>
  </div>
</template>
<script>
export default {
  name: "toolbarbtn",
  props: ["text", "href", "route", "icon"],
  methods: {
    newPage() {
      if (this.href) {
        window.location.href = this.href;
      } else if (this.route) {
        this.$router.push(this.route);
      } else {
        this.$emit("click");
      }
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");

div {
  /* display: inline-block; */
  cursor: pointer;
  height: 100%;
  float: left;
  margin: 10px 10px;
}

p:hover {
  border-bottom: 1px solid;
}

div p {
  text-align: center;
  border-bottom: 1px solid transparent;
  font-size: 16px;
  font-weight: 800;
  text-transform: uppercase;
  margin: 0px;
  align-self: center;
  /* justify-self: center; */
  font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
}
</style>

