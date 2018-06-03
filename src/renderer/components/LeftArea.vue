<template>
  <v-navigation-drawer 
    app 
    permanent>
    <v-btn 
      icon 
      @click="onClick">
      <v-icon>add</v-icon>
    </v-btn>
    <div>{{ projectName }}</div>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    onClick: {
      type: Function,
      required: true,
    },
    projectName: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
</style>
