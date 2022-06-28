import config from 'config';
import dayjs from 'dayjs';

import { CaseWithId } from '../../../app/case/case';
import { ConditionalOrderCourt, birmingham, buryStEdmunds } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { formattedCaseId } from '../../common/content.utils';
import { StateSequence } from '../../state-sequence';
import { APPLICANT_2, PROVIDE_INFORMATION_TO_THE_COURT } from '../../urls';

import { generateContent as jointGenerateContent } from './joint/content';
import { generateContent as columnGenerateContent } from './right-column/content';
import { generateContent as soleGenerateContent } from './sole/content';

export const getName = (userCase: Partial<CaseWithId>, app: 'applicant1' | 'applicant2'): string => {
  return [userCase[app + 'FirstNames'], userCase[app + 'MiddleNames'], userCase[app + 'LastNames']].join(' ');
};

const en = ({ isDivorce, userCase, referenceNumber, partner, isJointApplication, isApplicant2 }) => ({
  title: `${getName(userCase, 'applicant1')} & ${getName(userCase, 'applicant2')}`,
  referenceNumber: `Reference Number: ${referenceNumber}`,
  submitted: 'Submitted',
  submittedAriaLabel:
    'A progress bar showing the application has been submitted. The next steps are receiving a response, a conditional order being granted and a final order being granted, which is the last stage in the process. The next steps are not complete yet.',
  response: 'Response',
  responseAriaLabel:
    'A progress bar showing the application has been submitted and the response has been received. The next steps show a conditional order being granted and a final order being granted, which is the last stage in the process. The next steps are not complete yet.',
  conditionalOrder: 'Conditional order',
  conditionalOrderAriaLabel:
    'A progress bar showing the application has been submitted, the response has been received and a conditional order has been granted. The next step shows a final order being granted, which is the final stage in the process. This step is not complete yet.',
  finalOrder: `Final order (${isDivorce ? 'Divorced' : 'Civil partnership ended'})`,
  finalOrderAriaLabel:
    'A progress bar showing the application has been submitted, the response has been received, a conditional order has been granted and a final order has been granted. All steps are now complete.',
  subHeading1: userCase.state === 'AwaitingClarification' ? 'What you need to do now' : 'Latest update',
  subHeading2: 'Helpful information',
  line1: 'Find out about dividing money and property',
  whatHappensNext: 'What happens next',
  applyForConditionalOrder: 'Apply for conditional order',
  awaitingPronouncement: {
    line1: `Your application for a 'conditional order' has been accepted. The court agrees that you are entitled to ${
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
      .subtract(config.get('dates.contactCourtBeforeHearingDays'), 'day')
      .format('D MMMM YYYY')} if you want to attend.`,
    line4: `After your conditional order has been pronounced, you will then be able to apply for a 'final order' on ${dayjs(
      userCase.coDateAndTimeOfHearing
    )
      .add(config.get('dates.applyForFoDays'), 'day')
      .format('D MMMM YYYY')}. This is the final step in the ${
      isDivorce ? 'divorce ' : ''
    }process and will legally end your ${isDivorce ? 'marriage' : 'civil partnership'}.`,
  },
  certificateOfEntitlementLine: {
    part1: 'You can ',
    part2: "view and download your 'certificate of entitlement for a conditional order'.",
    part3: `This is the document that says the court does not see any reason why you cannot ${
      isDivorce ? 'get divorced' : 'end your civil partnership'
    }.`,
    downloadReference: 'Certificate-of-Entitlement',
    link: '/downloads/certificate-of-entitlement',
  },
  conditionalOrderPronounced: {
    line1: `You have been granted a 'conditional order' by the court. Your conditional order was formally pronounced
    (read out) by a judge at ${
      userCase.coCourt === ConditionalOrderCourt.BIRMINGHAM ? birmingham : buryStEdmunds
    } on ${dayjs(userCase.coDateAndTimeOfHearing).format('D MMMM YYYY')}.
    Your ${partner} has also been notified.`,
    line2: `${isDivorce ? 'You are not divorced' : 'Your civil partnership is not legally ended'} yet.
    You ${isJointApplication ? `/ your ${partner} ` : ''}still have to apply for a final order which will end the ${
      isDivorce ? 'marriage' : 'civil partnership'
    }.
    You can apply for a final order on ${userCase.dateFinalOrderEligibleFrom}. This will end your ${
      isDivorce ? 'marriage' : 'civil partnership'
    }.`,
    line3: {
      part1: 'You can ',
      part2: "view and download your 'certificate of entitlement for a conditional order'.",
      part3: `This is the document that says the court does not see any reason why you cannot ${
        isDivorce ? 'get divorced' : 'end your civil partnership'
      }.`,
      downloadReference: 'Certificate-of-Entitlement',
      link: '/downloads/certificate-of-entitlement',
    },
  },
  awaitingClarification: {
    line1: `The court has reviewed your application for a conditional order and needs some more information before
    they can progress your application. You need to read the court’s feedback and provide the information requested.`,
    bothCanProvide: `Either you or your ${partner} can provide the information requested by the court. You should agree your response first, before submitting it.`,
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
    buttonText: 'Respond to the court',
    buttonLink: `${isApplicant2 ? APPLICANT_2 : ''}${PROVIDE_INFORMATION_TO_THE_COURT}`,
  },
});

// @TODO translations
const cy: typeof en = ({ isDivorce, userCase, referenceNumber, partner, isJointApplication, isApplicant2 }) => ({
  ...en({ isDivorce, userCase, referenceNumber, partner, isJointApplication, isApplicant2 }),
  submitted: "Wedi'i gyflwyno",
  response: 'Ymateb ',
  conditionalOrder: 'Gorchymyn amodol',
  finalOrder: `Gorchymyn terfynol (${isDivorce ? 'Wedi ysgaru' : 'Partneriaeth sifil wedi dod i ben'})`,
});
export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.continue,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const { userCase } = content;
  const referenceNumber = formattedCaseId(userCase.id);
  const translations = languages[content.language]({ ...content, referenceNumber });
  const applicationTranslations = content.isJointApplication
    ? jointGenerateContent(content)
    : soleGenerateContent(content);
  const isCoFieldsSet =
    userCase.coCourt && userCase.coDateAndTimeOfHearing && userCase.coCertificateOfEntitlementDocument;
  const progressBarAriaLabel = getProgressBarAriaLabel(
    applicationTranslations.displayState as StateSequence,
    translations
  );
  return {
    ...languages[content.language]({ ...content, referenceNumber }),
    ...columnGenerateContent(content),
    ...applicationTranslations,
    isCoFieldsSet,
    progressBarAriaLabel,
  };
};

const getProgressBarAriaLabel = (
  displayState: StateSequence,
  { submittedAriaLabel, responseAriaLabel, conditionalOrderAriaLabel, finalOrderAriaLabel }
) => {
  if (displayState.isAfter('IssuedToBailiff')) {
    return responseAriaLabel;
  } else if (displayState.isAfter('ConditionalOrderPronounced')) {
    return conditionalOrderAriaLabel;
  } else if (displayState.state() === 'FinalOrderComplete') {
    return finalOrderAriaLabel;
  }
  return submittedAriaLabel;
};
