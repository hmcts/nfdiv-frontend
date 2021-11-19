import config from 'config';

import { getFormattedDate } from '../../../app/case/answers/formatDate';
import { CaseWithId, Checkbox } from '../../../app/case/case';
import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { connectionBulletPointsTextForRespondent } from '../../../app/jurisdiction/bulletedPointsContent';
import { jurisdictionMoreDetailsContent } from '../../../steps/applicant1/connection-summary/content';
import { CommonContent } from '../../common/common.content';

const isSubmit = (isApplicant2: boolean, userCase: Partial<CaseWithId>): boolean =>
  isApplicant2 ||
  (userCase.applicant1HelpPayingNeeded === YesOrNo.YES && userCase.applicant2HelpPayingNeeded === YesOrNo.YES);

const en = ({ isDivorce, partner, userCase, userEmail, isApplicant2 }: CommonContent) => ({
  title: 'Confirm your joint application',
  subHeader: `This is the information you and your ${partner} have provided for your joint application. Confirm it before continuing.`,
  subHeading1: `Joint ${isDivorce ? 'divorce application' : 'application to end a civil partnership'}`,
  line1: `This is the information you and your ${partner} have provided for your joint application. Confirm it before continuing.`,
  line2: `${userCase.applicant1FirstNames} ${userCase.applicant1LastNames} and ${userCase.applicant2FirstNames} ${
    userCase.applicant2LastNames
  } are applying to the court for ${
    isDivorce ? 'a final order of divorce' : 'the dissolution of their civil partnership'
  }`,
  line3: `<strong>Case reference number: </strong>${userCase.id?.replace(
    /(\\d{4})(\\d{4})(\\d{4})(\\d{4})/,
    '$1-$2-$3-$4'
  )}`,
  line4: `<strong>Issued: </strong>${userCase.issueDate}`,
  line5: '<strong> Applicant 1 </strong>',
  line6: `${userCase.applicant1FirstNames} ${userCase.applicant1MiddleNames} ${userCase.applicant1LastNames}`,
  line7: '<strong> Applicant 2 </strong>',
  line8: `${userCase.applicant2FirstNames} ${userCase.applicant2MiddleNames} ${userCase.applicant2LastNames}`,
  subHeading2: `About the ${isDivorce ? 'marriage' : 'civil partnership'}`,
  line10: `These details are copied directly from the ${isDivorce ? 'marriage' : 'civil partnership'} certificate,
     or the translation of the certificate, if it’s not in English. The names on the certificate are the names the
      applicant and respondent used before the ${isDivorce ? 'marriage' : 'civil partnership'}.`,
  line11: `<strong>Who the ${isDivorce ? 'marriage' : 'civil partnership'} is between</strong>`,
  line12: `${userCase.applicant1FullNameOnCertificate}  and ${userCase.applicant2FullNameOnCertificate}
      (as shown on the ${isDivorce ? 'marriage' : 'civil partnership'} certificate)`,
  line13: `<strong> Where the ${isDivorce ? 'marriage' : 'civil partnership'} took place</strong>`,
  line14: `${userCase.ceremonyPlace}`,
  line15: `<strong>Date of ${isDivorce ? 'marriage' : 'civil partnership'}</strong>`,
  line16: `${getFormattedDate(userCase.relationshipDate)}`,
  subHeading3: 'Why the court can deal with the case (jurisdiction)',
  line17: 'The courts of England and Wales have the legal power (jurisdiction) to deal with this case because:',
  connectionBulletPoints: userCase ? connectionBulletPointsTextForRespondent(userCase.connections!) : [],
  jurisdictionsMoreDetails:
    `The courts of England or Wales must have the jurisdiction (the legal power) to be able to ${
      isDivorce ? 'grant a divorce' : 'end a civil partnership'
    }.
    The applicants confirmed that the legal statement(s) in the application apply to either or both the applicants. Each legal statement includes some or all of the following legal connections to England or Wales.` +
    '<br><br>' +
    jurisdictionMoreDetailsContent(userCase.connections, isDivorce, true).connectedToEnglandWales,
  whatThisMeans: 'What this means',
  subHeading4: 'Other court cases',
  line18: `The court needs to know about any other court cases relating to the ${
    isDivorce ? 'marriage' : 'civil partnership'
  }, which might affect the legal power (jurisdiction) of the court.`,
  line19: `${
    userCase.applicant1LegalProceedings === YesOrNo.YES && userCase.applicant2LegalProceedings === YesOrNo.YES
      ? `Applicant 1 has given details of other court cases relating to the ${
          isDivorce ? 'marriage' : 'civil partnership'
        }:` +
        '<br>' +
        userCase.applicant1LegalProceedingsDetails +
        '<br><br>' +
        `Applicant 2 has given details of other court cases relating to the ${
          isDivorce ? 'marriage' : 'civil partnership'
        }:` +
        '<br>' +
        userCase.applicant2LegalProceedingsDetails
      : userCase.applicant1LegalProceedings === YesOrNo.YES
      ? `Applicant 1 has given details of other court cases relating to the ${
          isDivorce ? 'marriage' : 'civil partnership'
        }:` +
        '<br>' +
        userCase.applicant1LegalProceedingsDetails
      : userCase.applicant2LegalProceedings === YesOrNo.YES
      ? `Applicant 2 has given details of other court cases relating to the ${
          isDivorce ? 'marriage' : 'civil partnership'
        }:` +
        '<br>' +
        userCase.applicant2LegalProceedingsDetails
      : `The applicants have indicated that there are no other court cases which are related to the ${
          isDivorce ? 'marriage' : 'civil partnership'
        }`
  }.`,
  subHeading5: `Reason for  ${isDivorce ? 'the divorce' : 'ending the civil partnership'}`,
  line20: `The ${isDivorce ? 'marriage' : 'relationship'} has broken down irretrievably (it cannot be saved).`,
  subHeading6: 'Financial order application',
  applicant1FinancialOrderYes: 'Applicant 1 is applying to the court for financial orders',
  applicant2FinancialOrderYes: 'Applicant 2 is applying to the court for financial orders',
  financialOrderNo: 'The applicants are not applying to the court for financial orders.',
  financialOrderMoreDetails: `You and your ${partner} were asked if you want the court to decide how your money, property, pensions and other assets will be split. These decisions are called ‘financial orders’.
  <br><br>A financial order can be made if you agree about dividing money and property, and you want to make the decision legally binding. This is known as a ‘financial order by consent’. Or they can be made if you disagree about dividing money and property and want the court to decide. This is known as a ‘contested financial order’. 
  <br><br>To formally start legal proceedings, the applicants will need to complete another form and pay a fee. Applying for a ‘contested financial order’ costs ${config.get(
    'fees.financialOrder'
  )}. Applying for a ‘financial order by consent’ costs ${config.get(
    'fees.consentOrder'
  )}. You can get a solicitor to draft these for you. 
  <br><br>If you are not sure what to do then you should seek legal advice. `,
  subHeading7: "Applicant 1's correspondence address",
  applicantAddressCountry: `${
    userCase.applicant1SolicitorAddress
      ? userCase.applicant1SolicitorAddress
      : [
          userCase.applicant1Address1,
          userCase.applicant1Address2,
          userCase.applicant1Address3,
          userCase.applicant1AddressTown,
          userCase.applicant1AddressCounty,
          userCase.applicant1AddressPostcode,
          userCase.applicant1AddressCountry,
        ]
          .filter(Boolean)
          .join('<br>')
  }`,
  subHeading8: "Applicant 1's email address",
  line21: `${userEmail}`,
  subHeading9: "Applicant 2's postal address",
  respondentAddressCountry: `${
    userCase.applicant2SolicitorAddress
      ? userCase.applicant2SolicitorAddress
      : [
          userCase.applicant2Address1,
          userCase.applicant2Address2,
          userCase.applicant2Address3,
          userCase.applicant2AddressTown,
          userCase.applicant2AddressCounty,
          userCase.applicant2AddressPostcode,
          userCase.applicant2AddressCountry,
        ]
          .filter(Boolean)
          .join('<br>')
  }`,
  subHeading10: "Applicant 2's email address",
  line22: `${userCase.applicant2EmailAddress}`,
  subHeading11: 'Statement of truth',
  applicant1Name: `<em>${userCase.applicant1FirstNames} ${userCase.applicant1LastNames}</em>`,
  applicant2Name: `<em>${userCase.applicant2FirstNames} ${userCase.applicant2LastNames}</em>`,
  confirm: `Confirm before  ${isSubmit(isApplicant2, userCase) ? 'submitting' : 'continuing'}`,
  confirmPrayer: `I confirm that I’m applying to the court to ${
    isDivorce ? 'dissolve my marriage (get a divorce)' : 'end my civil partnership'
  } ${
    userCase.applyForFinancialOrder === YesOrNo.YES || userCase.applicant2ApplyForFinancialOrder === YesOrNo.YES
      ? 'and make financial orders to decide how our money and property will be split.'
      : ''
  }`,
  confirmPrayerHint: 'This confirms what you are asking the court to do. It’s known as ‘the prayer’.',
  confirmApplicationIsTrue: 'I believe that the facts stated in this application are true',
  confirmApplicationIsTrueHint:
    'This confirms that the information you are submitting is true and accurate to the best of your knowledge. It’s known as the ‘statement of truth’.',
  continue: `${isSubmit(isApplicant2, userCase) ? 'Submit' : 'Continue to payment'}`,
  confirmApplicationIsTrueWarning:
    'Proceedings for contempt of court may be brought against anyone who makes, or causes to be made, a false statement verified by a statement of truth without an honest belief in its truth.',
  errors: {
    applicant1IConfirmPrayer: {
      required: `You need to confirm you are applying to the court to  ${
        isDivorce ? 'dissolve your marriage (get a divorce)' : 'end your civil partnership'
      }.`,
    },
    applicant1IBelieveApplicationIsTrue: {
      required: 'You need to confirm the facts stated in this application are true',
    },
  },
});

