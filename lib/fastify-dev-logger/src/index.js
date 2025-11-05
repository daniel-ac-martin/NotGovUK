import { inspect } from 'node:util';
import pretty from 'pino-pretty';

const formatNumber = (width, number) => (
  number.toString().padStart(width, '0')
);

export const fastifyDevLogger = ({
  ...prettyOptions
}) => {
  const colourise = pretty.colorizerFactory(true);
  const colourMessage = colourise.message;
  const greyMessage = colourise.greyMessage;
  const redMessage = colourise.colors.red;
  const amberMessage = colourise.colors.yellow;
  const greenMessage = colourise.colors.green;
  const space = ' ';
  const colourLevel = (level) => (
    space.repeat(5 - level.length) +
      colourise(level)
      .toLowerCase()
  );
  const levelName = {
    10: colourLevel('trace'),
    20: colourLevel('debug'),
    30: colourLevel('info'),
    40: colourLevel('warn'),
    50: colourLevel('error'),
    60: colourLevel('fatal')
  };
  const statusName = {
    100: colourMessage('100 Continue'),
    101: colourMessage('101 Switching Protocols'),
    102: colourMessage('102 Processing'),
    103: colourMessage('103 Early Hints'),
    200: greenMessage('200 OK'),
    201: greenMessage('201 Created'),
    202: greenMessage('202 Accepted'),
    203: greenMessage('203 Non-Authoritative Information'),
    204: greenMessage('204 No Content'),
    205: greenMessage('205 Reset Content'),
    206: greenMessage('206 Partial Content'),
    207: greenMessage('207 Multi-Status'),
    208: greenMessage('208 Already Reported'),
    226: greenMessage('226 IM Used'),
    300: colourMessage('300 Multiple Choices'),
    301: colourMessage('301 Moved Permanently'),
    302: colourMessage('302 Found'),
    303: colourMessage('303 See Other'),
    304: colourMessage('304 Not Modified'),
    305: colourMessage('305 Use Proxy'),
    306: colourMessage('306 unused'),
    307: colourMessage('307 Temporary Redirect'),
    308: colourMessage('308 Permanent Redirect'),
    400: amberMessage('400 Bad Request'),
    401: amberMessage('401 Unauthorised'),
    402: amberMessage('402 Payment Required'),
    403: amberMessage('403 Forbidden'),
    404: amberMessage('404 Not Found'),
    405: amberMessage('405 Method Not Allowed'),
    406: amberMessage('406 Not Acceptable'),
    407: amberMessage('407 Proxy Authentication Required'),
    408: amberMessage('408 Request Timeout'),
    409: amberMessage('409 Conflict'),
    410: amberMessage('410 Gone'),
    411: amberMessage('411 Length Required'),
    412: amberMessage('412 Precondition Failed'),
    413: amberMessage('413 Content Too Large'),
    414: amberMessage('414 URI Too Long'),
    415: amberMessage('415 Unsupported Media Type'),
    416: amberMessage('416 Range Not Satisfiable'),
    417: amberMessage('417 Expectation Failed'),
    418: amberMessage('418 I am a teapot'),
    421: amberMessage('421 Misdirected Request'),
    422: amberMessage('422 Unprocessable Content'),
    423: amberMessage('423 Locked'),
    424: amberMessage('424 Failed Dependency'),
    425: amberMessage('425 Too Early'),
    426: amberMessage('426 Upgrade Required'),
    428: amberMessage('428 Precondition Required'),
    429: amberMessage('429 Too Many Requests'),
    431: amberMessage('431 Request Header Fields Too Large'),
    451: amberMessage('451 Unavailable For Legal Reasons'),
    500: redMessage('500 Internal Server Error'),
    501: redMessage('501 Not Implemented'),
    502: redMessage('502 Bad Gateway'),
    503: redMessage('503 Service Unavailable'),
    504: redMessage('504 Gateway Timeout'),
    505: redMessage('505 HTTP Version Not Supported'),
    506: redMessage('506 Variant Also Negotiates'),
    507: redMessage('507 Insufficient Storage'),
    508: redMessage('508 Loop Detected'),
    510: redMessage('510 Not Extended'),
    511: redMessage('511 Network Authentication Required')
  };
  const reqContext = {};

  const messageFormat = (log, messageKey, _levelLabel, { colors }) => {
    const {
      level: _level,
      time: _time,
      pid,
      hostname,
      reqId,
      ...obj
    } = log;
    const {
      err,
      req,
      res,
      responseTime: _responseTime,
      [messageKey]: msg,
    } = log;

    if (reqId && req && !err) {
      // Create new context
      reqContext[reqId] = req;
    }

    const ctx = (
      reqId
        ? reqContext[reqId]
        : req
    );

    const datetime = new Date(_time);
    const HH = formatNumber(2, datetime.getHours());
    const mm = formatNumber(2, datetime.getMinutes());
    const ss = formatNumber(2, datetime.getSeconds());
    const mmm = formatNumber(3, datetime.getMilliseconds());

    const time = greyMessage(`[${HH}:${mm}:${ss}.${mmm}]`);
    const level = levelName[_level] || '?????';
    const request = (
      reqId
        ? greyMessage(` (${reqId.substring(4).substring(-2).padStart(2, '0').toUpperCase()})`)
        : '     '
    );
    const sep1 = greyMessage(' | ');
    const sep2 = greyMessage(' - ');
    const http = (
      ctx
        ? colourMessage(`${ctx.method} ${ctx.url}`)
        : ''
    );

    const indent = space.repeat(25) + sep1;
    const breakLength = 52; // Magic constants as colours make it hard to count characters
    const message = (
      err
        ? (
          err.stack
            .split('\n')
            .map((v, i) => (
              i === 0
                ? redMessage(`${err.type}: `) + err.message
                : greyMessage(v)
            ))
            .join('\n')
        )
        : msg || inspect(obj, { breakLength }).replace(/\n/g, '\n' + indent)
    );
    const status = (
      res?.statusCode && !err
        ? greyMessage('; ') + colourMessage(`${statusName[res.statusCode] || res.statusCode}`)
        : ''
    );
    const round = (num) => num.toPrecision(3);
    const responseTimeSeconds = round(_responseTime / 1000) + 's';
    const responseTime = (
      _responseTime
        ? (
          _responseTime < 1
            ? greyMessage(_responseTime.toFixed(2) + 'ms')
            : (
              _responseTime < 1000
                ? greyMessage(round(_responseTime) + 'ms')
                : (
                  _responseTime < 3000
                    ? colourMessage(responseTimeSeconds)
                    : (
                      _responseTime < 25000
                        ? amberMessage(responseTimeSeconds)
                        : redMessage(responseTimeSeconds)
                    )
                )
            )
        )
        : ''
    );
    const _contentLength = res?.contentLength;
    const contentLength = (
      _contentLength
        ?
        (
          _contentLength >= 1000000
            ? colourMessage(round(_contentLength / 1000000) + 'MB')
            : (
              _contentLength >= 1000
                ? greyMessage(round(_contentLength / 1000) + 'kB')
                : greyMessage(_contentLength)
            )
        )
        : ''
    );
    const responseInfo = (
      responseTime
        ? (
          greyMessage(' (') + responseTime + (
            contentLength
              ? greyMessage(', ') + contentLength
              : ''
          ) + greyMessage(')')
        )
        : ''
    );

    if (reqId && res && !err) {
      // Request is finished; clean up the context
      delete reqContext[reqId];
    }

    return `\r${time} ${level}${request}${sep1}` + (
      http
        ? `${http}${sep2}${message}${status}${responseInfo}`
        : message
    );
  };

  return pretty({
    ...prettyOptions,
    messageFormat,
    include: '',
    hideObject: true,
    colorize: false
  });
};

export default fastifyDevLogger;
