import { relativePath } from './relative-path.js';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const relToSkel = dir => relativePath(__dirname, '..', 'skel', dir);

export default relToSkel;
