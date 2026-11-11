import { Logger as hmctsLogger } from '@hmcts/nodejs-logging';

export const logger = hmctsLogger.getLogger('common-steps');
logger.transports.console.colorize = 'all';
