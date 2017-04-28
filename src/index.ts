import { listFiles, computeHash } from './utils';
import { join } from 'path';
import { diff } from 'deep-diff';

export interface SnapshotResult {
  [key: string]: string;
}

export async function snapshot(path: string) {
  const files = await listFiles(path);
  const hashs = await Promise.all(files.map(file => computeHash(join(path, file))));

  return files.reduce<SnapshotResult>((acc, file, index) => {
    return {
      ...acc,
      [file]: hashs[index]
    };
  }, {});
}

export async function snapshotCompare(path: string, currentSnap: SnapshotResult) {
  return diff(currentSnap, await snapshot(path));
}
