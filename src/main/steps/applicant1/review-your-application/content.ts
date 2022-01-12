import { getFormattedDate } from '../../../app/case/answers/formatDate';
import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { connectionBulletPointsTextForRespondent } from '../../../app/jurisdiction/bulletedPointsContent';
import { CommonContent } from '../../common/common.content';
import { CHECK_CONTACT_DETAILS } from '../../urls';

const en = ({ isDivorce, isApplicant2, userCase, partner, required }: CommonContent) => ({
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
  caseReference: `<strong>Case reference number:</strong> ${userCase.id}`,
  issuedDate: `<strong>Issued:</strong> ${userCase.issueDate}`,
  applicantHeading: 'Applicant',
  applicantNames: `${userCase.applicant1FirstNames} ${userCase.applicant1MiddleNames} ${userCase.applicant1LastNames}`,
  respondentHeading: 'Respondent',
  respondentNames: `${userCase.applicant2FirstNames} ${userCase.applicant2MiddleNames} ${userCase.applicant2LastNames}`,
  whatThisMeansInfo1: `The applicant is the person who has applied ${
    isDivorce ? 'for the divorce' : 'to end their civil partnership'
  }.`,
  whatThisMeansInfo2: `The respondent is their ${partner}.`,
  heading2: `About the ${isDivorce ? 'marriage' : 'civil partnership'}`,
  line2:
    'These details are copied directly from the marriage certificate, or the translation of the certificate if it’s not in English. The names on the certificate are the names the applicant and respondent used before the marriage.',
  heading3: 'Who the marriage is between',
  line3: `${userCase.applicant1FullNameOnCertificate} and ${
    userCase.applicant2FullNameOnCertificate
  } (as shown on the ${isDivorce ? 'marriage' : 'civil partnership'} certificate)`,
  heading4: 'Where the marriage took place',
  heading5: `Date of ${isDivorce ? 'marriage' : 'civil partnership'}`,
  relationshipDate: `${getFormattedDate(userCase.relationshipDate)}`,
  heading6: 'Why the court can deal with the case (jurisdiction)',
  line4: 'The courts of England and Wales have the legal power (jurisdiction) to deal with this case because:',
  connectionBulletPoints: userCase ? connectionBulletPointsTextForRespondent(userCase.connections!) : [],
  whatThisMeans: 'What this means',
  whatThisMeansInfo3: `The courts of England or Wales must have the jurisdiction (the legal power) to be able to ${
    isDivorce ? 'grant a divorce' : 'end a civil partnership'
  }. The applicant confirmed that the legal statement(s) in the application apply to either or both the applicant and respondent. Each legal statement includes some or all of the following legal connections to England or Wales.`,
  heading7: 'Habitual residence',
  habitualResidenceLine1:
    'If your lives are mainly based in England or Wales then you’re what is legally known as ‘habitually resident’.',
  habitualResidenceLine2:
    'This may include working, owning property, having children in school, and your main family life taking place in England or Wales.',
  habitualResidenceLine3:
    'The examples above are not a complete list of what makes up habitual residence. Just because some of them apply to you, that does not mean you’re habitually resident. If you’re not sure, you should get legal advice.',
  heading8: 'Domicile',
  domicileLine1:
    'Your domicile is usually the place in which you were born, regard as your permanent home and to which you have the closest ties.',
  domicileLine2:
    'However, domicile can be more complex. For example, if you or your parents have moved countries in the past.',
  domicileLine3: 'When you’re born, you acquire the ‘domicile of origin’. This is usually:',
  domicileListItem1: 'the country your father was domiciled in if your parents were married',
  domicileListItem2:
    'the country your mother was domiciled in if your parents were unmarried, or your father had died before you were born',
  domicileLine4:
    'If you leave your domicile of origin and settle in another country as an adult, the new country may become your ‘domicile of choice’.',
  domicileLine5: 'If you’re not sure about your domicile, you should get legal advice.',
  heading9: 'Residual jurisdiction',
  residualJurisdictionLine1:
    'Usually, to be eligible for residual jurisdiction you or your ${partner} must be domiciled in England. Neither of you must be nationals of or habitually resident in, another country in the EU (except Denmark).',
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
  otherCourtCasesLine1:
    'The court needs to know about any other court cases relating to the marriage, which might affect the legal power (jurisdiction) of the court.',
  otherCourtCasesLine2: `The applicant has given details of other court cases relating to the ${
    isDivorce ? 'marriage' : 'civil partnership'
  }:`,
  noOtherCourtCases: `The applicant has indicated that there are no other court cases which are related to the ${
    isDivorce ? 'marriage' : 'civil partnership'
  }.`,
  heading11: `Reason for ${isDivorce ? 'the divorce' : 'ending the civil partnership'}`,
  line5: `The ${isDivorce ? 'marriage' : 'relationship'} has irretrievably broken down (it cannot be saved).`,
  heading12: 'Financial order application',
  financialOrderLine1: 'The applicant is applying to the court for financial orders.',
  noFinancialOrder: 'The applicant is not applying to the court for financial orders.',
  financialOrderMoreInfoLine1: `${
    isApplicant2 ? 'You were' : `Your ${partner} was`
  } asked if they want the court to decide how your money, property, pensions and other assets will be split. These decisions are called ‘financial orders’. Financial orders can be made between you and your husband and any children that you may have.`,
  financialOrderMoreInfoLine2:
    'A financial order can be made if you agree about dividing money and property, and you want to make the decision legally binding. This is known as a ‘financial order by consent’. Or they can be made if you disagree about dividing money and property and want the court to decide for you. This is known as a ‘contested financial order’.',
  financialOrderMoreInfoLine3:
    'To formally start legal proceedings, your husband will need to complete another form and pay a fee. Applying for a ‘contested financial order’ costs £255. Applying for a ‘financial order by consent’ costs £50. A solicitor can draft these for you.',
  financialOrderMoreInfoLine4: 'If you are not sure what to do then you should seek legal advice.',
  heading13: 'Statement of truth',
  factsTrue: 'I believe that the facts stated in this application are true.',
  confirmInformationStillCorrect: 'Is the information in this application still correct?',
  reasonInformationNotCorrect: `<strong>Changing your contact details</strong>
    <br>
    You can update your address and phone number in the <a class="govuk-link" href="${CHECK_CONTACT_DETAILS}">‘contact details’ section of your ${
    isDivorce ? 'divorce' : ''
  } account.</a> There is no cost for this.</p>
    <br>
    <p class="govuk-body"><strong>Changing any other information</strong>
    <br>
    If you want to change any other information then you should provide details below. The court will review it and you may need to pay a £95 fee. This is because the application will need to be updated and may need to be sent to your ${partner} again.`,
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
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
