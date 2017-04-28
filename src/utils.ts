import glob from 'glob';
import { readFile } from 'fs';
import md5 from 'md5';

export const listFiles = (cwd: string) => {
  return new Promise<string[]>((resolve, reject) => {
    glob('**/*', { cwd, nodir: true  }, (err, matches) => {
      if (err) {
        return reject(err);
      }

      resolve(matches);
    });
  });
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
