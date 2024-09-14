import { Middleware } from './common';

const keywords = [
  'self',
  'src'
];

const ppObj = {
  'accelerometer': 'self',
  'ambient-light-sensor': 'self',
  'autoplay': 'self',
  'battery': 'self',
  'camera': 'self',
  'display-capture': 'self',
  'document-domain': 'self',
  'encrypted-media': 'self',
  'execution-while-not-rendered': 'self',
  'execution-while-out-of-viewport': 'self',
  'fullscreen': 'self',
  'gamepad': 'self',
  'geolocation': 'self',
  'gyroscope': 'self',
  'hid': 'self',
  'idle-detection': 'self',
  'local-fonts': 'self',
  'magnetometer': 'self',
  'microphone': 'self',
  'midi': 'self',
  'payment': 'self',
  'picture-in-picture': 'self',
  'publickey-credentials-get': 'self',
  'screen-wake-lock': 'self',
  'serial': 'self',
  'speaker-selection': 'self',
  'usb': 'self',
  'web-share': 'self',
  'xr-spatial-tracking': 'self'
};

const isDefined = (v: any): boolean => (
  v !== undefined
);

const policy = Object.keys(ppObj)
  .map(directive => {
    const _valueArr = ppObj[directive];
    const valueArr = (
      Array.isArray(_valueArr)
        ? _valueArr
        : [ _valueArr ]
    );
    const values = (
      valueArr
        .filter(isDefined)
        .map(v => (
          keywords.includes(v)
            ? v
            : `"${v}"`
        ) )
        .join(' ')
    );

    return (
      values === ''
      ? undefined
        : `${directive}=(${values})`
    );
  } )
  .filter(isDefined)
  .join(', ');

export const permissionsPolicy: Middleware = (_req, res, next) => {
  res.header('Permissions-Policy', policy);

  next();
};

export default permissionsPolicy;
