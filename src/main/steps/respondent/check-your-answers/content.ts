import { Checkbox } from '../../../app/case/case';
import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import * as urls from '../../urls';

const en = ({ isDivorce, userCase }) => ({
  titleSoFar: 'Check your answers so far',
  titleSubmit: 'Check your answers',
  sectionTitles: {
    readApplication: `Confirm that you have read the ${
      isDivorce ? 'divorce application' : 'application to end your civil partnership'
    }`,
    aboutApplication: `About your ${isDivorce ? 'divorce' : 'civil partnership'}`,
    contactYou: 'How the court will contact you',
    otherCourtCases: 'Other court cases',
  },
  stepQuestions: {
    readApplication: {
      line1: `Review the ${isDivorce ? 'divorce application' : 'application to end your civil partnership'}`,
    },
    aboutApplication: {
      line1: 'How do you want to respond to the application?',
      line2: 'Do you agree the courts of England and Wales have jurisdiction?',
      line3: `Explain why you think the courts of England and Wales do not have the legal power (jurisdiction) to ${
        isDivorce ? 'grant your divorce' : 'end your civil partnership'
      }.`,
    },
    contactYou: {
      line1: 'By email',
      line2: 'By phone',
      line3: 'What language do you want to receive emails and documents in?',
    },
    otherCourtCases: {
      line1: `Are there, or have there ever been, any other court cases relating to this ${
        isDivorce ? 'marriage' : 'civil partnership'
      }?`,
      line2: 'Provide details about the other legal proceedings.',
    },
  },
  stepAnswers: {
    readApplication: {
      line1: `${
        userCase.confirmReadPetition
          ? `I have read the application ${isDivorce ? 'for divorce' : 'to end our civil partnership'}`
          : ''
      }`,
    },
    aboutApplication: {
      line1: `${
        userCase.disputeApplication
          ? userCase.disputeApplication === YesOrNo.YES
            ? `I want to dispute the ${isDivorce ? 'divorce' : 'application to end your civil partnership'}`
            : `Continue without disputing the ${isDivorce ? 'divorce' : 'application to end your civil partnership'}`
          : ''
      }`,
      line2: `${
        userCase.jurisdictionAgree
          ? userCase.jurisdictionAgree === YesOrNo.YES
            ? 'Yes, I agree the courts have jurisdiction'
            : 'No, I do not agree the courts have jurisdiction'
          : ''
      }`,
      line3: `${
        userCase.reasonCourtsOfEnglandAndWalesHaveNoJurisdiction &&
        userCase.jurisdictionAgree &&
        userCase.jurisdictionAgree === YesOrNo.NO
          ? userCase.reasonCourtsOfEnglandAndWalesHaveNoJurisdiction
          : ''
      }`,
    },
    contactYou: {
      line1: `${
        userCase.applicant2AgreeToReceiveEmails && userCase.applicant2AgreeToReceiveEmails === Checkbox.Checked
          ? `I agree that the ${
              isDivorce ? 'divorce service' : 'ending a civil partnership service'
            } can send me notifications and serve (deliver) court documents to me by email.`
          : ''
      }`,
      line2: `${userCase.applicant2PhoneNumber}`,
      line3: `${
        userCase.applicant2EnglishOrWelsh
          ? userCase.applicant2EnglishOrWelsh.charAt(0).toUpperCase() + userCase.applicant2EnglishOrWelsh.slice(1)
          : ''
      }`,
    },
    otherCourtCases: {
      line1: `${userCase.applicant2LegalProceedings}`,
      line2: `${userCase.applicant2LegalProceedings === YesOrNo.YES ? userCase.applicant2LegalProceedingsDetails : ''}`,
    },
  },
  stepLinks: {
    readApplication: {
      line1: urls.REVIEW_THE_APPLICATION,
    },
    aboutApplication: {
      line1: urls.HOW_DO_YOU_WANT_TO_RESPOND,
      line2: urls.LEGAL_JURISDICTION_OF_THE_COURTS,
      line3: urls.LEGAL_JURISDICTION_OF_THE_COURTS,
    },
    contactYou: {
      line1: urls.HOW_THE_COURTS_WILL_CONTACT_YOU,
      line2: urls.HOW_THE_COURTS_WILL_CONTACT_YOU,
      line3: urls.ENGLISH_OR_WELSH,
    },
    otherCourtCases: {
      line1: urls.OTHER_COURT_CASES,
      line2: urls.DETAILS_OTHER_PROCEEDINGS,
    },
  },
  continueApplication: 'Continue application',
  confirmBeforeSubmit: 'Confirm before submitting',
  iConfirm: 'I confirm that:',
  confirmSotHint: `
    <ul class="govuk-list govuk-list--bullet govuk-!-margin-top-4">
    <li>I am the person named as the respondent in the application ${
      isDivorce ? 'for divorce' : 'to end your civil partnership'
    }</li>
    <li>I believe that the facts stated in this response are true</li></ul>`,
  confirmationExplanation: `The first statement is confirming that you’re the person who should be responding to this application ${
    isDivorce ? 'for divorce' : 'to end your civil partnership'
  }. The second is your statement of truth.`,
  continue: 'Submit',
  errors: {
    applicant2IBelieveApplicationIsTrue: {
      required:
        'You have not confirmed that you are the respondent and that you believe the facts in the application are true. You need to confirm before continuing.',
    },
  },
});

