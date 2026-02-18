import striptags from 'striptags';

import { Checkbox } from '../../../app/case/case';
import { YesOrNo } from '../../../app/case/definition';
import { getFilename } from '../../../app/case/formatter/uploaded-files';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import {
  checkBoxAnswers as detailsOtherProceedingsCheckBoxAnswers,
  radioButtonAnswers as detailsOtherProceedingsRadioAnswers,
} from '../../applicant1/details-other-proceedings/content';
import { radioButtonAnswers as englishOrWelshAnswers } from '../../applicant1/english-or-welsh/content';
import { checkBoxAnswers as howTheCourtWillContactYouAnswers } from '../../applicant1/how-the-court-will-contact-you/content';
import { radioButtonAnswers as otherCourtCasesAnswers } from '../../applicant1/other-court-cases/content';
import { checkBoxAnswers as reviewTheApplicationAnswers } from '../../applicant1/review-the-application/content';
import { DISABLE_UPON_SUBMIT } from '../../common/content.utils';
import { isApplicationReadyToSubmit } from '../../index';
import * as urls from '../../urls';
import { radioButtonAnswers as howDoYouWantToRespondAnswers } from '../how-do-you-want-to-respond/content';
import { radioButtonAnswers as intendToDelayAnswers } from '../intend-to-delay/content';
import { radioButtonAnswers as legalJurisdictionOfTheCourtsAnswers } from '../legal-jurisdiction-of-the-courts/content';

const stripTags = value => (typeof value === 'string' ? striptags(value) : value);

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
      line5: `Do you intend to ask the court to delay the ${isDivorce ? 'divorce' : 'dissolution'}
  until it is satisfied with your financial situation?`,
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
      line3: 'Have the proceedings been concluded?',
      uploadedFiles: 'Uploaded files',
    },
  },
  stepAnswers: {
    readApplication: {
      line1: `${stripTags(reviewTheApplicationAnswers(isDivorce).en[userCase.confirmReadPetition])}`,
    },
    aboutApplication: {
      line1: `${stripTags(howDoYouWantToRespondAnswers(isDivorce).en[userCase.disputeApplication])}`,
      line2: `${stripTags(legalJurisdictionOfTheCourtsAnswers.en[userCase.jurisdictionAgree])}`,
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
      line5: `${stripTags(intendToDelayAnswers.en[userCase.intendToDelay])}`,
    },
    contactYou: {
      line1: `${stripTags(howTheCourtWillContactYouAnswers(isDivorce).en[userCase.applicant2AgreeToReceiveEmails])}`,
      line2: `${userCase.applicant2PhoneNumber}`,
      line3: `${stripTags(englishOrWelshAnswers.en[userCase.applicant2EnglishOrWelsh])}`,
    },
    otherCourtCases: {
      line1: stripTags(otherCourtCasesAnswers.en[userCase.applicant2LegalProceedings]),
      line2: `${userCase.applicant2LegalProceedings === YesOrNo.YES ? userCase.applicant2LegalProceedingsDetails : ''}`,
      line3: `${
        userCase.applicant2LegalProceedings === YesOrNo.YES
          ? stripTags(detailsOtherProceedingsRadioAnswers.en[userCase.applicant2LegalProceedingsConcluded])
          : ''
      }`,
      uploadedFiles: `${userCase.applicant2LegalProceedingDocs?.map(item => getFilename(item.value))}`,
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
      line5: urls.INTEND_TO_DELAY,
    },
    contactYou: {
      line1: urls.HOW_THE_COURTS_WILL_CONTACT_YOU,
      line2: urls.HOW_THE_COURTS_WILL_CONTACT_YOU,
      line3: urls.ENGLISH_OR_WELSH,
    },
    otherCourtCases: {
      line1: urls.OTHER_COURT_CASES,
      line2: urls.DETAILS_OTHER_PROCEEDINGS,
      line3: urls.DETAILS_OTHER_PROCEEDINGS,
      uploadedFiles: urls.DETAILS_OTHER_PROCEEDINGS,
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
      line5: `A ydych yn bwriadu gofyn i’r llys ohirio’r ${isDivorce ? 'ysgariad' : 'diddymiad'}
  nes ei fod yn fodlon â’ch sefyllfa ariannol?`,
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
      line3: "A yw'r achos wedi'i gwblhau?",
      uploadedFiles: 'Ffeiliau sydd wedi cael eu llwytho',
    },
  },
  stepAnswers: {
    readApplication: {
      line1: `${stripTags(reviewTheApplicationAnswers(isDivorce).cy[userCase.confirmReadPetition])}`,
    },
    aboutApplication: {
      line1: `${stripTags(howDoYouWantToRespondAnswers(isDivorce).cy[userCase.disputeApplication])}`,
      line2: `${stripTags(legalJurisdictionOfTheCourtsAnswers.cy[userCase.jurisdictionAgree])}`,
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
      line5: `${stripTags(intendToDelayAnswers.cy[userCase.intendToDelay])}`,
    },
    contactYou: {
      line1: `${stripTags(howTheCourtWillContactYouAnswers(isDivorce).cy[userCase.applicant2AgreeToReceiveEmails])}`,
      line2: `${userCase.applicant2PhoneNumber}`,
      line3: `${stripTags(englishOrWelshAnswers.cy[userCase.applicant2EnglishOrWelsh])}`,
    },
    otherCourtCases: {
      line1: stripTags(otherCourtCasesAnswers.cy[userCase.applicant2LegalProceedings]),
      line2: `${userCase.applicant2LegalProceedings === YesOrNo.YES ? userCase.applicant2LegalProceedingsDetails : ''}`,
      line3: `${
        userCase.applicant2LegalProceedings === YesOrNo.YES
          ? stripTags(detailsOtherProceedingsRadioAnswers.cy[userCase.applicant2LegalProceedingsConcluded])
          : ''
      }`,
      uploadedFiles: `${userCase.applicant2LegalProceedingDocs?.map(item => getFilename(item.value))}`,
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
  const uploadedDocsFilenames = content.userCase.applicant2LegalProceedingDocs?.map(item => getFilename(item.value));
  const cannotUploadDocs =
    content.userCase.applicant2UnableToUploadEvidence === Checkbox.Checked ? YesOrNo.YES : YesOrNo.NO;
  const havingTroubleUploading = stripTags(
    detailsOtherProceedingsCheckBoxAnswers[content.language][
      content.userCase.applicant2UnableToUploadEvidence || Checkbox.Unchecked
    ]
  );
  return {
    ...translations,
    isApplicationReadyToSubmit,
    form,
    applicant2Url,
    uploadedDocsFilenames,
    cannotUploadDocs,
    havingTroubleUploading,
  };
};
