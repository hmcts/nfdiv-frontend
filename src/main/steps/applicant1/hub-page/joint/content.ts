import dayjs from 'dayjs';

import { YesOrNo } from '../../../../app/case/definition';
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
      line2: `If they do not apply by ${userCase.dueDate}
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
  awaitingLegalAdvisorReferral: {
    line1: `You and your ${partner} have applied for a 'conditional order'.`,
    line2: `The court will check your application and send it to a judge.
    If the judge agrees that you should ${isDivorce ? 'get a divorce' : 'end your civil partnership'},
    then they will grant your entitlement to a conditional order and then ‘pronounce’ it in court.
    You will receive an email by ${userCase.dueDate} after your application has been checked.
    This will have the time, date and court your conditional order will be pronounced.`,
  },
});

// @TODO translations
const cy: typeof en = en;

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const hasApplicantConfirmedReceipt = content.isApplicant2
    ? content.userCase.applicant2ConfirmReceipt === YesOrNo.YES
    : content.userCase.applicant1ConfirmReceipt === YesOrNo.YES;
  const hasApplicantAppliedForConditionalOrder = content.isApplicant2
    ? content.userCase.applicant2ApplyForConditionalOrderStarted === YesOrNo.YES
    : content.userCase.applicant1ApplyForConditionalOrderStarted === YesOrNo.YES;
  const partnerSubmissionOverdue = dayjs(content.userCase.dueDate).isBefore(dayjs());
  const isApplicant2 = content.isApplicant2;
  const applicantConfirmReceipt = isApplicant2 ? 'applicant2ConfirmReceipt' : 'applicant1ConfirmReceipt';
  const applicantApplyForConditionalOrderStarted = isApplicant2
    ? 'applicant2ApplyForConditionalOrderStarted'
    : 'applicant1ApplyForConditionalOrderStarted';
  return {
    ...languages[content.language](content),
    hasApplicantConfirmedReceipt,
    hasApplicantAppliedForConditionalOrder,
    partnerSubmissionOverdue,
    isApplicant2,
    applicantConfirmReceipt,
    applicantApplyForConditionalOrderStarted,
  };
};
