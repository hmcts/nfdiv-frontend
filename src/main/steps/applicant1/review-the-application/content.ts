import config from 'config';

import { getFormattedDate } from '../../../app/case/answers/formatDate';
import { Checkbox } from '../../../app/case/case';
import { Applicant2Represented, FinancialOrderFor, YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { getFee } from '../../../app/fees/service/get-fee';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { connectionBulletPointsSummarisedForAllUsers } from '../../../app/jurisdiction/bulletedPointsContent';
import { jurisdictionMoreDetailsContent } from '../../../app/jurisdiction/moreDetailsContent';
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
  line3: 'Issued',
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
    }`,
    p2: `The respondent is their ${applicant1Partner}.`,
  },
  subHeading2: `About the ${isDivorce ? 'marriage' : 'civil partnership'}`,
  line10: `These details are copied directly from the ${isDivorce ? 'marriage' : 'civil partnership'} certificate,
     or the translation of the certificate, if it’s not in English. The names on the certificate are the names the
      applicant and respondent used before the ${isDivorce ? 'marriage' : 'civil partnership'}.`,
  line11: `Who the ${isDivorce ? 'marriage' : 'civil partnership'} is between`,
  line12: `${userCase.applicant1FullNameOnCertificate + ' and ' + userCase.applicant2FullNameOnCertificate}
  (as shown on the ${isDivorce ? 'marriage' : 'civil partnership'} certificate)`,
  line13: ` Where the ${isDivorce ? 'marriage' : 'civil partnership'} took place`,
  line14: userCase.ceremonyPlace,
  line15: `Date of ${isDivorce ? 'marriage' : 'civil partnership'}`,
  line16: getFormattedDate(userCase.relationshipDate),
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
    part2: jurisdictionMoreDetailsContent(userCase.connections, true, isDivorce).text,
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
  subHeading5: `Reason for  ${isDivorce ? 'the divorce' : 'ending the civil partnership'}`,
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

// @TODO translations
const cy: typeof en = en;

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
