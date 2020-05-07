import config from '../../../config';
import restify from '@not-govuk/react-restify';
import App from '../../common/app';
import Template from '../template';
import webpackConfig from '../../../webpack.config.js';

export const httpd = (props) => restify.createServer({
  name: config.name,
  app: {
    Component: App,
    props: {
      title: 'NotGovUK',
      phase: 'alpha',
      ...props
    }
  },
  template: {
    Component: Template,
    props: {
      assetsDir: '/public',
      baseTitle: 'NotGovUK',
      bundle: 'bundle.js',
      stylesheets: ['style.css']
    }
  },
  webpackConfig
});

export default httpd;
