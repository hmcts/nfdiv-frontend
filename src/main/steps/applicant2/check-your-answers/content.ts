import striptags from 'striptags';

import { ChangedNameHow, ChangedNameWhy, FinancialOrderFor, YesOrNo } from '../../../app/case/definition';
import { getFilename } from '../../../app/case/formatter/uploaded-files';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { generateContent as applicant1GenerateContent } from '../../applicant1/check-your-answers/content';

const stripTags = value => (typeof value === 'string' ? striptags(value) : value);

const en = ({ isDivorce, userCase, isApplicant2 }) => ({
  stepAnswers: {
    aboutPartnership: {
      line3: `${
        userCase.applicant2ScreenHasUnionBroken
          ? userCase.applicant2ScreenHasUnionBroken === YesOrNo.YES
            ? `I confirm my ${isDivorce ? 'marriage' : 'civil partnership'} has broken down irretrievably`
            : `My ${isDivorce ? 'marriage' : 'civil partnership'} has not broken down irretrievably`
          : ''
      }`,
    },
    helpWithFees: {
      line1: `${
        userCase.applicant2HelpPayingNeeded
          ? userCase.applicant2HelpPayingNeeded === YesOrNo.YES
            ? 'I need help with fees'
            : 'I do not need help with fees'
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
      line4: `${userCase.applicant2NameDifferentToMarriageCertificate}`,
      line5: `${userCase.applicant2FullNameOnCertificate}`,
      line6: `${stripTags(
        userCase.applicant2WhyNameDifferent
          ?.join(' / ')
          ?.replace(ChangedNameWhy.DEED_POLL, 'I changed my name by deed poll')
          ?.replace(ChangedNameWhy.CHANGED_PARTS_OF_NAME, 'I changed my last name or parts of my name')
          ?.replace(
            ChangedNameWhy.PART_OF_NAME_NOT_INCLUDED,
            'Part of my legal name was not included on the certificate'
          )
          ?.replace(ChangedNameWhy.PART_OF_NAME_ABBREVIATED, 'Part of my legal name is abbreviated on the certificate')
          ?.replace(
            ChangedNameWhy.LEGAL_NAME_SPELLED_DIFFERENTLY,
            'My legal name is spelled differently on the certificate'
          )
          ?.replace(ChangedNameWhy.OTHER, 'Another reason')
      )}`,
      line7: `${stripTags(userCase.applicant2WhyNameDifferentOtherDetails)}`,
      line8: `${
        userCase.applicant2NameDifferentToMarriageCertificateMethod?.length
          ? userCase.applicant2NameDifferentToMarriageCertificateMethod
              .join(' / ')
              .replace(ChangedNameHow.OTHER, 'Another way')
              .replace(ChangedNameHow.DEED_POLL, 'Deed poll')
              .replace(
                ChangedNameHow.MARRIAGE_CERTIFICATE,
                `${isDivorce ? 'Marriage' : 'Civil partnership'} certificate`
              )
          : ''
      }`,
      line9: `${stripTags(userCase.applicant2NameDifferentToMarriageCertificateOtherDetails)}`,
    },
    contactYou: {
      line5: `${
        userCase.applicant2AgreeToReceiveEmails
          ? `I agree that the ${
              isDivorce ? 'divorce' : 'civil partnership'
            } service can send me notifications and serve (deliver) court documents to me by email.`
          : ''
      }`,
      line6: `${userCase.applicant2PhoneNumber}`,
      line7: `${
        userCase.applicant2EnglishOrWelsh
          ? userCase.applicant2EnglishOrWelsh.charAt(0).toUpperCase() + userCase.applicant2EnglishOrWelsh.slice(1)
          : ''
      }`,
      line8: `${
        userCase.applicant2AddressPrivate
          ? userCase.applicant2AddressPrivate === YesOrNo.YES
            ? 'Keep my contact details private'
            : 'I do not need my contact details kept private'
          : ''
      }`,
      line9: `${
        !userCase.applicant2AddressPrivate || (userCase.applicant2AddressPrivate === YesOrNo.YES && !isApplicant2)
          ? ''
          : userCase.applicant2InRefuge === YesOrNo.YES
            ? 'Yes'
            : 'No'
      }`,
      line10: `${[
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
      line1: userCase.applicant2LegalProceedings,
      line2: userCase.applicant2LegalProceedings === YesOrNo.YES ? userCase.applicant2LegalProceedingsDetails : '',
    },
    dividingAssets: {
      line1: `${
        userCase.applicant2ApplyForFinancialOrder
          ? userCase.applicant2ApplyForFinancialOrder === YesOrNo.YES
            ? 'Yes, I want to apply for a financial order'
            : 'No, I do not want to apply for a financial order'
          : ''
      }`,
      line2: `${
        userCase.applicant2WhoIsFinancialOrderFor
          ? userCase.applicant2WhoIsFinancialOrderFor
              ?.join(' / ')
              .replace(FinancialOrderFor.APPLICANT, 'Myself')
              .replace(FinancialOrderFor.CHILDREN, 'The children')
          : ''
      }`,
    },
    documents: {
      line1: `${
        userCase.applicant2DocumentsUploaded?.length
          ? userCase.applicant2DocumentsUploaded.reduce((acc, curr) => `${acc}${getFilename(curr.value)}\n`, '')
          : ''
      }`,
      line2: `${
        userCase.applicant2CannotUploadDocuments && userCase.applicant2CannotUploadDocuments.length
          ? 'Proof that I changed my name'
          : ''
      }`,
    },
  },
});

const cy: typeof en = ({ isDivorce, userCase, isApplicant2 }) => ({
  stepAnswers: {
    aboutPartnership: {
      line3: `${
        userCase.applicant2ScreenHasUnionBroken
          ? userCase.applicant2ScreenHasUnionBroken === YesOrNo.YES
            ? `Ydy, mae fy ${isDivorce ? 'mhriodas' : 'mherthynas'} wedi chwalu'n gyfan gwbl`
            : `Nac ydy, nid yw fy  ${isDivorce ? 'mhriodas' : 'mherthynas'} wedi chwalu'n gyfan gwbl`
          : ''
      }`,
    },
    helpWithFees: {
      line1: userCase.applicant2HelpPayingNeeded
        ? userCase.applicant2HelpPayingNeeded === YesOrNo.YES
          ? "Mae angen help arnaf i dalu'r ffi"
          : "Nid oes angen help arnaf i dalu'r ffi"
        : '',
      line2: userCase.applicant2AlreadyAppliedForHelpPaying
        ? userCase.applicant2AlreadyAppliedForHelpPaying === YesOrNo.YES
          ? `Do <br> ${userCase.applicant2HelpWithFeesRefNo ? userCase.applicant2HelpWithFeesRefNo : ''}`
          : ''
        : '',
    },
    aboutYouForApplicant2: {
      line1: `${userCase.applicant2FirstNames}`,
      line2: `${userCase.applicant2MiddleNames}`,
      line3: `${userCase.applicant2LastNames}`,
      line4: `${userCase.applicant2NameDifferentToMarriageCertificate}`,
      line5: `${userCase.applicant2FullNameOnCertificate}`,
      line6: `${stripTags(
        userCase.applicant2WhyNameDifferent
          ?.join(' / ')
          ?.replace(ChangedNameWhy.DEED_POLL, 'They changed their name by deed poll')
          ?.replace(ChangedNameWhy.CHANGED_PARTS_OF_NAME, 'They changed their last name or parts of their name')
          ?.replace(
            ChangedNameWhy.PART_OF_NAME_NOT_INCLUDED,
            'Part of their legal name was not included on the certificate'
          )
          ?.replace(
            ChangedNameWhy.PART_OF_NAME_ABBREVIATED,
            'Part of their legal name is abbreviated on the certificate'
          )
          ?.replace(
            ChangedNameWhy.LEGAL_NAME_SPELLED_DIFFERENTLY,
            'Their legal name is spelled differently on the certificate'
          )
          ?.replace(ChangedNameWhy.OTHER, 'Another reason')
      )}`,
      line7: `${stripTags(userCase.applicant2WhyNameDifferentOtherDetails)}`,
      line8: `${
        userCase.applicant2NameDifferentToMarriageCertificateMethod?.length
          ? userCase.applicant2NameDifferentToMarriageCertificateMethod
              .join(' / ')
              .replace(ChangedNameHow.OTHER, 'Another way')
              .replace(ChangedNameHow.DEED_POLL, 'Deed poll')
              .replace(
                ChangedNameHow.MARRIAGE_CERTIFICATE,
                `${isDivorce ? 'Marriage' : 'Civil partnership'} certificate`
              )
          : ''
      }`,
      line9: `${stripTags(userCase.applicant2NameDifferentToMarriageCertificateOtherDetails)}`,
    },
    contactYou: {
      line5: `${
        userCase.applicant2AgreeToReceiveEmails
          ? `Rwy'n cytuno y gall y ${
              isDivorce ? 'gwasanaeth ysgaru' : 'gwasanaeth diweddu partneriaeth sifil'
            } anfon hysbysiadau ataf a chyflwyno (danfon) dogfennau llys ataf drwy e-bost.`
          : ''
      }`,
      line6: `${userCase.applicant2PhoneNumber}`,
      line7: `${
        userCase.applicant2EnglishOrWelsh
          ? userCase.applicant2EnglishOrWelsh.charAt(0).toUpperCase() + userCase.applicant2EnglishOrWelsh.slice(1)
          : ''
      }`,
      line8: `${
        userCase.applicant2AddressPrivate
          ? userCase.applicant2AddressPrivate === YesOrNo.YES
            ? 'Cadwch fy manylion cyswllt yn breifat'
            : 'Nid oes arnaf angen cadw fy manylion cyswllt yn breifat'
          : ''
      }`,
      line9: `${
        !userCase.applicant2AddressPrivate || (userCase.applicant2AddressPrivate === YesOrNo.YES && !isApplicant2)
          ? ''
          : userCase.applicant2InRefuge === YesOrNo.YES
            ? 'Yndw'
            : 'Nac ydw'
      }`,
      line10: `${[
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
      line1: userCase.applicant2LegalProceedings.replace('Yes', 'Do').replace('No', 'Naddo'),
      line2: userCase.applicant2LegalProceedings === YesOrNo.YES ? userCase.applicant2LegalProceedingsDetails : '',
    },
    dividingAssets: {
      line1: `${
        userCase.applicant2ApplyForFinancialOrder
          ? userCase.applicant2ApplyForFinancialOrder === YesOrNo.YES
            ? 'Ydw, rwyf am wneud cais am orchymyn ariannol'
            : 'Na, nid wyf am wneud cais am orchymyn ariannol'
          : ''
      }`,
      line2: `${
        userCase.applicant2WhoIsFinancialOrderFor
          ? userCase.applicant2WhoIsFinancialOrderFor
              ?.join(' / ')
              .replace(FinancialOrderFor.APPLICANT, 'Fi fy hun')
              .replace(FinancialOrderFor.CHILDREN, 'Fy mhlant')
          : ''
      }`,
    },
    documents: {
      line1: `${
        userCase.applicant2DocumentsUploaded?.length
          ? userCase.applicant2DocumentsUploaded.reduce((acc, curr) => `${acc}${getFilename(curr.value)}\n`, '')
          : ''
      }`,
      line2: `${
        userCase.applicant2CannotUploadDocuments && userCase.applicant2CannotUploadDocuments.length
          ? 'Prawf fy mod i wedi newid fy enw'
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
  content.checkTheirAnswersPartner = content.partner;
  const translations = languages[content.language](content);
  return {
    ...applicant1GenerateContent(content),
    ...translations,
    form,
  };
};
