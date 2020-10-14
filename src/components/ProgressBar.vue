<template>
  <div :title="title" class="px-1 pb-1" style="border: 1px solid black">
    <p class="mb-0">{{label}}</p>
    <div :style="{backgroundColor: color, height: '6px', width: width, 'border': '1px solid grey'}"></div>
  </div>
</template>

<script>
export default {
  name: "progressBar",
  props: ["label", "title", "color", "width"]
};
</script>

<style>
</style>
