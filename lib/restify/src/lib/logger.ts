import Bunyan, { LoggerOptions } from 'bunyan';

export const logger = (options: LoggerOptions) => new Bunyan(options);

export default logger;
export type {
  LoggerOptions
};
export type {
  LogLevelString
} from 'bunyan';
