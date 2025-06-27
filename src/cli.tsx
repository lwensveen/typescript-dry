#!/usr/bin/env node
import { Command } from 'commander';
import { render } from 'ink';
import React from 'react';
import { findDuplicateTypes } from './index.js';
import { DryUI } from './ui.js';

const program = new Command();
program
  .argument('[project]', 'tsconfig project dir', '.')
  .option('-t, --threshold <num>', '0‑1 similarity (default 1)', v => parseFloat(v))
  .option('--json', 'output JSON report')
  .option('--out <file>', 'write JSON or fix file')
  .option('--fix', 'create duplicates.ts alias file (exact matches)')
  .option('--ui', 'interactive Ink UI')
  .parse();

const opts = program.opts<{
  threshold: number;
  json: boolean;
  out: string;
  fix: boolean;
  ui: boolean;
}>();
const [projectDir] = program.args;

if (opts.ui) {
  render(
    (
      <DryUI projectPath={projectDir} threshold={opts.threshold ?? 1} />
    ) as unknown as React.ReactElement
  );
} else {
  findDuplicateTypes(projectDir, {
    threshold: opts.threshold ?? 1,
    json: opts.json,
    fix: opts.fix,
    outFile: opts.out,
  });
}
