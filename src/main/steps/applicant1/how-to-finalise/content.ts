import { Checkbox } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent } from '../../common/common.content';

const en = ({ isDivorce, partner }: CommonContent) => ({
  title: `How to ${isDivorce ? 'finalise your divorce' : 'end your civil partnership'}`,
  line1: `The quickest way to ${
    isDivorce ? 'finalise your divorce' : 'end your civil partnership'
  } is to ask your ${partner} to confirm your joint application for a final order. They have been emailed details of how to do this.`,
  line2: `If they will not confirm then you can apply for a final order as a sole applicant. First your ${partner} needs to be given 2 week’s notice that you are intending to apply. This is so they are aware that the ${
    isDivorce ? 'marriage' : 'civil partnership'
  } is about to be legally ended.`,
  confirmIntendToSwitchToSoleFo: `I intend to apply for a final order as sole applicant and I want the court to notify my ${partner}`,
  errors: {
    applicant1IntendsToSwitchToSole: {
      required: 'You need to check this',
    },
  },
});

const cy: typeof en = ({ isDivorce, partner }: CommonContent) => ({
  title: `How to ${isDivorce ? 'finalise your divorce' : 'end your civil partnership'}`,
  line1: `The quickest way to ${
    isDivorce ? 'finalise your divorce' : 'end your civil partnership'
  } is to ask your ${partner} to confirm your joint application for a final order. They have been emailed details of how to do this.`,
  line2: `If they will not confirm then you can apply for a final order as a sole applicant. First your ${partner} needs to be given 2 week’s notice that you are intending to apply. This is so they are aware that the ${
    isDivorce ? 'marriage' : 'civil partnership'
  } is about to be legally ended.`,
  confirmIntendToSwitchToSoleFo: `I have read the application ${
    isDivorce ? 'for divorce' : 'to end our civil partnership'
  }`,
  errors: {
    applicant1IntendsToSwitchToSole: {
      required: 'You need to check this',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1IntendsToSwitchToSole: {
      type: 'checkboxes',
      labelHidden: true,
      values: [
        {
          name: 'applicant1IntendsToSwitchToSole',
          label: l => l.confirmIntendToSwitchToSoleFo,
          value: Checkbox.Checked,
          validator: isFieldFilledIn,
        },
      ],
    },
  },
  submit: {
    text: l => l.confirm,
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
