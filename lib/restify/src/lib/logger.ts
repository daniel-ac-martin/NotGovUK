import Bunyan, { LoggerOptions as ILoggerOptions } from 'bunyan';

export const logger = (options: ILoggerOptions) => new Bunyan(options);

export default logger;
export type {
  ILoggerOptions
};
