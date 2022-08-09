import { Checkbox } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent } from '../../common/common.content';
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
  submit: 'submit',
  errors: {
    coApplicant1StatementOfTruth: {
      required:
        'You have not confirmed that you believe the facts in the application are true. You need to confirm before continuing.',
    },
  },
});

const cy = ({ isDivorce, partner, isJointApplication, required }: CommonContent) => ({
  title: `Ydych chi eisiau bwrw ymlaen â’ch${isDivorce ? 'ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'}
  ${isJointApplication ? ' ar y cyd' : ''}?`,
  line1: `Y cam nesaf yn y${
    isDivorce ? ' ysgaru' : ''
  } broses yw gwneud cais am ‘orchymyn amodol’. Mae gorchymyn amodol yn ddogfen sy'n dweud nad yw'r llys yn gweld unrhyw reswm pam na allwch ${
    isDivorce ? 'cael ysgariad' : "ddod â'ch partneriaeth sifil i ben"
  }.`,
  jointLine1: `Mae hwn yn gais ar y cyd, felly bydd yn rhaid i’ch ${partner} wneud cais hefyd. Anfonwyd e-bost ato/ati i'w (h)atgoffa.`,
  jointLine2: `Mae eich ${partner} eisoes wedi cadarnhau’r cais hwn ar y cyd.`,
  readMore: 'Darllenwch fwy am y camau nesaf',
  line2: 'Mae’n rhaid cwblhau 2 gam arall nes y byddwch wedi ysgaru’n gyfreithiol:',
  conditionalOrder: 'Gwneud cais am orchymyn amodol',
  conditionalOrderInfo: `Mae hyn yn dangos bod y llys yn cytuno bod gennych hawl i ${
    isDivorce ? 'gael ysgariad' : "ddod â'ch partneriaeth sifil i ben"
  }.`,
  finalOrder: 'Gwneud cais am orchymyn terfynol',
  finalOrderInfo: `Mae hyn yn dod â'r ${
    isDivorce ? 'briodas' : 'partneriaeth sifil'
  } i ben yn gyfreithiol. Ni allwch wneud cais am orchymyn terfynol tan 6 wythnos ar ôl y gorchymyn amodol.`,
  yes: `Rwyf eisiau bwrw ymlaen â’r ${isDivorce ? 'cais am ysgariad' : 'cais i ddod â’r bartneriaeth sifil i ben'}`,
  no: `Nid wyf eisiau bwrw ymlaen â’r ${isDivorce ? 'cais am ysgariad' : 'cais i ddod â’r bartneriaeth sifil i ben'}`,
  errors: {
    applicant1ApplyForConditionalOrder: { required },
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
    text: l => l.continue,
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
