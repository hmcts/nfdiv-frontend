import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';

const en = () => ({
  title: 'Are you able to upload evidence?',
  statement: '',
  yes: 'Yes',
  no: 'No',
  errors: {
    applicant1InterimAppsCanUploadEvidence: {
      required: "Select 'Yes' if you have evidence to upload.",
    },
    applicant2InterimAppsCanUploadEvidence: {
      required: "Select 'Yes' if you have evidence to upload.",
    },
  },
});

const cy = () => ({
  title: 'A ydych yn gallu uwchlwytho tystiolaeth?',
  statement: '',
  yes: 'Ydw',
  no: 'Nac ydw',
  errors: {
    applicant1InterimAppsCanUploadEvidence: {
      required: "Dewiswch 'Ydw' os oes gennych dystiolaeth i’w huwchlwytho.",
    },
    applicant2InterimAppsCanUploadEvidence: {
      required: "Dewiswch 'Ydw' os oes gennych dystiolaeth i’w huwchlwytho.",
    },
  },
});

const languages = {
  en,
  cy,
};

const interimAppsCanUploadEvidenceField = () => ({
  type: 'radios',
  classes: 'govuk-radios',
  label: l => l.title,
  labelHidden: true,
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
});

export const applicant1Form: FormContent = {
  fields: {
    applicant1InterimAppsCanUploadEvidence: interimAppsCanUploadEvidenceField(),
  },
  submit: {
    text: l => l.continue,
  },
};

export const applicant2Form: FormContent = {
  ...applicant1Form,
  fields: {
    applicant2InterimAppsCanUploadEvidence: interimAppsCanUploadEvidenceField(),
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form: content.isApplicant2 ? applicant2Form : applicant1Form,
  };
};
