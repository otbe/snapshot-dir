import { listFiles, computeHash, listFilesSync, computeHashSync, createSnapshot, SnapshotResult } from './utils';
import { join } from 'path';
import { diff } from 'deep-diff';

export async function snapshot(path: string) {
  const files = await listFiles(path);
  const hashs = await Promise.all(files.map(file => computeHash(join(path, file))));

  return createSnapshot(files, hashs);
}

export function snapshotSync(path: string) {
  const files = listFilesSync(path);
  const hashs = files.map(file => computeHashSync(join(path, file)));

  return createSnapshot(files, hashs);
}

export async function snapshotCompare(path: string, currentSnap: SnapshotResult) {
  return diff(currentSnap, await snapshot(path));
}

export function snapshotCompareSync(path: string, currentSnap: SnapshotResult) {
  return diff(currentSnap, snapshotSync(path));
}
