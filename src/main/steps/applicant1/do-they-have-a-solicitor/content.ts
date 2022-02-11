import { Applicant2Represented } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent } from '../../common/common.content';

const en = ({ isDivorce, partner }: CommonContent) => ({
  title: `Does your ${partner} have a solicitor representing them?`,
  line1: `The court only needs to know if your ${partner} has a solicitor who is representing them for
  ${isDivorce ? 'the divorce' : 'the process to end your civil partnership'}.
  You do not need to tell the court about a solicitor they use for other purposes.`,
  yes: 'Yes, they have a solicitor representing them',
  no: 'No, they do not have a solicitor representing them',
  notSure: "I'm not sure",
  errors: {
    applicant1IsApplicant2Represented: {
      required: 'You have not answered the question. Select an answer before continuing.',
    },
  },
});

//TODO Translation
const cy = en;

export const form: FormContent = {
  fields: {
    applicant1IsApplicant2Represented: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      labelHidden: true,
      values: [
        { label: l => l.yes, value: Applicant2Represented.YES },
        { label: l => l.no, value: Applicant2Represented.NO },
        { label: l => l.notSure, value: Applicant2Represented.NOT_SURE },
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
