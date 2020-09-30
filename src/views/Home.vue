<template>
  <v-card class="pa-0 ma-0">
    <call-to-action :token="token" :user="user"/>
    <!-- <intro-slides/> -->
    <quick-facts/>
  </v-card>
</template>

<script>
import CallToAction from "../components/CallToAction";
import QuickFacts from "../components/QuickFacts";

export default {
  name: "Home",
  props: ["token", "user"],
  components: {
    // IntroSlides,
    CallToAction,
    QuickFacts
  }
};
</script>
