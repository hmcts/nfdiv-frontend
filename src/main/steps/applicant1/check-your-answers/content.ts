import config from 'config';

import { getFormattedCaseDate } from '../../../app/case/answers/formatDate';
import { Checkbox } from '../../../app/case/case';
import {
  Applicant2Represented,
  ApplicationType,
  ChangedNameHow,
  DocumentType,
  FinancialOrderFor,
  Gender,
  YesOrNo,
} from '../../../app/case/definition';
import { getFilename } from '../../../app/case/formatter/uploaded-files';
import { TranslationFn } from '../../../app/controller/GetController';
import { getFee } from '../../../app/fees/service/get-fee';
import { FormContent, FormFields, FormFieldsFn } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { connectionBulletPointsUserReads } from '../../../app/jurisdiction/bulletedPointsContent';
import { jurisdictionMoreDetailsContent } from '../../../app/jurisdiction/moreDetailsContent';
import { SupportedLanguages } from '../../../modules/i18n';
import { isApplicationReadyToSubmit } from '../../index';
import * as urls from '../../urls';

const moreDetailsComponent = (textAndTitleObject: {
  text: { heading: string; body: string }[];
  title: string;
}): string => {
  let detailsText = '';
  for (const section of textAndTitleObject.text) {
    detailsText += section.heading ? `<h3 class="govuk-heading-s govuk-!-margin-bottom-1">${section.heading}</h3>` : '';
    detailsText += section.body ? `<p class="govuk-body govuk-!-margin-bottom-2">${section.body}</p>` : '';
  }
  return `
  <details class="govuk-details summary" data-module="govuk-details">
    <summary class="govuk-details__summary">
      <span class="govuk-details__summary-text">
        ${textAndTitleObject.title || 'Find out more '}
      </span>
    </summary>
    <div class="govuk-details__text">
      ${detailsText}
    </div>
  </details>`;
};

const getEnHelpWithFeesMoreDetailsContent = (applicant1HelpPayingNeeded, isDivorce, checkTheirAnswersPartner) => {
  const title = 'Find out more about help with fees';
  const text = [
    {
      heading: '',
      body: `This ${isDivorce ? 'divorce application' : 'application to end your civil partnership'} costs ${getFee(
        config.get('fees.applicationFee')
      )}.
  You will not be asked to pay the fee. Your ${checkTheirAnswersPartner} will be asked to pay. ${
        applicant1HelpPayingNeeded === YesOrNo.YES
          ? 'They have said that they need help paying the fee. They can only use help if you apply too. That is why you were asked whether you needed help paying the fee.'
          : 'They have said that they do not need help paying the fee.'
      }`,
    },
  ];

  return moreDetailsComponent({ text, title });
};

const getCyHelpWithFeesMoreDetailsContent = (applicant1HelpPayingNeeded, isDivorce, checkTheirAnswersPartner) => {
  const title = 'Darganfyddwch fwy am help i dalu ffioedd';
  const text = [
    {
      heading: '',
      body: `Mae'r cais ${isDivorce ? 'am ysgariad' : "i ddod â'ch partneriaeth sifil i ben"} yn costio ${getFee(
        config.get('fees.applicationFee')
      )}.
  Ni ofynnir i chi dalu'r ffi. Gofynnir i'ch ${checkTheirAnswersPartner} dalu. ${
        applicant1HelpPayingNeeded === YesOrNo.YES
          ? "Maent wedi dweud bod angen help arnynt i dalu'r ffi. Gallant ond gael help i dalu ffioedd os byddwch chi yn gwneud cais hefyd. Dyna pam y gofynnwyd ichi a oedd angen help arnoch i dalu'r ffi."
          : "Maent wedi dweud nad oes angen help arnynt i dalu'r ffi."
      }`,
    },
  ];

  return moreDetailsComponent({ text, title });
};

const getEnOtherCourtCasesMoreDetailsContent = (isDivorce: boolean) => {
  const title = 'Find out more about other court proceedings';
  const text = [
    {
      heading: '',
      body: `The court only needs to know about court proceedings relating to your ${
        isDivorce ? 'marriage' : 'civil partnership'
      }, property or children. It does not need to know about other court proceedings.`,
    },
  ];
  return moreDetailsComponent({ text, title });
};

const getCyOtherCourtCasesMoreDetailsContent = (isDivorce: boolean) => {
  const title = 'Rhagor o wybodaeth am achosion llys eraill';
  const text = [
    {
      heading: '',
      body: `Nid oes ond angen i'r llys wybod am achosion llys sy'n ymwneud â'ch ${
        isDivorce ? 'priodas' : 'partneriaeth sifil'
      } eiddo neu blant. Nid oes angen iddo wybod am achosion llys eraill.`,
    },
  ];
  return moreDetailsComponent({ text, title });
};

const cannotUploadDocumentList = (
  isDivorce: boolean,
  isEnglish: boolean,
  marriage: string,
  civilPartnership: string,
  { inTheUk, applicant1CannotUploadDocuments }: { inTheUk: YesOrNo; applicant1CannotUploadDocuments: [] }
): string => {
  const union = isDivorce ? marriage : civilPartnership;
  const enDocumentText = {
    [DocumentType.MARRIAGE_CERTIFICATE]:
      inTheUk === YesOrNo.NO ? `My original foreign ${union} certificate` : `My original ${union} certificate`,
    [DocumentType.MARRIAGE_CERTIFICATE_TRANSLATION]: `A certified translation of my foreign ${union} certificate`,
    [DocumentType.NAME_CHANGE_EVIDENCE]: 'Proof that I changed my name',
  };

  const cyDocumentText = {
    [DocumentType.MARRIAGE_CERTIFICATE]:
      inTheUk === YesOrNo.NO ? `Fy nhystysgrif ${union} dramor wreiddiol` : `Fy nhystysgrif ${union} wreiddiol`,
    [DocumentType.MARRIAGE_CERTIFICATE_TRANSLATION]: `Cyfieithiad wedi'i ardystio o fy nhystysgrif ${union} dramor`,
    [DocumentType.NAME_CHANGE_EVIDENCE]: 'Prawf fy mod i wedi newid fy enw',
  };

  const documentText = isEnglish ? enDocumentText : cyDocumentText;

  return applicant1CannotUploadDocuments.map(document => documentText[document]).join('<br>');
};

const stripTags = value =>
  typeof value === 'string' ? value.replace(/(<([^>]+)>)/gi, '').replace(/<\/|<|>/g, '') : value;

