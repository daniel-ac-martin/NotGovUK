import type { HeadComponent } from './common';

const isDev = globalThis.process?.env?.NODE_ENV === 'development';

// Set up dummy component
let Head: HeadComponent = (_) => null;

// Replace dummy functions with react-helmet-async when it is available
try {
  ({ Helmet: Head } = require('react-helmet-async'));
} catch (_e) {
  // We don't seem to have a suitable library so give up :-(
  // Should we throw an Error here?
  if (isDev) {
    console.warn('Unable to find helmet library; the HTML head will not be updated.');
  }
}

export { Head };
export default Head;
export type { HeadProps } from './common';
