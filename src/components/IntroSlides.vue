<template>
  <!-- Make a div wrapped slider,set height and width -->
  <v-card style="width:100%;margin:0;height:200px">
    <!-- Using the slider component -->
    <slider ref="slider" :options="options">
      <!-- slideritem wrapped package with the components you need -->
      <slideritem v-for="(item,index) in someList" :key="index" :style="item.style">
        <a :href="item.link" target="_blank">{{item.txt}}</a>
      </slideritem>
      <!-- Customizable loading -->
      <div slot="loading">loading...</div>
    </slider>
  </v-card>
</template>
<script>
// import slider components
import { slider, slideritem } from "vue-concise-slider";
export default {
  el: "#app",
  data() {
    return {
      //data list [array]
      someList: [
        {
          txt: "distcrete",
          link: "https://github.com/reconhub/distcrete",
          style: {
            background: "#1bbc9b"
          }
        },
        {
          txt: "EpiEstim",
          link: "https://github.com/mrc-ide/EpiEstim",
          style: {
            background: "#4bbfc3"
          }
        },
        {
          txt: "earlyR",
          link: "https://github.com/reconhub/earlyR",
          style: {
            background: "#7baabe"
          }
        }
      ],
      //Slider configuration [obj]
      options: {
        currentPage: 0,
        autoplay: 5000,
        loop: true,
        speed: 600
      }
    };
  },
  components: {
    slider,
    slideritem
  }
};
</script>
