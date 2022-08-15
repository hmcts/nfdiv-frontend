import config from 'config';

import { getFormattedCaseDate, getFormattedDate } from '../../../app/case/answers/formatDate';
import { FinancialOrderFor, YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { getFee } from '../../../app/fees/service/get-fee';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { connectionBulletPointsSummarisedForAllUsers } from '../../../app/jurisdiction/bulletedPointsContent';
import { enDomicile, enHabitualResident } from '../../../app/jurisdiction/moreDetailsContent';
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
  heading7: 'Habitual residence',
  habitualResidenceText: enHabitualResident.body,
  heading8: 'Domicile',
  domicileText: enDomicile.body,
  heading9: 'Residual jurisdiction',
  residualJurisdictionLine1: `Usually, to be eligible for residual jurisdiction you or your ${partner} must be domiciled in England. Neither of you must be nationals of or habitually resident in, another country in the EU (except Denmark).`,
  residualJurisdictionLine2:
    'In addition, if you’re married to a member of the same sex, you may be eligible for residual jurisdiction if: (all the following apply):',
  residualJurisdictionListItem1: 'you married each other in the UK',
  residualJurisdictionListItem2:
    'neither of you are nationals of, or habitually resident in, another country in the EU (except Denmark)',
  residualJurisdictionListItem3:
    'it would be in the interests of natural justice for the court to consider this application (this may apply if, for example, your home country does not allow divorce / ending a civil partnership between same-sex couples',
  residualJurisdictionLine3:
    'However, residual jurisdiction can be complex. If you’re not sure whether this applies to you then you should get legal advice',
  heading10: 'Other court cases',
  otherCourtCasesLine1: `The court needs to know about any other court cases relating to the ${
    isDivorce ? 'marriage' : 'civil partnership'
  },
  which might affect the legal power (jurisdiction) of the court.`,
  otherCourtCasesLine2: `The applicant has given details of other court cases relating to the ${
    isDivorce ? 'marriage' : 'civil partnership'
  }:`,
  applicantLegalProceedingsDetails: userCase.applicant1LegalProceedingsDetails,
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

// @TODO translations
const cy = en;

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
