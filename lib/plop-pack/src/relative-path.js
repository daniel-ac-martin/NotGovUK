import { resolve } from 'node:path';

export const relativePath = (...baseDir) => (...path) => resolve(...baseDir, ...path);

export default relativePath;
