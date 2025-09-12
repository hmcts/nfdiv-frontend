import config from 'config';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';

import { getFormattedDate } from '../../../../app/case/answers/formatDate';
import { Checkbox } from '../../../../app/case/case';
import {
  AlternativeServiceType,
  Applicant2Represented,
  DocumentType,
  InterimApplicationType,
  NoResponsePartnerNewEmailOrAddress,
  NoResponseSendPapersAgainOrTrySomethingElse,
  State,
  YesOrNo,
} from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { SupportedLanguages } from '../../../../modules/i18n';
import { isCountryUk } from '../../../applicant1Sequence';
import type { CommonContent } from '../../../common/common.content';
import { getAddressFields } from '../../../common/content.utils';
import { currentStateFn } from '../../../state-sequence';
import {
  ALTERNATIVE_SERVICE_APPLICATION,
  BAILIFF_SERVICE_APPLICATION,
  DEEMED_SERVICE_APPLICATION,
  DISPENSE_SERVICE_APPLICATION,
  FINALISING_YOUR_APPLICATION,
  OPTIONS_FOR_PROGRESSING,
  OWN_SEARCHES,
  PAY_YOUR_GENERAL_APPLICATION_FEE,
  PAY_YOUR_SERVICE_FEE,
  PROCESS_SERVER,
  PROCESS_SERVER_DOCS,
  RESPOND_TO_COURT_FEEDBACK,
  SEARCH_GOV_RECORDS_APPLICATION,
  WITHDRAW_SERVICE_APPLICATION,
} from '../../../urls';
import { generateContent as generalApplicationSubmittedContent } from '../../interim-applications/general-application-submitted/content';
import { generateContent as serviceApplicationSubmittedContent } from '../../interim-applications/service-application-submitted/content';

import { getSoleHubTemplate } from './soleTemplateSelector';

