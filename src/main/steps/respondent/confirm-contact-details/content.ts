import { ApplicationType, YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { generateContent as applicant2GenerateContent } from '../../applicant2/check-contact-details/content';
import { InputLabelsByLanguage } from '../../common/input-labels.content';

const en = ({ required }) => ({
  detailsCorrect: 'Are these details correct and up to date?',
  errors: {
    applicant1KnowsApplicant2Address: {
      required,
    },
  },
});

// @TODO translations
const cy = en;

export const form: FormContent = {
  fields: {
    applicant2ConfirmContactDetails: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.detailsCorrect,
      labelHidden: false,
      values: [
        { label: l => l[YesOrNo.YES], value: YesOrNo.YES },
        { label: l => l[YesOrNo.NO], value: YesOrNo.NO },
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

export const radioButtonAnswers: InputLabelsByLanguage<YesOrNo> = {
  en: {
    [YesOrNo.YES]: 'Yes, these details are up to date',
    [YesOrNo.NO]: 'No, I want to update my contact details',
  },
  cy: {
    [YesOrNo.YES]: 'Ydy, mae’r manylion hyn yn gyfredol',
    [YesOrNo.NO]: 'No, I want to update my contact details', //TODO Welsh translation required
  },
};

export const generateContent: TranslationFn = content => {
  const { language } = content;
  const applicant2Content = applicant2GenerateContent(content);
  const translations = languages[content.language](content);
  const prefixUrl =
    content.userCase?.applicationType === ApplicationType.SOLE_APPLICATION ? '/respondent' : '/applicant2';
  const radioAnswers = radioButtonAnswers[language];
  return {
    ...translations,
    prefixUrl,
    ...radioAnswers,
    ...applicant2Content,
    form,
  };
};
