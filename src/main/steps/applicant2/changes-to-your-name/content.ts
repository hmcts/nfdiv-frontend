import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../app/form/Form';
import {
  form as applicant1Form,
  generateContent as applicant1GenerateContent,
} from '../../applicant1/changes-to-your-name/content';
import { CommonContent } from '../../common/common.content';

const labels = ({ required }: CommonContent) => {
  return {
    errors: {
      applicant2LastNameChangedWhenMarried: {
        required,
      },
      applicant2NameDifferentToMarriageCertificate: {
        required,
      },
    },
  };
};

export const form: FormContent = {
  ...applicant1Form,
  fields: {
    applicant2LastNameChangedWhenMarried: (applicant1Form.fields as FormFields).applicant1LastNameChangedWhenMarried,
    applicant2NameDifferentToMarriageCertificate: (applicant1Form.fields as FormFields)
      .applicant1NameDifferentToMarriageCertificate,
  },
};

export const generateContent: TranslationFn = content => {
  const applicant1Content = applicant1GenerateContent(content);
  return {
    ...applicant1Content,
    ...labels(content),
    form,
  };
};
