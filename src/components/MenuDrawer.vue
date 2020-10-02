<template>
  <v-navigation-drawer
    style="background-color: rgb(49, 79, 150);"
    dark
    absolute
    permanent
    class="hidden-lg-and-up"
  >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">RECON</v-list-item-title>
        <v-list-item-subtitle>Together against COVID19</v-list-item-subtitle>
        <v-row>
          <v-spacer></v-spacer>
          <v-list-item-icon style="cursor: pointer;" @click="$emit('toggleDrawer')">
            <v-icon>mdi-arrow-left-thick</v-icon>
          </v-list-item-icon>
          <v-spacer></v-spacer>
        </v-row>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>
    <v-list>
      <v-list-item link>
        <v-list-item-content @click="$router.push('about'); $emit('toggleDrawer')">
          <b>ABOUT</b>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link>
        <v-list-item-content @click="$router.push('learn'); $emit('toggleDrawer')">
          <b>LEARN</b>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link>
        <v-list-item-content @click="$router.push({ name: 'explore'}); $emit('toggleDrawer')">
          <b>EXPLORE</b>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link>
        <v-list-item-content v-if="token" @click="$router.push('myTasks'); $emit('toggleDrawer')">
          <b>MY TASKS</b>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link>
        <v-list-item-content
          v-if="auth == 'admin' | auth == 'reviewer'"
          @click="$router.push('review'); $emit('toggleDrawer')"
        >
          <b>REVIEW</b>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link>
        <v-list-item-content
          v-if="auth == 'admin'"
          @click="$router.push('adminDash'); $emit('toggleDrawer')"
        >
          <b>ADMIN DASHBOARD</b>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  name: "MenuDrawer",
  props: ["token", "auth", "user", "drawer"],
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>