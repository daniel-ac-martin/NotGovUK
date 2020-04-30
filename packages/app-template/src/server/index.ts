import config from '../../config';
import httpd from './lib/httpd';

httpd.get('/api/foo', (req, res, next) => {
  res.send({ foo: 'bar' });
  next();
});

function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}

httpd.get('/hello/:name', respond);
httpd.head('/hello/:name', respond);

function respondHTML(req, res, next) {
  //res.render('div', {}, 'hello ' + req.params.name);
  res.contentType = 'text/html';
  res.send(true);
  next();
}

httpd.get('/html/:name', respondHTML);
httpd.head('/html/:name', respondHTML);

httpd.listen(config.httpd.port, config.httpd.host, () => {
  httpd.log.info('%s listening at %s', httpd.name, httpd.url);
});