const en = ({
  isDivorce,
  partner,
  userCase,
  isJointApplication,
  isApplicant2,
  checkTheirAnswersPartner,
  marriage,
  civilPartnership,
}) => ({
  titleSoFar: 'Check your answers so far',
  titleSubmit: 'Check your answers',
  line1: 'This is the information you provided. Check it to make sure it’s correct.',
  sectionTitles: {
    readApplication: `Confirm that you have read the ${
      isDivorce ? 'divorce application' : 'application to end your civil partnership'
    }`,
    aboutPartnership: `About your ${isDivorce ? 'marriage' : 'civil partnership'}`,
    helpWithFees: 'Help with fees',
    connectionsToEnglandWales: 'Your connections to England and Wales',
    aboutApplication: `About your ${isDivorce ? 'divorce' : 'civil partnership'}`,
    aboutPartners: `About you and your ${partner}`,
    aboutYouForApplicant2: 'About you',
    contactYou: 'How the court will contact you',
    contactThem: `How the court will contact your ${partner}`,
    otherCourtCases: 'Other court cases',
    dividingAssets: 'Dividing your money and property',
    documents: 'Your documents',
  },
  stepQuestions: {
    aboutPartnership: {
      line1: `${isDivorce ? 'Who are you applying to divorce' : 'Are you male or female'}?`,
      line2: 'Same sex couples?',
      line3: `Has your ${isDivorce ? 'marriage' : 'civil partnership'} broken down irretrievably (it cannot be saved)?`,
      line4: `When did you ${isDivorce ? 'get married' : 'form your civil partnership'}?`,
      line5: `Do you have your ${isDivorce ? 'marriage' : 'civil partnership'} certificate with you?`,
      line6: `How do you want to apply ${isDivorce ? 'for the divorce' : 'to end your civil partnership'}?`,
    },
    helpWithFees: {
      line1: `Help paying the ${isDivorce ? 'divorce fee' : 'fee to end your civil partnership'}`,
      line2: `Have you already applied for help with your ${isDivorce ? 'divorce ' : ''}fee?`,
    },
    connectionsToEnglandWales: {
      line1: `Did you ${isDivorce ? 'get married' : 'form your civil partnership'} in the UK?`,
      line2: `Is your original ${isDivorce ? 'marriage' : 'civil partnership'} certificate in English?`,
      line3: `Do you have a ‘certified translation’ of your ${
        isDivorce ? 'marriage' : 'civil partnership'
      } certificate?`,
      line4: `Enter the country where you ${isDivorce ? 'got married ' : 'formed your civil partnership'}`,
      line5: `Enter the place where you ${isDivorce ? 'got married ' : 'formed your civil partnership'}`,
      line6: 'Is your life mainly based in England and Wales?',
      line7: `Is your ${partner}'s life mainly based in England or Wales?`,
      line8: 'Have you been living in England or Wales for the last 12 months?',
      line9: 'Have you been living in England or Wales for the last 6 months?',
      line10: 'Is your domicile in England or Wales?',
      line11: `Is your ${partner}’s domicile in England or Wales?`,
      line12: 'Were you both last habitually resident in England or Wales and does one of you still live here?',
      line13: `Are the applicant and respondent registered as civil partners of each other in England or Wales or,
        in the case of a same-sex couple, married to each other under the law of England and Wales and it
        would be in the interests of justice for the court to assume jurisdiction in this case?`,
      line14: "How you're connected to England and Wales",
    },
    aboutPartners: {
      line1: `Copy your full name from the ${isDivorce ? 'marriage' : 'civil partnership'} certificate`,
      line2: `Copy your ${partner}'s full name from the ${isDivorce ? 'marriage' : 'civil partnership'} certificate`,
      line3: `Did you change your last name when you ${isDivorce ? 'got married' : 'formed your civil partnership'}?`,
      line4: `How did you change your last name when you ${
        isDivorce ? 'got married' : 'formed your civil partnership'
      }?`,
      line5: `Have you changed any part of your name since ${
        isDivorce ? 'getting married' : 'forming your civil partnership'
      }?`,
      line6: `How did you change your name since ${isDivorce ? 'getting married' : 'forming your civil partnership'}?`,
    },
    aboutYouForApplicant2: {
      line1: 'Your first name(s)',
      line2: 'Your middle name(s) (if you have one)',
      line3: 'Your last name(s)',
      line4: `Did you change your last name when you ${isDivorce ? 'got married' : 'formed your civil partnership'}?`,
      line5: `How did you change your last name when you ${
        isDivorce ? 'got married' : 'formed your civil partnership'
      }?`,
      line6: `Have you changed any part of your name since ${
        isDivorce ? 'getting married' : 'forming your civil partnership'
      }?`,
      line7: `How did you change your name since ${isDivorce ? 'getting married' : 'forming your civil partnership'}?`,
    },
    contactYou: {
      line1: 'Your first name(s)',
      line2: 'Your middle name(s) (if you have one)',
      line3: 'Your last name(s)',
      line4: 'By email',
      line5: 'By phone',
      line6: 'What language do you want to receive emails and documents in?',
      line7: `Do you need your contact details kept private from your ${partner}?`,
      line8: 'Your postal address',
    },
    contactThem: {
      line1: `Your ${partner}'s first name(s)`,
      line2: `Your ${partner}'s middle name(s) (if they have one)`,
      line3: `Your ${partner}'s last name(s)`,
      line4: `Does your ${partner} have a solicitor representing them?`,
      line5: `Your ${partner}'s solicitor's details`,
      line6: `Your ${partner}'s email address`,
      line7: `Do you have your ${partner}'s postal address?`,
      line8: `Your ${partner}'s postal address`,
    },
    otherCourtCases: {
      line1: `Are there, or have there ever been, any other court cases relating to this ${
        isDivorce ? 'marriage' : 'civil partnership'
      }?`,
      line2: 'Provide details about the other legal proceedings.',
    },
    dividingAssets: {
      line1: 'Do you want to apply for a financial order?',
      line2: 'Who is the financial order for?',
    },
    documents: {
      line1: 'Uploaded files',
      line2: 'I cannot upload some or all of my documents',
    },
  },
  stepAnswers: {
    aboutPartnership: {
      line1: `${isDivorce ? `My ${partner}` : userCase.gender === Gender.MALE ? 'Male' : 'Female'}`,
      line2: `We were ${userCase.sameSex === Checkbox.Unchecked ? 'not ' : ''}a same-sex couple when we formed our ${
        isDivorce ? 'marriage' : 'civil partnership'
      }`,
      line3: `${
        userCase.applicant1ScreenHasUnionBroken
          ? userCase.applicant1ScreenHasUnionBroken === YesOrNo.YES
            ? `I confirm my ${isDivorce ? 'marriage' : 'civil partnership'} has broken down irretrievably`
            : `My ${isDivorce ? 'marriage' : 'civil partnership'} has not broken down irretrievably`
          : ''
      }`,
      line4: `${userCase.relationshipDate ? `${getFormattedCaseDate(userCase.relationshipDate)}` : ''}`,
      line5: `${
        userCase.hasCertificate
          ? userCase.hasCertificate === YesOrNo.YES
            ? `Yes, I have my ${isDivorce ? 'marriage' : 'civil partnership'} certificate with me`
            : `No I do not have my ${isDivorce ? 'marriage' : 'civil partnership'} certificate with me`
          : ''
      }`,
      line6: `${
        userCase.applicationType
          ? isJointApplication
            ? `I want to apply jointly, with my ${partner}`
            : 'I want to apply on my own, as a sole applicant'
          : ''
      }`,
    },
    helpWithFees: {
      line1: userCase.applicant1HelpPayingNeeded
        ? `${
            userCase.applicant1HelpPayingNeeded === YesOrNo.YES
              ? 'I need help paying the fee'
              : 'I do not need help paying the fee'
          }
            ${
              isApplicant2
                ? getEnHelpWithFeesMoreDetailsContent(
                    userCase.applicant1HelpPayingNeeded,
                    isDivorce,
                    checkTheirAnswersPartner
                  )
                : ''
            }`
        : '',
      line2:
        !isApplicant2 &&
        userCase.applicant1AlreadyAppliedForHelpPaying &&
        userCase.applicant1AlreadyAppliedForHelpPaying === YesOrNo.YES
          ? `Yes <br> ${stripTags(userCase.applicant1HelpWithFeesRefNo)}`
          : '',
    },
    connectionsToEnglandWales: {
      line1: stripTags(userCase.inTheUk),
      line2: stripTags(userCase.certificateInEnglish),
      line3: stripTags(userCase.certifiedTranslation),
      line4: stripTags(userCase.ceremonyCountry),
      line5: stripTags(userCase.ceremonyPlace),
      line6: stripTags(userCase.applicant1LifeBasedInEnglandAndWales),
      line7: stripTags(userCase.applicant2LifeBasedInEnglandAndWales),
      line8: stripTags(userCase.applicant1LivingInEnglandWalesTwelveMonths),
      line9: stripTags(userCase.applicant1LivingInEnglandWalesSixMonths),
      line10: stripTags(userCase.applicant1DomicileInEnglandWales),
      line11: stripTags(userCase.applicant2DomicileInEnglandWales),
      line12: stripTags(userCase.bothLastHabituallyResident),
      line13: stripTags(userCase.jurisdictionResidualEligible),
      line14:
        userCase.connections && userCase.connections?.length
          ? `Your answers indicate that you can apply in England and Wales because: ${
              connectionBulletPointsUserReads(userCase.connections, partner, isDivorce, isJointApplication, true) +
              moreDetailsComponent(jurisdictionMoreDetailsContent(userCase.connections, true, isDivorce, partner))
            }`
          : '',
    },
    aboutPartners: {
      line1: `${stripTags(userCase.applicant1FullNameOnCertificate)}`,
      line2: `${stripTags(userCase.applicant2FullNameOnCertificate)}`,
      line3: `${stripTags(userCase.applicant1LastNameChangedWhenMarried)}`,
      line4: `${
        userCase.applicant1LastNameChangedWhenMarriedMethod?.length
          ? userCase.applicant1LastNameChangedWhenMarriedMethod
              .join(' / ')
              .replace(ChangedNameHow.OTHER, 'Another way')
              .replace(ChangedNameHow.DEED_POLL, 'Deed poll')
              .replace(
                ChangedNameHow.MARRIAGE_CERTIFICATE,
                `${isDivorce ? 'Marriage' : 'Civil partnership'} certificate`
              )
          : ''
      }`,
      line5: `${stripTags(userCase.applicant1NameDifferentToMarriageCertificate)}`,
      line6: `${
        userCase.applicant1NameDifferentToMarriageCertificateMethod?.length
          ? userCase.applicant1NameDifferentToMarriageCertificateMethod
              .join(' / ')
              .replace(ChangedNameHow.OTHER, 'Another way')
              .replace(ChangedNameHow.DEED_POLL, 'Deed poll')
              .replace(
                ChangedNameHow.MARRIAGE_CERTIFICATE,
                `${isDivorce ? 'Marriage' : 'Civil partnership'} certificate`
              )
          : ''
      }`,
    },
    contactYou: {
      line1: `${stripTags(userCase.applicant1FirstNames)}`,
      line2: `${stripTags(userCase.applicant1MiddleNames)}`,
      line3: `${stripTags(userCase.applicant1LastNames)}`,
      line4: `${
        userCase.applicant1AgreeToReceiveEmails
          ? `I agree that the ${
              isDivorce ? 'divorce' : 'civil partnership'
            } service can send me notifications and serve (deliver) court documents to me by email.`
          : ''
      }`,
      line5: `${
        userCase.applicant1AddressPrivate === YesOrNo.YES && isApplicant2
          ? ''
          : stripTags(userCase.applicant1PhoneNumber)
      }`,
      line6: `${
        userCase.applicant1EnglishOrWelsh
          ? userCase.applicant1EnglishOrWelsh.charAt(0).toUpperCase() + userCase.applicant1EnglishOrWelsh.slice(1)
          : ''
      }`,
      line7: `${
        !userCase.applicant1AddressPrivate || (userCase.applicant1AddressPrivate === YesOrNo.YES && isApplicant2)
          ? ''
          : userCase.applicant1AddressPrivate === YesOrNo.YES
          ? 'Keep my contact details private'
          : 'I do not need my contact details kept private'
      }`,
      line8: `${
        userCase.applicant1AddressPrivate === YesOrNo.YES && isApplicant2
          ? ''
          : [
              stripTags(userCase.applicant1Address1),
              stripTags(userCase.applicant1Address2),
              stripTags(userCase.applicant1Address3),
              stripTags(userCase.applicant1AddressTown),
              stripTags(userCase.applicant1AddressCounty),
              stripTags(userCase.applicant1AddressPostcode),
              stripTags(userCase.applicant1AddressCountry),
            ]
              .filter(Boolean)
              .join('<br>')
      }`,
    },
    contactThem: {
      line1: `${isJointApplication ? '' : stripTags(userCase.applicant2FirstNames)}`,
      line2: `${isJointApplication ? '' : stripTags(userCase.applicant2MiddleNames)}`,
      line3: `${isJointApplication ? '' : stripTags(userCase.applicant2LastNames)}`,
      line4: `${
        isJointApplication
          ? ''
          : userCase.applicant1IsApplicant2Represented?.replace(Applicant2Represented.NOT_SURE, "I'm not sure")
      }`,
      line5: `${[
        stripTags(userCase.applicant2SolicitorName),
        stripTags(userCase.applicant2SolicitorEmail),
        stripTags(userCase.applicant2SolicitorFirmName),
        stripTags(userCase.applicant2SolicitorAddress1),
        stripTags(userCase.applicant2SolicitorAddress2),
        stripTags(userCase.applicant2SolicitorAddress3),
        stripTags(userCase.applicant2SolicitorAddressTown),
        stripTags(userCase.applicant2SolicitorAddressCounty),
        stripTags(userCase.applicant2SolicitorAddressPostcode),
        stripTags(userCase.applicant2SolicitorAddressCountry),
      ]
        .filter(Boolean)
        .join('<br>')}`,
      line6: `${stripTags(userCase.applicant2EmailAddress)}`,
      line7: `${isJointApplication ? '' : stripTags(userCase.applicant1KnowsApplicant2Address)}`,
      line8: `${
        isJointApplication
          ? ''
          : [
              stripTags(userCase.applicant2Address1),
              stripTags(userCase.applicant2Address2),
              stripTags(userCase.applicant2Address3),
              stripTags(userCase.applicant2AddressTown),
              stripTags(userCase.applicant2AddressCounty),
              stripTags(userCase.applicant2AddressPostcode),
              stripTags(userCase.applicant2AddressCountry),
            ]
              .filter(Boolean)
              .join('<br>')
      }`,
    },
    otherCourtCases: {
      line1: userCase.applicant1LegalProceedings
        ? `${userCase.applicant1LegalProceedings} ${
            isApplicant2 ? getEnOtherCourtCasesMoreDetailsContent(isDivorce) : ''
          }`
        : '',
      line2:
        userCase.applicant1LegalProceedings === YesOrNo.YES
          ? stripTags(userCase.applicant1LegalProceedingsDetails)
          : '',
    },
    dividingAssets: {
      line1: `${
        userCase.applicant1ApplyForFinancialOrder
          ? userCase.applicant1ApplyForFinancialOrder === YesOrNo.YES
            ? 'Yes, I want to apply for a financial order'
            : 'No, I do not want to apply for a financial order'
          : ''
      }`,
      line2: `${
        userCase.applicant1WhoIsFinancialOrderFor
          ? userCase.applicant1WhoIsFinancialOrderFor
              ?.join(' and ')
              .replace(FinancialOrderFor.APPLICANT, 'Myself')
              .replace(FinancialOrderFor.CHILDREN, 'The children')
          : ''
      }`,
    },
    documents: {
      line1: `${
        userCase.applicant1DocumentsUploaded?.length
          ? userCase.applicant1DocumentsUploaded.reduce((acc, curr) => `${acc}${getFilename(curr.value)}\n`, '')
          : ''
      }`,
      line2: `${
        userCase.applicant1CannotUploadDocuments && userCase.applicant1CannotUploadDocuments.length
          ? cannotUploadDocumentList(isDivorce, true, marriage, civilPartnership, userCase)
          : ''
      }`,
    },
  },
  stepLinks: {
    aboutPartnership: {
      line1: urls.YOUR_DETAILS_URL,
      line2: urls.YOUR_DETAILS_URL,
      line3: urls.HAS_RELATIONSHIP_BROKEN_URL,
      line4: urls.RELATIONSHIP_DATE_URL,
      line5: urls.CERTIFICATE_URL,
      line6: urls.HOW_DO_YOU_WANT_TO_APPLY,
    },
    helpWithFees: {
      line1: urls.HELP_WITH_YOUR_FEE_URL,
      line2: urls.HELP_PAYING_HAVE_YOU_APPLIED,
    },
    connectionsToEnglandWales: {
      line1: urls.IN_THE_UK,
      line2: urls.CERTIFICATE_IN_ENGLISH,
      line3: urls.CERTIFIED_TRANSLATION,
      line4: urls.COUNTRY_AND_PLACE,
      line5: urls.COUNTRY_AND_PLACE,
      line6: urls.WHERE_YOUR_LIVES_ARE_BASED_URL,
      line7: urls.WHERE_YOUR_LIVES_ARE_BASED_URL,
      line8: urls.JURISDICTION_LAST_TWELVE_MONTHS,
      line9: urls.LIVING_ENGLAND_WALES_SIX_MONTHS,
      line10: urls.JURISDICTION_DOMICILE,
      line11: urls.JURISDICTION_DOMICILE,
      line12: urls.HABITUALLY_RESIDENT_ENGLAND_WALES,
      line13: urls.RESIDUAL_JURISDICTION,
      line14: urls.CHECK_JURISDICTION,
    },
    aboutPartners: {
      line1: urls.CERTIFICATE_NAME,
      line2: urls.CERTIFICATE_NAME,
      line3: urls.CHANGES_TO_YOUR_NAME_URL,
      line4: urls.CHANGES_TO_YOUR_NAME_URL,
      line5: urls.CHANGES_TO_YOUR_NAME_URL,
      line6: urls.CHANGES_TO_YOUR_NAME_URL,
    },
    aboutYouForApplicant2: {
      line1: isJointApplication ? urls.ENTER_YOUR_NAMES : urls.ENTER_YOUR_NAME,
      line2: isJointApplication ? urls.ENTER_YOUR_NAMES : urls.ENTER_YOUR_NAME,
      line3: isJointApplication ? urls.ENTER_YOUR_NAMES : urls.ENTER_YOUR_NAME,
      line4: urls.CHANGES_TO_YOUR_NAME_URL,
      line5: urls.CHANGES_TO_YOUR_NAME_URL,
      line6: urls.CHANGES_TO_YOUR_NAME_URL,
      line7: urls.CHANGES_TO_YOUR_NAME_URL,
    },
    contactYou: {
      line1: isJointApplication ? urls.ENTER_YOUR_NAMES : urls.ENTER_YOUR_NAME,
      line2: isJointApplication ? urls.ENTER_YOUR_NAMES : urls.ENTER_YOUR_NAME,
      line3: isJointApplication ? urls.ENTER_YOUR_NAMES : urls.ENTER_YOUR_NAME,
      line4: urls.HOW_THE_COURTS_WILL_CONTACT_YOU,
      line5: urls.HOW_THE_COURTS_WILL_CONTACT_YOU,
      line6: urls.ENGLISH_OR_WELSH,
      line7: urls.ADDRESS_PRIVATE,
      line8: urls.ENTER_YOUR_ADDRESS,
    },
    contactThem: {
      line1: urls.THEIR_NAME,
      line2: urls.THEIR_NAME,
      line3: urls.THEIR_NAME,
      line4: urls.DO_THEY_HAVE_A_SOLICITOR,
      line5: urls.ENTER_SOLICITOR_DETAILS,
      line6: urls.THEIR_EMAIL_ADDRESS,
      line7: urls.DO_YOU_HAVE_ADDRESS,
      line8: urls.ENTER_THEIR_ADDRESS,
    },
    otherCourtCases: {
      line1: urls.OTHER_COURT_CASES,
      line2: urls.DETAILS_OTHER_PROCEEDINGS,
    },
    dividingAssets: {
      line1: urls.APPLY_FINANCIAL_ORDER,
      line2: urls.APPLY_FINANCIAL_ORDER,
    },
    documents: {
      line1: urls.UPLOAD_YOUR_DOCUMENTS,
      line2: urls.UPLOAD_YOUR_DOCUMENTS,
    },
  },
  change: 'Change',
  continueApplication: 'Continue',
  confirm: `Confirm before ${stripTags(userCase.applicant1HelpWithFeesRefNo) ? 'submitting' : 'continuing'}`,
  jointApplicantReview: `Your answers will be sent to your ${partner} to review. When they have reviewed and provided some of their own answers, the completed application will come back to you to review one final time before submitting.`,
  confirmPrayer: `I confirm that I’m applying to the court to ${
    isDivorce ? 'dissolve my marriage (get a divorce)' : 'end my civil partnership'
  }
    ${
      userCase.applicant1ApplyForFinancialOrder === YesOrNo.YES
        ? 'and make financial orders to decide how our money and property will be split'
        : ''
    }.`,
  confirmPrayerHint:
    '<br><p class="govuk-body govuk-!-margin-bottom-0">This confirms what you are asking the court to do. It’s known as ‘the prayer’.</p>',
  confirmApplicationIsTrue: 'I believe that the facts stated in this application are true',
  confirmApplicationIsTrueHint:
    '<p class="govuk-body govuk-!-margin-top-4 govuk-!-margin-bottom-0">This confirms that the information you are submitting is true and accurate, to the best of your knowledge. It’s known as your ‘statement of truth’.</p>',
  confirmApplicationIsTrueWarning:
    'Proceedings for contempt of court may be brought against anyone who makes, or causes to be made, a false statement verified by a statement of truth without an honest belief in its truth.',
  continue: isJointApplication
    ? 'Send for review'
    : stripTags(userCase.applicant1HelpWithFeesRefNo)
    ? 'Submit application'
    : 'Continue to payment',
  errors: isJointApplication
    ? undefined
    : {
        applicant1IConfirmPrayer: {
          required:
            'You have not confirmed what you are applying to the court to do. You need to confirm before continuing.',
        },
        applicant1StatementOfTruth: {
          required:
            'You have not confirmed that you believe the facts in the application are true. You need to confirm before continuing.',
        },
      },
});

