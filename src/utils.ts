import glob from 'glob';
import { readFile, readFileSync } from 'fs';
import md5 from 'md5';
import { SnapshotResult } from './index';

export const listFiles = (cwd: string) => {
  return new Promise<string[]>((resolve, reject) => {
    glob('**/*', { cwd, nodir: true }, (err, matches) => {
      if (err) {
        return reject(err);
      }

      resolve(matches);
    });
  });
};

export const listFilesSync = (cwd: string) => {
  return glob.sync('**/*', { cwd, nodir: true });
};

export const computeHash = (path: string) => {
  return new Promise<string>((resolve, reject) => {
    readFile(path, (err, buf) => {
      if (err) {
        return reject(err);
      }

      try {
        resolve(md5(buf));
      } catch (e) {
        reject(e);
      }
    });
  });
};

export const computeHashSync = (path: string) => {
  return md5(readFileSync(path));
};

export const createSnapshot = (files: string[], hashs: string[]) => {
  return files.reduce<SnapshotResult>((acc, file, index) => {
    return {
      ...acc,
      [file]: hashs[index]
    };
  }, {});
};
