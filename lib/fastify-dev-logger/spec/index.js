import pino from 'pino';
import { Transform, Writable } from 'node:stream';
import { fastifyDevLogger } from '../src/index.js';

// See: https://github.com/chalk/ansi-regex/blob/94983fc6ba00e1e9657f72c07eb7b9c75e4011a2/index.js
const controlCodesRegex = /(?:\u001B\][\s\S]*?(?:\u0007|\u001B\u005C|\u009C))|[\u001B\u009B][[\]()#;?]*(?:\d{1,4}(?:[;:]\d{0,4})*)?[\dA-PR-TZcf-nq-uy=><~]/g;
const stripColours = (str) => str.replace(controlCodesRegex, '');

describe('fastifyDevLogger', () => {
  it('is a function', () => expect(fastifyDevLogger).toBeInstanceOf(Function));
  it('that takes one parameter', () => expect(fastifyDevLogger).toHaveLength(1));

  describe('when given minimal options', () => {
    let output = [];
    const captureStream = new Writable({
      write(chunk, _enc, cb) {
        output.push(
          stripColours(chunk.toString())
            .replace(/\n$/, '')
        );
        cb();
      },
    });
    const options = {
      sync: true,
      destination: captureStream
    };
    const result = fastifyDevLogger(options);

    it('returns a Transform object', () => expect(result).toBeInstanceOf(Transform));

    describe('the Transform', () => {
      describe('when run in pino', () => {
        const pinoOptions = {
          level: 'trace'
        };
        const logger = pino(pinoOptions, result);
        const timePattern = '\\[[0-9]{2}:[0-9]{2}:[0-9]{2}\\.[0-9]{3}\\]';
        const timeRegex = new RegExp(timePattern);

        describe('when logging a string', () => {
          beforeAll(() => {
            output = [];
            logger.warn('My message');
          });

          it('writes only once', () => expect(output.length).toEqual(1));
          it('outputs the message', () => expect(output[0]).toContain('My message'));
          it('outputs the log level', () => expect(output[0]).toContain('warn'));
          it('outputs the time', () => expect(output[0]).toMatch(timeRegex));
          it('outputs in the correct format', () => expect(output[0]).toMatch(new RegExp(
            `^${timePattern}  warn      \\| My message$`
          )));
        });

        describe('when logging an error', () => {
          beforeAll(() => {
            output = [];
            logger.error(new Error('My error message'));
          });

          it('writes only once', () => expect(output.length).toEqual(1));
          it('outputs the message', () => expect(output[0]).toContain('My error message'));
          it('outputs log level', () => expect(output[0]).toContain('error'));
          it('outputs the time', () => expect(output[0]).toMatch(timeRegex));
          it('outputs in the correct format', () => expect(output[0]).toMatch(new RegExp(
            `^${timePattern} error      \\| Error: My error message\n\\s*at `,
            'ms'
          )));
        });

        describe('when logging an object', () => {
          beforeAll(() => {
            output = [];
            logger.debug({ my: 'object' });
          });

          it('writes only once', () => expect(output.length).toEqual(1));
          it('outputs the object', () => expect(output[0]).toContain('{ my: \'object\' }'));
          it('outputs log level', () => expect(output[0]).toContain('debug'));
          it('outputs the time', () => expect(output[0]).toMatch(timeRegex));
          it('outputs in the correct format', () => expect(output[0]).toMatch(new RegExp(
            `^${timePattern} debug      \\| { my: 'object' }$`
          )));
        });

        describe('when logging a request', () => {
          beforeAll(() => {
            output = [];
            logger.info({
              reqId: 'req-c3',
              req: {
                method: 'GET',
                url: '/path/to/resource'
              },
              res: {
                statusCode: 200
              },
              responseTime: 1066,
              msg: 'request completed'
            });
          });

          it('writes only once', () => expect(output.length).toEqual(1));
          it('outputs the message', () => expect(output[0]).toContain('request completed'));
          it('outputs log level', () => expect(output[0]).toContain('info'));
          it('outputs the time', () => expect(output[0]).toMatch(timeRegex));
          it('outputs in the correct format', () => expect(output[0]).toMatch(new RegExp(
            `^${timePattern}  info \\(C3\\) \\| GET /path/to/resource - request completed; 200 OK \\(1066ms\\)$`
          )));
        });
      });
    });
  });
});
