import config from 'config';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';

import { getFormattedDate } from '../../../app/case/answers/formatDate';
import { ConditionalOrderCourt, State, YesOrNo, birmingham, buryStEdmunds } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { getFee } from '../../../app/fees/service/get-fee';
import { SupportedLanguages } from '../../../modules/i18n';
import {
  form as applicant1Form,
  generateContent as applicant1GenerateContent,
} from '../../applicant1/hub-page/content';
import { CommonContent } from '../../common/common.content';
import { currentStateFn } from '../../state-sequence';
import { FINALISING_YOUR_APPLICATION, RESPONDENT } from '../../urls';

import { getRespondentHubTemplate } from './respondentTemplateSelector';

const en = ({ isDivorce, partner, userCase, contactEmail }: CommonContent) => ({
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
  respondToTheApplication: 'Respond to the application',
  holding: {
    line1: `You have responded to the ${
      isDivorce ? 'divorce application' : 'application to end your civil partnership'
    }. You do not have to do anything further.`,
    line2: `The next step is for your ${partner} to apply for a 'conditional order'. A conditional order is a document that says the court does not see any reason why you cannot ${
      isDivorce ? 'get a divorce' : 'end your civil partnership'
    }.`,
    line3: `Your ${partner} can apply for a conditional order from ${getFormattedDate(
      userCase.dueDate
    )}. This is because they have to wait 20 weeks from when the ${
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
    line2: `You have until ${getFormattedDate(
      dayjs(userCase.issueDate).add(config.get('dates.disputeDueDateOffsetDays'), 'day')
    )}
      to submit the ‘answer a ${isDivorce ? 'divorce' : 'dissolution'}’ form. This is the form for disputing ${
      isDivorce ? 'the divorce' : 'ending your civil partnership'
    }. You can <a class="govuk-link" href="https://www.gov.uk/government/publications/form-d8b-answer-to-a-divorcedissolutionjudicial-separation-or-nullity-petitionapplication">download the form here</a>.`,
    line3: `Fill in the form and email it to: <a class="govuk-link" href="mailto:${contactEmail}">${contactEmail}</a>`,
    line4: 'Or post it to:',
    line5: `You’ll have to pay a ${getFee(
      config.get('fees.d8bFormSubmission')
    )} fee when you submit the form. If you have little or no savings, are on certain benefits or have low income you may be able to get <a class="govuk-link" href="https://www.gov.uk/get-help-with-court-fees">help paying the fee</a>.`,
    line6: `If you do not submit your answer before ${getFormattedDate(
      dayjs(userCase.issueDate).add(config.get('dates.disputeDueDateOffsetDays'), 'day')
    )} then your ${partner} can continue ${isDivorce ? 'the divorce' : 'ending your civil partnership'}.`,
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
    } on ${getFormattedDate(userCase.coDateAndTimeOfHearing)}.
    Your ${partner} has also been notified.`,
    line2: `${isDivorce ? 'You are not divorced' : 'Your civil partnership is not legally ended'} yet.
    Your ${partner} still has to apply for a final order which will end the ${
      isDivorce ? 'marriage' : 'civil partnership'
    }.
    They can apply for a final order from ${getFormattedDate(
      userCase.dateFinalOrderEligibleFrom
    )}. This will end your ${isDivorce ? 'marriage' : 'civil partnership'}.`,
    line3: `If they do not apply for a final order by ${getFormattedDate(
      dayjs(userCase.dateFinalOrderEligibleFrom).add(3, 'months')
    )} then you can apply for a final order.`,
    line4: {
      part1: 'You can ',
      part2: 'download and read your conditional order.',
      downloadReference: 'Conditional-Order-Granted',
      link: '/downloads/conditional-order-granted',
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
      line1: `Your ${partner} has provided the information requested by the court. You’ll receive an email by ${getFormattedDate(
        dayjs(userCase.dateSubmitted).add(config.get('dates.clarificationSubmittedOffsetDays'), 'day')
      )} after the court has reviewed it.`,
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
    } on ${getFormattedDate(userCase.coDateAndTimeOfHearing)} at ${dayjs(userCase.coDateAndTimeOfHearing).format(
      'h:mmA'
    )}.`,
    line3: `You do not need to come to the hearing, unless you want to object. You must contact the court by ${getFormattedDate(
      dayjs(userCase.coDateAndTimeOfHearing).subtract(config.get('dates.contactCourtBeforeHearingDays'), 'day')
    )} if you want to attend.`,
    line4: `After your conditional order has been pronounced, your ${partner} will then be able to apply for a 'final order' on ${getFormattedDate(
      userCase.dateFinalOrderEligibleFrom
    )}. This is the final step in the ${isDivorce ? 'divorce ' : ''}process and will legally end your ${
      isDivorce ? 'marriage' : 'civil partnership'
    }.`,
  },
  awaitingFinalOrderOrFinalOrderOverdue: {
    line1: `Your ${partner} can now apply for a 'final order'. A final order is the document that will legally end your
     ${isDivorce ? 'marriage' : 'civil partnership'}. It’s the final step in the
     ${isDivorce ? 'divorce process' : 'process to end your civil partnership'}.`,
    line2: `If they do not apply by ${getFormattedDate(userCase.dateFinalOrderEligibleToRespondent)}
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
  finalOrderRequested: {
    line1: `Your ${partner} has applied for a ‘final order’. The application will be checked by court staff. If there are no other applications that need to be completed then your ${
      isDivorce ? 'divorce will be finalised' : 'civil partnership will be legally ended'
    }.`,
    line2: `${
      dayjs().isAfter(userCase.dateFinalOrderNoLongerEligible)
        ? `You will receive an email by ${getFormattedDate(
            dayjs(userCase.dateFinalOrderSubmitted).add(config.get('dates.finalOrderSubmittedOffsetDays'), 'day')
          )}`
        : 'You should receive an email within 2 working days,'
    } confirming whether the final order has been granted.`,
  },
});

// @TODO translations
const cy: typeof en = ({ isDivorce, partner, userCase, contactEmail }: CommonContent) => ({
  subHeading1:
    [State.AwaitingGeneralConsideration, State.Holding].includes(userCase.state as State) &&
    userCase.disputeApplication === YesOrNo.YES
      ? 'Beth sydd angen i chi ei wneud nesaf'
      : 'Diweddariad diweddaraf',
  awaitingAos: {
    line1: `Mae eich ${partner} wedi cyflwyno cais ${
      isDivorce ? 'am ysgariad' : "i ddod â'ch partneriaeth sifil i ben"
    }.`,
  },
  respondToTheApplication: "Ymateb i'r cais",
  holding: {
    line1: `Rydych wedi ymateb i'r ${
      isDivorce ? 'cais am ysgariad' : "cais i ddod â'ch partneriaeth sifil i ben"
    }. rhaid i chi wneud dim pellach.`,
    line2: `Y cam nesaf yw i'ch ${partner} wneud cais am 'orchymyn amodol'.  Mae gorchymyn amodol yn ddogfen sy'n dweud nad yw'r llys yn gweld unrhyw reswm pam na allwch ${
      isDivorce ? 'cael ysgariad' : "ddod â'ch partneriaeth sifil i ben"
    }.`,
    line3: `Gall eich ${partner} wneud cais am orchymyn amodol o ${getFormattedDate(
      userCase.dueDate,
      SupportedLanguages.Cy
    )}. Y rheswm am hyn yw bod yn rhaid iddynt aros 20 wythnos o'r adeg y cyhoeddwyd y ${
      isDivorce ? 'cais am ysgariad' : "cais i ddod â'ch partneriaeth sifil i ben"
    }. Byddwch yn cael e-bost pan fydd y gorchymyn amodol wedi'i roi.`,
    line4: `Ar ôl y gorchymyn amodol, mae angen iddynt wneud cais am orchymyn terfynol, sy'n dod â'r ${
      isDivorce ? 'briodas' : 'partneriaeth sifil'
    } i ben yn gyfreithiol. Ni ellir gwneud hyn tan 6 wythnos ar ôl y gorchymyn amodol.`,
    line5: `Gallwch ddefnyddio'r amser hyd nes daw’r cais am orchymyn amodol i benderfynu sut y bydd eich arian a'ch eiddo yn cael eu rhannu. Ymdrinnir â hyn ar wahân i'r ${
      isDivorce ? 'cais am ysgariad' : "cais i ddod â'ch partneriaeth sifil i ben"
    }. <a class="govuk-link" href="https://www.gov.uk/money-property-when-relationship-ends" target="_blank">Rhagor o wybodaeth am rannu arian ac eiddo</a>`,
  },
  d8Awaiting: {
    line1: `Rydych wedi ymateb i'r ${
      isDivorce ? 'cais am ysgariad' : "cais i ddod â'ch partneriaeth sifil i ben"
    } ac wedi dweud eich bod eisiau anghytuno ag ef.`,
    line2: `Mae gennych tan ${getFormattedDate(
      dayjs(userCase.issueDate).add(config.get('dates.disputeDueDateOffsetDays'), 'day'),
      SupportedLanguages.Cy
    )}
      i gyflwyno'r ffurflen ateb i ${
        isDivorce ? 'gais am ysgariad' : 'diddymiad'
      }’. Dyma'r ffurflen ar gyfer herio’r cais am ${
      isDivorce ? 'ysgariad' : "i ddod â'ch partneriaeth sifil i ben"
    }. Gallwch <a class="govuk-link" href="https://www.gov.uk/government/publications/form-d8b-answer-to-a-divorcedissolutionjudicial-separation-or-nullity-petitionapplication">lawrlwytho'r ffurflen yma</a>.`,
    line3: `Llenwch y ffurflen a'i hanfon drwy e-bost i: <a class="govuk-link" href="mailto:${contactEmail}">${contactEmail}</a>`,
    line4: 'Neu ei phostio i:',
    line5: `Bydd yn rhaid i chi dalu ffi o ${getFee(
      config.get('fees.d8bFormSubmission')
    )} pan fyddwch yn cyflwyno'r ffurflen. Os nad oes gennych fawr ddim cynilion, os o gwbl, eich bod ar fudd-daliadau penodol neu os oes gennych incwm isel, efallai y gallwch gae <a class="govuk-link" href="https://www.gov.uk/get-help-with-court-fees">help i dalu ffioedd</a>.`,
    line6: `Os na fyddwch yn cyflwyno'ch ateb cyn ${getFormattedDate(
      dayjs(userCase.issueDate).add(config.get('dates.disputeDueDateOffsetDays'), 'day'),
      SupportedLanguages.Cy
    )} yna gall eich ${partner} symud ymlaen gyda’r cais ${
      isDivorce ? 'am ysgariad' : "i ddod â'ch partneriaeth sifil i ben"
    }.`,
  },
  d8Submitted: {
    line1: `Rydych wedi ymateb i'r ${
      isDivorce ? 'cais am ysgariad' : "cais i ddod â'ch partneriaeth sifil i ben"
    } ac wedi dweud eich bod am anghytuno ag ef.`,
    line2: `YRydych wedi cyflwyno'r ffurflen ateb i gais am ${
      isDivorce ? 'ysgariad' : 'diddymiad'
    }’. Dyma'r ffurflen ar gyfer herio’r ${isDivorce ? 'ysgariad' : "cais i ddod â'ch partneriaeth sifil i ben"}.`,
    line3: `Bydd barnwr yn penderfynu a oes angen i chi a'ch ${partner} fynychu gwrandawiad. Efallai y cysylltir â chi i gael rhagor o wybodaeth i'w helpu i wneud penderfyniad.`,
    line4:
      "Byddwch yn cael llythyr yn y post yn dweud wrthych a oes angen i chi ddod i'r gwrandawiad ai peidio, a ble y bydd hynny yn digwydd.",
  },
  conditionalOrderPronounced: {
    line1: `Rydych wedi cael 'gorchymyn amodol' gan y llys. Cafodd eich gorchymyn amodol ei gyhoeddi’n ffurfiol (darllen allan) gan farnwr yn ${
      userCase.coCourt === ConditionalOrderCourt.BIRMINGHAM ? birmingham : buryStEdmunds
    } ar ${getFormattedDate(userCase.coDateAndTimeOfHearing, SupportedLanguages.Cy)}.
    Mae eich ${partner} hefyd wedi cael gwybod.`,
    line2: `${isDivorce ? 'Nid ydych wedi ysgaru' : 'Nid yw eich partneriaeth sifil wedi dod i ben yn gyfreithiol'} eto.
    Mae'n rhaid i'ch ${partner} wneud cais o hyd am orchymyn terfynol a fydd yn dod â'r ${
      isDivorce ? 'briodas' : 'partneriaeth sifil'
    } i ben.
    Gallant wneud cais am orchymyn terfynol ar ${getFormattedDate(
      userCase.dateFinalOrderEligibleFrom,
      SupportedLanguages.Cy
    )}. Bydd hyn yn dod â'ch ${isDivorce ? 'priodas' : 'partneriaeth sifil i ben'}.`,
    line3: `Os nad ydynt yn gwneud cais am orchymyn terfynol erbyn ${getFormattedDate(
      userCase.dateFinalOrderEligibleFrom,
      SupportedLanguages.Cy
    )} yna gallwch wneud cais am orchymyn terfynol.`,
    line4: {
      part1: 'Gallwch ',
      part2: 'ddarllen a lawrlwytho eich tystysgrif hawl.',
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
      line1: `Your ${partner} has provided the information requested by the court. You’ll receive an email by ${getFormattedDate(
        dayjs(userCase.dateSubmitted).add(config.get('dates.clarificationSubmittedOffsetDays'), 'day'),
        SupportedLanguages.Cy
      )} after the court has reviewed it.`,
    },
    withoutDocuments: {
      line1: `You or your ${partner} need to post the documents requested by the court:`,
      line2: 'address',
      line3: 'You will receive an update when your documents have been received and checked.',
    },
  },
  awaitingPronouncement: {
    line1: `Eich ${partner} am 'orchymyn amodol' wedi dod i law. Mae'r llys yn cytuno bod gennych hawl i ${
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
    line4: `Ar ôl i'ch gorchymyn amodol gael ei gyhoeddi, bydd eich ${partner} wedyn yn gallu gwneud cais am 'orchymyn terfynol' ar ${getFormattedDate(
      userCase.dateFinalOrderEligibleFrom,
      SupportedLanguages.Cy
    )}. Dyma'r cam olaf yn y broses ${isDivorce ? 'ysgaru ' : ''}a bydd yn dod â'ch  ${
      isDivorce ? 'priodas' : 'partneriaeth sifil'
    } i ben yn gyfreithiol.`,
  },
  awaitingFinalOrderOrFinalOrderOverdue: {
    line1: `Your ${partner} can now apply for a 'final order'. A final order is the document that will legally end your
     ${isDivorce ? 'marriage' : 'civil partnership'}. It’s the final step in the
     ${isDivorce ? 'divorce process' : 'process to end your civil partnership'}.`,
    line2: `If they do not apply by ${getFormattedDate(userCase.dateFinalOrderEligibleToRespondent)}
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
  finalOrderRequested: {
    line1: `Mae eich ${partner} wedi gwneud cais am 'orchymyn terfynol'. Bydd y cais yn cael ei wirio gan staff y llys. Os nad oes unrhyw geisiadau eraill y mae angen eu cwblhau yna bydd eich ${
      isDivorce ? 'ysgariad yn cael ei gadarnhau' : 'bydd eich partneriaeth sifil yn dod i ben yn gyfreithiol'
    }.`,
    line2: `${
      dayjs().isAfter(userCase.dateFinalOrderNoLongerEligible)
        ? `Byddwch yn cael e-bost erbyn ${getFormattedDate(
            dayjs(userCase.dateFinalOrderSubmitted).add(config.get('dates.finalOrderSubmittedOffsetDays'), 'day'),
            SupportedLanguages.Cy
          )} yn cadarnhau`
        : 'Dylech gael e-bost o fewn 2 ddiwrnod gwaith, gan gadarnhau'
    } a yw'r gorchymyn terfynol wedi'i gadarnhau.`,
  },
});

const languages = {
  en,
  cy,
};

export const form = applicant1Form;

export const generateContent: TranslationFn = content => {
  const { userCase, language } = content;
  const isRespondentAbleToApplyForFinalOrder = dayjs(userCase.dateFinalOrderEligibleToRespondent).diff(dayjs()) < 0;
  const hasSubmittedAos = !isEmpty(userCase.dateAosSubmitted);
  const displayState = currentStateFn(userCase).at(
    (userCase.state === State.OfflineDocumentReceived ? userCase.previousState : userCase.state) as State
  );
  const theLatestUpdateTemplate = getRespondentHubTemplate(displayState, userCase, hasSubmittedAos);
  return {
    ...applicant1GenerateContent(content),
    ...languages[language](content),
    displayState,
    theLatestUpdateTemplate,
    isRespondentAbleToApplyForFinalOrder,
    hasSubmittedAos,
  };
};
