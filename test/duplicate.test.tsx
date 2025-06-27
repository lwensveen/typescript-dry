import React from 'react';
import { describe, it, expect, afterAll } from 'vitest';
import { findDuplicateTypes } from '../src/index.js';
import { render } from 'ink-testing-library';
import { DryUI } from '../src/ui.js';
import fs from 'fs';
import path from 'path';

const tmp = (...p: string[]) => path.join(__dirname, '__tmp__', ...p);

describe('findDuplicateTypes', () => {
  afterAll(() => fs.rmSync(path.join(__dirname, '__tmp__'), { recursive: true, force: true }));

  it('detects exact duplicate interfaces', () => {
    const groups = findDuplicateTypes('__fixtures__/proj', { threshold: 0.8 });
    expect(groups.length).toBeGreaterThan(0);
    const names = groups[0].types.map(t => t.name).sort();
    expect(names).toEqual(['User', 'UserCopy'].sort());
    expect(groups[0].similarity).toBe(1);
  });

  it('renders TUI without crashing', () => {
    render(<DryUI projectPath="__fixtures__/proj" threshold={1} />);
  });

  it('writes JSON report when --json + --out used', () => {
    const out = tmp('dupes.json');
    fs.mkdirSync(path.dirname(out), { recursive: true });
    findDuplicateTypes('__fixtures__/proj', { json: true, outFile: out });
    const data = JSON.parse(fs.readFileSync(out, 'utf8'));
    expect(data[0].types.length).toBeGreaterThan(0);
  });

  it('creates duplicates.ts for exact matches', () => {
    const proj = tmp('proj');
    fs.mkdirSync(proj, { recursive: true });
    fs.writeFileSync(path.join(proj, 'a.ts'), 'export interface Foo { id: string }');
    fs.writeFileSync(path.join(proj, 'b.ts'), 'export interface FooCopy { id: string }');
    fs.writeFileSync(
      path.join(proj, 'tsconfig.json'),
      '{ "compilerOptions": { "strict": true }, "include":["*.ts"] }'
    );

    findDuplicateTypes(proj, { fix: true });
    const fixFile = fs.readFileSync(path.join(proj, 'duplicates.ts'), 'utf8');
    expect(fixFile).toMatch(/export type FooCopy = Foo/);
  });

  it('omits near duplicates when threshold = 1', () => {
    const groups = findDuplicateTypes('__fixtures__/near-dupe', { threshold: 1 });
    expect(groups).toHaveLength(0);
  });
});
