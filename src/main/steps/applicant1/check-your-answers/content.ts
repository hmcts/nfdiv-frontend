import config from 'config';

import { getFormattedDate } from '../../../app/case/answers/formatDate';
import { Checkbox } from '../../../app/case/case';
import { ApplicationType, ChangedNameHow, Gender, YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFields, FormFieldsFn } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { connectionBulletPointsTextForSoleAndJoint } from '../../../app/jurisdiction/bulletedPointsContent';
import * as urls from '../../urls';
import { jurisdictionMoreDetailsContent } from '../connection-summary/content';

const moreDetailsComponent: (text: string, title: string) => string = (text: string, title: string) => {
  return `
  <details class="govuk-details summary" data-module="govuk-details">
    <summary class="govuk-details__summary">
      <span class="govuk-details__summary-text">
        ${title}
      </span>
    </summary>
    <div class="govuk-details__text">
      ${text}
    </div>
  </details>`;
};

const en = ({ isDivorce, partner, userCase, isJointApplication, isApplicant2, checkYourAnswersPartner }) => ({
  titleSoFar: 'Check your answers so far',
  titleSubmit: 'Check your answers',
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
      line2: `Has your ${isDivorce ? 'marriage' : 'civil partnership'} irretrievably broken down (it cannot be saved)?`,
      line3: `When did you ${isDivorce ? 'get married' : 'form your civil partnership'}?`,
      line4: `Do you have your ${isDivorce ? 'marriage' : 'civil partnership'} certificate with you?`,
      line5: `How do you want to apply ${isDivorce ? 'for the divorce' : 'to end your civil partnership'}?`,
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
      line13: "How you're connected to England and Wales",
    },
    aboutPartners: {
      line1: `Copy your full name from the ${isDivorce ? 'marriage' : 'civil partnership'} certificate`,
      line2: `Copy your ${partner}'s full name from the ${isDivorce ? 'marriage' : 'civil partnership'} certificate`,
      line3: `Did you change your last name when you ${isDivorce ? 'got married' : 'formed your civil partnership'}?`,
      line4: `Have you changed any part of your name since ${
        isDivorce ? 'getting married' : 'forming your civil partnership'
      }?`,
      line5: 'How did you change your name?',
    },
    aboutYouForApplicant2: {
      line1: 'Your first name(s)',
      line2: 'Your middle name(s)',
      line3: 'Your last name(s)',
      line4: `Did you change your last name when you ${isDivorce ? 'got married' : 'formed your civil partnership'}?`,
      line5: `Have you changed any part of your name since ${
        isDivorce ? 'getting married' : 'forming your civil partnership'
      }?`,
      line6: 'How did you change your name?',
    },
    contactYou: {
      line1: 'Your first name(s)',
      line2: 'Your middle name(s)',
      line3: 'Your last name(s)',
      line4: 'By email',
      line5: 'By phone',
      line6: 'What language do you want to receive emails and documents in?',
      line7: `Do you need your contact details kept private from your ${partner}?`,
      line8: 'Your postal address',
    },
    contactThem: {
      line1: `Your ${partner}'s first name(s)`,
      line2: `Your ${partner}'s middle name(s)`,
      line3: `Your ${partner}'s last name(s)`,
      line4: `Your ${partner}'s email address`,
      line5: `Do you have your ${partner}'s postal address?`,
      line6: `Your ${partner}'s postal address`,
    },
    otherCourtCases: {
      line1: `Are there, or have there ever been, any other court cases relating to this ${
        isDivorce ? 'marriage' : 'civil partnership'
      }?`,
      line2: 'Provide details about the other legal proceedings.',
    },
    dividingAssets: {
      line1: 'Do you want to apply for a financial order?',
    },
    documents: {
      line1: 'Uploaded files',
      line2: 'I cannot upload some or all of my documents',
    },
  },
  stepAnswers: {
    aboutPartnership: {
      line1: `${isDivorce ? `My ${partner}` : userCase.Gender === Gender.MALE ? 'Male' : 'Female'}`,
      line2: `${
        userCase.applicant1ScreenHasUnionBroken
          ? userCase.applicant1ScreenHasUnionBroken === YesOrNo.YES
            ? `Yes, my ${isDivorce ? 'marriage' : 'civil partnership'} has irretrievably broken down`
            : `No, my ${isDivorce ? 'marriage' : 'civil partnership'} has not irretrievably broken down`
          : ''
      }`,
      line3: `${userCase.relationshipDate ? `${getFormattedDate(userCase.relationshipDate)}` : ''}`,
      line4: `${
        userCase.hasCertificate
          ? userCase.hasCertificate === YesOrNo.YES
            ? `Yes, I have my ${isDivorce ? 'marriage' : 'civil partnership'} certificate`
            : `No I do not have my ${isDivorce ? 'marriage' : 'civil partnership'} certificate`
          : ''
      }`,
      line5: `${
        userCase.applicationType
          ? isJointApplication
            ? `I want to apply jointly, with my ${partner}`
            : 'I want to apply on my own, as a sole applicant'
          : ''
      }`,
    },
    helpWithFees: {
      line1: `${
        userCase.applicant1HelpPayingNeeded
          ? userCase.applicant1HelpPayingNeeded === YesOrNo.YES
            ? 'I need help paying the fee'
            : 'I do not need help paying the fee'
          : ''
      }
      ${
        isApplicant2 && userCase.applicant1HelpPayingNeeded
          ? moreDetailsComponent(
              `This ${
                isDivorce ? 'divorce application' : 'application to end your civil partnership'
              } costs ${config.get('fees.applicationFee')}.
      You will not be asked to pay the fee. Your ${checkYourAnswersPartner} will be asked to pay.
      ${
        userCase.applicant1HelpPayingNeeded === YesOrNo.YES
          ? 'They have said that they need help paying the fee. They can only use help if you apply too. That is why you were asked whether you needed help paying the fee.'
          : 'They have said that they do not need help paying the fee.'
      }`,
              'Find out more about help with fees'
            )
          : ''
      }`,
      line2: `${
        !isApplicant2 &&
        userCase.applicant1AlreadyAppliedForHelpPaying &&
        userCase.applicant1AlreadyAppliedForHelpPaying === YesOrNo.YES
          ? `Yes <br> ${userCase.applicant1HelpWithFeesRefNo}`
          : ''
      }`,
    },
    connectionsToEnglandWales: {
      line1: `${userCase.inTheUk}`,
      line2: `${userCase.certificateInEnglish}`,
      line3: `${userCase.certifiedTranslation}`,
      line4: `${userCase.ceremonyCountry}`,
      line5: `${userCase.ceremonyPlace}`,
      line6: `${userCase.applicant1LifeBasedInEnglandAndWales}`,
      line7: `${userCase.applicant2LifeBasedInEnglandAndWales}`,
      line8: `${userCase.applicant1DomicileInEnglandWales}`,
      line9: `${userCase.applicant1LivingInEnglandWalesTwelveMonths}`,
      line10: `${userCase.applicant1LivingInEnglandWalesSixMonths}`,
      line11: `${userCase.applicant2DomicileInEnglandWales}`,
      line12: `${userCase.bothLastHabituallyResident}`,
      line13: `${
        userCase.connections && userCase.connections?.length
          ? connectionBulletPointsTextForSoleAndJoint(userCase.connections, partner, isDivorce)
          : ''
      } <br><br>
      ${moreDetailsComponent(
        jurisdictionMoreDetailsContent(userCase.connections, isDivorce).connectedToEnglandWales,
        jurisdictionMoreDetailsContent(userCase.connections, isDivorce).readMore
      )}`,
    },
    aboutPartners: {
      line1: `${userCase.applicant1FullNameOnCertificate}`,
      line2: `${userCase.applicant2FullNameOnCertificate}`,
      line3: `${userCase.applicant1LastNameChangedWhenRelationshipFormed}`,
      line4: `${userCase.applicant1NameChangedSinceRelationshipFormed}`,
      line5: `${
        userCase.applicant1NameChangedHow?.length
          ? userCase.applicant1NameChangedHow
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
      line1: `${userCase.applicant1FirstNames}`,
      line2: `${userCase.applicant1MiddleNames}`,
      line3: `${userCase.applicant1LastNames}`,
      line4: `${
        userCase.applicant1AgreeToReceiveEmails
          ? `I agree that the ${
              isDivorce ? 'divorce' : 'civil partnership'
            } service can send me notifications and serve (deliver) court documents to me by email.`
          : ''
      }`,
      line5: `${
        userCase.applicant1AddressPrivate === YesOrNo.YES && userCase.isApplicant2 ? '' : userCase.applicant1PhoneNumber
      }`,
      line6: `${
        userCase.applicant1EnglishOrWelsh
          ? userCase.applicant1EnglishOrWelsh.charAt(0).toUpperCase() + userCase.applicant1EnglishOrWelsh.slice(1)
          : ''
      }`,
      line7: `${
        !userCase.applicant1AddressPrivate ||
        (userCase.applicant1AddressPrivate === YesOrNo.YES && userCase.isApplicant2)
          ? ''
          : userCase.applicant1AddressPrivate === YesOrNo.YES
          ? 'Keep my contact details private'
          : 'I do not need my contact details kept private'
      }`,
      line8: `${
        userCase.applicant1AddressPrivate === YesOrNo.YES && userCase.isApplicant2
          ? ''
          : [
              userCase.applicant1Address1,
              userCase.applicant1Address2,
              userCase.applicant1Address3,
              userCase.applicant1AddressTown,
              userCase.applicant1AddressCounty,
              userCase.applicant1AddressPostcode,
              userCase.applicant1AddressCountry,
            ]
              .filter(Boolean)
              .join('<br>')
      }`,
    },
    contactThem: {
      line1: `${isJointApplication ? '' : userCase.applicant2FirstNames}`,
      line2: `${isJointApplication ? '' : userCase.applicant2MiddleNames}`,
      line3: `${isJointApplication ? '' : userCase.applicant2LastNames}`,
      line4: `${userCase.applicant2EmailAddress}`,
      line5: `${isJointApplication ? '' : userCase.applicant1KnowsApplicant2Address}`,
      line6: `${
        isJointApplication
          ? ''
          : [
              userCase.applicant2Address1,
              userCase.applicant2Address2,
              userCase.applicant2Address3,
              userCase.applicant2AddressTown,
              userCase.applicant2AddressCounty,
              userCase.applicant2AddressPostcode,
              userCase.applicant2AddressCountry,
            ]
              .filter(Boolean)
              .join('<br>')
      }`,
    },
    otherCourtCases: {
      line1: `${userCase.applicant1LegalProceedings}
        ${
          isApplicant2
            ? moreDetailsComponent(
                'The court only needs to know about court proceedings relating to your' +
                  'marriage, property or children. It does not need to know about other court proceedings.',
                'Find out more about other court proceedings'
              )
            : ''
        }`,
      line2: `${userCase.applicant1LegalProceedings === YesOrNo.YES ? userCase.applicant1LegalProceedingsDetails : ''}`,
    },
    dividingAssets: {
      line1: `${
        userCase.applyForFinancialOrder
          ? userCase.applyForFinancialOrder === YesOrNo.YES
            ? 'Yes, I want to apply for a financial order'
            : 'No, I do not want to apply for a financial order'
          : ''
      }`,
    },
    documents: {
      line1: `${
        userCase.applicant1DocumentsUploaded?.length
          ? userCase.applicant1DocumentsUploaded.reduce((acc, curr) => `${acc}${curr.value?.documentFileName}\n`, '')
          : ''
      }`,
      line2: `${
        userCase.applicant1CannotUploadDocuments && userCase.applicant1CannotUploadDocuments.length
          ? 'I cannot upload some or all of my documents'
          : ''
      }`,
    },
  },
  stepLinks: {
    aboutPartnership: {
      line1: urls.YOUR_DETAILS_URL,
      line2: urls.HAS_RELATIONSHIP_BROKEN_URL,
      line3: urls.RELATIONSHIP_DATE_URL,
      line4: urls.CERTIFICATE_URL,
      line5: urls.HOW_DO_YOU_WANT_TO_APPLY,
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
      line13: urls.CHECK_JURISDICTION,
    },
    aboutPartners: {
      line1: urls.CERTIFICATE_NAME,
      line2: urls.CERTIFICATE_NAME,
      line3: urls.CHANGES_TO_YOUR_NAME_URL,
      line4: urls.CHANGES_TO_YOUR_NAME_URL,
      line5: urls.HOW_DID_YOU_CHANGE_YOUR_NAME,
    },
    contactYou: {
      line1: urls.YOUR_NAME,
      line2: urls.YOUR_NAME,
      line3: urls.YOUR_NAME,
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
      line4: urls.THEIR_EMAIL_ADDRESS,
      line5: urls.DO_YOU_HAVE_ADDRESS,
      line6: urls.ENTER_THEIR_ADDRESS,
    },
    otherCourtCases: {
      line1: urls.OTHER_COURT_CASES,
      line2: urls.DETAILS_OTHER_PROCEEDINGS,
    },
    dividingAssets: {
      line1: urls.APPLY_FINANCIAL_ORDER,
    },
    documents: {
      line1: urls.UPLOAD_YOUR_DOCUMENTS,
      line2: urls.UPLOAD_YOUR_DOCUMENTS,
    },
  },
  change: 'Change',
  continueApplication: 'Continue application',
  confirm: `Confirm before ${userCase.applicant1HelpWithFeesRefNo ? 'submitting' : 'continuing'}`,
  jointApplicantReview: `Your answers will be sent to your ${partner} to review. Once they have reviewed and provided some of their own information then the application will be ready to submit.`,
  confirmPrayer: 'I confirm that I’m applying to the court to:',
  confirmPrayerHint: `<ul class="govuk-list govuk-list--bullet govuk-!-margin-top-4">
    <li>${isDivorce ? 'dissolve my marriage (get a divorce)' : 'end my civil partnership'}
    ${
      userCase.applyForFinancialOrder === YesOrNo.YES
        ? '<li>decide how our money and property will be split (known as a financial order)</li>'
        : ''
    }
  </ul>
  <p class="govuk-body govuk-!-margin-bottom-0">This confirms what you are asking the court to do. It’s known as ‘the prayer’.</p>`,
  confirmApplicationIsTrue: 'I believe that the facts stated in this application are true',
  confirmApplicationIsTrueHint:
    '<p class="govuk-body govuk-!-margin-top-4 govuk-!-margin-bottom-0">This confirms that the information you are submitting is true and accurate, to the best of your knowledge. It’s known as your ‘statement of truth’.</p>',
  confirmApplicationIsTrueWarning:
    'Proceedings for contempt of court may be brought against anyone who makes, or causes to be made, a false statement verified by a statement of truth without an honest belief in its truth.',
  continue: isJointApplication
    ? 'Send for review'
    : userCase.applicant1HelpWithFeesRefNo
    ? 'Submit application'
    : 'Continue to payment',
  errors: isJointApplication
    ? undefined
    : {
        applicant1IConfirmPrayer: {
          required:
            'You have not confirmed what you are applying to the court to do. You need to confirm before continuing.',
        },
        applicant1IBelieveApplicationIsTrue: {
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
  checkYourAnswersPartner,
}) => ({
  ...en({ isDivorce, partner, userCase, isJointApplication, isApplicant2, checkYourAnswersPartner }),
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
    contactYou: 'Sut bydd y llys yn cysylltu â chi',
    contactThem: `How the court will contact your ${partner}`,
    otherCourtCases: 'Other court cases',
    dividingAssets: 'Dividing your money and property',
    documents: 'Your documents',
  },
  stepQuestions: {
    aboutPartnership: {
      line1: `${isDivorce ? 'Pwy ydych chi eisiau ei (h)ysgaru' : "Ydych chi'n wryw ynteu'n fenyw"}?`,
      line2: `A yw eich ${isDivorce ? 'priodas' : 'perthynas'} wedi chwalu'n gyfan gwbl (ni ellir ei hachub)?`,
      line3: `Pryd wnaethoch chi ${isDivorce ? 'briodi' : 'ffurfio eich partneriaeth sifil'}?`,
      line4: `A yw eich ${isDivorce ? 'tystysgrif priodas' : 'tystysgrif partneriaeth sifil'} gennych yn awr?`,
      line5: `How do you want to apply ${isDivorce ? 'for the divorce' : 'to end your civil partnership'}?`,
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
      line8: 'A ydych wedi bod yn byw yng Nghymru neu Loegr am y 6 mis diwethaf?',
      line9: 'Ydych chi wedi bod yn byw yng Nghymru neu Loegr am y 12 mis diwethaf?',
      line10: 'A yw eich domisil yng Nghymru neu Loegr?',
      line11: `A yw domisil eich ${partner} yng Nghymru neu Loegr?`,
      line12:
        "A oedd y ddau ohonoch yn preswylio'n arferol ddiwethaf yng Nghymru neu Loegr ac a yw un ohonoch yn dal i fyw yma?",
      line13: "How you're connected to England and Wales",
    },
    aboutPartners: {
      line1: `Copïwch eich enw yn llawn fel y mae'n ymddangos ar y dystysgrif ${
        isDivorce ? 'priodas' : 'partneriaeth sifil'
      }`,
      line2: `Copïwch enw llawn eich ${partner} fel y mae'n ymddangos ar y dystysgrif ${
        isDivorce ? 'priodas' : 'partneriaeth sifil'
      }`,
      line3: `Did you change your last name when you ${isDivorce ? 'got married' : 'formed your civil partnership'}?`,
      line4: `Have you changed any part of your name since ${
        isDivorce ? 'getting married' : 'forming your civil partnership'
      }?`,
      line5: 'Sut wnaethoch chi newid eich enw?',
    },
    aboutYouForApplicant2: {
      line1: 'Your first name(s)',
      line2: 'Your middle name(s)',
      line3: 'Your last name(s)',
      line4: `Did you change your last name when you ${isDivorce ? 'got married' : 'formed your civil partnership'}?`,
      line5: `Have you changed any part of your name since ${
        isDivorce ? 'getting married' : 'forming your civil partnership'
      }?`,
      line6: 'Sut wnaethoch chi newid eich enw?',
    },
    contactYou: {
      line1: 'Your first name(s)',
      line2: 'Your middle name(s)',
      line3: 'Your last name(s)',
      line4: 'Trwy e-bost',
      line5: 'Dros y ffôn',
      line6: 'Ym mha iaith hoffech chi gael negeseuon e-bost a dogfennau?',
      line7: `A oes arnoch angen cadw eich manylion cyswllt yn breifat oddi wrth eich ${partner}?`,
      line8: 'Your postal address',
    },
    contactThem: {
      line1: `Your ${partner}'s first name(s)`,
      line2: `Your ${partner}'s middle name(s)`,
      line3: `Your ${partner}'s last name(s)`,
      line4: `Your ${partner}'s email address`,
      line5: `A oes gennych gyfeiriad post eich ${partner}?`,
      line6: `Your ${partner}'s postal address`,
    },
    otherCourtCases: {
      line1: `A oes, neu a oes wedi bod erioed, unrhyw achosion cyfreithiol eraill yng nghyswllt eich ${
        isDivorce ? 'priodas' : 'partneriaeth sifil'
      }, eich eiddo, neu'ch plant?`,
      line2: 'Provide details about the other legal proceedings.',
    },
    dividingAssets: {
      line1: 'Do you want to apply for a financial order?',
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
        userCase.applicant1ScreenHasUnionBroken
          ? userCase.applicant1ScreenHasUnionBroken === YesOrNo.YES
            ? `Ydy, mae fy ${isDivorce ? 'mhriodas' : 'mherthynas'} wedi chwalu'n gyfan gwbl`
            : `Nac ydy, nid yw fy  ${isDivorce ? 'mhriodas' : 'mherthynas'} wedi chwalu'n gyfan gwbl`
          : ''
      }`,
      line3: `${userCase.relationshipDate ? `${getFormattedDate(userCase.relationshipDate)}` : ''}`,
      line4: `${
        userCase.hasCertificate
          ? userCase.hasCertificate === YesOrNo.YES
            ? `Oes, mae gen i fy ${isDivorce ? 'nystysgrif priodas' : 'tystysgrif partneriaeth sifil'}`
            : `Na, nid oes gennyf ${isDivorce ? 'dystysgrif priodas' : 'tystysgrif partneriaeth sifil'}`
          : ''
      }`,
      line5: `${
        userCase.applicationType
          ? isJointApplication
            ? `I want to apply jointly, with my ${partner}`
            : 'I want to apply on my own, as a sole applicant'
          : ''
      }`,
    },
    helpWithFees: {
      line1: `${
        userCase.applicant1HelpPayingNeeded
          ? userCase.applicant1HelpPayingNeeded === YesOrNo.YES
            ? "Mae angen help arnaf i dalu'r ffi"
            : "Nid oes angen help arnaf i dalu'r ffi"
          : ''
      }`,
      line2: `${
        userCase.applicant1AlreadyAppliedForHelpPaying
          ? userCase.applicant1AlreadyAppliedForHelpPaying === YesOrNo.YES
            ? `Do <br> ${userCase.applicant1HelpWithFeesRefNo ? userCase.applicant1HelpWithFeesRefNo : ''}`
            : ''
          : ''
      }`,
    },
    connectionsToEnglandWales: {
      line1: `${userCase.inTheUk.replace('Yes', 'Do').replace('No', 'Naddo')}`,
      line2: `${userCase.certificateInEnglish.replace('Yes', 'Do').replace('No', 'Naddo')}`,
      line3: `${userCase.certifiedTranslation.replace('Yes', 'Do').replace('No', 'Naddo')}`,
      line4: `${userCase.ceremonyCountry}`,
      line5: `${userCase.ceremonyPlace}`,
      line6: `${userCase.applicant1LifeBasedInEnglandAndWales.replace('Yes', 'Do').replace('No', 'Naddo')}`,
      line7: `${userCase.applicant2LifeBasedInEnglandAndWales.replace('Yes', 'Do').replace('No', 'Naddo')}`,
      line8: `${userCase.applicant1DomicileInEnglandWales.replace('Yes', 'Do').replace('No', 'Naddo')}`,
      line9: `${userCase.applicant1LivingInEnglandWalesTwelveMonths.replace('Yes', 'Do').replace('No', 'Naddo')}`,
      line10: `${userCase.applicant1LivingInEnglandWalesSixMonths.replace('Yes', 'Do').replace('No', 'Naddo')}`,
      line11: `${userCase.applicant2DomicileInEnglandWales.replace('Yes', 'Do').replace('No', 'Naddo')}`,
      line12: `${userCase.bothLastHabituallyResident.replace('Yes', 'Do').replace('No', 'Naddo')}`,
      line13: `${
        userCase.connections && userCase.connections?.length
          ? connectionBulletPointsTextForSoleAndJoint(userCase.connections, partner, isDivorce)
          : ''
      } <br><br>
      ${moreDetailsComponent(
        jurisdictionMoreDetailsContent(userCase.connections, isDivorce).connectedToEnglandWales,
        jurisdictionMoreDetailsContent(userCase.connections, isDivorce).readMore
      )}`,
    },
    aboutPartners: {
      line1: `${userCase.applicant1FullNameOnCertificate}`,
      line2: `${userCase.applicant2FullNameOnCertificate}`,
      line3: `${userCase.applicant1LastNameChangedWhenRelationshipFormed}`,
      line4: `${userCase.applicant1NameChangedSinceRelationshipFormed}`,
      line5: `${
        userCase.applicant1NameChangedHow?.length
          ? userCase.applicant1NameChangedHow
              .join(' / ')
              .replace(ChangedNameHow.OTHER, 'Ffordd arall')
              .replace(ChangedNameHow.DEED_POLL, 'Deed poll')
              .replace(
                ChangedNameHow.MARRIAGE_CERTIFICATE,
                `${isDivorce ? 'Marriage' : 'Civil partnership'} certificate`
              )
          : ''
      }`,
    },
    contactYou: {
      line1: `${userCase.applicant1FirstNames}`,
      line2: `${userCase.applicant1MiddleNames}`,
      line3: `${userCase.applicant1LastNames}`,
      line4: `${
        userCase.applicant1AgreeToReceiveEmails
          ? `Rwy'n cytuno y gall y ${
              isDivorce ? 'gwasanaeth ysgaru' : 'gwasanaeth diweddu partneriaeth sifil'
            } anfon hysbysiadau ataf a chyflwyno (danfon) dogfennau llys ataf drwy e-bost.`
          : ''
      }`,
      line5: `${
        userCase.applicant1AddressPrivate === YesOrNo.YES && userCase.isApplicant2 ? '' : userCase.applicant1PhoneNumber
      }`,
      line6: `${
        userCase.applicant1EnglishOrWelsh
          ? userCase.applicant1EnglishOrWelsh.charAt(0).toUpperCase() + userCase.applicant1EnglishOrWelsh.slice(1)
          : ''
      }`,
      line7: `${
        !userCase.applicant1AddressPrivate ||
        (userCase.applicant1AddressPrivate === YesOrNo.YES && userCase.isApplicant2)
          ? ''
          : userCase.applicant1AddressPrivate === YesOrNo.YES
          ? 'Cadwch fy manylion cyswllt yn breifat'
          : 'Nid oes arnaf angen cadw fy manylion cyswllt yn breifat'
      }`,
      line8: `${
        userCase.applicant1AddressPrivate === YesOrNo.YES && userCase.isApplicant2
          ? ''
          : [
              userCase.applicant1Address1,
              userCase.applicant1Address2,
              userCase.applicant1Address3,
              userCase.applicant1AddressTown,
              userCase.applicant1AddressCounty,
              userCase.applicant1AddressPostcode,
              userCase.applicant1AddressCountry,
            ]
              .filter(Boolean)
              .join('<br>')
      }`,
    },
    contactThem: {
      line1: `${isJointApplication ? '' : userCase.applicant2FirstNames}`,
      line2: `${isJointApplication ? '' : userCase.applicant2MiddleNames}`,
      line3: `${isJointApplication ? '' : userCase.applicant2LastNames}`,
      line4: `${userCase.applicant2EmailAddress}`,
      line5: `${isJointApplication ? '' : userCase.applicant1KnowsApplicant2Address}`,
      line6: `${
        isJointApplication
          ? ''
          : [
              userCase.applicant2Address1,
              userCase.applicant2Address2,
              userCase.applicant2Address3,
              userCase.applicant2AddressTown,
              userCase.applicant2AddressCounty,
              userCase.applicant2AddressPostcode,
              userCase.applicant2AddressCountry,
            ]
              .filter(Boolean)
              .join('<br>')
      }`,
    },
    otherCourtCases: {
      line1: `${userCase.applicant1LegalProceedings.replace('Yes', 'Do').replace('No', 'Naddo')}`,
      line2: `${userCase.applicant1LegalProceedings === YesOrNo.YES ? userCase.applicant1LegalProceedingsDetails : ''}`,
    },
    dividingAssets: {
      line1: `${
        userCase.applyForFinancialOrder
          ? userCase.applyForFinancialOrder === YesOrNo.YES
            ? 'Yes, I want to apply for a financial order'
            : 'No, I do not want to apply for a financial order'
          : ''
      }`,
    },
    documents: {
      line1: `${
        userCase.applicant1DocumentsUploaded?.length
          ? userCase.applicant1DocumentsUploaded.reduce((acc, curr) => `${acc}${curr.value?.documentFileName}\n`, '')
          : ''
      }`,
      line2: `${
        userCase.applicant1CannotUploadDocuments
          ? userCase.applicant1CannotUploadDocuments.length
            ? 'Ni allaf uwchlwytho rhai neu bob un o fy nogfennau'
            : ''
          : ''
      }`,
    },
  },
  change: 'Newid',
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
          applicant1IBelieveApplicationIsTrue: {
            type: 'checkboxes',
            labelHidden: true,
            values: [
              {
                name: 'applicant1IBelieveApplicationIsTrue',
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
  const applicant2Url = content.isApplicant2 ? '/applicant2' : '';
  return {
    ...translations,
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
    applicant2Url,
  };
};
