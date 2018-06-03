<template>
  <v-app dark>
    <left-area 
      :on-click="selectGitProject" 
      :project-name="projectName"/>
    <v-content>
      <template v-if="branches.length">      
        <v-divider/>
        <p class="title">{{ projectName }}</p>
        <v-divider/>
        <v-btn 
          v-if="isSelectedBranchExist" 
          @click="openDeleteDialog">브랜치 삭제하기</v-btn>
        <v-list>
          <v-list-tile 
            v-for="branch in branches" 
            :key="branch.name">
            <v-list-tile-action>
              <v-checkbox 
                v-if="branch.isDeletable" 
                v-model="branch.isSelected"/>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ branch.name }}
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
    <branch-delete-dialog 
      :visible="branchDeleteDialogVisible" 
      @disagree="closeBranchDeleteDialog"
      @agree="processBranchDelete"/>
    <branch-delete-complete-snackbar 
      :visible="branchDeleteCompleteSnackbarVisible" 
      @close="closeBranchDeleteCompleteSnarkbar"/>
  </v-app>
</template>

<script>
import service from './service/service';

import LeftArea from './components/LeftArea';
import BranchDeleteDialog from './components/BranchDeleteDialog';
import BranchDeleteCompleteSnackbar from './components/BranchDeleteCompleteSnackbar';

export default {
  name: 'GitHelper',
  components: {
    'left-area': LeftArea,
    'branch-delete-dialog': BranchDeleteDialog,
    'branch-delete-complete-snackbar': BranchDeleteCompleteSnackbar,
  },
  data() {
    return {
      projectName: '',
      branches: [],
      branchDeleteDialogVisible: false,
      branchDeleteCompleteSnackbarVisible: false,
    };
  },
  computed: {
    isSelectedBranchExist() {
      return this.branches.some((branch) => branch.isSelected);
    },
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
      this.branchDeleteDialogVisible = true;
    },
    closeBranchDeleteDialog() {
      this.branchDeleteDialogVisible = false;
    },
    processBranchDelete(data) {
      this.branchDeleteDialogVisible = false;
      this.deleteBranches(data.forceDelete);
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

      this.branchDeleteCompleteSnackbarVisible = true;

      this.showBranches();
    },
    closeBranchDeleteCompleteSnarkbar() {
      this.branchDeleteCompleteSnackbarVisible = false;
    },
  },
};
</script>

<style>
/* CSS */
</style>
