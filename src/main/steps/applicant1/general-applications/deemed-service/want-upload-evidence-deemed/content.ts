import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ partner, isDivorce }: CommonContent) => ({
  title: 'Are you able to upload evidence?',
  line1: `Any evidence you can provide will help the court decide whether it is satisfied that your ${partner} has received the ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  }. For example, this could include a photo or screenshot of a recent conversation by text, email or social media.`,
});

// @TODO translations
const cy = ({ partner, isDivorce }: CommonContent) => ({
  title: 'Are you able to upload evidence?',
  line1: `Any evidence you can provide will help the court decide whether it is satisfied that your ${partner} has received the ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  }. For example, this could include a photo or screenshot of a recent conversation by text, email or social media.`,
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    applicant1DeemedCanUploadEvidence: {
      type: 'radios',
      classes: 'govuk-radios',
      values: [
        {
          label: l => l.yes,
          id: 'yes',
          value: YesOrNo.YES,
        },
        {
          label: l => l.no,
          id: 'no',
          value: YesOrNo.NO,
        },
      ],
      validator: value => isFieldFilledIn(value),
    },
  },
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
