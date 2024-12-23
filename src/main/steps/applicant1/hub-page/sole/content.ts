import config from 'config';
import dayjs from 'dayjs';

import { getFormattedDate } from '../../../../app/case/answers/formatDate';
import { Checkbox } from '../../../../app/case/case';
import {
  AlternativeServiceType,
  Applicant2Represented,
  DocumentType,
  State,
  YesOrNo,
} from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { SupportedLanguages } from '../../../../modules/i18n';
import { isCountryUk } from '../../../applicant1Sequence';
import type { CommonContent } from '../../../common/common.content';
import { currentStateFn } from '../../../state-sequence';
import { FINALISING_YOUR_APPLICATION, HOW_YOU_CAN_PROCEED, RESPOND_TO_COURT_FEEDBACK } from '../../../urls';

import { getSoleHubTemplate } from './soleTemplateSelector';

const en = (
  { applicationHasBeenPaidFor, isDivorce, partner, userCase, telephoneNumber, referenceNumber, isJointApplication }: CommonContent,
  alternativeServiceType: AlternativeServiceType,
  dateOfCourtReplyToRequestForInformationResponse: string
) => ({
  aosAwaitingOrDrafted: {
    line1: `Your application ${
      userCase.applicant1AlreadyAppliedForHelpPaying === YesOrNo.YES && !applicationHasBeenPaidFor ? 'and help with fees reference number ' : ''
    } will be checked by court staff. You will receive an email notification by ${getFormattedDate(
      dayjs(userCase.dateSubmitted).add(config.get('dates.applicationSubmittedOffsetDays'), 'day')
    )} confirming whether it has been accepted. Check your junk or spam email folder.`,
    line2: `Your ${partner} will then be sent a copy of the application. They will be asked to check the information and respond. If they do not respond then you will be told what you can do next to progress the application.`,
    line3: `If you want to ‘serve’ (send) the documents to your ${partner} yourself then phone ${telephoneNumber} to request it. Otherwise the court will do it.`,
    line4: `If you want the court to serve (send) the application to be served by post instead of by email, then phone ${telephoneNumber}.`,
    line5: `The address you have provided for your ${partner} is outside of England and Wales. That means you are responsible for ‘serving’ (sending) the court documents, which notify your ${partner} about ${
      isDivorce ? 'the divorce' : 'ending the civil partnership'
    }`,
    line6: `You will receive the documents that you need to send to your ${partner} by email and letter, after the application has been checked.`,
    line7: `Your ${partner}’s solicitor will be contacted by the court, and asked to confirm they are representing them. They will be sent a copy of the application and asked to respond.`,
  },
  aosDue: {
    line1: `Your ${partner} should have responded to your ${
      isDivorce ? 'divorce application' : 'application to end your civil partnership'
    } by ${getFormattedDate(
      userCase.dueDate
    )}. They can still respond and have been sent a reminder. You can also contact them to remind them if it’s safe to do so.`,
    line2: `If you do not think they will respond then you can <a class="govuk-link" href="${HOW_YOU_CAN_PROCEED}">view the options for proceeding with your ${
      isDivorce ? 'divorce' : 'application to end your civil partnership'
    }</a>.`,
  },
  holding: {
    line1: `Your ${partner} has responded to your ${
      isDivorce ? 'divorce application' : 'application to end your civil partnership'
    }. You can <a class="govuk-link" href="/downloads/respondent-answers" download="Respondent-answers">download and read their response (PDF)</a>.`,
    line2: `The next step is for you to apply for a ‘conditional order’. A conditional order is a document that says the court does not see any reason why you cannot ${
      isDivorce ? 'get a divorce' : 'end your civil partnership'
    }.`,
    line3: `You can apply for a conditional order on ${getFormattedDate(
      dayjs(userCase.issueDate).add(config.get('dates.issueDateOffsetDays'), 'day')
    )}. This is because you have to wait until 20 weeks from when the ${
      isDivorce ? 'divorce application' : 'application to end your civil partnership'
    } was issued. You will receive an email to remind you.`,
  },
  holdingAndDeemedOrDispensedAccepted: `Your application ${
    alternativeServiceType === AlternativeServiceType.DISPENSED ? 'to dispense with' : 'for deemed'
  } service was granted. You can`,
  deemedOrDispensedAccepted: {
    line1: `download the court order granting your application for ${
      alternativeServiceType === AlternativeServiceType.DISPENSED ? 'dispensed' : 'deemed'
    } service`,
    downloadReference: `/downloads/${
      alternativeServiceType === AlternativeServiceType.DISPENSED
        ? 'certificate-of-dispense-with-service'
        : 'certificate-of-deemed-as-service'
    }`,
  },
  d8Awaiting: {
    line1: `Your ${partner} has responded to your application and said they want to defend the ${
      isDivorce ? 'divorce' : 'ending of your civil partnership'
    }. This means they want to try and prevent ${
      isDivorce ? 'the divorce' : 'the ending of your civil partnership'
    }. You can <a class="govuk-link" href="/downloads/respondent-answers" download="Respondent-answers">read their response here</a>.`,
    line2: `They have to submit an ‘answer’ to the court by ${getFormattedDate(
      dayjs(userCase.issueDate).add(config.get('dates.disputeDueDateOffsetDays'), 'day')
    )}. This is a form which explains their reasons for defending the ${
      isDivorce ? 'divorce' : 'ending of your civil partnership'
    }.`,
    line3: `If they submit the ‘answer’ then a judge will decide how to proceed. If they do not submit the form in time, then you will be able to proceed with the ${
      isDivorce ? 'divorce application' : 'application to end your civil partnership'
    }.`,
  },
  d8Submitted: {
    line1: `Your ${partner} has responded to your application and said they want to defend the ${
      isDivorce ? 'divorce' : 'ending of your civil partnership'
    }. This means they want to try and prevent ${
      isDivorce ? 'the divorce' : 'the ending of your civil partnership'
    }. You can <a class="govuk-link" href="/downloads/respondent-answers" download="Respondent-answers">read their response here</a>.`,
    line2: `They have submitted their ‘answer’. This is the form which explains their case for defending the ${
      isDivorce ? 'divorce' : 'ending of your civil partnership'
    }.`,
    line3: `A judge will decide whether you and your ${partner} need to attend a hearing. You may be contacted for more information to help them make a decision.`,
    line4: 'You’ll receive a letter in the post telling you if you need to attend the hearing, and where it will be.',
  },
  servedByBailiff: {
    line1: `The bailiff has successfully served (delivered) your ${
      isDivorce ? 'divorce application' : 'application to end your civil partnership'
    } to your ${partner}. They served them the documents on ${getFormattedDate(
      userCase.alternativeServiceOutcomes?.[0].value.certificateOfServiceDate
    )}.`,
  },
  awaitingConditionalOrder: `You can now apply for a ‘conditional order’. A conditional order is a document that says the court does not see any reason why you cannot ${
    isDivorce ? 'get a divorce' : 'end your civil partnership'
  }.`,
  awaitingConditionalOrderAndServedByBailiff: {
    line1: `The bailiff has successfully served (delivered) your ${
      isDivorce ? 'divorce application' : 'application to end your civil partnership'
    } to your ${partner}. They served them the documents on ${getFormattedDate(
      userCase.alternativeServiceOutcomes?.[0].value.certificateOfServiceDate
    )}.`,
    line2: `You will not see a response from your ${partner} when you apply for the conditional order.`,
  },
  conditionalOrderWithDeemedOrDispensedService: `You will not see a response from your ${partner} in the conditional order application.
  This is because they did not respond to your application.
  You applied to the court to ${
    alternativeServiceType === AlternativeServiceType.DISPENSED ? "'dispense with" : "for 'deemed"
  }service', which was granted. You can `,
  legalAdvisorReferral: {
    switchToSoleCoLine: `You have changed the application to a ‘sole application’. Your ${partner} has been notified by email.`,
    line1: `You have applied for a ‘conditional order’. The court will check your application and send it to a judge. If the judge agrees that you should ${
      isDivorce ? 'get a divorce' : 'end your civil partnership'
    }, they will grant your entitlement to a conditional order and ‘pronounce’ it in court. You will receive an email by ${getFormattedDate(
      dayjs(userCase.coApplicant1SubmittedDate).add(config.get('dates.awaitingLegalAdvisorReferralOffsetDays'), 'day')
    )} after your application has been checked. This will have the time, date and court your conditional order will be pronounced.`,
    line2:
      'After your conditional order is pronounced, you then have to apply for a ‘final order’. This will finalise your divorce. ' +
      'You have to wait 6 weeks until after your conditional order, to apply for the final order.',
  },
  awaitingFinalOrderOrFinalOrderOverdue: {
    line1: `You can now apply for a 'final order'. A final order is the document that will legally end your ${
      isDivorce ? 'marriage' : 'civil partnership'
    }.
    It’s the final step in the ${isDivorce ? 'divorce process' : 'process to end your civil partnership'}.`,
    buttonText: 'Apply for a final order',
    buttonLink: FINALISING_YOUR_APPLICATION,
  },
  readMore: 'Read more about the next steps',
  readMoreSummary: `You have to complete 2 more steps before ${
    isDivorce ? 'you are legally divorced' : 'your civil partnership is legally ended'
  }:`,
  readMoreSteps: {
    step1: {
      heading: 'Apply for a conditional order',
      body: `This shows that the court agrees that you’re entitled to ${
        isDivorce ? 'get a divorce' : 'end your civil partnership'
      }.`,
    },
    step2: {
      heading: 'Apply for a final order',
      body: `This legally ends the ${
        isDivorce ? 'marriage' : 'civil partnership'
      }. You cannot apply for a final order until 6 weeks after the conditional order.`,
    },
  },
  moneyAndProperty: {
    part1: `You can use the time to decide how your money and property will be divided. This is dealt with separately to the ${
      isDivorce ? 'divorce application' : 'application to end your civil partnership'
    }. `,
    part2: 'Find out more about dividing money and property',
    link: config.get('govukUrls.moneyAndProperty'),
  },
  finalOrderRequested: {
    applicant2AppliedFirstLine1: `Your ${partner} has applied for a ‘final order’.`,
    applicant2AppliedFirstLine2:
      'A judge will review the application. You will then receive an email telling you what they decide.',
    line1: 'You have applied for a ‘final order’. Your application will be checked by court staff.',
    line2: `If there are no other applications that need to be completed then your ${
      isDivorce ? 'marriage' : 'civil partnership'
    } will be legally ended.`,
    line3:
      userCase.isFinalOrderOverdue === YesOrNo.YES
        ? 'You will receive an email confirming whether it has been granted once a Judge has made a decision.'
        : 'You should receive an email within 2 working days, confirming whether the final order has been granted.',
  },
  finalOrderComplete: {},
  awaitingServiceConsiderationOrBailiffReferral: {
    line1:
      'Your application has been received and will be reviewed by a judge. You will receive an email telling you whether your application has been successful.',
  },
  serviceApplicationRejected: {
    line1: {
      part1: `The court has refused your application ${
        alternativeServiceType === AlternativeServiceType.BAILIFF
          ? 'for bailiff'
          : alternativeServiceType === AlternativeServiceType.DEEMED
            ? 'for deemed'
            : 'to dispense with'
      } service. You can read the reasons on the court’s `,
      part2: 'Refusal Order (PDF)',
      downloadReference: 'Refusal-Order',
      link: `/downloads/${
        alternativeServiceType === AlternativeServiceType.BAILIFF
          ? 'bailiff-service-refused'
          : alternativeServiceType === AlternativeServiceType.DEEMED
            ? 'deemed-service-refused'
            : 'dispense-with-service-refused'
      }`,
    },
    line2: {
      part1: 'Find out about the ',
      part2: `other ways you can progress your ${isDivorce ? 'divorce' : 'application to end your civil partnership'}.`,
      link: HOW_YOU_CAN_PROCEED,
    },
  },
  bailiffServiceUnsuccessful: {
    line1: `The court bailiff tried to ‘serve’ the ${
      isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
    } at the address you provided. Unfortunately the bailiff was unsuccessful and so your ${partner} has still not been served.`,
    line2: {
      part1: 'Read the ',
      part2: 'bailiff service certificate',
      part3: ', to see what you can do next.',
      downloadReference: 'Bailiff-certificate',
      link: '/downloads/bailiff-unsuccessful-certificate-of-service',
    },
  },
  awaitingBailiffService: {
    line1: `Your application for bailiff service was successful. The court bailiff will attempt to serve the ${
      isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
    } at the address you provided. You will receive another notification when the bailiffs have attempted to serve the papers.`,
    line2: {
      part1: 'Download and read your ',
      part2: "'bailiff service application approval'.",
      downloadReference: 'Bailiff-service-application-approval',
      link: '/downloads/bailiff-service',
    },
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
  line5: `Your${isJointApplication ? ' joint' : ''} application${
    userCase.applicant1AlreadyAppliedForHelpPaying === YesOrNo.YES &&
    (!isJointApplication || userCase.applicant2AlreadyAppliedForHelpPaying === YesOrNo.YES) &&
    !applicationHasBeenPaidFor
      ? ' and Help With Fees reference number'
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
  subHeading1:
    userCase.state === State.AwaitingAmendedApplication || userCase.state === State.AwaitingDocuments
      ? 'Latest information'
      : `${userCase.state === State.AwaitingClarification ? 'What you need to do now' : 'Latest update'}`,
  informationRequested: {
    line1: `The court has reviewed your application for ${
      isDivorce ? 'divorce' : 'dissolution'
    }. You need to provide some additional information before your application can progress.`,
    line2: 'We have sent you an email with the information the court needs.',
    line3: 'What you need to do next',
    line4: 'Read the court’s reasons for stopping the application and provide the requested information.',
    line5: 'If documents have been requested, you will be able to upload them to the court when you respond.',
    buttonText: 'Provide information',
    buttonLink: RESPOND_TO_COURT_FEEDBACK,
    line6: 'We will let you know once we have reviewed the information you provided.',
  },
  respondedToRequestForInformation: {
    line1: 'You have responded to the court.',
    line2: `Your application will be checked by court staff. You will receive an email notification by ${dateOfCourtReplyToRequestForInformationResponse} confirming whether it has been accepted. Check your junk or spam email folder.`,
    line3: `Your ${partner} will then be sent a copy of the application. They will be asked to check the information and respond. If they do not respond then you will be told what you can do next to progress the application.`,
    line4: `If you want to ‘serve’ (send) the documents to your ${partner} yourself then phone ${telephoneNumber} to request it. Otherwise the court will do it.`,
    line5: `If you want the court to serve (send) the application to be served by post instead of by email, then phone ${telephoneNumber}.`,
  },
  awaitingRequestedInformation: {
    line1:
      'You have told us that you cannot upload some or all of your documents. We cannot progress your application until we have received them.',
    line2: 'What you need to do next',
    line3: 'We have sent you an email with details on how to send your documents.',
    line4: 'You can ',
    formLinkText: 'upload your documents using our online form',
    line4a: ', or send them by post along with a cover sheet with your case reference number.',
    line5: 'We will then review your response',
  },
  informationRequestedFromOther: {
    line1: `The court has reviewed your application for ${
      isDivorce ? 'divorce' : 'dissolution'
    }. We have sent an email to a Third party with the information that the court needs.`,
    line2:
      'The court will review the information from the Third party once provided, then the application can progress.',
  },
});

// @TODO translations
const cy: typeof en = (
  { applicationHasBeenPaidFor, isDivorce, partner, userCase, telephoneNumber, referenceNumber, isJointApplication }: CommonContent,
  alternativeServiceType: AlternativeServiceType,
  dateOfCourtReplyToRequestForInformationResponse: string
) => ({
  aosAwaitingOrDrafted: {
    line1: `Bydd staff y llys yn gwirio eich cais ${
      userCase.applicant1AlreadyAppliedForHelpPaying === YesOrNo.YES && !applicationHasBeenPaidFor ? 'a’ch cyfeirnod Help i Dalu Ffioedd' : ''
    }. Fe gewch neges e-bost erbyn ${getFormattedDate(
      dayjs(userCase.dateSubmitted).add(config.get('dates.applicationSubmittedOffsetDays'), 'day'),
      SupportedLanguages.Cy
    )} yn cadarnhau p’un a yw wedi’i dderbyn. Gwiriwch eich ffolder ‘junk’ neu ‘spam’.`,
    line2: `Yna fe anfonir copi o’r cais at eich ${partner}. Fe ofynnir iddynt wirio’r wybodaeth ac ymateb. Os na fyddant yn ymateb, fe ddywedir wrthych beth allwch ei wneud nesaf i symud y cais yn ei flaen.`,
    line3: `Os ydych eisiau ‘cyflwyno’ (anfon) y dogfennau at eich ${partner} eich hun, yna ffoniwch ${telephoneNumber} i ofyn am gael gwneud hynny. Fel arall, bydd y llys yn gwneud hyn ar eich rhan.`,
    line4: `Os ydych eisiau i’r llys gyflwyno (anfon) y cais i’w gyflwyno drwy’r post yn hytrach na drwy e-bost, ffoniwch ${telephoneNumber}.`,
    line5: `Mae’r cyfeiriad rydych wedi’i ddarparu ar gyfer eich ${partner} y tu allan i Gymru a Lloegr. Mae hynny’n golygu mai chi sy’n gyfrifol am ‘gyflwyno’ (anfon) dogfennau’r llys, sy’n hysbysu’ch ${partner} am yr ysgariad.`,
    line6: `Fe gewch y dogfennau y bydd angen i chi eu hanfon at eich ${partner} drwy e-bost a llythyr, ar ôl i’r cais gael ei wirio.`,
    line7: `Bydd y llys yn cysylltu â chyfreithiwr eich ${partner} ac yn gofyn iddynt gadarnhau eu bod yn eu cynrychioli. Fe anfonir copi o’r cais atynt ac fe ofynnir iddynt ymateb.`,
  },
  aosDue: {
    line1: `Dylai eich ${partner} fod wedi ymateb i'ch ${
      isDivorce ? 'cais am ysgariad' : "cais i ddod â'ch partner sifil i ben"
    } erbyn ${getFormattedDate(
      userCase.dueDate,
      SupportedLanguages.Cy
    )}. Gallant barhau i ymateb er eu bod wedi cael nodyn atgoffa. Gallwch hefyd gysylltu â nhw i'w hatgoffa os yw'n ddiogel gwneud hynny.`,
    line2: `Os nad ydych yn credu y byddant yn ymateb yna gallwch <a class="govuk-link" href="${HOW_YOU_CAN_PROCEED}">weld yr opsiynau ar gyfer bwrw ymlaen â'ch ${
      isDivorce ? 'cais am ysgariad' : "cais i ddod â'ch partneriaeth sifil i ben"
    }</a>.`,
  },
  holding: {
    line1: `Mae eich ${partner} wedi ymateb i'ch ${
      isDivorce ? 'cais am ysgariad' : "cais i ddod â'ch partneriaeth sifil i ben"
    }. Gallwch <a class="govuk-link" href="/downloads/respondent-answers" download="Respondent-answers">lawrlwytho a darllen eu hymateb (PDF)</a>.`,
    line2: `Y cam nesaf yw i chi wneud cais am 'orchymyn amodol'. Mae gorchymyn amodol yn ddogfen sy'n dweud nad yw'r llys yn gweld unrhyw reswm pam na allwch ${
      isDivorce ? 'cael ysgariad' : "ddod â'ch partneriaeth sifil i ben"
    }.`,
    line3: `Gallwch wneud cais am orchymyn amodol ar ${getFormattedDate(
      dayjs(userCase.issueDate).add(config.get('dates.issueDateOffsetDays'), 'day'),
      SupportedLanguages.Cy
    )}. Mae hyn oherwydd bod rhaid i chi aros tan 20 wythnos o'r adeg y cyhoeddwyd y ${
      isDivorce ? 'cais am ysgariad' : "cais i ddod â'ch partneriaeth sifil i ben"
    } Byddwch yn cael e-bost i'ch atgoffa.`,
  },
  holdingAndDeemedOrDispensedAccepted: `Your application ${
    alternativeServiceType === AlternativeServiceType.DISPENSED ? 'to dispense with' : 'for deemed'
  } service was granted. You can`,
  deemedOrDispensedAccepted: {
    line1: `lawrlwytho'r gorchymyn llys sy'n caniatáu eich cais am gyflwyno ${
      alternativeServiceType === AlternativeServiceType.DISPENSED ? 'hepgor cyflwyno’r cais' : 'tybiedig'
    }`,
    downloadReference: `/downloads/${
      alternativeServiceType === AlternativeServiceType.DISPENSED
        ? 'certificate-of-dispense-with-service'
        : 'certificate-of-deemed-as-service'
    }`,
  },
  d8Awaiting: {
    line1: `Mae eich ${partner} wedi ymateb i'ch cais ac wedi dweud eu bod eisiau amddiffyn y ${
      isDivorce ? 'cais am ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
    }. Mae hyn yn golygu eu bod am geisio atal ${
      isDivorce ? 'y cais am ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
    }. Gallwch <a class="govuk-link" href="/downloads/respondent-answers" download="Respondent-answers">ddarllen eu hymateb yma</a>.`,
    line2: `Rhaid iddynt gyflwyno 'ateb' i'r llys erbyn ${getFormattedDate(
      dayjs(userCase.issueDate).add(config.get('dates.disputeDueDateOffsetDays'), 'day'),
      SupportedLanguages.Cy
    )}. Ffurflen yw hon sy'n esbonio eu rhesymau dros amddiffyn y ${
      isDivorce ? 'cais am ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
    }.`,
    line3: `Os byddant yn cyflwyno'r 'ateb' yna bydd barnwr yn penderfynu sut i fwrw ymlaen. Os na fyddant yn cyflwyno'r ffurflen mewn pryd, yna byddwch yn gallu bwrw ymlaen â'r ${
      isDivorce ? 'cais am ysgariad' : "cais i ddod â'ch partneriaeth sifil i ben"
    }.`,
  },
  d8Submitted: {
    line1: `Mae eich ${partner} wedi ymateb i'ch cais ac wedi dweud eu bod eisiau amddiffyn y ${
      isDivorce ? 'cais am ysgariad' : "cais i ddod â'ch partneriaeth sifil i ben"
    }. Mae hyn yn golygu eu bod eisiau ceisio atal y ${
      isDivorce ? 'cais am ysgariad' : "cais i ddod â'ch partneriaeth sifil i ben"
    }. Gallwch <a class="govuk-link" href="/downloads/respondent-answers" download="Respondent-answers">ddarllen eu hymateb yma</a>.`,
    line2: `Maent wedi cyflwyno eu 'hateb'. Dyma'r ffurflen sy'n esbonio eu rhesymau dros amddiffyn y ${
      isDivorce ? 'cais am ysgariad' : "cais i ddod â'ch partneriaeth sifil i ben"
    }.`,
    line3: `Bydd barnwr yn penderfynu a oes angen i chi a'ch ${partner} fynychu gwrandawiad. Efallai y cysylltir â chi i gael rhagor o wybodaeth i'w helpu i wneud penderfyniad.`,
    line4:
      "Byddwch yn derbyn llythyr yn y post yn dweud wrthych a oes angen i chi ddod i'r gwrandawiad, a ble y bydd hynny yn digwydd.",
  },
  servedByBailiff: {
    line1: `Mae’r beili wedi cyflwyno (danfon) eich ${
      isDivorce ? 'cais am ysgariad' : "cais i ddod â'ch partneriaeth sifil i ben"
    } i’ch ${partner} yn llwyddiannus. Bu iddynt gyflwyno’r dogfennu iddynt ar ${getFormattedDate(
      userCase.alternativeServiceOutcomes?.[0].value.certificateOfServiceDate,
      SupportedLanguages.Cy
    )}.`,
  },
  awaitingConditionalOrder: `Gallwch nawr wneud cais am 'orchymyn amodol'. Mae gorchymyn amodol yn ddogfen sy'n dweud nad yw'r llys yn gweld unrhyw reswm pam na allwch ${
    isDivorce ? 'cael ysgariad' : "ddod â'ch partneriaeth sifil i ben"
  }.`,
  awaitingConditionalOrderAndServedByBailiff: {
    line1: `Mae’r beili wedi cyflwyno (danfon) eich ${
      isDivorce ? 'cais am ysgariad' : "cais i ddod â'ch partneriaeth sifil i ben"
    } i’ch ${partner} yn llwyddiannus. Bu iddynt gyflwyno’r dogfennu iddynt ar ${getFormattedDate(
      userCase.alternativeServiceOutcomes?.[0].value.certificateOfServiceDate,
      SupportedLanguages.Cy
    )}.`,
    line2: `Ni fyddwch yn gweld ymateb eich ${partner} pan fyddwch yn gwneud cais am y gorchymyn amodol.`,
  },
  conditionalOrderWithDeemedOrDispensedService: `Ni fyddwch yn gweld ymateb gan eich ${partner} yn y cais am orchymyn amodol.
   Mae hyn oherwydd na wnaethant ymateb i'ch cais. Gwnaethoch gais i'r llys am ${
     alternativeServiceType === AlternativeServiceType.DISPENSED ? 'gyflwyno tybiedig' : 'i hepgor cyflwyno’r cais'
   }, a gafodd ei gadarnhau. Gallwch `,
  legalAdvisorReferral: {
    switchToSoleCoLine: `You have changed the application to a ‘sole application’. Your ${partner} has been notified by email.`,
    line1: `Rydych wedi gwneud cais am 'orchymyn amodol'. Bydd y llys yn gwirio'ch cais ac yn ei anfon at farnwr. Os yw'r barnwr yn cytuno y dylech ${
      isDivorce ? 'gael ysgariad' : "dod â'ch partneriaeth sifil i ben"
    }, bydd yn rhoi caniatâd i chi gael orchymyn amodol ac yn ei 'gyhoeddi' yn y llys. Byddwch yn cael e-bost erbyn ${getFormattedDate(
      dayjs(userCase.coApplicant1SubmittedDate).add(config.get('dates.awaitingLegalAdvisorReferralOffsetDays'), 'day'),
      SupportedLanguages.Cy
    )} ar ôl i'ch cais gael ei wirio. Bydd hyn yn cael yr amser, y dyddiad a'r llys y bydd eich gorchymyn amodol yn cael ei gyhoeddi.`,
    line2:
      "Ar ôl i'ch gorchymyn amodol gael ei gyhoeddi, yna mae'n rhaid i chi  wneud cais am 'orchymyn terfynol'. Bydd hyn yn cadarnhau eich ysgariad. " +
      "Mae'n rhaid i chi  aros 6 wythnos tan ar ôl eich gorchymyn amodol, i wneud cais am y gorchymyn terfynol.",
  },
  awaitingFinalOrderOrFinalOrderOverdue: {
    line1: `Gallwch nawr wneud cais am 'orchymyn terfynol'. Gorchymyn terfynol yw'r ddogfen a fydd yn dod â'ch ${
      isDivorce ? 'priodas' : 'partneriaeth sifil'
    } i ben yn gyfreithiol.
    Dyma'r cam olaf yn y ${isDivorce ? 'broses ysgaru' : "proses i ddod â'ch partneriaeth sifil i ben"}.`,
    buttonText: 'Gwneud cais am orchymyn terfynol',
    buttonLink: FINALISING_YOUR_APPLICATION,
  },
  readMore: 'Darllenwch fwy am y camau nesaf',
  readMoreSummary: `Mae'n rhaid i chi gwblhau 2 gam arall cyn ${
    isDivorce ? 'y byddwch wedi ysgaru’n gyfreithlon' : 'y bydd eich partneriaeth sifil wedi dod i ben yn gyfreithlon'
  }:`,
  readMoreSteps: {
    step1: {
      heading: 'Gwneud cais am orchymyn amodol',
      body: `Mae hyn yn dangos bod y llys yn cytuno bod gennych hawl i ${
        isDivorce ? 'gael ysgariad' : "dod â'ch partneriaeth sifil i ben"
      }.`,
    },
    step2: {
      heading: 'Gwneud cais am orchymyn terfynol',
      body: `Hwn sy’n dod â’r ${
        isDivorce ? 'briodas' : 'bartneriaeth sifil'
      } i ben yn gyfreithiol. Ni allwch wneud cais am orchymyn terfynol tan 6 wythnos ar ôl y gorchymyn amodol.`,
    },
  },
  moneyAndProperty: {
    part1: `Gallwch ddefnyddio'r amser i benderfynu sut y bydd eich arian a'ch eiddo yn cael eu rhannu. Ymdrinnir â hyn ar wahân i'r ${
      isDivorce ? 'cais am ysgariad' : "cais i ddod â'ch partneriaeth sifil i ben"
    }. `,
    part2: 'Rhagor o wybodaeth am rannu arian ac eiddo',
    link: config.get('govukUrls.moneyAndProperty'),
  },
  finalOrderRequested: {
    applicant2AppliedFirstLine1: `Your ${partner} has applied for a ‘final order’.`,
    applicant2AppliedFirstLine2:
      'A judge will review the application. You will then receive an email telling you what they decide.',
    line1: "Rydych wedi gwneud cais am 'orchymyn terfynol'. Bydd eich cais yn cael ei wirio gan staff y llys.",
    line2: `Os nad oes unrhyw geisiadau eraill y mae angen eu cwblhau yna bydd eich ${
      isDivorce ? 'priodas' : 'partneriaeth sifil'
    } yn dod i ben yn gyfreithiol.`,
    line3: `${
      dayjs().isAfter(userCase.dateFinalOrderNoLongerEligible)
        ? `Byddwch yn cael e-bost erbyn ${getFormattedDate(
            dayjs(userCase.dateFinalOrderSubmitted).add(config.get('dates.finalOrderSubmittedOffsetDays'), 'day'),
            SupportedLanguages.Cy
          )}`
        : 'Dylech gael e-bost o fewn 2 ddiwrnod gwaith,'
    } yn cadarnhau a yw'r gorchymyn terfynol wedi'i gadarnhau.`,
  },
  awaitingServiceConsiderationOrBailiffReferral: {
    line1:
      'Mae eich cais wedi dod i law a bydd yn cael ei adolygu gan farnwr. Byddwch yn cael e-bost yn dweud wrthych a yw eich cais wedi bod yn llwyddiannus ai peidio.',
  },
  serviceApplicationRejected: {
    line1: {
      part1: `Mae'r llys wedi gwrthod eich cais i ${
        alternativeServiceType === AlternativeServiceType.BAILIFF
          ? 'am wasanaeth beili'
          : alternativeServiceType === AlternativeServiceType.DEEMED
            ? 'cyflwyno tybiedig'
            : 'hepgor cyflwyno’r cais'
      }. Gallwch ddarllen y rhesymau ar `,
      part2: 'Orchymyn Gwrthod y llys (PDF)',
      downloadReference: 'Refusal-Order',
      link: `/downloads/${
        alternativeServiceType === AlternativeServiceType.BAILIFF
          ? 'bailiff-service-refused'
          : alternativeServiceType === AlternativeServiceType.DEEMED
            ? 'deemed-service-refused'
            : 'dispense-with-service-refused'
      }`,
    },
    line2: {
      part1: 'Rhagor o wybodaeth am y ',
      part2: `ffyrdd eraill y gallwch symud ymlaen â'ch ${
        isDivorce ? 'cais am ysgariad' : "cais ddod â'ch partneriaeth sifil i ben"
      }.`,
      link: HOW_YOU_CAN_PROCEED,
    },
  },
  bailiffServiceUnsuccessful: {
    line1: `Ceisiodd beili'r llys 'gyflwyno' ${
      isDivorce ? 'papurau’r ysgariad' : "papurau i ddod â'ch partneriaeth sifil i ben"
    } yn y cyfeiriad a ddarparwyd gennych. Yn anffodus, ni lwyddodd y beili i wneud hyn ac felly nid yw eich ${partner} wedi cael y papurau.`,
    line2: {
      part1: 'Darllenwch ',
      part2: 'dystysgrif y gwasanaeth beili',
      part3: ', i weld beth allwch chi ei wneud nesaf.',
      downloadReference: 'Bailiff-certificate',
      link: '/downloads/bailiff-unsuccessful-certificate-of-service',
    },
  },
  awaitingBailiffService: {
    line1: `Roedd eich cais am wasanaeth beili yn llwyddiannus. Bydd beili'r llys yn ceisio cyflwyno ${
      isDivorce ? 'papurau’r ysgariad' : "papurau i ddod â'ch partneriaeth sifil i ben"
    } yn y cyfeiriad a ddarparwyd gennych. Byddwch yn cael hysbysiad arall pan fydd y beili wedi ceisio cyflwyno'r papurau.`,
    line2: {
      part1: 'Lawrlwythwch a ',
      part2: "darllenwch eich ‘cais am wasanaeth beili a gymeradwywyd'",
      downloadReference: 'Bailiff-service-application-approval',
      link: '/downloads/bailiff-service',
    },
  },
  subHeading1:
    userCase.state === State.AwaitingAmendedApplication
      ? 'Yr wybodaeth ddiweddaraf'
      : `${
          userCase.state === State.AwaitingClarification ? 'Beth sydd angen i chi ei wneud' : 'Diweddariad diweddaraf'
        }`,
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
  line5: `Bydd staff y llys yn gwirio eich cais ${isJointApplication ? ' ar y cyd' : ''}${
    userCase.applicant1AlreadyAppliedForHelpPaying === YesOrNo.YES &&
    (!isJointApplication || userCase.applicant2AlreadyAppliedForHelpPaying === YesOrNo.YES) &&
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
    line3: 'Beth sydd angen i chi wneud nesaf',
    line4: 'Darllenwch resymau’r llys dros atal y cais a darparwch yr wybodaeth y gofynnwyd amdani.',
    line5: 'Os gofynnwyd am ddogfennau, byddwch yn gallu eu llwytho i’r llys pan fyddwch yn ymateb.',
    buttonText: 'Darparu gwybodaeth',
    buttonLink: RESPOND_TO_COURT_FEEDBACK,
    line6: 'Byddwn yn rhoi gwybod i chi unwaith y byddwn wedi adolygu’r wybodaeth a ddarparwyd gennych.',
  },
  respondedToRequestForInformation: {
    line1: 'Rydych wedi ymateb i’r llys.',
    line2: `Bydd eich cais yn cael ei wirio gan staff y llys. Fe gewch neges e-bost erbyn ${dateOfCourtReplyToRequestForInformationResponse} yn cadarnhau p’un a yw wedi’i dderbyn. Gwiriwch eich ffolder ‘junk’ neu ‘spam’.`,
    line3: `Yna fe anfonir copi o’r cais at eich ${partner}. Fe ofynnir iddynt wirio’r wybodaeth ac ymateb. Os na fyddant yn ymateb, fe ddywedir wrthych beth allwch ei wneud nesaf i symud y cais yn ei flaen.`,
    line4: `Os ydych eisiau ‘cyflwyno’ (anfon) y dogfennau at eich ${partner} eich hun, yna ffoniwch ${telephoneNumber} i ofyn am gael gwneud hynny. Fel arall, bydd y llys yn gwneud hyn ar eich rhan.`,
    line5: `Os ydych eisiau i’r llys gyflwyno (anfon) y cais i’w gyflwyno drwy’r post yn hytrach na drwy e-bost, ffoniwch ${telephoneNumber}.`,
  },
  awaitingRequestedInformation: {
    line1:
      'Rydych wedi dweud wrthym na allwch lwytho rhai neu’r cyfan o’ch dogfennau.  Ni allwn symud eich cais yn ei flaen hyd nes y byddwn wedi’u derbyn.',
    line2: 'Beth sydd angen i chi wneud nesaf',
    line3: 'Rydym wedi anfon e-bost atoch gyda manylion ar sut i anfon eich dogfennau.',
    line4: 'Gallwch ',
    formLinkText: 'lwytho eich dogfennau gan ddefnyddio ein ffurflen ar-lein',
    line4a: ', neu eu hanfon drwy’r post ynghyd â dalen flaen gyda chyfeirnod eich achos.',
    line5: 'Byddwn wedyn yn adolygu eich ymateb',
  },
  informationRequestedFromOther: {
    line1: `Mae’r llys wedi adolygu eich cais am ${
      isDivorce ? 'ysgariad' : 'ddiddymiad'
    }. Rydym wedi anfon neges e-bost at drydydd parti gyda’r wybodaeth y mae’r llys ei hangen.`,
    line2:
      'Bydd y llys yn adolygu’r wybodaeth gan y trydydd parti unwaith y bydd wedi dod i law, ac yna gall y cais barhau.',
  },
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const { userCase, language } = content;
  const isDisputedApplication = userCase.disputeApplication === YesOrNo.YES;
  const isSuccessfullyServedByBailiff =
    userCase.alternativeServiceOutcomes?.[0].value.successfulServedByBailiff === YesOrNo.YES;
  const isDeemedOrDispensedApplication = userCase.alternativeServiceOutcomes?.find(
    alternativeServiceOutcome =>
      alternativeServiceOutcome.value.alternativeServiceType === AlternativeServiceType.DEEMED ||
      alternativeServiceOutcome.value.alternativeServiceType === AlternativeServiceType.DISPENSED
  );
  const isClarificationDocumentsUploaded = userCase.coCannotUploadClarificationDocuments !== Checkbox.Checked;
  const alternativeServiceType = userCase.alternativeServiceOutcomes?.[0].value
    .alternativeServiceType as AlternativeServiceType;
  const isAlternativeService = !!alternativeServiceType;
  const displayState = currentStateFn(userCase.state).at(
    (userCase.state === State.OfflineDocumentReceived ? userCase.previousState : userCase.state) as State
  );
  const latestRequestForInformation = userCase.requestsForInformation?.at(0)?.value;
  const isApplicantAbleToRespondToRequestForInformation =
    latestRequestForInformation?.requestForInformationSoleParties === 'applicant';
  const dateOfCourtReplyToRequestForInformationResponse =
    getFormattedDate(
      dayjs(
        latestRequestForInformation?.requestForInformationResponses?.at(0)?.value.requestForInformationResponseDateTime
      ).add(config.get('dates.requestForInformationResponseCourtReplyOffsetDays'), 'day')
    ) || '';
  const theLatestUpdateTemplate = getSoleHubTemplate(
    displayState,
    userCase,
    isSuccessfullyServedByBailiff,
    isAlternativeService,
    isApplicantAbleToRespondToRequestForInformation
  );
  const isSwitchToSoleCoApp = userCase.switchedToSoleCo === YesOrNo.YES;
  const hasApplicant1AppliedForFinalOrderFirst = userCase.applicant1AppliedForFinalOrderFirst === YesOrNo.YES;
  const isFinalOrderCompleteState = userCase.state === State.FinalOrderComplete;
  const cannotUploadDocuments = new Set([
    ...(userCase.applicant1CannotUploadDocuments || []),
    ...(userCase.applicant2CannotUploadDocuments || []),
  ]);
  const isRespondentOverseas = !isCountryUk(userCase.applicant2AddressCountry);
  const isRespondentRepresented = userCase.applicant1IsApplicant2Represented === Applicant2Represented.YES;
  return {
    ...languages[language](content, alternativeServiceType, dateOfCourtReplyToRequestForInformationResponse),
    displayState,
    isDisputedApplication,
    isSuccessfullyServedByBailiff,
    isDeemedOrDispensedApplication,
    isClarificationDocumentsUploaded,
    isAlternativeService,
    theLatestUpdateTemplate,
    isSwitchToSoleCoApp,
    hasApplicant1AppliedForFinalOrderFirst,
    isFinalOrderCompleteState,
    isApplicantAbleToRespondToRequestForInformation,
    dateOfCourtReplyToRequestForInformationResponse,
    cannotUploadDocuments,
    isRespondentOverseas,
    isRespondentRepresented,
  };
};
