<template>
  <v-app dark>
    <v-navigation-drawer app permanent>
      <v-btn icon @click="selectGitProject">
        <v-icon>add</v-icon>
      </v-btn>
      <div>{{projectName}}</div>
    </v-navigation-drawer>
    <v-content>
      <template v-if="branches.length">      
        <v-divider></v-divider>
        <p class="title">{{projectName}}</p>
        <v-divider></v-divider>
        <v-btn @click="openDeleteDialog" v-if="isSelectedBranchExist">브랜치 삭제하기</v-btn>
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
      </template>
      <template v-else>
        <p class="title">프로젝트를 선택해 주세요.</p>
      </template>
    </v-content>
    <v-dialog v-model="deleteDialog" width="290" persistent>
      <v-card>
        <v-card-title>선택한 브랜치를 삭제하시겠습니까?</v-card-title>
        <v-card-text>
          <v-checkbox label="강제삭제" v-model="forceDelete"/>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="disagreeInDeleteDialog">아니요</v-btn>
          <v-btn flat @click="agreeInDeleteDialog">네</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar top right v-model="deleteBranchCompleteSnackbar">
      브랜치 삭제 완료
      <v-btn flat color="pink" @click.native="deleteBranchCompleteSnackbar = false">Close</v-btn>
    </v-snackbar>
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
      branches: [],
      deleteDialog: false,
      forceDelete: false,
      deleteBranchCompleteSnackbar: false,
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
        .catch((e) => {
          console.error(e);
          alert('깃 프로젝트가 아닙니다');
        });
    },
    showBranches() {
      this.branches = service.getBranches();
    },
    openDeleteDialog() {
      this.deleteDialog = true;
    },
    disagreeInDeleteDialog() {
      this.deleteDialog = false;
      this.forceDelete = false;
    },
    agreeInDeleteDialog() {
      this.deleteDialog = false;
      this.deleteBranches(this.forceDelete);
      this.forceDelete = false;
    },
    deleteBranches(forceDelete) {
      const branchNames = this.branches
        .filter((branch) => branch.isSelected)
        .map((branch) => branch.name);

      const result = service.deleteBranches(branchNames, forceDelete);
      if (result.code !== 0) {
        alert(result.stderr);
        console.error(result);
      }

      this.deleteBranchCompleteSnackbar = true;

      this.showBranches();
    },
  },
  computed: {
    isSelectedBranchExist() {
      return this.branches.some((branch) => branch.isSelected);
    },
  },
};
</script>

<style>
/* CSS */
</style>
