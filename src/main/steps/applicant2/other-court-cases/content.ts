import { LegalProceedingsRelated, YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn } from '../../../app/form/validation';
import {
  form as applicant1Form,
  generateContent as applicant1GenerateContent,
} from '../../applicant1/enter-your-name/content';

const labels = content => ({
  errors: {
    applicant2LegalProceedings: content.errors.applicant1LegalProceedings,
    applicant2LegalProceedingsRelated: content.errors.applicant1LegalProceedingsRelated,
  },
});

export const form: FormContent = {
  ...applicant1Form,
  fields: {
    applicant2LegalProceedings: {
      type: 'radios',
      classes: 'govuk-radios--inline',
      label: l => l.question,
      hint: l => l.hint,
      values: [
        {
          label: l => l.yes,
          value: YesOrNo.YES,
          subFields: {
            applicant2LegalProceedingsRelated: {
              type: 'checkboxes',
              label: l => l.subField,
              hint: l => l.subFieldHint,
              validator: atLeastOneFieldIsChecked,
              values: [
                {
                  name: 'applicant2LegalProceedingsRelated',
                  label: l => l.partnership,
                  value: LegalProceedingsRelated.MARRIAGE,
                },
                {
                  name: 'applicant2LegalProceedingsRelated',
                  label: l => l.property,
                  value: LegalProceedingsRelated.PROPERTY,
                },
                {
                  name: 'applicant2LegalProceedingsRelated',
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
};

export const generateContent: TranslationFn = content => {
  const applicant1Content = applicant1GenerateContent(content);
  return {
    ...applicant1Content,
    ...labels(applicant1Content),
    form,
  };
};
