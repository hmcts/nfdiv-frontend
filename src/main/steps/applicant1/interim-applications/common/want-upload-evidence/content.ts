import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';

const en = () => {
  const canUploadEvidenceErrors = {
    required: "Select 'Yes' if you have evidence to upload.",
  };

  return {
    title: 'Are you able to upload evidence?',
    statement: '',
    yes: 'Yes',
    no: 'No',
    errors: {
      applicant1InterimAppsCanUploadEvidence: canUploadEvidenceErrors,
      applicant2InterimAppsCanUploadEvidence: canUploadEvidenceErrors,
    },
  };
};

const cy = () => {
  const canUploadEvidenceErrors = {
    required: "Dewiswch 'Ydw' os oes gennych dystiolaeth i’w huwchlwytho.",
  };

  return {
    title: 'A ydych yn gallu uwchlwytho tystiolaeth?',
    statement: '',
    yes: 'Ydw',
    no: 'Nac ydw',
    errors: {
      applicant1InterimAppsCanUploadEvidence: canUploadEvidenceErrors,
      applicant2InterimAppsCanUploadEvidence: canUploadEvidenceErrors,
    },
  };
};

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

export const form: FormContent = {
  fields: {
    applicant1InterimAppsCanUploadEvidence: interimAppsCanUploadEvidenceField(),
  },
  submit: {
    text: l => l.continue,
  },
};

export const applicant2Form: FormContent = {
  ...form,
  fields: {
    applicant2InterimAppsCanUploadEvidence: interimAppsCanUploadEvidenceField(),
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form: content.isApplicant2 ? applicant2Form : form,
  };
};
