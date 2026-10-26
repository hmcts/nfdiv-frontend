import { Checkbox } from '../../../../../app/case/case';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';
import { generateContent as generateInterruptionContent } from '../../common/interruption/content';

const en = ({ partner }: CommonContent) => ({
  title: `This application will be shared with your ${partner}`,
  errors: {
    applicant1GeneralApplicationAcknowledgementCheckbox: {
      required: "You must select 'I understand' before continuing.",
    },
  },
});

// @TODO translations
const cy = ({ partner }: CommonContent) => ({
  title: `This application will be shared with your ${partner}`,
  errors: {
    applicant1GeneralApplicationAcknowledgementCheckbox: {
      required: 'Rhaid i chi ddewis ‘Rwy’n deall’ cyn parhau',
    },
  },
});

const languages = { en, cy };

export const form: FormContent = {
  fields: {
    applicant1GeneralApplicationAcknowledgementCheckbox: {
      type: 'checkboxes',
      validator: isFieldFilledIn,
      values: [
        {
          name: 'applicant1GeneralApplicationAcknowledgementCheckbox',
          label: l => l.iUnderstand,
          value: Checkbox.Checked,
        },
      ],
    },
  },
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const interruptionContent = generateInterruptionContent(content);
  const translations = languages[content.language](content);
  return {
    ...interruptionContent,
    ...translations,
    form,
  };
};
