import config from 'config';

import { getFormattedCaseDate, getFormattedDate } from '../../../app/case/answers/formatDate';
import { FinancialOrderFor, YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { getFee } from '../../../app/fees/service/get-fee';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { connectionBulletPointsUserReads } from '../../../app/jurisdiction/bulletedPointsContent';
import {
  cyDomicile,
  cyHabitualResident,
  enDomicile,
  enHabitualResident,
} from '../../../app/jurisdiction/moreDetailsContent';
import { CommonContent } from '../../common/common.content';
import { accessibleDetailsSpan, formattedCaseId, getAppSolAddressFields, getName } from '../../common/content.utils';
import { CHECK_CONTACT_DETAILS } from '../../urls';

const en = ({ isDivorce, userCase, partner, required, isJointApplication }: CommonContent) => ({
  title: `Review your joint ${isDivorce ? 'divorce application' : 'application to end your civil partnership'}`,
  subtitle: `Read your joint application ${
    isDivorce ? 'for divorce' : 'to end your civil partnership'
  } and confirm the information is still correct.`,
  heading1: `Joint ${isDivorce ? 'divorce application' : 'application to end a civil partnership'}`,
  line1: `${userCase.applicant1FirstNames} ${userCase.applicant1LastNames} and ${userCase.applicant2FirstNames} ${
    userCase.applicant2LastNames
  }
  are applying to the court for a conditional order of ${
    isDivorce ? 'divorce in this case' : 'the dissolution of their civil partnership in this case'
  }`,
  line2: 'Applicant 1 is also applying to the court to make a financial order.',
  line3: 'Applicant 2 is also applying to the court to make a financial order.',
  issuedDateHeading: 'Issued',
  issuedDateValue: getFormattedDate(userCase.issueDate),
  caseReferenceHeading: 'Case reference number',
  caseReferenceValue: formattedCaseId(userCase.id),
  applicant1Heading: 'Applicant 1',
  applicant1Names: getName(userCase, 'applicant1'),
  applicant2Heading: 'Applicant 2',
  applicant2Names: getName(userCase, 'applicant2'),
  heading2: `About the ${isDivorce ? 'marriage' : 'civil partnership'}`,
  line4: `These details are copied directly from the marriage certificate, or the translation of the certificate if it’s not in English.
  The names on the certificate are the names the applicants used before the ${
    isDivorce ? 'marriage' : 'civil partnership'
  }.`,
  heading3: `Who the ${isDivorce ? 'marriage' : 'civil partnership'} is between`,
  line5: `${userCase.applicant1FullNameOnCertificate} and ${
    userCase.applicant2FullNameOnCertificate
  } (as shown on the ${isDivorce ? 'marriage' : 'civil partnership'} certificate)`,
  heading4: `Where the ${isDivorce ? 'marriage' : 'civil partnership'} took place`,
  ceremonyPlace: userCase.ceremonyPlace,
  heading5: `Date of ${isDivorce ? 'marriage' : 'civil partnership'}`,
  relationshipDate: getFormattedCaseDate(userCase.relationshipDate),
  heading6: 'Why the court can deal with the case (jurisdiction)',
  line6: 'The courts of England and Wales have the legal power (jurisdiction) to deal with this case because:',
  connectionBulletPoints: userCase.connections
    ? connectionBulletPointsUserReads(userCase.connections, partner, isDivorce, isJointApplication, true)
    : [],
  whatThisMeans: 'What this means',
  whatThisMeansInfo1: `The courts of England or Wales must have the legal power (jurisdiction) to be able to ${
    isDivorce ? 'grant a divorce' : 'end a civil partnership'
  }. The applicants confirmed that the legal statement(s) in the application apply to either or both the applicants.
    Each legal statement includes some or all of the following legal connections to England or Wales.`,
  heading7: enHabitualResident.heading,
  habitualResidenceText: enHabitualResident.body,
  heading8: enDomicile.heading,
  domicileText: enDomicile.body,
  heading10: 'Other court cases',
  otherCourtCasesLine1: `The court needs to know about any other court cases relating to the ${
    isDivorce ? 'marriage' : 'civil partnership'
  },
    which might affect the legal power (jurisdiction) of the court.`,
  applicant1OtherCourtCases: `Applicant 1 has given details of other court cases relating to the ${
    isDivorce ? 'marriage' : 'civil partnership'
  }:`,
  applicant1LegalProceedingsDetails: userCase.applicant1LegalProceedingsDetails,
  applicant2OtherCourtCases: `Applicant 2 has given details of other court cases relating to the ${
    isDivorce ? 'marriage' : 'civil partnership'
  }:`,
  applicant2LegalProceedingsDetails: userCase.applicant2LegalProceedingsDetails,
  noOtherCourtCases: `The applicants has indicated that there are no other court cases which are related to the ${
    isDivorce ? 'marriage' : 'civil partnership'
  }.`,
  heading11: `Reason for ${isDivorce ? 'the divorce' : 'ending the civil partnership'}`,
  line7: `The ${isDivorce ? 'marriage' : 'relationship'} has broken down irretrievably (it cannot be saved).`,
  heading12: 'Financial order application',
  applicant1FinancialOrderYes: `Applicant 1 has said they want to apply to the court for financial orders for the ${userCase.applicant1WhoIsFinancialOrderFor
    ?.sort()
    .join(' and ')
    .replace(FinancialOrderFor.APPLICANT, 'applicants')
    .replace(FinancialOrderFor.CHILDREN, 'applicants, and for the children of the applicants')}.`,
  applicant2FinancialOrderYes: `Applicant 2 has said they want to apply for financial orders for the ${userCase.applicant2WhoIsFinancialOrderFor
    ?.sort()
    .join(' and ')
    .replace(FinancialOrderFor.APPLICANT, 'applicants')
    .replace(FinancialOrderFor.CHILDREN, 'applicants, and for the children of the applicants')}.`,
  noFinancialOrder: 'The applicants have said they do not intend to apply for financial orders.',
  financialOrderMoreInfoLine1: `You and your ${partner} were asked if you want the court to decide how your money, property, pensions and other assets will be split.
  These decisions are called ‘financial orders’. Financial orders can be made between you and your ${partner} and any children that you may have.`,
  financialOrderMoreInfoLine2:
    'A financial order can be made if you agree about dividing money and property, and you want to make the decision legally binding. ' +
    'This is known as a ‘financial order by consent’. Or they can be made if you disagree about dividing money and property and want the court to decide for you. ' +
    'This is known as a ‘contested financial order’.',
  financialOrderMoreInfoLine3: `To formally start legal proceedings, the applicants will need to complete another form and pay a fee.
  Applying for a ‘contested financial order’ costs ${getFee(
    config.get('fees.financialOrder')
  )}. Applying for a ‘financial order by consent’ costs
  ${getFee(config.get('fees.consentOrder'))}. You can get a solicitor to draft these for you. `,
  financialOrderMoreInfoLine4: 'If you are not sure what to do then you should seek legal advice.',
  heading13: 'Applicant 1’s correspondence address',
  applicant1Address: getAppSolAddressFields('applicant1', userCase),
  heading14: 'Applicant 2’s correspondence address',
  applicant2Address: getAppSolAddressFields('applicant2', userCase),
  heading15: 'Applicant 1’s email address',
  applicant1EmailAddress: userCase.applicant1Email,
  heading16: "Applicant 2's email address",
  applicant2EmailAddress: userCase.applicant2Email,
  heading17: 'Statement of truth',
  factsTrue: 'I believe that the facts stated in this application are true.',
  confirmInformationStillCorrect: 'Is the information in this application still correct?',
  reasonInformationNotCorrect: {
    heading1: 'Changing your contact details',
    part1: 'You can update your email address, phone number and postal address in the ',
    link: CHECK_CONTACT_DETAILS,
    linkText: `'contact details' section of your ${isDivorce ? 'divorce' : ''} account.`,
    part2: 'There is no cost for this.',
    heading2: 'Changing any other information',
    part3: `If you want to change any other information then you should provide details below. You may need to pay a ${getFee(
      config.get('fees.updateApplication')
    )} fee. This is because the application will need to be updated and sent to your ${partner} again.`,
  },
  reasonInformationNotCorrectHint:
    'Provide details of any other information that needs updating. Do not tell the court about updates to contact details here.',
  errors: {
    applicant1ConfirmInformationStillCorrect: {
      required,
    },
    applicant1ReasonInformationNotCorrect: {
      required: 'You need to say what information is incorrect before continuing.',
    },
  },
});

const cy: typeof en = ({ isDivorce, userCase, partner, required, isJointApplication }: CommonContent) => ({
  title: `Eich cais ar y cyd ${isDivorce ? 'am ysgariad' : 'i ddod â’ch partneriaeth sifil i ben'}`,
  subtitle: `Darllenwch eich cais ar y cyd ${
    isDivorce ? 'am ysgariad' : 'i ddod â’ch partneriaeth sifil i ben'
  } a chadarnhewch fod yr wybodaeth dal i fod yn gywir.`,
  heading1: `${isDivorce ? 'Cais ar y cyd am ysgariad' : 'Cais ar y cyd i ddod â phartneriaeth sifil i ben'}`,
  line1: `Mae ${userCase.applicant1FirstNames} ${userCase.applicant1LastNames} a ${userCase.applicant2FirstNames} ${
    userCase.applicant2LastNames
  }
  yn gwneud cais i’r llys am orchymyn amodol ar gyfer ${
    isDivorce ? 'ysgariad yn yr achos hwn' : 'i ddiddymu eu partneriaeth sifil yn yr achos hwn'
  }`,
  line2: 'Mae Ceisydd 1 hefyd yn gwneud cais i’r llys i wneud gorchymyn ariannol.',
  line3: 'Mae Ceisydd 2 hefyd yn gwneud cais i’r llys i wneud gorchymyn ariannol.',
  issuedDateHeading: 'Codwyd ar',
  issuedDateValue: getFormattedDate(userCase.issueDate),
  caseReferenceHeading: 'Rhif yr achos',
  caseReferenceValue: formattedCaseId(userCase.id),
  applicant1Heading: 'Ceisydd 1',
  applicant1Names: `${userCase.applicant1FirstNames} ${userCase.applicant1MiddleNames} ${userCase.applicant1LastNames}`,
  applicant2Heading: 'Ceisydd 2',
  applicant2Names: `${userCase.applicant2FirstNames} ${userCase.applicant2MiddleNames} ${userCase.applicant2LastNames}`,
  heading2: `Ynghylch y ${isDivorce ? 'briodas' : 'bartneriaeth sifil'}`,
  line4: `Caiff y manylion hyn eu copïo’n uniongyrchol oddi ar y dystysgrif ${
    isDivorce ? 'priodas' : 'partneriaeth sifil'
  }, neu gyfieithiad o’r dystysgrif os nad yw’n Saesneg.
    Yr enwau ar y dystysgrif yw’r enwau roedd y ceiswyr yn eu defnyddio cyn y ${
      isDivorce ? 'briodas' : 'bartneriaeth sifil'
    }.`,
  heading3: `Rhwng pwy y mae’r ${isDivorce ? 'briodas' : 'bartneriaeth sifil'}`,
  line5: `${userCase.applicant1FullNameOnCertificate} a/ac ${
    userCase.applicant2FullNameOnCertificate
  } (fel y dangosir ar y dystysgrif  ${isDivorce ? 'priodas' : 'partneriaeth sifil'})`,
  heading4: `Lle gweinyddwyd y ${isDivorce ? 'briodas' : 'bartneriaeth sifil'} took place`,
  ceremonyPlace: userCase.ceremonyPlace,
  heading5: `Dyddiad y ${isDivorce ? 'briodas' : 'bartneriaeth sifil'}`,
  relationshipDate: getFormattedCaseDate(userCase.relationshipDate),
  heading6: "Pam y gall y llys ddelio â'r achos (awdurdodaeth)",
  line6: 'Mae gan lysoedd Cymru a Lloegr y pŵer cyfreithiol (awdurdodaeth) i ddelio â’r achos hwn oherwydd:',
  connectionBulletPoints: userCase.connections
    ? connectionBulletPointsUserReads(userCase.connections, partner, isDivorce, isJointApplication, false)
    : [],
  whatThisMeans: 'Beth mae hyn yn ei olygu',
  whatThisMeansInfo1: `Rhaid bod gan lysoedd Cymru a Lloegr yr awdurdodaeth (y pŵer cyfreithiol) i allu  ${
    isDivorce ? 'caniatáu ysgariad' : '/ dod â phartneriaeth sifil i ben'
  }. Cadarnhaodd y ceiswyr bod y datganiad(au) cyfreithiol yn y cais yn berthnasol i naill ai un o’r ceiswyr neu’r ddau ohonynt. 
  Mae pob datganiad cyfreithiol yn cynnwys rhai o’r cysylltiadau cyfreithiol canlynol â Chymru neu Loegr, neu bob un ohonynt.`,
  heading7: cyHabitualResident.heading,
  habitualResidenceText: cyHabitualResident.body,
  heading8: cyDomicile.heading,
  domicileText: cyDomicile.body,
  heading10: 'Achosion llys eraill',
  otherCourtCasesLine1: `Mae’r llys angen gwybod am unrhyw achosion llys eraill sy’n ymwneud â’r ${
    isDivorce ? 'briodas' : 'bartneriaeth sifil'
  },
    a all effeithio ar bŵer cyfreithiol (awdurdodaeth) y llys.`,
  applicant1OtherCourtCases: `Mae Ceisydd 1 wedi rhoi manylion am achosion llys eraill sy’n ymwneud â’r ${
    isDivorce ? 'briodas' : 'bartneriaeth sifil'
  }:`,
  applicant1LegalProceedingsDetails: userCase.applicant1LegalProceedingsDetails,
  applicant2OtherCourtCases: `Mae Ceisydd 2 wedi rhoi manylion am achosion llys eraill sy’n ymwneud â’r ${
    isDivorce ? 'briodas' : 'bartneriaeth sifil'
  }:`,
  applicant2LegalProceedingsDetails: userCase.applicant2LegalProceedingsDetails,
  noOtherCourtCases: `Mae’r ceiswyr wedi nodi nad oes unrhyw achosion llys eraill sy’n ymwneud â’r ${
    isDivorce ? 'briodas' : 'bartneriaeth sifil'
  }.`,
  heading11: `Rheswm dros ${isDivorce ? 'yr ysgariad' : 'ddod â’r bartneriaeth sifil i ben'}`,
  line7: `Mae’r ${isDivorce ? 'briodas' : 'berthynas'} wedi chwalu’n gyfan gwbl (ni ellir ei hachub).`,
  heading12: 'Cais am orchymyn ariannol',
  applicant1FinancialOrderYes: `Mae Ceisydd 1 wedi dweud ei fod/bod eisiau gwneud cais i’r llys ar gyfer y ${userCase.applicant1WhoIsFinancialOrderFor
    ?.sort()
    .join(' a ')
    .replace(FinancialOrderFor.APPLICANT, 'ceiswyr')
    .replace(FinancialOrderFor.CHILDREN, 'a phlant y')}.`,
  applicant2FinancialOrderYes: `Mae Ceisydd 2 wedi dweud ei fod/bod eisiau gwneud cais i’r llys ar gyfer y ${userCase.applicant2WhoIsFinancialOrderFor
    ?.sort()
    .join(' a ')
    .replace(FinancialOrderFor.APPLICANT, 'ceiswyr')
    .replace(FinancialOrderFor.CHILDREN, 'a phlant y')}.`,
  noFinancialOrder: 'Mae’r ceiswyr wedi dweud nad ydynt yn bwriadu gwneud cais am orchmynion ariannol.',
  financialOrderMoreInfoLine1: `Fe ofynnwyd i chi a’ch ${partner} os ydych eisiau i’r llys benderfynu sut y bydd eich arian, eich eiddo,
   eich pensiynau a’ch asedau eraill yn cael eu rhannu. Fe elwir y penderfyniadau hyn yn ‘gorchmynion ariannol’.
    Gellir gwneud gorchmynion ariannol rhyngoch chi a’ch ${partner} ac unrhyw blant sydd gennych.`,
  financialOrderMoreInfoLine2:
    'Gellir gwneud gorchymyn ariannol os ydych yn cytuno ynghylch sut i rannu arian ac eiddo, ac os ydych eisiau gwneud y penderfyniad yn rhwymol' +
    ' gyfreithiol. Fe elwir hyn yn ‘gorchymyn ariannol trwy gydsyniad’. Neu gellir eu gwneud os ydych yn anghytuno ar sut i rannu arian ac eiddo' +
    ' ac rydych eisiau i’r llys benderfynu. Gelwir hyn yn ‘gorchymyn ariannol sy’n cael ei wrthwynebu’.',
  financialOrderMoreInfoLine3: `TBydd angen i’r ceiswyr lenwi ffurflen arall a thalu ffi i gychwyn achos cyfreithiol yn ffurfiol. 
  Mae gwneud cais am ‘gorchymyn ariannol sy’n cael ei wrthwynebu’ yn costio ${getFee(
    config.get('fees.financialOrder')
  )}. Mae gwneud cais am ‘gorchymyn ariannol trwy gydsyniad’ yn costio
  ${getFee(config.get('fees.consentOrder'))}. Gallwch ofyn i gyfreithiwr ddrafftio'r rhain ar eich rhan. `,
  financialOrderMoreInfoLine4: 'Os nad ydych chi’n siŵr beth i’w wneud, dylech gael cyngor cyfreithiol.',
  heading13: 'Cyfeiriad Ceisydd 1 ar gyfer anfon gohebiaeth',
  applicant1Address: getAppSolAddressFields('applicant1', userCase),
  heading14: 'Cyfeiriad Ceisydd 2 ar gyfer anfon gohebiaeth',
  applicant2Address: getAppSolAddressFields('applicant2', userCase),
  heading15: 'Cyfeiriad e-bost Ceisydd 1',
  applicant1EmailAddress: userCase.applicant1Email,
  heading16: 'Cyfeiriad e-bost ceisydd 2',
  applicant2EmailAddress: userCase.applicant2EmailAddress,
  heading17: 'Datganiad Gwirionedd',
  factsTrue: 'Credaf fod y ffeithiau a nodir yn y cais hwn yn wir.',
  confirmInformationStillCorrect: 'A yw’r wybodaeth yn y cais hwn dal yn gywir?',
  reasonInformationNotCorrect: {
    heading1: 'Newid eich manylion cyswllt',
    part1: 'Gallwch ddiweddaru eich cyfeiriad e-bost, eich rhif ffôn a’ch cyfeiriad post yn yr ',
    link: CHECK_CONTACT_DETAILS,
    linkText: `'hwb' ${isDivorce ? 'divorce' : ''}.`,
    part2: 'Ni chodir tâl am hyn.',
    heading2: 'Newid unrhyw wybodaeth arall',
    part3: `Os ydych eisiau newid unrhyw wybodaeth arall yna dylech ddarparu’r manylion isod. Mae’n bosib y bydd rhaid i chi dalu ffi o ${getFee(
      config.get('fees.updateApplication')
    )}. Mae hyn oherwydd y bydd rhaid adolygu’r cais ac efallai bydd rhaid anfon y cais at eich ${partner} eto.`,
  },
  reasonInformationNotCorrectHint:
    'Darparwch fanylion am unrhyw wybodaeth arall sydd angen cael ei diweddaru. Peidiwch â dweud wrth y llys am ddiweddariadau i fanylion cyswllt yma.',
  errors: {
    applicant1ConfirmInformationStillCorrect: {
      required,
    },
    applicant1ReasonInformationNotCorrect: {
      required: 'You need to say what information is incorrect before continuing.',
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
  const { language, userCase, isApplicant2 } = content;
  const translations = languages[language](content);
  const isApplicant1AndApplicant2AddressPrivate = !isApplicant2 && userCase.applicant2AddressPrivate === YesOrNo.YES;
  const isApplicant2AndApplicant1AddressPrivate = isApplicant2 && userCase.applicant1AddressPrivate === YesOrNo.YES;
  const whatThisMeansJurisdiction = accessibleDetailsSpan(translations['whatThisMeans'], translations['heading6']);
  const whatThisMeansFinancialOrder = accessibleDetailsSpan(translations['whatThisMeans'], translations['heading12']);
  return {
    isApplicant1AndApplicant2AddressPrivate,
    isApplicant2AndApplicant1AddressPrivate,
    whatThisMeansJurisdiction,
    whatThisMeansFinancialOrder,
    ...translations,
    form,
  };
};
