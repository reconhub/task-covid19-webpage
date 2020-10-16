<template>
  <div
    class="click-div pa-3"
    @click="newPage"
    tabindex="0"
    :style="{'--baseClr': baseClr ? baseClr : defaultBase, '--hoverClr': hoverClr ? hoverClr : defaultHover}"
  >
    <p>
      <b>{{text}}</b>
    </p>
  </div>
</template>
<script>
export default {
  name: "toolbarbtn",
  props: ["text", "href", "route", "baseClr", "hoverClr"],
  data() {
    return {
      defaultBase: "rgb(49, 79, 150)",
      defaultHover: "rgb(9, 39, 110)"
    };
  },
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
  background-color: var(--baseClr);
  height: 100%;
  transition: background-color 1s;
  border-radius: 5px;
}

.click-div:hover {
  background-color: var(--hoverClr);
}

.click-div p {
  color: white;
}
</style>

