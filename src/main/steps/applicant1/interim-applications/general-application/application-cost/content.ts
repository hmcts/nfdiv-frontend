import config from 'config';

import { GeneralApplicationHearingNotRequired } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { getFee } from '../../../../../app/fees/service/get-fee';
import { FormContent } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent, serviceFee: string) => ({
  title: `Your application will cost ${serviceFee}`,
  consentOrConsentNotRequired: {
    line1: `You have indicated that your ${partner} consents to your application, or consent is not needed. Therefore, your application will cost ${serviceFee}. You may be able to <a class="govuk-link" target="_blank" href="${config.get(
      'govukUrls.getHelpWithCourtFees'
    )}">get help paying this fee (opens in a new tab)</a>.`,
    line2: `If the judge decides that your evidence of consent is not strong enough, or that your ${partner}’s consent is needed, you may need to pay a higher fee. If this happens, we will contact you to let you know and will refund you this fee of ${serviceFee}.`,
  },
  noConsent: {
    line1: `Since your ${partner} does not consent to your application, your application will cost ${serviceFee}. You may be able to <a class="govuk-link" target="_blank" href="${config.get(
      'govukUrls.getHelpWithCourtFees'
    )}">get help paying this fee (opens in a new tab)</a>.`,
  },
});

const cy = ({ partner }: CommonContent, serviceFee: string) => ({
  title: `Your application will cost ${serviceFee}`,
  consentOrConsentNotRequired: {
    line1: `You have indicated that your ${partner} consents to your application, or consent is not needed. Therefore, your application will cost ${serviceFee}. You may be able to <a class="govuk-link" target="_blank" href="${config.get(
      'govukUrls.getHelpWithCourtFees'
    )}">get help paying this fee (opens in a new tab)</a>.`,
    line2: `If the judge decides that your evidence of consent is not strong enough, or that your ${partner}’s consent is needed, you may need to pay a higher fee. If this happens, we will contact you to let you know and will refund you this fee of ${serviceFee}.`,
  },
  noConsent: {
    line1: `Since your ${partner} does not consent to your application, your application will cost ${serviceFee}. You may be able to <a class="govuk-link" target="_blank" href="${config.get(
      'govukUrls.getHelpWithCourtFees'
    )}">get help paying this fee (opens in a new tab)</a>.`,
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const serviceFee =
    content.userCase.applicant1GenAppHearingNotRequired === GeneralApplicationHearingNotRequired.NO
      ? getFee(config.get('fees.generalAppWithHearing'))
      : getFee(config.get('fees.generalAppWithoutHearing'));
  const translations = languages[content.language](content, serviceFee);
  const showNoConsentContent =
    content.userCase.applicant1GenAppHearingNotRequired === GeneralApplicationHearingNotRequired.NO;
  return {
    ...translations,
    form,
    showNoConsentContent,
  };
};
