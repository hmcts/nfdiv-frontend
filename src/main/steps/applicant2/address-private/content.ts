import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../app/form/Form';
import {
  form as applicant1Form,
  generateContent as applicant1GenerateContent,
} from '../../applicant1/address-private/content';
import { CommonContent } from '../../common/common.content';

const labels = ({ required }: CommonContent) => {
  return {
    errors: {
      applicant2AddressPrivate: { required },
    },
  };
};

const applicant1FormFields = applicant1Form.fields as FormFields;
export const form: FormContent = {
  ...applicant1Form,
  fields: {
    applicant2AddressPrivate: applicant1FormFields.applicant1AddressPrivate,
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
