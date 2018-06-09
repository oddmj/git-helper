import { ipcRenderer } from 'electron';
import execa from 'execa';

import saveFileService from './save-file.service';

let cwd = '';

function showGitProjectOpenDialog() {
  return new Promise((resolve) => {
    ipcRenderer.send('open-git-project-dialog');

    ipcRenderer.once('select-git-project', (event, path) => {
      if (path) {
        resolve(path);
      }
    });
  });
}

function validateGitProject(path) {
  cwd = path;

  return execa.shell('git status', { cwd }).then((result) => {
    if (!result.code) {
      return Promise.resolve(path);
    }
    return Promise.reject('git 프로젝트가 아닙니다.');
  });
}

function addToFile(path) {
  const projects = saveFileService.get();

  const isAlreadyAdded = projects.some((project) => project.path === path);
  if (isAlreadyAdded) {
    return Promise.reject('이미 추가한 프로젝트입니다.');
  }

  const addedProject = { path };

  projects.push(addedProject);

  saveFileService.save(projects);

  return Promise.resolve(addedProject);
}

function selectGitProject() {
  return showGitProjectOpenDialog()
    .then((path) => validateGitProject(path))
    .then((path) => addToFile(path));
}

function createBranchObject(branch) {
  if (branch.startsWith('* ')) {
    return {
      name: branch.substr(2),
      isCheckedOut: true,
      nonDeletableReason: `체크아웃 중인 브랜치`,
    };
  }

  const branchName = branch.substr(2);
  if (branchName === 'develop' || branchName === 'master') {
    return {
      name: branchName,
      isDeletable: false,
      nonDeletableReason: `${branchName} 브랜치`,
    };
  }

  return {
    name: branchName,
    isDeletable: true,
  };
}

function getBranches(path) {
  cwd = path;
  const result = execa.shellSync('git branch', { cwd }).stdout.split('\n');
  return result.map((branch) => createBranchObject(branch));
}

function deleteBranches(branchNames, forceDelete) {
  return execa.shellSync(
    `git branch ${forceDelete ? '-D' : '-d'} ${branchNames.join(' ')}`,
    { cwd }
  );
}

export default {
  selectGitProject,
  getBranches,
  deleteBranches,
};
