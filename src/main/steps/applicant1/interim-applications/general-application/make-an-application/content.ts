import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';
import { APPLICANT_2, WITHDRAW_THIS_APPLICATION } from '../../../../urls';

const en = ({ partner, isApplicant2, isDivorce }: CommonContent) => ({
  title: 'Make an application to the court (D11)',
  subHeading: 'You can use this form to make a number of different applications.',
  withdraw: {
    header: `Withdraw your ${isDivorce ? 'divorce' : 'dissolution'} application`,
    preIssueTextSole: `Your application has not yet been served on the other party, so you can <a class="govuk-link" target="_blank" href="${WITHDRAW_THIS_APPLICATION}">withdraw your application without applying to the court (opens in a new tab)</a>.`,
    preIssueTextJoint: `Either you or your ${partner} can <a class="govuk-link" target="_blank" href="${isApplicant2 ? APPLICANT_2 : '' + WITHDRAW_THIS_APPLICATION}">withdraw this application (opens in a new tab)</a>. We will refund you any fees that you have paid if the court confirms that you are due a refund.`,
    postIssueText: 'You can apply to withdraw your application at any point before your final order is issued',
  },
  stay: {
    header: 'Apply to delay or pause an application (‘put a stay’ on an application) ',
    infoHeader: 'You can apply to delay or pause an application at any time before your final order is issued if:',
    options: {
      otherProceedings: 'there are other proceedings continuing outside of England and Wales',
      reconcile: `you are trying to reconcile with your ${partner}`,
      otherReason: 'for another reason',
    },
    additionalRespondentContent:
      'If you are a respondent applying to delay the making of a final order to allow the court to consider your financial position, you can only apply once a conditional order has been granted.',
  },
  extend: {
    header: 'Apply for more time to serve an application (also known as ‘extending service’) ',
    content:
      'Generally you can only apply to extend service for 28 days after the application has been issued. You may be able to apply outside of this period if you have good reason to do so.',
  },
  applyWithoutMarriageCertificate: {
    header: `Apply to continue your application without a ${isDivorce ? 'marriage' : 'civil partnership'} certificate`,
    content: `If you do not have your ${isDivorce ? 'marriage' : 'civil partnership'} certificate available you can apply to continue your application without it.`,
  },
  expedite: {
    header: `Apply to complete a ${isDivorce ? 'divorce' : 'civil partnership dissolution'} more quickly (also known as ‘expediting’ an application) `,
    content:
      'You can apply to expedite an application any time until a final order has been issued. You will need to specify which part of your application you want to expedite.',
  },
  amend: {
    header: 'Apply to amend an application',
    preCO:
      'You can apply to amend an application any time before a conditional order is made without applying to the court. You will need to serve your amended application on the other party.',
    postCO:
      'If a conditional order has been made, you will need to apply for the court to amend your application, and you may need the other party’s consent.',
  },
  other: {
    header: 'Make a different application to the court',
    content: 'If none of the above applications are suitable, you can make another type of application',
  },
  buttonText: 'Start now',
});

const cy = ({ partner, isApplicant2, isDivorce }: CommonContent) => ({
  title: 'Make an application to the court (D11)',
  subHeading: 'You can use this form to make a number of different applications.',
  withdraw: {
    header: `Withdraw your ${isDivorce ? 'divorce' : 'dissolution'} application`,
    preIssueTextSole: `Your application has not yet been served on the other party, so you can <a class="govuk-link" target="_blank" href="${WITHDRAW_THIS_APPLICATION}">withdraw your application without applying to the court (opens in a new tab)</a>.`,
    preIssueTextJoint: `Either you or your ${partner} can <a class="govuk-link" target="_blank" href="${isApplicant2 ? APPLICANT_2 : '' + WITHDRAW_THIS_APPLICATION}">withdraw this application (opens in a new tab)</a>. We will refund you any fees that you have paid if the court confirms that you are due a refund.`,
    postIssueText: 'You can apply to withdraw your application at any point before your final order is issued',
  },
  stay: {
    header: 'Apply to delay or pause an application (‘put a stay’ on an application) ',
    infoHeader: 'You can apply to delay or pause an application at any time before your final order is issued if:',
    options: {
      otherProceedings: 'there are other proceedings continuing outside of England and Wales',
      reconcile: `you are trying to reconcile with your ${partner}`,
      otherReason: 'for another reason',
    },
    additionalRespondentContent:
      'If you are a respondent applying to delay the making of a final order to allow the court to consider your financial position, you can only apply once a conditional order has been granted.',
  },
  extend: {
    header: 'Apply for more time to serve an application (also known as ‘extending service’) ',
    content:
      'Generally you can only apply to extend service for 28 days after the application has been issued. You may be able to apply outside of this period if you have good reason to do so.',
  },
  applyWithoutMarriageCertificate: {
    header: `Apply to continue your application without a ${isDivorce ? 'marriage' : 'civil partnership'} certificate`,
    content: `If you do not have your ${isDivorce ? 'marriage' : 'civil partnership'} certificate available you can apply to continue your application without it.`,
  },
  expedite: {
    header: `Apply to complete a ${isDivorce ? 'divorce' : 'civil partnership dissolution'} more quickly (also known as ‘expediting’ an application) `,
    content:
      'You can apply to expedite an application any time until a final order has been issued. You will need to specify which part of your application you want to expedite.',
  },
  amend: {
    header: 'Apply to amend an application',
    preCO:
      'You can apply to amend an application any time before a conditional order is made without applying to the court. You will need to serve your amended application on the other party.',
    postCO:
      'If a conditional order has been made, you will need to apply for the court to amend your application, and you may need the other party’s consent.',
  },
  other: {
    header: 'Make a different application to the court',
    content: 'If none of the above applications are suitable, you can make another type of application',
  },
  buttonText: 'Start now',
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.buttonText,
    isStartButton: true,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  const isRespondent = content.isApplicant2 && !content.isJointApplication;
  const isSoleApplicant = !content.isApplicant2 && !content.isJointApplication;
  const hasCOBeenSubmitted =
    (!content.isJointApplication && !!content.userCase.coApplicant1SubmittedDate) ||
    (content.isJointApplication &&
      !!content.userCase.coApplicant1SubmittedDate &&
      !!content.userCase.coApplicant2SubmittedDate);
  return {
    ...translations,
    form,
    caseHasBeenIssued: content.caseHasBeenIssued,
    isRespondent,
    isSoleApplicant,
    hasCOBeenSubmitted,
  };
};
