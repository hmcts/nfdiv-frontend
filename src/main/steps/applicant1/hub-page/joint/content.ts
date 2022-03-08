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
      line2: `If they do not apply by ${dayjs(userCase.coApplicant1SubmittedDate || userCase.coApplicant2SubmittedDate)
        .add(14, 'day')
        .format('D MMMM YYYY')} then you will be sent an email telling you how you can progress the application.`,
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
  awaitingLegalAdvisorReferral: {
    line1: `You and your ${partner} have applied for a 'conditional order'.`,
    line2: `The court will check your application and send it to a judge.
    If the judge agrees that you should ${isDivorce ? 'get a divorce' : 'end your civil partnership'},
    then they will grant your entitlement to a conditional order and then ‘pronounce’ it in court.
    You will receive an email by ${
      dayjs(userCase.coApplicant1SubmittedDate).isAfter(dayjs(userCase.coApplicant2SubmittedDate))
        ? dayjs(userCase.coApplicant1SubmittedDate).add(3, 'week').format('D MMMM YYYY')
        : dayjs(userCase.coApplicant2SubmittedDate).add(3, 'week').format('D MMMM YYYY')
    } after your application has been checked.
    This will have the time, date and court your conditional order will be pronounced.`,
  },
  subHeading1:
    userCase.coClarificationUploadDocuments || userCase.coClarificationResponses
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
    },
    withoutDocuments: {
      line1: `You or your ${partner} need to post the documents requested by the court:`,
      line2:
        '<strong>HMCTS Divorce and Dissolution Service</strong><br>' + 'PO Box 13226<br>' + 'HARLOW<br>' + 'CM20 9UG',
      line3: 'This is the feedback the court gave, which explains what documents you need to send:',
      line4: 'You will receive an update when your documents have been received and checked.',
    },
    clarificationAddInfo: `"${userCase.coRefusalClarificationAdditionalInfo}"`,
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
  const isClarificationResponsesOrDocumentsUploaded =
    content.userCase.coClarificationUploadDocuments?.length || content.userCase.coClarificationResponses?.length;
  const cannotUploadDocuments = content.userCase.coCannotUploadClarificationDocuments?.length;
  return {
    ...languages[content.language](content),
    hasApplicantConfirmedReceipt,
    hasApplicantAppliedForConditionalOrder,
    partnerSubmissionOverdue,
    isApplicant2,
    applicantConfirmReceipt,
    applicantApplyForConditionalOrderStarted,
    isClarificationResponsesOrDocumentsUploaded,
    cannotUploadDocuments,
  };
};
