<template>
  <v-card flat class="about">
    <h1 class="pa-5">ABOUT</h1>
    <p class="text-left mx-3 white-back">
      R Epidemics Consortium’s (
      <a href="https://www.repidemicsconsortium.org">RECON</a>
      ) COVID-19 challenge is a communication platform between field epidemiologists, infectious disease modellers and R developers whose goal is to help field agents who are dealing with the response to COVID-19 to fill their analytical needs. It provides a direct and real-time communication channel between the field and the R community focused on the development of R tools used to deal with epidemic outbreaks and COVID-19.
    </p>
    <v-img :src="require('../assets/covid-explain.png')" class="my-3" contain height="500"/>
    <p class="text-left mx-3">
      Possible development requests include modification of existing functions, creation of new packages or requests for analysis templates. A full list can be found
      <router-link to="learn">here</router-link>.
    </p>
    <p class="text-left mx-3">
      The platform provides a
      <router-link to="explore">simple template request form</router-link>for field agents to submit their needs and a
      <router-link to="explore">list of tasks ranked by order of importance</router-link>for volunteer members of the R community to identify the most pressing needs. It also helps package developers focus their next updates. You can learn how to use the platform
      <router-link to="learn">here</router-link>.
    </p>
    <p class="text-left mx-3">
      Packages who collaborate with the platform mainly include the
      <a
        href="https://www.repidemicsconsortium.org/projects/"
        target="_blank"
      >suite of RECON packages</a>
      but also CITE. Please contact us at
      <a
        href="mailto:repidemicsconsortium@gmail.com"
      >repidemicsconsortium@gmail.com</a>
      if you believe your package falls in the scope of the platform.
    </p>
    <p class="text-left mx-3">
      This project was financed by the
      <a
        href="https://www.r-consortium.org/"
        target="_blank"
      >R consortium</a>.
    </p>
  </v-card>
</template>
