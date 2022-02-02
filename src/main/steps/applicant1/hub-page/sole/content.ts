import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

import { AlternativeServiceType, State, YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import type { CommonContent } from '../../../common/common.content';
import { HOW_YOU_CAN_PROCEED } from '../../../urls';

dayjs.extend(advancedFormat);

const en = ({ isDivorce, partner, userCase }: CommonContent) => ({
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
    userCase.alternativeServiceOutcomes?.[0].value.alternativeServiceType === AlternativeServiceType.DISPENSED
      ? 'to dispense with service'
      : 'for deemed service'
  } was granted. You can`,
  deemedOrDispensedAccepted: {
    line1: `download the court order granting your application for ${
      userCase.alternativeServiceOutcomes?.[0].value.alternativeServiceType === AlternativeServiceType.DISPENSED
        ? 'dispensed'
        : 'deemed'
    } service`,
    downloadReference: `/downloads/${
      userCase.alternativeServiceOutcomes?.[0].value.alternativeServiceType === AlternativeServiceType.DISPENSED
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
  applyForConditionalOrder: 'Apply for conditional order',
  conditionalOrderWithDeemedOrDispensedService: `You will not see a response from your ${partner} in the conditional order application.
  This is because they did not respond to your application.
  You applied to the court to ${
    userCase.alternativeServiceOutcomes?.[0].value.alternativeServiceType === AlternativeServiceType.DISPENSED
      ? "'dispense with service'"
      : "for 'deemed service'"
  }, which was granted. You can `,
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
      'After your conditional order is pronounced, you then have to apply for a ‘final order’. This will finalise your divorce. You have to wait 6 weeks until after your conditional order, to apply for the final order.',
  },
  awaitingClarification: {
    line1: `The court has reviewed your application for a conditional order and needs some more information before
    they can progress your application. You need to read the court’s feedback and provide the information requested.`,
    courtsFeedback: 'The court’s feedback',
    line2: `"${userCase.coRefusalClarificationAdditionalInfo}"`,
    line3: {
      part1: 'You can download a copy of the court’s full ',
      part2: 'Refusal Order (PDF)',
      part3: '.',
      downloadReference: 'Refusal-Order',
      link: '/downloads/conditional-order-refusal',
    },
    next: 'What you need to do next',
    line4: 'You need to respond to the court’s feedback before your application can proceed.',
    line5: 'You will be able to upload or post documents to the court when you respond, if they have been requested.',
  },
  awaitingFinalOrderOrFinalOrderOverdue: {
    line1: `You can now apply for a 'final order'. A final order is the document that will legally end your ${
      isDivorce ? 'marriage' : 'civil partnership'
    }.
    It’s the final step in the ${isDivorce ? 'divorce process' : 'process to end your civil partnership'}.`,
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
});

// @TODO translations
const cy: typeof en = en;

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const progressionIndex = [
    State.AwaitingAos,
    State.AosDrafted,
    State.AosOverdue,
    State.AwaitingServicePayment,
    State.AwaitingServiceConsideration,
    State.AwaitingBailiffReferral,
    State.AwaitingBailiffService,
    State.IssuedToBailiff,
    State.Holding,
    State.AwaitingConditionalOrder,
    State.AwaitingGeneralConsideration,
    State.ConditionalOrderDrafted,
    State.ConditionalOrderPending,
    State.AwaitingLegalAdvisorReferral,
    State.AwaitingClarification,
    State.ClarificationSubmitted,
    State.AwaitingPronouncement,
    State.ConditionalOrderPronounced,
    State.AwaitingFinalOrder,
    State.FinalOrderOverdue,
    State.FinalOrderRequested,
    State.FinalOrderPending,
    State.FinalOrderComplete,
  ];
  const isDisputedApplication = content.userCase.disputeApplication === YesOrNo.YES;
  const isSuccessfullyServedByBailiff = content.userCase.alternativeServiceOutcomes?.find(
    alternativeServiceOutcome => alternativeServiceOutcome.value.successfulServedByBailiff === YesOrNo.YES
  );
  const isDeemedOrDispensedApplication = content.userCase.alternativeServiceOutcomes?.find(
    alternativeServiceOutcome =>
      alternativeServiceOutcome.value.alternativeServiceType === AlternativeServiceType.DEEMED ||
      alternativeServiceOutcome.value.alternativeServiceType === AlternativeServiceType.DISPENSED
  );
  return {
    ...languages[content.language](content),
    progressionIndex,
    isDisputedApplication,
    isSuccessfullyServedByBailiff,
    isDeemedOrDispensedApplication,
  };
};
