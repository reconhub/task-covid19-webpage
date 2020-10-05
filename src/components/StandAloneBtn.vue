<template>
  <div class="click-div pa-3" @click="newPage">
    <p>
      <b>{{text}}</b>
    </p>
  </div>
</template>
<script>
export default {
  name: "toolbarbtn",
  props: ["text", "href", "route"],
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
.click-div {
  cursor: pointer;
  background-color: rgb(49, 79, 150);
  height: 100%;
  transition: background-color 1s;
  border-radius: 5px;
}

.click-div:hover {
  background-color: rgb(9, 39, 110);
}

.click-div p {
  color: white;
}
</style>

