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

export default { selectGitProject };
