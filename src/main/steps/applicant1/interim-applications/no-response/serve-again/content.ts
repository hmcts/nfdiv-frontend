import config from 'config';

import { NoResponseSendPapersAgainOrTrySomethingElse } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ isDivorce, partner, required }: CommonContent) => ({
  title: `Would you like us to send the ${
    isDivorce ? 'divorce' : 'application to end your civil partnership'
  } papers again or try something else?`,
  line1: `If you choose to try sending the ${
    isDivorce ? 'divorce' : 'application to end your civil partnership'
  } papers again, we will send them to the same postal and email address as before. You can only try this once.`,
  line2: `Your ${partner} will have ${config.get(
    'dates.interimApplicationNoResponseNewContactDetailsOffsetDays'
  )} days to respond.`,
  sendPapersAgain: `Send the ${isDivorce ? 'divorce' : 'application to end your civil partnership'} papers again`,
  trySomethingElse: 'Try something else',
  errors: {
    applicant1NoResponseSendPapersAgainOrTrySomethingElse: {
      required,
    },
  },
});

// @TODO translations should be completed then verified
const cy: typeof en = ({ isDivorce, partner, required }: CommonContent) => ({
  title: `A hoffech i ni anfon papurau’r ${
    isDivorce ? 'ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
  } eto neu a hoffech geisio gwneud rhywbeth arall?`,
  line1: `Os byddwch yn dewis ceisio anfon papurau’r ${
    isDivorce ? 'ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
  } eto, byddwn yn eu hanfon i’r un cyfeiriad post a chyfeiriad e-bost ac o’r blaen. Gallwch ond geisio gwneud hyn unwaith.`,
  line2: `Bydd gan eich ${partner} ${config.get(
    'dates.interimApplicationNoResponseNewContactDetailsOffsetDays'
  )} diwrnod i ymateb.`,
  sendPapersAgain: `Anfon papurau’r ${isDivorce ? 'ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'} eto`,
  trySomethingElse: 'Ceisio gwneud rhywbeth arall',
  errors: {
    applicant1NoResponseSendPapersAgainOrTrySomethingElse: {
      required: 'Select if you want to send the papers again or try something else',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1NoResponseSendPapersAgainOrTrySomethingElse: {
      type: 'radios',
      classes: 'govuk-radios',
      labelHidden: false,
      values: [
        {
          label: l => l.sendPapersAgain,
          id: 'sendPapersAgain',
          value: NoResponseSendPapersAgainOrTrySomethingElse.SEND_PAPERS_AGAIN,
        },
        {
          label: l => l.trySomethingElse,
          id: 'trySomethingElse',
          value: NoResponseSendPapersAgainOrTrySomethingElse.TRY_SOMETHING_ELSE,
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
