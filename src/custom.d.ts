declare module "*.rt" {
  function content(props: object, context?: object): any;
  module content {}
  export = content;
}
