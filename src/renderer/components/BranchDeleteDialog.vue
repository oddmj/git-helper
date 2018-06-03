<template>
  <v-dialog 
    v-model="visible" 
    width="290" 
    persistent>
    <v-card>
      <v-card-title>선택한 브랜치를 삭제하시겠습니까?</v-card-title>
      <v-card-text>
        <v-checkbox 
          v-model="forceDelete" 
          label="강제삭제"/>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn 
          flat 
          @click="disagreeInDeleteDialog">아니요</v-btn>
        <v-btn 
          flat 
          @click="agreeInDeleteDialog">네</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      forceDelete: false,
    };
  },
  methods: {
    disagreeInDeleteDialog() {
      this.forceDelete = false;

      this.$emit('disagree');
    },
    agreeInDeleteDialog() {
      const forceDelete = this.forceDelete;

      this.forceDelete = false;

      this.$emit('agree', {
        forceDelete,
      });
    },
  },
};
</script>

<style>
</style>
