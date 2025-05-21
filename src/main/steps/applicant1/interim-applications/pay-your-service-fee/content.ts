import config from 'config';

import { TranslationFn } from '../../../../app/controller/GetController';
import { getFee } from '../../../../app/fees/service/get-fee';
import { FormContent } from '../../../../app/form/Form';
import { generateContent as payYourFeeContent, form as payYourFeeForm } from '../common/pay-your-fee/content';

export const form: FormContent = payYourFeeForm;

export const generateContent: TranslationFn = content => {
  content.generalApplicationFee = getFee(config.get('fees.deemedService'));

  const payYourFeePageContent = payYourFeeContent(content);

  return {
    ...payYourFeePageContent,
  };
};
