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
  conditionalOrderPending: {
    beforeDueDate: {
      line1: `You have applied for a conditional order. Your ${partner} also needs to apply
      because this is a joint application ${isDivorce ? 'for divorce' : 'to end your civil partnership'}.
      They have been sent an email to remind them.`,
      line2: `If they do not apply by ${userCase.dueDate || dayjs().format('D MMMM YYYY')}
      then you will be sent an email telling you how you can progress the application.`,
    },
    afterDueDate: {
      line1: `Your ${partner} has still not applied for a conditional order.
      They have to apply before your ${isDivorce ? 'divorce application' : 'application to end your civil partnership'}
      can progress. This is because you are doing a joint application.`,
      subHeading: 'What you can do',
      line2: `You should contact your ${partner} and ask them to apply. Only contact them if it’s safe to do so.`,
      line3: 'If you do not think they will apply then you can ',
      link: 'change your application to a sole application.',
    },
  },
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
  const hasApplicantAppliedForConditionalOrder = !(content.isApplicant2
    ? content.userCase.applicant2ApplyForConditionalOrderStarted !== YesOrNo.YES
    : content.userCase.applicant1ApplyForConditionalOrderStarted !== YesOrNo.YES);
  const partnerSubmissionOverdue = dayjs(content.userCase.dueDate).isBefore(dayjs());
  const isApplicant2 = content.isApplicant2;
  return {
    ...languages[content.language](content),
    progressionIndex,
    hasApplicantConfirmedReceipt,
    hasApplicantAppliedForConditionalOrder,
    partnerSubmissionOverdue,
    isApplicant2,
  };
};
