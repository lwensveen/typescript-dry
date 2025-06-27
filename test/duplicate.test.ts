// test/duplicate.test.ts
import { describe, it, expect } from 'vitest';
import { findDuplicateTypes } from '../src/index.js';

describe('findDuplicateTypes', () => {
  it('detects exact duplicate interfaces', () => {
    const groups = findDuplicateTypes('__fixtures__/proj', { threshold: 0.8 }); // returns DupGroup[]

    // Should detect at least one group
    expect(groups.length).toBeGreaterThan(0);

    // First group should list both interfaces
    const [first] = groups;
    const names = first.types.map(t => t.name).sort();
    expect(names).toEqual(['User', 'UserCopy'].sort());

    // Similarity of exact dupes is 1
    expect(first.similarity).toBe(1);
  });
});
