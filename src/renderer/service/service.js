import { ipcRenderer } from 'electron';
import execa from 'execa';

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
    return Promise.reject(undefined);
  });
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
  const result = execa.shellSync('git branch', { cwd }).stdout.split('\n');
  result.pop();
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
