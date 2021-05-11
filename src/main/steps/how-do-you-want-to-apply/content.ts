import { YesOrNo } from '../../app/case/definition';
import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';
import { isFieldFilledIn } from '../../app/form/validation';
import { CommonContent } from '../common/common.content';

const en = ({ isDivorce, partner }: CommonContent) => ({
  title: `How do you want to apply ${isDivorce ? 'for the divorce?' : 'to end your civil partnership?'}`,
  line1: `You can apply ${
    isDivorce ? 'for the divorce?' : 'to end your civil partnership?'
  } on your own (as a ‘sole applicant’) or with your ${partner} (in a ‘joint application’).`,
  subHeading1: 'Applying as a sole applicant',
  line2: `If you apply as a sole applicant, your ${partner} responds to your ${
    isDivorce ? 'divorce application' : 'application to end your civil partnership'
  } after you have submitted it. You will be applying on your own.`,
  subHeading2: `Applying jointly, with your ${partner}`,
  line3: `If you apply jointly, your ${partner} joins and reviews this online application before it’s submitted. You will be applying together.`,
  line4:
    'How you divide your money and property is dealt with separately. It should not affect your decision on whether to do a sole or a joint application.',
  line5: `Who pays the ${
    isDivorce ? 'divorce fee' : 'fee to end your civil partnership'
  } and claiming help paying the fee is different in a sole and joint application.`,
  readMore: 'Find out more about paying the fees.',
  helpText1: `This ${
    isDivorce ? 'divorce application' : 'application to end your civil partnership'
  } costs £550. In a sole application, the applicant has to pay the fee. In a joint application, either applicant can pay.`,
  helpText2: 'Help can be claimed to pay the fee, if the applicant(s) are: ',
  bulletpoint1: 'are on certain benefits or ',
  bulletpoint2: 'have a little or no savings or  ',
  bulletpoint3: 'have low income ',
  helpText3:
    'In a sole application, only the applicant has to be eligible for help with fees. In a joint application, both applicants have to be eligible.',
  yes: 'I want to apply on my own, as a sole applicant',
  no: `I want to apply jointly, with my ${partner}`,
  errors: {
    screenSoleOrJoint: {
      required: 'You have not answered the question. You need to select an answer before continuing.',
    },
  },
});

//TODO Translation
const cy = en;

export const form: FormContent = {
  fields: {
    screenSoleOrJoint: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      labelHidden: true,
      values: [
        { label: l => l.yes, value: YesOrNo.YES },
        { label: l => l.no, value: YesOrNo.NO },
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
