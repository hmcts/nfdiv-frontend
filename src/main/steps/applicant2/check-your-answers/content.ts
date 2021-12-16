import { ChangedNameHow, YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { generateContent as applicant1GenerateContent } from '../../applicant1/check-your-answers/content';

const en = ({ isDivorce, userCase }) => ({
  stepAnswers: {
    aboutPartnership: {
      line2: `${
        userCase.applicant2ScreenHasUnionBroken
          ? userCase.applicant2ScreenHasUnionBroken === YesOrNo.YES
            ? `Yes, my ${isDivorce ? 'marriage' : 'civil partnership'} has irretrievably broken down`
            : `No, my ${isDivorce ? 'marriage' : 'civil partnership'} has not irretrievably broken down`
          : ''
      }`,
    },
    helpWithFees: {
      line1: `${
        userCase.applicant2HelpPayingNeeded
          ? userCase.applicant2HelpPayingNeeded === YesOrNo.YES
            ? 'I need help paying the fee'
            : 'I do not need help paying the fee'
          : ''
      }`,
      line2: `${
        userCase.applicant2AlreadyAppliedForHelpPaying
          ? userCase.applicant2AlreadyAppliedForHelpPaying === YesOrNo.YES
            ? `Yes <br> ${userCase.applicant2HelpWithFeesRefNo ? userCase.applicant2HelpWithFeesRefNo : ''}`
            : ''
          : ''
      }`,
    },
    aboutYouForApplicant2: {
      line1: `${userCase.applicant2FirstNames}`,
      line2: `${userCase.applicant2MiddleNames}`,
      line3: `${userCase.applicant2LastNames}`,
      line4: `${
        userCase.applicant2LastNameChangedWhenRelationshipFormed
          ? userCase.applicant2LastNameChangedWhenRelationshipFormed
          : ''
      }`,
      line5: `${
        userCase.applicant2NameChangedSinceRelationshipFormed
          ? userCase.applicant2NameChangedSinceRelationshipFormed
          : ''
      }`,
      line6: `${
        userCase.applicant2NameChangedHow?.length
          ? userCase.applicant2NameChangedHow
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
      line4: `${
        userCase.applicant2AgreeToReceiveEmails
          ? `I agree that the ${
              isDivorce ? 'divorce' : 'civil partnership'
            } service can send me notifications and serve (deliver) court documents to me by email.`
          : ''
      }`,
      line5: `${userCase.applicant2PhoneNumber}`,
      line6: `${
        userCase.applicant2EnglishOrWelsh
          ? userCase.applicant2EnglishOrWelsh.charAt(0).toUpperCase() + userCase.applicant2EnglishOrWelsh.slice(1)
          : ''
      }`,
      line7: `${
        userCase.applicant2AddressPrivate
          ? userCase.applicant2AddressPrivate === YesOrNo.YES
            ? 'Keep my contact details private'
            : 'I do not need my contact details kept private'
          : ''
      }`,
      line8: `${[
        userCase.applicant2Address1,
        userCase.applicant2Address2,
        userCase.applicant2Address3,
        userCase.applicant2AddressTown,
        userCase.applicant2AddressCounty,
        userCase.applicant2AddressPostcode,
        userCase.applicant2AddressCountry,
      ]
        .filter(Boolean)
        .join('<br>')}`,
    },
    otherCourtCases: {
      line1: `${userCase.applicant2LegalProceedings}`,
      line2: `${userCase.applicant2LegalProceedings === YesOrNo.YES ? userCase.applicant2LegalProceedingsDetails : ''}`,
    },
    dividingAssets: {
      line1: `${
        userCase.applicant2ApplyForFinancialOrder
          ? userCase.applicant2ApplyForFinancialOrder === YesOrNo.YES
            ? 'Yes, I want to apply for a financial order'
            : 'No, I do not want to apply for a financial order'
          : ''
      }`,
    },
    documents: {
      line1: `${
        userCase.applicant2DocumentsUploaded?.length
          ? userCase.applicant2DocumentsUploaded.reduce((acc, curr) => `${acc}${curr.value?.documentFileName}\n`, '')
          : ''
      }`,
      line2: `${
        userCase.applicant2CannotUploadDocuments && userCase.applicant2CannotUploadDocuments.length
          ? 'I cannot upload some or all of my documents'
          : ''
      }`,
    },
  },
});

// @TODO translations
const cy: typeof en = ({ isDivorce, userCase }) => ({
  ...en({ isDivorce, userCase }),
  stepAnswers: {
    aboutPartnership: {
      line2: `${
        userCase.applicant2ScreenHasUnionBroken
          ? userCase.applicant2ScreenHasUnionBroken === YesOrNo.YES
            ? `Ydy, mae fy ${isDivorce ? 'mhriodas' : 'mherthynas'} wedi chwalu'n gyfan gwbl`
            : `Nac ydy, nid yw fy  ${isDivorce ? 'mhriodas' : 'mherthynas'} wedi chwalu'n gyfan gwbl`
          : ''
      }`,
    },
    helpWithFees: {
      line1: `${
        userCase.applicant2HelpPayingNeeded
          ? userCase.applicant2HelpPayingNeeded === YesOrNo.YES
            ? "Mae angen help arnaf i dalu'r ffi"
            : "Nid oes angen help arnaf i dalu'r ffi"
          : ''
      }`,
      line2: `${
        userCase.applicant2AlreadyAppliedForHelpPaying
          ? userCase.applicant2AlreadyAppliedForHelpPaying === YesOrNo.YES
            ? `Do <br> ${userCase.applicant2HelpWithFeesRefNo ? userCase.applicant2HelpWithFeesRefNo : ''}`
            : ''
          : ''
      }`,
    },
    aboutYouForApplicant2: {
      line1: `${userCase.applicant2FirstNames}`,
      line2: `${userCase.applicant2MiddleNames}`,
      line3: `${userCase.applicant2LastNames}`,
      line4: `${
        userCase.applicant2LastNameChangedWhenRelationshipFormed
          ? userCase.applicant2LastNameChangedWhenRelationshipFormed
          : ''
      }`,
      line5: `${
        userCase.applicant2NameChangedSinceRelationshipFormed
          ? userCase.applicant2NameChangedSinceRelationshipFormed
          : ''
      }`,
      line6: `${
        userCase.applicant2NameChangedHow?.length
          ? userCase.applicant2NameChangedHow
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
      line1: `${userCase.applicant2FirstNames}`,
      line2: `${userCase.applicant2MiddleNames}`,
      line3: `${userCase.applicant2LastNames}`,
      line4: `${
        userCase.applicant2AgreeToReceiveEmails
          ? `Rwy'n cytuno y gall y ${
              isDivorce ? 'gwasanaeth ysgaru' : 'gwasanaeth diweddu partneriaeth sifil'
            } anfon hysbysiadau ataf a chyflwyno (danfon) dogfennau llys ataf drwy e-bost.`
          : ''
      }`,
      line5: `${userCase.applicant2PhoneNumber}`,
      line6: `${
        userCase.applicant2EnglishOrWelsh
          ? userCase.applicant2EnglishOrWelsh.charAt(0).toUpperCase() + userCase.applicant2EnglishOrWelsh.slice(1)
          : ''
      }`,
      line7: `${
        userCase.applicant2AddressPrivate
          ? userCase.applicant2AddressPrivate === YesOrNo.YES
            ? 'Cadwch fy manylion cyswllt yn breifat'
            : 'Nid oes arnaf angen cadw fy manylion cyswllt yn breifat'
          : ''
      }`,
      line8: `${[
        userCase.applicant2Address1,
        userCase.applicant2Address2,
        userCase.applicant2Address3,
        userCase.applicant2AddressTown,
        userCase.applicant2AddressCounty,
        userCase.applicant2AddressPostcode,
        userCase.applicant2AddressCountry,
      ]
        .filter(Boolean)
        .join('<br>')}`,
    },
    otherCourtCases: {
      line1: `${userCase.applicant2LegalProceedings}`,
      line2: `${userCase.applicant2LegalProceedings === YesOrNo.YES ? userCase.applicant2LegalProceedingsDetails : ''}`,
    },
    dividingAssets: {
      line1: `${
        userCase.applicant2ApplyForFinancialOrder
          ? userCase.applicant2ApplyForFinancialOrder === YesOrNo.YES
            ? 'Yes, I want to apply for a financial order'
            : 'No, I do not want to apply for a financial order'
          : ''
      }`,
    },
    documents: {
      line1: `${
        userCase.applicant2DocumentsUploaded?.length
          ? userCase.applicant2DocumentsUploaded.reduce((acc, curr) => `${acc}${curr.value?.documentFileName}\n`, '')
          : ''
      }`,
      line2: `${
        userCase.applicant2CannotUploadDocuments && userCase.applicant2CannotUploadDocuments.length
          ? 'Ni allaf uwchlwytho rhai neu bob un o fy nogfennau'
          : ''
      }`,
    },
  },
});

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.continue,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  content.checkYourAnswersPartner = content.partner;
  const translations = languages[content.language](content);
  return {
    ...applicant1GenerateContent(content),
    ...translations,
    form,
  };
};
