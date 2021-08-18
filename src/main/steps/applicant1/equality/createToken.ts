import crypto from 'crypto';

import { Logger } from '@hmcts/nodejs-logging';
import config from 'config';

const logger = Logger.getLogger('createToken');

const algorithm = 'aes-256-gcm';
const bufferSize = 16;
const iv = Buffer.alloc(bufferSize, 0); // Initialization vector.
const keyLen = 32;

export const createToken = (params: Record<string, unknown>): string => {
  const tokenKey: string = config.get('services.equalityAndDiversity.tokenKey');
  let encrypted = '';

  if (tokenKey) {
    const key = crypto.scryptSync(tokenKey, 'salt', keyLen);
    // Convert all params to string before encrypting
    Object.keys(params).forEach(p => {
      params[p] = String(params[p]);
    });
    const strParams = JSON.stringify(params);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    encrypted = cipher.update(strParams, 'utf8', 'hex');
    encrypted += cipher.final('hex');
  } else {
    logger.error('PCQ token key is missing.');
  }

  return encrypted;
};
