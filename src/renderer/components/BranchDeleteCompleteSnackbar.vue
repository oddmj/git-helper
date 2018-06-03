<template>
  <v-snackbar 
    v-model="visible" 
    top 
    right>
    브랜치 삭제 완료
    <v-btn 
      flat 
      color="pink" 
      @click="close">Close</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style>
</style>
