import config from 'config';
import dayjs from 'dayjs';

import { Checkbox } from '../../../../app/case/case';
import { State, YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import type { CommonContent } from '../../../common/common.content';
import { currentStateFn } from '../../../state-sequence';

import { getJointHubTemplate } from './jointTemplateSelector';

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
    line3: `You can apply for a conditional order on ${dayjs(userCase.issueDate)
      .add(config.get('dates.issueDateOffsetDays'), 'day')
      .format('D MMMM YYYY')}. This is because you have to wait until 20 weeks from when the ${
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
        .add(config.get('dates.jointConditionalOrderResponseDays'), 'day')
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
        ? dayjs(userCase.coApplicant1SubmittedDate)
            .add(config.get('dates.awaitingLegalAdvisorReferralOffsetDays'), 'day')
            .format('D MMMM YYYY')
        : dayjs(userCase.coApplicant2SubmittedDate)
            .add(config.get('dates.awaitingLegalAdvisorReferralOffsetDays'), 'day')
            .format('D MMMM YYYY')
    } after your application has been checked.
    This will have the time, date and court your conditional order will be pronounced.`,
  },
  conditionalOrderRejected: {
    heading1: 'CONDITIONAL ORDER REJECTED',
    line1: `The court is not yet satisfied you are entitled to ${
      isDivorce ? 'get divorced' : 'end your civil partnership'
    }. You need to read the court’s feedback and update your application, before you can continue.`,
    line2: 'The court’s feedback',
    line3: `${userCase.coRefusalRejectionAdditionalInfo}`,
    part1: 'You can download a copy of the court’s full',
    part2: 'Refusal Order PDF',
    downloadReference: 'Refusal-Order',
    link: '/downloads/conditional-order-refusal',
    line4: 'What you need to do',
    line5: 'You will need to change the application, and submit it to the court again.',
    line6:
      'You will receive a paper copy of the application in the post. It will include a letter with details of how to update the application and send it back to the court.',
    line7: `You will need to agree the changes with your ${partner} before sending it back to the court.`,
    line8: 'You will also need to pay a £95 amendment fee',
  },
  subHeading1:
    userCase.coClarificationUploadDocuments || userCase.coClarificationResponses
      ? 'Latest information'
      : 'What you need to do',
});

