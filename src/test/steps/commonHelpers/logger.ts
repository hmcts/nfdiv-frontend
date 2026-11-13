import { Logger as hmctsLogger } from '@hmcts/nodejs-logging';

import { CaseData } from '../../../main/app/case/definition';

export const logger = hmctsLogger.getLogger('common-steps');
logger.transports.console.colorize = 'all';

export const logAndExit = (error: Error | string | CaseData): never => {
  if (typeof error === 'string') {
    logger.error(error);
  } else if (error instanceof Error) {
    logger.error(error.message);
  } else if (typeof error === 'object') {
    logger.error(JSON.stringify(error));
  }
  process.exit(-1);
};

export const logAndThrow = (error: Error | string | CaseData): never => {
  if (error instanceof Error) {
    logger.error(error.message);
    throw error;
  } else if (typeof error === 'object') {
    logger.error(JSON.stringify(error));
    throw new Error(JSON.stringify(error));
  }

  logger.error(error);
  throw new Error(error);
};
