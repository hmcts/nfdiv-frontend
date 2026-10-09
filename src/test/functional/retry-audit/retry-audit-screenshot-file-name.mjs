import { testToFileName } from 'codeceptjs/lib/mocha/test';

export const getRetryAuditScreenshotFileName = (test, attempt) =>
  `${testToFileName(test, { suffix: '', unique: false })}.attempt_${attempt}.failed.png`;
