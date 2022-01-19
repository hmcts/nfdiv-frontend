import { State, YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import type { CommonContent } from '../../../common/common.content';

const en = ({ isDivorce, userCase, partner }: CommonContent) => ({
  applicationSubmittedLatestUpdate: {
    line1: `Your application ${isDivorce ? 'for divorce ' : 'to end your civil partnership'} has been submitted
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
  ];
  const hasApplicantConfirmedReceipt = content.isApplicant2
    ? content.userCase.applicant2ConfirmReceipt === YesOrNo.YES
    : content.userCase.applicant1ConfirmReceipt === YesOrNo.YES;
  const hasApplicantNotYetAppliedForConditionalOrder = content.isApplicant2
    ? content.userCase.applicant2ApplyForConditionalOrderStarted !== YesOrNo.YES
    : content.userCase.applicant1ApplyForConditionalOrderStarted !== YesOrNo.YES;
  const isApplicant2 = content.isApplicant2;
  return {
    ...languages[content.language](content),
    progressionIndex,
    hasApplicantConfirmedReceipt,
    hasApplicantNotYetAppliedForConditionalOrder,
    isApplicant2,
  };
};
