<template>
  <v-navigation-drawer 
    app 
    permanent>
    <v-btn 
      icon 
      @click="selectGitProject">
      <v-icon>add</v-icon>
    </v-btn>
    <div>{{ projectName }}</div>
  </v-navigation-drawer>
</template>

<script>
import service from '../service/service';

export default {
  props: {
    projectName: {
      type: String,
      required: true,
    },
  },
  methods: {
    selectGitProject() {
      service
        .selectGitProject()
        .catch((e) => {
          console.error(e);
          alert('깃 프로젝트가 아닙니다');
          return Promise.reject();
        })
        .then((path) => {
          this.$emit('selectProject', {
            name: path.split('/').pop(),
          });
        });
    },
  },
};
</script>

<style>
</style>
