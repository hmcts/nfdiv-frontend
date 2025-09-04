import { YesOrNoOrNotKnown } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import type { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: `Is your ${partner} currently resident in a refuge?`,
  errors: {
    applicant1BailiffPartnerInARefuge: {
      required: `Select yes if your ${partner} is resident in a refuge.`,
    },
  },
});

const cy: typeof en = ({ partner }: CommonContent) => ({
  title: `Ydych eich ${partner} yn preswylio mewn lloches ar hyn o bryd?`,
  errors: {
    applicant1BailiffPartnerInARefuge: {
      required: `Dewiswch “Ydy” os yw eich ${partner} yn byw mewn lloches`,
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1BailiffPartnerInARefuge: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      labelHidden: true,
      values: [
        { label: l => l.yes, value: YesOrNoOrNotKnown.YES, id: 'yes' },
        { label: l => l.no, value: YesOrNoOrNotKnown.NO, id: 'no' },
        { label: l => l.notKnown, value: YesOrNoOrNotKnown.NOT_KNOWN, id: 'notKnown' },
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
