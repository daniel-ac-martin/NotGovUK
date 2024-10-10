import Bunyan, { LoggerOptions } from 'bunyan';

export type Logger = Bunyan;

export const logger = (options: LoggerOptions): Logger => new Bunyan(options);

export default logger;
export type {
  LoggerOptions
};
export type {
  LogLevelString
} from 'bunyan';
