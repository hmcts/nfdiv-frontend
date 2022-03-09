import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

import { AlternativeServiceType, YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import type { CommonContent } from '../../../common/common.content';
import { FINALISING_YOUR_APPLICATION, HOW_YOU_CAN_PROCEED } from '../../../urls';

dayjs.extend(advancedFormat);

const en = ({ isDivorce, partner, userCase }: CommonContent, alternativeServiceType: AlternativeServiceType) => ({
  aosAwaitingOrDrafted: {
    line1: `Your application ${
      isDivorce ? 'for divorce' : 'to end your civil partnership'
    } has been submitted and checked by court staff. It's been ‘served’ (sent) to you and your ${partner}${
      userCase.applicant2EmailAddress
        ? ' by email'
        : userCase.applicant1KnowsApplicant2Address === YesOrNo.YES
        ? ' by post'
        : ''
    }.`,
    line2: `Your ${partner} should respond to the ${
      isDivorce ? 'divorce application' : 'application to end your civil partnership'
    } by ${userCase.dueDate || dayjs().add(2, 'weeks').format('D MMMM YYYY')}.`,
    line3:
      'You will be notified by email when they have responded. Or told what you can do next if they do not respond.',
  },
  aosDue: {
    line1: `Your ${partner} should have responded to your ${
      isDivorce ? 'divorce application' : 'application to end your civil partnership'
    } by ${
      userCase.dueDate || dayjs().add(17, 'day').format('D MMMM YYYY')
    }. They can still respond and have been sent a reminder. You can also contact them to remind them if it’s safe to do so.`,
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
    line3: `You can apply for a conditional order on ${dayjs(userCase.issueDate)
      .add(141, 'day')
      .format('D MMMM YYYY')}. This is because you have to wait until 20 weeks from when the ${
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
    line2: `They have to submit an ‘answer’ to the court by ${
      userCase.dueDate
    }. This is a form which explains their reasons for defending the ${
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
    line1: `The court has seen evidence that your ${
      isDivorce ? 'divorce application' : 'application to end your civil partnership'
    } has been successfully ‘served’ (delivered) to your ${partner}. You can `,
    line2: "view and download your 'certificate of service'.",
    downloadReference: '/downloads/certificate-of-service',
  },
  awaitingConditionalOrder: `You can now apply for a ‘conditional order’. A conditional order is a document that says the court does not see any reason why you cannot ${
    isDivorce ? 'get a divorce' : 'end your civil partnership'
  }.`,
  awaitingConditionalOrderAndServedByBailiff: {
    line1: `The court has seen evidence that the court documents have been successfully ‘served’ (delivered) to your ${partner}. You can`,
    line2: `You will not see a response from your ${partner} when you apply for the conditional order.`,
  },
  conditionalOrderWithDeemedOrDispensedService: `You will not see a response from your ${partner} in the conditional order application.
  This is because they did not respond to your application.
  You applied to the court to ${
    alternativeServiceType === AlternativeServiceType.DISPENSED ? "'dispense with" : "for 'deemed"
  }service', which was granted. You can `,
  legalAdvisorReferral: {
    line1: `You have applied for a ‘conditional order’. The court will check your application and send it to a judge. If the judge agrees that you should ${
      isDivorce ? 'get a divorce' : 'end your civil partnership'
    }, they will grant your entitlement to a conditional order and ‘pronounce’ it in court. You will receive an email by ${dayjs(
      userCase.coApplicant1SubmittedDate
    )
      .add(21, 'day')
      .format(
        'D MMMM YYYY'
      )} after your application has been checked. This will have the time, date and court your conditional order will be pronounced.`,
    line2:
      'After your conditional order is pronounced, you then have to apply for a ‘final order’. This will finalise your divorce. ' +
      'You have to wait 6 weeks until after your conditional order, to apply for the final order.',
  },
  clarificationSubmitted: {
    line1: 'This was the court’s feedback, explaining the information which was needed:',
    line2: userCase.coRefusalClarificationAdditionalInfo,
    withDocuments: {
      line1: `You have provided the information requested by the court. You'll receive an email by ${dayjs(
        userCase.dateSubmitted
      )
        .add(16, 'days')
        .format('D MMMM YYYY')} after the court has reviewed it.`,
    },
    withoutDocuments: {
      line1: 'You need to post the documents requested by the court:',
      line2:
        '<strong>HMCTS Divorce and Dissolution Service</strong><br>' + 'PO Box 13226<br>' + 'HARLOW<br>' + 'CM20 9UG',
      line3: 'You will receive an update when your documents have been received and checked.',
    },
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
    step1: `
        <strong>Apply for a conditional order</strong><br>
        This shows that the court agrees that you’re entitled to ${
          isDivorce ? 'get a divorce' : 'end your civil partnership'
        }.`,
    step2: `
        <strong>Apply for a final order</strong><br>
        This legally ends the ${
          isDivorce ? 'marriage' : 'civil partnership'
        }. You cannot apply for a final order until 6 weeks after the conditional order.`,
  },
  moneyAndProperty: `You can use the time to decide how your money and property will be divided. This is dealt with separately to the ${
    isDivorce ? 'divorce application' : 'application to end your civil partnership'
  }. <a class="govuk-link" href="https://www.gov.uk/money-property-when-relationship-ends" target="_blank">Find out about dividing money and property</a>`,
  finalOrderRequested: {
    line1: 'You have applied for a ‘final order’. Your application will be checked by court staff.',
    line2: `If there are no other applications that need to be completed then your ${
      isDivorce ? 'marriage' : 'civil partnership'
    } will be legally ended.`,
    line3: `${
      dayjs().isAfter(userCase.dateFinalOrderNoLongerEligible)
        ? `You will receive an email by ${dayjs(userCase.dateFinalOrderSubmitted).add(14, 'day').format('D MMMM YYYY')}`
        : 'You should receive an email within 2 working days,'
    } confirming whether the final order has been granted.`,
  },
  awaitingServicePayment: {
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
      }service. You can read the reasons on the court’s `,
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
});

// @TODO translations
const cy: typeof en = en;

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const { userCase, language } = content;
  const isDisputedApplication = userCase.disputeApplication === YesOrNo.YES;
  const isSuccessfullyServedByBailiff =
    userCase.alternativeServiceOutcomes?.[0].value.successfulServedByBailiff === YesOrNo.YES;
  const isServiceApplicationGranted =
    userCase.alternativeServiceOutcomes?.[0].value.serviceApplicationGranted === YesOrNo.YES;
  const isDeemedOrDispensedApplication = userCase.alternativeServiceOutcomes?.find(
    alternativeServiceOutcome =>
      alternativeServiceOutcome.value.alternativeServiceType === AlternativeServiceType.DEEMED ||
      alternativeServiceOutcome.value.alternativeServiceType === AlternativeServiceType.DISPENSED
  );
  const isClarificationDocumentsUploaded = userCase.coClarificationUploadDocuments?.length;
  const alternativeServiceType = userCase.alternativeServiceOutcomes?.[0].value
    .alternativeServiceType as AlternativeServiceType;
  const isAlternativeService = !!alternativeServiceType;
  return {
    ...languages[language](content, alternativeServiceType),
    isDisputedApplication,
    isSuccessfullyServedByBailiff,
    isDeemedOrDispensedApplication,
    isClarificationDocumentsUploaded,
    isServiceApplicationGranted,
    isAlternativeService,
  };
};
