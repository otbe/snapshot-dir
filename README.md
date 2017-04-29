# snapshot-dir
[![Build Status](https://travis-ci.org/otbe/snapshot-dir.svg?branch=master)](https://travis-ci.org/otbe/snapshot-dir)

Every now and then I need a little tool which takes a snapshot of a folder and compares it to an older one. Imagine we program a build/bundler tool which uses this technqiue to ensure 	integrity after changes to the core.

*snapshot-dir* exports two functions to generate and compare snapshots.

## API
### snapshot
```
snapshot(path: string): Promise<SnapshotResult>
```
Generates a snapshot from a given ```path```. The result is an object with filenames as keys and hashs as values.

### snapshotCompare
```
snapshotCompare(path: string, currentSnap: SnapshotResult): Promise<IDiff>
```
Compares a given ```path``` with a given ```currentSnap``` and returns a [deep-diff](https://www.npmjs.com/package/deep-diff#simple-examples) result object, which is undefined for no diff or a changeset.

### snapshotSync
Same as ```snapshot``` but sync.

### snapshotCompareSync
Same as ```snapshotCompareSync``` but sync.
