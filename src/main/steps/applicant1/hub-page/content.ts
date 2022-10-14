import config from 'config';
import dayjs from 'dayjs';

import { getFormattedDate } from '../../../app/case/answers/formatDate';
import { ConditionalOrderCourt, birmingham, buryStEdmunds } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { getFee } from '../../../app/fees/service/get-fee';
import { FormContent } from '../../../app/form/Form';
import { SupportedLanguages } from '../../../modules/i18n';
import { CommonContent } from '../../common/common.content';
import { formattedCaseId, getName, latestLegalAdvisorDecisionContent } from '../../common/content.utils';
import { StateSequence } from '../../state-sequence';
import { APPLICANT_2, PROVIDE_INFORMATION_TO_THE_COURT } from '../../urls';

import { generateContent as jointGenerateContent } from './joint/content';
import { getProgressBarContent } from './progressBarLabels';
import { generateContent as columnGenerateContent } from './right-column/content';
import { generateContent as soleGenerateContent } from './sole/content';

const en = ({ isDivorce, userCase, referenceNumber, partner, isJointApplication, isApplicant2 }: CommonContent) => ({
  title: `${getName(userCase, 'applicant1')} & ${getName(userCase, 'applicant2')}`,
  referenceNumber: `Reference Number: ${referenceNumber}`,
  subHeading1: userCase.state === 'AwaitingClarification' ? 'What you need to do' : 'Latest update',
  subHeading2: 'Helpful information',
  line1: 'Find out about dividing money and property',
  whatHappensNext: 'What happens next',
  button: {
    applyForConditionalOrder: 'Apply for conditional order',
    applyForFinalOrder: 'Apply for final order',
  },
  awaitingPronouncement: {
    line1: `Your application for a 'conditional order' has been accepted. The court agrees that you are entitled to ${
      isDivorce ? 'get divorced' : 'end your civil partnership'
    }.`,
    line2: `A judge will 'pronounce' (read out) your conditional order at a hearing. The hearing will take place at ${
      userCase.coCourt === ConditionalOrderCourt.BIRMINGHAM ? birmingham : buryStEdmunds
    } on ${getFormattedDate(userCase.coDateAndTimeOfHearing)} at ${dayjs(userCase.coDateAndTimeOfHearing).format(
      'h:mmA'
    )}.`,
    line3: `You do not need to come to the hearing, unless you want to object. You must contact the court by ${getFormattedDate(
      dayjs(userCase.coDateAndTimeOfHearing).subtract(config.get('dates.contactCourtBeforeHearingDays'), 'day')
    )} if you want to attend.`,
    line4: `After your conditional order has been pronounced, you will then be able to apply for a 'final order' on ${getFormattedDate(
      dayjs(userCase.coDateAndTimeOfHearing).add(config.get('dates.applyForFoDays'), 'day')
    )}. This is the final step in the ${isDivorce ? 'divorce ' : ''}process and will legally end your ${
      isDivorce ? 'marriage' : 'civil partnership'
    }.`,
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
  conditionalOrderGrantedDocumentLine: {
    part1: 'You can ',
    part2: "view and download your 'conditional order'.",
    part3: `This is the document that says the court does not see any reason why you cannot ${
      isDivorce ? 'get divorced' : 'end your civil partnership'
    }.`,
    downloadReference: 'Conditional-Order-Granted',
    link: '/downloads/conditional-order-granted',
  },
  conditionalOrderPronounced: {
    line1: `You have been granted a 'conditional order' by the court. Your conditional order was formally pronounced
    (read out) by a judge at ${
      userCase.coCourt === ConditionalOrderCourt.BIRMINGHAM ? birmingham : buryStEdmunds
    } on ${getFormattedDate(userCase.coDateAndTimeOfHearing)}.
    Your ${partner} has also been notified.`,
    line2: `${isDivorce ? 'You are not divorced' : 'Your civil partnership is not legally ended'} yet.
    You ${isJointApplication ? `/ your ${partner} ` : ''}still have to apply for a final order which will end the ${
      isDivorce ? 'marriage' : 'civil partnership'
    }.
    You can apply for a final order on ${getFormattedDate(userCase.dateFinalOrderEligibleFrom)}. This will end your ${
      isDivorce ? 'marriage' : 'civil partnership'
    }.`,
  },
  awaitingClarification: {
    line1: `The court has reviewed your application for a conditional order. You need to provide some information before your application can progress.
    Read the court’s reason(s) for refusing the application and provide the requested information.`,
    bothCanProvide: `Either you or your ${partner} can provide the information requested by the court. You should agree your response first, before submitting it.`,
    line3: {
      part1: 'You can download a copy of the court’s full ',
      part2: 'Refusal Order (PDF)',
      part3: '.',
      downloadReference: 'Refusal-Order',
      link: '/downloads/conditional-order-refusal',
    },
    next: 'Providing information to the court',
    line4: 'You need to respond to the court’s feedback before your application can proceed.',
    line5: 'You will be able to upload or post documents to the court when you respond, if they have been requested.',
    buttonText: 'Provide information',
    buttonLink: `${isApplicant2 ? APPLICANT_2 : ''}${PROVIDE_INFORMATION_TO_THE_COURT}`,
  },
  clarificationSubmitted: {
    withDocuments: {
      youHaveProvided: `You have provided the information requested by the court. You'll receive an email by ${getFormattedDate(
        dayjs(userCase.dateSubmitted).add(config.get('dates.clarificationSubmittedOffsetDays'), 'day')
      )} after the court has reviewed it.`,
    },
    withoutDocuments: {
      needToPost: `You ${
        isJointApplication ? `or your ${partner}` : ''
      } need to post the documents requested by the court:`,
    },
    thisWasCourtsFeedback: 'This was the court’s feedback, explaining what was needed:',
  },
  courtFeedback: {
    jurisdictionDetailsReasonHeading: 'Jurisdiction',
    jurisdictionDetailsReasonBody: {
      part1:
        'The court has judged that your application does not fall within the jurisdiction of England and Wales. You must have at least one legal connection to England and Wales. You can see all the possible legal connections on the ',
      part2: 'Refusal Order document',
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
    courtsCommentsLongHeading: 'The court has made the following comments on your application:',
    courtsCommentsShortHeading: 'The court’s comments:',
  },
  conditionalOrderRejected: {
    line1: `The court is not yet satisfied you are entitled to ${
      isDivorce ? 'get divorced' : 'end your civil partnership'
    }. You need to read the court’s feedback and update your application, before you can continue.`,
    line2: 'The court’s feedback',
    line3: userCase.coRefusalRejectionAdditionalInfo,
    part1: 'You can download a copy of the court’s full',
    part2: 'Refusal Order PDF.',
    downloadReference: 'Refusal-Order',
    link: '/downloads/conditional-order-refusal',
    line4: 'What you need to do',
    line5: 'You will need to change the application, and submit it to the court again.',
    line6:
      'You will receive a paper copy of the application in the post. It will include a letter with details of how to update the application and send it back to the court.',
    line7: `You will need to agree the changes with your ${partner} before sending it back to the court.`,
    line8: `You will also need to pay a ${getFee(config.get('fees.updateApplication'))} amendment fee.`,
  },
  finalOrderGranted: {
    line1: `The court has granted you a final order.
    Your ${isDivorce ? 'marriage' : 'civil partnership'} is now legally ended.`,
    part1: "Download a copy of your 'final order'.",
    part2: ` This is the official court document which proves
      ${isDivorce ? 'you are divorced' : 'your civil partnership has ended'}.`,
    downloadReference: 'Final-Order-Granted',
    link: '/downloads/final-order-granted',
  },
});

const cy: typeof en = ({
  isDivorce,
  userCase,
  referenceNumber,
  partner,
  isJointApplication,
  isApplicant2,
}: CommonContent) => ({
  title: `${getName(userCase, 'applicant1')} & ${getName(userCase, 'applicant2')}`,
  referenceNumber: `Cyfeirnod: ${referenceNumber}`,
  applicationSubmitted: 'Application submitted',
  response: 'Response',
  conditionalOrderApplication: 'Conditional order application',
  conditionalOrderGranted: 'Conditional order granted',
  finalOrderApplication: 'Final order application',
  applicationEnded: isDivorce ? 'Divorced' : 'Civil partnership ended',
  subHeading1:
    userCase.state === 'AwaitingClarification' ? 'Beth sydd angen i chi ei wneud nawr' : 'Yr wybodaeth ddiweddaraf',
  subHeading2: 'Gwybodaeth ddefnyddiol',
  line1: 'Rhagor o wybodaeth am rannu arian ac eiddo',
  whatHappensNext: 'Beth fydd yn digwydd nesaf',
  button: {
    applyForConditionalOrder: 'Gwneud cais am orchymyn amodol',
    applyForFinalOrder: 'Gwneud cais am orchymyn terfynol',
  },
  awaitingPronouncement: {
    line1: `Mae cais am 'orchymyn amodol' wedi dod i law. Mae'r llys yn cytuno bod gennych hawl i ${
      isDivorce ? 'gael ysgariad' : "dod â'ch partneriaeth sifil i ben"
    }.`,
    line2: `Bydd barnwr yn 'cyhoeddi' (darllen allan) eich gorchymyn amodol mewn gwrandawiad. Bydd y gwrandawiad yn cael ei gynnal yn ${
      userCase.coCourt === ConditionalOrderCourt.BIRMINGHAM ? birmingham : buryStEdmunds
    } ar ${getFormattedDate(userCase.coDateAndTimeOfHearing, SupportedLanguages.Cy)} ar ${dayjs(
      userCase.coDateAndTimeOfHearing
    ).format('h:mmA')}.`,
    line3: `Nid oes angen i chi ddod i'r gwrandawiad, oni bai eich bod eisiau gwrthwynebu. Rhaid i chi gysylltu â'r llys erbyn ${getFormattedDate(
      dayjs(userCase.coDateAndTimeOfHearing).subtract(config.get('dates.contactCourtBeforeHearingDays'), 'day'),
      SupportedLanguages.Cy
    )} os ydych eisiau bod yn bresennol.`,
    line4: `Ar ôl i'ch gorchymyn amodol gael ei gyhoeddi, bydd byddwch chi wedyn yn gallu gwneud cais am 'orchymyn terfynol' ar ${getFormattedDate(
      dayjs(userCase.coDateAndTimeOfHearing).add(config.get('dates.applyForFoDays'), 'day'),
      SupportedLanguages.Cy
    )}. Dyma'r cam olaf yn y broses ${isDivorce ? 'ysgaru ' : ''}a bydd yn dod â'ch ${
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
  conditionalOrderGrantedDocumentLine: {
    part1: 'You can ',
    part2: "view and download your 'certificate of entitlement for a conditional order'.",
    part3: `This is the document that says the court does not see any reason why you cannot ${
      isDivorce ? 'get divorced' : 'end your civil partnership'
    }.`,
    downloadReference: 'Conditional-Order-Granted',
    link: '/downloads/conditional-order-granted',
  },
  conditionalOrderPronounced: {
    line1: `Rydych wedi cael 'gorchymyn amodol' gan y llys. Cafodd eich gorchymyn amodol ei gyhoeddi’n ffurfiol (darllen allan) gan farnwr yn ${
      userCase.coCourt === ConditionalOrderCourt.BIRMINGHAM ? birmingham : buryStEdmunds
    } ar ${getFormattedDate(userCase.coDateAndTimeOfHearing, SupportedLanguages.Cy)}.
    Mae eich ${partner} hefyd wedi cael gwybod.`,
    line2: `${isDivorce ? 'Nid ydych wedi ysgaru' : 'Nid yw eich partneriaeth sifil wedi dod i ben yn gyfreithiol'} eto.
    Mae’n rhaid i chi ${
      isJointApplication ? `/ eich ${partner} ` : ''
    }dal i orfod gwneud cais am orchymyn terfynol a fydd yn dod â'r ${
      isDivorce ? 'briodas' : 'partneriaeth sifil'
    } i ben.
    Gallwch wneud cais am orchymyn terfynol ar ${getFormattedDate(
      userCase.dateFinalOrderEligibleFrom,
      SupportedLanguages.Cy
    )}. Bydd hyn yn dod â'ch ${isDivorce ? 'priodas' : 'partneriaeth sifil i ben'}.`,
  },
  awaitingClarification: {
    line1:
      'Mae’r llys wedi adolygu eich cais am orchymyn amodol. Mae angen ichi ddarparu rhywfaint o wybodaeth cyn y gall y cais fynd yn ei flaen. Darllenwch reswm/rhesymau’r llys dros wrthod y cais a darparwch yr wybodaeth y gofynnwyd amdani.',
    bothCanProvide: `Gallwch chi neu'ch ${partner} ddarparu'r wybodaeth y mae'r llys yn gofyn amdani. Dylech gytuno ar eich ymateb yn gyntaf.`,
    line3: {
      part1: 'Gallwch lawrlwytho copi o ',
      part2: 'Orchymyn Gwrthod (PDF)',
      part3: ' llawn y llys.',
      downloadReference: 'Refusal-Order',
      link: '/downloads/conditional-order-refusal',
    },
    next: 'Darparu gwybodaeth i’r Llys',
    line4: 'Mae arnoch angen darparu’r wybodaeth a ofynnwyd amdani gan y llys.',
    line5: 'Byddwch yn gallu ysgrifennu ymateb i’r llys ac uwchlwytho unrhyw ddogfennau, os gofynnwyd amdanynt.',
    buttonText: 'Darparu gwybodaeth',
    buttonLink: `${isApplicant2 ? APPLICANT_2 : ''}${PROVIDE_INFORMATION_TO_THE_COURT}`,
  },
  clarificationSubmitted: {
    withDocuments: {
      youHaveProvided: `Rydych wedi darparu'r wybodaeth y gofynnodd y llys amdani. Byddwch yn cael e-bost erbyn ${getFormattedDate(
        dayjs(userCase.dateSubmitted).add(config.get('dates.clarificationSubmittedOffsetDays'), 'day'),
        SupportedLanguages.Cy
      )} ar ôl i'r llys ei adolygu.`,
    },
    withoutDocuments: {
      needToPost: `Mae angen i chi ${
        isJointApplication ? `neu eich ${partner}` : ''
      } bostio'r dogfennau y mae'r llys yn gofyn amdanynt:`,
    },
    thisWasCourtsFeedback: "Dyma adborth y llys, yn esbonio'r wybodaeth oedd ei hangen:",
  },
  courtFeedback: {
    jurisdictionDetailsReasonHeading: 'Awdurdodaeth',
    jurisdictionDetailsReasonBody: {
      part1:
        'Barnodd y llys nad yw eich cais yn syrthio o fewn awdurdodaeth llysoedd Cymru a Lloegr. Rhaid bod gennych o leiaf un cysylltiad cyfreithiol gyda Chymru a Lloegr. Gallwch weld yr holl gysylltiadau cyfreithiol posib yn y ',
      part2: 'Gorchymyn Gwrthod (PDF)',
      part3: '.',
      downloadReference: 'Refusal-Order',
      link: '/downloads/conditional-order-refusal',
    },
    marriageCertTranslationReasonHeading: `Cyfieithiad o’ch tystysgrif ${isDivorce ? 'priodas' : 'partneriaeth sifil'}`,
    marriageCertTranslationReasonBody: `Rhaid i’r dystysgrif ${
      isDivorce ? 'priodas' : 'partneriaeth sifil'
    } gael ei chyfieithu a’i hardystio gan ddatganiad o wirionedd neu notari cyhoeddus. Mae yna wasanaethau cyfieithu ar-lein sy’n cynnwys ardystio fel rhan o’u gwasanaeth. Bydd angen i chi sganio a llwytho’r ddogfen hon neu ei phostio i’r llys.`,
    marriageCertificateReasonHeading: `Eich tystysgrif ${isDivorce ? 'priodas' : 'partneriaeth sifil'} wreiddiol`,
    marriageCertificateReasonBody: `Nid yw’n ymddangos bod y ddelwedd o’ch tystysgrif ${
      isDivorce ? 'priodas' : 'partneriaeth sifil'
    } wedi cael ei sganio neu nid yw’n dangos y ddogfen wreiddiol lawn. Darparwch ddelwedd ddigidol neu gopi sgan o’r dystysgrif wreiddiol. Rhaid i’r ddelwedd fod o’r ddogfen gyfan a chynnwys y rhif cyfresol neu rif y system. Dylai fod staff y llys yn gallu ei darllen.`,
    previousProceedingDetailsReasonHeading: 'Manylion achosion cyfreithiol eraill ',
    previousProceedingDetailsReasonBody: `Cadarnhewch pa un a oes, neu a oes wedi bod erioed, unrhyw achosion llys eraill sy’n ymwneud â’r ${
      isDivorce ? 'briodas' : 'bartneriaeth sifil'
    }. Darparwch dystiolaeth bod unrhyw achos blaenorol wedi’i wrthod neu ei dynnu’n ôl.`,
    courtsCommentsLongHeading: "Mae'r llys wedi gwneud y sylwadau canlynol ar eich cais:",
    courtsCommentsShortHeading: 'Sylwadau’r llys:',
  },
  conditionalOrderRejected: {
    line1: `Nid yw'r llys yn fodlon eto bod gennych hawl i ${
      isDivorce ? 'gael ysgariad' : "dod â'ch partneriaeth sifil i ben"
    }. Mae angen i chi ddarllen sylwadau’r llys a diweddaru eich cais, cyn y gallwch barhau.`,
    line2: 'Sylwadau’r llys',
    line3: userCase.coRefusalRejectionAdditionalInfo,
    part1: 'Gallwch lawrlwytho copi o',
    part2: 'Orchymyn Gwrthod (PDF) llawn y llys.',
    downloadReference: 'Refusal-Order',
    link: '/downloads/conditional-order-refusal',
    line4: 'Beth sydd angen i chi ei wneud',
    line5: "Bydd angen i chi newid y cais, a'i gyflwyno i'r llys eto.",
    line6:
      "Byddwch yn cael copi papur o’r cais drwy'r post. Bydd yn cynnwys llythyr gyda manylion am sut i ddiweddaru’r cais a’i anfon yn ôl i’r llys.",
    line7: `Bydd arnoch angen cytuno ar y newidiadau gyda’ch ${partner} cyn ei anfon yn ôl i’r llys.`,
    line8: `Bydd angen i chi hefyd dalu ffi ddiwygio o ${getFee(config.get('fees.updateApplication'))}.`,
  },
  finalOrderGranted: {
    line1: `The court has granted you a final order.
    Your ${isDivorce ? 'marriage' : 'civil partnership'} is now legally ended.`,
    part1: "Download a copy of your 'final order'",
    part2: `This is the official court document which proves
      ${isDivorce ? 'you are divorced' : 'your civil partnership has ended'}.`,
    downloadReference: 'Refusal-Order',
    link: '/downloads/conditional-order-refusal',
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
  const { userCase, isDivorce, language } = content;
  const referenceNumber = formattedCaseId(userCase.id);
  const isCoFieldsSet =
    userCase.coCourt && userCase.coDateAndTimeOfHearing && userCase.coCertificateOfEntitlementDocument;
  const applicationTranslations = content.isJointApplication
    ? jointGenerateContent(content)
    : soleGenerateContent(content);
  const progressBarContent = getProgressBarContent(
    isDivorce,
    applicationTranslations.displayState as StateSequence,
    language === SupportedLanguages.En
  );
  return {
    ...languages[language]({ ...content, referenceNumber }),
    ...columnGenerateContent(content),
    ...applicationTranslations,
    isCoFieldsSet,
    ...latestLegalAdvisorDecisionContent(userCase, true),
    ...progressBarContent,
  };
};
