<template>
  <v-card class="pa-0 ma-0">
    <intro-slides/>
    <call-to-action/>
    <quick-facts/>
  </v-card>
</template>

<script>
//  import HelloWorld from '../components/HelloWorld'
import IntroSlides from "@/components/IntroSlides";
import CallToAction from "../components/CallToAction";
import QuickFacts from "../components/QuickFacts";

export default {
  name: "Home",

  components: {
    IntroSlides,
    CallToAction,
    QuickFacts
  }
};
</script>