// @TODO translations
const cy: typeof en = ({ isDivorce, userCase }) => ({
  ...en({ isDivorce, userCase }),
  sectionTitles: {
    readApplication: `Confirm that you have read the ${
      isDivorce ? 'divorce application' : 'application to end your civil partnership'
    }`,
    aboutApplication: `About your ${isDivorce ? 'divorce' : 'civil partnership'}`,
    contactYou: 'Sut bydd y llys yn cysylltu â chi',
    otherCourtCases: 'Other court cases',
  },
  stepQuestions: {
    readApplication: {
      line1: `Review the ${isDivorce ? 'divorce application' : 'application to end your civil partnership'}`,
    },
    aboutApplication: {
      line1: 'How do you want to respond to the application?',
      line2: 'Do you agree the courts of England and Wales have jurisdiction?',
      line3: `Explain why you think the courts of England and Wales do not have the legal power (jurisdiction) to ${
        isDivorce ? 'grant your divorce' : 'end your civil partnership'
      }.`,
    },
    contactYou: {
      line1: 'Trwy e-bost',
      line2: 'Dros y ffôn',
      line3: 'What language do you want to receive emails and documents in?',
    },
    otherCourtCases: {
      line1: `Are there, or have there ever been, any other court cases relating to this ${
        isDivorce ? 'marriage' : 'civil partnership'
      }?`,
      line2: 'Provide details about the other legal proceedings.',
    },
  },
  stepAnswers: {
    readApplication: {
      line1: `${
        userCase.confirmReadPetition
          ? `I have read the application ${isDivorce ? 'for divorce' : 'to end our civil partnership'}`
          : ''
      }`,
    },
    aboutApplication: {
      line1: `${
        userCase.disputeApplication
          ? userCase.disputeApplication === YesOrNo.YES
            ? `I want to dispute the ${isDivorce ? 'divorce' : 'application to end your civil partnership'}`
            : `Continue without disputing the ${isDivorce ? 'divorce' : 'application to end your civil partnership'}`
          : ''
      }`,
      line2: `${
        userCase.jurisdictionAgree
          ? userCase.jurisdictionAgree === YesOrNo.YES
            ? 'Yes, I agree the courts have jurisdiction'
            : 'No, I do not agree the courts have jurisdiction'
          : ''
      }`,
      line3: `${
        userCase.reasonCourtsOfEnglandAndWalesHaveNoJurisdiction &&
        userCase.jurisdictionAgree &&
        userCase.jurisdictionAgree === YesOrNo.NO
          ? userCase.reasonCourtsOfEnglandAndWalesHaveNoJurisdiction
          : ''
      }`,
    },
    contactYou: {
      line1: `${
        userCase.applicant2AgreeToReceiveEmails && userCase.applicant2AgreeToReceiveEmails === Checkbox.Checked
          ? `Rwy'n cytuno y gall y ${
              isDivorce ? 'gwasanaeth ysgaru' : 'gwasanaeth diweddu partneriaeth sifil'
            } anfon hysbysiadau ataf a chyflwyno (danfon) dogfennau llys ataf drwy e-bost.`
          : ''
      }`,
      line2: `${userCase.applicant2PhoneNumber}`,
      line3: `${
        userCase.applicant2EnglishOrWelsh
          ? userCase.applicant2EnglishOrWelsh.charAt(0).toUpperCase() + userCase.applicant2EnglishOrWelsh.slice(1)
          : ''
      }`,
    },
    otherCourtCases: {
      line1: `${userCase.applicant2LegalProceedings}`,
      line2: `${userCase.applicant2LegalProceedings === YesOrNo.YES ? userCase.applicant2LegalProceedingsDetails : ''}`,
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant2IBelieveApplicationIsTrue: {
      type: 'checkboxes',
      label: l => l.confirmBeforeSubmit,
      labelSize: 'm',
      values: [
        {
          name: 'applicant2IBelieveApplicationIsTrue',
          label: l => l.iConfirm,
          hint: l => l.confirmSotHint,
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
  const applicant2Url = content.isApplicant2 ? urls.RESPONDENT : '';
  return {
    ...translations,
    form,
    applicant2Url,
  };
};
