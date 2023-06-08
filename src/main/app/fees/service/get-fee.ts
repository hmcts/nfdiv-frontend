import { Logger } from '@hmcts/nodejs-logging';
import axios from 'axios';
import config from 'config';

const logger = Logger.getLogger('fee-register');
const fees = {
  DivorceCivPart: { amount: 0, service: 'divorce', event: 'issue' },
  DivorceAmendPetition: { amount: 0, service: 'other', event: 'issue' },
  AppnPrivateOther: { amount: 0, service: 'other', event: 'issue' },
  GAContestedOrder: { amount: 0, service: 'other', event: 'general application' },
  BailiffServeDoc: { amount: 0, service: 'other', event: 'enforcement' },
  FinancialOrderOnNotice: { amount: 0, service: 'other', event: 'miscellaneous' },
  GeneralAppWithoutNotice: { amount: 0, service: 'other', event: 'general application' },
  GAOnNotice: { amount: 0, service: 'other', event: 'general application' },
};

type FeeKeyword = keyof typeof fees;

export const updateFee = (keyword: FeeKeyword): void => {
  const url =
    config.get('services.fees.url') +
    '/fees-register/fees/lookup' +
    `?channel=${config.get('services.fees.channel')}` +
    `&jurisdiction1=${config.get('services.fees.jurisdiction1')}` +
    `&jurisdiction2=${config.get('services.fees.jurisdiction2')}` +
    `&service=${fees[keyword].service}` +
    `&keyword=${keyword}` +
    `&event=${fees[keyword].event}`;

  axios
    .get(url)
    .then(response => (fees[keyword].amount = response.data.fee_amount))
    .catch(err => logger.error(err.response?.status, err.response?.data));
};

const updateFees = () => {
  logger.info('Refreshing fees');
  Object.keys(fees).forEach(k => updateFee(k as FeeKeyword));
};

export const initFees = (): void => {
  updateFees();
  setInterval(updateFees, 1000 * 60 * 60);
};

export const getFee = (keyword: FeeKeyword): string => {
  return '£' + fees[keyword].amount;
};
