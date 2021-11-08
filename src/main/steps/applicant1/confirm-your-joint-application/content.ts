import config from 'config';

import { getFormattedDate } from '../../../app/case/answers/formatDate';
import { Checkbox } from '../../../app/case/case';
import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { connectionBulletPointsTextForRespondent } from '../../../app/jurisdiction/bulletedPointsContent';
import { jurisdictionMoreDetailsContent } from '../../../steps/applicant1/connection-summary/content';
import { CommonContent } from '../../common/common.content';

const en = ({ isDivorce, partner, formState, userEmail, isApplicant2 }: CommonContent) => ({
  title: 'Confirm your joint application',
  subHeader: `This is the information you and your ${partner} have provided for your joint application. Confirm it before continuing.`,
  subHeading1: `Joint ${isDivorce ? 'divorce application' : 'application to end a civil partnership'}`,
  line1: `This is the information you and your ${partner} have provided for your joint application. Confirm it before continuing.`,
  line2: `${formState?.applicant1FirstNames} ${formState?.applicant1LastNames} and ${formState?.applicant2FirstNames} ${
    formState?.applicant2LastNames
  } are applying to the court for ${
    isDivorce ? 'a final order of divorce' : 'the dissolution of their civil partnership'
  }`,
  line3: `<strong>Case reference number: </strong>${formState?.id?.replace(
    /(\\d{4})(\\d{4})(\\d{4})(\\d{4})/,
    '$1-$2-$3-$4'
  )}`,
  line4: `<strong>Issued: </strong>${formState?.issueDate}`,
  line5: '<strong> Applicant 1 </strong>',
  line6: `${formState?.applicant1FirstNames} ${formState?.applicant1MiddleNames} ${formState?.applicant1LastNames}`,
  line7: '<strong> Applicant 2 </strong>',
  line8: `${formState?.applicant2FirstNames} ${formState?.applicant2MiddleNames} ${formState?.applicant2LastNames}`,
  subHeading2: `About the ${isDivorce ? 'marriage' : 'civil partnership'}`,
  line10: `These details are copied directly from the ${isDivorce ? 'marriage' : 'civil partnership'} certificate,
     or the translation of the certificate, if it’s not in English. The names on the certificate are the names the
      applicant and respondent used before the ${isDivorce ? 'marriage' : 'civil partnership'}.`,
  line11: `<strong>Who the ${isDivorce ? 'marriage' : 'civil partnership'} is between</strong>`,
  line12: `${formState?.applicant1FullNameOnCertificate}  and ${formState?.applicant2FullNameOnCertificate}
      (as shown on the ${isDivorce ? 'marriage' : 'civil partnership'} certificate)`,
  line13: `<strong> Where the ${isDivorce ? 'marriage' : 'civil partnership'} took place</strong>`,
  line14: `${formState?.ceremonyPlace}`,
  line15: `<strong>Date of ${isDivorce ? 'marriage' : 'civil partnership'}</strong>`,
  line16: `${getFormattedDate(formState?.relationshipDate)}`,
  subHeading3: 'Why the court can deal with the case (jurisdiction)',
  line17: 'The courts of England and Wales have the legal power (jurisdiction) to deal with this case because:',
  connectionBulletPoints: formState ? connectionBulletPointsTextForRespondent(formState.connections!) : [],
  jurisdictionsMoreDetails:
    `The courts of England or Wales must have the jurisdiction (the legal power) to be able to ${
      isDivorce ? 'grant a divorce' : 'end a civil partnership'
    }.
    The applicants confirmed that the legal statement(s) in the application apply to either or both the applicants. Each legal statement includes some or all of the following legal connections to England or Wales.` +
    '<br><br>' +
    jurisdictionMoreDetailsContent(formState?.connections, isDivorce, true).connectedToEnglandWales,
  whatThisMeans: 'What this means',
  subHeading4: 'Other court cases',
  line18: `The court needs to know about any other court cases relating to the ${
    isDivorce ? 'marriage' : 'civil partnership'
  }, which might affect the legal power (jurisdiction) of the court.`,
  line19: `${
    formState?.applicant1LegalProceedings === YesOrNo.YES && formState?.applicant2LegalProceedings === YesOrNo.YES
      ? `Applicant 1 has given details of other court cases relating to the ${
          isDivorce ? 'marriage' : 'civil partnership'
        }:` +
        '<br>' +
        formState.applicant1LegalProceedingsDetails +
        '<br><br>' +
        `Applicant 2 has given details of other court cases relating to the ${
          isDivorce ? 'marriage' : 'civil partnership'
        }:` +
        '<br>' +
        formState.applicant2LegalProceedingsDetails
      : formState?.applicant1LegalProceedings === YesOrNo.NO && formState?.applicant2LegalProceedings === YesOrNo.NO
      ? `The applicants have indicated that there are no other court cases which are related to the ${
          isDivorce ? 'marriage' : 'civil partnership'
        }`
      : formState?.applicant1LegalProceedings === YesOrNo.YES
      ? `Applicant 1 has given details of other court cases relating to the ${
          isDivorce ? 'marriage' : 'civil partnership'
        }:` +
        '<br>' +
        formState.applicant1LegalProceedingsDetails
      : formState?.applicant2LegalProceedings === YesOrNo.YES
      ? `Applicant 2 has given details of other court cases relating to the ${
          isDivorce ? 'marriage' : 'civil partnership'
        }:` +
        '<br>' +
        formState.applicant2LegalProceedingsDetails
      : ''
  }.`,
  subHeading5: `Reason for  ${isDivorce ? 'the divorce' : 'ending the civil partnership'}`,
  line20: `The ${isDivorce ? 'marriage' : 'relationship'} has broken down irretrievably (it cannot be saved).`,
  subHeading6: 'Financial order application',
  applicant1FinancialOrderYes: 'Applicant 1 is applying to the court for financial orders',
  applicant2FinancialOrderYes: 'Applicant 2 is applying to the court for financial orders',
  financialOrderNo: 'The applicants are not intending to apply to the court for financial orders.',
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
    formState?.applicant1SolicitorAddress
      ? formState.applicant1SolicitorAddress
      : [
          formState?.applicant1Address1,
          formState?.applicant1Address2,
          formState?.applicant1Address3,
          formState?.applicant1AddressTown,
          formState?.applicant1AddressCounty,
          formState?.applicant1AddressPostcode,
          formState?.applicant1AddressCountry,
        ]
          .filter(Boolean)
          .join('<br>')
  }`,
  subHeading8: "Applicant 1's email address",
  line21: `${userEmail}`,
  subHeading9: "Applicant 2's postal address",
  respondentAddressCountry: `${
    formState?.applicant2SolicitorAddress
      ? formState.applicant2SolicitorAddress
      : [
          formState?.applicant2Address1,
          formState?.applicant2Address2,
          formState?.applicant2Address3,
          formState?.applicant2AddressTown,
          formState?.applicant2AddressCounty,
          formState?.applicant2AddressPostcode,
          formState?.applicant2AddressCountry,
        ]
          .filter(Boolean)
          .join('<br>')
  }`,
  subHeading10: "Applicant 2's email address",
  line22: `${formState?.applicant2EmailAddress}`,
  subHeading11: 'Statement of truth',
  line23: 'I believe that the facts stated in this application are true.',
  applicant1Name: `<em>${formState?.applicant1FirstNames} ${formState?.applicant1LastNames}</em>`,
  applicant2Name: `<em>${formState?.applicant2FirstNames} ${formState?.applicant2LastNames}</em>`,
  subHeading12: 'Confirm before continuing',
  confirmPrayer: `I confirm that I’m applying to the court to ${
    isDivorce ? 'dissolve my marriage (get a divorce)' : 'end my civil partnership'
  } ${
    formState?.applyForFinancialOrder === YesOrNo.YES || formState?.applicant2ApplyForFinancialOrder === YesOrNo.YES
      ? 'and make financial orders to decide how our money and property will be split.'
      : '.'
  }`,
  confirmPrayerHint: 'This confirms what you are asking the court to do. It’s known as ‘the prayer’.',
  confirmApplicationIsTrue: 'I believe the facts stated in this application are true.',
  confirmApplicationIsTrueHint:
    'This confirms that the information you are submitting is true and accurate to the best of your knowledge. It’s known as the ‘statement of truth’.',
  continue: `${
    isApplicant2 ||
    (!isApplicant2 &&
      formState?.applicant1HelpPayingNeeded === YesOrNo.YES &&
      formState?.applicant2HelpPayingNeeded === YesOrNo.YES)
      ? 'Submit'
      : 'Continue to payment'
  }`,
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
          name: 'confirmPrayer',
          label: l => l.confirmPrayer,
          hint: l => l.confirmPrayerHint,
          value: Checkbox.Checked,
          validator: isFieldFilledIn,
        },
      ],
    },
    applicant1IBelieveApplicationIsTrue: {
      type: 'checkboxes',
      labelHidden: true,
      labelSize: 'm',
      values: [
        {
          name: 'confirmApplicationIsTrue',
          label: l => l.confirmApplicationIsTrue,
          hint: l => l.confirmApplicationIsTrueHint,
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

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  const isApplicantAddressNotPrivate = content.formState?.applicant1AddressPrivate !== YesOrNo.YES;
  const isRespondentAddressNotPrivate = content.formState?.applicant2AddressPrivate !== YesOrNo.YES;
  const isApplicant1ApplyForFinancialOrder = content.formState?.applyForFinancialOrder === YesOrNo.YES;
  const isApplicant2ApplyForFinancialOrder = content.formState?.applicant2ApplyForFinancialOrder === YesOrNo.YES;
  return {
    ...translations,
    form,
    isApplicantAddressNotPrivate,
    isRespondentAddressNotPrivate,
    isApplicant1ApplyForFinancialOrder,
    isApplicant2ApplyForFinancialOrder,
  };
};
