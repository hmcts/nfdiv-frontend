import { YesOrNo } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { commonContent } from '../../common/common.content';

export const generateContent: TranslationFn = ({ isDivorce }) => {
  const relationship = isDivorce ? 'marriage' : 'civil partnership';
  const en = {
    title: `Do you have a ‘certified translation’ of your ${relationship} certificate?`,
    line1: `You need to provide an English translation of your ${relationship} certificate. The translation also has to be <a href="https://www.gov.uk/certifying-a-document#certifying-a-translation" class="govuk-link">certified</a>.`,
    yes: 'Yes, I have a certified translation',
    no: 'No, I do not have a certified translation',
    errors: {
      certifiedTranslation: {
        required: commonContent.en.required,
      },
    },
  };

  const cy: typeof en = {
    ...en,
  };

  const common = {
    form,
  };

  return { en, cy, common };
};

export const form: FormContent = {
  fields: {
    certifiedTranslation: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      values: [
        { label: l => l.yes, value: YesOrNo.Yes },
        { label: l => l.no, value: YesOrNo.No },
      ],
      validator: value => isFieldFilledIn(value),
    },
  },
  submit: {
    text: l => l.continue,
  },
};
