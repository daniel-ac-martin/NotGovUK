declare module 'restify-bunyan-logger' {
  const fn: () => (...args: any[]) => void;
  export default fn;
}
