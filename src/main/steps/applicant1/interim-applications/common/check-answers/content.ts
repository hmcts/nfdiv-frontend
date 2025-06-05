import { Checkbox } from '../../../../../app/case/case';
import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn, isInvalidHelpWithFeesRef } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = (usingHwf, { submit, continueToPay }: CommonContent) => ({
  title: 'Check your answers',
  noFilesUploaded: 'No files uploaded',
  notProvided: 'Not provided',
  havingTroubleUploading: "I'm having trouble uploading some or all of my documents",
  stepQuestions: {},
  stepAnswers: {},
  stepLinks: {},
  statementOfTruth: {
    title: 'Statement of truth',
    warning:
      'I understand that proceedings for contempt of court may be brought against anyone who makes, or causes to be made, a false statement in a document verified by a statement of truth without an honest belief in its truth.',
  },
  statementOfTruthLabel: 'I believe that the facts stated in this form and any continuation sheets are true.',
  submitText: usingHwf ? submit : continueToPay,
  errors: {
    applicant1InterimAppsStatementOfTruth: {
      required: 'You must agree to the statement of truth before continuing',
    },
  },
});

const cy: typeof en = (usingHwf, { submit, continueToPay }: CommonContent) => ({
  title: 'Check your answers',
  noFilesUploaded: 'No files uploaded',
  notProvided: 'Not provided',
  havingTroubleUploading: "I'm having trouble uploading some or all of my documents",
  stepQuestions: {},
  stepAnswers: {},
  stepLinks: {},
  statementOfTruth: {
    title: 'Statement of truth',
    warning:
      "I understand that proceedings for contempt of court may be brought against anyone who makes, or causes to be made, a false statement in a document verified by a statement of truth without an honest belief in it's truth.",
  },
  statementOfTruthLabel: 'I believe that the facts stated in this form and any continuation sheets are true.',
  submitText: usingHwf ? submit : continueToPay,
  errors: {
    applicant1InterimAppsStatementOfTruth: {
      required: 'You must agree to the statement of truth before continuing',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1InterimAppsStatementOfTruth: {
      type: 'checkboxes',
      label: l => l.statementOfTruthLabel,
      labelHidden: true,
      validator: value => isFieldFilledIn(value),
      values: [
        {
          name: 'applicant1InterimAppsStatementOfTruth',
          label: l => l.statementOfTruthLabel,
          value: Checkbox.Checked,
        },
      ],
    },
  },
  submit: {
    text: l => l.submitText,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const useHwf = content.userCase.applicant1InterimAppsUseHelpWithFees;
  const haveHwfReference = content.userCase.applicant1InterimAppsHaveHwfReference;
  const hwfReference = content.userCase.applicant1InterimAppsHwfRefNumber;
  const usingHwf =
    useHwf === YesOrNo.YES && haveHwfReference === YesOrNo.YES && isInvalidHelpWithFeesRef(hwfReference) === undefined;
  const translations = languages[content.language](usingHwf, content);
  return {
    ...translations,
    form,
  };
};
