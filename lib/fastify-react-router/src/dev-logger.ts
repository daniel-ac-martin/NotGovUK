import type { FastifyBaseLogger } from 'fastify';
import type { RollupError } from 'rollup';
import type { Logger, LogErrorOptions } from 'vite';

import { clearScreenDown, cursorTo } from 'node:readline';

// This function takes inspiration from Vite's logger
// See: https://github.com/vitejs/vite/blob/02eee7ace80ef078d9768b7731330ecc8a4d4d85/packages/vite/src/node/logger.ts
export const createLogger = (log: FastifyBaseLogger): Logger => {
  const errors = new WeakSet<Error | RollupError>();
  const warnings = new Set<string>();

  const processOptions = (opts?: LogErrorOptions) => {
    if (opts?.error) {
      errors.add(opts.error);
    }

    if (opts?.clear) {
      logger.clearScreen('error');
    }
  };

  const logger: Logger = {
    hasWarned: false,
    info(msg, opts) {
      processOptions(opts);
      log.info(msg);
    },
    warn(msg, opts) {
      logger.hasWarned = true
      processOptions(opts);
      log.warn(msg);
    },
    warnOnce(msg, opts) {
      if (!warnings.has(msg)) {
        logger.hasWarned = true
        processOptions(opts);
        log.warn(msg);
        warnings.add(msg)
      }
    },
    error(msg, opts) {
      logger.hasWarned = true
      processOptions(opts);
      log.error(msg);
    },
    clearScreen(_type) {
      const repeatCount = process.stdout.rows - 2
      const blank = repeatCount > 0 ? '\n'.repeat(repeatCount) : ''
      console.log(blank)
      cursorTo(process.stdout, 0, 0)
      clearScreenDown(process.stdout)
    },
    hasErrorLogged(error) {
      return errors.has(error)
    }
  };

  return logger;
};
