import { Checkbox } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent } from '../../common/common.content';
import { generateContent as columnGenerateContent } from '../hub-page/right-column/content';

const en = ({ isDivorce, partner, userCase }: CommonContent) => ({
  title: `Do you want to ${isDivorce ? 'finalise your divorce' : 'end your civil partnership'}?`,
  line1: `Your ${
    isDivorce ? 'marriage' : 'civil partnership'
  } will be legally ended after the final order is made. This might affect your finances.`,
  warningText: `If you have not finished negotiations about your money, property or other assets then you should seek legal advice before finalising
  ${isDivorce ? 'your divorce' : 'ending your civil partnership'}`,
  readMore: {
    subHeader: `If you want to settle your finances before  ${
      isDivorce ? 'finalising your divorce' : 'ending your civil partnership'
    }`,
    line1: 'You should save and sign out and settle your finances before applying for a final order.',
    line2: `If you have not applied by ${userCase.dateFinalOrderEligibleToRespondent} then your ${partner} will be able to apply.
    You may both have to come to a court hearing, if they apply.`,
    line3: 'If you wait a year before applying then you will need to explain the delay to the court.',
  },
  checkboxLine: `I want to ${isDivorce ? 'finalise my divorce' : 'end my civil partnership'}`,
  errors: {
    doesApplicantWantToApplyForFinalOrder: {
      required:
        'You cannot continue without selecting the checkbox. If you do not want to continue then save and sign out.',
    },
  },
});

// @TODO translations
const cy: typeof en = en;

export const form: FormContent = {
  fields: {
    doesApplicantWantToApplyForFinalOrder: {
      type: 'checkboxes',
      label: l => l.confirmBeforeSubmit,
      labelSize: 'm',
      values: [
        {
          name: 'doesApplicantWantToApplyForFinalOrder',
          label: l => l.checkboxLine,
          value: Checkbox.Checked,
          validator: isFieldFilledIn,
        },
      ],
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
    ...columnGenerateContent(content),
    form,
  };
};