// @TODO translations
const cy: typeof en = ({ isDivorce, userCase, partner }: CommonContent) => ({
  applicationSubmittedLatestUpdate: {
    line1: `Mae eich cais ${
      isDivorce ? 'am ysgariad' : "i ddod â'ch partneriaeth sifil i ben"
    } wedi'i gyflwyno a'i wirio gan staff y llys. Fe'i anfonwyd atoch chi a'ch ${partner} ${
      userCase.applicant1AgreeToReceiveEmails ? 'drwy e-bost' : 'drwy’r post'
    }.`,
    line2: `Dylech gadarnhau eich bod wedi cael eich cais ${
      isDivorce ? 'am ysgariad' : "i ddod â'ch partneriaeth sifil i ben"
    }.`,
  },
  applicantConfirmedReceiptLatestUpdate: {
    line1: `Rydych wedi cadarnhau eich bod wedi cael y ${
      isDivorce ? 'cais am ysgariad' : "cais i ddod â'ch partneriaeth sifil i ben"
    }.
     Dylai eich ${partner} hefyd gadarnhau eu bod wedi’i gael, os nad ydynt eisoes wedi gwneud hynny.`,
    line2: `Y cam nesaf yw gwneud cais am 'orchymyn amodol'.
     Mae gorchymyn amodol yn ddogfen sy'n dweud nad yw'r llys yn gweld unrhyw reswm pam na allwch ${
       isDivorce ? 'gael ysgariad' : "ddod â'ch partneriaeth sifil i ben"
     }.`,
    line3: `Gallwch wneud cais am orchymyn amodol ar ${dayjs(userCase.issueDate)
      .add(config.get('dates.issueDateOffsetDays'), 'day')
      .format(
        'D MMMM YYYY'
      )}. Y rheswm dros hyn yw oherwydd bod rhaid i chi aros hyd nes i 20 wythnos fynd heibio o'r adeg y cyhoeddwyd y ${
      isDivorce ? 'cais am ysgariad' : "cais i ddod â'ch partneriaeth sifil i ben"
    }. Byddwch yn cael e-bost i'ch atgoffa.`,
  },
  confirmReceipt: 'Cadarnhau eich bod wedi cael eich cais',
  applicantNotYetAppliedForConditionalOrder: `Gallwch nawr wneud cais am 'orchymyn amodol'.
   Mae gorchymyn amodol yn ddogfen sy'n dweud nad yw'r llys yn gweld unrhyw reswm pam na allwch ${
     isDivorce ? 'gael ysgariad' : "ddod â'ch partneriaeth sifil i ben"
   }`,
  conditionalOrderPending: {
    beforeDueDate: {
      line1: `Rydych wedi gwneud cais am orchymyn amodol. Mae angen i'ch ${partner} awneud cais hefyd oherwydd bod hwn yn gais ar y cyd ${
        isDivorce ? 'am ysgariad' : "ddod â'ch partneriaeth sifil i ben"
      }.
      Anfonwyd e-bost ato/ati i'w (h)atgoffa.`,
      line2: `Os nad yw’n gwneud cais erbyn ${dayjs(
        userCase.coApplicant1SubmittedDate || userCase.coApplicant2SubmittedDate
      )
        .add(config.get('dates.jointConditionalOrderResponseDays'), 'day')
        .format('D MMMM YYYY')} yna fe anfonir e-bost atoch yn dweud wrthych sut y gallwch fwrw ymlaen â'r cais.`,
    },
    afterDueDate: {
      line1: `Nid yw eich ${partner} wedi gwneud cais am orchymyn amodol o hyd.
       Mae'n rhaid iddynt wneud cais cyn y gall eich ${
         isDivorce ? 'cais am ysgariad' : "cais i ddod â'ch partneriaeth sifil i ben"
       }
      symud ymlaen. Mae hyn oherwydd eich bod yn gwneud cais ar y cyd.`,
      subHeading: 'Beth allwch chi ei wneud',
      line2: `Dylech gysylltu â'ch ${partner} a gofyn iddynt wneud cais. Cysylltwch â nhw dim ond os yw'n ddiogel i chi wneud hynny.`,
      line3: 'Os nad ydych yn credu y byddant yn gwneud cais yna gallwch ',
      link: 'newid eich cais i fod yn gais unigol.',
    },
  },
  awaitingLegalAdvisorReferral: {
    line1: `Rydych chi a'ch ${partner} wedi gwneud cais am 'orchymyn amodol'.`,
    line2: `Bydd y llys yn gwirio'ch cais ac yn ei anfon at farnwr.
     Os bydd y barnwr yn cytuno y dylech ${isDivorce ? 'gael ysgariad' : "ddod â'ch partneriaeth sifil i ben"},
    yna bydd yn  caniatáu i chi gael gorchymyn amodol ac yna'n ei ‘gyhoeddi’ yn y llys. Byddwch yn cael e-bost erbyn ${
      dayjs(userCase.coApplicant1SubmittedDate).isAfter(dayjs(userCase.coApplicant2SubmittedDate))
        ? dayjs(userCase.coApplicant1SubmittedDate)
            .add(config.get('dates.awaitingLegalAdvisorReferralOffsetDays'), 'day')
            .format('D MMMM YYYY')
        : dayjs(userCase.coApplicant2SubmittedDate)
            .add(config.get('dates.awaitingLegalAdvisorReferralOffsetDays'), 'day')
            .format('D MMMM YYYY')
    } ar ôl i'ch cais gael ei wirio.
    Bydd yn cynnwys yr amser, y dyddiad a manylion y llys lle bydd eich gorchymyn amodol yn cael ei gyhoeddi.`,
  },
  conditionalOrderRejected: {
    heading1: 'CONDITIONAL ORDER REJECTED',
    line1: `The court is not yet satisfied you are entitled to ${
      isDivorce ? 'get divorced' : 'end your civil partnership'
    }. You need to read the court’s feedback and update your application, before you can continue.`,
    line2: 'The court’s feedback',
    line3: `${userCase.coRefusalRejectionAdditionalInfo}`,
    part1: 'You can download a copy of the court’s full',
    part2: 'Refusal Order PDF',
    downloadReference: 'Refusal-Order',
    link: '/downloads/conditional-order-refusal',
    line4: 'What you need to do',
    line5: 'You will need to change the application, and submit it to the court again.',
    line6:
      'You will receive a paper copy of the application in the post. It will include a letter with details of how to update the application and send it back to the court.',
    line7: `You will need to agree the changes with your ${partner} before sending it back to the court.`,
    line8: 'You will also need to pay a £95 amendment fee',
  },
  subHeading1:
    userCase.coClarificationUploadDocuments || userCase.coClarificationResponses
      ? 'Latest information'
      : 'What you need to do',
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const { userCase } = content;
  const isClarificationDocumentsUploaded = userCase.coCannotUploadClarificationDocuments !== Checkbox.Checked;
  const hasApplicantConfirmedReceipt = content.isApplicant2
    ? content.userCase.applicant2ConfirmReceipt === YesOrNo.YES
    : content.userCase.applicant1ConfirmReceipt === YesOrNo.YES;
  const isAwaitingAmendedApplication = State.AwaitingAmendedApplication;
  const hasApplicantAppliedForConditionalOrder = content.isApplicant2
    ? content.userCase.applicant2ApplyForConditionalOrderStarted === YesOrNo.YES
    : content.userCase.applicant1ApplyForConditionalOrderStarted === YesOrNo.YES;
  const partnerSubmissionOverdue = dayjs(content.userCase.dueDate).isBefore(dayjs());
  const isApplicant2 = content.isApplicant2;
  const applicantConfirmReceipt = isApplicant2 ? 'applicant2ConfirmReceipt' : 'applicant1ConfirmReceipt';
  const applicantApplyForConditionalOrderStarted = isApplicant2
    ? 'applicant2ApplyForConditionalOrderStarted'
    : 'applicant1ApplyForConditionalOrderStarted';
  const displayState = currentStateFn(content.userCase).at(
    (content.userCase.state === State.OfflineDocumentReceived
      ? content.userCase.previousState
      : content.userCase.state) as State
  );
  const theLatestUpdateTemplate = getJointHubTemplate(displayState, hasApplicantAppliedForConditionalOrder);
  return {
    ...languages[content.language](content),
    displayState,
    hasApplicantConfirmedReceipt,
    hasApplicantAppliedForConditionalOrder,
    partnerSubmissionOverdue,
    isApplicant2,
    applicantConfirmReceipt,
    applicantApplyForConditionalOrderStarted,
    theLatestUpdateTemplate,
    isClarificationDocumentsUploaded,
    isAwaitingAmendedApplication,
  };
};
