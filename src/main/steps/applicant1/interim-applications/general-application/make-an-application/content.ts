import config from 'config';

import { State } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { getFee } from '../../../../../app/fees/service/get-fee';
import { FormContent } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';
import { APPLICANT_2, WITHDRAW_THIS_APPLICATION } from '../../../../urls';

const en = ({ partner, isApplicant2, isDivorce, isJointApplication }: CommonContent) => ({
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
    preCO: {
      line1: `${isJointApplication ? `Either you or your ${partner}` : 'You'} can amend your application at any time before the court makes a conditional order. There is no fee to do this.`,
      line2:
        'You do not need to apply using the online service. You can send your changes to the court by webform or by post using the contact details on your online account.',
      line3sole: `If your ${partner} has already responded to the application, the court must see confirmation that they agree to the change. Upload or send evidence of their consent when you submit the amended information.`,
      line3joint: `Both you and your ${partner} must agree to the change. The court must see confirmation of this. Upload or send evidence of consent from your ${partner} when you submit the amended information.`,
      line4: 'The court will review the change and will contact you with next steps.',
    },
    postCO:
      'If a conditional order has been made, you will need to apply for the court to amend your application, and you may need the other party’s consent.',
  },
  other: {
    header: 'Make a different application to the court',
    content: 'If none of the above applications are suitable, you can make another type of application',
  },
  caseIsAwaitingPronouncement: {
    header: 'Submitting a general application while your conditional order is listed for pronouncement',
    line1:
      'If you submit a general application while your conditional order is listed and awaiting pronouncement, the court will need to consider your application before the conditional order hearing can go ahead.',
    line2: 'This means:',
    bullet1: 'Your conditional order hearing will be cancelled, and',
    bullet2: 'a new hearing will be scheduled after the court has made a decision on your general application.',
    line3:
      'You should only make a general application at this stage if you understand that it will delay the pronouncement of your conditional order.',
    line4: ' If you are unsure whether to make a general application, you may wish to seek legal advice.',
  },
  consideringYourFinancialPosition: {
    header: 'Asking the court to consider your financial position before granting a final order',
    line1:
      'If you want the court to consider your financial position before a final order is granted, you must make a separate application. This is done by submitting Form B (Notice of application to consider the financial position of the respondent after a divorce or dissolution).',
    line2: `The Form B application cannot be submitted through the online service. The fee for Form B is ${getFee(config.get('fees.financialOrder'))} and must be paid before the court can consider the application.`,
    line3:
      'You can submit the application using the <a href="https://www.gov.uk/government/publications/form-b-notice-of-application-to-consider-the-financial-position-of-the-respondent-after-divorce-dissolution" target="_blank">Paper Form B</a>.',
    line4:
      'Once completed, you can send the form to the court by webform or by post using the contact details on your online account.',
  },
  buttonText: 'Start now',
});

const cy = ({ partner, isApplicant2, isDivorce, isJointApplication }: CommonContent) => ({
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
    preCO: {
      line1: `${isJointApplication ? `Either you or your ${partner}` : 'You'} can amend your application at any time before the court makes a conditional order. There is no fee to do this.`,
      line2:
        'You do not need to apply using the online service. You can send your changes to the court by webform or by post using the contact details on your online account.',
      line3sole: `If your ${partner} has already responded to the application, the court must see confirmation that they agree to the change. Upload or send evidence of their consent when you submit the amended information.`,
      line3joint: `Both you and your ${partner} must agree to the change. The court must see confirmation of this. Upload or send evidence of consent from your ${partner} when you submit the amended information.`,
      line4: 'The court will review the change and will contact you with next steps.',
    },
    postCO:
      'If a conditional order has been made, you will need to apply for the court to amend your application, and you may need the other party’s consent.',
  },
  other: {
    header: 'Make a different application to the court',
    content: 'If none of the above applications are suitable, you can make another type of application',
  },
  buttonText: 'Start now',
  caseIsAwaitingPronouncement: {
    header: 'Submitting a general application while your conditional order is listed for pronouncement',
    line1:
      'If you submit a general application while your conditional order is listed and awaiting pronouncement, the court will need to consider your application before the conditional order hearing can go ahead.',
    line2: 'This means:',
    bullet1: 'Your conditional order hearing will be cancelled, and',
    bullet2: 'a new hearing will be scheduled after the court has made a decision on your general application.',
    line3:
      'You should only make a general application at this stage if you understand that it will delay the pronouncement of your conditional order.',
    line4: ' If you are unsure whether to make a general application, you may wish to seek legal advice.',
  },
  consideringYourFinancialPosition: {
    header: 'Asking the court to consider your financial position before granting a final order',
    line1:
      'If you want the court to consider your financial position before a final order is granted, you must make a separate application. This is done by submitting Form B (Notice of application to consider the financial position of the respondent after a divorce or dissolution).',
    line2: `The Form B application cannot be submitted through the online service. The fee for Form B is ${getFee(config.get('fees.financialOrder'))} and must be paid before the court can consider the application.`,
    line3:
      'You can submit the application using the <a href="https://www.gov.uk/government/publications/form-b-notice-of-application-to-consider-the-financial-position-of-the-respondent-after-divorce-dissolution" target="_blank">Paper Form B</a>.',
    line4:
      'Once completed, you can send the form to the court by webform or by post using the contact details on your online account.',
  },
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
  const hasCOBeenGranted = content.userCase.coGrantedDate !== undefined;
  const isAwaitingPronouncement = content.userCase.state === State.AwaitingPronouncement;

  return {
    ...translations,
    form,
    caseHasBeenIssued: content.caseHasBeenIssued,
    isRespondent,
    isSoleApplicant,
    hasCOBeenGranted,
    isAwaitingPronouncement,
  };
};
