import { YesOrNo } from '../../app/case/definition';
import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';
import { isFieldFilledIn } from '../../app/form/validation';

const en = ({ isDivorce, required }) => ({
  title: 'Residual jurisdiction',
  line1: `Your answers indicate that the main grounds under which the courts of England and Wales have jurisdiction to consider your ${
    isDivorce ? 'divorce application' : 'application to end your civil partnership'
  } do not apply. However, you still may be able to apply ${
    isDivorce ? 'for a divorce' : 'to end your civil partnership'
  } in England or Wales based on the court’s ‘residual jurisdiction’.`,
  line2:
    'Residual jurisdiction can be more complex. If you’re not sure if it applies to you, you should seek legal advice.',
  jurisdictionResidualEligible: 'Are you eligible for residual jurisdiction?',
  errors: {
    jurisdictionResidualEligible: {
      required,
    },
  },
});

// @TODO translations
const cy: typeof en = en;

export const form: FormContent = {
  fields: {
    jurisdictionResidualEligible: {
      type: 'radios',
      classes: 'govuk-radios--inline',
      label: l => l.jurisdictionResidualEligible,
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
