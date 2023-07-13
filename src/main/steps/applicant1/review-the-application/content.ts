import config from 'config';

import { getFormattedCaseDate, getFormattedDate } from '../../../app/case/answers/formatDate';
import { Checkbox } from '../../../app/case/case';
import { Applicant2Represented, FinancialOrderFor, YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { getFee } from '../../../app/fees/service/get-fee';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { connectionBulletPointsSummarisedForAllUsers } from '../../../app/jurisdiction/bulletedPointsContent';
import { jurisdictionMoreDetailsContent } from '../../../app/jurisdiction/moreDetailsContent';
import { SupportedLanguages } from '../../../modules/i18n';
import { CommonContent } from '../../common/common.content';
import {
  accessibleDetailsSpan,
  formattedCaseId,
  getAddressFields,
  getAppSolAddressFields,
  getApplicant1PartnerContent,
} from '../../common/content.utils';

const en = ({ isDivorce, userCase, partner, applicant1Partner, isApplicant2, isJointApplication }) => ({
  title: `Review the ${isDivorce ? 'divorce application' : 'application to end your civil partnership'}`,
  line1: `Review this application ${
    isDivorce ? 'for divorce' : 'to end your civil partnership'
  } and confirm you have read it.`,
  subHeading1: `Sole ${isDivorce ? 'divorce application' : 'application to end a civil partnership'}`,
  line2: {
    heading: `${userCase.applicant1FirstNames} ${userCase.applicant1LastNames} is applying to the court`,
    item1: `for ${isDivorce ? 'a final order of divorce from' : 'the dissolution of the civil partnership with'}
    ${userCase.applicant2FirstNames} ${userCase.applicant2LastNames}`,
    item2: 'to make a financial order',
  },
  line3: {
    key: 'Issued',
    value: getFormattedDate(userCase.issueDate),
  },
  line4: {
    key: 'Case reference number',
    value: formattedCaseId(userCase.id),
  },
  line5: 'Applicant',
  line6: `${userCase.applicant1FirstNames} ${
    userCase.applicant1MiddleNames ? userCase.applicant1MiddleNames + ' ' : ''
  }${userCase.applicant1LastNames}`,
  line7: 'Respondent',
  line8: `${userCase.applicant2FirstNames} ${
    userCase.applicant2MiddleNames ? userCase.applicant2MiddleNames + ' ' : ''
  }${userCase.applicant2LastNames}`,
  line9: {
    p1: `The applicant is the person who has applied ${
      isDivorce ? 'for the divorce' : 'to end their civil partnership'
    }.`,
    p2: `The respondent is their ${applicant1Partner}.`,
  },
  subHeading2: `About the ${isDivorce ? 'marriage' : 'civil partnership'}`,
  line10: `These details are copied directly from the ${isDivorce ? 'marriage' : 'civil partnership'} certificate,
     or the translation of the certificate, if it’s not in English. The names on the certificate are the names the
      applicant and respondent used before the ${isDivorce ? 'marriage' : 'civil partnership'}.`,
  line11: `Who the ${isDivorce ? 'marriage' : 'civil partnership'} is between`,
  line12: `${userCase.applicant1FullNameOnCertificate + ' and ' + userCase.applicant2FullNameOnCertificate}
  (as shown on the ${isDivorce ? 'marriage' : 'civil partnership'} certificate)`,
  line13: `Where the ${isDivorce ? 'marriage' : 'civil partnership'} took place`,
  line14: userCase.ceremonyPlace,
  line15: `Date of ${isDivorce ? 'marriage' : 'civil partnership'}`,
  line16: getFormattedCaseDate(userCase.relationshipDate),
  subHeading3: 'Why the court can deal with the case (jurisdiction)',
  line17: 'The courts of England and Wales have the legal power (jurisdiction) to deal with this case because:',
  connectionBulletPoints:
    userCase && userCase.connections
      ? connectionBulletPointsSummarisedForAllUsers(userCase.connections, true, isDivorce, isJointApplication)
      : [],
  jurisdictionsMoreDetails: {
    part1: `The courts of England or Wales must have the legal power (jurisdiction) to be able to ${
      isDivorce ? 'grant a divorce' : 'end a civil partnership'
    }.
      The applicant confirmed that the legal statement(s) in the application apply to either or both the applicant and respondent.
      Each legal statement includes some or all of the following legal connections to England or Wales.`,
    part2: jurisdictionMoreDetailsContent(userCase.connections, true, isDivorce, partner).text,
  },
  whatThisMeans: 'What this means',
  subHeading4: 'Other court cases',
  line18: `The court needs to know about any other court cases relating to the ${
    isDivorce ? 'marriage' : 'civil partnership'
  }, which might affect the legal power (jurisdiction) of the court.`,
  line19: `${
    userCase.applicant1LegalProceedings === YesOrNo.YES
      ? `The applicant has given details of other court cases relating to the ${
          isDivorce ? 'marriage' : 'civil partnership'
        }:` +
        '<br>' +
        userCase.applicant1LegalProceedingsDetails
      : `The applicant has indicated that there are no other court cases which are related to the ${
          isDivorce ? 'marriage' : 'civil partnership'
        }`
  }.`,
  subHeading5: `Reason for ${isDivorce ? 'the divorce' : 'ending the civil partnership'}`,
  line20: `The ${isDivorce ? 'marriage' : 'relationship'} has broken down irretrievably (it cannot be saved).`,
  subHeading6: 'Financial order application',
  financialOrderYes: `The applicant intends to apply to the court for financial orders ${userCase.applicant1WhoIsFinancialOrderFor
    ?.sort()
    .join(' and ')
    .replace(FinancialOrderFor.APPLICANT, 'for the applicant')
    .replace(FinancialOrderFor.CHILDREN, 'for the children of the applicant and the respondent')}.`,
  financialOrderNo: 'The applicant is not intending to apply to the court for financial orders.',
  financialOrderMoreDetails: `${isApplicant2 ? `Your ${partner} was asked if they` : 'You were asked if you'}
   want the court to decide how your money, property, pensions and other assets will be split.
   These decisions are called ‘financial orders’. Financial orders can be made between you and your ${partner} and any children that you may have.
   <br><br>A financial order can be made if you agree about dividing money and property, and you want to make the decision legally binding.
   This is known as a ‘financial order by consent’. Or they can be made if you disagree about dividing money and property and want the court to decide.
   This is known as a ‘contested financial order’.
   <br><br>To formally start legal proceedings, ${partner} will need to complete another form and pay a fee.
   Applying for a ‘contested financial order’ costs ${getFee(
     config.get('fees.financialOrder')
   )}. Applying for a ‘financial order by consent’ costs ${getFee(config.get('fees.consentOrder'))}.
   You can get a solicitor to draft these and apply for you.
   <br><br>If you are not sure what to do then you should seek legal advice.`,
  subHeading7: "Applicant's correspondence address",
  applicantAddress: getAppSolAddressFields('applicant1', userCase),
  subHeading8: "Applicant's email address",
  subHeading9: "Respondent's correspondence address",
  respondentAddress: getAppSolAddressFields('applicant2', userCase),
  subHeading10: "Respondent's email address",
  subHeading11: "Respondent's solicitor details",
  noDetailsProvided: 'No details provided',
  solName: `Solicitor name: ${userCase.applicant2SolicitorName ? userCase.applicant2SolicitorName : 'not given'}`,
  solEmail: `Solicitor email address: ${
    userCase.applicant2SolicitorEmail ? userCase.applicant2SolicitorEmail : 'not given'
  }`,
  solFirmName: `Solicitor firm name: ${
    userCase.applicant2SolicitorFirmName ? userCase.applicant2SolicitorFirmName : 'not given'
  }`,
  solAddressLabel: 'Solicitor address: ',
  solAddress: userCase.applicant2SolicitorAddress?.trim() ? getAddressFields('applicant2Solicitor', userCase) : [],
  solAddressEmpty: 'not given',
  subHeading12: 'Statement of truth',
  line23: 'I believe that the facts stated in this application are true.',
  applicantName: `${userCase.applicant1FirstNames} ${userCase.applicant1LastNames}`,
  subHeading13: 'Your acknowledgement',
  confirmReadPetition: `I have read the application ${isDivorce ? 'for divorce' : 'to end our civil partnership'}`,
  errors: {
    confirmReadPetition: {
      required:
        'You need to confirm that you have read the application before you continue. You can say whether you want to dispute it later.',
    },
  },
});

const cy = ({ isDivorce, userCase, partner, applicant1Partner, isApplicant2, isJointApplication }) => ({
  title: `Adolygu’r ${isDivorce ? 'cais am ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'}`,
  line1: `Adolygwch y cais hwn ${
    isDivorce ? 'am ysgariad' : 'i ddod â’ch partneriaeth sifil i ben'
  } a chadarnhewch eich bod wedi’i ddarllen.`,
  subHeading1: `${
    isDivorce
      ? 'Gwneud cais am ysgariad fel unig geisydd'
      : 'Gwneud cais i ddod â phartneriaeth sifil i ben fel unig geisydd'
  }`,
  line2: {
    heading: `Mae ${userCase.applicant1FirstNames} ${userCase.applicant1LastNames} yn gwneud cais i’r llys`,
    item1: `${isDivorce ? 'am orchymyn ysgaru terfynol oddi wrth' : 'i ddiddymu’r bartneriaeth sifil â'}
    ${userCase.applicant2FirstNames} ${userCase.applicant2LastNames}`,
    item2: 'am orchymyn ariannol',
  },
  line3: {
    key: 'Dyddiad cychwyn',
    value: getFormattedDate(userCase.issueDate, SupportedLanguages.Cy),
  },
  line4: {
    key: 'Cyfeirnod yr achos',
    value: formattedCaseId(userCase.id),
  },
  line5: 'Ceisydd',
  line6: `${userCase.applicant1FirstNames} ${
    userCase.applicant1MiddleNames ? userCase.applicant1MiddleNames + ' ' : ''
  }${userCase.applicant1LastNames}`,
  line7: 'Atebydd',
  line8: `${userCase.applicant2FirstNames} ${
    userCase.applicant2MiddleNames ? userCase.applicant2MiddleNames + ' ' : ''
  }${userCase.applicant2LastNames}`,
  line9: {
    p1: `Y ceisydd yw’r unigolyn sydd wedi gwneud cais ${
      isDivorce ? 'am yr ysgariad' : 'i ddod â’u partneriaeth sifil i ben'
    }.`,
    p2: `Yr atebydd yw eu ${applicant1Partner}.`,
  },
  subHeading2: `Ynghylch y ${isDivorce ? 'briodas' : 'bartneriaeth sifil'}`,
  line10: `Caiff y manylion hyn eu copïo’n uniongyrchol oddi ar y dystysgrif ${
    isDivorce ? 'priodas' : 'partneriaeth sifil'
  }, neu gyfieithiad o’r dystysgrif os nad yw’n Saesneg. Yr enwau ar y dystysgrif yw’r enwau roedd y ceisydd a’r atebydd yn eu defnyddio cyn y ${
    isDivorce ? 'briodas' : 'bartneriaeth sifil'
  }.`,
  line11: `Rhwng pwy y mae’r ${isDivorce ? 'briodas' : 'bartneriaeth sifil'}`,
  line12: `${
    userCase.applicant1FullNameOnCertificate +
    ` ${isDivorce ? ' a ' : ' ac '} ` +
    userCase.applicant2FullNameOnCertificate
  }
  (fel y dangosir ar y dystysgrif ${isDivorce ? 'priodas' : 'partneriaeth sifil'})`,
  line13: `Lle gweinyddwyd y ${isDivorce ? 'briodas' : 'bartneriaeth sifil'}`,
  line14: userCase.ceremonyPlace,
  line15: `Dyddiad y ${isDivorce ? 'briodas' : 'bartneriaeth sifil'}`,
  line16: getFormattedCaseDate(userCase.relationshipDate, SupportedLanguages.Cy),
  subHeading3: "Pam all y llys ddelio â'r achos (awdurdodaeth)",
  line17: 'Mae gan lysoedd Cymru a Lloegr y pŵer cyfreithiol (awdurdodaeth) i ddelio â’r achos hwn oherwydd:',
  connectionBulletPoints:
    userCase && userCase.connections
      ? connectionBulletPointsSummarisedForAllUsers(userCase.connections, false, isDivorce, isJointApplication)
      : [],
  jurisdictionsMoreDetails: {
    part1: `Rhaid bod gan lysoedd Cymru a Lloegr yr awdurdodaeth (y pŵer cyfreithiol) i allu ${
      isDivorce ? 'caniatáu ysgariad' : 'dod â phartneriaeth sifil i ben'
    }. Cadarnhaodd y ceisydd bod y datganiad(au) cyfreithiol yn y cais yn berthnasol i naill ai y ceisydd neu’r atebydd neu’r ddau ohonynt. Mae pob datganiad cyfreithiol yn cynnwys rhai o’r cysylltiadau cyfreithiol canlynol â Chymru neu Loegr, neu bob un ohonynt.`,
    part2: jurisdictionMoreDetailsContent(userCase.connections, false, isDivorce, partner).text,
  },
  whatThisMeans: 'Beth mae hyn yn ei olygu',
  subHeading4: 'Achosion llys eraill',
  line18: `Mae’r llys angen gwybod am unrhyw achosion llys eraill sy’n ymwneud â’r ${
    isDivorce ? 'briodas' : 'bartneriaeth sifil'
  }, a all effeithio ar bŵer cyfreithiol (awdurdodaeth) y llys.`,
  line19: `${
    userCase.applicant1LegalProceedings === YesOrNo.YES
      ? `Mae’r ceisydd wedi rhoi manylion am achosion llys eraill sy’n ymwneud â’r ${
          isDivorce ? 'briodas' : 'bartneriaeth sifil'
        }:` +
        '<br>' +
        userCase.applicant1LegalProceedingsDetails
      : `Mae’r ceisydd wedi nodi nad oes unrhyw achosion llys eraill sy’n ymwneud â’r ${
          isDivorce ? 'briodas' : 'bartneriaeth sifil'
        }`
  }.`,
  subHeading5: `Rheswm dros ${isDivorce ? 'yr ysgariad' : 'ddod â’r bartneriaeth sifil i ben'}`,
  line20: `Mae’r ${isDivorce ? 'briodas' : 'berthynas'} wedi chwalu’n gyfan gwbl (ni ellir ei hachub).`,
  subHeading6: 'Cais am orchymyn ariannol',
  financialOrderYes: `Mae’r ceisydd yn bwriadu gwneud cais i’r llys am orchmynion ariannol ${userCase.applicant1WhoIsFinancialOrderFor
    ?.sort()
    .join(' ac ')
    .replace(FinancialOrderFor.APPLICANT, 'ar gyfer y ceisydd')
    .replace(FinancialOrderFor.CHILDREN, 'ar gyfer plant y ceisydd a’r atebydd')}.`,
  financialOrderNo: "Nid yw’r ceisydd yn bwriadu gwneud cais i'r llys am orchmynion ariannol.",
  financialOrderMoreDetails: `${isApplicant2 ? `Fe ofynnwyd i’ch ${partner} os ydynt` : 'Fe ofynnwyd i chi os ydych'}
   eisiau i’r llys benderfynu sut y bydd eich arian, eich eiddo, eich pensiynau a’ch asedau eraill yn cael eu rhannu. Fe elwir y penderfyniadau hyn yn ‘gorchmynion ariannol’.
   Gellir gwneud gorchmynion ariannol rhyngoch chi a’ch ${partner} ac unrhyw blant sydd gennych.
   <br><br>Gellir gwneud gorchymyn ariannol os ydych yn cytuno ynghylch sut i rannu arian ac eiddo, ac os ydych eisiau gwneud y penderfyniad yn rhwymol gyfreithiol.
   Fe elwir hyn yn ‘gorchymyn ariannol trwy gydsyniad’. Neu gellir eu gwneud os ydych yn anghytuno ar sut i rannu arian ac eiddo ac rydych eisiau i’r llys benderfynu.
   Gelwir hyn yn ‘gorchymyn ariannol sy’n cael ei wrthwynebu’.
   <br><br>I ddechrau achos cyfreithiol yn ffurfiol, bydd angen i'ch ${partner} lenwi ffurflen arall a thalu ffi.
   Mae gwneud cais am ‘gorchymyn ariannol sy’n cael ei wrthwynebu’ yn costio ${getFee(
     config.get('fees.financialOrder')
   )}. Mae gwneud cais am ‘gorchymyn ariannol trwy gydsyniad’ yn costio ${getFee(config.get('fees.consentOrder'))}.
   Gallwch ofyn i gyfreithiwr ddrafftio y rhain a gwneud cais ar eich rhan.
   <br><br>Os nad ydych chi’n siŵr beth i’w wneud, dylech gael cyngor cyfreithiol.`,
  subHeading7: 'Cyfeiriad ar gyfer anfon gohebiaeth y ceisydd',
  applicantAddress: getAppSolAddressFields('applicant1', userCase),
  subHeading8: 'Cyfeiriad e-bost y ceisydd',
  subHeading9: 'Cyfeiriad ar gyfer anfon gohebiaeth yr atebydd',
  respondentAddress: getAppSolAddressFields('applicant2', userCase),
  subHeading10: 'Cyfeiriad e-bost yr atebydd',
  subHeading11: 'Manylion cyfreithiwr yr atebydd',
  noDetailsProvided: 'Nis ddarparwyd manylion',
  solName: `Enw’r cyfreithiwr: ${userCase.applicant2SolicitorName ? userCase.applicant2SolicitorName : 'heb roi enw'}`,
  solEmail: `Cyfeiriad e-bost y cyfreithiwr: ${
    userCase.applicant2SolicitorEmail ? userCase.applicant2SolicitorEmail : 'heb roi e-bost'
  }`,
  solFirmName: `Enw cwmni’r cyfreithiwr: ${
    userCase.applicant2SolicitorFirmName ? userCase.applicant2SolicitorFirmName : 'heb roi enw’r cwmni'
  }`,
  solAddressLabel: 'Cyfeiriad y cyfreithiwr: ',
  solAddress: userCase.applicant2SolicitorAddress?.trim() ? getAddressFields('applicant2Solicitor', userCase) : [],
  solAddressEmpty: 'heb roi’r cyfeiriad',
  subHeading12: 'Datganiad Gwirionedd',
  line23: 'Credaf fod y ffeithiau a nodir yn y cais hwn yn wir.',
  applicantName: `${userCase.applicant1FirstNames} ${userCase.applicant1LastNames}`,
  subHeading13: 'Eich cydnabyddiad ',
  confirmReadPetition: `Rwyf wedi darllen y cais ${isDivorce ? 'am ysgariad' : 'i ddod â’n partneriaeth sifil i ben'}`,
  errors: {
    confirmReadPetition: {
      required:
        'Mae angen ichi gadarnhau eich bod wedi darllen y cais cyn i chi barhau. Gallwch ddweud p’un a ydych eisiau ei wrthwynebu yn hwyrach ymlaen.',
    },
  },
});

export const form: FormContent = {
  fields: {
    confirmReadPetition: {
      type: 'checkboxes',
      labelHidden: true,
      values: [
        {
          name: 'confirmReadPetition',
          label: l => l.confirmReadPetition,
          value: Checkbox.Checked,
          validator: isFieldFilledIn,
        },
      ],
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

export const generateContent: TranslationFn = (content: CommonContent) => {
  const { language, userCase } = content;
  content.applicant1Partner = getApplicant1PartnerContent(content);
  const translations = languages[language](content);
  const isApplicantAddressPrivate = userCase.applicant1AddressPrivate === YesOrNo.YES;
  const isRespondentAddressPrivate = userCase.applicant2AddressPrivate === YesOrNo.YES;
  const isFinancialOrderYes = userCase.applicant1ApplyForFinancialOrder === YesOrNo.YES;
  const isApplicant2Represented = userCase.applicant1IsApplicant2Represented === Applicant2Represented.YES;
  const solInfoEntered =
    userCase.applicant2SolicitorName ||
    userCase.applicant2SolicitorEmail ||
    userCase.applicant2SolicitorFirmName ||
    userCase.applicant2SolicitorAddress?.trim();
  const hasApplicant1SolicitorsAddress = !!userCase.applicant1SolicitorAddress?.trim();
  const hasApplicant2SolicitorsAddress = !!userCase.applicant2SolicitorAddress?.trim();
  const whatThisMeansJurisdiction = accessibleDetailsSpan(translations['whatThisMeans'], translations['subHeading3']);
  const whatThisMeansFinancialOrder = accessibleDetailsSpan(translations['whatThisMeans'], translations['subHeading6']);
  return {
    ...translations,
    form,
    isApplicantAddressPrivate,
    isRespondentAddressPrivate,
    isFinancialOrderYes,
    isApplicant2Represented,
    solInfoEntered,
    hasApplicant1SolicitorsAddress,
    hasApplicant2SolicitorsAddress,
    whatThisMeansJurisdiction,
    whatThisMeansFinancialOrder,
  };
};
