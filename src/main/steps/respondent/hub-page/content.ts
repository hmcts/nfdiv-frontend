import config from 'config';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

import { ConditionalOrderCourt, State, YesOrNo, birmingham, buryStEdmunds } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import {
  form as applicant1Form,
  generateContent as applicant1GenerateContent,
} from '../../applicant1/hub-page/content';
import { CommonContent } from '../../common/common.content';
import { FINALISING_YOUR_APPLICATION, RESPONDENT } from '../../urls';

dayjs.extend(advancedFormat);

const en = ({ isDivorce, partner, userCase }: CommonContent) => ({
  subHeading1:
    [State.AwaitingGeneralConsideration, State.Holding].includes(userCase.state as State) &&
    userCase.disputeApplication === YesOrNo.YES
      ? 'What you need to do next'
      : 'Latest update',
  awaitingAos: {
    line1: `Your ${partner} has submitted an application ${
      isDivorce ? 'for divorce' : 'to end your civil partnership'
    }.`,
  },
  holding: {
    line1: `You have responded to the ${
      isDivorce ? 'divorce application' : 'application to end your civil partnership'
    }. You do not have to do anything further.`,
    line2: `The next step is for your ${partner} to apply for a 'conditional order'. A conditional order is a document that says the court does not see any reason why you cannot ${
      isDivorce ? 'get a divorce' : 'end your civil partnership'
    }.`,
    line3: `Your ${partner} can apply for a conditional order from ${
      userCase.dueDate || dayjs().add(141, 'day').format('D MMMM YYYY')
    }. This is because they have to wait 20 weeks from when the ${
      isDivorce ? 'divorce application' : 'application to end your civil partnership'
    } was issued. You will receive an email when the conditional order has been granted.`,
    line4: `After the conditional order, they need to apply for a final order, which legally ends the ${
      isDivorce ? 'marriage' : 'civil partnership'
    }. This cannot be made until 6 weeks after the conditional order.`,
    line5: `You can use the time until the conditional order application to decide how your money and property will be divided. This is dealt with separately to the ${
      isDivorce ? 'divorce application' : 'application to end your civil partnership'
    }. <a class="govuk-link" href="https://www.gov.uk/money-property-when-relationship-ends" target="_blank">Find out more about dividing money and property</a>`,
  },
  d8Awaiting: {
    line1: `You have responded to the ${
      isDivorce ? 'divorce application' : 'application to end your civil partnership'
    } and said that you want to dispute it.`,
    line2: `You have until ${
      userCase.dueDate || dayjs().add(37, 'day').format('D MMMM YYYY')
    } to submit the ‘answer a ${isDivorce ? 'divorce' : 'dissolution'}’ form. This is the form for disputing ${
      isDivorce ? 'the divorce' : 'ending your civil partnership'
    }. You can <a class="govuk-link" href="https://www.gov.uk/government/publications/form-d8b-answer-to-a-divorcedissolutionjudicial-separation-or-nullity-petitionapplication">download the form here</a>.`,
    line3: `Fill in the form and email it to: <a class="govuk-link" href="mailto:${
      isDivorce ? 'contactdivorce@justice.gov.uk' : 'civilpartnership.case@justice.gov.uk'
    }">${isDivorce ? 'contactdivorce@justice.gov.uk' : 'civilpartnership.case@justice.gov.uk'}</a>`,
    line4: `<div class="govuk-body">Or post it to:</div>
      Courts and Tribunals Service centre<br>
      HMCTS ${isDivorce ? 'Divorce Service' : 'Ending Civil Partnerships'}<br>
      PO Box 12706<br>
      Harlow<br>
      CM20 9QT`,
    line5: `You’ll have to pay a ${config.get(
      'fees.d8bFormSubmission'
    )} fee when you submit the form. If you have little or no savings, are on certain benefits or have low income you may be able to get <a class="govuk-link" href="https://www.gov.uk/get-help-with-court-fees">help paying the fee</a>.`,
    line6: `If you do not submit your answer before ${
      userCase.dueDate || dayjs().add(37, 'day').format('D MMMM YYYY')
    } then your ${partner} can continue ${isDivorce ? 'the divorce' : 'ending your civil partnership'}.`,
  },
  d8Submitted: {
    line1: `You have responded to the ${
      isDivorce ? 'divorce application' : 'application to end your civil partnership'
    } and said that you want to dispute it.`,
    line2: `You have submitted the ‘answer a ${
      isDivorce ? 'divorce' : 'dissolution'
    }’ form. This is the form for disputing ${isDivorce ? 'the divorce' : 'ending your civil partnership'}.`,
    line3: `A judge will decide whether you and your ${partner} need to attend a hearing. You may be contacted for more information to help them make a decision.`,
    line4: 'You’ll receive a letter in the post telling you if you need to attend the hearing, and where it will be.',
  },
  conditionalOrderPronounced: {
    line1: `You have been granted a 'conditional order' by the court. Your conditional order was formally pronounced
    (read out) by a judge at ${
      userCase.coCourt === ConditionalOrderCourt.BIRMINGHAM ? birmingham : buryStEdmunds
    } on ${dayjs(userCase.coDateAndTimeOfHearing).format('D MMMM YYYY')}.
    Your ${partner} has also been notified.`,
    line2: `${isDivorce ? 'You are not divorced' : 'Your civil partnership is not legally ended'} yet.
    Your ${partner} still has to apply for a final order which will end the ${
      isDivorce ? 'marriage' : 'civil partnership'
    }.
    They can apply for a final order on ${userCase.dateFinalOrderEligibleFrom}. This will end your ${
      isDivorce ? 'marriage' : 'civil partnership'
    }.`,
    line3: `If they do not apply for a final order by ${userCase.dateFinalOrderEligibleFrom} then you can apply for a final order.`,
    line4: {
      part1: 'You can ',
      part2: 'read and download your certificate of entitlement.',
      downloadReference: 'Certificate-of-Entitlement',
      link: '/downloads/certificate-of-entitlement',
    },
  },
  legalAdvisorReferral: {
    line1: `Your ${partner} has applied for a ‘conditional order’. A conditional order is a document that says the court does not see any reason why you cannot ${
      isDivorce ? 'get a divorce' : 'end your civil partnership'
    }`,
    line2: 'You will receive an email when the conditional order has been granted by the court.',
  },
  clarificationSubmitted: {
    line1: 'This was the court’s feedback, explaining the information which was needed:',
    line2: userCase.coRefusalClarificationAdditionalInfo,
    withDocuments: {
      line1: `Your ${partner} has provided the information requested by the court. You’ll receive an email by ${dayjs(
        userCase.dateSubmitted
      )
        .add(16, 'days')
        .format('D MMMM YYYY')} after the court has reviewed it.`,
    },
    withoutDocuments: {
      line1: `You or your ${partner} need to post the documents requested by the court:`,
      line2: 'address',
      line3: 'You will receive an update when your documents have been received and checked.',
    },
  },
  awaitingPronouncement: {
    line1: `Your ${partner}’s application for a 'conditional order' has been accepted. The court agrees that you are entitled to ${
      isDivorce ? 'get divorced' : 'end your civil partnership'
    }.`,
    line2: `A judge will 'pronounce' (read out) your conditional order at a hearing. The hearing will take place at ${
      userCase.coCourt === ConditionalOrderCourt.BIRMINGHAM ? birmingham : buryStEdmunds
    } on ${dayjs(userCase.coDateAndTimeOfHearing).format('D MMMM YYYY')} at ${dayjs(
      userCase.coDateAndTimeOfHearing
    ).format('h:mmA')}.`,
    line3: `You do not need to come to the hearing, unless you want to object. You must contact the court by ${dayjs(
      userCase.coDateAndTimeOfHearing
    )
      .subtract(7, 'day')
      .format('D MMMM YYYY')} if you want to attend.`,
    line4: `After your conditional order has been pronounced, your ${partner} will then be able to apply for a 'final order' on ${dayjs(
      userCase.dateFinalOrderEligibleFrom
    )}. This is the final step in the ${isDivorce ? 'divorce ' : ''}process and will legally end your ${
      isDivorce ? 'marriage' : 'civil partnership'
    }.`,
  },
  awaitingFinalOrderOrFinalOrderOverdue: {
    line1: `Your ${partner} can now apply for a 'final order'. A final order is the document that will legally end your
     ${isDivorce ? 'marriage' : 'civil partnership'}. It’s the final step in the
     ${isDivorce ? 'divorce process' : 'process to end your civil partnership'}.`,
    line2: `If they do not apply by ${userCase.dateFinalOrderEligibleToRespondent}
     then you will be able to apply, and ${isDivorce ? 'finalise the divorce' : 'end the civil partnership'}.`,
  },
  awaitingFinalOrderOrFinalOrderOverdueRespondentCanApply: {
    line1: `Your ${partner} has still not applied for a 'final order', which is the document that will legally end your  ${
      isDivorce ? 'marriage' : 'civil partnership'
    }.`,
    line2: 'You can now apply because it has been three months since they could apply and they have not yet done so.',
    line3: 'If you apply then you may both have to come to court.',
    buttonText: 'Apply for a final order',
    buttonLink: `${RESPONDENT}${FINALISING_YOUR_APPLICATION}`,
  },
});

// @TODO translations
const cy: typeof en = en;

const languages = {
  en,
  cy,
};

export const form = applicant1Form;

export const generateContent: TranslationFn = content => {
  const isRespondentAbleToApplyForFinalOrder =
    dayjs(content.userCase.dateFinalOrderEligibleToRespondent).diff(dayjs()) < 0;
  return {
    isRespondentAbleToApplyForFinalOrder,
    ...applicant1GenerateContent(content),
    ...languages[content.language](content),
  };
};