const en = (
  {
    applicationHasBeenPaidFor,
    isDivorce,
    partner,
    userCase,
    telephoneNumber,
    referenceNumber,
    isJointApplication,
    serviceApplicationType,
    serviceApplicationDate,
    serviceApplicationResponseDate,
    generalApplicationType,
    generalApplicationDate,
    generalApplicationResponseDate,
    serviceApplicationFeeRequired,
    serviceApplicationDocsAllProvided,
    interimApplicationType,
  }: CommonContent,
  alternativeServiceType: AlternativeServiceType,
  dateOfCourtReplyToRequestForInformationResponse: string,
  respondentAddressProvided: boolean
) => ({
  aosAwaiting: {
    line1:
      userCase.state === State.AwaitingHWFEvidence
        ? 'Your application will be checked by court staff. You will receive an email notification confirming whether it has been accepted. Check your junk or spam email folder.'
        : `Your application ${
            userCase.applicant1AlreadyAppliedForHelpPaying === YesOrNo.YES && !applicationHasBeenPaidFor
              ? 'and help with fees reference number '
              : ''
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
  contactDetailsUpdated: {
    line1: `You have updated your ${partner}’s contact details.`,
    line2: `The court will now serve your ${
      isDivorce ? 'divorce' : 'application to end your civil partnership'
    } papers again using the new contact details you have provided.`,
    line3: `Your ${partner} will have ${config.get(
      'dates.interimApplicationNoResponseNewContactDetailsOffsetDays'
    )} days from receiving the ${
      isDivorce ? 'divorce' : 'application to end your civil partnership'
    } papers to respond. If your ${partner} does not respond, we will help you explore the other options you have to progress your ${
      isDivorce ? 'divorce application' : 'application to end your civil partnership'
    }.`,
  },
  contactDetailsUpdatedOverseasAddress: {
    line1: `You will need to arrange delivery of the ${
      isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
    } to your ${partner} yourself. This is because the courts of England and Wales do not have legal power (jurisdiction) in the country where they live.`,
    whatNeedToDo: 'What you need to do',
    line2: `You may wish to seek legal advice on how to serve the papers in the country your ${partner} is living in.`,
    line3: `You will receive a letter from HMCTS, which contains documents that need to be sent to your ${partner}. It’s called the ‘Notice of Proceedings’.`,
    line4: `Post the ‘Notice of Proceedings’ to your ${partner}. Make sure you use a delivery service which provides proof of delivery.`,
    line5: `Keep the proof of delivery so you can show that the papers have been ‘served’ (sent) to your ${partner}.`,
    line6: 'They should then respond to the application',
    line7: `The amount of time your ${partner} has to respond depends on the country they’re living in. If they do not respond, we will help you explore the other options you have to progress your ${
      isDivorce ? 'divorce application' : 'application to end your civil partnership'
    }.`,
  },
  interimApplicationsSaveAndSignOut: {
    line1: `Your ${partner} has not responded to your ${
      isDivorce ? 'divorce application' : 'application to end your civil partnership'
    }.`,
    line2: `You have started a ${interimApplicationType} application.`,
    line3: `You can continue with your ${interimApplicationType} application.`,
    line4: `If your circumstances have changed or you want to try something else, you can <a href=${OPTIONS_FOR_PROGRESSING} class="govuk-link">view your options to proceed with your ${
      isDivorce ? 'divorce application' : 'application to end your civil partnership'
    }</a>.`,
    line5: 'If you begin a new application, your current draft application will be deleted.',
    whatYouCanDoNext: 'What you can do next',
    completeApplication: 'Complete application',
  },
  aosDrafted: {
    line1: `Your ${partner} has started drafting a response to your application.`,
    line2:
      'If they do not complete the response and submit it then you will be told what you can do next to progress the application.',
  },
  aosDue: {
    line1: `Your ${partner} has not responded to your ${
      isDivorce ? 'divorce application' : 'application to end your civil partnership'
    }.`,
    line2: "They can still respond, even though it's past the date when they should have responded.",
    line3: `The simplest way to progress your application is to wait for your ${partner} to respond. You can contact them to remind them if it is safe to do so.`,
    line4:
      'If you cannot contact them or do not think they will respond, there are a number of ways to progress your application without needing a response from them.',
    linkText: 'View your options for proceeding without a response from the respondent.',
    linkUrl: `${respondentAddressProvided ? OPTIONS_FOR_PROGRESSING : OWN_SEARCHES}`,
  },
  aosDueAndDrafted: {
    line1: `Your ${partner} has not submitted their response to your ${
      isDivorce ? 'divorce application' : 'application to end your civil partnership'
    }. They should have responded by ${getFormattedDate(userCase.dueDate)}.`,
    line2: `You may wish to use this to prove that your ${partner} has received your application.`,
    doNext: 'What you can do next',
    line3: `The simplest way to progress your application is for your ${partner} to submit their response. You can contact them and ask them to submit their response, if it is safe to do so.`,
    line4: `Alternatively, you can view your options for proceeding with your ${
      isDivorce ? 'divorce' : 'application to end your civil partnership'
    } without needing a response.`,
    linkText: 'View your options for proceeding without a response from the respondent.',
    linkUrl: `${respondentAddressProvided ? OPTIONS_FOR_PROGRESSING : OWN_SEARCHES}`,
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
    line1: `The court is currently considering your ${
      userCase.alternativeServiceType === AlternativeServiceType.BAILIFF
        ? `request for ${serviceApplicationType}`
        : `${serviceApplicationType} application`
    } that you submitted on ${serviceApplicationDate}.`,
    line2: `We will email you ${
      serviceApplicationFeeRequired && serviceApplicationDocsAllProvided ? `by ${serviceApplicationResponseDate} ` : ''
    }once a decision has been made to tell you your next steps.`,
  },
  serviceAdminRefusalOrBailiffRefusal: {
    line1: 'The court is currently considering your service application.',
    line2: 'We will email you once a decision has been made to tell you your next steps.',
  },
  awaitingConsiderationSearchGovRecords: {
    line1: `The court is currently considering your search government records application that you submitted on ${generalApplicationDate}.`,
    line2: `We will email you by ${generalApplicationResponseDate} once a decision has been made to tell you your next steps.`,
  },
  serviceApplicationRejected: {
    line1: {
      part1: `The court has refused your application ${
        alternativeServiceType === AlternativeServiceType.BAILIFF
          ? 'for bailiff'
          : alternativeServiceType === AlternativeServiceType.DEEMED
            ? 'for deemed'
            : alternativeServiceType === AlternativeServiceType.ALTERNATIVE_SERVICE
              ? 'for alternative'
              : 'to dispense with'
      } service. You can read the reasons on the court’s `,
      part2: 'Refusal Order (PDF)',
      downloadReference: 'Refusal-Order',
      link: `/downloads/${
        alternativeServiceType === AlternativeServiceType.BAILIFF
          ? 'bailiff-service-refused'
          : alternativeServiceType === AlternativeServiceType.DEEMED
            ? 'deemed-service-refused'
            : alternativeServiceType === AlternativeServiceType.ALTERNATIVE_SERVICE
              ? 'alternative-service-refused'
              : 'dispense-with-service-refused'
      }`,
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
  awaitingServicePayment: {
    line1OfflineApplication:
      'Your application for service has been received. You need to pay the service application fee before it can be referred to a judge to consider your request. The court will contact you on how payment can be made.',
    line1: `Your ${partner} has not responded to your ${
      isDivorce ? 'divorce application' : 'application to end your civil partnership'
    }.`,
    line2: `You have have started a ${serviceApplicationType} application.`,
    doNext: 'What you can do next',
    line3: 'You need to pay the service application fee before it can be referred to a judge to consider your request.',
    linkText: 'Complete payment',
    linkUrl: PAY_YOUR_SERVICE_FEE,
    withdrawText: `If your circumstances have changed or you want to try something else, you can withdraw this ${serviceApplicationType} application after which you can view your options to proceed with your ${
      isDivorce ? 'divorce application' : 'application to end your civil partnership'
    }.`,
    withdrawLinkText: 'I want to withdraw this application',
    withdrawLinkUrl: WITHDRAW_SERVICE_APPLICATION,
  },
  awaitingGeneralApplicationPayment: {
    line1: `Your ${partner} has not responded to your ${
      isDivorce ? 'divorce application' : 'application to end your civil partnership'
    }.`,
    line2: `You have have started a ${generalApplicationType} application.`,
    doNext: 'What you can do next',
    line3: 'You need to pay the general application fee before it can be referred to a judge to consider your request.',
    linkText: 'Complete payment',
    linkUrl: PAY_YOUR_GENERAL_APPLICATION_FEE,
  },
  awaitingServiceApplicationDocuments: {
    heading1: 'Send your evidence to the court',
    line1: 'You now need to send us your documents. You can do this in the following ways:',
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
    line3:
      'You can also see the information that the court needs on the next page after you select "Provide information".',
    line4: 'What you need to do next',
    line5: 'Read the court’s reasons for stopping the application and provide the requested information.',
    line6: 'If documents have been requested, you will be able to upload them to the court when you respond.',
    buttonText: 'Provide information',
    buttonLink: RESPOND_TO_COURT_FEEDBACK,
    line7: 'We will let you know once we have reviewed the information you provided.',
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
  sendPapersAgain: {
    line1: `You have asked the court to send the ${
      isDivorce ? 'divorce' : 'application to end your civil partnership'
    } papers again to your ${partner}.`,
    line2: `The court will now send the ${
      isDivorce ? 'divorce' : 'application to end your civil partnership'
    } papers to your ${partner} again using the postal address and any email addresses you provided before. The papers will be sent to the address by first class post, and will be sent by email now, if applicable.`,
    whatsNext: 'What happens next',
    line3: `Your ${partner} will have ${config.get(
      'dates.interimApplicationNoResponseNewContactDetailsOffsetDays'
    )} days to respond. We will email you if your ${partner} still does not respond. You will then be able to try another way to progress your ${
      isDivorce ? 'divorce application' : 'application to end your civil partnership'
    }.`,
  },
  awaitingProcessServerService: {
    line1: `You have chosen to arrange for an independent process server to serve the papers on your ${partner}.`,
    line2: `You can <a class="govuk-link" href="${PROCESS_SERVER_DOCS}">download the papers from the documents tab</a>. You will need to print these out and give them to your process server.`,
    whatYouNeedToDoHeader: 'What you need to do',
    steps: {
      one: 'You will need to find and employ a process server. You may wish to consider how many times they will attempt to serve, over what period of time, and at what times of the day.',
      two: `They will attempt to serve the papers on your ${partner}.`,
      three:
        'If they serve successfully, they will complete the certificate of service form (form FP6) and send it to you.',
      four: 'You will then need to send the certificate of service to the court.',
      five: `If the papers have been correctly served and your ${partner} still has not responded, your ${
        isDivorce ? 'divorce' : 'application to end your civil partnership'
      } can continue without their response.`,
    },
    line3: `If they fail to serve, you may be able to apply for alternative service by letterbox if your ${partner}’s address is confirmed. Otherwise, you will need to try another way to serve the papers.`,
    line4: `You can <a class="govuk-link" href="${OPTIONS_FOR_PROGRESSING}">view your other options for progressing your ${
      isDivorce ? 'divorce' : 'application to end your civil partnership'
    }</a> if you later decide that you no longer want to arrange service by a process server.`,
  },
});

// @TODO translations
const cy: typeof en = (
  {
    applicationHasBeenPaidFor,
    isDivorce,
    partner,
    userCase,
    telephoneNumber,
    referenceNumber,
    isJointApplication,
    serviceApplicationType,
    generalApplicationType,
    serviceApplicationResponseDate,
    generalApplicationDate,
    generalApplicationResponseDate,
    serviceApplicationFeeRequired,
    serviceApplicationDocsAllProvided,
    serviceApplicationDate,
    interimApplicationType,
  }: CommonContent,
  alternativeServiceType: AlternativeServiceType,
  dateOfCourtReplyToRequestForInformationResponse: string,
  respondentAddressProvided: boolean
) => ({
  aosAwaiting: {
    line1: `Bydd eich cais ar y cyd yn cael ei wirio gan staff y llys. Byddwch yn derbyn hysbysiad drwy e-bost yn cadarnhau
    ${
      userCase.state !== State.AwaitingHWFEvidence
        ? ' p’un ' +
          getFormattedDate(dayjs(userCase.dateSubmitted).add(config.get('dates.applicationSubmittedOffsetDays'), 'day'))
        : ''
    } a yw wedi'i dderbyn. Gwiriwch eich ffolder 'junk' neu 'spam'.`,
    line2: `Yna fe anfonir copi o’r cais at eich ${partner}. Fe ofynnir iddynt wirio’r wybodaeth ac ymateb. Os na fyddant yn ymateb, fe ddywedir wrthych beth allwch ei wneud nesaf i symud y cais yn ei flaen.`,
    line3: `Os ydych eisiau ‘cyflwyno’ (anfon) y dogfennau at eich ${partner} eich hun, yna ffoniwch ${telephoneNumber} i ofyn am gael gwneud hynny. Fel arall, bydd y llys yn gwneud hyn ar eich rhan.`,
    line4: `Os ydych eisiau i’r llys gyflwyno (anfon) y cais i’w gyflwyno drwy’r post yn hytrach na drwy e-bost, ffoniwch ${telephoneNumber}.`,
    line5: `Mae’r cyfeiriad rydych wedi’i ddarparu ar gyfer eich ${partner} y tu allan i Gymru a Lloegr. Mae hynny’n golygu mai chi sy’n gyfrifol am ‘gyflwyno’ (anfon) dogfennau’r llys, sy’n hysbysu’ch ${partner} am yr ysgariad.`,
    line6: `Fe gewch y dogfennau y bydd angen i chi eu hanfon at eich ${partner} drwy e-bost a llythyr, ar ôl i’r cais gael ei wirio.`,
    line7: `Bydd y llys yn cysylltu â chyfreithiwr eich ${partner} ac yn gofyn iddynt gadarnhau eu bod yn eu cynrychioli. Fe anfonir copi o’r cais atynt ac fe ofynnir iddynt ymateb.`,
  },
  contactDetailsUpdated: {
    line1: `Rydych wedi diweddaru manylion cyswllt eich ${partner}.`,
    line2: `Bydd y llys nawr yn cyflwyno papurau eich ${
      isDivorce ? 'ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
    } eto gan ddefnyddio’r manylion cyswllt newydd a ddarparwyd gennych.`,
    line3: `Bydd gan eich ${partner} ${config.get(
      'dates.interimApplicationNoResponseNewContactDetailsOffsetDays'
    )} diwrnod o pan fyddant yn cael papurau’r ${
      isDivorce ? 'ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
    } i ymateb. Os nad yw eich ${partner} yn ymateb, byddwn yn eich helpu i archwilio’r dewisiadau eraill sydd gennych i ddatblygu eich ${
      isDivorce ? 'cais ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
    }.`,
  },
  contactDetailsUpdatedOverseasAddress: {
    line1: `Bydd angen i chi drefnu bod papurau’r ${
      isDivorce ? 'ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
    } yn cael eu danfon i’ch ${partner} eich hun. Y rheswm dros hyn yw oherwydd nid oes gan lysoedd Cymru a Lloegr bŵer cyfreithiol (awdurdodaeth) yn y wlad ble maent yn byw.`,
    whatNeedToDo: 'Beth sydd angen i chi ei wneud',
    line2: `Mae’n bosibl y byddwch yn dymuno ceisio cyngor cyfreithiol ar sut i gyflwyno’r papurau yn y wlad lle mae eich ${partner} yn byw.`,
    line3: `Fe gewch lythyr gan GLlTEF, a fydd yn cynnwys dogfennau y mae angen i chi eu hanfon at eich ${partner}. Gelwir hyn yn ‘Rhybudd o Achos’.`,
    line4: `Anfonwch y ‘Rhybudd o Achos’  at eich ${partner}. Gwnewch yn siŵr eich bod yn defnyddio gwasanaeth danfon sy’n darparu tystiolaeth ei fod wedi’i ddanfon.`,
    line5: `Cadwch y dystiolaeth ei fod wedi’i ddanfon fel eich bod yn gallu dangos bod y papurau wedi cael eu ‘cyflwyno’ (anfon) at eich ${partner}.`,
    line6: 'Yna, dylent ymateb i’r cais.',
    line7: `Mae faint o amser sydd gan eich ${partner} i ymateb yn dibynnu ar y wlad ble maent yn byw. Os nad ydynt yn ymateb, byddwn yn eich helpu i archwilio’r dewisiadau eraill i symud ymlaen gyda’ch ${
      isDivorce ? 'cais am ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
    }.`,
  },
  interimApplicationsSaveAndSignOut: {
    line1: `Nid yw eich ${partner} wedi ymateb i’ch ${
      isDivorce ? 'cais am ysgariad' : "cais i ddod â'ch partneriaeth sifil i ben"
    }.`,
    line2: `Rydych wedi dechrau cais ${interimApplicationType}.`,
    line3: `Gallwch barhau gyda’ch cais ${interimApplicationType}.`,
    line4: `Os yw eich amgylchiadau wedi newid neu os ydych am roi cynnig ar rywbeth arall, gallwch <a href=${OPTIONS_FOR_PROGRESSING} class="govuk-link">weld eich opsiynau i fwrw ymlaen â'ch cais ${
      isDivorce ? 'am ysgariad' : "i ddod â'ch partneriaeth sifil i ben"
    }</a>.`,
    line5: 'Os ydych yn dechrau cais newydd, bydd eich cais drafft presennol yn cael ei ddileu.',
    whatYouCanDoNext: 'Beth allwch chi ei wneud nesaf',
    completeApplication: 'Cwblhau’r cais',
  },
  aosDrafted: {
    line1: `Mae ${partner} wedi dechrau drafftio ymateb i’ch cais.`,
    line2:
      'Os na fyddant yn cwblhau’r ymateb ac yn ei gyflwyno, fe ddywedir wrthych beth allwch ei wneud nesaf i symud y cais yn ei flaen.',
  },
  aosDue: {
    line1: `Nid yw eich ${partner} wedi ymateb i’ch ${
      isDivorce ? 'cais am ysgariad' : "cais i ddod â'ch partneriaeth sifil i ben"
    }.`,
    line2: '', //INSERT TRANSLATION
    line3: `Y ffordd symlaf i symud eich cais yn ei flaen yw i’ch ${partner} ymateb. Gallant dal ymateb, er bod y dyddiad erbyn pryd y dylent ymateb wedi pasio. Gallwch gysylltu â nhw i’w hatgoffa, os yw’n ddiogel i chi wneud hynny.`,
    line4:
      'Fodd bynnag, os na allwch gysylltu â nhw neu os nad ydych chi’n meddwl y byddant yn ymateb, mae yna sawl ffordd i symud eich cais yn ei flaen heb fod angen ymateb ganddynt.',
    linkText: 'Gweld eich opsiynau ar gyfer bwrw ymlaen heb ymateb gan yr atebydd.',
    linkUrl: `${respondentAddressProvided ? OPTIONS_FOR_PROGRESSING : OWN_SEARCHES}`,
  },
  aosDueAndDrafted: {
    line1: `Mae eich ${partner} wedi cyflwyno eu hymateb i’ch ${
      isDivorce ? 'cais am ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
    }. Dylai bod nhw wedi ymateb erbyn ${getFormattedDate(userCase.dueDate, SupportedLanguages.Cy)}.`,
    line2: `Efallai yr hoffech ddefnyddio hwn i brofi bod eich ${partner} wedi cael eich cais.`,
    doNext: 'Beth allwch chi ei wneud nesaf',
    line3: `Y ffordd symlaf i symud eich cais yn ei flaen yw i’ch ${partner} gyflwyno eu hymateb. Gallwch gysylltu â nhw a gofyn iddynt gyflwyno eu hymateb, os yw’n ddiogel i chi wneud hynny.`,
    line4: `Fel arall, gallwch edrych ar eich opsiynau i barhau â’ch ${
      isDivorce ? 'ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
    } heb fod angen ymateb.`,
    linkText: 'Gweld eich opsiynau ar gyfer bwrw ymlaen heb ymateb gan yr atebydd.',
    linkUrl: `${respondentAddressProvided ? OPTIONS_FOR_PROGRESSING : OWN_SEARCHES}`,
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
  awaitingConsiderationSearchGovRecords: {
    line1: `The court is currently considering your search government records application that you submitted on ${generalApplicationDate}.`,
    line2: `We will email you by ${generalApplicationResponseDate} once a decision has been made to tell you your next steps.`,
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
    line1: `Mae'r llys wrthi’n ystyried eich hysbysiad o ${serviceApplicationType} a gyflwynwyd gennych ar ${serviceApplicationDate}.`,
    line2: `Byddwn yn anfon e-bost atoch ${
      serviceApplicationFeeRequired && serviceApplicationDocsAllProvided
        ? `erbyn ${serviceApplicationResponseDate} `
        : ''
    }unwaith y bydd penderfyniad wedi'i wneud i ddweud wrthych beth yw’r camau nesaf.`,
  },
  serviceAdminRefusalOrBailiffRefusal: {
    line1: "Mae'r llys ar hyn o bryd yn ystyried eich cais am gyflwyno.",
    line2:
      "Byddwn yn anfon e-bost atoch unwaith y bydd penderfyniad wedi'i wneud i ddweud wrthych beth yw’r camau nesaf.",
  },
  serviceApplicationRejected: {
    line1: {
      part1: `Mae'r llys wedi gwrthod eich cais i ${
        alternativeServiceType === AlternativeServiceType.BAILIFF
          ? 'am wasanaeth beili'
          : alternativeServiceType === AlternativeServiceType.DEEMED
            ? 'cyflwyno tybiedig'
            : alternativeServiceType === AlternativeServiceType.ALTERNATIVE_SERVICE
              ? 'ar cyflwyno amgen'
              : 'hepgor cyflwyno’r cais'
      }. Gallwch ddarllen y rhesymau ar `,
      part2: 'Orchymyn Gwrthod y llys (PDF)',
      downloadReference: 'Refusal-Order',
      link: `/downloads/${
        alternativeServiceType === AlternativeServiceType.BAILIFF
          ? 'bailiff-service-refused'
          : alternativeServiceType === AlternativeServiceType.DEEMED
            ? 'deemed-service-refused'
            : alternativeServiceType === AlternativeServiceType.ALTERNATIVE_SERVICE
              ? 'dispense-with-service-refused'
              : 'alternative-service-refused'
      }`,
    },
  },
  awaitingServiceApplicationDocuments: {
    heading1: 'Anfon eich tystiolaeth i’r llys',
    line1: 'Nawr mae arnoch angen anfon eich dogfennau atom. Gallwch wneud hyn trwy un o’r ffyrdd canlynol:',
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
  awaitingServicePayment: {
    // TODO: Welsh for AwaitingServicePayment hub
    line1OfflineApplication:
      "Mae eich cais am wasanaeth wedi'i dderbyn. Mae angen i chi dalu'r ffi cais am wasanaeth cyn y gellir ei gyfeirio at farnwr i ystyried eich cais. Bydd y llys yn cysylltu â chi ynghylch sut y gellir talu.",
    line1: `Your ${partner} has not responded to your ${
      isDivorce ? 'divorce application' : 'application to end your civil partnership'
    }.`,
    line2: `You have have started a ${serviceApplicationType} application.`,
    doNext: 'Beth allwch chi ei wneud nesaf',
    line3: 'You need to pay the service application fee before it can be referred to a judge to consider your request.',
    linkText: 'Complete payment',
    linkUrl: PAY_YOUR_SERVICE_FEE,
    withdrawText: `Os yw’ch amgylchiadau wedi newid neu os ydych am roi cynnig ar rywbeth arall, gallwch dynnu’r cais hwn yn ôl ac ar ôl hynny gallwch wirio eich opsiynau i fwrw ymlaen â'ch ${
      isDivorce ? 'cais am ysgariad' : "cais i ddod â'ch partneriaeth sifil i ben"
    }.`,
    withdrawLinkText: "Rwyf eisiau tynnu'r cais hwn yn ôl",
    withdrawLinkUrl: WITHDRAW_SERVICE_APPLICATION,
  },
  awaitingGeneralApplicationPayment: {
    line1: `Your ${partner} has not responded to your ${
      isDivorce ? 'divorce application' : 'application to end your civil partnership'
    }.`,
    line2: `You have have started a ${generalApplicationType} application.`,
    doNext: 'What you can do next',
    line3: 'You need to pay the general application fee before it can be referred to a judge to consider your request.',
    linkText: 'Complete payment',
    linkUrl: PAY_YOUR_GENERAL_APPLICATION_FEE,
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
    line3:
      'Gallwch hefyd weld yr wybodaeth mae’r llys ei hangen ar y dudalen nesaf ar ôl i chi ddewis “Darparu Gwybodaeth”.',
    line4: 'Beth sydd angen i chi wneud nesaf',
    line5: 'Darllenwch resymau’r llys dros atal y cais a darparwch yr wybodaeth y gofynnwyd amdani.',
    line6: 'Os gofynnwyd am ddogfennau, byddwch yn gallu eu llwytho i’r llys pan fyddwch yn ymateb.',
    buttonText: 'Darparu gwybodaeth',
    buttonLink: RESPOND_TO_COURT_FEEDBACK,
    line7: 'Byddwn yn rhoi gwybod i chi unwaith y byddwn wedi adolygu’r wybodaeth a ddarparwyd gennych.',
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
  sendPapersAgain: {
    line1: `Rydych wedi gofyn i’r llys anfon papurau’r ${
      isDivorce ? 'ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
    } eto at eich ${partner}.`,
    line2: `Bydd y llys nawr yn anfon papurau’r ${
      isDivorce ? 'ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
    } at eich ${partner} eto gan ddefnyddio’r cyfeiriad post ac unrhyw gyfeiriadau e-bost a ddarparwyd gennych yn flaenorol. Bydd y papurau’n cael eu hanfon i’r cyfeiriad drwy’r post dosbarth cyntaf, a drwy e-bost nawr, os yw hynny’n berthnasol.`,
    whatsNext: 'Beth fydd yn digwydd nesaf',
    line3: `Bydd gan eich ${partner} ${config.get(
      'dates.interimApplicationNoResponseNewContactDetailsOffsetDays'
    )} diwrnod i ymateb. Byddwn yn anfon neges e-bost atoch os na fydd eich ${partner} yn ymateb. Yna byddwch yn gallu ceisio gwneud rhywbeth arall i symud eich ${
      isDivorce ? 'cais am ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
    } yn ei flaen.`,
  },
  awaitingProcessServerService: {
    line1: `Rydych wedi dewis trefnu i weinyddwr proses annibynnol gyflwyno’r papurau ar eich ${partner}.`,
    line2: `Gallwch <a class="govuk-link" href="${PROCESS_SERVER_DOCS}">lawrlwytho’r papurau o’r tab dogfennau</a>. Bydd angen i chi argraffu’r rhain a’u rhoi i’ch gweinyddwr pros.`,
    whatYouNeedToDoHeader: 'Beth sydd angen i chi ei wneud',
    steps: {
      one: 'Bydd angen i chi ddod o hyd i weinyddwr proses a’u penodi. Efallai yr hoffech ystyried faint o weithiau y byddant yn ceisio cyflwyno’r papurau, dros pa gyfnod o amser ac am ba amser o’r dydd.',
      two: `Byddant yn ceisio cyflwyno’r papurau ar eich ${partner}.`,
      three:
        'Os byddant yn cyflwyno’r papurau’n llwyddiannus, byddant yn llenwi tystysgrif cyflwyno (ffurflen FP6) a’i hanfon atoch.',
      four: 'Bydd angen i chi wedyn anfon y dystysgrif cyflwyno i’r llys.',
      five: `Os bydd y papurau wedi’u cyflwyno’n gywir a bod eich ${partner} dal heb ymateb, gall eich ${
        isDivorce ? 'ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
      } barhau heb eu hymateb.`,
    },
    line3: `Os byddant yn methu â chyflwyno’r papurau, efallai y gallwch wneud cais am gyflwyno amgen drwy flwch llythyrau, os yw cyfeiriad eich ${partner} wedi’i gadarnhau. Fel arall, bydd angen i chi gyflwyno’r papurau mewn rhyw ffordd arall.`,
    line4: `Gallwch <a class="govuk-link" href="${OPTIONS_FOR_PROGRESSING}">weld eich dewisiadau eraill ar gyfer symud ymlaen gyda’ch ${
      isDivorce ? 'ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
    }</a> os byddwch yn penderfynu’n ddiweddarach nad ydych eisiau trefnu i’r papurau gael eu cyflwyno gan weinyddwr proses.`,
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
  const isAwaitingProcessServerService =
    userCase.state === State.AwaitingService &&
    userCase.applicant1InterimApplicationType === InterimApplicationType.PROCESS_SERVER_SERVICE;
  const theLatestUpdateTemplate = getSoleHubTemplate(
    displayState,
    userCase,
    isSuccessfullyServedByBailiff,
    isAlternativeService,
    isApplicantAbleToRespondToRequestForInformation,
    isAwaitingProcessServerService
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
  const isAosSubmitted = !isEmpty(userCase.dateAosSubmitted);
  const aosIsDrafted = userCase.aosIsDrafted === YesOrNo.YES;
  const aosOverdueAndDrafted =
    aosIsDrafted &&
    !userCase.aosStatementOfTruth &&
    userCase.issueDate &&
    dayjs(userCase.issueDate).add(16, 'days').isBefore(dayjs());
  const respondentAddressProvided: boolean = getAddressFields('applicant2', userCase).some(
    field => field && field.length > 0
  );
  const contactDetailsUpdatedUKBased =
    userCase.applicant1NoResponsePartnerNewEmailOrAddress ===
      NoResponsePartnerNewEmailOrAddress.CONTACT_DETAILS_UPDATED && userCase.applicant2AddressOverseas !== YesOrNo.YES;
  const applicant1NoResponseSendPapersAgain =
    userCase.applicant1NoResponseSendPapersAgainOrTrySomethingElse ===
    NoResponseSendPapersAgainOrTrySomethingElse.PAPERS_SENT;
  const isSearchGovRecordsFeeRequired = content.generalApplicationFeeRequired;

  const interimApplicationStartPagePath = (() => {
    switch (userCase.applicant1InterimApplicationType) {
      case InterimApplicationType.ALTERNATIVE_SERVICE:
        return ALTERNATIVE_SERVICE_APPLICATION;
      case InterimApplicationType.DEEMED_SERVICE:
        return DEEMED_SERVICE_APPLICATION;
      case InterimApplicationType.BAILIFF_SERVICE:
        return BAILIFF_SERVICE_APPLICATION;
      case InterimApplicationType.DISPENSE_WITH_SERVICE:
        return DISPENSE_SERVICE_APPLICATION;
      case InterimApplicationType.PROCESS_SERVER_SERVICE:
        return PROCESS_SERVER;
      case InterimApplicationType.SEARCH_GOV_RECORDS:
        return SEARCH_GOV_RECORDS_APPLICATION;
    }
  })();
  const interimApplicationStartedAosOverdue =
    userCase.applicant1InterimApplicationType && (userCase.state === State.AosOverdue || aosOverdueAndDrafted);
  return {
    ...languages[language](
      content,
      alternativeServiceType,
      dateOfCourtReplyToRequestForInformationResponse,
      respondentAddressProvided
    ),
    serviceApplicationSubmitted: serviceApplicationSubmittedContent(content),
    generalApplicationSubmitted: generalApplicationSubmittedContent(content),
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
    isAosSubmitted,
    aosIsDrafted,
    aosOverdueAndDrafted,
    contactDetailsUpdatedUKBased,
    applicant1NoResponseSendPapersAgain,
    isAwaitingProcessServerService,
    isSearchGovRecordsFeeRequired,
    interimApplicationStartPagePath,
    interimApplicationStartedAosOverdue,
  };
};
