import config from 'config';

import { NoResponseProvidePartnerNewEmailOrAlternativeService } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { getFee } from '../../../../../app/fees/service/get-fee';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ isDivorce, partner }: CommonContent) => ({
  title: `Update your ${partner}'s email address`,
  line1: `You can update your ${partner}'s email address. We will send the ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  } by email to this new email address, and by post to the postal address you have previously provided. This will be done for no additional cost.`,
  line2: `Alternatively, you can apply to serve the ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  } by email only (without posting them). This will mean completing an application for alternative service, which will cost ${getFee(
    config.get('fees.alternativeService')
  )}. You will also need to prove that the email address you want to serve to is actively being used by your ${partner}.`,
  newEmailHeader: 'What do you want to do?',
  provideNewEmail: 'I want to provide a new email address',
  applyForAlternativeService: 'I want to apply for alternative service to serve by email only',
});

// @TODO translations should be verified once provided
const cy: typeof en = en;

export const form: FormContent = {
  fields: {
    applicant1NoResponseProvideNewEmailOrApplyForAlternativeService: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.newEmailHeader,
      labelHidden: false,
      values: [
        {
          label: l => l.provideNewEmail,
          id: 'provideNewEmail',
          value: NoResponseProvidePartnerNewEmailOrAlternativeService.PROVIDE_NEW_EMAIL,
        },
        {
          label: l => l.applyForAlternativeService,
          id: 'applyForAlternativeService',
          value: NoResponseProvidePartnerNewEmailOrAlternativeService.APPLY_FOR_ALTERNATIVE_SERVICE,
        },
      ],
      validator: value => isFieldFilledIn(value),
    },
  },
  submit: {
    text: l => l.continue,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = (content: CommonContent): Record<string, unknown> => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
