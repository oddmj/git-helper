import { ipcRenderer } from 'electron';
import { which, config, cd, exec } from 'shelljs';

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
  const nodePath = which('node');
  config.execPath = nodePath.toString();
  cd(path);

  const result = exec('git status');

  if (!result.code) {
    return Promise.resolve(path);
  }
  return Promise.reject(undefined);
}

function selectGitProject() {
  return showGitProjectOpenDialog().then((path) => validateGitProject(path));
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

function getBranches() {
  const result = exec('git branch').stdout.split('\n');
  result.pop();
  return result.map((branch) => createBranchObject(branch));
}

function deleteBranches(branchNames, forceDelete) {
  return exec(
    `git branch ${forceDelete ? '-D' : '-d'} ${branchNames.join(' ')}`
  );
}

export default {
  selectGitProject,
  getBranches,
  deleteBranches,
};
