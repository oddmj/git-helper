<template>
  <v-app dark>
    <v-btn @click="selectGitProject">프로젝트 열기</v-btn>
    <p class="title text-xs-center">{{projectName}}</p>
  </v-app>
</template>

<script>
import service from './service/service';

export default {
  name: 'git-helper',
  components: {},
  data() {
    return {
      projectName: null,
    };
  },
  methods: {
    selectGitProject() {
      service
        .selectGitProject()
        .then((path) => {
          this.projectName = path.split('/').pop();
          // this.showBranches();
        })
        .catch(() => {
          // alert('깃 프로젝트가 아닙니다');
        });
    },
  },
};
</script>

<style>
/* CSS */
</style>
