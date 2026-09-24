import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = ({ isDivorce, isJointApplication, partner }) => ({
  title: 'Do you have a help with fees reference number?',
  ...(isJointApplication && {
    line1: `Do not answer on behalf of your ${partner}. You both need to apply for help with fees separately because you are doing a joint application ${
      isDivorce ? 'for your divorce' : 'to end your civil partnership'
    }.`,
  }),
  errors: {
    applicant1AlreadyAppliedForHelpPaying: {
      required: "Select 'Yes' if you have a help with fees reference number.",
    },
  },
});

const cy: typeof en = ({ isDivorce, isJointApplication, partner }) => ({
  title: 'A oes gennych chi gyfeirnod Help i Dalu Ffioedd?',
  ...(isJointApplication && {
    line1: `Peidiwch ag ymateb ar ran eich ${partner}. Mae angen i chi'ch dau wneud cais am gymorth gyda ffioedd yn unigol oherwydd eich bod yn gwneud cais ar y cyd ${
      isDivorce ? 'ar gyfer eich ysgariad' : 'i ddod â’ch partneriaeth sifil i ben'
    }.`,
  }),
  errors: {
    applicant1AlreadyAppliedForHelpPaying: {
      required: "Dewiswch 'Oes' os oes gennych chi gyfeirnod help i dalu ffioedd.",
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1AlreadyAppliedForHelpPaying: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      labelHidden: true,
      values: [
        { label: l => l.yes, value: YesOrNo.YES },
        { label: l => l.no, value: YesOrNo.NO },
      ],
      validator: isFieldFilledIn,
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
