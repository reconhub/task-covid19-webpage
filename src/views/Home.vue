<template>
  <v-card flat tabindex="0">
    <h1 class="pa-5">RECON COVID-19 CHALLENGE</h1>
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
