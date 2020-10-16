<template>
  <v-row :title="title" class="px-0 pb-" style>
    <v-col cols="3" class="ma-0 pa-0">
      <p class="ma-0 pa-0" style="font-size: 15px;">{{label}}</p>
    </v-col>
    <v-col
      cols="8"
      style="display: flex; align-items: center; justify-content: center"
      class="ma-0 pa-0"
    >
      <div style="position: relative; width: 100%">
        <div
          :style="{backgroundColor: color, height: '10px', width: width, 'border': '1px solid grey', 'position': 'absolute'}"
        ></div>
        <div style="width: 100%; border: 1px solid black; height: 10px;"></div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "progressBar",
  props: ["label", "title", "color", "width"]
};
</script>

<style>
</style>
