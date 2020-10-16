<template>
  <div :title="title" class="px-1 pb-1" style>
    <p class="mb-0">{{label}}</p>
    <div style="position: relative; padding-bottom: 6px;">
      <div
        :style="{backgroundColor: color, height: '6px', width: width, 'border': '1px solid grey', 'position': 'absolute'}"
      ></div>
      <div style="width: 100%; border: 1px solid black; height: 6px; position: absolute"></div>
    </div>
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
