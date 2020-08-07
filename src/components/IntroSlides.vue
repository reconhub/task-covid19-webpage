<template>
  <v-carousel cycle height="400" hide-delimiter-background show-arrows-on-hover>
    <v-carousel-item v-for="(pkg, i) in packageList" :key="i">
      <v-sheet :color="colors[i % colors.length ]" height="100%">
        <v-row class="fill-height" align="center" justify="center">
          <div class="display-3">
            <p>
              <b>
                <a :href="pkg.link" target="_blank">
                  <b>{{pkg.title}}</b>
                </a>
              </b>
            </p>
            <p>
              <b style="font-size: 5vh">{{pkg.description}}</b>
            </p>
          </div>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

export default {
  name: "MyComponent",
  components: { VueSlickCarousel },
  data() {
    return {
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4"
      ],
      slides: ["First", "Second", "Third", "Fourth", "Fifth"],
      packageList: [
        {
          title: "incidence",
          description: "☣ 📈 📉 ☣ Compute and visualise incidence ",
          link: "https://github.com/reconhub/incidence",
          style: {
            background: "#7baabe"
          }
        },
        {
          title: "outbreaker2",
          description:
            "Disease outbreak reconstruction from epidemiological and genetic data.",
          link: "https://github.com/reconhub/outbreaker2"
        },
        {
          title: "learn",
          description:
            "RECON learn: a free, open platform for training material on epidemics analysis.",
          link: "https://github.com/reconhub/learn"
        },
        {
          title: "epicontacts",
          description:
            "Handling, Visualisation and Analysis of Epidemiological Contacts",
          link: "https://github.com/reconhub/epicontacts"
        },
        {
          title: "aweek",
          description: "Convert dates to arbitrary week definitions 📆",
          link: "https://github.com/reconhub/aweek"
        },
        {
          title: "deployer",
          description: "Self-contained R environment on a thumb drive",
          link: "https://github.com/reconhub/deployer"
        }
      ]
    };
  }
};
</script>

