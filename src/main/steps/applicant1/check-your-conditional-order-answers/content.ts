import { Checkbox } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent } from '../../common/common.content';
import { DISABLE_UPON_SUBMIT } from '../../common/content.utils';
import { isConditionalOrderReadyToSubmit } from '../../index';
import * as urls from '../../urls';

const en = ({ isJointApplication, isDivorce, userCase, isApplicant2 }: CommonContent) => ({
  title: 'Check your answers',
  titleSoFar: 'Check your answers so far',
  confirm: 'Confirm before submitting',
  stepQuestions: {
    continueApplication: `Do you want to continue with your${isJointApplication ? ' joint' : ''} ${
      isDivorce ? 'divorce' : 'application to end your civil partnership'
    }?`,
    isInformationCorrect: 'Is the information in this application still correct?',
    changeDetails: 'Details that need updating:',
  },
  stepAnswers: {
    continueApplication: `${
      isApplicant2 ? userCase.applicant2ApplyForConditionalOrder : userCase.applicant1ApplyForConditionalOrder
    }`,
    isInformationCorrect: `${
      isApplicant2
        ? userCase.applicant2ConfirmInformationStillCorrect
        : userCase.applicant1ConfirmInformationStillCorrect
    }`,
    changeDetails: `${
      isApplicant2 ? userCase.applicant2ReasonInformationNotCorrect : userCase.applicant1ReasonInformationNotCorrect
    }`,
  },
  stepLinks: {
    continueApplication: `${isApplicant2 ? '/applicant2' : ''}${urls.CONTINUE_WITH_YOUR_APPLICATION}`,
    isInformationCorrect: `${isApplicant2 ? '/applicant2' : ''}${
      isJointApplication ? urls.REVIEW_YOUR_JOINT_APPLICATION : urls.REVIEW_YOUR_APPLICATION
    }`,
    changeDetails: `${isApplicant2 ? '/applicant2' : ''}${
      isJointApplication ? urls.REVIEW_YOUR_JOINT_APPLICATION : urls.REVIEW_YOUR_APPLICATION
    }`,
  },
  confirmApplicationIsTrue: 'I believe that the facts stated in this application are true',
  confirmApplicationIsTrueHint:
    '<p class="govuk-body govuk-!-margin-top-4 govuk-!-margin-bottom-0">This confirms that the information you are submitting is true and accurate, to the best of your knowledge. It’s known as your ‘statement of truth’.</p>',
  confirmApplicationIsTrueWarning:
    'Proceedings for contempt of court may be brought against anyone who makes, or causes to be made, a false statement verified by a statement of truth without an honest belief in its truth.',
  continueApplication: 'Continue application',
  errors: {
    coApplicant1StatementOfTruth: {
      required:
        'You have not confirmed that you believe the facts in the application are true. You need to confirm before continuing.',
    },
  },
});

const cy: typeof en = ({ isJointApplication, isDivorce, userCase, isApplicant2 }: CommonContent) => ({
  title: 'Gwiriwch eich atebion',
  titleSoFar: 'Gwiriwch eich atebion hyd yma',
  confirm: 'Cadarnhau cyn cyflwyno',
  stepQuestions: {
    continueApplication: `Ydych chi eisiau bwrw ymlaen â’ch ${
      isDivorce ? 'ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
    } ${isJointApplication ? ' ar y cyd' : ''}?`,
    isInformationCorrect: 'A yw’r wybodaeth yn y cais hwn dal yn gywir?',
    changeDetails: 'Manylion sydd angen cael ei ddiweddaru:',
  },
  stepAnswers: {
    continueApplication: `${
      isApplicant2 ? userCase.applicant2ApplyForConditionalOrder : userCase.applicant1ApplyForConditionalOrder
    }`,
    isInformationCorrect: `${
      isApplicant2
        ? userCase.applicant2ConfirmInformationStillCorrect
        : userCase.applicant1ConfirmInformationStillCorrect
    }`,
    changeDetails: `${
      isApplicant2 ? userCase.applicant2ReasonInformationNotCorrect : userCase.applicant1ReasonInformationNotCorrect
    }`,
  },
  stepLinks: {
    continueApplication: `${isApplicant2 ? '/applicant2' : ''}${urls.CONTINUE_WITH_YOUR_APPLICATION}`,
    isInformationCorrect: `${isApplicant2 ? '/applicant2' : ''}${
      isJointApplication ? urls.REVIEW_YOUR_JOINT_APPLICATION : urls.REVIEW_YOUR_APPLICATION
    }`,
    changeDetails: `${isApplicant2 ? '/applicant2' : ''}${
      isJointApplication ? urls.REVIEW_YOUR_JOINT_APPLICATION : urls.REVIEW_YOUR_APPLICATION
    }`,
  },
  confirmApplicationIsTrue: 'Credaf fod y ffeithiau a nodir yn y cais hwn yn wir',
  confirmApplicationIsTrueHint:
    '<p class="govuk-body govuk-!-margin-top-4 govuk-!-margin-bottom-0">Mae hyn yn cadarnhau bod yr wybodaeth rydych yn ei chyflwyno yn wir ac yn gywir hyd at eithaf eich gwybodaeth. Gelwir hyn yn eich ‘datganiad gwirionedd’.</p>',
  confirmApplicationIsTrueWarning:
    'Gellir dwyn achos dirmyg llys yn erbyn unrhyw un sy’n gwneud datganiad anwir, neu sy’n achosi i ddatganiad anwir gael ei wneud mewn dogfen a ddilysir gan ddatganiad gwirionedd heb gredu’n onest ei fod yn wir.',
  continueApplication: 'Parhau gyda’r cais',
  errors: {
    coApplicant1StatementOfTruth: {
      required:
        'Nid ydych wedi cadarnhau eich bod yn credu bod y ffeithiau yn y cais yn wir. Mae angen ichi gadarnhau cyn parhau.',
    },
  },
});

export const form: FormContent = {
  fields: {
    coApplicant1StatementOfTruth: {
      type: 'checkboxes',
      label: l => l.confirmBeforeSubmit,
      labelSize: 'm',
      values: [
        {
          name: 'coApplicant1StatementOfTruth',
          label: l => l.confirmApplicationIsTrue,
          hint: l => l.confirmApplicationIsTrueHint,
          value: Checkbox.Checked,
          validator: isFieldFilledIn,
        },
      ],
    },
  },
  submit: {
    text: l => l.submit,
    classes: DISABLE_UPON_SUBMIT,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translation = languages[content.language](content);
  const applicantApplyForConditionalOrder = content.isApplicant2
    ? content.userCase.applicant2ApplyForConditionalOrder
    : content.userCase.applicant1ApplyForConditionalOrder;
  return {
    isConditionalOrderReadyToSubmit,
    applicantApplyForConditionalOrder,
    ...translation,
    form,
  };
};
