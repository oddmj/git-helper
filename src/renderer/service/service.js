import { ipcRenderer } from 'electron';

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
  path.toString();
  //   const nodePath = which('node');
  //   config.execPath = nodePath;
  //   cd(path);

  //   const result = exec('git status');

  //   if (!result.code) {
  //     return Promise.resolve(path);
  //   } else {
  //     return Promise.reject(undefined);
  //   }
}

function selectGitProject() {
  return showGitProjectOpenDialog().then((path) => {
    validateGitProject(path);
  });
}

export default { selectGitProject };
