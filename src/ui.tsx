import React, { useEffect, useState } from 'react';
import { Box, Text, useInput, useApp } from 'ink';
import Spinner from 'ink-spinner';
import path from 'path';
import { DupGroup, findDuplicateTypes } from './index.js';

export function DryUI({ projectPath, threshold }: { projectPath: string; threshold: number }) {
  const [state, setState] = useState<'scanning' | 'done'>('scanning');
  const [groups, setGroups] = useState<DupGroup[]>([]);
  const [cursor, setCursor] = useState(0);
  const { exit } = useApp();

  useEffect(() => {
    const g = findDuplicateTypes(projectPath, { threshold });
    setGroups(g);
    setState('done');
  }, [projectPath, threshold]);

  useInput((input, key) => {
    if (state !== 'done') return;
    if (key.upArrow) setCursor(c => Math.max(0, c - 1));
    if (key.downArrow) setCursor(c => Math.min(groups.length - 1, c + 1));
    if (key.return) printGroup(groups[cursor]);
    if (key.escape || input === 'q') exit();
  });

  if (state === 'scanning')
    return (
      <Box>
        <Text color="cyan">
          <Spinner type="dots" /> Scanning…
        </Text>
      </Box>
    );

  if (!groups.length) return <Text color="green">✅ No duplicate types found!</Text>;

  return (
    <Box flexDirection="column">
      <Text color="yellow">{groups.length} duplicate groups (↑/↓ navigate, ⏎ show, q quit)</Text>
      {groups.map((g, i) => (
        <Text key={i} inverse={i === cursor} wrap="truncate-end">
          {Math.round(g.similarity * 100)}% – {g.types[0].name} ↔ {g.types[1].name}
        </Text>
      ))}
    </Box>
  );
}

function printGroup(g: DupGroup) {
  console.log('\n' + '─'.repeat(60));
  console.log(`Group similarity: ${(g.similarity * 100).toFixed(0)}%`);
  g.types.forEach(t => console.log(' •', path.relative(process.cwd(), t.file), t.name));
  console.log('─'.repeat(60));
}
