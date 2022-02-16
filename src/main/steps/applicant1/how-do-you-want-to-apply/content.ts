import { ApplicationType } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent } from '../../common/common.content';

const en = ({ isDivorce, partner }: CommonContent) => ({
  title: `How do you want to apply ${isDivorce ? 'for the divorce?' : 'to end your civil partnership?'}`,
  line1: `You can apply ${
    isDivorce ? 'for the divorce' : 'to end your civil partnership'
  } on your own (as a ‘sole applicant’) or with your ${partner} (in a ‘joint application’).`,
  subHeading1: 'Applying as a sole applicant',
  line2: `If you apply as a sole applicant, your ${partner} responds to your ${
    isDivorce ? 'divorce application' : 'application to end your civil partnership'
  } after you have submitted it. You will be applying on your own.`,
  subHeading2: `Applying jointly, with your ${partner}`,
  line3: `If you apply jointly, your ${partner} joins and reviews this online application before it’s submitted. You will be applying together.`,
  line4:
    'How you divide your money and property is dealt with separately. It should not affect your decision on whether to do a sole or a joint application.',
  line5: `You have applied for Help With Fees. If you choose to do a joint application, then your ${partner} must also apply and be eligible for Help With Fees. If they are not eligible or do not apply, then you will be asked to pay the full application fee. In a sole application, only you needed to have applied.`,
  soleApplication: 'I want to apply on my own, as a sole applicant',
  jointApplication: `I want to apply jointly, with my ${partner}`,
  discussWithPartner: `You should have already discussed this with your ${partner}`,
  errors: {
    applicationType: {
      required: 'You have not answered the question. You need to select an answer before continuing.',
    },
  },
});

//TODO Translation
const cy = en;

export const form: FormContent = {
  fields: {
    applicationType: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      labelHidden: true,
      values: [
        { label: l => l.soleApplication, value: ApplicationType.SOLE_APPLICATION },
        {
          label: l => l.jointApplication,
          value: ApplicationType.JOINT_APPLICATION,
          conditionalText: l => `<p class="govuk-label">${l.discussWithPartner}</p>`,
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
  const hasAppliedForHWF = content.userCase.applicant1HelpWithFeesRefNo;
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
    hasAppliedForHWF,
  };
};
