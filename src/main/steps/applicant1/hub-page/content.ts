import config from 'config';
import dayjs from 'dayjs';

import { CaseWithId } from '../../../app/case/case';
import { ClarificationReason, ConditionalOrderCourt, birmingham, buryStEdmunds } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { CommonContent } from '../../common/common.content';
import { formattedCaseId } from '../../common/content.utils';
import { APPLICANT_2, PROVIDE_INFORMATION_TO_THE_COURT } from '../../urls';

import { generateContent as jointGenerateContent } from './joint/content';
import { generateContent as columnGenerateContent } from './right-column/content';
import { generateContent as soleGenerateContent } from './sole/content';

export const getName = (userCase: Partial<CaseWithId>, app: 'applicant1' | 'applicant2'): string => {
  return [userCase[app + 'FirstNames'], userCase[app + 'MiddleNames'], userCase[app + 'LastNames']].join(' ');
};

const en = ({ isDivorce, userCase, referenceNumber, partner, isJointApplication, isApplicant2 }: CommonContent) => ({
  title: `${getName(userCase, 'applicant1')} & ${getName(userCase, 'applicant2')}`,
  referenceNumber: `Reference Number: ${referenceNumber}`,
  applicationSubmitted: 'Application submitted',
  response: 'Response',
  conditionalOrderApplication: 'Conditional order application',
  conditionalOrderGranted: 'Conditional order granted',
  finalOrderApplication: 'Final order application',
  applicationEnded: isDivorce ? 'Divorced' : 'Civil partnership ended',
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
  },
  awaitingClarification: {
    line1: `The court has reviewed your application for a conditional order. You need to provide some information before your application can progress.
    Read the court’s reason(s) for refusing the application and provide the requested information.`,
    coRefusalClarificationReasons: userCase.coRefusalClarificationReason?.filter(
      reason => reason !== ClarificationReason.OTHER
    ),
    jurisdictionDetailsReasonHeading: 'Jurisdiction',
    jurisdictionDetailsReasonBody: {
      part1:
        'The court has judged that your application does not fall within the jurisdiction of England and Wales. You must have at least one legal connection to England and Wales. You can see all the possible legal connections on the ',
      part2: 'Refusal Order (PDF)',
      part3: '.',
      downloadReference: 'Refusal-Order',
      link: '/downloads/conditional-order-refusal',
    },
    marriageCertTranslationReasonHeading: `A translation of your ${
      isDivorce ? 'marriage' : 'civil partnership'
    } certificate`,
    marriageCertTranslationReasonBody: `The ${
      isDivorce ? 'marriage' : 'civil partnership'
    } certificate must be translated and certified by a statement of truth or a notary public. You can find a translation service online which provides certification as part of their service. You will need to scan and upload this document or post it to the court.`,
    marriageCertificateReasonHeading: `Your original ${isDivorce ? 'marriage' : 'civil partnership'} certificate`,
    marriageCertificateReasonBody: `The image of your ${
      isDivorce ? 'marriage' : 'civil partnership'
    } certificate does not appear to be scanned or show the full original. Provide a digital photo or scan of the original. The image must be of the whole document and include the serial or system number. It must be readable by court staff.`,
    previousProceedingDetailsReasonHeading: 'Details of other legal proceedings',
    previousProceedingDetailsReasonBody: `Clarify whether there are, or have ever been, any other legal proceedings relating to the ${
      isDivorce ? 'marriage' : 'civil partnership'
    }. Provide evidence that any other previous proceedings have either been dismissed or withdrawn.`,
    courtsComments: 'The court’s comments',
    coRefusalClarificationAdditionalInfo: `${
      userCase.coRefusalClarificationAdditionalInfo ? '"' + userCase.coRefusalClarificationAdditionalInfo + '"' : ''
    }`,
    bothCanProvide: `Either you or your ${partner} can provide the information requested by the court. You should agree your response first, before submitting it.`,
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
const cy: typeof en = ({
  isDivorce,
  userCase,
  referenceNumber,
  partner,
  isJointApplication,
  isApplicant2,
}: CommonContent) => ({
  title: `${getName(userCase, 'applicant1')} & ${getName(userCase, 'applicant2')}`,
  referenceNumber: `Reference Number: ${referenceNumber}`,
  applicationSubmitted: 'Application submitted',
  response: 'Response',
  conditionalOrderApplication: 'Conditional order application',
  conditionalOrderGranted: 'Conditional order granted',
  finalOrderApplication: 'Final order application',
  applicationEnded: isDivorce ? 'Divorced' : 'Civil partnership ended',
  subHeading1: userCase.state === 'AwaitingClarification' ? 'What you need to do now' : 'Latest update',
  subHeading2: 'Gwybodaeth ddefnyddiol',
  line1: 'Rhagor o wybodaeth am rannu arian ac eiddo',
  whatHappensNext: 'Beth fydd yn digwydd nesaf',
  applyForConditionalOrder: 'Gwneud cais am orchymyn amodol',
  awaitingPronouncement: {
    line1: `Mae cais am 'orchymyn amodol' wedi dod i law. Mae'r llys yn cytuno bod gennych hawl i ${
      isDivorce ? 'gael ysgariad' : "dod â'ch partneriaeth sifil i ben"
    }.`,
    line2: `Bydd barnwr yn 'cyhoeddi' (darllen allan) eich gorchymyn amodol mewn gwrandawiad. Bydd y gwrandawiad yn cael ei gynnal yn ${
      userCase.coCourt === ConditionalOrderCourt.BIRMINGHAM ? birmingham : buryStEdmunds
    } ar ${dayjs(userCase.coDateAndTimeOfHearing).format('D MMMM YYYY')} ar ${dayjs(
      userCase.coDateAndTimeOfHearing
    ).format('h:mmA')}.`,
    line3: `Nid oes angen i chi ddod i'r gwrandawiad, oni bai eich bod eisiau gwrthwynebu. Rhaid i chi gysylltu â'r llys erbyn ${dayjs(
      userCase.coDateAndTimeOfHearing
    )
      .subtract(config.get('dates.contactCourtBeforeHearingDays'), 'day')
      .format('D MMMM YYYY')} os ydych eisiau bod yn bresennol.`,
    line4: `Ar ôl i'ch gorchymyn amodol gael ei gyhoeddi, bydd byddwch chi wedyn yn gallu gwneud cais am 'orchymyn terfynol' ar ${dayjs(
      userCase.coDateAndTimeOfHearing
    )
      .add(config.get('dates.applyForFoDays'), 'day')
      .format('D MMMM YYYY')}. Dyma'r cam olaf yn y broses ${isDivorce ? 'ysgaru ' : ''}a bydd yn dod â'ch ${
      isDivorce ? 'priodas' : 'partneriaeth sifil'
    } i ben yn gyfreithiol.`,
  },
  certificateOfEntitlementLine: {
    part1: 'Gallwch ',
    part2: "weld a lawrlwytho eich 'tystysgrif hawl i gael gorchymyn amodol'.",
    part3: `Dyma'r ddogfen sy'n dweud nad yw'r llys yn gweld unrhyw reswm pam na allwch chi ${
      isDivorce ? 'gael ysgaria' : "dod â'ch partneriaeth sifil i ben"
    }.`,
    downloadReference: 'Certificate-of-Entitlement',
    link: '/downloads/certificate-of-entitlement',
  },
  conditionalOrderPronounced: {
    line1: `Rydych wedi cael 'gorchymyn amodol' gan y llys. Cafodd eich gorchymyn amodol ei gyhoeddi’n ffurfiol (darllen allan) gan farnwr yn ${
      userCase.coCourt === ConditionalOrderCourt.BIRMINGHAM ? birmingham : buryStEdmunds
    } ar ${dayjs(userCase.coDateAndTimeOfHearing).format('D MMMM YYYY')}.
    Mae eich ${partner} hefyd wedi cael gwybod.`,
    line2: `${isDivorce ? 'Nid ydych wedi ysgaru' : 'Nid yw eich partneriaeth sifil wedi dod i ben yn gyfreithiol'} eto.
    Mae’n rhaid i chi ${
      isJointApplication ? `/ eich ${partner} ` : ''
    }dal i orfod gwneud cais am orchymyn terfynol a fydd yn dod â'r ${
      isDivorce ? 'briodas' : 'partneriaeth sifil'
    } i ben.
    Gallwch wneud cais am orchymyn terfynol ar ${userCase.dateFinalOrderEligibleFrom}. Bydd hyn yn dod â'ch ${
      isDivorce ? 'priodas' : 'partneriaeth sifil i ben'
    }.`,
  },
  awaitingClarification: {
    line1: `The court has reviewed your application for a conditional order. You need to provide some information before your application can progress.
    Read the court’s reason(s) for refusing the application and provide the requested information.`,
    coRefusalClarificationReasons: userCase.coRefusalClarificationReason?.filter(
      reason => reason !== ClarificationReason.OTHER
    ),
    jurisdictionDetailsReasonHeading: 'Jurisdiction',
    jurisdictionDetailsReasonBody: {
      part1:
        'The court has judged that your application does not fall within the jurisdiction of England and Wales. You must have at least one legal connection to England and Wales. You can see all the possible legal connections on the ',
      part2: 'Refusal Order (PDF)',
      part3: '.',
      downloadReference: 'Refusal-Order',
      link: '/downloads/conditional-order-refusal',
    },
    marriageCertTranslationReasonHeading: `A translation of your ${
      isDivorce ? 'marriage' : 'civil partnership'
    } certificate`,
    marriageCertTranslationReasonBody: `The ${
      isDivorce ? 'marriage' : 'civil partnership'
    } certificate must be translated and certified by a statement of truth or a notary public. You can find a translation service online which provides certification as part of their service. You will need to scan and upload this document or post it to the court.`,
    marriageCertificateReasonHeading: `Your original ${isDivorce ? 'marriage' : 'civil partnership'} certificate`,
    marriageCertificateReasonBody: `The image of your ${
      isDivorce ? 'marriage' : 'civil partnership'
    } certificate does not appear to be scanned or show the full original. Provide a digital photo or scan of the original. The image must be of the whole document and include the serial or system number. It must be readable by court staff.`,
    previousProceedingDetailsReasonHeading: 'Details of other legal proceedings',
    previousProceedingDetailsReasonBody: `Clarify whether there are, or have ever been, any other legal proceedings relating to the ${
      isDivorce ? 'marriage' : 'civil partnership'
    }. Provide evidence that any other previous proceedings have either been dismissed or withdrawn.`,
    courtsComments: 'The court’s comments',
    coRefusalClarificationAdditionalInfo: `${
      userCase.coRefusalClarificationAdditionalInfo ? '"' + userCase.coRefusalClarificationAdditionalInfo + '"' : ''
    }`,
    bothCanProvide: `Either you or your ${partner} can provide the information requested by the court. You should agree your response first, before submitting it.`,
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
  const isCoFieldsSet =
    userCase.coCourt && userCase.coDateAndTimeOfHearing && userCase.coCertificateOfEntitlementDocument;
  return {
    ...languages[content.language]({ ...content, referenceNumber }),
    ...columnGenerateContent(content),
    ...(content.isJointApplication ? jointGenerateContent(content) : soleGenerateContent(content)),
    isCoFieldsSet,
  };
};