// @TODO translations
const cy: typeof en = ({
  isDivorce,
  partner,
  userCase,
  isJointApplication,
  isApplicant2,
  checkTheirAnswersPartner,
  marriage,
  civilPartnership,
}) => ({
  ...en({
    isDivorce,
    partner,
    userCase,
    isJointApplication,
    isApplicant2,
    checkTheirAnswersPartner,
    marriage,
    civilPartnership,
  }),
  titleSoFar: 'Gwiriwch eich atebion hyd yma',
  titleSubmit: 'Gwiriwch eich atebion',
  line1: "Dyma'r wybodaeth a ddarparwyd gennych. Gwnewch yn siŵr ei bod yn gywir.",
  sectionTitles: {
    readApplication: `Cadarnhewch eich bod wedi cael y ${
      isDivorce ? 'cais am ysgariad' : 'cais i ddod a’ch partneriaeth sifil i ben'
    }`,
    aboutPartnership: `Ynghylch eich ${isDivorce ? 'priodas' : 'partneriaeth sifil'}`,
    helpWithFees: 'Help i dalu ffioedd',
    connectionsToEnglandWales: 'Eich cysylltiadau â Chymru a Lloegr',
    aboutApplication: `Ynghylch eich ${isDivorce ? 'ysgariad' : 'partneriaeth sifil'}`,
    aboutPartners: `Amdanoch chi a’ch ${partner}`,
    aboutYouForApplicant2: 'Amdanoch Chi',
    contactYou: 'Sut bydd y llys yn cysylltu â chi', // f or be todo
    contactThem: `Sut fydd y llys yn cysylltu â’ch ${partner}`,
    otherCourtCases: 'Achosion llys eraill',
    dividingAssets: 'Rhannu eich arian a’ch eiddo',
    documents: 'Eich dogfennau',
  },
  stepQuestions: {
    aboutPartnership: {
      line1: `${isDivorce ? 'Pwy ydych chi eisiau ei (h)ysgaru' : "Ydych chi'n wryw ynteu'n fenyw"}?`,
      line2: 'Cyplau o’r un rhyw?',
      line3: `A yw eich ${isDivorce ? 'priodas' : 'perthynas'} wedi chwalu'n gyfan gwbl (ni ellir ei hachub)?`,
      line4: `Pryd wnaethoch chi ${isDivorce ? 'briodi' : 'ffurfio eich partneriaeth sifil'}?`,
      line5: `A yw eich ${isDivorce ? 'tystysgrif priodas' : 'tystysgrif partneriaeth sifil'} gennych yn awr?`,
      line6: `Sut ydych chi eisiau gwneud cais ${isDivorce ? 'am ysgariad' : "i ddod â'ch partneriaeth sifil i ben"}?`,
    },
    helpWithFees: {
      line1: `A oes angen help arnoch i dalu'r ffi am ${
        isDivorce ? 'eich ysgariad?' : "ddod â'ch partneriaeth sifil i ben?"
      }`,
      line2: `Ydych chi eisoes wedi gwneud cais am help i dalu ${isDivorce ? 'ffi eich ysgariad' : 'eich ffi'}?`,
    },
    connectionsToEnglandWales: {
      line1: `A wnaethoch chi ${isDivorce ? 'briodi' : 'ffurfio eich partneriaeth sifil'} yn y DU?`,
      line2: `A yw eich tystysgrif ${isDivorce ? 'priodas' : 'partneriaeth sifil'} wreiddiol yn Saesneg?`,
      line3: `A oes gennych 'gyfieithiad ardystiedig' o'ch tystysgrif ${isDivorce ? 'priodas' : 'partneriaeth sifil'}?`,
      line4: `Nodwch enw'r wlad lle y gwnaethoch ${isDivorce ? 'briodi' : 'ffurfio eich partneriaeth sifil'}`,
      line5: `Nodwch enw'r lle y gwnaethoch ${isDivorce ? 'briodi' : 'ffurfio eich partneriaeth sifil'}`,
      line6: 'A yw eich bywyd gan amlaf yng Nghymru neu Loegr?',
      line7: `A yw bywyd eich ${partner} gan amlaf yng Nghymru neu Loegr?`,
      line8: 'Ydych chi wedi bod yn byw yng Nghymru neu Loegr am y 12 mis diwethaf?',
      line9: 'A ydych wedi bod yn byw yng Nghymru neu Loegr am y 6 mis diwethaf?',
      line10: 'A yw eich domisil yng Nghymru neu Loegr?',
      line11: `A yw domisil eich ${partner} yng Nghymru neu Loegr?`,
      line12:
        "A oedd y ddau ohonoch yn preswylio'n arferol ddiwethaf yng Nghymru neu Loegr ac a yw un ohonoch yn dal i fyw yma?",
      line13: `A yw’r ceisydd a’r atebydd wedi’u cofrestru fel partneriaid sifil i’w gilydd yng Nghymru neu Loegr neu,
        yn achos cwpl o’r un rhyw, yn briod â’i gilydd o dan gyfraith Cymru a Lloegr a byddai er budd cyfiawnder i’r
        llys gymryd awdurdodaeth yn yr achos hwn?`,
      line14: "Sut rydych wedi'ch cysylltu â Chymru a Lloegr",
    },
    aboutPartners: {
      line1: `Copïwch eich enw yn llawn fel y mae'n ymddangos ar y dystysgrif ${
        isDivorce ? 'priodas' : 'partneriaeth sifil'
      }`,
      line2: `Copïwch enw llawn eich ${partner} fel y mae'n ymddangos ar y dystysgrif ${
        isDivorce ? 'priodas' : 'partneriaeth sifil'
      }`,
      line3: `Wnaethoch chi newid eich cyfenw pan wnaethoch chi ${
        isDivorce ? 'briodi' : 'ffurfio eich partneriaeth sifil'
      }?`,
      line4: `How did you change your last name when you ${
        isDivorce ? 'got married' : 'formed your civil partnership'
      }?`,
      line5: `A ydych wedi newid eich enw ers i chi ${isDivorce ? 'briodi' : 'ffurfio eich partneriaeth sifil'}?`,
      line6: `How did you change your name since ${isDivorce ? 'getting married' : 'forming your civil partnership'}?`,
    },
    aboutYouForApplicant2: {
      line1: 'Eich enw(au) cyntaf',
      line2: 'Eich enw(au) canol (os oes gennych un)',
      line3: 'Eich cyfenw(au)',
      line4: `A wnaethoch chi newid eich cyfenw pan wnaethoch ${
        isDivorce ? 'chi briodi' : 'ffurfio eich partneriaeth sifil'
      }?`,
      line5: `How did you change your last name when you ${
        isDivorce ? 'got married' : 'formed your civil partnership'
      }?`,
      line6: `A ydych wedi newid unrhyw ran o'ch enw ers ${isDivorce ? 'priodi' : 'ffurfio eich partneriaeth sifil'}?`,
      line7: `How did you change your name since ${isDivorce ? 'getting married' : 'forming your civil partnership'}?`,
    },
    contactYou: {
      line1: 'Eich enw(au) cyntaf',
      line2: 'Eich enw(au) canol (os oes gennych un)',
      line3: 'Eich cyfenw(au)',
      line4: 'Trwy e-bost',
      line5: 'Dros y ffôn',
      line6: 'Ym mha iaith hoffech chi gael negeseuon e-bost a dogfennau?',
      line7: `A oes arnoch angen cadw eich manylion cyswllt yn breifat oddi wrth eich ${partner}?`,
      line8: 'Eich cyfeiriad post',
    },
    contactThem: {
      line1: `Enw(au) cyntaf eich ${partner}`,
      line2: `Enw(au) canol eich ${partner} (if they have one)`,
      line3: `Cyfenw(au) eich ${partner}`,
      line4: `A oes gan eich ${partner} gyfreithiwr sy'n eu cynrychioli?`,
      line5: `Manylion cyfreithiwr eich ${partner}`,
      line6: `Cyfeiriad e-bost eich ${partner}`,
      line7: `A oes gennych gyfeiriad post eich ${partner}?`,
      line8: `Cyfeiriad post eich ${partner}`,
    },
    otherCourtCases: {
      line1: `A oes, neu a oes wedi bod erioed, unrhyw achosion cyfreithiol eraill yng nghyswllt eich ${
        isDivorce ? 'priodas' : 'partneriaeth sifil'
      }, eich eiddo, neu'ch plant?`,
      line2: 'Rhowch fanylion am yr achosion cyfreithiol eraill.',
    },
    dividingAssets: {
      line1: 'Ydych chi eisiau gwneud cais am orchymyn ariannol?',
      line2: 'Ar gyfer pwy mae’r gorchymyn ariannol?',
    },
    documents: {
      line1: "Ffeiliau wedi'u huwchlwytho",
      line2: 'Ni allaf uwchlwytho rhai neu bob un o fy nogfennau',
    },
  },
  stepAnswers: {
    aboutPartnership: {
      line1: `${isDivorce ? `Fy n${partner}` : userCase.gender === Gender.MALE ? 'Gwryw' : 'Benyw'}`,
      line2: `${
        userCase.sameSex === Checkbox.Unchecked
          ? `Doedden ni ddim yn gwpl o’r un rhyw pan wnaethom ni ${
              isDivorce ? 'briodi' : 'ffurfio ein partneriaeth sifil'
            }.`
          : `Roeddem yn gwpl o’r un rhyw pan wnaethom ni ${isDivorce ? 'briodi' : 'ffurfio eich partneriaeth sifil'}`
      }`,
      line3: `${
        userCase.applicant1ScreenHasUnionBroken
          ? userCase.applicant1ScreenHasUnionBroken === YesOrNo.YES
            ? `Ydy, mae fy ${isDivorce ? 'mhriodas' : 'mherthynas'} wedi chwalu'n gyfan gwbl`
            : `Nac ydy, nid yw fy  ${isDivorce ? 'mhriodas' : 'mherthynas'} wedi chwalu'n gyfan gwbl`
          : ''
      }`,
      line4: userCase.relationshipDate
        ? `${getFormattedCaseDate(userCase.relationshipDate, SupportedLanguages.Cy)}`
        : '',
      line5: `${
        userCase.hasCertificate
          ? userCase.hasCertificate === YesOrNo.YES
            ? `Oes, mae gen i fy ${isDivorce ? 'nhystysgrif priodas' : 'tystysgrif partneriaeth sifil'}`
            : `Na, nid oes gennyf ${isDivorce ? 'dystysgrif priodas' : 'tystysgrif partneriaeth sifil'}`
          : ''
      }`,
      line6: `${
        userCase.applicationType
          ? isJointApplication
            ? `Rwyf eisiau gwneud cais ar y cyd, gyda fy ${partner}`
            : 'Rwyf eisiau gwneud cais ar fy mhen fy hun, fel unig ymgeisydd'
          : ''
      }`,
    },
    helpWithFees: {
      line1: `${
        userCase.applicant1HelpPayingNeeded
          ? `${
              userCase.applicant1HelpPayingNeeded === YesOrNo.YES
                ? "Mae angen help arnaf i dalu'r ffi"
                : "Nid oes angen help arnaf i dalu'r ffi"
            }
            ${
              isApplicant2
                ? getCyHelpWithFeesMoreDetailsContent(
                    userCase.applicant1HelpPayingNeeded,
                    isDivorce,
                    checkTheirAnswersPartner
                  )
                : ''
            }`
          : ''
      }`,
      line2: userCase.applicant1AlreadyAppliedForHelpPaying
        ? userCase.applicant1AlreadyAppliedForHelpPaying === YesOrNo.YES
          ? `Do <br> ${userCase.applicant1HelpWithFeesRefNo ? userCase.applicant1HelpWithFeesRefNo : ''}`
          : ''
        : '',
    },
    connectionsToEnglandWales: {
      line1: userCase.inTheUk?.replace('Yes', 'Do').replace('No', 'Naddo'),
      line2: userCase.certificateInEnglish?.replace('Yes', 'Do').replace('No', 'Naddo'),
      line3: userCase.certifiedTranslation?.replace('Yes', 'Do').replace('No', 'Naddo'),
      line4: stripTags(userCase.ceremonyCountry),
      line5: stripTags(userCase.ceremonyPlace),
      line6: userCase.applicant1LifeBasedInEnglandAndWales?.replace('Yes', 'Do').replace('No', 'Naddo'),
      line7: userCase.applicant2LifeBasedInEnglandAndWales?.replace('Yes', 'Do').replace('No', 'Naddo'),
      line8: userCase.applicant1LivingInEnglandWalesTwelveMonths?.replace('Yes', 'Do').replace('No', 'Naddo'),
      line9: userCase.applicant1LivingInEnglandWalesSixMonths?.replace('Yes', 'Do').replace('No', 'Naddo'),
      line10: userCase.applicant1DomicileInEnglandWales?.replace('Yes', 'Do').replace('No', 'Naddo'),
      line11: userCase.applicant2DomicileInEnglandWales?.replace('Yes', 'Do').replace('No', 'Naddo'),
      line12: userCase.bothLastHabituallyResident?.replace('Yes', 'Do').replace('No', 'Naddo'),
      line13: userCase.jurisdictionResidualEligible?.replace('Yes', 'Do').replace('No', 'Naddo'),
      line14:
        userCase.connections && userCase.connections?.length
          ? `Mae eich atebion yn dangos y gallwch wneud cais yng Nghymru a Lloegr oherwydd: ${
              connectionBulletPointsUserReads(userCase.connections, partner, isDivorce, isJointApplication, false) +
              moreDetailsComponent(jurisdictionMoreDetailsContent(userCase.connections, false, isDivorce, partner))
            }`
          : '',
    },
    aboutPartners: {
      line1: `${stripTags(userCase.applicant1FullNameOnCertificate)}`,
      line2: `${stripTags(userCase.applicant2FullNameOnCertificate)}`,
      line3: `${stripTags(userCase.applicant1LastNameChangedWhenMarried?.replace('Yes', 'Do').replace('No', 'Naddo'))}`,
      line4: `${
        userCase.applicant1LastNameChangedWhenMarriedMethod?.length
          ? userCase.applicant1LastNameChangedWhenMarriedMethod
              .join(' / ')
              .replace(ChangedNameHow.OTHER, 'Ffordd arall')
              .replace(ChangedNameHow.DEED_POLL, 'Weithred newid enw')
              .replace(
                ChangedNameHow.MARRIAGE_CERTIFICATE,
                `Tystysgrif ${isDivorce ? 'priodas' : 'partneriaeth sifil'}`
              )
          : ''
      }`,
      line5: `${stripTags(
        userCase.applicant1NameDifferentToMarriageCertificate?.replace('Yes', 'Do').replace('No', 'Naddo')
      )}`,
      line6: `${
        userCase.applicant1NameDifferentToMarriageCertificateMethod?.length
          ? userCase.applicant1NameDifferentToMarriageCertificateMethod
              .join(' / ')
              .replace(ChangedNameHow.OTHER, 'Ffordd arall')
              .replace(ChangedNameHow.DEED_POLL, 'Weithred newid enw')
              .replace(
                ChangedNameHow.MARRIAGE_CERTIFICATE,
                `Tystysgrif ${isDivorce ? 'priodas' : 'partneriaeth sifil'}`
              )
          : ''
      }`,
    },
    contactYou: {
      line1: `${stripTags(userCase.applicant1FirstNames)}`,
      line2: `${stripTags(userCase.applicant1MiddleNames)}`,
      line3: `${stripTags(userCase.applicant1LastNames)}`,
      line4: `${
        userCase.applicant1AgreeToReceiveEmails
          ? `Rwy'n cytuno y gall y ${
              isDivorce ? 'gwasanaeth ysgaru' : 'gwasanaeth diweddu partneriaeth sifil'
            } anfon hysbysiadau ataf a chyflwyno (danfon) dogfennau llys ataf drwy e-bost.`
          : ''
      }`,
      line5: `${
        userCase.applicant1AddressPrivate === YesOrNo.YES && isApplicant2
          ? ''
          : stripTags(userCase.applicant1PhoneNumber)
      }`,
      line6: `${
        userCase.applicant1EnglishOrWelsh
          ? userCase.applicant1EnglishOrWelsh.charAt(0).toUpperCase() + userCase.applicant1EnglishOrWelsh.slice(1)
          : ''
      }`,
      line7: `${
        !userCase.applicant1AddressPrivate || (userCase.applicant1AddressPrivate === YesOrNo.YES && isApplicant2)
          ? ''
          : userCase.applicant1AddressPrivate === YesOrNo.YES
          ? 'Cadwch fy manylion cyswllt yn breifat'
          : 'Nid oes arnaf angen cadw fy manylion cyswllt yn breifat'
      }`,
      line8: `${
        userCase.applicant1AddressPrivate === YesOrNo.YES && isApplicant2
          ? ''
          : [
              stripTags(userCase.applicant1Address1),
              stripTags(userCase.applicant1Address2),
              stripTags(userCase.applicant1Address3),
              stripTags(userCase.applicant1AddressTown),
              stripTags(userCase.applicant1AddressCounty),
              stripTags(userCase.applicant1AddressPostcode),
              stripTags(userCase.applicant1AddressCountry),
            ]
              .filter(Boolean)
              .join('<br>')
      }`,
    },
    contactThem: {
      line1: `${isJointApplication ? '' : stripTags(userCase.applicant2FirstNames)}`,
      line2: `${isJointApplication ? '' : stripTags(userCase.applicant2MiddleNames)}`,
      line3: `${isJointApplication ? '' : stripTags(userCase.applicant2LastNames)}`,
      line4: `${
        isJointApplication
          ? ''
          : userCase.applicant1IsApplicant2Represented
              ?.replace('Yes', 'Oes')
              .replace('No', 'Nac oes')
              .replace(Applicant2Represented.NOT_SURE, 'Dw i ddim yn siŵr')
      }`,
      line5: `${[
        stripTags(userCase.applicant2SolicitorName),
        stripTags(userCase.applicant2SolicitorEmail),
        stripTags(userCase.applicant2SolicitorFirmName),
        stripTags(userCase.applicant2SolicitorAddress1),
        stripTags(userCase.applicant2SolicitorAddress2),
        stripTags(userCase.applicant2SolicitorAddress3),
        stripTags(userCase.applicant2SolicitorAddressTown),
        stripTags(userCase.applicant2SolicitorAddressCounty),
        stripTags(userCase.applicant2SolicitorAddressPostcode),
        stripTags(userCase.applicant2SolicitorAddressCountry),
      ]
        .filter(Boolean)
        .join('<br>')}`,
      line6: `${stripTags(userCase.applicant2EmailAddress)}`,
      line7: `${
        isJointApplication
          ? ''
          : userCase.applicant1KnowsApplicant2Address?.replace('Yes', 'Oes').replace('No', 'Nac oes')
      }`,
      line8: `${
        isJointApplication
          ? ''
          : [
              stripTags(userCase.applicant2Address1),
              stripTags(userCase.applicant2Address2),
              stripTags(userCase.applicant2Address3),
              stripTags(userCase.applicant2AddressTown),
              stripTags(userCase.applicant2AddressCounty),
              stripTags(userCase.applicant2AddressPostcode),
              stripTags(userCase.applicant2AddressCountry),
            ]
              .filter(Boolean)
              .join('<br>')
      }`,
    },
    otherCourtCases: {
      line1: userCase.applicant1LegalProceedings
        ? `${userCase.applicant1LegalProceedings.replace('Yes', 'Do').replace('No', 'Naddo')}
        ${isApplicant2 ? getCyOtherCourtCasesMoreDetailsContent(isDivorce) : ''}`
        : '',
      line2:
        userCase.applicant1LegalProceedings === YesOrNo.YES
          ? stripTags(userCase.applicant1LegalProceedingsDetails)
          : '',
    },
    dividingAssets: {
      line1: `${
        userCase.applicant1ApplyForFinancialOrder
          ? userCase.applicant1ApplyForFinancialOrder === YesOrNo.YES
            ? 'Ydw, rwyf am wneud cais am orchymyn ariannol'
            : 'Na, nid wyf am wneud cais am orchymyn ariannol'
          : ''
      }`,
      line2: `${
        userCase.applicant1WhoIsFinancialOrderFor
          ? userCase.applicant1WhoIsFinancialOrderFor
              ?.join(' / ')
              .replace(FinancialOrderFor.APPLICANT, 'Fi fy hun')
              .replace(FinancialOrderFor.CHILDREN, 'Fy mhlant')
          : ''
      }`,
    },
    documents: {
      line1: `${
        userCase.applicant1DocumentsUploaded?.length
          ? userCase.applicant1DocumentsUploaded.reduce((acc, curr) => `${acc}${getFilename(curr.value)}\n`, '')
          : ''
      }`,
      line2: `${
        userCase.applicant1CannotUploadDocuments
          ? userCase.applicant1CannotUploadDocuments.length
            ? cannotUploadDocumentList(isDivorce, false, marriage, civilPartnership, userCase)
            : ''
          : ''
      }`,
    },
  },
  change: 'Newid',
  continueApplication: 'Parhau gyda’r cais',
  confirm: `Cadarnhau cyn ${stripTags(userCase.applicant1HelpWithFeesRefNo) ? 'cyflwyno' : 'parhau'}`,
  jointApplicantReview: `Bydd eich atebion yn cael eu hanfon at eich ${partner} i’w hadolygu. Pan fyddant wedi eu hadolygu ac wedi darparu rhywfaint o atebion eu hunain, bydd y cais wedi’i gwblhau yn dod yn ôl atoch chi i’w adolygu unwaith eto cyn ei gyflwyno.`,
  confirmPrayer: `Rwy’n cadarnhau fy mod yn gwneud cais i’r llys i ${
    isDivorce ? 'ddiddymu fy mhriodas (cael ysgariad)' : 'ddod â fy mhartneriaeth sifil i ben'
  }
    ${
      userCase.applicant1ApplyForFinancialOrder === YesOrNo.YES
        ? 'a gwneud gorchmynion ariannol i benderfynu sut bydd ein harian ac eiddo yn cael eu rhannu'
        : ''
    }.`,
  confirmPrayerHint:
    '<br><p class="govuk-body govuk-!-margin-bottom-0">Mae hyn yn cadarnhau beth rydych yn gofyn i’r llys ei wneud. Gelwir hyn yn ‘y deisyfiad’.</p>',
  confirmApplicationIsTrue: 'Credaf fod y ffeithiau a nodir yn y cais hwn yn wir',
  confirmApplicationIsTrueHint:
    '<p class="govuk-body govuk-!-margin-top-4 govuk-!-margin-bottom-0">Mae hyn yn cadarnhau bod yr wybodaeth rydych yn ei chyflwyno yn wir ac yn gywir hyd at eithaf eich gwybodaeth. Gelwir hwn yn eich ‘datganiad gwirionedd’.</p>',
  confirmApplicationIsTrueWarning:
    "Gellir dwyn achos dirmyg llys yn erbyn unrhyw un sy'n gwneud datganiad anwir, neu sy'n achosi i ddatganiad anwir gael ei wneud mewn dogfen a ddilysir gan ddatganiad gwirionedd heb gredu'n onest ei fod yn wir.",
  continue: isJointApplication
    ? 'Send for review'
    : stripTags(userCase.applicant1HelpWithFeesRefNo)
    ? 'Cyflwyno eich cais'
    : 'Parhau i’r dudalen dalu',
  errors: isJointApplication
    ? undefined
    : {
        applicant1IConfirmPrayer: {
          required:
            'Nid ydych wedi cadarnhau beth yr ydych yn gwneud cais i’r llys ei wneud. Mae arnoch angen cadarnhau cyn parhau.',
        },
        applicant1StatementOfTruth: {
          required:
            'Nid ydych wedi cadarnhau eich bod yn credu bod y ffeithiau yn y cais yn wir. Mae angen ichi gadarnhau cyn parhau.',
        },
      },
});

export const form: FormContent = {
  fields: userCase =>
    userCase.applicationType === ApplicationType.JOINT_APPLICATION
      ? <FormFields>{}
      : {
          applicant1IConfirmPrayer: {
            type: 'checkboxes',
            label: l => l.confirm,
            labelSize: 'm',
            values: [
              {
                name: 'applicant1IConfirmPrayer',
                label: l => l.confirmPrayer,
                hint: l => l.confirmPrayerHint,
                value: Checkbox.Checked,
                validator: isFieldFilledIn,
              },
            ],
          },
          applicant1StatementOfTruth: {
            type: 'checkboxes',
            labelHidden: true,
            values: [
              {
                name: 'applicant1StatementOfTruth',
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
  const applicant2Url = content.isApplicant2 ? urls.APPLICANT_2 : '';
  return {
    ...translations,
    isApplicationReadyToSubmit,
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
    applicant2Url,
  };
};
