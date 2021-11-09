import { Case } from '../../../app/case/case';
import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { setUnreachableAnswers } from '../../../app/form/parser';
import { isFieldFilledIn } from '../../../app/form/validation';
import {
  form as applicant1Form,
  generateContent as applicant1GenerateContent,
} from '../../applicant1/other-court-cases/content';

const labels = content => ({
  errors: {
    applicant2LegalProceedings: content.errors.applicant1LegalProceedings,
  },
});

export const form: FormContent = {
  ...applicant1Form,
  fields: {
    applicant2LegalProceedings: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.question,
      hint: l => l.hint,
      values: [
        { label: l => l.yes, value: YesOrNo.YES },
        { label: l => l.no, value: YesOrNo.NO },
      ],
      parser: body =>
        setUnreachableAnswers((body as Partial<Case>).applicant2LegalProceedings === YesOrNo.YES, [
          'applicant2LegalProceedingsDetails',
        ]),
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
