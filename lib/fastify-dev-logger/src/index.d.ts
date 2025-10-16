import type { PrettyOptions, PrettyStream } from 'pino-pretty';

export type FastifyDevLoggerOptions = Pick<PrettyOptions, 'append', 'destination', 'minimumLevel', 'mkdir', 'sync'> & {
};

declare export const fastifyDevLogger: (a: FastifyDevLoggerOptions): PrettyStream;

export default fastifyDevLogger;
