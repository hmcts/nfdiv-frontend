import config from 'config';
import dayjs from 'dayjs';

import { getFormattedDate } from '../../../../app/case/answers/formatDate';
import { CaseWithId, Checkbox } from '../../../../app/case/case';
import { DocumentType, State, YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { SupportedLanguages } from '../../../../modules/i18n';
import type { CommonContent } from '../../../common/common.content';
import { canIntendToSwitchToSoleFo, hasApplicantAppliedForFoFirst } from '../../../common/content.utils';
import { getSwitchToSoleFoStatus } from '../../../common/switch-to-sole-content.utils';
import { currentStateFn } from '../../../state-sequence';
import {
  APPLICANT_2,
  FINALISING_YOUR_APPLICATION,
  HOW_TO_FINALISE_APPLICATION,
  RESPOND_TO_COURT_FEEDBACK,
} from '../../../urls';

import { getJointHubTemplate } from './jointTemplateSelector';

const hubPageSubheading = (
  userCase: Partial<CaseWithId>,
  language: SupportedLanguages = SupportedLanguages.En
): string => {
  if (userCase.state === State.AwaitingAmendedApplication) {
    return language === SupportedLanguages.En ? 'Latest information' : 'Yr wybodaeth ddiweddaraf';
  } else if (
    userCase.coClarificationUploadDocuments ||
    userCase.coClarificationResponses ||
    userCase.state === State.AwaitingFinalOrder
  ) {
    return language === SupportedLanguages.En ? 'Latest update' : 'Diweddariad diweddaraf';
  } else {
    return language === SupportedLanguages.En ? 'What you need to do' : 'Beth sydd angen i chi ei wneud';
  }
};

const en = (
  {
    applicationHasBeenPaidFor,
    isDivorce,
    userCase,
    partner,
    isApplicant2,
    referenceNumber,
    telephoneNumber,
  }: CommonContent,
  dateOfCourtReplyToRequestForInformationResponse: string
) => ({
  subHeading1: hubPageSubheading(userCase),
  applicationSubmittedLatestUpdate: {
    line1:
      userCase.state === State.AwaitingHWFEvidence
        ? 'Your joint application will be checked by court staff. You will receive an email notification confirming whether it has been accepted. Check your junk or spam email folder.'
        : `Your joint application ${
            userCase.applicant1AlreadyAppliedForHelpPaying === YesOrNo.YES &&
            userCase.applicant2AlreadyAppliedForHelpPaying === YesOrNo.YES &&
            !applicationHasBeenPaidFor
              ? 'and help with fees reference number '
              : ''
          } will be checked by court staff. You will receive an email notification by ${getFormattedDate(
            dayjs(userCase.dateSubmitted).add(config.get('dates.applicationSubmittedOffsetDays'), 'day')
          )} confirming whether it has been accepted. Check your junk or spam email folder.`,
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
    line3: `You can apply for a conditional order on ${getFormattedDate(
      dayjs(userCase.issueDate).add(config.get('dates.issueDateOffsetDays'), 'day')
    )}. This is because you have to wait until 20 weeks from when the ${
      isDivorce ? 'divorce application' : 'application to end your civil partnership'
    } was issued.
      You will receive an email to remind you.`,
  },
  confirmReceipt: 'Confirm receipt',
  applicantNotYetAppliedForConditionalOrder: `You can now apply for a ‘conditional order’.
  A conditional order is a document that says the court does not see any reason why you cannot
  ${isDivorce ? 'get a divorce' : 'end your civil partnership'}.`,
  conditionalOrderPending: {
    beforeDueDate: {
      line1: `You have applied for a conditional order. Your ${partner} also needs to apply
      because this is a joint application ${isDivorce ? 'for divorce' : 'to end your civil partnership'}.
      They have been sent an email to remind them.`,
      line2: `If they do not apply by ${getFormattedDate(
        dayjs(userCase.coApplicant1SubmittedDate || userCase.coApplicant2SubmittedDate).add(
          config.get('dates.changingToSolePartnerResponseDays'),
          'day'
        )
      )} then you will be sent an email telling you how you can progress the application.`,
    },
    afterDueDate: {
      line1: `Your ${partner} has still not applied for a conditional order.
      They have to apply before your ${isDivorce ? 'divorce application' : 'application to end your civil partnership'}
      can progress. This is because you are doing a joint application.`,
      subHeading: 'What you can do',
      line2: `You should contact your ${partner} and ask them to apply. Only contact them if it’s safe to do so.`,
      line3: 'If you do not think they will apply then you can ',
      link: `${isApplicant2 ? '/applicant2' : ''}/changing-to-a-sole-application`,
      linkText: 'change your application to a sole application.',
    },
  },
  awaitingLegalAdvisorReferral: {
    line1: `You and your ${partner} have applied for a 'conditional order'.`,
    line2: `The court will check your application and send it to a judge.
    If the judge agrees that you should ${isDivorce ? 'get a divorce' : 'end your civil partnership'},
    then they will grant your entitlement to a conditional order and then ‘pronounce’ it in court.
    You will receive an email by ${getFormattedDate(
      dayjs(userCase.coApplicant1SubmittedDate).isAfter(dayjs(userCase.coApplicant2SubmittedDate))
        ? dayjs(userCase.coApplicant1SubmittedDate).add(
            config.get('dates.awaitingLegalAdvisorReferralOffsetDays'),
            'day'
          )
        : dayjs(userCase.coApplicant2SubmittedDate).add(
            config.get('dates.awaitingLegalAdvisorReferralOffsetDays'),
            'day'
          )
    )} after your application has been checked.
    This will have the time, date and court your conditional order will be pronounced.`,
  },
  awaitingFinalOrder: {
    line1: `You can now apply for a ‘final order’. A final order is the document that will legally end your ${
      isDivorce ? 'marriage' : 'civil partnership'
    }.
    It’s the final step in the ${isDivorce ? 'divorce process' : 'process to end your civil partnership'}.`,
    buttonText: 'Apply for final order',
    buttonLink: `${isApplicant2 ? `${APPLICANT_2}${FINALISING_YOUR_APPLICATION}` : FINALISING_YOUR_APPLICATION}`,
  },
  awaitingJointFinalOrderOrFinalOrderOverdue: {
    line1: `Your ${partner} has not yet applied for a final order. They also have to apply so your ${
      isDivorce ? 'divorce application' : 'application to end your civil partnership'
    } can be finalised jointly.`,
    subHeading: 'What you can do',
    line2: `You should contact your ${partner} and ask them to apply, if it’s safe to do so.`,
    line3: `If you do not think they will confirm the application then you can ${
      isDivorce ? 'finalise your divorce' : 'end your civil partnership'
    }`,
    link: `${isApplicant2 ? `${APPLICANT_2}${HOW_TO_FINALISE_APPLICATION}` : HOW_TO_FINALISE_APPLICATION}`,
    linkText: ' as a sole applicant.',
  },
  hasAppliedForFinalOrder: {
    line1: `You have applied for a ‘final order’. Your ${partner} also has to apply because this is a joint application. They have been sent an email reminder.`,
    line2: `If they do not apply by ${getFormattedDate(
      dayjs(userCase.dateFinalOrderSubmitted).add(config.get('dates.finalOrderSubmittedOffsetDays'), 'day')
    )} then you will be sent an email telling you how you can ${
      isDivorce ? 'finalise your divorce' : 'end your civil partnership'
    }.`,
  },
  finalOrderRequested: {
    line1: `You and your ${partner} have both confirmed you want to ${
      isDivorce ? 'finalise the divorce' : 'end your civil partnership'
    }. Your application will be checked by court staff. If there are no other applications that need to be completed then your ${
      isDivorce ? 'divorce will be finalised' : 'civil partnership will be legally ended'
    }.`,
    line2:
      userCase.isFinalOrderOverdue === YesOrNo.YES
        ? 'You will receive an email confirming whether it has been granted once a Judge has made a decision.'
        : 'You should receive an email within 2 working days, confirming whether the final order has been granted.',
  },
  finalOrderComplete: {},
  intendToSwitchToSoleFinalOrder: {
    line1: `The court has notified your ${partner} by email that you are intending to apply for a final order as a sole applicant.`,
    line2: `You will be able to apply for a final order from ${getFormattedDate(
      dayjs(
        isApplicant2
          ? userCase.dateApplicant2DeclaredIntentionToSwitchToSoleFo
          : userCase.dateApplicant1DeclaredIntentionToSwitchToSoleFo
      ).add(config.get('dates.switchToSoleFinalOrderIntentionNotificationOffsetDays'), 'day')
    )}. You will receive an email to remind you.`,
  },
  intendingAndAbleToSwitchToSoleFinalOrder: {
    line1: `You can now apply for a ‘final order’ as a sole applicant. If it’s granted then your ${
      isDivorce ? 'marriage' : 'civil partnership'
    } will be legally ended.`,
  },
  pendingHearingOutcome: {
    line1:
      "Your application is with the court and will be referred to a judge to consider your request. You should hear back from the court about the judge's decision.",
  },
  sendDocumentLine1: 'Your application will not be processed until you have done the following:',
  sendDocumentHeading: 'Send your documents to the court',
  line2: 'You need to send the following documents to the court because you did not upload them earlier:',
  documents: {
    [DocumentType.MARRIAGE_CERTIFICATE]:
      userCase.inTheUk === YesOrNo.NO
        ? `Your original foreign ${isDivorce ? 'marriage' : 'civil partnership'} certificate`
        : `Your original ${isDivorce ? 'marriage' : 'civil partnership'} certificate or a certified copy`,
    [DocumentType.MARRIAGE_CERTIFICATE_TRANSLATION]: `A certified translation of your foreign ${
      isDivorce ? 'marriage' : 'civil partnership'
    } certificate`,
    [DocumentType.NAME_CHANGE_EVIDENCE]:
      'Proof that you changed your name. For example, deed poll or statutory declaration.',
  },
  documentsByOnlineForm: 'Sending documents using our online form',
  documentsByOnlineFormSteps: {
    line1: 'You can send photographs or scans of your documents to us by',
    line2: 'uploading them using our online form.',
    line3:
      'Make sure you follow the instructions on how to upload your documents carefully or they could be rejected, resulting in further delays.',
  },
  documentsByPost: 'Sending your documents by post',
  documentsByPostSteps: {
    step1: `Write your reference number on each document: ${referenceNumber}`,
    step2: 'Post the original documents to:',
  },
  documentsByPostMoreDetails:
    'Make sure you also include in your response a return address. Any cherished documents you send, such as marriage certificates, birth certificates, passports or deed polls will be returned to you. Other documents will not be returned.',

  subHeading3: `Apply to serve the ${isDivorce ? 'divorce' : 'civil partnership'} papers another way`,
  line3: {
    p1: `You need to apply to serve the ${
      isDivorce ? 'divorce' : 'ending your civil partnership'
    } papers to your ${partner} another way. This is because you did not provide their email and postal address. You could apply to serve them by email only, text message or social media.`,
    p2: 'You will need to fill out a separate paper D11 form and send it to the court. The form can be used to make different applications so only fill out the relevant sections.',
  },
  line4: {
    part1: `Apply to serve the ${isDivorce ? 'divorce' : 'civil partnership'} papers another way`,
    link: config.get('govukUrls.d11Form'),
  },
  subHeading4: 'What happens next',
  line5:
    userCase.state === State.AwaitingHWFEvidence
      ? 'Your joint application will be checked by court staff. You will receive an email notification confirming whether it has been accepted. Check your junk or spam email folder.'
      : `Your joint application${
          userCase.applicant1AlreadyAppliedForHelpPaying === YesOrNo.YES &&
          userCase.applicant2AlreadyAppliedForHelpPaying === YesOrNo.YES &&
          !applicationHasBeenPaidFor
            ? ' and help with fees reference number'
            : ''
        } will be checked by court staff. You will receive an email notification by ${getFormattedDate(
          dayjs(userCase.dateSubmitted).add(config.get('dates.applicationSubmittedOffsetDays'), 'day')
        )} confirming whether it has been accepted. Check your junk or spam email folder.`,
  line6: `Your ${partner} will then be sent a copy of the application. They will be asked to check the information and respond. If they do not respond then you will be told what you can do next to progress the application.`,
  line7: `Your ${partner}’s solicitor will be contacted by the court, and asked to confirm they are representing them. They will be sent a copy of the application and asked to respond.`,
  line8: `If you want to ‘serve’ (send) the documents to your ${partner} yourself then phone ${telephoneNumber} to request it. Otherwise the court will do it.`,
  line9: `If you want the court to serve (send) the application by post instead of by email, then phone ${telephoneNumber}.`,
  line10: `The address you have provided for your ${partner} is outside of England and Wales. That means you are responsible for ‘serving’ (sending) the court documents, which notify your ${partner} about ${
    isDivorce ? 'the divorce' : 'ending the civil partnership'
  }.`,
  line11: `You will receive the documents that you need to send to your ${partner} by email and letter, after the application has been checked.`,
  informationRequested: {
    line1: `The court has reviewed your application for ${
      isDivorce ? 'divorce' : 'dissolution'
    }. You need to provide some additional information before your application can progress.`,
    line2: 'We have sent you an email with the information the court needs.',
    line3:
      'You can also see the information that the court needs on the next page after you select "Provide information".',
    line4: 'What you need to do next',
    line5: 'Read the court’s reasons for stopping the application and provide the requested information.',
    line6: 'If documents have been requested, you will be able to upload them to the court when you respond.',
    buttonText: 'Provide information',
    buttonLink: `${isApplicant2 ? APPLICANT_2 : ''}${RESPOND_TO_COURT_FEEDBACK}`,
    line7: 'We will let you know once we have reviewed the information you provided.',
  },
  respondedToRequestForInformation: {
    line1: 'You or your partner have responded to the court.',
    line2: `Your application will be checked by court staff. You will receive an email notification by ${dateOfCourtReplyToRequestForInformationResponse} confirming whether it has been accepted. Check your junk or spam email folder.`,
  },
  awaitingRequestedInformation: {
    line1:
      'You or your partner have told us that you cannot upload some or all of your documents. We cannot progress your application until we have received them.',
    line2: 'What you need to do next',
    line3: 'We have sent you an email with details on how to send your documents.',
    line4: 'You or your partner can ',
    formLinkText: 'upload your documents using our online form',
    line4a: ', or send them by post along with a cover sheet with your case reference number.',
    line5: 'We will then review your response',
  },
  informationRequestedFromPartnerOrOther: {
    partner: {
      line1: `The court has reviewed your application for ${
        isDivorce ? 'divorce' : 'dissolution'
      }. We have sent an email to your ${partner} with the information that the court needs.`,
      line2: `The court will review the information from your ${partner} once provided, then the application can progress.`,
    },
    other: {
      line1: `The court has reviewed your application for ${
        isDivorce ? 'divorce' : 'dissolution'
      }. We have sent an email to a Third party with the information that the court needs.`,
      line2:
        'The court will review the information from the Third party once provided, then the application can progress.',
    },
  },
});

const cy: typeof en = (
  {
    applicationHasBeenPaidFor,
    isDivorce,
    userCase,
    partner,
    isApplicant2,
    referenceNumber,
    telephoneNumber,
  }: CommonContent,
  dateOfCourtReplyToRequestForInformationResponse: string
) => ({
  subHeading1: hubPageSubheading(userCase, SupportedLanguages.Cy),
  applicationSubmittedLatestUpdate: {
    line1:
      userCase.state === State.AwaitingHWFEvidence
        ? "Bydd eich cais ar y cyd yn cael ei wirio gan staff y llys. Byddwch yn derbyn hysbysiad drwy e-bost yn cadarnhau a yw wedi'i dderbyn. Gwiriwch eich ffolder 'junk' neu 'spam'."
        : `Bydd staff y llys yn gwirio eich cais ar y cyd' ${
            userCase.applicant1AlreadyAppliedForHelpPaying === YesOrNo.YES &&
            userCase.applicant2AlreadyAppliedForHelpPaying === YesOrNo.YES &&
            !applicationHasBeenPaidFor
              ? 'a’ch cyfeirnod Help i Dalu Ffioedd '
              : ''
          }. Fe gewch neges e-bost erbyn  ${getFormattedDate(
            dayjs(userCase.dateSubmitted).add(config.get('dates.applicationSubmittedOffsetDays'), 'day'),
            SupportedLanguages.Cy
          )} yn cadarnhau p’un a yw wedi’i dderbyn. Gwiriwch eich ffolder ‘junk’ neu ‘spam’.`,
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
    line3: `Gallwch wneud cais am orchymyn amodol ar ${getFormattedDate(
      dayjs(userCase.issueDate).add(config.get('dates.issueDateOffsetDays'), 'day'),
      SupportedLanguages.Cy
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
      line2: `Os nad yw’n gwneud cais erbyn ${getFormattedDate(
        dayjs(userCase.coApplicant1SubmittedDate || userCase.coApplicant2SubmittedDate).add(
          config.get('dates.changingToSolePartnerResponseDays'),
          'day'
        ),
        SupportedLanguages.Cy
      )} yna fe anfonir e-bost atoch yn dweud wrthych sut y gallwch fwrw ymlaen â'r cais.`,
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
      link: `${isApplicant2 ? '/applicant2' : ''}/changing-to-a-sole-application`,
      linkText: 'newid eich cais i fod yn gais unigol.',
    },
  },
  awaitingLegalAdvisorReferral: {
    line1: `Rydych chi a'ch ${partner} wedi gwneud cais am 'orchymyn amodol'.`,
    line2: `Bydd y llys yn gwirio'ch cais ac yn ei anfon at farnwr.
     Os bydd y barnwr yn cytuno y dylech ${isDivorce ? 'gael ysgariad' : "ddod â'ch partneriaeth sifil i ben"},
    yna bydd yn  caniatáu i chi gael gorchymyn amodol ac yna'n ei ‘gyhoeddi’ yn y llys. Byddwch yn cael e-bost erbyn ${getFormattedDate(
      dayjs(userCase.coApplicant1SubmittedDate).isAfter(dayjs(userCase.coApplicant2SubmittedDate))
        ? dayjs(userCase.coApplicant1SubmittedDate).add(
            config.get('dates.awaitingLegalAdvisorReferralOffsetDays'),
            'day'
          )
        : dayjs(userCase.coApplicant2SubmittedDate).add(
            config.get('dates.awaitingLegalAdvisorReferralOffsetDays'),
            'day'
          ),
      SupportedLanguages.Cy
    )} ar ôl i'ch cais gael ei wirio.
    Bydd yn cynnwys yr amser, y dyddiad a manylion y llys lle bydd eich gorchymyn amodol yn cael ei gyhoeddi.`,
  },
  awaitingFinalOrder: {
    line1: `Gallwch nawr wneud cais am 'orchymyn terfynol'. Gorchymyn terfynol yw'r ddogfen a fydd yn dod â'ch ${
      isDivorce ? 'priodas' : 'partneriaeth sifil'
    } i ben yn gyfreithiol.
    Dyma'r cam olaf yn y ${isDivorce ? 'broses ysgaru' : "broses i ddod â'ch partneriaeth sifil i ben"}.`,
    buttonText: 'Gwneud cais am orchymyn terfynol',
    buttonLink: `${isApplicant2 ? `${APPLICANT_2}${FINALISING_YOUR_APPLICATION}` : FINALISING_YOUR_APPLICATION}`,
  },
  hasAppliedForFinalOrder: {
    line1: `Rydych wedi gwneud cais am 'orchymyn terfynol'. Mae'n rhaid i'ch ${partner} wneud cais hefyd oherwydd bod hwn yn gais ar y cyd. Anfonwyd nodyn atgoffa ato/ati drwy e-bost.`,
    line2: `Os nad yw’n gwneud cais erbyn ${getFormattedDate(
      dayjs(userCase.dateFinalOrderSubmitted).add(config.get('dates.finalOrderSubmittedOffsetDays'), 'day')
    )} yna anfonir e-bost atoch yn dweud wrthych sut y gallwch ${
      isDivorce ? 'gadarnhau eich ysgariad' : "ddod â'ch partneriaeth sifil i ben"
    }.`,
  },
  finalOrderRequested: {
    line1: `Rydych chi a'c ${partner} wedi datgan eich bod eisiau ${
      isDivorce ? 'cadarnhau eich ysgariad' : "dod â'ch partneriaeth sifil i ben"
    }. Bydd eich cais yn cael ei wirio gan staff y llys. Os nad oes unrhyw geisiadau eraill y mae angen eu cwblhau yna bydd eich ${
      isDivorce ? 'ysgariad yn cael ei gadarnhau' : 'partneriaeth eich sifil yn dod i ben yn gyfreithiol'
    }.`,
    line2: "Dylech gael e-bost o fewn 2 ddiwrnod gwaith, yn datgan a yw'r gorchymyn terfynol wedi'i ganiatáu.",
  },
  awaitingJointFinalOrderOrFinalOrderOverdue: {
    line1: `Nid yw eich ${partner} wedi gwneud cais am orchymyn terfynol o hyd. Mae'n rhaid iddo/iddi hefyd wneud cais fel y gellir cadarnhau eich ${
      isDivorce ? 'cais am ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
    } ar y cyd.`,
    subHeading: 'Beth allwch chi ei wneud',
    line2: `Dylech gysylltu â'ch ${partner} a gofyn iddo/iddi wneud cais, os yw'n ddiogel i chi wneud hynny. `,
    line3: `Os nad ydych yn credu y bydd yn caniatáu'r cais yna gallwch ${
      isDivorce ? 'gadarnhau eich ysgariad' : 'ddod â’ch partneriaeth sifil i ben'
    }`,
    link: `${isApplicant2 ? `${APPLICANT_2}${HOW_TO_FINALISE_APPLICATION}` : HOW_TO_FINALISE_APPLICATION}`,
    linkText: ' fel unig geisydd.',
  },
  finalOrderComplete: {
    line1: `Mae’r llys wedi caniatáu gorchymyn terfynol ichi. Mae eich ${isDivorce ? 'priodas' : 'partneriaeth sifil'}
    yn awr wedi dod i ben yn gyfreithiol.`,
    line2: {
      part1: "Lawrlwythwch gopi o'ch 'gorchymyn terfynol'",
      part2: `. Dyma’r ddogfen swyddogol gan y llys sy’n profi ${
        isDivorce ? 'eich bod wedi ysgaru' : 'bod eich partneriaeth sifil wedi dod i ben'
      }.`,
      link: '/downloads/final-order-granted',
      reference: 'Final-Order-Granted',
    },
  },
  intendToSwitchToSoleFinalOrder: {
    line1: `Mae'r llys wedi hysbysu eich ${partner} drwy e-bost eich bod yn bwriadu gwneud cais am orchymyn terfynol fel unig geisydd.`,
    line2: `Byddwch yn gallu gwneud cais am orchymyn terfynol o ${getFormattedDate(
      dayjs(
        isApplicant2
          ? userCase.dateApplicant2DeclaredIntentionToSwitchToSoleFo
          : userCase.dateApplicant1DeclaredIntentionToSwitchToSoleFo
      ).add(config.get('dates.switchToSoleFinalOrderIntentionNotificationOffsetDays'), 'day'),
      SupportedLanguages.Cy
    )}. Byddwch yn cael e-bost i'ch atgoffa.`,
  },
  intendingAndAbleToSwitchToSoleFinalOrder: {
    line1: `You can now apply for a ‘final order’ as a sole applicant. If it’s granted then your ${
      isDivorce ? 'marriage' : 'civil partnership'
    } will be legally ended.`,
  },
  pendingHearingOutcome: {
    line1:
      'Mae eich cais wedi cyrraedd y llys a bydd yn cael ei gyfeirio at farnwr i ystyried eich cais. Dylech glywed gan\n y llys am benderfyniad y barnwr.',
  },
  sendDocumentLine1: 'Ni fydd eich cais yn cael ei brosesu hyd nes y byddwch wedi gwneud y canlynol:',
  sendDocumentHeading: 'Anfon eich dogfennau i’r llys',
  line2: 'Mae angen i chi anfon y dogfennau canlynol i’r llys gan na wnaethoch eu llwytho yn gynharach:',
  documents: {
    [DocumentType.MARRIAGE_CERTIFICATE]:
      userCase.inTheUk === YesOrNo.NO
        ? `Eich tystysgrif ${isDivorce ? 'priodas' : 'partneriaeth sifil'} dramor wreiddiol`
        : `Eich tystysgrif ${isDivorce ? 'priodas' : 'partneriaeth sifil'} wreiddiol neu gopi ardystiedig ohoni`,
    [DocumentType.MARRIAGE_CERTIFICATE_TRANSLATION]: `Cyfieithiad ardystiedig o’ch tystysgrif ${
      isDivorce ? 'priodas' : 'partneriaeth sifil'
    } dramor`,
    [DocumentType.NAME_CHANGE_EVIDENCE]:
      'Prawf eich bod wedi newid eich enw. Er enghraifft, gweithred newid enw neu ddatganiad statudol.',
  },
  documentsByOnlineForm: 'Anfon dogfennau drwy ddefnyddio ein ffurflen ar-lein',
  documentsByOnlineFormSteps: {
    line1: 'Gallwch anfon lluniau neu sganiau o’ch dogfennau atom trwy ',
    line2: 'llwytho gan ddefnyddio ein ffurflen ar-lein.',
    line3:
      "Gwnewch yn siŵr eich bod yn dilyn y cyfarwyddiadau ar sut i lwytho eich dogfennau'n ofalus neu gellid eu gwrthod, gan arwain at oedi pellach.",
  },
  documentsByPost: 'Anfon eich dogfennau drwy’r post',
  documentsByPostSteps: {
    step1: `Ysgrifennwch eich cyfeirnod ar bob dogfen: ${referenceNumber}`,
    step2: 'Postiwch y dogfennau gwreiddiol i:',
  },
  documentsByPostMoreDetails:
    'Gwnewch yn siŵr eich bod hefyd yn cynnwys cyfeiriad dychwelyd yn eich ymateb. Bydd unrhyw ddogfennau y byddwch yn eu hanfon, fel tystysgrifau priodas, tystysgrifau geni, pasbortau neu weithred newid enw yn cael eu dychwelyd atoch. Ni fydd y dogfennau eraill yn cael eu dychwelyd.',
  subHeading3: `Gwneud cais i gyflwyno papurau’r ${isDivorce ? 'ysgariad' : 'bartneriaeth sifil'} mewn ffordd arall`,
  line3: {
    p1: `Mae angen i chi wneud cais i gyflwyno papurau’r ${
      isDivorce ? 'ysgariad' : 'bartneriaeth sifil'
    } ar eich ${partner} mewn ffordd arall. Y rheswm dros hyn yw oherwydd ni wnaethoch ddarparu eu cyfeiriad e-bost neu gyfeiriad post. Gallwch wneud cais i’w cyflwyno arnynt drwy e-bost yn unig, drwy neges testun neu gyfryngau cymdeithasol.`,
    p2: 'Bydd angen i chi lenwi ffurflen bapur D11 a’i hanfon i’r llys. Gallwch ddefnyddio’r ffurflen i wneud ceisiadau gwahanol, felly dim ond yr adrannau perthnasol sydd angen i chi eu llenwi.',
  },
  line4: {
    part1: `Gwneud cais i gyflwyno papurau’r ${isDivorce ? 'ysgariad' : 'bartneriaeth sifil'} mewn ffordd arall`,
    link: config.get('govukUrls.d11Form'),
  },
  subHeading4: 'Beth fydd yn digwydd nesaf',
  line5:
    userCase.state === State.AwaitingHWFEvidence
      ? "Bydd eich cais ar y cyd yn cael ei wirio gan staff y llys. Byddwch yn derbyn hysbysiad drwy e-bost yn cadarnhau a yw wedi'i dderbyn. Gwiriwch eich ffolder 'junk' neu 'spam'."
      : `Bydd staff y llys yn gwirio eich cais ar y cyd' ${
          userCase.applicant1AlreadyAppliedForHelpPaying === YesOrNo.YES &&
          userCase.applicant2AlreadyAppliedForHelpPaying === YesOrNo.YES &&
          !applicationHasBeenPaidFor
            ? ' a’ch cyfeirnod Help i Dalu Ffioedd'
            : ''
        }. Fe gewch neges e-bost erbyn ${getFormattedDate(
          dayjs(userCase.dateSubmitted).add(config.get('dates.applicationSubmittedOffsetDays'), 'day'),
          SupportedLanguages.Cy
        )} yn cadarnhau p’un a yw wedi’i dderbyn. Gwiriwch eich ffolder ‘junk’ neu ‘spam’.`,
  line6: `Yna fe anfonir copi o’r cais at eich ${partner}. Os na fyddant yn ymateb, fe ddywedir wrthych beth allwch ei wneud nesaf i symud y cais yn ei flaen.`,
  line7: `Bydd y llys yn cysylltu â chyfreithiwr eich ${partner} ac yn gofyn iddo gadarnhau ei fod yn cynrychioli eich ${partner}. Fe anfonir copi o’r cais ato ac fe ofynnir iddo ymateb.`,
  line8: `Os ydych eisiau ‘cyflwyno’ (anfon) y dogfennau ar eich ${partner} eich hun, yna ffoniwch ${telephoneNumber}. Fel arall, bydd y llys yn gwneud hyn ar eich rhan.`,
  line9: `Os ydych eisiau i’r llys gyflwyno (anfon) y cais drwy’r post yn hytrach na drwy e-bost, ffoniwch ${telephoneNumber}.`,
  line10: `Mae’r cyfeiriad rydych wedi’i ddarparu ar gyfer eich ${partner} y tu allan i Gymru a Lloegr. Mae hynny’n golygu eich bod chi’n gyfrifol am ‘gyflwyno’ (anfon) dogfennau’r llys, sydd yn hysbysu eich ${partner} am ${
    isDivorce ? 'yr ysgariad' : 'ddiweddu’r bartneriaeth sifil'
  }.`,
  line11: `Fe gewch y dogfennau y bydd angen i chi eu hanfon at eich ${partner} drwy e-bost a drwy’r post, ar ôl i’r cais gael ei wirio.`,
  informationRequested: {
    line1: `Mae’r llys wedi adolygu eich cais am ${
      isDivorce ? 'ysgariad' : 'diddymiad'
    }. Mae angen ichi ddarparu rhagor o wybodaeth cyn y gall y cais fynd yn ei flaen.`,
    line2: 'Rydym wedi anfon neges e-bost atoch gyda gwybodaeth y mae’r llys ei hangen.',
    line3:
      'Gallwch hefyd weld yr wybodaeth mae’r llys ei hangen ar y dudalen nesaf ar ôl i chi ddewis “Darparu Gwybodaeth”.',
    line4: 'Beth sydd angen i chi wneud nesaf',
    line5: 'Darllenwch resymau’r llys dros atal y cais a darparwch yr wybodaeth y gofynnwyd amdani.',
    line6: 'Os gofynnwyd am ddogfennau, byddwch yn gallu eu llwytho i’r llys pan fyddwch yn ymateb.',
    buttonText: 'Darparu gwybodaeth',
    buttonLink: `${isApplicant2 ? APPLICANT_2 : ''}${RESPOND_TO_COURT_FEEDBACK}`,
    line7: 'Byddwn yn rhoi gwybod i chi unwaith y byddwn wedi adolygu’r wybodaeth a ddarparwyd gennych.',
  },
  respondedToRequestForInformation: {
    line1: "Rydych chi neu'ch partner wedi ymateb i'r llys.",
    line2: `Bydd eich cais yn cael ei wirio gan staff y llys. Fe gewch neges e-bost erbyn ${dateOfCourtReplyToRequestForInformationResponse} yn cadarnhau p’un a yw wedi’i dderbyn. Gwiriwch eich ffolder ‘junk’ neu ‘spam’.`,
  },
  awaitingRequestedInformation: {
    line1:
      'Rydych chi neu eich partner wedi dweud wrthym nad ydych yn gallu uwchlwytho rhai neu’r cyfan o’ch dogfennau.  Ni allwn symud eich cais yn ei flaen hyd nes y byddwn wedi’u derbyn.',
    line2: 'Beth sydd angen i chi wneud nesaf',
    line3: 'Rydym wedi anfon e-bost atoch gyda manylion ar sut i anfon eich dogfennau.',
    line4: 'Gallwch chi neu eich partner ',
    formLinkText: 'uwchlwytho eich dogfennau gan ddefnyddio ein ffurflen ar-lein',
    line4a: ', neu eu hanfon drwy’r post ynghyd â dalen flaen gyda chyfeirnod eich achos.',
    line5: 'Byddwn wedyn yn adolygu eich ymateb',
  },
  informationRequestedFromPartnerOrOther: {
    partner: {
      line1: `Mae'r llys wedi adolygu eich cais am ${
        isDivorce ? 'ysgariad' : 'diddymiad'
      }. Rydym wedi anfon e-bost at eich ${partner} gyda'r wybodaeth sydd ei hangen ar y llys.`,
      line2: `Bydd y llys yn adolygu'r wybodaeth gan eich ${partner} ar ôl ei darparu, yna gall y cais symud ymlaen.`,
    },
    other: {
      line1: `Mae’r llys wedi adolygu eich cais am ${
        isDivorce ? 'ysgariad' : 'ddiddymiad'
      }. Rydym wedi anfon neges e-bost at drydydd parti gyda’r wybodaeth y mae’r llys ei hangen.`,
      line2:
        'Bydd y llys yn adolygu’r wybodaeth gan y trydydd parti unwaith y bydd wedi dod i law, ac yna gall y cais barhau.',
    },
  },
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const { userCase, isApplicant2 } = content;
  const isClarificationDocumentsUploaded = userCase.coCannotUploadClarificationDocuments !== Checkbox.Checked;
  const hasApplicantConfirmedReceipt = isApplicant2
    ? userCase.applicant2ConfirmReceipt === YesOrNo.YES
    : userCase.applicant1ConfirmReceipt === YesOrNo.YES;
  const hasApplicantAppliedForConditionalOrder = isApplicant2
    ? userCase.coApplicant2StatementOfTruth === Checkbox.Checked
    : userCase.coApplicant1StatementOfTruth === Checkbox.Checked;
  const partnerSubmissionOverdue = dayjs(userCase.coApplicant1SubmittedDate || userCase.coApplicant2SubmittedDate)
    .add(config.get('dates.changingToSolePartnerResponseDays'), 'day')
    .isBefore(dayjs());

  const latestRequestForInformation = userCase.requestsForInformation?.at(0)?.value;
  const requestForInformationParties = latestRequestForInformation?.requestForInformationJointParties || '';

  const isApplicantAbleToRespondToRequestForInformation = ['both', isApplicant2 ? 'applicant2' : 'applicant1'].includes(
    requestForInformationParties
  );

  const isRequestForInformationForYourPartner =
    requestForInformationParties === (isApplicant2 ? 'applicant1' : 'applicant2');

  const dateOfCourtReplyToRequestForInformationResponse =
    getFormattedDate(
      dayjs(
        latestRequestForInformation?.requestForInformationResponses?.at(0)?.value.requestForInformationResponseDateTime
      ).add(config.get('dates.requestForInformationResponseCourtReplyOffsetDays'), 'day'),
      content.language
    ) || '';

  const displayState = currentStateFn(userCase.state).at(
    (userCase.state === State.OfflineDocumentReceived ? userCase.previousState : userCase.state) as State
  );

  const finalOrderEligibleAndSecondInTimeFinalOrderNotSubmittedWithin14Days =
    hasApplicantAppliedForFoFirst(userCase, isApplicant2) &&
    canIntendToSwitchToSoleFo(userCase, isApplicant2) &&
    userCase.state === State.AwaitingJointFinalOrder;

  const isFinalOrderAwaiting =
    displayState.state() === State.AwaitingFinalOrder || displayState.state() === State.AwaitingJointFinalOrder;

  const isFinalOrderAwaitingOrOverdueAndApplicantHasNotAppliedFirst =
    isFinalOrderAwaiting && !hasApplicantAppliedForFoFirst(userCase, isApplicant2);

  const applicantConfirmReceipt = isApplicant2 ? 'applicant2ConfirmReceipt' : 'applicant1ConfirmReceipt';
  const applicantApplyForConditionalOrderStarted = isApplicant2
    ? 'applicant2ApplyForConditionalOrderStarted'
    : 'applicant1ApplyForConditionalOrderStarted';

  const switchToSoleFinalOrderStatus = getSwitchToSoleFoStatus(userCase, isApplicant2);

  const isFinalOrderCompleteState = userCase.state === State.FinalOrderComplete;
  const theLatestUpdateTemplate = getJointHubTemplate(displayState, userCase, {
    hasApplicantAppliedForConditionalOrder,
    isWithinSwitchToSoleFoIntentionNotificationPeriod:
      switchToSoleFinalOrderStatus.isWithinSwitchToSoleFoIntentionNotificationPeriod,
    hasSwitchToSoleFoIntentionNotificationPeriodExpired:
      switchToSoleFinalOrderStatus.hasSwitchToSoleFoIntentionNotificationPeriodExpired,
    isApplicantAbleToRespondToRequestForInformation,
  });

  const cannotUploadDocuments = new Set([
    ...(userCase.applicant1CannotUploadDocuments || []),
    ...(userCase.applicant2CannotUploadDocuments || []),
  ]);

  return {
    ...languages[content.language](content, dateOfCourtReplyToRequestForInformationResponse),
    displayState,
    hasApplicantConfirmedReceipt,
    hasApplicantAppliedForConditionalOrder,
    partnerSubmissionOverdue,
    isApplicant2,
    applicantConfirmReceipt,
    applicantApplyForConditionalOrderStarted,
    theLatestUpdateTemplate,
    isClarificationDocumentsUploaded,
    hasApplicantAppliedForFinalOrderFirst: hasApplicantAppliedForFoFirst(userCase, isApplicant2),
    isFinalOrderAwaitingOrOverdueAndApplicantHasNotAppliedFirst,
    isFinalOrderCompleteState,
    finalOrderEligibleAndSecondInTimeFinalOrderNotSubmittedWithin14Days,
    isIntendingAndAbleToSwitchToSoleFinalOrder: switchToSoleFinalOrderStatus.isIntendingAndAbleToSwitchToSoleFo,
    isApplicantAbleToRespondToRequestForInformation,
    isRequestForInformationForYourPartner,
    dateOfCourtReplyToRequestForInformationResponse,
    cannotUploadDocuments,
  };
};
