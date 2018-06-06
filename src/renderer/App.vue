<template>
  <v-app dark>
    <left-area 
      :project-name="projectName"
      @selectProject="onSelectProject"/>
    <main-area 
      :project-name="projectName" 
      :branches="branches"
      @open-delete-dialog="openDeleteDialog"/>
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

import MainArea from './components/MainArea';
import LeftArea from './components/LeftArea';
import BranchDeleteDialog from './components/BranchDeleteDialog';
import BranchDeleteCompleteSnackbar from './components/BranchDeleteCompleteSnackbar';

export default {
  name: 'GitHelper',
  components: {
    'left-area': LeftArea,
    'branch-delete-dialog': BranchDeleteDialog,
    'branch-delete-complete-snackbar': BranchDeleteCompleteSnackbar,
    'main-area': MainArea,
  },
  data() {
    return {
      projectName: '',
      branches: [],
      branchDeleteDialogVisible: false,
      branchDeleteCompleteSnackbarVisible: false,
    };
  },
  methods: {
    onSelectProject(data) {
      this.projectName = data.name;
      this.showBranches();
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
