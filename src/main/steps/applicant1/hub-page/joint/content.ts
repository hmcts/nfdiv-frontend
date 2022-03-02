import dayjs from 'dayjs';

import { State, YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import type { CommonContent } from '../../../common/common.content';

const en = ({ isDivorce, userCase, partner }: CommonContent) => ({
  applicationSubmittedLatestUpdate: {
    line1: `Your application ${isDivorce ? 'for divorce' : 'to end your civil partnership'} has been submitted
  and checked by court staff. It has been sent to you and your ${partner} by ${
      userCase.applicant1AgreeToReceiveEmails ? 'email' : 'post'
    }.`,
    line2: `You should confirm that you have received your application ${
      isDivorce ? 'for divorce' : 'to end your civil partnership'
    }.`,
  },
  applicantConfirmedReceiptLatestUpdate: {
    line1: `You have confirmed receipt of the ${
      isDivorce ? 'divorce application' : 'application to end your civil partnership'
    }.
     Your ${partner} should also confirm receipt, if they have not already done so.`,
    line2: `The next step is to apply for a 'conditional order'.
     A conditional order is a document that says the court does not see any reason why you cannot ${
       isDivorce ? 'get a divorce' : 'end your civil partnership'
     }.`,
    line3: `You can apply for a conditional order on ${userCase.dueDate}.
     This is because you have to wait until 20 weeks from when the ${
       isDivorce ? 'divorce application' : 'application to end your civil partnership'
     } was issued.
      You will receive an email to remind you.`,
  },
  confirmReceipt: 'Confirm receipt',
  applicantNotYetAppliedForConditionalOrder: `You can now apply for a ‘conditional order’.
  A conditional order is a document that says the court does not see any reason why you cannot
  ${isDivorce ? 'get a divorce' : 'end your civil partnership'}`,
  applyForConditionalOrder: 'Apply for conditional order',
  subHeading1:
    [State.ClarificationSubmitted, State.Holding].includes(userCase.state as State) &&
    userCase.coClarificationUploadDocuments
      ? 'Latest information'
      : 'What you need to do',
  clarificationSubmitted: {
    withDocuments: {
      line1: `You have provided the information requested by the court. You'll receive an email by ${dayjs(
        userCase.dateSubmitted
      )
        .add(16, 'days')
        .format('D MMMM YYYY')} after the court has reviewed it.`,
      line2: 'This was the court’s feedback, explaining the information which was needed:',
      line3: userCase.coRefusalClarificationAdditionalInfo,
    },
    withoutDocuments: {
      subHeading1: userCase.state === 'ClarificationSubmitted' ? 'What you need to do' : 'What you need to do',
      line1: `You or your ${partner} need to post the documents requested by the court:`,
      line2:
        '<strong>HMCTS Divorce and Dissolution Service</strong><br>' + 'PO Box 13226<br>' + 'HARLOW<br>' + 'CM20 9UG',
      line3: 'This is the feedback the court gave, which explains what documents you need to send:',
      line4: userCase.coRefusalClarificationAdditionalInfo,
      line5: 'You will receive an update when your documents have been received and checked.',
    },
  },
});

// @TODO translations
const cy: typeof en = en;

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const progressionIndex = [
    State.Holding,
    State.AwaitingConditionalOrder,
    State.ConditionalOrderDrafted,
    State.ConditionalOrderPending,
    State.AwaitingLegalAdvisorReferral,
    State.AwaitingPronouncement,
    State.ConditionalOrderPronounced,
    State.AwaitingFinalOrder,
    State.FinalOrderRequested,
    State.FinalOrderComplete,
    State.ClarificationSubmitted,
  ];
  const hasApplicantConfirmedReceipt = content.isApplicant2
    ? content.userCase.applicant2ConfirmReceipt === YesOrNo.YES
    : content.userCase.applicant1ConfirmReceipt === YesOrNo.YES;
  const hasApplicantNotYetAppliedForConditionalOrder = content.isApplicant2
    ? content.userCase.applicant2ApplyForConditionalOrderStarted !== YesOrNo.YES
    : content.userCase.applicant1ApplyForConditionalOrderStarted !== YesOrNo.YES;
  const isApplicant2 = content.isApplicant2;
  const isClarificationDocumentsUploaded = content.userCase.coClarificationUploadDocuments?.length;
  return {
    ...languages[content.language](content),
    progressionIndex,
    hasApplicantConfirmedReceipt,
    hasApplicantNotYetAppliedForConditionalOrder,
    isApplicant2,
    isClarificationDocumentsUploaded,
  };
};
