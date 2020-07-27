<template>
  <v-container>
    <h2>Quick Facts</h2>
    <v-row v-for="(fact, i) in facts" :key="i">
      <v-col v-if="i % 2 === 0" cols="4">
        <!-- <v-img :src="require('../assets/Placeholder.png')" class="my-3" contain height="100"/> -->
        <v-img :src="fact.img" class="my-3" contain height="100"/>
      </v-col>
      <v-col cols="8">
        <p>{{fact.txt}}</p>
      </v-col>
      <v-col v-if="i % 2 !== 0" cols="4">
        <!-- <v-img :src="require('../assets/Placeholder.png')" class="my-3" contain height="100"/> -->
        <v-img :src="fact.img" class="my-3" contain height="100"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "QuickFacts",

  data() {
    return {
      facts: [
        {
          txt:
            "Enim illum ad dolores iusto sequi eveniet, saepe exercitationem vitae consectetur assumenda esse culpa dolorem, blanditiis voluptas nostrum! Dolor illo rem culpa?",
          img: require("../assets/Placeholder.png")
        },
        {
          txt:
            "Facere dignissimos, praesentium provident quidem quia tempora exercitationem consectetur et iste maxime sequi voluptatum dolores sint molestias doloremque maiores vero odio repellat.",
          img: require("../assets/Placeholder.png")
        },
        {
          txt:
            "Eius expedita tempora, odio numquam obcaecati reprehenderit voluptatum ipsum, quod assumenda animi neque ullam. Corporis cum fugiat omnis qui tempore, magni fugit.",
          img: require("../assets/Placeholder.png")
        },
        {
          txt:
            "Sapiente dolorum vitae eos ad, enim molestias et sunt officiis placeat vel quod similique distinctio corporis tempore, accusamus commodi reiciendis, maiores expedita!",
          img: require("../assets/Placeholder.png")
        }
      ]
    };
  }
};
</script>
