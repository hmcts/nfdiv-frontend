import { Checkbox } from '../../../../../app/case/case';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: `Is your ${partner}'s postal address in England or Wales?`,
  errors: {
    applicant1NoResponseRespondentAddressInEnglandWales: {
      required: `Select yes if your ${partner}'s postal address is in England or Wales`,
    },
  },
});

const cy = ({ partner }: CommonContent) => ({
  title: `Is your ${partner}'s postal address in England or Wales?`,
  errors: {
    applicant1NoResponseRespondentAddressInEnglandWales: {
      required: `Select yes if your ${partner}'s postal address is in England or Wales`,
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1NoResponseRespondentAddressInEnglandWales: {
      id: 'addressInEnglandOrWales',
      type: 'radios',
      classes: 'govuk-radios--inline',
      label: l => l.title,
      labelHidden: true,
      values: [
        { label: l => l.yes, value: Checkbox.Checked },
        { label: l => l.no, value: Checkbox.Unchecked },
      ],
      validator: value => ![Checkbox.Checked, Checkbox.Unchecked].includes(value as Checkbox) ? 'required' : undefined,
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

export const generateContent: TranslationFn = (content: CommonContent): Record<string, unknown> => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
