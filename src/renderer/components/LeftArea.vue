<template>
  <v-navigation-drawer 
    app 
    permanent>
    <v-btn 
      icon 
      @click="selectGitProject">
      <v-icon>add</v-icon>
    </v-btn>
    <v-list>
      <v-list-tile 
        v-for="project in projects" 
        :key="project.path">
        <span @click="selectProject(project)">
          <b v-if="project.path === selectedProject.path">
            {{ getProjectName(project) }}
          </b>
          <template 
            v-else>
            {{ getProjectName(project) }}
          </template>
        </span>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import service from '../service/service';
import saveFileService from '../service/save-file.service';

export default {
  props: {
    selectedProject: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      projects: [],
    };
  },
  created() {
    this.projects = saveFileService.get();
    if (this.projects.length) {
      this.$emit('add-project', this.projects[0]);
    }
  },
  methods: {
    selectGitProject() {
      service
        .selectGitProject()
        .catch((e) => {
          alert(e);
          return Promise.reject();
        })
        .then((project) => {
          this.projects = saveFileService.get();
          this.$emit('add-project', project);
        });
    },
    getProjectName(project) {
      return project.path.split('/').pop();
    },
    selectProject(project) {
      this.$emit('add-project', project);
    },
  },
};
</script>

<style>
</style>
