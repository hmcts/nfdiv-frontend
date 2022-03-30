import config from 'config';
import dayjs from 'dayjs';

import { getFormattedDate } from '../../../app/case/answers/formatDate';
import { FinancialOrderFor, YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { getFee } from '../../../app/fees/service/get-fee';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { enConnectionBulletPointsUserReads } from '../../../app/jurisdiction/bulletedPointsContent';
import { enDomicile, enHabitualResident } from '../../../app/jurisdiction/moreDetailsContent';
import { CommonContent } from '../../common/common.content';
import { accessibleDetailsSpan, getAppSolAddressFields } from '../../common/content.utils';
import { CHECK_CONTACT_DETAILS } from '../../urls';

const en = ({ isDivorce, userCase, partner, required, userEmail }: CommonContent) => ({
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
  issuedDateValue: dayjs(userCase.issueDate).format('D MMMM YYYY'),
  caseReferenceHeading: 'Case reference number',
  caseReferenceValue: userCase.id?.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1-$2-$3-$4'),
  applicant1Heading: 'Applicant 1',
  applicant1Names: `${userCase.applicant1FirstNames} ${userCase.applicant1MiddleNames} ${userCase.applicant1LastNames}`,
  applicant2Heading: 'Applicant 2',
  applicant2Names: `${userCase.applicant2FirstNames} ${userCase.applicant2MiddleNames} ${userCase.applicant2LastNames}`,
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
  ceremonyPlace: `${userCase.ceremonyPlace}`,
  heading5: `Date of ${isDivorce ? 'marriage' : 'civil partnership'}`,
  relationshipDate: getFormattedDate(userCase.relationshipDate),
  heading6: 'Why the court can deal with the case (jurisdiction)',
  line6: 'The courts of England and Wales have the legal power (jurisdiction) to deal with this case because:',
  connectionBulletPoints: userCase.connections
    ? enConnectionBulletPointsUserReads(userCase.connections, partner, isDivorce)
    : [],
  whatThisMeans: 'What this means',
  whatThisMeansInfo1: `The courts of England or Wales must have the legal power (jurisdiction) to be able to ${
    isDivorce ? 'grant a divorce' : 'end a civil partnership'
  }. The applicants confirmed that the legal statement(s) in the application apply to either or both the applicants.
    Each legal statement includes some or all of the following legal connections to England or Wales.`,
  heading7: 'Habitual residence',
  habitualResidenceText: enHabitualResident,
  heading8: 'Domicile',
  domicileText: enDomicile,
  heading10: 'Other court cases',
  otherCourtCasesLine1: `The court needs to know about any other court cases relating to the ${
    isDivorce ? 'marriage' : 'civil partnership'
  },
    which might affect the legal power (jurisdiction) of the court.`,
  applicant1OtherCourtCases: `Applicant 1 has given details of other court cases relating to the ${
    isDivorce ? 'marriage' : 'civil partnership'
  }:`,
  applicant1LegalProceedingsDetails: `${userCase.applicant1LegalProceedingsDetails}`,
  applicant2OtherCourtCases: `Applicant 2 has given details of other court cases relating to the ${
    isDivorce ? 'marriage' : 'civil partnership'
  }:`,
  applicant2LegalProceedingsDetails: `${userCase.applicant2LegalProceedingsDetails}`,
  noOtherCourtCases: `The applicants has indicated that there are no other court cases which are related to the ${
    isDivorce ? 'marriage' : 'civil partnership'
  }.`,
  heading11: `Reason for ${isDivorce ? 'the divorce' : 'ending the civil partnership'}`,
  line7: `The ${isDivorce ? 'marriage' : 'relationship'} has broken down irretrievably (it cannot be saved).`,
  heading12: 'Financial order application',
  applicant1FinancialOrderYes: `Applicant 1 is applying to the court for financial orders for ${userCase.applicant1WhoIsFinancialOrderFor
    ?.sort()
    .join(' and ')
    .replace(FinancialOrderFor.APPLICANT, 'themselves')
    .replace(FinancialOrderFor.CHILDREN, 'the children')}.`,
  applicant2FinancialOrderYes: `Applicant 2 is applying to the court for financial orders for ${userCase.applicant2WhoIsFinancialOrderFor
    ?.sort()
    .join(' and ')
    .replace(FinancialOrderFor.APPLICANT, 'themselves')
    .replace(FinancialOrderFor.CHILDREN, 'the children')}.`,
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
  applicant1EmailAddress: `${userEmail}`,
  heading16: "Applicant 2's email address",
  applicant2EmailAddress: `${userCase.applicant2EmailAddress}`,
  heading17: 'Statement of truth',
  factsTrue: 'I believe that the facts stated in this application are true.',
  confirmInformationStillCorrect: 'Is the information in this application still correct?',
  reasonInformationNotCorrect: `<strong>Changing your contact details</strong>
    <br>
    You can update your email address, phone number and postal address in the <a class="govuk-link" href="${CHECK_CONTACT_DETAILS}">‘contact details’ section of your ${
    isDivorce ? 'divorce' : ''
  } account.</a> There is no cost for this.</p>
    <br>
    <p class="govuk-body"><strong>Changing any other information</strong>
    <br>
    If you want to change any other information then you should provide details below. You may need to pay a ${getFee(
      config.get('fees.updateApplication')
    )} fee. This is because the application will need to be updated and sent to your ${partner} again.`,
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

// @TODO translations
const cy = en;

export const form: FormContent = {
  fields: {
    applicant1ConfirmInformationStillCorrect: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.confirmInformationStillCorrect,
      values: [
        { label: l => l.yes, value: YesOrNo.YES },
        {
          label: l => l.no,
          value: YesOrNo.NO,
          subFields: {
            applicant1ReasonInformationNotCorrect: {
              type: 'textarea',
              label: l => l.title,
              labelHidden: true,
              hint: l => `
                <p class="govuk-body">
                  ${l.reasonInformationNotCorrect}
                </p>
                ${l.reasonInformationNotCorrectHint}`,
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
