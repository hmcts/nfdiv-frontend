import { Checkbox } from '../../../app/case/case';
import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { DISABLE_UPON_SUBMIT } from '../../common/content.utils';
import { isApplicationReadyToSubmit } from '../../index';
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
      line2: `Do you agree the courts of England and Wales have legal power (jurisdiction) to ${
        isDivorce ? 'grant your divorce' : 'end your civil partnership'
      }?`,
      line3: `Explain why you think the courts of England and Wales do not have the legal power (jurisdiction) to ${
        isDivorce ? 'grant your divorce' : 'end your civil partnership'
      }.`,
      line4: 'Which country is your life mainly based?',
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
      line4: `${
        userCase.reasonCourtsOfEnglandAndWalesHaveNoJurisdiction &&
        userCase.jurisdictionAgree &&
        userCase.jurisdictionAgree === YesOrNo.NO
          ? userCase.inWhichCountryIsYourLifeMainlyBased
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
      line4: urls.LEGAL_JURISDICTION_OF_THE_COURTS,
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
  confirmApplicationIsTrueWarning:
    'Proceedings for contempt of court may be brought against anyone who makes, or causes to be made, a false statement verified by a statement of truth without an honest belief in its truth.',
  errors: {
    aosStatementOfTruth: {
      required:
        'You have not confirmed that you are the respondent and that you believe the facts in the application are true. You need to confirm before continuing.',
    },
  },
});

const cy: typeof en = ({ isDivorce, userCase }) => ({
  ...en({ isDivorce, userCase }),
  titleSoFar: 'Gwiriwch eich atebion hyd yma',
  titleSubmit: 'Gwiriwch eich atebion',
  sectionTitles: {
    readApplication: `Cadarnhewch eich bod wedi darllen y ${
      isDivorce ? 'cais am ysgariad' : "cais i ddod â'ch partneriaeth sifil i ben"
    }`,
    aboutApplication: `Ynghylch eich ${isDivorce ? 'ysgariad' : 'partneriaeth sifil'}`,
    contactYou: 'Sut fydd y llys yn cysylltu â chi',
    otherCourtCases: 'Achosion llys eraill',
  },
  stepQuestions: {
    readApplication: {
      line1: `Adolygu’r ${isDivorce ? 'cais am ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'}`,
    },
    aboutApplication: {
      line1: 'Sut rydych chi eisiau ymateb i’r cais?',
      line2: `Ydych chi’n cytuno bod gan lysoedd Cymru a Lloegr y pŵer cyfreithiol (awdurdodaeth) i ${
        isDivorce ? 'ganiatáu i chi gael ysgariad' : 'ddod â’ch partneriaeth sifil i ben'
      }?`,
      line3: `Eglurwch pam ydych chi’n credu nad oes gan lysoedd Cymru a Lloegr y pŵer cyfreithiol (awdurdodaeth) i ${
        isDivorce ? 'ganiatáu i chi gael ysgariad' : 'ddod â’ch priodas sifil i ben'
      }.`,
      line4: 'Ym mha wlad ydych chi’n byw yn bennaf?',
    },
    contactYou: {
      line1: 'Trwy e-bost',
      line2: 'Dros y ffôn',
      line3: 'Ym mha iaith hoffech chi gael negeseuon e-bost a dogfennau?',
    },
    otherCourtCases: {
      line1: `A oes, neu a oes wedi bod erioed, unrhyw achosion cyfreithiol eraill yng nghyswllt eich ${
        isDivorce ? 'priodas' : 'partneriaeth sifil'
      }, eich eiddo, neu'ch plant?`,
      line2: 'Rhowch fanylion am yr achosion cyfreithiol eraill.',
    },
  },
  stepAnswers: {
    readApplication: {
      line1: `${
        userCase.confirmReadPetition
          ? `Rwyf wedi darllen y cais ${isDivorce ? 'am ysgariad' : 'i ddod â’n partneriaeth sifil i ben'}`
          : ''
      }`,
    },
    aboutApplication: {
      line1: `${
        userCase.disputeApplication
          ? userCase.disputeApplication === YesOrNo.YES
            ? `Rwyf eisiau herio’r ${isDivorce ? 'cais am ysgariad' : 'cais i ddod â’m partneriaeth sifil i ben'}`
            : `Parhau heb herio’r ${isDivorce ? 'cais am ysgariad' : 'cais i ddod â’m partneriaeth sifil i ben'}`
          : ''
      }`,
      line2: `${
        userCase.jurisdictionAgree
          ? userCase.jurisdictionAgree === YesOrNo.YES
            ? 'Ydw, rwy’n cytuno bod gan y llysoedd awdurdodaeth'
            : 'Nac ydw, nid wyf yn cytuno bod gan y llysoedd awdurdodaeth'
          : ''
      }`,
      line3: `${
        userCase.reasonCourtsOfEnglandAndWalesHaveNoJurisdiction &&
        userCase.jurisdictionAgree &&
        userCase.jurisdictionAgree === YesOrNo.NO
          ? userCase.reasonCourtsOfEnglandAndWalesHaveNoJurisdiction
          : ''
      }`,
      line4: `${
        userCase.reasonCourtsOfEnglandAndWalesHaveNoJurisdiction &&
        userCase.jurisdictionAgree &&
        userCase.jurisdictionAgree === YesOrNo.NO
          ? userCase.inWhichCountryIsYourLifeMainlyBased
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
      line1: `${userCase.applicant2LegalProceedings?.replace('Yes', 'Do').replace('No', 'Naddo')}`,
      line2: `${userCase.applicant2LegalProceedings === YesOrNo.YES ? userCase.applicant2LegalProceedingsDetails : ''}`,
    },
  },
  continueApplication: 'Parhau gyda’r cais',
  confirmBeforeSubmit: 'Cadarnhau cyn cyflwyno',
  iConfirm: 'Rwy’n cadarnhau:',
  confirmSotHint: `
    <ul class="govuk-list govuk-list--bullet govuk-!-margin-top-4">
    <li>Fi yw’r unigolyn a enwir fel yr atebydd yn y cais ${
      isDivorce ? 'am ysgariad' : 'i ddod â’ch partneriaeth sifil i ben'
    }</li>
    <li>Credaf fod y ffeithiau a nodir yn yr ymateb hwn yn wir.</li></ul>`,
  confirmationExplanation: `Mae’r datganiad cyntaf yn cadarnhau mai chi yw’r unigolyn y dylai fod yn ymateb i’r cais hwn ${
    isDivorce ? 'am ysgariad' : "i ddod â'ch partneriaeth sifil i ben"
  }. Yr ail yw eich datganiad gwirionedd.`,
  confirmApplicationIsTrueWarning:
    'Gellir dwyn achos dirmyg llys yn erbyn unrhyw un sy’n gwneud datganiad anwir, neu sy’n achosi i ddatganiad anwir gael ei wneud mewn dogfen a ddilysir gan ddatganiad gwirionedd heb gredu’n onest ei fod yn wir.',
  errors: {
    aosStatementOfTruth: {
      required:
        'Nid ydych wedi cadarnhau mai chi yw’r atebydd ac eich bod yn credu bod y ffeithiau yn wir. Mae angen ichi gadarnhau cyn parhau.',
    },
  },
});

export const form: FormContent = {
  fields: {
    aosStatementOfTruth: {
      type: 'checkboxes',
      label: l => l.confirmBeforeSubmit,
      labelSize: 'm',
      values: [
        {
          name: 'aosStatementOfTruth',
          label: l => l.iConfirm,
          hint: l => l.confirmSotHint,
          value: Checkbox.Checked,
          validator: isFieldFilledIn,
        },
      ],
    },
  },
  submit: {
    text: l => l.submit,
    classes: DISABLE_UPON_SUBMIT,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  const applicant2Url = urls.RESPONDENT;
  return {
    ...translations,
    isApplicationReadyToSubmit,
    form,
    applicant2Url,
  };
};
