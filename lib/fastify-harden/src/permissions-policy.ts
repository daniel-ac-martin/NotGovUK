import { isDefined } from './common';

export type PPOptions = {
};

const keywords = [
  'self',
  'src'
];

const ppObj: Record<string, string> = {
  'accelerometer': 'self',
  'ambient-light-sensor': 'self', // Unsupported in Chrome
  'attribution-reporting': 'self', // Unsupported in Chrome
  'autoplay': 'self',
  'battery': 'self', // Unsupported in Chrome
  'bluetooth': 'self', // Unsupported in Chrome
  'browsing-topics': 'self',
  'camera': 'self',
  'clipboard-read': 'self',
  'clipboard-write': 'self',
  'compute-pressure': 'self',
  'conversion-measurement': 'self', // Unsupported in Chrome
  'cross-origin-isolated': 'self',
  'display-capture': 'self',
  'document-domain': 'self', // Unsupported in Chrome
  'encrypted-media': 'self',
  'execution-while-not-rendered': 'self', // Unsupported in Chrome
  'execution-while-out-of-viewport': 'self', // Unsupported in Chrome
  'focus-without-user-activation': 'self', // Unsupported in Chrome
  'fullscreen': 'self',
  'gamepad': 'self',
  'geolocation': 'self',
  'gyroscope': 'self',
  'keyboard-map': 'self',
  'hid': 'self',
  'identity-credentials-get': 'self',
  'idle-detection': 'self',
  'interest-cohort': 'self',
  'local-fonts': 'self',
  'magnetometer': 'self',
  'microphone': 'self',
  'midi': 'self',
  'navigation-override': 'self', // Unsupported in Chrome
  'otp-credentials': 'self',
  'payment': 'self',
  'picture-in-picture': 'self',
  'publickey-credentials-create': 'self',
  'publickey-credentials-get': 'self',
  'screen-wake-lock': 'self',
  'serial': 'self',
  'speaker-selection': 'self', // Unsupported in Chrome
  'storage-access': 'self',
  'sync-script': 'self', // Unsupported in Chrome
  'sync-xhr': 'self',
  'trust-token-redemption': 'self', // Unsupported in Chrome
  'unload': 'self',
  'usb': 'self',
  'web-share': 'self', // Unsupported in Chrome
  'window-management': 'self',
  'window-placement': 'self', // Unsupported in Chrome
  'vertical-scroll': 'self', // Unsupported in Chrome
  'xr-spatial-tracking': 'self'
};

export const permissionsPolicy = (_options: PPOptions) => ({
  policy: Object.keys(ppObj)
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
    .join(', ')
});
