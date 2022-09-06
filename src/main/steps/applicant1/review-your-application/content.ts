import config from 'config';
import dayjs from 'dayjs';

import { getFormattedCaseDate, getFormattedDate } from '../../../app/case/answers/formatDate';
import { FinancialOrderFor, YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { getFee } from '../../../app/fees/service/get-fee';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { connectionBulletPointsSummarisedForAllUsers } from '../../../app/jurisdiction/bulletedPointsContent';
import {
  cyDomicile,
  cyHabitualResident,
  cyResidual,
  enDomicile,
  enHabitualResident,
  enResidual,
} from '../../../app/jurisdiction/moreDetailsContent';
import { CommonContent } from '../../common/common.content';
import { accessibleDetailsSpan, formattedCaseId } from '../../common/content.utils';
import { CHECK_CONTACT_DETAILS } from '../../urls';

const en = ({ isDivorce, isApplicant2, userCase, partner, required, isJointApplication }: CommonContent) => ({
  title: `Review your ${isDivorce ? 'divorce application' : 'application to end your civil partnership'}`,
  subtitle: `Read your original application ${
    isDivorce ? 'for divorce' : 'to end your civil partnership'
  } below and confirm the information is still correct and true, to the best of your knowledge.`,
  heading1: `${isDivorce ? 'Divorce application' : 'Application to end a civil partnership'}`,
  line1: `${userCase.applicant1FirstNames} ${userCase.applicant1LastNames} is applying to the court:`,
  listItem1: `${
    isDivorce ? 'for a final order of divorce from' : 'for the dissolution of the civil partnership with'
  } ${userCase.applicant2FirstNames} ${userCase.applicant2LastNames}`,
  listItem2: 'to make a financial order',
  caseReferenceHeading: 'Case reference number',
  caseReferenceValue: formattedCaseId(userCase.id),
  issuedDateHeading: 'Issued',
  issuedDateValue: getFormattedDate(userCase.issueDate),
  applicantHeading: 'Applicant',
  applicantNames: `${userCase.applicant1FirstNames} ${userCase.applicant1MiddleNames} ${userCase.applicant1LastNames}`,
  respondentHeading: 'Respondent',
  respondentNames: `${userCase.applicant2FirstNames} ${userCase.applicant2MiddleNames} ${userCase.applicant2LastNames}`,
  whatThisMeansInfo1: `The applicant is the person who has applied ${
    isDivorce ? 'for the divorce' : 'to end their civil partnership'
  }.`,
  whatThisMeansInfo2: `The respondent is their ${partner}.`,
  heading2: `About the ${isDivorce ? 'marriage' : 'civil partnership'}`,
  line2: `These details are copied directly from the marriage certificate, or the translation of the certificate if it’s not in English.
  The names on the certificate are the names the applicant and respondent used before the ${
    isDivorce ? 'marriage' : 'civil partnership'
  }.`,
  heading3: `Who the ${isDivorce ? 'marriage' : 'civil partnership'} is between`,
  line3: `${userCase.applicant1FullNameOnCertificate} and ${
    userCase.applicant2FullNameOnCertificate
  } (as shown on the ${isDivorce ? 'marriage' : 'civil partnership'} certificate)`,
  heading4: `Where the ${isDivorce ? 'marriage' : 'civil partnership'} took place`,
  ceremonyPlace: userCase.ceremonyPlace,
  ceremonyCountryHeading: `Country of ${isDivorce ? 'marriage' : 'civil partnership'}`,
  ceremonyCountry: userCase.ceremonyCountry,
  heading5: `Date of ${isDivorce ? 'marriage' : 'civil partnership'}`,
  relationshipDate: getFormattedCaseDate(userCase.relationshipDate),
  heading6: 'Why the court can deal with the case (jurisdiction)',
  line4: 'The courts of England and Wales have the legal power (jurisdiction) to deal with this case because:',
  connectionBulletPoints: userCase.connections
    ? connectionBulletPointsSummarisedForAllUsers(userCase.connections, true, isDivorce, isJointApplication)
    : [],
  whatThisMeans: 'What this means',
  whatThisMeansInfo3: `The courts of England or Wales must have the legal power (jurisdiction) to be able to ${
    isDivorce ? 'grant a divorce' : 'end a civil partnership'
  }. The applicant confirmed that the legal statement(s) in the application apply to either or both the applicant and respondent. Each legal statement includes some or all of the following legal connections to England or Wales.`,
  habitualResidenceHeading: enHabitualResident.heading,
  habitualResidenceText: enHabitualResident.body,
  domicileHeading: enDomicile.heading,
  domicileText: enDomicile.body,
  residualJurisdictionHeading: enResidual(isDivorce, partner).heading,
  residualJurisdictionText: enResidual(isDivorce, partner).body,
  heading10: 'Other court cases',
  otherCourtCasesLine1: `The court needs to know about any other court cases relating to the ${
    isDivorce ? 'marriage' : 'civil partnership'
  },
  which might affect the legal power (jurisdiction) of the court.`,
  otherCourtCasesLine2: `The applicant has given details of other court cases relating to the ${
    isDivorce ? 'marriage' : 'civil partnership'
  }:`,
  applicantLegalProceedingsDetails: `${userCase.applicant1LegalProceedingsDetails}`,
  noOtherCourtCases: `The applicant has indicated that there are no other court cases which are related to the ${
    isDivorce ? 'marriage' : 'civil partnership'
  }.`,
  heading11: `Reason for ${isDivorce ? 'the divorce' : 'ending the civil partnership'}`,
  line5: `The ${isDivorce ? 'marriage' : 'relationship'} has broken down irretrievably (it cannot be saved).`,
  heading12: 'Financial order application',
  financialOrderLine1: `The applicant is applying to the court for financial orders ${userCase.applicant1WhoIsFinancialOrderFor
    ?.sort()
    .join(' and ')
    .replace(FinancialOrderFor.APPLICANT, 'for the applicant')
    .replace(FinancialOrderFor.CHILDREN, 'for the children of the applicant and the respondent')}.`,
  noFinancialOrder: 'The applicant is not applying to the court for financial orders.',
  financialOrderMoreInfoLine1: `${
    isApplicant2 ? 'You were asked if you' : `Your ${partner} was asked if they`
  } want the court to decide how your money, property, pensions and other assets will be split. These decisions are called ‘financial orders’. Financial orders can be made between you and your ${partner} and any children that you may have.`,
  financialOrderMoreInfoLine2:
    'A financial order can be made if you agree about dividing money and property, and you want to make the decision legally binding. This is known as a ‘financial order by consent’. Or they can be made if you disagree about dividing money and property and want the court to decide for you. This is known as a ‘contested financial order’.',
  financialOrderMoreInfoLine3: `To formally start legal proceedings, your ${partner} will need to complete another form and pay a fee. Applying for a ‘contested financial order’ costs ${getFee(
    config.get('fees.financialOrder')
  )}. Applying for a ‘financial order by consent’ costs ${getFee(
    config.get('fees.consentOrder')
  )}. A solicitor can draft these for you.`,
  financialOrderMoreInfoLine4: 'If you are not sure what to do then you should seek legal advice.',
  heading13: 'Statement of truth',
  factsTrue: 'I believe that the facts stated in this application are true.',
  confirmInformationStillCorrect: 'Is the information in this application still correct?',
  reasonInformationNotCorrect: {
    heading1: 'Changing your contact details',
    part1: 'You can update your address and phone number in the',
    link: CHECK_CONTACT_DETAILS,
    linkText: `'contact details' section of your ${isDivorce ? 'divorce' : ''} account.`,
    part2: 'There is no cost for this.',
    heading2: 'Changing any other information',
    part3: `If you want to change any other information then you should provide details below. The court will review it and you may need to pay a ${getFee(
      config.get('fees.updateApplication')
    )} fee. This is because the application will need to be updated and may need to be sent to your ${partner} again.`,
  },
  reasonInformationNotCorrectHint:
    'Provide details of any other information that needs updating. Do not tell the court about updates to contact details here.',
  errors: {
    applicant1ConfirmInformationStillCorrect: {
      required,
    },
    applicant1ReasonInformationNotCorrect: {
      required:
        'You have said the information is not still correct but not provided details. Provide details of what information is not correct.',
    },
  },
});

const cy: typeof en = ({
  isDivorce,
  isApplicant2,
  userCase,
  partner,
  required,
  isJointApplication,
}: CommonContent) => ({
  title: `Adolygu eich ${isDivorce ? 'cais am ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'}`,
  subtitle: `Darllenwch eich cais gwreiddiol ${
    isDivorce ? 'am ysgariad' : 'i ddod â’ch partneriaeth sifil i ben'
  } isod a chadarnhewch fod yr wybodaeth dal yn gywir ac yn wir, hyd at eithaf eich gwybodaeth.`,
  heading1: `${isDivorce ? 'Cais am ysgariad' : 'cais i ddod â phartneriaeth sifil i ben'}`,
  line1: `Mae ${userCase.applicant1FirstNames} ${userCase.applicant1LastNames} yn gwneud cais i’r llys:`,
  listItem1: `${isDivorce ? 'am orchymyn ysgaru terfynol oddi wrth' : 'i ddiddymu’r bartneriaeth sifil gyda'} ${
    userCase.applicant2FirstNames
  } ${userCase.applicant2LastNames}`,
  listItem2: 'i wneud gorchymyn ariannol',
  caseReferenceHeading: 'Cyfeirnod yr achos',
  caseReferenceValue: formattedCaseId(userCase.id),
  issuedDateHeading: 'Dyddiad cyflwyno',
  issuedDateValue: dayjs(userCase.issueDate).format('D MMMM YYYY'),
  applicantHeading: 'Ceisydd',
  applicantNames: `${userCase.applicant1FirstNames} ${userCase.applicant1MiddleNames} ${userCase.applicant1LastNames}`,
  respondentHeading: 'Atebydd',
  respondentNames: `${userCase.applicant2FirstNames} ${userCase.applicant2MiddleNames} ${userCase.applicant2LastNames}`,
  whatThisMeansInfo1: `Y ceisydd yw’r unigolyn sydd wedi gwneud cais ${
    isDivorce ? 'am yr ysgariad' : 'i ddod a’u partneriaeth sifil i ben'
  }.`,
  whatThisMeansInfo2: `Yr atebydd yw eu  ${partner}.`,
  heading2: `Ynghylch y ${isDivorce ? 'briodas' : 'bartneriaeth sifil'}`,
  line2: `Caiff y manylion hyn eu copïo’n uniongyrchol oddi ar y ${
    isDivorce ? 'priodas' : 'partneriaeth sifil'
  } dystysgrif, neu gyfieithiad o’r dystysgrif os nad yw’n Saesneg.
  Yr enwau ar y dystysgrif yw’r enwau yr oedd y ceisydd a’r atebydd yn eu defnyddio cyn ${
    isDivorce ? 'briodas' : 'bartneriaeth sifil'
  }.`,
  heading3: `Rhwng pwy mae’r ${isDivorce ? 'briodas' : 'bartneriaeth sifil'}`,
  line3: `${userCase.applicant1FullNameOnCertificate} ac ${
    userCase.applicant2FullNameOnCertificate
  } (fel y dangosir ar y ${isDivorce ? 'priodas' : 'partneriaeth sifil'} dystysgrif)`,
  heading4: `Lle gweinyddwyd y ${isDivorce ? 'briodas' : 'bartneriaeth sifil'}`,
  ceremonyPlace: `${userCase.ceremonyPlace}`,
  ceremonyCountryHeading: `Gwlad y ${isDivorce ? 'briodas' : 'bartneriaeth sifil'}`,
  ceremonyCountry: userCase.ceremonyCountry,
  heading5: `Dyddiad y ${isDivorce ? 'briodas' : 'bartneriaeth sifil'}`,
  relationshipDate: getFormattedCaseDate(userCase.relationshipDate),
  heading6: 'Pam y gall y llys ddelio â’r achos (awdurdodaeth)',
  line4: 'Mae gan lysoedd Cymru a Lloegr y pŵer cyfreithiol (awdurdodaeth) i ddelio â’r achos hwn oherwydd:',
  connectionBulletPoints: userCase.connections
    ? connectionBulletPointsSummarisedForAllUsers(userCase.connections, false, isDivorce, isJointApplication)
    : [],
  whatThisMeans: 'Beth mae hyn yn ei olygu',
  whatThisMeansInfo3: `Rhaid bod gan lysoedd Cymru a Lloegr yr awdurdodaeth (y pŵer cyfreithiol) i allu ${
    isDivorce ? 'caniatáu ysgariad' : 'dod â phartneriaeth sifil i ben'
  }. Cadarnhaodd y ceisydd bod y datganiad(au) cyfreithiol yn y cais yn berthnasol i naill ai’r ceisydd neu’r atebydd neu’r ddau ohonynt. Mae pob datganiad cyfreithiol yn cynnwys rhai o’r cysylltiadau cyfreithiol canlynol â Chymru neu Loegr, neu bob un ohonynt.`,
  habitualResidenceHeading: cyHabitualResident.heading,
  habitualResidenceText: cyHabitualResident.body,
  domicileHeading: enDomicile.heading,
  domicileText: cyDomicile.body,
  residualJurisdictionHeading: cyResidual(isDivorce, partner).heading,
  residualJurisdictionText: cyResidual(isDivorce, partner).body,
  heading10: 'Achosion llys eraill',
  otherCourtCasesLine1: `Mae’r llys angen gwybod am unrhyw achosion llys eraill sy’n ymwneud â’r ${
    isDivorce ? 'briodas' : 'bartneriaeth sifil'
  },
  a all effeithio ar bŵer cyfreithiol (awdurdodaeth) y llys.`,
  otherCourtCasesLine2: `Mae’r ceisydd wedi rhoi manylion am achosion llys eraill sy’n ymwneud â’r ${
    isDivorce ? 'briodas' : 'bartneriaeth sifil'
  }:`,
  applicantLegalProceedingsDetails: `${userCase.applicant1LegalProceedingsDetails}`,
  noOtherCourtCases: `Mae’r ceisydd wedi nodi nad oes unrhyw achosion llys eraill sy’n ymwneud â’r ${
    isDivorce ? 'briodas' : 'bartneriaeth sifil'
  }.`,
  heading11: `Rheswm dros  ${isDivorce ? 'yr ysgariad' : 'ddod â’r bartneriaeth sifil i ben'}`,
  line5: `Mae’r ${isDivorce ? 'briodas' : 'berthynas'} wedi chwalu’n gyfan gwbl (ni ellir ei hachub).`,
  heading12: 'Cais am orchymyn ariannol',
  financialOrderLine1: `Mae’r ceisydd yn bwriadu gwneud cais i’r llys am orchmynion ariannol ar gyfer y ceisydd, ${userCase.applicant1WhoIsFinancialOrderFor
    ?.sort()
    .join(' ac ')
    .replace(FinancialOrderFor.APPLICANT, 'ar gyfer ceisydd')
    .replace(FinancialOrderFor.CHILDREN, 'plant y ceisydd a’r atebydd')}.`,
  noFinancialOrder: 'Nid yw’r ceiswyr yw gwneud cais i’r llys am orchmynion ariannol',
  financialOrderMoreInfoLine1: `${
    isApplicant2 ? 'Fe ofynnwyd i chi' : `Fe ofynnwyd i’ch ${partner}`
  } os ydych/ydynt eisiau i’r llys benderfynu sut y bydd eich arian, eich eiddo, eich pensiynau a’ch asedau eraill yn cael eu rhannu. Fe elwir y penderfyniadau hyn yn ‘gorchmynion ariannol’. Gellir gwneud gorchmynion ariannol rhyngoch chi a’ch ${partner} sifil ac unrhyw blant sydd gennych.`,
  financialOrderMoreInfoLine2:
    'Gellir gwneud gorchymyn ariannol os ydych yn cytuno ynghylch sut i rannu arian ac eiddo, ac os ydych eisiau gwneud y penderfyniad yn rhwymol gyfreithiol. Fe elwir hyn yn ‘gorchymyn ariannol trwy gydsyniad’. Neu gellir eu gwneud os ydych yn anghytuno ar sut i rannu arian ac eiddo ac rydych eisiau i’r llys benderfynu. Gelwir hyn yn ‘gorchymyn ariannol sy’n cael ei wrthwynebu’.',
  financialOrderMoreInfoLine3: `Bydd angen i’ch gŵr ${partner} lenwi ffurflen arall a thalu ffi i gychwyn achos cyfreithiol yn ffurfiol. Mae gwneud cais am ‘gorchymyn ariannol sy’n cael ei wrthwynebu’ yn costio ${getFee(
    config.get('fees.financialOrder')
  )}. Mae gwneud cais am ‘gorchymyn ariannol trwy gydsyniad’ yn costio ${getFee(
    config.get('fees.consentOrder')
  )}. Gall cyfreithiwr ddrafftio’r rhain i chi.`,
  financialOrderMoreInfoLine4: 'Os nad ydych chi’n siŵr beth i’w wneud, dylech gael cyngor cyfreithiol.',
  heading13: 'Datganiad Gwirionedd',
  factsTrue: 'Credaf fod y ffeithiau a nodir yn y cais hwn yn wir.',
  confirmInformationStillCorrect: 'A yw’r wybodaeth yn y cais hwn dal yn gywir?',
  reasonInformationNotCorrect: {
    heading1: 'Newid eich manylion cyswllt',
    part1: 'Gallwch ddiweddaru eich cyfeiriad a’ch rhif ffôn yn yr',
    link: CHECK_CONTACT_DETAILS,
    linkText: `'adran ‘manylion cyswllt’ o’ch cyfrif ${isDivorce ? 'ysgaru' : ''}.`,
    part2: 'Ni chodir cost am hyn',
    heading2: 'Newid unrhyw wybodaeth arall',
    part3: `Os ydych eisiau newid unrhyw wybodaeth arall yna dylech ddarparu’r manylion isod. Bydd y llys yn ei adolygu ac efallai bydd rhaid i chi dalu ffi o ${getFee(
      config.get('fees.updateApplication')
    )}. Mae hyn oherwydd y bydd rhaid adolygu’r cais ac efallai bydd rhaid anfon y cais at eich ${partner} eto.`,
  },
  reasonInformationNotCorrectHint:
    'Darparwch fanylion am unrhyw wybodaeth arall sydd angen cael ei diweddaru. Peidiwch â dweud wrth y llys am ddiweddariadau i fanylion cyswllt yma.',
  yes: 'Ydy',
  no: 'Nac ydy',
  errors: {
    applicant1ConfirmInformationStillCorrect: {
      required,
    },
    applicant1ReasonInformationNotCorrect: {
      required:
        'Rydych wedi dweud bod yr wybodaeth yn anghywir o hyd, ond nid ydych wedi rhoi manylion. Nodwch pa wybodaeth sy’n anghywir, os gwelwch yn dda.',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1ConfirmInformationStillCorrect: {
      type: 'hidden',
      values: [
        { label: l => l.yes, value: YesOrNo.YES },
        {
          label: l => l.no,
          value: YesOrNo.NO,
          subFields: {
            applicant1ReasonInformationNotCorrect: {
              type: 'hidden',
              label: l => l.title,
              validator: value => isFieldFilledIn(value),
            },
          },
        },
      ],
      validator: value => isFieldFilledIn(value),
    },
  },
  submit: {
    text: l => l.continue,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  const whatThisMeansApplicantRespondent = accessibleDetailsSpan(
    translations['whatThisMeans'],
    'The terms applicant and respondent'
  );
  const whatThisMeansJurisdiction = accessibleDetailsSpan(translations['whatThisMeans'], translations['heading6']);
  const whatThisMeansFinancialOrder = accessibleDetailsSpan(translations['whatThisMeans'], translations['heading12']);
  return {
    ...translations,
    form,
    whatThisMeansApplicantRespondent,
    whatThisMeansJurisdiction,
    whatThisMeansFinancialOrder,
  };
};
