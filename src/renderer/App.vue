<template>
  <v-app dark>
    <v-btn @click="selectGitProject">프로젝트 열기</v-btn>
  </v-app>
</template>

<script>
import service from './service/service';

export default {
  name: 'vue-git-helper',
  components: {},
  methods: {
    selectGitProject() {
      service.selectGitProject();
    },
  },
};
</script>

<style>
/* CSS */
</style>
