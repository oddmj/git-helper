<template>
  <v-content>
    <template v-if="branches.length">      
      <p class="title">{{ projectName }}</p>
      <v-btn
        :disabled="isNotSelectedBranchExist"
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
</template>

<script>
export default {
  props: {
    projectName: {
      type: String,
      required: true,
    },
    branches: {
      type: Array,
      required: true,
    },
  },
  computed: {
    isNotSelectedBranchExist() {
      return this.branches.every((branch) => !branch.isSelected);
    },
  },
  methods: {
    openDeleteDialog() {
      this.$emit('open-delete-dialog');
    },
  },
};
</script>
<style>
.title {
  padding: 10px;
}
</style>
