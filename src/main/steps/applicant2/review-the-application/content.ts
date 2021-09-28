import { getFormattedDate } from '../../../app/case/answers/formatDate';
import { Checkbox } from '../../../app/case/case';
import { FinancialOrderFor, JurisdictionConnections, YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { jurisdictionMoreDetailsContent } from '../../applicant1/connection-summary/content';
import { CommonContent } from '../../common/common.content';
import { moreDetailsComponent } from '../check-your-joint-application/content';

const connectionBulletPointsTextForRespondent = connections => {
  const connectionBulletPoints = {
    [JurisdictionConnections.APP_1_APP_2_RESIDENT]:
      'the applicant and respondent are habitually resident in England and Wales',
    [JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT]:
      'the applicant and respondent were last habitually resident in England and Wales and one of them still resides there',
    [JurisdictionConnections.APP_1_RESIDENT_TWELVE_MONTHS]:
      'the applicant is habitually resident in England and Wales and has resided there for at least a year immediately prior to the presentation of the application',
    [JurisdictionConnections.APP_1_RESIDENT_SIX_MONTHS]:
      'the applicant is domiciled and habitually resident in England and Wales and has resided there for at least six months immediately prior to the application',
    [JurisdictionConnections.APP_1_APP_2_DOMICILED]:
      'the applicant and respondent are both domiciled in England and Wales',
    [JurisdictionConnections.APP_1_DOMICILED]: 'you are domiciled in England or Wales',
    [JurisdictionConnections.RESIDUAL_JURISDICTION]:
      'the applicant and respondent registered as civil partners of each other in England or Wales or,' +
      ' in the case of a same sex couple, married each other under the law of England and Wales and it would be in the interests of justice for the court to assume jurisdiction in this case ',
  };

  const connectionBulletPointList: string[] = [];

  for (const index in connections) {
    connectionBulletPointList.push(connectionBulletPoints[connections[index]]);
  }

  return connectionBulletPointList;
};

const respondentIntroduction =
  'The courts of England or Wales must have the jurisdiction (the legal power) to be able to grant a divorce.' +
  ' The applicant confirmed that the legal statement(s) in the application apply to either or both the applicant and respondent.' +
  ' Each legal statement includes some or all of the following legal connections to England or Wales.';

const en = ({ isDivorce, formState, partner, userEmail, isApplicant2 }: CommonContent) => ({
  title: `Review the ${isDivorce ? 'divorce application' : 'application to end your civil partnership'}`,
  line1: `Review this application ${
    isDivorce ? 'for divorce' : 'to end your civil partnership'
  } and confirm you have read it.`,
  subHeading1: `Sole ${isDivorce ? 'divorce application' : 'application to end a civil partnership'}`,
  line2: `${formState?.applicant1FirstNames + ' ' + formState?.applicant1LastNames} is applying to the court
    <ul class="govuk-list govuk-list--bullet govuk-!-margin-top-4">
    <li>for ${isDivorce ? 'a final order of divorce from' : 'the dissolution of the civil partnership with'}
    ${formState?.applicant2FirstNames + ' ' + formState?.applicant2LastNames}</li>
    <li>to make a financial order</li></ul>`,
  line3: `<strong>Issued: </strong>${formState?.issueDate}`,
  line4: `<strong>Case reference number: </strong>${formState?.id?.replace(
    /(\\d{4})(\\d{4})(\\d{4})(\\d{4})/,
    '$1-$2-$3-$4'
  )}`,
  line5: '<strong>Applicant</strong>',
  line6: `${
    formState?.applicant1FirstNames +
    ' ' +
    (formState?.applicant1MiddleNames ? formState?.applicant1MiddleNames + ' ' : '') +
    formState?.applicant1LastNames
  }`,
  line7: '<strong>Respondent</strong>',
  line8: `${
    formState?.applicant2FirstNames +
    ' ' +
    (formState?.applicant2MiddleNames ? formState?.applicant2MiddleNames + ' ' : '') +
    formState?.applicant2LastNames
  }`,
  line9: `The applicant is the person who has applied ${
    isDivorce ? 'for the divorce' : 'to end their civil partnership'
  }.
    <br>The respondent is their ${partner}.`,
  subHeading2: `About the ${isDivorce ? 'marriage' : 'civil partnership'}`,
  line10: `These details are copied directly from the ${isDivorce ? 'marriage' : 'civil partnership'} certificate,
     or the translation of the certificate, if it’s not in English. The names on the certificate are the names the
      applicant and respondent used before the ${isDivorce ? 'marriage' : 'civil partnership'}.`,
  line11: `<strong>Who the ${isDivorce ? 'marriage' : 'civil partnership'} is between</strong>`,
  line12: `${formState?.applicant1FullNameOnCertificate + ' and ' + formState?.applicant2FullNameOnCertificate}
  (as shown on the ${isDivorce ? 'marriage' : 'civil partnership'} certificate)`,
  line13: `<strong> Where the ${isDivorce ? 'marriage' : 'civil partnership'} took place</strong>`,
  line14: `${formState?.ceremonyPlace}`,
  line15: `<strong>Date of ${isDivorce ? 'marriage' : 'civil partnership'}</strong>`,
  line16: `${getFormattedDate(formState?.relationshipDate)}`,
  subHeading3: 'Why the court can deal with the case (jurisdiction)',
  line17: 'The courts of England and Wales have the legal power (jurisdiction) to deal with this case because:',
  connectionBulletPoints: connectionBulletPointsTextForRespondent(formState?.connections),
  jurisdictionsMoreDetails: moreDetailsComponent(
    respondentIntroduction + '<br><br>' + jurisdictionMoreDetailsContent(formState, true).connectedToEnglandWales,
    'What this means'
  ),
  subHeading4: 'Other court cases',
  line18: `The court needs to know about any other court cases relating to the ${
    isDivorce ? 'marriage' : 'civil partnership'
  }, which might affect the legal power (jurisdiction) of the court.`,
  line19: `${
    formState?.applicant1LegalProceedings === YesOrNo.YES
      ? `The applicant has given details of other court cases relating to the ${
          isDivorce ? 'marriage' : 'civil partnership'
        }:` +
        '<br>' +
        formState.applicant1LegalProceedingsDetails
      : `The applicant has indicated that there are no other court cases which are related to the ${
          isDivorce ? 'marriage' : 'civil partnership'
        }`
  }.`,
  subHeading5: `Reason for  ${isDivorce ? 'the divorce' : 'ending the civil partnership'}`,
  line20: `The ${isDivorce ? 'marriage' : 'relationship'} has broken down irretrievably (it cannot be saved).`,
  subHeading6: 'Financial order application',
  line21: `${
    formState?.applyForFinancialOrder === YesOrNo.YES
      ? 'The applicant intends to apply to the court for financial orders for the applicant' +
        formState.whoIsFinancialOrderFor?.includes(FinancialOrderFor.CHILDREN)
        ? `, and for the
  children of the applicant and the respondent.`
        : '.'
      : 'The applicant is not intending to apply to the court for financial orders.'
  }`,
  financialOrderMoreDetails: moreDetailsComponent(
    `${isApplicant2 ? `Your ${partner} was asked if they` : 'You were asked if you'}
   want the court to decide how your money, property, pensions and other assets will be split.
   These decisions are called ‘financial orders’. Financial orders can be made between you and your ${partner} and any children that you may have.
   <br><br>A financial order can be made if you agree about dividing money and property, and you want to make the decision legally binding. This is known as a ‘financial order by consent’. Or they can be made if you disagree about dividing money and property and want the court to decide. This is known as a ‘contested financial order’.
   <br><br>To formally start legal proceedings, ${partner} will need to complete another form and pay a fee. Applying for a ‘contested financial order’ costs £255. Applying for a ‘financial order by consent’ costs £50. You can get a solicitor to draft these and apply for you.
   <br><br>If you are not sure what to do then you should seek legal advice.`,
    'What this means'
  ),
  subHeading7: "Applicant's correspondence address",
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
  subHeading8: "Applicant's email address",
  line22: `${userEmail}`,
  subHeading9: "Respondent's correspondence address",
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
  subHeading10: "Respondent's email address",
  line23: `${formState?.applicant2EmailAddress}`,
  subHeading11: 'Statement of truth',
  line24: 'I believe that the facts stated in this application are true.',
  applicantName: `<em>${
    isApplicant2
      ? formState?.applicant2FirstNames + ' ' + formState?.applicant2LastNames
      : formState?.applicant1FirstNames + ' ' + formState?.applicant1LastNames
  }</em>`,
  subHeading12: 'Your acknowledgement',
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

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  const isApplicantAddressNotPrivate = content.formState?.applicant1AddressPrivate !== YesOrNo.YES;
  const isRespondentAddressNotPrivate = content.formState?.applicant2AddressPrivate !== YesOrNo.YES;
  return {
    ...translations,
    form,
    isApplicantAddressNotPrivate,
    isRespondentAddressNotPrivate,
  };
};
