<template>
  <v-card flat class="about">
    <h1 class="pa-5">ABOUT</h1>
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="8">
        <p class="text-left mx-3 white-back">
          The R Epidemics Consortium’s (
          <a href="https://www.repidemicsconsortium.org">RECON</a>
          ) COVID-19 challenge is a communication platform between field epidemiologists, infectious disease modellers, data scientists, and R developers which goal is to help field agents who are dealing with the response to COVID-19 to report and fill their analytical needs in real time.
          It enables them to easily report their needs through a
          <router-link to="explore">simple template request form</router-link>and it provides a
          <router-link to="explore">list of tasks ranked by order of importance</router-link>for members of the R community to identify the most pressing needs and help fulfill them.
          The platform also aims at helping package develops focus their next updates.
        </p>
        <!-- <v-img :src="require('../assets/covid-explain.png')" class="my-3" contain height="500"/> -->
        <p class="text-left mx-3">
          Possible development requests include modification of existing functions, creation of new functionalities, new packages, code reviews or requests for analysis templates. A full list can be found
          <router-link to="learn">here</router-link>.
        </p>
        <p class="text-left mx-3">
          Packages who collaborate with the platform include the
          <a
            href="https://www.repidemicsconsortium.org/projects/"
            target="_blank"
          >suite of RECON packages</a>
          and many other important packages related to the COVID-19 response such as
          <a
            href="https://github.com/GuangchuangYu/nCov2019"
            target="_blank"
          >nCov2019</a> or the
          <a href="https://covid19datahub.io/" target="_blank">COVID-19 data hub</a>. Please contact us at
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
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-card>
</template>
