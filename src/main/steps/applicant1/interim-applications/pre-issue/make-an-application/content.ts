import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { WITHDRAW_THIS_APPLICATION } from '../../../../urls';

const en = () => ({
  title: 'Make an application to the court (D11)',
  subHeading: 'You can use this form to make a number of different applications.',
  withdraw: {
    header: 'Withdraw your divorce or dissolution application',
    preIssue: `Your application has not yet been served on the other party, so you can <a class="govuk-link" target="_blank" href="${WITHDRAW_THIS_APPLICATION}">withdraw your application without applying to the court</a>.`,
  },
  stay: {
    header: 'Apply to delay or pause an application (‘put a stay’ on an application) ',
    infoHeader: 'You can apply to delay or pause an application at any time before your final order is issued if:',
    options: {
      otherProceedings: 'there are other proceedings continuing outside of England and Wales',
      reconcile: 'you are trying to reconcile with your partner',
      otherReason: 'for another reason',
    },
    content:
      'If you are a respondent applying to delay the making of a final order to allow the court to consider your financial position, you can only apply once a conditional order has been granted.',
  },
  extend: {
    header: 'Apply for more time to serve an application (also known as ‘extending service’) ',
    content:
      'Generally you can only apply to extend service for 28 days after the application has been issued. You may be able to apply outside of this period if you have good reason to do so.',
  },
  expedite: {
    header:
      'Apply to complete a divorce or civil partnership dissolution more quickly (also known as ‘expediting’ an application) ',
    content:
      'You can apply to expedite an application any time until a final order has been issued. You will need to specify which part of your application you want to expedite.',
  },
  amend: {
    header: 'Apply to amend an application',
    preIssue:
      'You can apply to amend an application any time before a conditional order is made without applying to the court. You will need to serve your amended application on the other party.',
    postIssue:
      'If a conditional order has been made, you will need to apply for the court to amend your application, and you may need the other party’s consent.',
  },
  other: {
    header: 'Make a different application to the court',
  },
  buttonText: 'Start now',
});

const cy = () => ({
  title: 'Make an application to the court (D11)',
  subHeading: 'You can use this form to make a number of different applications.',
  withdraw: {
    header: 'Withdraw your divorce or dissolution application',
    preIssue: `Your application has not yet been served on the other party, so you can <a class="govuk-link" target="_blank" href="${WITHDRAW_THIS_APPLICATION}">withdraw your application without applying to the court</a>.`,
  },
  stay: {
    header: 'Apply to delay or pause an application (‘put a stay’ on an application) ',
    infoHeader: 'You can apply to delay or pause an application at any time before your final order is issued if:',
    options: {
      otherProceedings: 'there are other proceedings continuing outside of England and Wales',
      reconcile: 'you are trying to reconcile with your partner',
      otherReason: 'for another reason',
    },
    content:
      'If you are a respondent applying to delay the making of a final order to allow the court to consider your financial position, you can only apply once a conditional order has been granted.',
  },
  extend: {
    header: 'Apply for more time to serve an application (also known as ‘extending service’) ',
    content:
      'Generally you can only apply to extend service for 28 days after the application has been issued. You may be able to apply outside of this period if you have good reason to do so.',
  },
  expedite: {
    header:
      'Apply to complete a divorce or civil partnership dissolution more quickly (also known as ‘expediting’ an application) ',
    content:
      'You can apply to expedite an application any time until a final order has been issued. You will need to specify which part of your application you want to expedite.',
  },
  amend: {
    header: 'Apply to amend an application',
    preIssue:
      'You can apply to amend an application any time before a conditional order is made without applying to the court. You will need to serve your amended application on the other party.',
    postIssue:
      'If a conditional order has been made, you will need to apply for the court to amend your application, and you may need the other party’s consent.',
  },
  other: {
    header: 'Make a different application to the court',
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
  const translations = languages[content.language]();
  const isPreIssue = content.userCase.issueDate === undefined || content.userCase.issueDate === null;
  return {
    ...translations,
    form,
    isPreIssue,
  };
};
