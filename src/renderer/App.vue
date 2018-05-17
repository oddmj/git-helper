<template>
  <v-app dark>
    <v-btn @click="selectGitProject">프로젝트 열기</v-btn>
    <p class="title text-xs-center">{{projectName}}</p>
    <v-list>
      <v-list-tile v-for="branch in branches" :key="branch.name">
        <v-list-tile-action>
          <v-checkbox v-if="branch.isDeletable" v-model="branch.isSelected"/>
        </v-list-tile-action>
        <v-list-tile-content>
            <v-list-tile-title>
              {{branch.name}}
            </v-list-tile-title>
            <v-list-tile-sub-title v-if="!branch.isDeletable">
              {{ branch.nonDeletableReason }}
            </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
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
      branches: null,
    };
  },
  methods: {
    selectGitProject() {
      service
        .selectGitProject()
        .then((path) => {
          this.projectName = path.split('/').pop();
          this.showBranches();
        })
        .catch(() => {
          // alert('깃 프로젝트가 아닙니다');
        });
    },
    showBranches() {
      this.branches = service.getBranches();
    },
  },
};
</script>

<style>
/* CSS */
</style>
