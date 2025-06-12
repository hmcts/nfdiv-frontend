import config from 'config';

import { NoResponsePartnerSendPapersAgainOrTrySomethingElse } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ isDivorce, required }: CommonContent) => ({
  title: `Would you like us to send the ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  } again or try something else?`,
  line1: `If you choose to try sending the ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  } again, we will send them to the same postal and email address as before. You can only try this once.`,
  line2: `Your partner will have ${config.get(
    'dates.interimApplicationNoResponseNewContactDetailsOffsetDays'
  )} days to respond.`,
  sendPapersAgain: `Send the ${isDivorce ? 'divorce papers' : 'papers to end your civil partnership'} again`,
  trySomethingElse: 'Try something else',
  errors: {
    applicant1NoResponsePartnerSendPapersAgainOrTrySomethingElse: {
      required,
    },
  },
});

// @TODO translations should be completed then verified
const cy: typeof en = en;

export const form: FormContent = {
  fields: {
    applicant1NoResponsePartnerSendPapersAgainOrTrySomethingElse: {
      type: 'radios',
      classes: 'govuk-radios',
      labelHidden: false,
      values: [
        {
          label: l => l.sendPapersAgain,
          id: 'sendPapersAgain',
          value: NoResponsePartnerSendPapersAgainOrTrySomethingElse.SEND_PAPERS_AGAIN,
        },
        {
          label: l => l.trySomethingElse,
          id: 'trySomethingElse',
          value: NoResponsePartnerSendPapersAgainOrTrySomethingElse.TRY_SOMETHING_ELSE,
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

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
