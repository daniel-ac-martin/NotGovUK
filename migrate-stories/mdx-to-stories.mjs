#! /bin/env node

import fs from 'node:fs/promises';
import { createProcessor } from '@mdx-js/mdx';

const prog = process.argv[1];
const args = process.argv.slice(2);
const [ mdx ] = args;

const usage = () => {
  console.log(`Usage: ${prog} <MDX_FILE>`);
};

if (!mdx) {
  console.error('Error: No file provided.');
  usage();
  process.exit(1);
}

const compiled = await compile(
  await fs.readFile(mdx)
);

console.log(String(compiled));
