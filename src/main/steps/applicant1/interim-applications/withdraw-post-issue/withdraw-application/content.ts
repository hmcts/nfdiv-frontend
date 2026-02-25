import config from 'config';

import { getFormattedDate } from '../../../../../app/case/answers/formatDate';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { getFee } from '../../../../../app/fees/service/get-fee';
import { FormContent } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';

const en = ({ partner, isDivorce, referenceNumber, userCase }: CommonContent, serviceFee : string) => ({
  title: `Apply to withdraw your ${isDivorce ? 'divorce application' : 'application to end your civil partnership'}`,
  line1: `Reference number: ${referenceNumber}`,
  line2: `${
    isDivorce ? 'Divorce application' : 'Application to end your civil partnership'
  } submitted: ${getFormattedDate(userCase.dateSubmitted)}`,
  line3: `Use this form to apply to the court to withdraw this ${isDivorce ? 'divorce application' : 'application to end your civil partnership'}.`,
  line4: `We have now sent (issued) the ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  } to your ${partner}. That means there is a fee of ${serviceFee}, but you may be able to <a class="govuk-link" target="_blank" href="${config.get(
    'govukUrls.getHelpWithCourtFees'
  )}">get help paying this fee (opens in a new tab)</a>.`,
  buttonText: 'Start now',
});

const cy = ({ partner, isDivorce, referenceNumber, userCase }: CommonContent, serviceFee: string) => ({
  title: `Apply to withdraw your ${isDivorce ? 'divorce application' : 'application to end your civil partnership'}`,
  line1: `Reference number: ${referenceNumber}`,
  line2: `${
    isDivorce ? 'Divorce application' : 'Application to end your civil partnership'
  } submitted: ${getFormattedDate(userCase.dateSubmitted)}`,
  line3: `Use this form to apply to the court to withdraw this ${isDivorce ? 'divorce application' : 'application to end your civil partnership'}.`,
  line4: `We have now sent (issued) the ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  } to your ${partner}. That means there is a fee of ${serviceFee}, but you may be able to <a class="govuk-link" target="_blank" href="${config.get(
    'govukUrls.getHelpWithCourtFees'
  )}">get help paying this fee (opens in a new tab)</a>.`,
  buttonText: 'Start now',
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.buttonText,
    isStartButton: true,
  },
};

export const generateContent: TranslationFn = content => {
  const serviceFee = getFee(config.get('fees.generalAppWithoutHearing'));
  const translations = languages[content.language](content, serviceFee);
  return {
    ...translations,
    form,
  };
};
