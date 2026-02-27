import { Applicant2Represented } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent } from '../../common/common.content';
import { InputLabelsByLanguage } from '../../common/input-labels.content';

const en = ({ isDivorce, partner }: CommonContent) => ({
  title: `Does your ${partner} have a solicitor representing them?`,
  line1: `The court only needs to know if your ${partner} has a solicitor who is representing them for
  ${isDivorce ? 'the divorce' : 'the process to end your civil partnership'}.
  You do not need to tell the court about a solicitor they use for other purposes.`,
  errors: {
    applicant1IsApplicant2Represented: {
      required: 'You have not answered the question. Select an answer before continuing.',
    },
  },
});

const cy: typeof en = ({ isDivorce, partner }: CommonContent) => ({
  title: `A oes gan eich ${partner} gyfreithiwr sy'n eu cynrychioli?`,
  line1: `Mae’r llys ond angen gwybod a oes gan eich ${partner} gyfreithiwr sy'n eu cynrychioli ar gyfer
  ${isDivorce ? 'yr ysgariad' : "y broses i ddod â'ch partneriaeth sifil i ben"}.
  Nid oes angen i chi ddweud wrth y llys am gyfreithiwr y maent yn ei ddefnyddio at ddibenion eraill.`,
  errors: {
    applicant1IsApplicant2Represented: {
      required: 'Nid ydych wedi ateb y cwestiwn. Dewiswch ateb cyn parhau.',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1IsApplicant2Represented: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      labelHidden: true,
      values: [
        { label: l => l[Applicant2Represented.YES], value: Applicant2Represented.YES },
        { label: l => l[Applicant2Represented.NO], value: Applicant2Represented.NO },
        { label: l => l[Applicant2Represented.NOT_SURE], value: Applicant2Represented.NOT_SURE },
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

export const radioButtonAnswers: InputLabelsByLanguage<Applicant2Represented> = {
  en: {
    [Applicant2Represented.YES]: 'Yes, they have a solicitor representing them',
    [Applicant2Represented.NO]: 'No, they do not have a solicitor representing them',
    [Applicant2Represented.NOT_SURE]: "I'm not sure",
  },
  cy: {
    [Applicant2Represented.YES]: "Oes, mae ganddynt gyfreithiwr sy'n eu cynrychioli",
    [Applicant2Represented.NO]: 'Na, nid oes ganddynt gyfreithiwr yn eu cynrychioli',
    [Applicant2Represented.NOT_SURE]: 'Dw i ddim yn siŵr',
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  const radioAnswers = radioButtonAnswers[content.language];
  return {
    ...translations,
    ...radioAnswers,
    form,
  };
};
