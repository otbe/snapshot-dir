import { snapshot, snapshotCompare, snapshotSync, snapshotCompareSync } from '../src/index';
import { join } from 'path';
import expect from 'expect';

const exampleSnap = {
  'app.js': '862e2bc029ba5c877a70956f6d3895aa',
  'index.html': '7fe52ed696876f21b21dccdba5dc9255',
  'text.txt': '8bcc714d327b74a95a166574d0103f5c'
};

const reversedExampleSnap = {
  'text.txt': '8bcc714d327b74a95a166574d0103f5c',
  'index.html': '7fe52ed696876f21b21dccdba5dc9255',
  'app.js': '862e2bc029ba5c877a70956f6d3895aa'
};

const examplesPath = join(__dirname, '..', 'examples');

describe('snapshot-dir', () => {
  describe('async API', () => {
    it('should generate a snapshot', async () => {
      const snap = await snapshot(examplesPath);

      expect(snap).toBeTruthy();
      expect(snap).toEqual(exampleSnap);
    });

    it('should compare snapshots', async () => {
      const diff = await snapshotCompare(examplesPath, exampleSnap);

      expect(diff).toBeFalsy();
    });

    it('should compare snapshots 2/2', async () => {
      const diff = await snapshotCompare(examplesPath, reversedExampleSnap);

      expect(diff).toBeFalsy();
    });

    it('should compare snapshots (failure)', async () => {
      const failureSnap = {
        ...exampleSnap,
        foo: 'bar'
      };

      const diff = await snapshotCompare(examplesPath, failureSnap);

      expect(diff).toBeTruthy();
    });
  });

  describe('sync API', () => {
    it('should generate a snapshot', () => {
      const snap = snapshotSync(examplesPath);

      expect(snap).toBeTruthy();
      expect(snap).toEqual(exampleSnap);
    });

    it('should compare snapshots', () => {
      const diff = snapshotCompareSync(examplesPath, exampleSnap);

      expect(diff).toBeFalsy();
    });

    it('should compare snapshots 2/2', () => {
      const diff = snapshotCompareSync(examplesPath, reversedExampleSnap);

      expect(diff).toBeFalsy();
    });

    it('should compare snapshots (failure)', () => {
      const failureSnap = {
        ...exampleSnap,
        foo: 'bar'
      };

      const diff = snapshotCompareSync(examplesPath, failureSnap);

      expect(diff).toBeTruthy();
    });
  });
});