// @TODO translations
const cy: typeof en = en;

export const form: FormContent = {
  fields: {
    applicant1IConfirmPrayer: {
      type: 'checkboxes',
      labelSize: 'm',
      values: [
        {
          name: 'applicant1IConfirmPrayer',
          label: l => l.confirmPrayer,
          hint: l => l.confirmPrayerHint,
          value: Checkbox.Checked,
          validator: value => isFieldFilledIn(value),
        },
      ],
    },
    applicant1IBelieveApplicationIsTrue: {
      type: 'checkboxes',
      labelHidden: true,
      values: [
        {
          name: 'applicant1IBelieveApplicationIsTrue',
          label: l => l.confirmApplicationIsTrue,
          hint: l => l.confirmApplicationIsTrueHint,
          value: Checkbox.Checked,
          validator: value => isFieldFilledIn(value),
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

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  const isApplicant1AddressNotPrivate = content.userCase.applicant1AddressPrivate !== YesOrNo.YES;
  const isApplicant2AddressNotPrivate = content.userCase.applicant2AddressPrivate !== YesOrNo.YES;
  const isApplicant1ApplyForFinancialOrder = content.userCase.applyForFinancialOrder === YesOrNo.YES;
  const isApplicant2ApplyForFinancialOrder = content.userCase.applicant2ApplyForFinancialOrder === YesOrNo.YES;
  return {
    ...translations,
    isApplicant1AddressNotPrivate,
    isApplicant2AddressNotPrivate,
    isApplicant1ApplyForFinancialOrder,
    isApplicant2ApplyForFinancialOrder,
    form,
  };
};
