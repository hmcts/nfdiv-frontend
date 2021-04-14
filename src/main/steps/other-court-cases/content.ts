import { LegalProceedingsRelated, YesOrNo } from '../../app/case/definition';
import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn } from '../../app/form/validation';

const en = ({ isDivorce, partner, required }) => ({
  title: 'Other court cases',
  line1: `The court needs to know if there are any other legal proceedings related to your ${
    isDivorce ? 'marriage' : 'civil partnership'
  }, property or children. This includes any legal proceedings that are:`,
  point1: 'ongoing, finished or abandoned',
  point2: `between you and your ${partner}`,
  point3: `between you, your ${partner} and anyone else`,
  question: `Are there, or have there ever been, any other legal proceedings relating to your ${
    isDivorce ? 'marriage' : 'civil partnership'
  }, property or children?`,
  hint: 'Not including legal proceedings that may happen in the future.',
  subField: 'What do the legal proceedings relate to?',
  subFieldHint: 'Select all that apply',
  marriage: `Our ${isDivorce ? 'marriage' : 'civil partnership'}`,
  property: 'Our property',
  children: 'Our children',
  errors: {
    legalProceedings: {
      required,
    },
    legalProceedingsRelated: {
      required: 'You need to select what the proceedings relate to.',
    },
  },
});

//TODO Translation
const cy = en;

export const form: FormContent = {
  fields: {
    legalProceedings: {
      type: 'radios',
      classes: 'govuk-radios--inline',
      label: l => l.question,
      hint: l => l.hint,
      values: [
        {
          label: l => l.yes,
          value: YesOrNo.YES,
          subFields: {
            legalProceedingsRelated: {
              type: 'checkboxes',
              label: l => l.subField,
              hint: l => l.subFieldHint,
              validator: atLeastOneFieldIsChecked,
              values: [
                {
                  name: 'legalProceedingsRelated',
                  label: l => l.marriage,
                  value: LegalProceedingsRelated.MARRIAGE,
                },
                {
                  name: 'legalProceedingsRelated',
                  label: l => l.property,
                  value: LegalProceedingsRelated.PROPERTY,
                },
                {
                  name: 'legalProceedingsRelated',
                  label: l => l.children,
                  value: LegalProceedingsRelated.CHILDREN,
                },
              ],
            },
          },
        },
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
